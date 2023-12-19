import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppConfig } from '../src/models/app-config';
import { RestApiGatewayStack } from '../lib/rest-api-gateway-stack';

const app = new cdk.App();
const appConfig: AppConfig = {
  Name: 'credit-pm',
  Stage: 'dev',
  Account: '12345678',
  Region: 'us-east-1',
  GithubConnectionArn: 'string',
};
describe('Check if Gateway Stack is created', () => {
  it('RestApi Gateway Stack Created', () => {
    const restApiGatewayStack = new RestApiGatewayStack(
      app,
      'RestApiGatewayStack',
      appConfig,
    );
    const template = Template.fromStack(restApiGatewayStack);

    template.hasResourceProperties('AWS::ApiGateway::RestApi', {
      Description: 'credit-pm REST API',
      Name: 'rest-api-dev',
    });
  });
});
