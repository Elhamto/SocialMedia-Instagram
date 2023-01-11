import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  @ApiPropertyOptional()
  gender?: string;

  @IsString()
  @MaxLength(150)
  @IsOptional()
  @ApiPropertyOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  photo?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  phoneNumber?: string;

  // @IsBoolean()
  // @IsOptional()
  // @ApiPropertyOptional({
  //   description: 'true or false',
  //   example: 'true',
  // })
  // visiblity?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  visiblity?: string;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  followers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  followings?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  closeUsers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  hideUsers?: CreateUserDto[];

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  blockUsers?: CreateUserDto[];
}

export class UserLoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
