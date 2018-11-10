# TaskTrackerV3

Design choices:

  * Implemented the "nobody" user again to assign tasks with no users to it. This was done because it is very common for
    tasks to not be assigned to anuone, so this was my approach.
  * For the the "task" and "edit task" pages I gave them initial dummy objects, because when I was first loading these
    pages they were expecting a task object, but the api was still in the process of returning the data. So these dummy
    objects prevent the pgaes from crashing.
  * Implemented a history component to be able to push the home page into the history an reload the root. This was done
    because, like the task object problem, once a user signed in, the components would route and load, but the server
    was still in the process of sending back the session data, so React Router would just send me back to the login page.
    So i decided to only redirect after I got the session data.
  * To not add more complexity and focus on the functionality of the site, I decided to not implement form errors, so if
    you fill out a form and one of the fields is worng, the website will just redirect you to the next page intended, not
    tell you what you did worng, and not make the chnage you were hoping for.
  * Whenever I return user data, I make sure to not return the user password hash, since this could be a security problem.
    Also, there is no need in the site for this.
  * On most links I load the relevant data onClick because I want to make sure I have the most up to date data possible. for
    example, if the user wants to see some task, I fetch the new task data for said task instead of just passing in the 
    corresponding item from the task list.
  * If you are not logged in, if you try to access any url in the site, React Router will redirect you to the login page.
    Since you are not logged in, there is no reason for the site to load task data for you.
