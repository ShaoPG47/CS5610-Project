[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/tekr69j1)
# Final Project CS5610

Login with your Northeastern credentials and read the project description [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EVgJQzqalH9LlZQtMVDxz5kB7eZv2nBwIKFDFYxDMzgohg?e=EPjgIF).

## List of features

For each feature give a name and a one line description.

Clearly indicate which feature is an additional feature for extra credit.

 - Ask questions:<br>
   - User can ask questions after signup/login
- Provide answers: <br>
  - User can answer questions after signup/login
- search for posts:<br>
  - User/visitor can search for posts by key words/tags or keywords & tags
- tag posts: <br>
  - User can create tags when asking a question
  - User/visitor can visit Tag page for existing tags
  - User/visitor can click a question's tag to show all questions that have the same tag
- comment on questions and answers: <br>
  - User can add comments to a question or an answer
  - User/visit can view and hide all comments by clicking Comments button of a question/answer
- Extra: create their individual user profiles: <br>
  - User can go to his/her own user page after login/signup
  - User page shows user's username, user's email, and user created date
  - User can view all his/her questions that are asked/answered/commented
- authenticate registered users (i.e., user logins): <br>
  - User can signup by creating username, password, and email.
  - User can login with his/her username and password
  - User can logout after login/signup
  - User can only ask question, answer question, add comment and go to user page after login/signup



## For each feature indicate the test
The following path contains all my e2e tests, it has 10 sections, 60 tests total
```py
../web-dev-final-project-malhar-pengli/testing/cypress/e2e
```

- Ask questions:<br>
  - Section 3
  - Section 8
- Provide answers:<br>
  - Section 5
  - Section 8
- search for posts:<br>
  - Section 4
- tag posts:<br>
  - Section 6
  - Section 9
- comment on questions and answers:<br>
  - Section 7
  - Section 3
  - Section 5
- Extra: create their individual user profiles:<br>
  - Section 10
- authenticate registered users (i.e., user logins):
  - Secion 1
  - Section 2





## For each server endpoint indicate the test

- Answer Comment controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/aComment.test.js
```

- Answer controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/newAnswer.test.js
```

- login controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/login.test.js
```

- signup controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/signup.test.js
```

- User controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/user.test.js
```

```pycon
../web-dev-final-project-malhar-pengli/server/tests/userutils.test.js
```

- Question Comment controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/qComment.test.js
```

- Question controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/question.test.js
```
```pycon
../web-dev-final-project-malhar-pengli/server/tests/newQuestion.test.js
```

- Tag controller tests
```pycon
../web-dev-final-project-malhar-pengli/server/tests/tags.test.js
```


## Instructions to generate and view coverage report 

This counts for extra credit. Ignore if you haven't implemented it.