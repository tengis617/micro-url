# micro-url
a url shortening microservice using express and redis.

## Getting Started
1. clone repo
2. run `docker-compose up` to start redis. (**note:** redis port has been changed to `6380`)
3. run `yarn && yarn start` (**note:** yarn is just a personal preference, you can use npm)
4. service will be running on `localhost:3000`
You can also run `yar test` to run all tests

## API
### **POST /generate** 

* **Data Params**
`url` - URL to shorten 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ ok: true, id : 'fe14f', shortUrl : 'localhost:3000/fe14f', longUrl: 'example.com' }`

* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ ok: false, message: 'invalid url: example' }`

### **GET /:id** 
*  **URL Params**

   **Required:**
   `id=[string]`
* **Success Response:**
  * Will redirect to long url
* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ ok: false, message: 'No url found with id: example' }`
