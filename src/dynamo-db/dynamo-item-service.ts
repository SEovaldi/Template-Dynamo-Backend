import * as AWS from "aws-sdk";

export class DynamoDBItemService {
  private readonly dynamoDb: AWS.DynamoDB;
  private options: AWS.DynamoDB.ClientConfiguration = {};

  constructor() {
    if (process.env.IS_OFFLINE) {
      console.log("Dynamo is running locally");
      this.options = {
        region: "localhost",
        endpoint: "http://localhost:8000",
        accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
        secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
      };
    }

    this.dynamoDb = new AWS.DynamoDB(this.options);
  }

  public async putItem(
    params: AWS.DynamoDB.PutItemInput
  ): Promise<AWS.DynamoDB.PutItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.putItem(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async getItem(
    params: AWS.DynamoDB.GetItemInput
  ): Promise<AWS.DynamoDB.GetItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.getItem(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async updateItem(
    params: AWS.DynamoDB.UpdateItemInput
  ): Promise<AWS.DynamoDB.UpdateItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.updateItem(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async deleteItem(
    params: AWS.DynamoDB.DeleteItemInput
  ): Promise<AWS.DynamoDB.DeleteItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.deleteItem(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async query(
    params: AWS.DynamoDB.QueryInput
  ): Promise<AWS.DynamoDB.QueryOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.query(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async scan(
    params: AWS.DynamoDB.ScanInput
  ): Promise<AWS.DynamoDB.ScanOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.scan(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
