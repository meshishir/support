import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './schema/appointment.schema';
import { AvailabilityService } from './availability.service';
import { Slot, SlotSchema } from './schema/slot.schema';
import { ComplaintsModule } from '../complaints/complaints.module';
import { UsersModule } from '../users/users.module';
import { Complaint } from '../complaints/schema/complaints.schema';

@Module({
  imports: [ComplaintsModule,
    MongooseModule.forFeature([{
      name: Appointment.name, schema: appointmentSchema,
    },
    {
      name: Slot.name, schema: SlotSchema
    },
    ])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AvailabilityService]
})
export class AppointmentsModule { }
