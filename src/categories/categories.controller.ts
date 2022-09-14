import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './Dtos/create-category.dto';
import { Category } from './interface/category';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {
    this.categoryService = categoryService;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }
}
