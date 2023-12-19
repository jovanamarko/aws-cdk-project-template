import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppConfig } from '../src/models/app-config';
import { DynamodbStack } from '../lib/dynamodb-stack';

const app = new cdk.App();
const appConfig: AppConfig = {
  Name: 'credit-pm',
  Stage: 'dev',
  Account: '12345678',
  Region: 'us-east-1',
  GithubConnectionArn: 'string',
};
describe('Check if Dynamodb Stack is created', () => {
  it('Dynamodb Stack Created', () => {
    const dynamodbStack = new DynamodbStack(app, 'DynamodbStack', appConfig);
    const templateStack = Template.fromStack(dynamodbStack);
    templateStack.hasResourceProperties('AWS::DynamoDB::Table', {
      TableName: 'user-activity-dev',
    });
  });
});
