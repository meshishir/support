import { Controller, Post, Param, Body, Patch, Get } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post(':messageToken')
  async create(@Param('messageToken') token: string, @Body() body: CreateAppointmentDto) {
    return this.appointmentsService.create(token, body);
  }

  @Patch(':messageToken')
  async update(@Param('messageToken') token: string, @Body() body: UpdateAppointmentDto) {
    return this.appointmentsService.update(token, body);
  }

  @Get(":repId")
  async getAppointments(@Param('repId') repId: string) {
    return this.appointmentsService.getAppointments(repId);
  }


}
