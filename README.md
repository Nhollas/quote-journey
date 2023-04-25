#### Current Implementation:

Our .Net Web API is acting as our API Gateway. There is currently middleware set up on this fake gateway that will check for a secret API Key that only itself and our BFF knows.

On our Next app, we access our gateways "services" via Next's API routes. Here we can utilize authentication checks to make sure that the user has the correct permissions to access the route.

Currently for /getAddress and /getVehicle we require either a logged in user with a QuoteId cookie or just the QuoteId cookie itself. For those routes that's all we want/need from an authentication perspective.

That is just one example, we could require a anything from a JWT, Cookie, Key etc our BFF will control this.

#### How to run:

- Clone the repo.
- Run `npm install` in the QuoteJourney.UI project.
- Create a .env.local file in the QuoteJourney.UI project and follow the guide in the .env.local.example file.
- Create appsettings.json file in the QuoteJourney.API project and follow the guide in the appsettings.example.json file.
- Add a your initial migration under /Data/Migrations.
- Update the database with your migration.
- ...... TODO

```

#### TODO:

- [ ] Look at adding other authentication methods to our BFF/API Gateway.
- [x] Add next auth to our BFF.
```
