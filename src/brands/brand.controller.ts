import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import BrandDto from './brand.dto';

import BrandsService from './brands.service';

@Controller('brands')
export default class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get()
  getAllBrands() {
    return this.brandService.getAllBrands();
  }

  @Get(':id')
  getBrandById(@Param('id') id: string) {
    return this.brandService.getBrandById(id);
  }

  @Post()
  createBrand(@Body() brand: BrandDto) {
    return this.brandService.createBrand(brand);
  }

  @Put(':id')
  updateBrand(@Param('id') id: string, @Body() brand: BrandDto) {
    return this.brandService.updateBrand(id, brand);
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}
