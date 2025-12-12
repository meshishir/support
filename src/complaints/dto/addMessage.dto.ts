import { IsString } from 'class-validator';
import { Sender } from '../enum/sender.enum';


export class AddMessageDto {
    @IsString({})
    from: Sender


    @IsString()
    text: string;
}