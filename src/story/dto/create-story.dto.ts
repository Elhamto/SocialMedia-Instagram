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
  owner: any;

  @IsString()
  @IsNotEmpty()
  content: string; //url

  @IsDate()
  expiration: Date; //lazeme? nemishe hamaro 24h goft?

  @IsArray()
  @IsOptional()
  likes: any;

  // @IsString()
  // reply: string;
}
