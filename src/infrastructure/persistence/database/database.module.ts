import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ENTITIES } from '@app/domain/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      url: process.env.DATABASE_URL,
      // port: parseInt(process.env.DB_PORT, 10) || 5432,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      entities: [...ENTITIES],
      logging: true,
      synchronize: true,
    }),
  ],
})
@Global()
export class DatabaseModule {}
