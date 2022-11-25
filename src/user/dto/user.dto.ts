import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  //   @Validate(IsUnique, { message: 'Isnot unique name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  gender?: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  // @IsBoolean()
  // @IsOptional()
  // visiblity?: boolean;

  @IsString()
  @IsOptional()
  visiblity?: string;

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
