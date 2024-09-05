To run:

install docker desktop

navigate to the /backend directory. run

create a new .env file with the following values. Get Google Oauth values from another developer.

```dotenv
GOOGLE_CLIENT_ID=//TODO get this value from another dev
GOOGLE_CLIENT_SECRET=//TODO get this value from another dev
LOCAL_VOLUME=//TODO replace with your own path eg /Users/dan/dev/anytable/neo4j
ANY_TABLE_SESSION_SECRET=foobar
GOOGLE_AUTH_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=localhost:8080=
NEO4J_DRIVER_URL=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=localDev
CORS_ORIGIN=http://localhost:8080
SERVER_URL=http://localhost:3000
```



`npm install`
`npm run neo4j`
`npm run start`

In a separate terminal navigate to the /frontend directory. Run

`npm install`
`npm run serve`

The most recent effort for frontend design can be found at localhost:8080/edit/graph 
The menu has not been updated to include this route as a navigation option. 
The create component view is likely to be abandoned.
