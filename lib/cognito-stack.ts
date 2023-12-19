import * as cdk from 'aws-cdk-lib';
import {
  StringAttribute,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { AppConfig } from '../src/models/app-config';

export class CognitoStack extends cdk.Stack {
  public userPoolClientId: string;
  public userPool: cdk.aws_cognito.IUserPool;

  constructor(
    scope: Construct,
    id: string,
    appConfig: AppConfig,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const userPool = new UserPool(
      this,
      `${appConfig.Name}-pool-${appConfig.Stage}`,
      {
        selfSignUpEnabled: false, // Allow users to sign up
        autoVerify: { email: true }, // Verify email addresses by sending a verification code
        signInAliases: { email: true }, // Set email as an alias
        customAttributes: {
          userId: new StringAttribute({ minLen: 1, maxLen: 255 }),
          tenantId: new StringAttribute({ minLen: 1, maxLen: 255 }),
        },
      },
    );

    const userPoolClient = new UserPoolClient(
      this,
      `${appConfig.Name}-pool-client-${appConfig.Stage}`,
      {
        userPool,
        generateSecret: false,
        authFlows: {
          adminUserPassword: true,
          custom: true,
          userPassword: true,
          userSrp: true,
        },
      },
    );

    this.userPool = userPool;
    this.userPoolClientId = userPoolClient.userPoolClientId;
  }
}
