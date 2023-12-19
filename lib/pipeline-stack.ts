import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from 'aws-cdk-lib/pipelines';
import { AppConfig } from '../src/models/app-config';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';

export class PipelineStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    appConfig: AppConfig,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const statements = [
      new PolicyStatement({
        actions: ['ssm:*'],
        effect: Effect.ALLOW,
        resources: [
          `arn:aws:ssm:${appConfig.Region}:${appConfig.Account}:parameter/*`,
        ],
      }),
      new PolicyStatement({
        actions: ['sts:AssumeRole'],
        effect: Effect.ALLOW,
        resources: [`arn:aws:iam::${appConfig.Account}:role/*`],
      }),
    ];

    new CodePipeline(this, `${appConfig.Name}-Pipeline-${appConfig.Stage}`, {
      pipelineName: `${appConfig.Name}-Pipeline-${appConfig.Stage}`,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'teamup-with-t34ms/credit-pm-backend',
          `${appConfig.Stage}`,
          {
            connectionArn: appConfig.GithubConnectionArn,
            triggerOnPush: true,
            actionName: 'Build-Deploy',
          },
        ),
        commands: [
          'npm install -g aws-cdk',
          'npm ci',
          `cdk synth --app "npx ts-node --prefer-ts-exts bin/credit-pm-backend.ts" -c config=${appConfig.Stage}`,
          `cdk deploy --app "npx ts-node --prefer-ts-exts bin/credit-pm-backend.ts" --all --require-approval never -c config=${appConfig.Stage}`,
        ],
      }),
      codeBuildDefaults: {
        buildEnvironment: {
          environmentVariables: {
            PROJECT_NAME: { value: appConfig.Name },
            ACCOUNT: { value: appConfig.Account },
            STAGE: { value: appConfig.Stage },
            REGION: { value: appConfig.Region },
            GITHUB_CONNECTION_ARN: { value: appConfig.GithubConnectionArn },
          },
        },
        rolePolicy: statements,
      },
      selfMutation: false,
    });
  }
}
