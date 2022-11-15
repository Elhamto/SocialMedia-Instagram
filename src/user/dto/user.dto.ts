import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  //   @Validate(IsUnique, { message: 'Isnot unique name' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  gender?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsBoolean()
  visiblity: boolean;

  @IsArray()
  @IsOptional()
  followers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  followings?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  closeUsers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  hideUsers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  blockUsers?: CreateUserDto[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}