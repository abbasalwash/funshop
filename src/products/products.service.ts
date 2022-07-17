import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import Product from './product.entity';
import ProductDto from './product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import BrandsService from 'src/brands/brands.service';

@Injectable()
export default class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly brandsService: BrandsService,
  ) {}

  async getAllProducts() {
    return await this.productsRepository.find();
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (product) {
      return product;
    }

    throw new HttpException(
      `Product with id ${id} not found.`,
      HttpStatus.NOT_FOUND,
    );
  }

  async updateProduct(id: string, product: ProductDto) {
    const productFromDb = await this.getProductById(id);

    if (productFromDb) {
      productFromDb.price = this.getRoundPrice(product.price);
      productFromDb.type = product.type;
      productFromDb.brand = await this.brandsService.getBrandById(
        product.brandId,
      );
      await this.productsRepository.update(id, productFromDb);

      return productFromDb;
    }
  }

  async createProduct(product: ProductDto) {
    const newProduct = this.productsRepository.create({
      type: product.type,
      price: this.getRoundPrice(product.price),
      brand: await this.brandsService.getBrandById(product.brandId),
    });

    return await this.productsRepository.save(newProduct);
  }

  async deleteProduct(id: string) {
    const deleteResponse = await this.productsRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException(
        `Product with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private getRoundPrice(price: number) {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  }
}
