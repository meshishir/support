import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import mongoose from 'mongoose';
import { Roles } from './Enum/roles.enum';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.usersService.findByUserId(userId);
  }

  @Patch(':userId')
  async updateUser(@Param("userId") userId: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.update(userId, updateUser);
  }

  // Handle PATCH /users (no id provided)
  @Patch()
  noIdPatch() {
    throw new HttpException('No Id found', 404);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    const isvalid = mongoose.isValidObjectId(userId);
    if (!isvalid) throw new HttpException('Invalid Id', 400);

    return this.usersService.remove(userId);
  }

  // Handle DELETE /users (no id provided)
  @Delete()
  noIdDelete() {
    throw new HttpException('No Id found', 404);
  }
}
