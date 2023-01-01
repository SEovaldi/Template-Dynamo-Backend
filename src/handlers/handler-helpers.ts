import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

/**
 * @param  {string} body JSON string
 * @returns Typed object
 * @description Parse a JSON string into a typed object
 * @throws Error if body is null or undefined
 */
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

/**
 * @param  {number} statusCode
 * @param  {any} body
 * @returns APIGatewayProxyResult
 * @description Build a response object for an AWS Lambda function
 * @throws Error if body is null or undefined
 */
export function buildLambdaResponse(
  statusCode: number,
  body: any
): APIGatewayProxyResult {
  if (!body) {
    throw new Error(
      "Failed to build Lambda response: response body is null or undefined"
    );
  }
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

/**
 * @param  {any} event
 * @returns boolean
 * @description Check if an event has a body
 */
export function eventHasBody(event: APIGatewayProxyEvent): boolean {
  return event && event.body !== null && event.body !== undefined;
}

export function allRequiredPropertiesAreNotNull<T extends object>(
  obj: T
): { missingProperties: any[]; allRequiredPropsNotNull: boolean } {
  const missingProperties = (Object.keys(obj) as (keyof T)[]).filter(
    (key) => key in obj && obj[key] === null
  );
  return {
    missingProperties,
    allRequiredPropsNotNull: missingProperties.length === 0,
  };
}
