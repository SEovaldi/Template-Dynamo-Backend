import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildLambdaResponse } from "./handler-helpers";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";

const dynamo = new DynamoDBItemService();

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (!event.pathParameters) {
    return buildLambdaResponse(400, "Invalid request: missing path parameter");
  }

  try {
    // List Items
    const params: AWS.DynamoDB.ScanInput = createDynamoScanParams(event);
    const result = await dynamo.scan(params);

    // return success response
    return buildLambdaResponse(200, result.Items);
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
}

/**
 * @param  {APIGatewayProxyEvent} event APIGatewayProxyEvent
 * @returns AWS.DynamoDB.ScanInput
 * @description Determines the DynamoDB Scan parameters based on a lambda event's path parameters
 */
function createDynamoScanParams(
  event: APIGatewayProxyEvent
): AWS.DynamoDB.ScanInput {
  interface tableListPathParameters {
    table: string;
  }
  const pathParameters: tableListPathParameters = event.pathParameters as {
    table: string;
  };

  const params: AWS.DynamoDB.ScanInput = {
    TableName: pathParameters.table,
  };
  return params;
}
