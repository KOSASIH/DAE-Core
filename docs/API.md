# API Documentation

## Introduction

The DAE-Core API provides a set of endpoints for interacting with the DAE framework. This document outlines the available endpoints, request/response formats, and usage examples.

## Base URL

https://api.dae-core.com/v1


## Endpoints

### 1. User Registration

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Request Body**:
  
```json
1  {
2    "username": "string",
3    "email": "string",
4    "password": "string"
5  }
```

- Response

```json
1 {
2  "message": "User  registered successfully",
3  "userId": "string"
4 }
```

### 2. Create Proposal

- **Endpoint**: /governance/proposals
- **Method**: POST
- **Request Body**:

```json
1 {
2  "title": "string",
3  "description": "string",
4  "options": ["string"]
5 }
```

- Response:

```json
1 {
2  "message": "Proposal created successfully",
3  "proposalId": "string"
4 }
```

3. Get Marketplace Items

-**Endpoint**: /marketplace/items
- **Method**: GET
- **Response**:

```json
1 [
2  {
3    "itemId": "string",
4   "name": "string",
5    "price": "number"
6  }
7 ]
```

# Conclusion

This API documentation provides a starting point for developers to interact with the DAE-Core framework. For more detailed information, please refer to the source code and additional documentation.
