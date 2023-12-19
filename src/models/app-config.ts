import { IUserPool } from 'aws-cdk-lib/aws-cognito';

export interface AppConfig {
  Name: string;
  Stage: string;
  Account: string;
  Region: string;
  GithubConnectionArn: string;
  UserPool?: IUserPool;
  UserPoolClientId?: string;
}
