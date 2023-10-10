import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateLivreDto {
    @IsNotEmpty({message:'title can not be blank.'})
    @IsString()
    @ApiProperty({
        description:'Book Title',
        })
    title:string;
    
    @IsNotEmpty({message:'description can not be empty.'})
    @IsString()
    @ApiProperty({
        description:'Book Description' }
        )
    description:string;

    @IsNotEmpty({message:'price should not be empty'})
    @IsNumber({maxDecimalPlaces:2},{message:'price should be number & max decimal precission 2'})
    @IsPositive({message:'price should be positive number'})
    @ApiProperty({
        description:'Book Price'
        }
        )
    price:number;

    @IsNotEmpty({message:'author can not be empty.'})
    @IsString()
    @ApiProperty({
        description:'Book Author'
        })
    author:string;

    @IsNotEmpty({message:'stock should not be empty.'})
    @IsNumber({},{message:'stock should be number'})
    @Min(0,{message:'stock can not be negative.'})
    @ApiProperty({
        description:'Stock'
        })
    stock:number;

    @IsNotEmpty({message:'images should not be empty.'})
    @IsArray({message:'images should be in array format.'})
    @ApiProperty({
        description:'Book Images'})
    images:string[]

    @IsNotEmpty({message:'genre should not be empty.'})
    @IsNumber({},{message:'genre should be number'})
    @ApiProperty({
        description:'Genre Id'
        })
    genreId:number;

}
