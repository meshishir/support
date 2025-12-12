import { IsString, MinLength, IsNumber, IsNotEmpty, Matches } from 'class-validator';


export class CreateComplaintDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters long' })
    name: string;

    @IsNumber()
    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: 'Phone number must be at least 10 digits long' })
    phone?: Number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Invalid email format' })
    email: string;

    @IsString()
    description: string;
}