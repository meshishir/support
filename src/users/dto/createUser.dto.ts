import { Matches, IsEmail, IsNotEmpty, IsNumber, IsEnum, IsString, MinLength, ValidateNested, IsOptional } from "class-validator";
import { Gender } from "../Enum/gender.enum";
import { Roles } from "../Enum/roles.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MinLength(3, { message: 'Name is too short' })
    name: string;

    @IsNumber()
    age: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsNumber()
    phone: number;

    @IsString()
    @MinLength(6, { message: 'Password is too short' })
    @Matches(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).+$/, {
        message: 'Password must contain uppercase, lowercase, and a number',
    })
    password: string;

    @IsEnum(Gender, { message: 'Gender must be male, female, or other' })
    gender: Gender;

    @IsEnum(Roles, { message: 'Role must be admin, user, or guest' })
    role: Roles;


}
