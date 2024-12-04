import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/customLogger';
var fs = require('fs');

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./.cert/key.pem'),
    cert: fs.readFileSync('./.cert/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
    httpsOptions,
  });
  app.enableCors();
  await app.listen(443);
}
bootstrap();
