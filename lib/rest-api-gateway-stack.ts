import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { AppConfig } from '../src/models/app-config';

export class RestApiGatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    appConfig: AppConfig,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    new RestApi(this, `rest-api-${appConfig.Stage}`, {
      description: `${appConfig.Name} REST API`,
      deployOptions: {
        stageName: appConfig.Stage,
      }, // enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });

    //TODO: Define the lambdas here
  }
}
