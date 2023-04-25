#### Current Implementation:

Our .Net Web API is acting as our API Gateway. There is currently middleware set up on this "fake" gateway that will check for a secret API Key that only itself and our BFF knows. This is a very simple example on how we can secure our API Gateway, it could require a JWT, Cookie, Key etc it doesn't really matter.

On our Next app, we access our gateways "services" via Next's API routes. Here we can utilize authentication checks to make sure that the user has the correct permissions to access the route.

Currently for /getAddress and /getVehicle we require either a logged in user with a QuoteId cookie or just the QuoteId cookie itself. For those routes that's all we want/need from an authentication perspective.

That is just one example, other routes could require different forms of authentication it's not restricted to a single thing.

#### How to run:

- Clone this repo.
- Run `npm install` in the QuoteJourney.UI project.
- Create a .env.local file in the QuoteJourney.UI project and follow the guide in the .env.local.example file.
- Create appsettings.json file in the root of the QuoteJourney.API project and follow the guide in the appsettings.example.json file.

**Note**: The API-KEY value must match to what you have in the .env.local file in the frontend project.

- Add a your initial migration under /Data/Migrations.
- Update the database with your migration.
- Now you can run the API project.
- Run `npm run dev` in the QuoteJourney.UI project.
- That's it, you should now be able to access the nextjs app on http://localhost:3000 and the API on http://localhost:5235

#### TODO:

- [x] Look at adding other authentication methods to our BFF/API Gateway.
- [x] Add next auth to our BFF.
