/**
 * Application entry point
 */

/* 3rd-party modules */
import { NestFactory } from '@nestjs/core';
import {} from 'dotenv';
/* Application modules */
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.createApplicationContext(AppModule);

}

bootstrap();
