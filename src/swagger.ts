import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_GATEWAY, APP_NAME, VERSION } from './config';

/**
 * @description to create swagger documentation
 * @param app
 */
export async function swagger(app: INestApplication, endpoint: string) {
    const options = new DocumentBuilder()
        .setTitle(`${APP_NAME}`)
        .setDescription(
            'API Documentation\
         \n NOTE: The API with (LOCK) symbol can be used only after providing Login API response token in (Authorize)\
         \n -Parameter with * are required to execute related API',
        )
        .setVersion(VERSION)
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            name: 'Authorization',
            in: 'header',
        })
        .addServer(API_GATEWAY, 'The api gateway to communicate with servers')
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        include: [],

        deepScanRoutes: true,
    });

    SwaggerModule.setup(endpoint, app, document, {
        customSiteTitle: 'API',
        explorer: false,
        jsonDocumentUrl: `${endpoint}.json`,
        yamlDocumentUrl: `${endpoint}.yaml`,
    });
}
