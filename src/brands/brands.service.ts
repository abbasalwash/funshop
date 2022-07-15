import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqliteErrorCode } from 'src/database/sqliteErrorCode';
import { Repository } from 'typeorm';

import BrandDto from './brand.dto';
import Brand from './brand.entity';

@Injectable()
export default class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  getAllBrands() {
    return this.brandRepository.find();
  }

  async getBrandById(id: string) {
    const brand = await this.brandRepository.findOneBy({ id: id });

    if (brand) {
      return brand;
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async updateBrand(id: string, brand: BrandDto) {
    const brandFromDb = await this.brandRepository.findOneBy({ id: id });

    if (brandFromDb) {
      brandFromDb.name = brand.name;
      await this.brandRepository.update(id, brandFromDb);

      return brandFromDb;
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async createBrand(brand: BrandDto) {
    const newBrand = this.brandRepository.create(brand);

    try {
      await this.brandRepository.save(newBrand);
    } catch (error) {
      if (error?.errno === SqliteErrorCode.UniqueViolation) {
        throw new HttpException(
          `Brand with name: ${brand.name} already exists.`,
          HttpStatus.CONFLICT,
        );
      }
    }

    return newBrand;
  }

  async deleteBrand(id: string) {
    const deleteResponse = await this.brandRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException(
        `Brand with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
