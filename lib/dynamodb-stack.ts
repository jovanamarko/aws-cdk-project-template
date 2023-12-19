import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AppConfig } from '../src/models/app-config';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamodbStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    appConfig: AppConfig,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    new dynamodb.Table(this, `${appConfig.Name}-dynamodb-${appConfig.Stage}`, {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.SNAPSHOT,
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      pointInTimeRecovery: true,
      tableName: `user-activity-${appConfig.Stage}`,
    });
  }
}
