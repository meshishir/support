import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ComplaintStatus } from "../enum/status.enum";

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true, minlength: 10, })
    phone: Number;

    @Prop({ required: true, unique: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })
    email: string;

    @Prop()
    description: string;

    @Prop({ enum: Object.values(ComplaintStatus), default: ComplaintStatus.OPEN })
    status: string;

    @Prop({ type: [{ type: Object }], default: [] })
    messages: any[]

}
export const ComplaintSchema = SchemaFactory.createForClass(Complaint)
