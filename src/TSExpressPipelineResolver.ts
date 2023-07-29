import * as appsync from 'aws-cdk-lib/aws-appsync';
import type { IConstruct } from 'constructs';
import { AppsyncTypescriptFunction } from './AppsyncTypescriptFunction';

export interface TSExpressPipelineResolverProps extends appsync.ResolverProps {
  /**
   * Instance of AppsyncTypescriptFunction construct
   */
  readonly typescriptFunction: AppsyncTypescriptFunction;
}

const defaultPipelineCode: string = `
// The before step
export function request() {
    return {}
}
// The after step
export function response(ctx) {
    return ctx.prev.result
}`;

/**
 * Appsync's JS pipeline resolver with default bolierplate code using AppsyncTypescriptFunction construct
 */
export class TSExpressPipelineResolver extends appsync.Resolver {
  constructor(
    scope: IConstruct,
    id: string,
    props: TSExpressPipelineResolverProps,
  ) {
    const { typescriptFunction: appsyncFunction, ...resolverProps } = props;
    super(scope, id, {
      ...resolverProps,
      pipelineConfig: [appsyncFunction],
      code: appsync.Code.fromInline(defaultPipelineCode),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });
  }
}
