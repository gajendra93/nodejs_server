# nodejs_server

A NodeJS Server performing the following operations.
1. Listens on port 3001 and reads content from local directory.
2. RESTful api that takes two parameters in a GET call and produces their product.
3. RESTful api that accepts a file content and writes to the disk.

## Steps to Run:
1. npm install.
2. Run typescript task (tsc).
3. npm start.

## API description:
1. GET /file => Read file from the local directory.
2. GET /product/:a/:b => Takes two parameters and produces their product.
3. POST /file => Accepts file content in req.body and save data to the file.
    Eg: req.body = {
        "data": "Data to be saved"
    }
