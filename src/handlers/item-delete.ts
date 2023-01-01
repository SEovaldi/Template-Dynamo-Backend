import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";
import { buildLambdaResponse } from "./handler-helpers";

const dynamo = new DynamoDBItemService();

export const handler = async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const pathParameters: itemDeletePathParameters = event.pathParameters as {
      id: string;
    };

    if (!pathParameters.id)
      return buildLambdaResponse(
        400,
        "Invalid request: missing path parameter 'id'"
      );

    // delete item
    const params: AWS.DynamoDB.DeleteItemInput =
      createDynamoDeleteParams(pathParameters);
    await dynamo.deleteItem(params);

    // return success response
    return buildLambdaResponse(200, "Item Deleted");
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
};

interface itemDeletePathParameters {
  id: string;
}

/**
 * @param  {itemDeletePathParameters} pathParameters itemDeletePathParameters
 * @returns AWS.DynamoDB.DeleteItemInput
 * @description Creates a DynamoDB Delete DeleteItemInput based on a lambda's path parameters
 */
function createDynamoDeleteParams(
  pathParameters: itemDeletePathParameters
): AWS.DynamoDB.DeleteItemInput {
  const params: AWS.DynamoDB.DeleteItemInput = {
    TableName: "my-table",
    Key: {
      id: { S: pathParameters.id },
    },
  };
  return params;
}
