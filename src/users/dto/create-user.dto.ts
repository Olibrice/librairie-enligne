
import { IsEmail, IsNotEmpty, IsString,  MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserSignInDto } from "./UserSignInDto";
export class CreateUserDto extends UserSignInDto{

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    @ApiProperty({
        description:'User last name',})
    nom: string;

    @IsNotEmpty({message: 'first name is required'})
    @IsString({message: 'first name must be a string'})
    @ApiProperty({
        description:'User first name',})
    prenom: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email is invalid'})
    @ApiProperty({
        description:'User email',})
    email: string;
    
    @IsNotEmpty()
    @MinLength(8, {message: 'confirm_password minimum character should be 8'})
    @ApiProperty({
        description:'User confirm_password',})
    confirm_password: string;


} 
