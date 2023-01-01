# DraftOffAPI

BFF for DraftOff

## Setup

- Run `yarn install`
- To get DynamoDB running locally, run `yarn install:dynamo-offline`
  - You will need the java runtime installed
    - https://www.oracle.com/java/technologies/downloads/#java8

## Notes

- The endpoints expect data to already be in DynamoDB AttributeValue object format
  - to automatically convert your data before sending it, use `AWS.DynamoDB.Converter.marshall(item)` in your project.
