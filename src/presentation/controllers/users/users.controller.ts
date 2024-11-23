import { Auth } from '@app/common/decorators/auth.decorator';
import { UserRequestDto } from '@app/domain/user/dto/user-request.dto';
import { UserResponseDto } from '@app/domain/user/dto/user-response.dto';
import { UserUpdateDto } from '@app/domain/user/dto/user-update.dto';
import { UserService } from '@app/services/users/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/**
 * Controlador de usuario
 */
@ApiBearerAuth('access-token')
@Auth()
@ApiTags('Usuario')
@Controller('usuario')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  createUsuario(@Body() body: UserRequestDto): Promise<UserResponseDto> {
    return this._userService.createUsuario(body);
  }

  @Get()
  getUsuarios(): Promise<UserResponseDto[]> {
    return this._userService.getUsuarios();
  }

  @Get(':id')
  getUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this._userService.getUsuarioById(id);
  }

  @Put(':id')
  updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return this._userService.updateUsuario(id, body);
  }

  @Delete(':id')
  deleteUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this._userService.deleteUsuario(id);
  }
}
