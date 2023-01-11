import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @ApiProperty()
  from: any;

  @IsNotEmpty()
  @ApiProperty()
  to: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  liked?: boolean;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) {}
