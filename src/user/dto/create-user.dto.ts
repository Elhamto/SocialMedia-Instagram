import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { UserDocument } from '../schema/user.schema';

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
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

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
  followers: UserDocument;

  @IsArray()
  @IsOptional()
  followings: UserDocument;

  @IsArray()
  @IsOptional()
  closeUsers: UserDocument;

  @IsArray()
  @IsOptional()
  hideUsers: UserDocument;

  @IsArray()
  @IsOptional()
  blockUsers: UserDocument;
}
