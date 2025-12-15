import { IsDate, IsDefined, IsEnum, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { AppointmentStatus } from "../enum/appointmentStatus.enum";

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    repId: String;

    @IsDate()
    startTime: Date;

    @IsEnum({ AppointmentStatus, default: AppointmentStatus.SCHEDULED })
    status: AppointmentStatus;
}
