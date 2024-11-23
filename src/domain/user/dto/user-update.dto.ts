import { PartialType } from '@nestjs/swagger';
import { UserRequestDto } from './user-request.dto';

/**
 * Data Transfer Object para la actualización de un usuario
 */
export class UserUpdateDto extends PartialType(UserRequestDto) {}
