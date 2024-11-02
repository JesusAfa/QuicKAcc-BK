import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { SERVICES } from './services';
import { PROFILES } from './profiles';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    InfrastructureModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:
            configService.get<string>('NODE_ENV') === 'production'
              ? '1h'
              : '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...SERVICES, ...PROFILES],
  exports: [...SERVICES],
})
export class ServiceModule {}
