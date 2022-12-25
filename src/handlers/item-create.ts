import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBItemService } from '../dynamo-db/dynamo-item-service';
import { allRequiredPropertiesAreNotNull, buildLambdaResponse, eventHasBody, parseEventBody } from './handler-helpers';

interface createItemRequest {
  tableName: string;
  item: any;
  params: AWS.DynamoDB.PutItemInput;
}

const dynamo = new DynamoDBItemService();

export async function createItem(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if(!eventHasBody(event))
    return buildLambdaResponse(400, 'Invalid request: missing event body');

  let request: createItemRequest;
  try {
    // Parse while checking for undefined properties
    request = parseEventBody<createItemRequest>(event.body!);

    // checking for null required properties
    const requestValidation = allRequiredPropertiesAreNotNull(request);
    if(!requestValidation.allRequiredPropsNotNull)
        return buildLambdaResponse(400, 'Invalid request: missing the following properties: ' + requestValidation.missingProperties.join(', '));

    // SAVE ITEM
    await dynamo.putItem(request.params);

    // return success response
    return buildLambdaResponse(201, 'Item created: ' + JSON.stringify(request.item));
  } catch (error) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
}