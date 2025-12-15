import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AppointmentStatus } from "../enum/appointmentStatus.enum";
import { Types } from "mongoose";

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
    @Prop({ type: String, ref: 'User', required: true })
    repId: string;

    @Prop({ required: true })
    messageToken: string;

    @Prop({ required: true })
    startTime: Date;

    @Prop({ required: true })
    endTime: Date;

    @Prop({ enum: Object.values(AppointmentStatus), default: AppointmentStatus.SCHEDULED })
    status: AppointmentStatus;

}
export const appointmentSchema = SchemaFactory.createForClass(Appointment)