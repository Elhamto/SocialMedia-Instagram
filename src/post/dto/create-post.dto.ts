import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserDocument } from 'src/user/schema/user.schema';

export class CreatePostDto {
  @IsNotEmpty()
  owner: UserDocument;

  @IsUrl() // @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  caption: string;

  @IsOptional()
  comments: Array<any>;

  @IsArray()
  @IsOptional()
  likes: UserDocument;

  @IsNumber()
  @IsOptional()
  viewCount: number;
}
