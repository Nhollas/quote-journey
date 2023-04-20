#### Current Implementation:

A "session" can be created on page load of /quote. Prior to page load we access our BFF via nexts getServerSideProps, this is powerful in the fact that we can set (HttpOnly, Secure and Same Site) cookies for our client even before the page has loaded. One **important** note is that our /api/quote/start endpoint that we call here is protected with an API Key that only our BFF knows.

From here, we set 2 cookies:

- **'JWT'** Cookie: holds our JWT's value.
- **'RefreshToken'** Cookie: holds the value required for creating new JWT cookies.

**Note:** _The JWT cookie has a short lifetime compared to the RefreshToken cookie, this is to limit the downside of our JWT as they cannot be invalidated instantly._

The great thing here is that these cookies will pass through to the calls made to our BFF like /getAddress and /getVehicle. If not found our BFF will send back unauthorised status codes prompting our client to first try and refresh their expired JWT cookie. If they do not have a RefreshToken cookie present at hitting /api/quote/refresh endpoint they will be unable to refresh the "session". From here the only option is to refresh the page and start this process again.

#### Current Thoughts:

- Cookie hijacking makes me scared....
- How should I be storing the values in my cookies? Encyption?
- Do we want someones quote journey to be linked to a userId?
- We cannot invalidate JWTs, so they should have a relatively short lifespan.
- Surely there should be some form of session backup?

#### Current TODOs:

- TODO these..
