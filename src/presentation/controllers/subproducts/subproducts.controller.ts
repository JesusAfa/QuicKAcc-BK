import { Auth } from '@app/common/decorators/auth.decorator';
import { SubProductsRequestDto } from '@app/domain/subproducts/dto/subproducts-request.dto';
import { SubProductsUpdateDto } from '@app/domain/subproducts/dto/subproducts-update.dto';
import { SubProductsServices } from '@app/services/subproducts/subproducts.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * SubProducts controller
 */
@ApiBearerAuth('access-token')
@Auth()
@Controller('SubProducts')
@ApiTags('SubProducts')
export class SubProductsController {
  constructor(private readonly SubproductServices: SubProductsServices) {}

  /**
   * Create a new product
   * @param createproductDto
   * @returns
   */
  @Post()
  create(@Body() createproductDto: SubProductsRequestDto) {
    return this.SubproductServices.create(createproductDto);
  }

  /**
   * Get all Subproducts
   * @returns
   */
  @Get()
  findAll() {
    return this.SubproductServices.findAll();
  }

  /**
   * Get todo by id
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.SubproductServices.findOne(id);
  }

  /**
   * Update todo
   * @param id
   * @param updateTodoDto
   * @returns
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: SubProductsUpdateDto,
  ) {
    return this.SubproductServices.update(id, updateProductDto);
  }

  /**
   * Remove todo
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id') idSubProducts: string) {
    return this.SubproductServices.remove(idSubProducts);
  }
}
