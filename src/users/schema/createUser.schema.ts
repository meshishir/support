import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Roles } from "../Enum/roles.enum";
import { Gender } from "../Enum/gender.enum";
import * as bcrypt from 'bcrypt';



export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema {
    @Prop({ required: true, unique: true })
    userId: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop()
    age: number
    @Prop()
    address: string;
    @Prop({ required: true, enum: Roles, default: Roles.USER })
    role: string;
    @Prop({ required: true, enum: Gender, default: Gender.MALE })
    gender: string;

    @Prop({ type: Number, unique: true })
    phone: number;


}
export const userSchema = SchemaFactory.createForClass(UserSchema);

interface IUser extends Document {
    password?: string;
}

userSchema.pre('save', async function <IUser>(next) {
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next(null, this);
    }
    return next(null, this);
});

