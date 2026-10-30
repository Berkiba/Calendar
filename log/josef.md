# Log

###### 27 september ######### 
## https://github.com/Berkiba/Calendar/pull/14
## https://github.com/Berkiba/Calendar/pull/16

# 14
* Created first draft of EventForm.tsx and EventDetails.tsx that only worked on frontend
* Mock events had to be created in the code in order for events to be displayed
* EventForm is for inputting the event and EventDetails is for displaying the created event
* React router routes were added for creating and viewing the events
* Installed MUI dependencies
# 16
* EventForm and EventDetails cleanup and added to make the code clearer
* Installed and configured eslint, added eslint.config.js

###### 14 october ###########
## https://github.com/Berkiba/Calendar/pull/32
* Event creation is now connected to the backend using express
* Events are now stored in Mongodb
* Created RepositoryEvent.ts to store and retrieve events
* Added event data interface and EventInput type
* Added API endpoints for events in server.ts

###### 29 october ###########
## https://github.com/Berkiba/Calendar/pull/34
* Added so that you can now delete and edit the events so the buttons aren't just for decoration anymore
* Added confirmation dialog for deleting events so no excuses if they're deleted by accident
* Added an edit route using the react router

###### 30 october ###########
## https://github.com/Berkiba/Calendar/pull/40
## https://github.com/Berkiba/Calendar/pull/42

# 40
* Added JWT authentication and role authorization in backend
* regular users can only create events while admins can edit and delete them

# 42
* Added role getter to AccountManager
* Updated EventDetails so only users with admin roles can see the edit and delete buttons
* Added notifications whenever you create, edit or delete an event with MUI snackbar and alert


