import * as AWS from "aws-sdk";
import { APIGatewayProxyResult } from "aws-lambda";
import { buildLambdaResponse } from "./handler-helpers";
import { DynamoDBItemService } from "../dynamo-db/dynamo-item-service";

const dynamo = new DynamoDBItemService();

export async function handler(): Promise<APIGatewayProxyResult> {
  try {
    // List Items
    const params: AWS.DynamoDB.ScanInput = {
      TableName: "my-table",
    };
    const result = await dynamo.scan(params);

    // return success response
    return buildLambdaResponse(200, result.Items);
  } catch (error: any) {
    console.error(error);
    return buildLambdaResponse(500, error.message);
  }
}
