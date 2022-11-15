import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  owner: CreatePostDto;

  @IsUrl() // @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsOptional()
  comments: Array<any>;

  @IsArray()
  @IsOptional()
  likes?: CreatePostDto;

  @IsNumber()
  @IsOptional()
  viewCount?: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
