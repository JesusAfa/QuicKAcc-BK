import { Auth } from '@app/common/decorators/auth.decorator';
import {
  LoginRequest,
  LoginResponse,
  TokenData,
} from '@app/domain/security/dto/security.dto';
import { SecurityService } from '@app/services/security/security.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('security')
@ApiTags('Security')
export class SecurityController {
  constructor(private readonly _securityService: SecurityService) {}

  @Post('login')
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this._securityService.login(loginRequest);
  }

  @Auth()
  @Post('refreshToken')
  async refresh(): Promise<LoginResponse> {
    return this._securityService.refresh();
  }

  @Auth()
  @Post('validateToken')
  async validateToken(): Promise<LoginResponse> {
    return this._securityService.validateToken();
  }

  // @Post('recoverPassword')
  // async recoverPassword(
  //   @Body() recoverPasswordRequest: RecoverPasswordRequest,
  // ): Promise<{ message: string }> {
  //   return this._securityService.recoverPassword(recoverPasswordRequest);
  // }

  // @Post('changePassword')
  // async changePassword(
  //   @Body() changePasswordRequest: ChangePasswordRequest,
  // ): Promise<boolean> {
  //   return this._securityService.changePassword(changePasswordRequest);
  // }

  @Auth()
  @Get('tokenData')
  async tokenData(): Promise<TokenData> {
    return this._securityService.getTokenData();
  }
}
