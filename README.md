#### Current Implementation:

Our .Net Web API is acting as our API Gateway. There is currently middleware set up on this fake gateway that will check for a secret API Key that only itself and our BFF knows.

Our Next app is set up to have it's gateway routes in it's own API routes. Here we can utilize our authenticaiton checks to make sure that the user is logged in and has the correct permissions to access the route.

Currently for /getAddress and /getVehicle we require a QuoteId cookie to be set and will be verified on the server side.

#### TODO:

- [ ] Look at adding other authentication methods to our BFF/API Gateway.
- [x] Add next auth to our BFF.

#### Current Thoughts:

- Cookie hijacking makes me scared.

#### What do we want?:

- Prevent any external access to our BFF.
