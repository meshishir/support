import { Controller, Post, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post(':token')
  async create(@Param('token') token: string) {
    return this.appointmentsService.create(token);
  }

}
