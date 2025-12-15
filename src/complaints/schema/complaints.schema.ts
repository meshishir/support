// src/complaints/schema/complaints.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageStatus } from '../enum/status.enum';

export type ComplaintDocument = Complaint & Document;

@Schema()
class Message {
    @Prop({ type: String, required: true })
    text: string;

    @Prop({ enum: Object.values(MessageStatus), default: MessageStatus.OPEN })
    status: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);
@Schema({ timestamps: true })
export class Complaint {
    @Prop({ unique: true })
    token: string;

    @Prop({ type: String, ref: 'User', required: true })
    userId: string;

    @Prop({ enum: Object.values(MessageStatus), default: MessageStatus.OPEN })
    status: string;

    @Prop({ type: [MessageSchema], default: [] })
    messages: any[];
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
