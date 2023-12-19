#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoStack } from '../lib/cognito-stack';
import { RestApiGatewayStack } from '../lib/rest-api-gateway-stack';
import { DynamodbStack } from '../lib/dynamodb-stack';
import { AppConfig } from '../src/models/app-config';
import { getAppConfig } from '../config/app-config';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const appConfig: AppConfig = getAppConfig(app);

const cognitoStack = new CognitoStack(
  app,
  `${appConfig.Name}-CognitoStack-${appConfig.Stage}`,
  appConfig,
  {
    env: {
      account: appConfig.Account,
      region: appConfig.Region,
    },
  },
);

new RestApiGatewayStack(
  app,
  `${appConfig.Name}-RestApiGatewayStack-${appConfig.Stage}`,
  {
    ...appConfig,
    UserPool: cognitoStack.userPool,
    UserPoolClientId: cognitoStack.userPoolClientId,
  },
  {
    env: {
      account: appConfig.Account,
      region: appConfig.Region,
    },
  },
);

new DynamodbStack(
  app,
  `${appConfig.Name}-DynamodbStack-${appConfig.Stage}`,
  appConfig,
  {
    env: {
      account: appConfig.Account,
      region: appConfig.Region,
    },
  },
);

new PipelineStack(
  app,
  `${appConfig.Name}-PipelineStack-${appConfig.Stage}`,
  appConfig,
  {
    env: {
      account: appConfig.Account,
      region: appConfig.Region,
    },
  },
);
