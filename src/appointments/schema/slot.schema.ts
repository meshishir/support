import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SlotDocument = Slot & Document;

@Schema({ timestamps: true })
export class Slot extends Document {
    @Prop({ required: true })
    repId: string;

    @Prop({ required: true })
    start: Date;

    @Prop({ required: true })
    end: Date;

    @Prop({ default: false })
    locked: boolean;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);

