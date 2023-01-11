import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  owner: CreateUserDto;

  @IsUrl() // @IsString()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  caption?: string;

  @IsOptional()
  @ApiPropertyOptional()
  comments: Array<any>;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  likes?: CreateUserDto;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  viewCount?: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
