import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { allRequiredPropertiesAreNotNull, buildLambdaResponse, eventHasBody, parseEventBody } from './handler-helpers';
import { DynamoDBItemService } from '../dynamo-db/dynamo-item-service';

interface listItemsRequest {
    tableName: string;
    isQuery: boolean;
    params: AWS.DynamoDB.ScanInput | AWS.DynamoDB.QueryInput;
}

const dynamo = new DynamoDBItemService();

export async function listItems(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if(!eventHasBody(event))
        return buildLambdaResponse(400, 'Invalid request: missing event body');

    let request: listItemsRequest;
    try {
        // Parse while checking for undefined properties
        request = parseEventBody<listItemsRequest>(event.body!);

        // checking for null required properties
        const requestValidation = allRequiredPropertiesAreNotNull(request);
        if(!requestValidation.allRequiredPropsNotNull)
            return buildLambdaResponse(400, 'Invalid request: missing the following properties: ' + requestValidation.missingProperties.join(', '));

        // SCAN OR QUERY ITEMS
        const result = request.isQuery ? await dynamo.query(request.params) : await dynamo.scan(request.params);

        // return success response
        return buildLambdaResponse(200, result.Items);
    } catch (error) {
        console.error(error);
        return buildLambdaResponse(500, error.message);
    }
}