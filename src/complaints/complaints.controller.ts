import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { from } from 'rxjs';
import { AddMessageDto } from './dto/addMessage.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) { }

  @Post()
  create(@Body() body: CreateComplaintDto) {
    return this.complaintsService.create(body);
  }
  @Get()
  findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':token')
  findByToken(@Param('token') token: string) {
    return this.complaintsService.findByToken(token);
  }

  @Post(':token/messages')
  addMessage(@Param('token') token: string, @Body() body: AddMessageDto) {
    return this.complaintsService.addMessage(token, body);
  }

  @Put(':token/status')
  async updateStatus(@Param('token') token: string, @Body('status') status: string) {
    return this.complaintsService.updateStatus(token, status);
  }

}
