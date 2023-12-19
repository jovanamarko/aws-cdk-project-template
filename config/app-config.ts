import { AppConfig } from '../src/models/app-config';
import { ensureString } from '../src/utils/functions.utils';
import * as cdk from 'aws-cdk-lib';

/**
 *  @param app {cdk.App}
 *  @returns AppConfig
 *  @description Gets the app config from the context variables if present, if not uses process.env variables that should be available within the pipeline and returns it as an AppConfig object.
 *
 * */
export function getAppConfig(app: cdk.App): AppConfig {
  const env = app.node.tryGetContext('config');
  const contextEnv = app.node.tryGetContext(env);

  if (contextEnv) {
    return {
      Name: ensureString(contextEnv, 'PROJECT_NAME'),
      Stage: ensureString(contextEnv, 'STAGE'),
      Account: ensureString(contextEnv, 'ACCOUNT'),
      Region: ensureString(contextEnv, 'REGION'),
      GithubConnectionArn: ensureString(contextEnv, 'GITHUB_CONNECTION_ARN'),
    };
  } else {
    return {
      Name: ensureString(process.env, 'PROJECT_NAME'),
      Stage: ensureString(process.env, 'STAGE'),
      Account: ensureString(process.env, 'ACCOUNT'),
      Region: ensureString(process.env, 'REGION'),
      GithubConnectionArn: ensureString(process.env, 'GITHUB_CONNECTION_ARN'),
    };
  }
}
