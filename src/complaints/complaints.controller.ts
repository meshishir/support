import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { AddComplaintDto } from './dto/add-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) { }

  @Post(":userId")
  addComplaint(@Param('userId') userId: string, @Body() body: AddComplaintDto) {
    return this.complaintsService.addComplaint(userId, body);
  }
  @Get()
  findAll() {
    return this.complaintsService.findAll();
  }

  @Post(':token')
  findByToken(@Param('token') token: string) {
    return this.complaintsService.findByToken(token);
  }

  // http://localhost:3000/complaints/CMP-2590DDF9
  @Patch(':token')
  updateMessageStatus(@Param('token') token: string, @Body('status') status: string) {
    return this.complaintsService.updateMessageStatus(token, status);
  }

  @Delete(':token')
  removeMessage(@Param('token') token: string) {
    return this.complaintsService.removeMessage(token);
  }

}


