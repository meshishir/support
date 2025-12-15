import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './schema/appointment.schema';
import { Slot, SlotSchema } from './schema/slot.schema';
import { ComplaintsModule } from '../complaints/complaints.module';

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
  providers: [AppointmentsService,]
})
export class AppointmentsModule { }
