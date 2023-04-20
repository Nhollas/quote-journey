Current Concerns:

- No way to refresh the JWT secretly that comes from /api/quote/start.
- Do we want someones quote journey to be linked to a userId?
- We cannot invalidate JWTs, so they should have a relatively short lifespan.

Current TODOs:

- Look at bringing in Firebase with their anonymous authentication options.
- Build a secure refresh JWT solution.
