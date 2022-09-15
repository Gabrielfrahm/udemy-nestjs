import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './Dtos/create-category.dto';
import { updateCategoryDto } from './Dtos/update-category.dto';
import { Category } from './interface/category';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playerService: PlayersService,
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

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getCategoryBy(category: string): Promise<Category> {
    const findCategory = await this.categoryModel.findOne({ category }).exec();

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    return findCategory;
  }

  async updateCategory(
    category: string,
    updateCategoryDto: updateCategoryDto,
  ): Promise<Category> {
    const findCategory = await this.categoryModel.findOne({ category }).exec();

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    return await this.update(category, updateCategoryDto);
  }

  async includesCategoryPlayer(params: string[]): Promise<void> {
    const category = params['category'];
    const playerId = params['playerId'];

    const findCategory = await this.categoryModel.findOne({ category }).exec();
    const findPlayerInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId)
      .exec();

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    if (findPlayerInCategory.length > 0) {
      throw new BadRequestException('Player already register in this category');
    }

    findCategory.players.push(playerId);
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: findCategory })
      .exec();
  }

  async SaveCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return await category.save();
  }

  async update(
    category: string,
    updateCategoryDto: updateCategoryDto,
  ): Promise<Category> {
    return await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDto })
      .exec();
  }
}
