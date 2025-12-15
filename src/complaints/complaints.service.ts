import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint } from './schema/complaints.schema';
import { Model } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { AddComplaintDto } from './dto/add-complaint.dto';
import { UserSchema } from '../users/schema/createUser.schema';
import { MessageStatus } from './enum/status.enum';
import { AddMessageDto } from './dto/addMessage.dto';

@Injectable()
export class ComplaintsService {
  constructor(@InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>) { }

  async addComplaint(userId: string, addComplaintDto: AddComplaintDto) {
    const user = await this.userModel.findOne({ userId }).lean();
    if (!userId.startsWith('U-')) throw new ForbiddenException('Invalid userId');


    let complaint = await this.complaintModel.findOne({ userId });
    if (!user) throw new NotFoundException('User not found');

    if (!complaint) {
      complaint = new this.complaintModel({
        userId,
        messages: [],
      });
    }

    const newMessage = {
      from: user.userId,
      text: addComplaintDto.message,
      token: 'CMP-' + uuid4().slice(0, 8).toUpperCase(),
      status: MessageStatus.OPEN,
      ts: new Date(),
    };
    complaint.messages.push(newMessage);

    return complaint.save();
  }

  async findAll() {
    return this.complaintModel.find().lean();
  }


  async findByToken(token: string) {
    const complaint = await this.complaintModel.findOne({ 'messages.token': token }).lean();
    if (!complaint) throw new NotFoundException('Complaint not found');
    return complaint.messages.find(msg => msg.token === token);
  }

  async updateMessageStatus(token: string, status: string) {
    const complaint = await this.complaintModel.findOne({ 'messages.token': token });
    if (!complaint) throw new NotFoundException('Message not found');
    const message = complaint.messages.find(msg => msg.token === token);
    if (!message) throw new NotFoundException('Message not found');
    const statusValues = Object.values(MessageStatus);
    if (!statusValues.includes(status as MessageStatus)) throw new ConflictException('Invalid status value');
    message.status = statusValues.includes(status as MessageStatus) ? status : message.status;
    await complaint.updateOne({ messages: complaint.messages });
    return message;
  }


  async removeMessage(token: string) {
    const complaint = await this.complaintModel.findOne({ 'messages.token': token });
    if (!complaint) throw new NotFoundException('Complaint not found');
    complaint.messages = complaint.messages.filter(msg => msg.token !== token);
    await complaint.save();
    return complaint;
  }

}