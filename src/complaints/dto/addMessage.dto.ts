import { IsEnum, IsString } from 'class-validator';
import { MessageStatus } from '../enum/status.enum';

export class AddMessageDto {

    @IsString()
    token: string;

    @IsString()
    text: string;


    @IsEnum(MessageStatus)
    status: MessageStatus;
}