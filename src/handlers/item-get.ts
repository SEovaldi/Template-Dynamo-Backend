import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { buildLambdaResponse } from "./handler-helpers";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";

const dynamo = new DynamoDBItemService();

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const pathParameters: itemGetPathParameters = event.pathParameters as {
      id: string;
    };

    if (!pathParameters.id)
      return buildLambdaResponse(
        400,
        "Invalid request: missing path parameter 'id'"
      );

    // Get Item
    const params: AWS.DynamoDB.GetItemInput =
      createDynamoGetParams(pathParameters);
    const result = await dynamo.getItem(params);

    // return success response
    return buildLambdaResponse(200, result.Item);
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
}

interface itemGetPathParameters {
  id: string;
}

/**
 * @param  {itemGetPathParameters} pathParameters itemGetPathParameters
 * @returns AWS.DynamoDB.GetItemInput
 * @description Creates a DynamoDB GetItemInput based on a lambda's path parameters
 */
function createDynamoGetParams(
  pathParameters: itemGetPathParameters
): AWS.DynamoDB.GetItemInput {
  const params: AWS.DynamoDB.DeleteItemInput = {
    TableName: "my-table",
    Key: {
      id: { S: pathParameters.id },
    },
  };
  return params;
}
