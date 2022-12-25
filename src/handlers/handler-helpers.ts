import { APIGatewayProxyResult } from "aws-lambda";

export function parseEventBody<T>(body: string): T {
  if (!body) {
    throw new Error(
      "Failed to parse event body: event body is null or undefined"
    );
  }
  return JSON.parse(body);
}

export function validateEventBody<T>(body: string, schema: any): T {
  const result = schema.validate(body);
  if (result.error) {
    throw new Error(`Failed to validate event body: ${result.error.message}`);
  }
  return result.value;
}

export function buildLambdaResponse(
  statusCode: number,
  body: any
): APIGatewayProxyResult {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

export function eventHasBody(event: any): boolean {
  return event && event.body;
}

export function allRequiredPropertiesAreNotNull<T extends object>(
  obj: T
): { missingProperties: any[]; allRequiredPropsNotNull: boolean } {
  const missingProperties = Object.keys(obj).filter((key) => obj[key] === null);
  return {
    missingProperties,
    allRequiredPropsNotNull: missingProperties.length === 0,
  };
}
