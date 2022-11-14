import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  // Validate,
} from 'class-validator';
import { UserDto } from "./user.dto";

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
  gender: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsBoolean()
  visiblity: boolean;

  @IsArray()
  @IsOptional()
  followers: UserDto[];

  @IsArray()
  @IsOptional()
  followings: UserDto[];

  @IsArray()
  @IsOptional()
  closeUsers: UserDto[];

  @IsArray()
  @IsOptional()
  hideUsers: UserDto[];

  @IsArray()
  @IsOptional()
  blockUsers: UserDto[];
}
