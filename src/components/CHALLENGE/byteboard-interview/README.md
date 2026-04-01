# Task List

You may do these tasks in any order, but take note that they are listed in the order your team has prioritized completing them.

Reminder that you are NOT expected to complete all tasks. You are expected to write clean, readable code. Remember to add comments explaining what you were working on if you run out of time in the middle of a task.


## Task 1

We have decided to move forward with using user preferences to filter which activities we consider when generating suggested midpoint activities. When making a midpoint request, we ask users to enter in preferences in the following categories:

- `activity_type` is a string representing the kind of activity (e.g. "restaurant", "bar")
- `rating` is a floating-point number representing the **minimum** rating (on a 1-5 star scale) the user is willing to accept
- `price_category` is a floating-point number representing the **maximum** price category ($-$$$$) the user is willing to accept
- `time_needed` is a floating-point number representing the **maximum** amount of time in hours a user has allotted for the activity
Currently, the `suggestMidpointActivity` is called in `runner.ts` with the full activity database, regardless of user preferences. Update the program to filter the activities based on the user request, so that `suggestMidpointActivity` only receives activities that meet the user preferences.

If no activities meet the user request, default to only filtering by activity type.


## Task 2

Complete the implementation of `suggestMidpointActivity` in `suggestion.ts`, which should find a suggested activity between two user coordinates based on commute time.
Your method should calculate a recommended midpoint activity by taking into account both the total commute time for both users as well as fairness, meaning one user should not have to commute significantly more than the other. How you choose to balance these two factors is up to you.
You should make use of the `calculateEta` function defined in `eta_calculator.ts`. However, we eventually plan to replace this function's implementation with a call to an external API that will provide us with more accurate travel time estimates. Since this will incur a cost per API call, we would like to reduce the number of calls we make to `calculateEta`. You are therefore encouraged to implement heuristics or other strategies to minimize the number of calls to `calculateEta`.


## Task 3

Currently, our program only works for finding midpoint activities for pairs of two people at a time. We would like to experiment with finding midpoint activities for larger groups of people, too.

Update the program to use the data in `data/user_group_requests.csv` instead of `data/user_requests.csv`. The new file contains requests from groups of 4 users, each with their own location.

Then, make any updates necessary to the program to support making activity suggestions for groups of users, taking into account both total commute time and fairness (no user has to travel too much further than any other user) for all users. The program should support any arbitrary group size, not just groups of 4.

You are welcome to add any additional methods or files you'd like, and you can change any of the existing code already provided to you, but you are encouraged to make sure your decisions are well documented and your code is appropriately decomposed.

