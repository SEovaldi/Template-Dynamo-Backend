# Dynamo DB and API Gateway Backend

A backend api powered by aws lambda that uses dynamodb as a database.

## Setup

- Run `yarn install`
- To get DynamoDB running locally, run `yarn install:dynamo-offline`
  - You will need the java runtime installed
    - https://www.oracle.com/java/technologies/downloads/#java8

## Notes

- The endpoints expect data to already be in DynamoDB AttributeValue object format
  - to automatically convert your data before sending it, use `AWS.DynamoDB.Converter.marshall(item)` in your project.

## Running Locally

- Run `yarn sls:offline"`


### TODO : aws-sdk v3
```
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { from } from '@aws-sdk/util-dynamodb';

// Set the region to 'localhost' and the endpoint to the port on which the DynamoDB Local server is running
const client = new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' });

const params = {
  TableName: 'my-table',
  Item: from({
    id: '123',
    name: 'John',
    age: 30
  })
};

client.putItem(params).promise()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

```