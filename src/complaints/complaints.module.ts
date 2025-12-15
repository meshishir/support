import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './schema/complaints.schema';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [UsersModule,
    MongooseModule.forFeature(
      [{ name: 'Complaint', schema: ComplaintSchema }]
    )],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
  exports: [ComplaintsService, MongooseModule]
})
export class ComplaintsModule { }
