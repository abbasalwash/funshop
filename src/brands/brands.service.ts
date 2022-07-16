import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BrandDto from './brand.dto';
import Brand from './brand.entity';

@Injectable()
export default class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
  ) {}

  async getAllBrands() {
    return await this.brandsRepository.find();
  }

  async getBrandById(id: string) {
    const brand = await this.brandsRepository.findOneBy({ id });

    if (brand) {
      return brand;
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async updateBrand(id: string, brand: BrandDto) {
    const brandFromDb = await this.getBrandById(id);

    if (brandFromDb) {
      brandFromDb.name = brand.name;
      await this.brandsRepository.update(id, brandFromDb);

      return brandFromDb;
    }
  }

  async createBrand(brand: BrandDto) {
    const newBrand = this.brandsRepository.create(brand);

    try {
      await this.brandsRepository.save(newBrand);
    } catch (error) {
      const errorMessage = error.toString();
      if (errorMessage.indexOf('UNIQUE') > -1) {
        throw new HttpException(
          `Brand with name: ${brand.name} already exists.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    return newBrand;
  }

  async deleteBrand(id: string) {
    try {
      const deleteResult = await this.brandsRepository.delete(id);

      if (!deleteResult.affected) {
        throw new HttpException(
          `Brand with id ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.toString();
      if (errorMessage.indexOf('FOREIGN KEY') > -1) {
        throw new HttpException(
          `Brand with id ${id} has relation with product and can not be removed.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
