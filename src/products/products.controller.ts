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
import ProductDto from './product.dto';

import ProductsService from './products.service';

@Controller('products')
@UseGuards(AuthGuard())
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() product: ProductDto) {
    return await this.productsService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return await this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(id);
  }
}
