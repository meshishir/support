import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schema/appointment.schema';
import { Model } from 'mongoose';
import { Slot } from './schema/slot.schema';
import { ComplaintsService } from '../complaints/complaints.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { MessageStatus } from '../complaints/enum/status.enum';
import { Complaint } from '../complaints/schema/complaints.schema';
import { AppointmentStatus } from './enum/appointmentStatus.enum';
import { Types } from 'mongoose';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private aptModel: Model<Appointment>,
    @InjectModel(Slot.name) private slotModel: Model<Slot>,
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    private readonly complaintsService: ComplaintsService
  ) { }


  async checkAvailability(repId: String, start: Date, end: Date) {
    const overlapping = await this.aptModel.findOne({
      repId,
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lte: start }, endTime: { $gte: end } }
      ]
    });


    if (overlapping) return false;

    const locked = await this.slotModel.findOne({ repId, startTime: start, endTime: end });
    return !locked;

  }


  async create(complaintToken: string, dto: CreateAppointmentDto) {
    const message = await this.complaintModel.findOne(
      { "messages.token": complaintToken },
      { messages: { $elemMatch: { token: complaintToken } } }
    );

    if (!message) throw new ConflictException("Invalid complaint token");

    const msg = message.messages[0];

    if (msg.status !== "OPEN")
      throw new ConflictException("Message is not open for appointment");

    const start = new Date(dto.startTime);
    const end = new Date(start.getTime() + 30 * 60000);

    const available = await this.checkAvailability(dto.repId, start, end);
    if (!available) throw new ConflictException("Rep is not available at this time");

    const appt = new this.aptModel({
      complaintToken,
      repId: dto.repId,
      startTime: start,
      endTime: end,
      messageToken: complaintToken,
      status: AppointmentStatus.SCHEDULED,
    });
    const newSlot = new this.slotModel({
      repId: dto.repId,
      startTime: start,
      endTime: new Date(start.getTime() + 30 * 60000),
    });
    await newSlot.save();

    if (appt.status === "SCHEDULED") {
      await this.complaintsService.updateMessageStatus(complaintToken, MessageStatus.IN_PROGRESS);
    }
    return appt.save();



  }


  async update(messageToken: string, dto: UpdateAppointmentDto) {
    const appt = await this.aptModel.findOne({ messageToken });
    if (!appt) throw new ConflictException("Appointment not found");

    // if (dto.startTime) {
    //   const start = new Date(dto.startTime);
    //   const end = new Date(start.getTime() + 30 * 60000);
    //   const available = await this.checkAvailability(appt.repId, start, end);
    //   if (!available) throw new ConflictException("Rep is not available at this time");
    //   appt.startTime = start;
    //   appt.endTime = end;
    // }

    if (dto.status) {
      appt.status = dto.status;
    }

    if (dto.status === "COMPLETED") {
      await this.complaintsService.updateMessageStatus(appt.messageToken, MessageStatus.RESOLVED);
    }

    if (dto.status === "CANCELLED" || dto.status === "NO_SHOW") {
      const deletemessage = await this.complaintsService.removeMessage(appt.messageToken);
      const deleteslot = await this.slotModel.deleteOne({ repId: appt.repId, startTime: appt.startTime, endTime: appt.endTime });
      return { deletemessage, deleteslot };

    }

    // return appt.save();
    console.log(appt)
  }

  deleteSlot(repId: String, start: Date, end: Date) {
    return this.slotModel.deleteOne({ repId, startTime: start, endTime: end });
  }

  async getAppointments(repId: string) {
    const appointments = await this.aptModel.aggregate([
      { $match: { repId } },
      {
        $lookup: {
          from: 'complaints',
          localField: 'userId',
          foreignField: 'token',
          as: 'messages'
        }
      },
      {
        $project: {
          _id: 1,
          messageToken: 1,
          status: 1,
          startTime: 1,
          endTime: 1,
          messages: {
            $map: {
              input: "$messages",
              as: "msg",
              in: {
                text: "$$msg.text",
                status: "$$msg.status"
              }
            }
          }
        }
      }
    ]);

    return appointments;
  }
}

