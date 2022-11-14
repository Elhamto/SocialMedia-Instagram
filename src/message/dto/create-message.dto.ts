import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  from: any;

  @IsNotEmpty()
  to: any;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsBoolean()
  @IsOptional()
  liked: boolean;
}
