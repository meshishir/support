import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ComplaintSchema } from './schema/complaints.schema';


@Module({
  imports: [MongooseModule.forFeature(
    [{ name: 'Complaint', schema: ComplaintSchema }]
  )],
  controllers: [ComplaintsController],
  providers: [ComplaintsService],
})
export class ComplaintsModule { }
