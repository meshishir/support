import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema, UserDocument } from './schema/createUser.schema';
import { Model } from 'mongoose';
import { v4 as uuid4 } from 'uuid';


@Injectable()
export class UsersService {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) throw new ConflictException('User already registered with this email');
    let userId: string;
    if (createUserDto.role === 'admin') {
      userId = 'A-' + uuid4().slice(0, 8).toUpperCase();
    }
    else if (createUserDto.role === 'rep') {
      userId = 'R-' + uuid4().slice(0, 8).toUpperCase();
    }
    else {
      userId = 'U-' + uuid4().slice(0, 8).toUpperCase();
    }

    createUserDto.userId = userId;

    const created = new this.userModel({
      ...createUserDto,
    });

    return created.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findByUserId(userId: string) {
    const c = await this.userModel.findOne({ userId }).lean();
    if (!c) throw new ConflictException('User not found');
    return c;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const c = await this.userModel.findOne({ userId }).lean();
    if (!c) throw new ConflictException('User not found');
    return this.userModel.findOneAndUpdate({ userId }, updateUserDto, { new: true }).lean();
  }

  async remove(userId: string) {
    return this.userModel.findOneAndDelete({ userId }).exec();
  }


}
