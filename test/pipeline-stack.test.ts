import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AppConfig } from '../src/models/app-config';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const appConfig: AppConfig = {
  Name: 'credit-pm',
  Stage: 'dev',
  Account: '12345678',
  Region: 'us-east-1',
  GithubConnectionArn: 'string',
};
describe('Check if Pipeline Stack is created', () => {
  it('Pipeline Stack Created', () => {
    const pipelineStack = new PipelineStack(app, 'PipelineStack', appConfig);
    const template = Template.fromStack(pipelineStack);

    template.hasResourceProperties('AWS::CodePipeline::Pipeline', {
      Stages: [
        {
          Name: 'Source',
        },
        {
          Name: 'Build',
        },
      ],
    });
  });
});
