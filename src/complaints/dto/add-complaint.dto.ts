import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddMessageDto } from './addMessage.dto';

export class AddComplaintDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => AddMessageDto)
    message?: AddMessageDto;
}