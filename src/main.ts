import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './configuration';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  //
  const config = new DocumentBuilder()
    .setTitle('Scheduler API')
    .setDescription('Background Job Scheduler API')
    .setVersion('1.0')
    .addTag('Scheduler')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  //
  await app.listen(configuration().port, () => {
    console.log(
      `Server is running on http://localhost:${configuration().port}`,
    );
  });
}
bootstrap();
