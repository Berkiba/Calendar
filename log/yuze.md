# Log

## 18/Sep, [#6](https://github.com/Berkiba/Calendar/pull/6), [#7](https://github.com/Berkiba/Calendar/pull/7), [#9](https://github.com/Berkiba/Calendar/pull/9):
* Initialize the React/Vite frontend with an entry point and example component.
* Update the README with project information, development commands, and team responsibilities.
* Add a Dockerfile and Docker Compose configuration for running the frontend, including development volumes and port mapping.

## 21/Sep, [#10](https://github.com/Berkiba/Calendar/pull/10):
* Add the `Home` and expandable `SideBar` React components.
* Add the default React Router configuration, global CSS, and sidebar styles and animations.

## 24/Sep, [#12](https://github.com/Berkiba/Calendar/pull/12):
* Fix the package configuration so installing dependencies includes React, React DOM, and React Router.
* Remove the unused React Router type package.

## 25/Sep, [#13](https://github.com/Berkiba/Calendar/pull/13):
* Add the Express backend in `server.ts` and the `/api/search` endpoint.
* Add the initial `IDatabase`, `Database`, and `MongoDB` abstractions and the search controller and type.
* Connect `Home` to the search API and configure the Vite `/api` proxy.
* Add `RUN.ps1` to start the frontend and backend together, using `nodemon` and `tsx` for backend development.
* Update the README with development commands and the MVC layout.

## 27/Sep, [#15](https://github.com/Berkiba/Calendar/pull/15), [#18](https://github.com/Berkiba/Calendar/pull/18), [#19](https://github.com/Berkiba/Calendar/pull/19), [#20](https://github.com/Berkiba/Calendar/pull/20):
* Add code comments to the frontend and database/search interfaces, with related layout adjustments.
* Fix package-lock conflicts affecting MUI dependencies.
* Redirect `/` to `/calendar` through React Router.
* Update the README with component responsibilities and the `RUN.ps1` startup command.

## 1/Oct, [#21](https://github.com/Berkiba/Calendar/pull/21):
* Reorganize the project into model, view, and controller directories to follow the MVC requirements.
* Update import paths and entry points after moving the files.
* Rename React components to match their filenames.

## 2/Oct, [#22](https://github.com/Berkiba/Calendar/pull/22):
* Revamp of the code structure together with Alexander.
	* Rename of the directories.
	* Implementation of using .env.
	* Fixing the fetching part of `Event` related parts for Josef.
* Add `EventController` loader functions and `EventService` API calls, and move mock event data into the backend.
* Add Axios and CORS support, and exclude `.env` from Git.

## 7/Oct, [#23](https://github.com/Berkiba/Calendar/pull/23):
* Fix the .env usage in the frontend and load backend environment variables through `RUN.ps1`.
* Add log directory.

## 11/Oct, [#24](https://github.com/Berkiba/Calendar/pull/24), [#25](https://github.com/Berkiba/Calendar/pull/25), [#26](https://github.com/Berkiba/Calendar/pull/26), [#27](https://github.com/Berkiba/Calendar/pull/27):
* Add and establish a connection to MongoDB.
* Add repository manager class `RepositoryManager` for access to the database repositories.
* Add `IRepositoryData` and the `RepositoryDataWebsiteVisitCounter` implementation for reading and updating the visit counter.
* Add the `LoadWebsiteVisitCounter` controller and GET/POST `/api/website-visit-counter` endpoints.
* Update layout in the readme.
* Add `.env.example` and establish environment variable names across the repository.
* Add TypeScript types for CORS.

## 12/Oct, [#28](https://github.com/Berkiba/Calendar/pull/28), [#29](https://github.com/Berkiba/Calendar/pull/29):
* Fix ESLint warnings and configure ignored unused-variable names.
* Add the shared `Account` type and `RepositoryAccount` for storing and retrieving accounts in MongoDB.
* Add `/api/account/register` and `/api/account/login`, including duplicate-email checking in the account repository.
* Add `AccountManager` as the frontend controller for validating credentials, registering, and logging in.
* Add mock registration and login buttons in `Home` for testing the APIs.

## 13/Oct, [#30](https://github.com/Berkiba/Calendar/pull/30), [#31](https://github.com/Berkiba/Calendar/pull/31):
* Add password hashing with HMAC-SHA256 and the configured secret and salt in `RepositoryAccount`.
* Hash credentials when registering, logging in, and updating accounts, and remove the unused `dotenv` dependency.
* Update `RUN.ps1` to terminate existing Node processes before starting new development servers, so old processes do not keep serving outdated code.
* Run the process termination in a separate PowerShell window to keep its output separate from the startup script.

## 29/Oct, [#35](https://github.com/Berkiba/Calendar/pull/35):
* Add `jsonwebtoken` and its TypeScript types.
* Generate an HS256 JWT in `RepositoryAccount.Get()` after successful login, with the account email as `sub` and a 15-minute expiry, using `JWT_SECRET`.
* Add `token` to the shared `Account` type and expose it through `AccountManager.Token`; remove the password from the returned account.
* Add `HelperVerifyToken` in `server.ts` for manually checking a token's signature, expiry, and matching email.
* Add `AccountContext` and an app-level provider to share the logged-in account across the frontend, and save the account in context after login.

## 29/Oct, [#36](https://github.com/Berkiba/Calendar/pull/36):
* Add separate `Login.tsx` and `Register.tsx` React components that call the existing APIs through `AccountManager`.
* Add form submit handlers, success/failure messages, and form resets; save the logged-in account in context from the login form.
* Add `/login` and `/register` routes and sidebar links, and display the signed-in account's email in the sidebar.
