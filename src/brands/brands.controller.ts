import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import BrandDto from './brand.dto';

import BrandsService from './brands.service';

@Controller('brands')
@UseGuards(AuthGuard())
export default class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  async getAllBrands() {
    return await this.brandService.getAllBrands();
  }

  @Get(':id')
  async getBrandById(@Param('id') id: string) {
    return await this.brandService.getBrandById(id);
  }

  @Post()
  async createBrand(@Body() brand: BrandDto) {
    return await this.brandService.createBrand(brand);
  }

  @Put(':id')
  async updateBrand(@Param('id') id: string, @Body() brand: BrandDto) {
    return await this.brandService.updateBrand(id, brand);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return await this.brandService.deleteBrand(id);
  }
}
