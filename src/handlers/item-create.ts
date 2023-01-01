import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";
import {
  allRequiredPropertiesAreNotNull,
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
    // Parse while checking for undefined properties
    console.log("Parsing event body: " + event.body);
    request = parseEventBody<createItemRequest>(event.body!);

    // checking for null required properties
    const requestValidation = allRequiredPropertiesAreNotNull(request);
    if (!requestValidation.allRequiredPropsNotNull)
      return buildLambdaResponse(
        400,
        "Invalid request: missing the following properties: " +
          requestValidation.missingProperties.join(", ")
      );

    // SAVE ITEM
    console.log("Saving item: " + JSON.stringify(request.params.Item));
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
