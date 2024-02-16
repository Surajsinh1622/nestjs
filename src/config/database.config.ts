import { join, normalize } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Define TypeORM configuration for MySQL
const mysqlConfig: MysqlConnectionOptions = {
  type: 'mysql',
  logging: false,
  entities: [normalize(join(__dirname, '..', 'entities', '*{.ts,.js}'))],
  synchronize: true,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Define TypeORM configuration for PostgreSQL
const postgresConfig: PostgresConnectionOptions = {
  type: 'postgres',
  logging: false,
  entities: [normalize(join(__dirname, '..', 'entities', '*{.ts,.js}'))],
  synchronize: false,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Export a function that returns the appropriate configuration based on the database type
export function getTypeOrmConfig():
  | MysqlConnectionOptions
  | PostgresConnectionOptions {
  switch (process.env.DB_TYPE) {
    case 'mysql':
      return mysqlConfig;
    case 'postgres':
      return postgresConfig;
    default:
      throw new Error('Invalid database type specified.');
  }
}
