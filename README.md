# World Vision

## How to run
To run the app, use the following command:
```
docker-compose up --build
```
When it is ready, `web` container will print the ip address, for example:

`web       |   On Your Network:  http://172.60.0.0:3000`

Visit the address in a browser to enjoy!

---

**Note**: If you run the app for the first time, the `server` container might stop, saying the database is not ready to be used. You can safely ignore the message because it only occurs when mounting the volume for `mySQL` and the `server` container will eventually run when the `mySQL` container is ready.

## Architecture
![architecture](https://user-images.githubusercontent.com/48105703/142818093-26c7fb3e-6317-4dcf-b7f3-da49ab31307d.png)

Flask server provides API to send a mail to the admin email account. React uses this API to implement the contact-us page. Firebase is responsible for authentication.

## API
<details>
<summary>(Click the arrow to open) You can import this to SwaggerHub for the visual description of the API</summary>
  
```yaml
openapi: 3.0.0
info:
  description: Documentation for cmpt353 API
  version: "1.0.0"
  title: cmpt353 API
paths:
  /api/staff:
    get:
      description: |
        If userId is given as a parameter, returns the staff. Otherwise, return every staff
        The return type is array. So if the userId is given, its size will be 1
      parameters:
        - in: query
          name: userId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Staff"
        "404":
          description: "Staff not found with the given userId"
    
    post:
      description: |
        Create a new staff
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Staff"
              
      responses:
        "201":
          description: "Created"
        "400":
          description: "Request body doesn't contain required parameters"
        "409":
          description: "The given userId is already in use"
          
    put:
      description: |
        Update the staff
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Staff"
              required:
                - userId
      
      responses:
        "200":
          description: "Updated"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Staff not found with the given userId"
          
    delete:
      description: |
        Delete the staff
        
      parameters:
        - in: query
          name: userId
          required: True
          schema:
            type: string
      responses:
        "200":
          description: "Deleted"
        "400":
          description: "Parameter userId is missing"
        "404":
          description: "Staff not found with the given userId"
          
  /api/customer:
    get:
      description: |
        If userId is given as a parameter, returns the customer. Otherwise, return every customer in the database
        The return type is array. So if the userId is given, its size will be 1
      parameters:
        - in: query
          name: userId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Customer"
        "404":
          description: "Customer not found with the given userId"
    
    post:
      description: |
        Create a new Customer.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Customer"
              
      responses:
        "201":
          description: "Created"
        "400":
          description: "Request body doesn't contain required parameters"
        "409":
          description: "The given userId is already in use"
          
    put:
      description: |
        Update the Customer.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Customer"
              required:
                - userId
      
      responses:
        "200":
          description: "Updated"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Customer not found with the given userId"
          
    delete:
      description: |
        Delete the Customer
        
      parameters:
        - in: query
          name: userId
          required: True
          schema:
            type: string
      responses:
        "200":
          description: "Deleted"
        "400":
          description: "Parameter userId is missing"
        "404":
          description: "Customer not found with the given userId"
          
  /api/recipient:
    get:
      description: |
        If recipientUserId is given as a parameter, returns the recipient. Else if customerUserId is given, returns the recipients of the customer. Else if both recipient and customer id are given, recipientUserId will be ignored and only consider customerUserId. Otherwise, return every recipient in the database. The return type is array. So if recipientUserId is given, its size will be 1.
      parameters:
        - in: query
          name: recipientUserId
          required: false
          schema:
            type: string
        - in: query
          name: customerUserId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Recipient"
        "404":
          description: "Recipient not found"
    
    post:
      description: |
        Create a new recipient
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Recipient"
              
      responses:
        "201":
          description: "Created"
        "400":
          description: "Request body doesn't contain required parameters"
        "409":
          description: "The given userId is already in use"
          
    put:
      description: |
        Update the Recipient. The given userId must be recipient account.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Recipient"
              required:
                - userId
      
      responses:
        "200":
          description: "Updated"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Recipient not found with the given userId"
          
    delete:
      description: |
        Delete the Recipient from the database
        
      parameters:
        - in: query
          name: userId
          required: True
          schema:
            type: string
      responses:
        "200":
          description: "Deleted"
        "400":
          description: "Parameter userId is missing"
        "404":
          description: "Recipient not found with the given userId"
          
  
  /api/donation:
    get:
      description: |
        Get every monthly donation of the given customerUsedId. If recipientUserId is also given, returns an array of a single monthly donation
      parameters:
        - in: query
          name: customerUserId
          required: true
          schema:
            type: string
        - in: query
          name: recipientUserId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Donation"
        "400":
          description: "Missing customerUserId"
        "404":
          description: "Given customerUserId or recipientUserId is not found in the database"
    
    post:
      description: |
        Create a new monthly donation. Given id and nextTransactionDate values will be ignored.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Donation"
              
      responses:
        "201":
          description: "Created"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Given customerId or recipientId is not found in the database"
        "409":
          description: "The donation between given customerUserId and recipientUserId already exists"
          
    put:
      description: |
        Update the monthly donation. id and nextTransactionDate fields will be ignored.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Donation"
      
      responses:
        "200":
          description: "Updated"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Donation not found with given customerUserId and recipientUserId"
          
    delete:
      description: |
        Delete every monthly donation of the given customerUsedId. If recipientUserId is also given, only deletes the single monthly donation
        
      parameters:
        - in: query
          name: customerUserId
          required: true
          schema:
            type: string
        - in: query
          name: recipientUserId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Deleted"
        "400":
          description: "Missing customerUserId as a parameter"
        "404":
          description: "Donation between customer and recipient not found in the database"
          
  /api/transaction:
    get:
      description: |
        Get every transaction of the given customerUsedId. If recipientUserId is also given, returns the transactions to the recipient
      parameters:
        - in: query
          name: customerUserId
          required: true
          schema:
            type: string
        - in: query
          name: recipientUserId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Transaction"
        "400":
          description: "Missing customerUserId"
        "404":
          description: "Given customerId is not found in the database"
          
    post:
      description: |
        Create a new transaction. Given id and timestamp values will be ignored
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Transaction"
              
      responses:
        "201":
          description: "Created"
        "400":
          description: "Request body doesn't contain required parameters"
        "404":
          description: "Given customerUserId or recepientUserId is not found in the database"
    
    delete:
      description: |
        Delete every transaction of the given customerUsedId. If recipientUserId is also given, only deletes the transactions to the recipient
        
      parameters:
        - in: query
          name: customerUserId
          required: true
          schema:
            type: string
        - in: query
          name: recipientUserId
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Deleted"
        "400":
          description: "Missing customerUserId as a parameter"
        "404":
          description: "Given customerUserId is not found in the database"
          
  /api/accountType:
    get:
      description: |
        Returns either Staff, Customer or Recipient
      parameters:
        - in: query
          name: userId
          required: true
          schema:
            type: string
      
      responses:
        "200":
          description: "OK"
          content:
            application/text:
              schema:
                type: string
                example: "Staff or Customer or Recipient"

        "400":
          description: "Missing userId from the request parameter"
        "404":
          description: "Given userId is not found in the database"
          
          
  /mail:
    post:
      description: |
        Send the mail to the administrator
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Mail"
      responses:
        "201":
          description: "Sent"
        "400":
          description: "Missing required parameters"
      
components:
  schemas:
    Staff:
      type: object
      properties:
        userId:
          type: string
        firstName:
          type: string
          example: Sahngwoo
        middleName:
          type: string
          nullable: true
        lastName:
          type: string
          example: Kim
        homeAddress:
          type: object
          format: Address
      
    Customer:
      type: object
      properties:
        userId:
          type: string
        firstName:
          type: string
          example: Sahngwoo
        middleName:
          type: string
          nullable: true
        lastName:
          type: string
          example: Kim
        card:
          type: object
          format: "#/components/schemas/Card"
          nullable: true
        billingAddress:
          type: object
          format: Address
          
    Card:
      type: object
      properties:
        number:
          type: string
          example: "1000-1000-1000-1000"
        expirationDate:
          type: string
          format: date
          description: A string that describes date in ISO 8601 format
          example: "2016-10-27"
        cvv:
          type: string
          example: "123"

    Recipient:
      type: object
      properties:
        userId:
          type: string
        firstName:
          type: string
          example: Sahngwoo
        middleName:
          type: string
          nullable: true
        lastName:
          type: string
          example: Kim
        birthDate:
          description: A string that describes date in ISO 8601 format
          type: string
          format: date
          example: "2016-10-27"
        homeAddress:
          type: object
          format: Address
        gender:
          type: string
          example: Male
        description:
          type: string
          example: "He needs money"
        
    Address:
      type: object
      properties:
        buildingNumber:
          type: string
        street:
          type: string
        city:
          type: string
        province:
          type: string
        postalCode:
          type: string
        country:
          type: string
          
    Transaction:
      type: object
      properties:
        id:
          type: integer
        customerUserId:
          type: string
        amount:
          type: number
        timestamp:
          description: A string that describes datetime in IOS 8601 format 
          type: string
          format: datetime
          example: "2016-10-27T17:13:40Z"
        recipientUserId:
          type: string
    
    Donation:
      type: object
      properties:
        id:
          type: integer
        customerUserId:
          type: string
        recipientUserId:
          type: string
        monthlyTransactionAmount:
          type: number
        nextTransactionDate:
          type: string
          description: A string that describes datetime in IOS 8601 format 
          format: date
          example: "2016-10-27"
          
    Mail:
      type: object
      properties:
        senderEmail:
          type: string
          example: sak772@usask.ca
        title:
          type: string
          example: Regarding the cmpt353 project
        message:
          type: string
          example: Our project is too great and worth 100% mark

servers:
  # Added by API Auto Mocking Plugin
  - description: SwaggerHub API Auto Mocking
    url: https://virtserver.swaggerhub.com/cmpt353/cmpt353/1.0.0
```
</details>

## Database
![database](https://user-images.githubusercontent.com/48105703/142818926-10d36c42-f596-4648-83a8-23eef349acf1.png)
