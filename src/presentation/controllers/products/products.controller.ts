import { Auth } from '@app/common/decorators/auth.decorator';
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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  @ApiBearerAuth('access-token')
  @Auth()
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productServices.findOne(id);
  }

  /**
   * Update todo
   * @param id
   * @param updateTodoDto
   * @returns
   */
  @ApiBearerAuth('access-token')
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductsUpdateDto) {
    return this.productServices.update(id, updateProductDto);
  }

  /**
   * Remove todo
   * @param id
   * @returns
   */
  @Auth()
  @Delete(':id')
  remove(@Param('id') idProducts: string) {
    return this.productServices.remove(idProducts);
  }
}
