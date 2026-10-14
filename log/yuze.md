# Log
## 2/Oct, #22:
* Revamp of the code structure together with Alexander.
	* Rename of the directories.
	* Implementation of using .env.
	* Fixing the fetching part of `Event` releted parts for Josef.
## 7/Oct, #23:
* Fix the .env usage in the frontend. 
* Add log directory.
## 11/Oct, #24, #25, #26, #27:
* Add and established connection to MongoDB.
* Add repository manager class `DatabaseManager` that has all access to to the databse.
* Add helper class that retireve vist-counter from the database `RepositoryDataWebsiteVisitCounter` following the naming convension of `RepositoryXXXX` where "XXXX" is the data in the database.
* Add controller that retrieve the counter.
* Update layout in the readme.
* Establish the naming in .env cross the repository.
## 12/Oct, #28, #29:
* Fix eslint warnings.
* Add authentication system with MongoDB as the database to store the credential.
* Add `AccountManager` class as a controller for the frontend to access/operate/validate of any user account in the database.