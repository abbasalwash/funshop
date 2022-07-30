import { Test, TestingModule } from '@nestjs/testing';

import BrandsController from 'src/brands/brands.controller';
import BrandsService from 'src/brands/brands.service';

describe('BrandsController', () => {
  beforeAll(async () => {
    const brandServiceProvider = {
      provide: BrandsService,
      useFactory: () => ({
        getAllBrands: jest.fn(() => []),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [BrandsService, brandServiceProvider],
    }).compile();
  });
});
