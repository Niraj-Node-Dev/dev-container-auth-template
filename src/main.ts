import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { HOST, PORT, SWAGGER_DOC_ENDPOINT } from './config';
import { swagger } from './swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  swagger(app, SWAGGER_DOC_ENDPOINT);

  const port = PORT;
  app.listen(port, HOST, () => {
    const host = HOST === '0.0.0.0' ? 'localhost' : HOST;
    console.log(`Server started port=${port}, url=http://${host}:${port}}`);
    console.log(`find api doc preview  on=http://${host}:${port}/${SWAGGER_DOC_ENDPOINT}`);
    console.log(`find api doc json on=http://${host}:${port}/${SWAGGER_DOC_ENDPOINT}.json`);
    console.log(`find api doc yaml on=http://${host}:${port}/${SWAGGER_DOC_ENDPOINT}.yaml`);
  });
}
bootstrap();
