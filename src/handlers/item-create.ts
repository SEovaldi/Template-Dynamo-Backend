import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";
import {
  buildLambdaResponse,
  eventHasBody,
  parseEventBody,
} from "./handler-helpers";

interface createItemRequest {
  params: AWS.DynamoDB.PutItemInput;
}

const dynamo = new DynamoDBItemService();

export const handler = async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (!eventHasBody(event))
    return buildLambdaResponse(400, "Invalid request: missing event body");

  let request: createItemRequest;
  try {
    // TODO: refactor to only require an item object, move table name to set in file
    // Parse while checking for undefined properties
    request = parseEventBody<createItemRequest>(event.body!);

    // save item
    await dynamo.putItem(request.params);

    // return success response
    return buildLambdaResponse(
      201,
      "Item created: " + JSON.stringify(request.params.Item)
    );
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
};
