This is the Test countries API

Author: Adeyinka Micheal

Environments Node version - v8.12.0 (LTS)

NPM version - v6.4.1

Install all dependencies

npm install
Start the application

npm start

#-------------------------------First endpoint--------------------------------------------------t 

/login
Logs users in with``
username
password ``
As post body

Response format

application/json
returns a body
 {
    error: false,
    statusCode: 200,
    message: "logged in successfully",
    token: token
 }

 if succesful

#-------------------------------Second endpoint--------------------------------------------------
Authorization must be added as a key value pair in headers
key - Authorization 
Value - `JWT ${Token}`

/countries {GET}
second endpoint posts the data as json payload and gets back vehicle data Endpoint /vehicles
#with a sample payload# { "country": "Nigeria" }

Response
{   
    error: false,
    statusCode: 200,
    message: "Countries gotten successfully",
    data: countries
}

#-------------------------------Third endpoint--------------------------------------------------

Authorization must be added as a key value pair in headers
key - Authorization 
Value - `JWT ${Token}`

/countries {PUT}
second endpoint posts the data as json payload and adds a country from the list of countries
#with a sample payload# { "country": "Nigeria" }

Response

{   
    error: false,
    statusCode: 200,
    message: "Country added successfully",
    data: countries
}

#-------------------------------Fourth endpoint--------------------------------------------------
Authorization must be added as a key value pair in headers
key - Authorization 
Value - `JWT ${Token}`

/countries {DELETE}
second endpoint posts the data as json payload and deletes a country from the list of countries
#with a sample payload# { "country": "Nigeria" }

##Response

{   
    error: false,
    statusCode: 200,
    message: "Country removed successfully",
    data: countries
}
