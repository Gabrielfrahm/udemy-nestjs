import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './Dtos/create-category.dto';
import { updateCategoryDto } from './Dtos/update-category.dto';
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

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:category')
  async getByCategory(@Param('category') category: string): Promise<Category> {
    return await this.categoryService.getCategoryBy(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: updateCategoryDto,
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(
      category,
      updateCategoryDto,
    );
  }

  @Post('/:category/players/:playerId')
  async includesCategoryPlayer(@Param() params: string[]): Promise<void> {
    return await this.categoryService.includesCategoryPlayer(params);
  }
}
