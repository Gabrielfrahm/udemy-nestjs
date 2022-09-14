import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './Dtos/create-category.dto';
import { Category } from './interface/category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {
    this.categoryModel = categoryModel;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const findCategory = await this.categoryModel
      .findOne({
        category: createCategoryDto.category,
      })
      .exec();
    if (findCategory) {
      throw new BadRequestException('Category already existis');
    }
    return this.SaveCategory(createCategoryDto);
  }

  async SaveCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return await category.save();
  }
}
