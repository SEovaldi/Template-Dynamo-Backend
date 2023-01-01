import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";
import {
  buildLambdaResponse,
  eventHasBody,
  parseEventBody,
} from "./handler-helpers";

interface updateItemRequest {
  UpdateExpression: string;
  ExpressionAttributeNames: AWS.DynamoDB.ExpressionAttributeNameMap;
  ExpressionAttributeValues: AWS.DynamoDB.ExpressionAttributeValueMap;
}

const dynamo = new DynamoDBItemService();

export const handler = async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (!eventHasBody(event))
    return buildLambdaResponse(400, "Invalid request: missing event body");

  let updateItemRequest: updateItemRequest;
  try {
    // Parse while checking for undefined properties
    const pathParameters: itemUpdatePathParameters = event.pathParameters as {
      id: string;
    };

    if (!pathParameters.id)
      return buildLambdaResponse(
        400,
        "Invalid request: missing path parameter 'id'"
      );

    // Parse while checking for undefined properties
    updateItemRequest = parseEventBody<updateItemRequest>(event.body!);

    // save item
    const params: AWS.DynamoDB.UpdateItemInput = createDynamoUpdateParams(
      pathParameters,
      updateItemRequest
    );

    const result = await dynamo.updateItem(params);

    // return success response
    return buildLambdaResponse(
      200,
      "Item updated: " + JSON.stringify(result.Attributes)
    );
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
};

interface itemUpdatePathParameters {
  id: string;
}

/**
 * @param  {itemUpdatePathParameters} pathParameters
 * @param  {updateItemRequest} updateItemRequest
 * @returns AWS.DynamoDB.UpdateItemInput
 * @description Creates an DynamoDB UpdateItemInput object
 */
function createDynamoUpdateParams(
  pathParameters: itemUpdatePathParameters,
  updateItemRequest: updateItemRequest
): AWS.DynamoDB.UpdateItemInput {
  const params: AWS.DynamoDB.UpdateItemInput = {
    TableName: "my-table",
    Key: {
      id: { S: pathParameters.id },
    },
    UpdateExpression: updateItemRequest.UpdateExpression,
    ExpressionAttributeNames: updateItemRequest.ExpressionAttributeNames,
    ExpressionAttributeValues: updateItemRequest.ExpressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };
  return params;
}
