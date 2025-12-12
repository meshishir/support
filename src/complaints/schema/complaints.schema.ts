// src/complaints/schema/complaints.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MessageStatus } from '../enum/status.enum';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
    @Prop({ unique: true })
    token: string;

    @Prop({ type: String, ref: 'User', required: true })
    userId: string;

    @Prop()
    description: string;

    @Prop({ enum: Object.values(MessageStatus), default: MessageStatus.OPEN })
    status: string;

    @Prop({ type: [{ type: Object }], default: [] })
    messages: any[];
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
