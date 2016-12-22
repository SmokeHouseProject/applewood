# Web API Server

Is a collection of the following libraries:
-  Express <http://expressjs.com/>
-  Mongoose <http://mongoosejs.com/>
-  JWT <https://github.com/jwtk/njwt>

## Prerequisites
___

Please see [README](../README.md) for more information.

## Getting Started
___

Please see [README](../README.md) for more information.

## Seeding the Database
___

The data base will be created and populated when you run the prep command when project is first initialized.
If you want to clear the db and start over you can drop the database and run `npm run seed` in a terminal window opened in the `/server` directory.
>You must drop the database first. The seed command will not overwrite existing data

## Running the Server
___

The server will automatically be launched with the --server switch when starting the client host.
Alternately you can run the server in it's own console by entering `npm run start` in a terminal window opened in the `/server` directory.

## Configuring the Server
___

You can enter different configurations for different environments
All configurations are located in the server/config directory

>The host setting should be set to the IP of your machine and not localhost.
>Localhost works for developing using a desktop browser but compiled mobile apps will not be able to find the server unless they have a valid IP address

Please see [README](../README.md) for configuring the client

## Unit Tests
___

To run the test suite open a new terminal window in the `/server` directory and enter `karma start`

