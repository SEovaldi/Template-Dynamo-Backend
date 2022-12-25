import * as AWS from "aws-sdk";

export class DynamoDBTableService {
  private readonly dynamoDb: AWS.DynamoDB;

  constructor() {
    this.dynamoDb = new AWS.DynamoDB();
  }

  public async createTable(
    params: AWS.DynamoDB.CreateTableInput
  ): Promise<AWS.DynamoDB.CreateTableOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.createTable(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async deleteTable(
    params: AWS.DynamoDB.DeleteTableInput
  ): Promise<AWS.DynamoDB.DeleteTableOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.deleteTable(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async describeTable(
    params: AWS.DynamoDB.DescribeTableInput
  ): Promise<AWS.DynamoDB.DescribeTableOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.describeTable(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async updateTable(
    params: AWS.DynamoDB.UpdateTableInput
  ): Promise<AWS.DynamoDB.UpdateTableOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.updateTable(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async listTables(
    params: AWS.DynamoDB.ListTablesInput
  ): Promise<AWS.DynamoDB.ListTablesOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.listTables(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
