# Log

## 21/Sep–25/Sep, [#11](https://github.com/Berkiba/Calendar/pull/11):
* Update the project README as an initial contribution.
* Document project setup and development information as the application structure was being established.

## 27/Sep, [#17](https://github.com/Berkiba/Calendar/pull/17):
* Add the `Calendar` React component using MUI.
* Add the `/calendar` route so the calendar can be opened directly.
* Add a Calendar link to the sidebar for navigation.
* Implement date selection in the calendar, establishing the selected-date interaction needed for backend integration.

## 15/Oct, [#33](https://github.com/Berkiba/Calendar/pull/33):
* Add a MongoDB initialization script.
* Initialize the database indexes required by the application.
* Initialize the website visit counter as part of database setup.
* Verify that database initialization works.
* Verify that the events API retrieves event data from MongoDB.

## 30/Oct, [#39](https://github.com/Berkiba/Calendar/pull/39):
* Improve calendar functionality so events are displayed directly in the calendar.
* Display events for the currently selected date and provide a list of all events.
* Allow users to open existing event details by selecting an event in the calendar.
* Save the selected calendar date for logged-in users.
* Validate the user's session token before saving calendar selections.
* Integrate Resend to send an email confirmation when an event is created.
* Handle email delivery failures separately so a notification problem does not cause an otherwise successful event creation to fail.
* Check calendar event display and date-validation behavior, and simulate the email-notification flow.
* Document the required `RESEND_API_KEY` and `RESEND_FROM_EMAIL` configuration values.

## 30/Oct, Calendar UI refinement:
* Continue refining the calendar's visual presentation to make the interface more polished and consistent.
* Prefer MUI components for standard calendar and date-picker behavior where appropriate.
* Keep changes scoped to the calendar and avoid unrelated refactoring or changes to existing comments and formatting.
* Refine the calendar stylesheet in `src/view/css/calendar.css`.

## Summary
* Implement the Calendar view using React and MUI, including routing and sidebar navigation.
* Implement date selection as the foundation for date-specific calendar behavior.
* Contribute to database initialization and verify that the events API can retrieve persisted data from MongoDB.
* Connect calendar interactions to event display, existing event details, authenticated date persistence, and event-creation email notifications.
* Work across the calendar UI and its integration with the application's backend and database.