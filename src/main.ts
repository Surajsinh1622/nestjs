import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  Logger,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Main');

  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for all origins
    app.enableCors();

    // Enable API versioning via Accept-Version header
    app.enableVersioning({
      type: VersioningType.HEADER,
      header: 'Accept-Version',
    });

    // Set global API prefix
    app.setGlobalPrefix('api/v1', {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    });

    // Use validation pipe for request validation
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    // Use helmet middleware for basic security headers
    app.use(helmet());

    //swagger
    const config = new DocumentBuilder()
      .setTitle('My project')
      .setDescription('My project API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // Check if PORT environment variable is defined before listening
    if (process.env.PORT) {
      await app.listen(process.env.PORT);
      logger.log(`Listening on port ${process.env.PORT}`);
    } else {
      throw new Error('PORT environment variable is not defined.');
    }
  } catch (error) {
    logger.error(`Error starting the application: ${error}`);
    process.exit(1); // Exit the application with a non-zero exit code
  }
}

bootstrap();
