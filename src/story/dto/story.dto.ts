import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStoryDto {
  //   @Validate(IsUnique, { message: 'Isnot unique name' })
  @IsNotEmpty()
  @ApiProperty()
  owner: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string; //url

  @IsDate()
  @ApiProperty()
  expiration: Date; //lazeme? nemishe hamaro 24h goft?

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  likes?: any;

  // @IsString()
  // reply: string;
}

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
