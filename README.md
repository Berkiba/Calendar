# Calendar
A school project about building myself a calendar for assignmnets
# Command Reminder
* `npm install` - to install dependencies 
* `npx nodemon --exec "node --env-file=.env --import=tsx" .\server.ts` - backend.
* `npx vite` - for viewing/debugging the frontend locally.
* `npx eslint` - to test and analyze the code and check for errors and warnings
* `./RUN.ps1` - the powershell script for Windows user to start two servers at the same time.
# Members
|Name|View|Model|Types/Interfaces|Controller|
|-|-|-|-|-|
|Berk|`Calendar`||||
|Josef|`Event Form` `Event Details` `Home`|`RepositoryEvent` `EventService` `MongoDB`|`Event` `EventInput`|`EventController`|
| Yuze| ~~`EASY_REACT_COMPONENT`~~ `Home` `SideBar` `Login` `Register` | ~~`Database`~~ `MongoDB` `RepositoryDataWebsiteVisitCounter` `RepositoryManager` `RepositoryAccount` | ~~`IDatabase`~~ `IRepositoryData` `Account` | ~~`Search`~~ `LoadWebsiteVisitCounter` `AccountManager` |
* ~~Compnent~~ This font style means once created, but deleted afterward during development.
* `.index.tsx` and `index.html` will not be counted.
*  `MyComponent` in the "**Responsible For**" field will be representing all `MyComponent.tsx`, `MyComponent.css`, `MyComponent.html` ... that begin with `MyComponent`.

## .env
* Change .env_sample to .env and change JWT_SECRET

# MVC Fulfillment
### Model
* `.service/` `.interface/` `.type/`
### View
* `.react/`
### Controler
* `.api`
