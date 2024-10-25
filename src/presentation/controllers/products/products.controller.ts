import { ProductsRequestDto } from '@app/domain/products/dto/products-request.dto';
import { ProductsUpdateDto } from '@app/domain/products/dto/products-update.dto';
import { ProductsServices } from '@app/services/products/products.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/**
 * Todo controller
 */
@Controller('Products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productServices: ProductsServices) {}

  /**
   * Create a new product
   * @param createproductDto
   * @returns
   */
  @Post()
  create(@Body() createproductDto: ProductsRequestDto) {
    return this.productServices.create(createproductDto);
  }

  /**
   * Get all products
   * @returns
   */
  @Get()
  findAll() {
    return this.productServices.findAll();
  }

  /**
   * Get todo by id
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productServices.findOne(id);
  }

  /**
   * Update todo
   * @param id
   * @param updateTodoDto
   * @returns
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductsUpdateDto) {
    return this.productServices.update(id, updateProductDto);
  }

  /**
   * Remove todo
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id') idProducts: string) {
    return this.productServices.remove(idProducts);
  }
}
