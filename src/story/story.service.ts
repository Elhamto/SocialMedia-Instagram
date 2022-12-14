import { Injectable } from '@nestjs/common';
import { CreateStoryDto, UpdateStoryDto } from './dto/story.dto';

@Injectable()
export class StoryService {
  create(createStoryDto: CreateStoryDto) {
    return 'This action adds a new story';
  }

  findAll() {
    return `This action returns all story`;
  }

  findOne(id: number) {
    return `This action returns a #${id} story`;
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
