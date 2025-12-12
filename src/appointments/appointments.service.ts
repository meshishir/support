import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schema/appointment.schema';
import { Model } from 'mongoose';
import { Slot } from './schema/slot.schema';
import { ComplaintsService } from '../complaints/complaints.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { MessageStatus } from '../complaints/enum/status.enum';
import { UserSchema } from '../users/schema/createUser.schema';
import { Complaint } from '../complaints/schema/complaints.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private aptModel: Model<Appointment>,
    @InjectModel(Slot.name) private slotModel: Model<Slot>,
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    private readonly complaintsService: ComplaintsService
  ) { }


  // async checkAvailability(start: Date, end: Date) {
  //   const conflict = await this.aptModel.findOne({

  //     $or: [
  //       { start: { $lt: end, $gte: start } },
  //       { end: { $gt: start, $lte: end } },
  //       { start: { $lte: start }, end: { $gte: end } },
  //     ],
  //   });
  //   if (conflict) return false;
  //   const lock = await this.slotModel.findOne({ start, end });
  //   if (lock) return false;
  //   return true;
  // }

  async create(token: string) {
    console.log('injection', this.complaintModel, token)
    const complaintMessage = await this.complaintModel.findOne({ userId: 'U-F1CBEB8E' }).lean();
    console.log('complaintMessage', complaintMessage);
    const obj = complaintMessage?.messages.find(msg => msg.token === token);
    console
    return complaintMessage?.messages.find(msg => msg.token === token);
  }


}