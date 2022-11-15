import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/user.dto';

export class CreatePostDto {
  @IsNotEmpty()
  owner: CreateUserDto;

  @IsUrl() // @IsString()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsOptional()
  comments: Array<any>;

  @IsArray()
  @IsOptional()
  likes?: CreateUserDto;

  @IsNumber()
  @IsOptional()
  viewCount?: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
