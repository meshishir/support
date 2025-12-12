import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComplaintsModule } from './complaints/complaints.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsModule } from './appointments/appointments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/support'),
    ComplaintsModule,
    AppointmentsModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
