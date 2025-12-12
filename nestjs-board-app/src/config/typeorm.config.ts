import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig = (
  configSercive: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configSercive.get('DB_HOST'),
    port: Number(configSercive.get('DB_PORT')),
    username: configSercive.get('DB_USERNAME'),
    password: configSercive.get('DB_PASSWORD'),
    database: configSercive.get('DB_DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
  };
};
