import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";
import {
  buildLambdaResponse,
  eventHasBody,
  parseEventBody,
} from "./handler-helpers";

interface queryItemsRequest {
  params: AWS.DynamoDB.QueryInput;
}

const dynamo = new DynamoDBItemService();

export const handler = async function (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  if (!eventHasBody(event))
    return buildLambdaResponse(400, "Invalid request: missing event body");

  let request: queryItemsRequest;
  try {
    // Parse while checking for undefined properties
    request = parseEventBody<queryItemsRequest>(event.body!);

    // save item
    const result: AWS.DynamoDB.QueryOutput = await dynamo.query(request.params);

    // return success response
    return buildLambdaResponse(200, result.Items);
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
};
