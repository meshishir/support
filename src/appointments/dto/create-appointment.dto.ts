import { IsDate, IsDefined, IsEnum, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { AppointmentStatus } from "../enum/appointmentStatus.enum";
import { Roles } from "../../users/Enum/roles.enum";
import { CreateUserDto } from "../../users/dto/createUser.dto";
import { Type } from "class-transformer";

export class CreateAppointmentDto {

    @IsString()
    @IsNotEmpty()
    repId: CreateUserDto;

    @IsDate()
    startTime: Date;


    @IsEnum({ AppointmentStatus, default: AppointmentStatus.SCHEDULED })
    status: AppointmentStatus;
}
