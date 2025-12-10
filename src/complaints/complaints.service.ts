import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint } from './schema/complaints.schema';
import { Model } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(@InjectModel(Complaint.name) private complaintModel: Model<Complaint>) { }

  async create(createComplaintDto: CreateComplaintDto) {
    const token = 'CMP-' + uuid4().slice(0, 8).toUpperCase();
    const newComplaint = new this.complaintModel({
      ...createComplaintDto,
      token,
      messages: []
    });
    const existingEmail = await this.complaintModel.findOne({ email: createComplaintDto.email }).lean();
    const existingPhone = await this.complaintModel.findOne({ phone: createComplaintDto.phone }).lean();
    if (existingEmail || existingPhone) {
      throw new ConflictException('User already exists with the provided email or phone number');
    }

    return newComplaint.save();
  }

  async findAll() {
    return this.complaintModel.find().exec();
  }


  async findByToken(token: string) {
    const c = await this.complaintModel.findOne({ token }).lean();
    if (!c) throw new ConflictException('Complaint not found');
    return c;
  }

  async addMessage(token: string, message: { from: string; text: string }) {
    const c = await this.complaintModel.findOne({ token });
    if (!c) throw new NotFoundException('Complaint not found');
    c.messages.push({ ...message, ts: new Date() });
    await c.save();
    return c;
  }


  async updateStatus(token: string, status: string) {
    const c = await this.complaintModel.findOne({ token });
    if (!c) throw new NotFoundException('Complaint not found');
    c.status = status;
    await c.save();
    return c;
  }
}