import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import Brand from './brand.interface';
import BrandDto from './brand.dto';

@Injectable()
export default class BrandsService {
  private brands: Brand[] = [];

  getAllBrands() {
    return this.brands;
  }

  getBrandById(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);

    if (brand) {
      return brand;
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  updateBrand(id: string, brand: BrandDto) {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);

    if (brandIndex >= 0) {
      this.brands[brandIndex].name = brand.name;

      return this.brands[brandIndex];
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  createBrand(brand: BrandDto) {
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: brand.name,
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  deleteBrand(id: string) {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);

    if (brandIndex >= 0) {
      this.brands.splice(brandIndex, 1);

      return;
    }

    throw new HttpException(
      `Brand with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
