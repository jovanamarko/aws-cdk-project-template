import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CognitoStack } from '../lib/cognito-stack';
import { AppConfig } from '../src/models/app-config';

const app = new cdk.App();
const appConfig: AppConfig = {
  Name: 'credit-pm',
  Stage: 'dev',
  Account: '12345678',
  Region: 'us-east-1',
  GithubConnectionArn: 'string',
};
describe('Check if Cognito Stack is created', () => {
  it('Cognito Stack Created', () => {
    const cognitoStack = new CognitoStack(app, 'CognitoStack', appConfig);
    const template = Template.fromStack(cognitoStack);

    template.hasResourceProperties('AWS::Cognito::UserPool', {
      AutoVerifiedAttributes: ['email'],
    });
  });
});
