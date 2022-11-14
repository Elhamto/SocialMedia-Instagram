import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { User, UserDocument } from '../schema/user.schema';

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

  @IsBoolean()
  visiblity: boolean;
}
