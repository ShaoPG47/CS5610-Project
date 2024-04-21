// Template test file. Change the file to add more tests.
describe("Cypress Tests for Final Project", () => {
    // add test cases

    //populate_db
    beforeEach( () => {
        cy.exec("node ../server/populate_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    //remove_db
    afterEach(() => {
        cy.exec("node ../server/remove_db.js mongodb://127.0.0.1:27017/fake_so");
    });

    //Section 1, dealing with unloggedin events
    it("1.1 | check if alters come out when user try to answer question in a question page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        cy.contains("Answer Question").click()

        const alterStub = cy.stub();
        cy.on('window:alert', alterStub);

        cy.wrap(null).should(() => {
            expect(alterStub).to.be.calledWithExactly("You need to log in first");
        });
    })

    it("1.2 | click add comment will receive alter when user didn't login", () => {
        cy.visit("http://localhost:3000");

        cy.contains("Quick question about storage on android").click();
        cy.contains("Add Comment").click()

        const alterStub = cy.stub();
        cy.on('window:alert', alterStub);

        cy.wrap(null).should(() => {
            expect(alterStub).to.be.calledWithExactly("You need to log in first");
        });
    })

    it("1.3 | should not contain Ask a Question button in Question Page and Tag Page", () => {
        cy.visit("http://localhost:3000")

        cy.get(".askQuestionBtn").should('not.exist')
        cy.get(".signupBtn").should('exist')
        cy.get(".loginBtn").should('exist')

        cy.contains("Quick question about storage on android").click()
        cy.get(".askQuestionBtn").should('not.exist')
        cy.get(".signupBtn").should('exist')
        cy.get(".loginBtn").should('exist')

        cy.contains("Tags").click();
        cy.get(".askQuestionBtn").should('not.exist')
        cy.get(".signupBtn").should('exist')
        cy.get(".loginBtn").should('exist')
    })

    //Section 2, check login, log out, and signup
    it("2.1 | Signup with empty username should show error", () => {
        cy.visit("http://localhost:3000")

        cy.contains("Sign up").click();
        cy.get("#newUserInput")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Username should only contain letters or numbers and be at least 5 characters long.")
    })

    it("2.2 | Signup page should show error if username length is less than 5", () => {
        cy.visit("http://localhost:3000")

        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("five")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Username should only contain letters or numbers and be at least 5 characters long.")
    })

    it("2.3 | Signup Page should show error if username contains anything not letter or number", () => {
        cy.visit("http://localhost:3000")

        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("five@@@")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Username should only contain letters or numbers and be at least 5 characters long.")

        cy.visit("http://localhost:3000")

        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("hellow123!")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Username should only contain letters or numbers and be at least 5 characters long.")

        cy.visit("http://localhost:3000")

        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("hellow world")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Username should only contain letters or numbers and be at least 5 characters long.")
    })

    it("2.4 | Signup page should show error if password is not legit", () => {
        cy.visit("http://localhost:3000")
        //if user password.length < 8
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("1122334")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Password should be at least 8 characters.")

        cy.visit("http://localhost:3000")
        //if password is empty
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserEmail").type("testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Password should be at least 8 characters.")
    })

    it("2.5 | Signup page should show error if email format is not legit or empty", () => {
        cy.visit("http://localhost:3000")
        //if useremail do not contains@
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testuser1email")

        cy.contains("Sign Up").click();
        cy.contains("Invalid email format.")

        cy.visit("http://localhost:3000")
        //if useremail start with anything not number or letter
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("!testemail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Invalid email format.")

        cy.visit("http://localhost:3000")
        //if useremail contains anything not number or letter after @
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@!163.com")

        cy.contains("Sign Up").click();
        cy.contains("Invalid email format.")

        cy.visit("http://localhost:3000")
        //If user email contains soace
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testem ail@163.com")

        cy.contains("Sign Up").click();
        cy.contains("Invalid email format.")
    })

    it("2.6 | Should able to Signup from tag page and question page, logout and login", () => {
        cy.visit("http://localhost:3000")

        //Test sign up when input is legit
        cy.contains("Sign up").click();
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")
        cy.contains("Sign Up").click();

        //Test log in after click Log out
        cy.contains("Log out").click();
        cy.get("#oldUserInput").type("testuser1")
        cy.get("#oldUserPassword").type("11223344")
        cy.contains("Log in").click();

        //Test signup from tag page
        cy.contains("Log out").click();
        cy.contains("Tags").click();
        cy.contains("Sign up").click();

        //Test signin with existing username
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail2@qq.com")
        cy.contains("Sign Up").click();
        cy.contains("Username already exists.")

        //Test signin with existing useremail
        cy.contains("Questions").click()
        cy.contains('Sign up').click()
        cy.get("#newUserInput").type("testuser22")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")
        cy.contains("Sign Up").click();
        cy.contains("Email is already taken")

        //Test signin with existing username and email
        cy.contains("Questions").click()
        cy.contains('Sign up').click()
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")
        cy.contains("Sign Up").click();
        cy.contains("Username and email both exist, you may already registered.")

        //Test login with wrong username
        cy.contains("Questions").click()
        cy.contains("Log in").click()
        cy.get("#oldUserInput").type("testuserq")
        cy.get("#oldUserPassword").type("11223344")
        cy.contains("Log in").click()
        cy.contains("Username or password incorrect.")

        //test login with wrong password
        cy.contains("Questions").click()
        cy.contains("Log in").click()
        cy.get("#oldUserInput").type("testuser1")
        cy.get("#oldUserPassword").type("1122334455")
        cy.contains("Log in").click()
        cy.contains("Username or password incorrect.")
    })

    it("2.7 | afer user logout, it should return to the login page",() => {
        cy.visit("http://localhost:3000");

        cy.signUp("testuser1", "11223344","testuser1@neu.edu")
        //check if its log in page after log out
        cy.contains("Log out").click()
        cy.get("#oldUserInput")
        cy.get("#oldUserPassword")
        cy.contains("Log in")
    })

    //Section 3, check question page
    it("3.1 | Adds three questions and one answer, then click /Questions/, then click unanswered button, verifies the sequence", () => {
        cy.visit("http://localhost:3000")

        // add a question
        cy.contains('Sign up').click()
        cy.get("#newUserInput").type("testuser1")
        cy.get("#newUserPassword").type("11223344")
        cy.get("#newUserEmail").type("testemail@163.com")
        cy.contains("Sign Up").click();

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        // add another question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question B");
        cy.get("#formTextInput").type("Test Question B Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        // add an answer to question A
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question C");
        cy.get("#formTextInput").type("Test Question C Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("Test Question A").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer Question A");
        cy.contains("Post Answer").click();

        // go back to main page
        cy.contains("Questions").click();

        // clicks unanswered
        cy.contains("Unanswered").click();
        const qTitles = ["Test Question C", "Test Question B"];
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("3.2 | Check if questions are displayed in descending order of dates.", () => {
        const qTitles = [
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];

        cy.visit("http://localhost:3000")


        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("3.3 | successfully shows all questions in model in active order", () => {
        const qTitles = [
          "Programmatically navigate using React router",
          "android studio save string shared preference, start activity and load the saved string",
          "Quick question about storage on android",
          "Object storage for a web application",
        ];
        cy.visit("http://localhost:3000");
        cy.contains("Active").click();
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("3.4 | Check if question comments can be displayed and closed properly", () => {
        cy.visit("http://localhost:3000");

        //check if the comment by and comment text are correct and can be found
        cy.contains("android studio save string shared preference, start activity and load the saved string").click()
        cy.get(".showQcommentsBtn").click()
        cy.get(".qCommentsBy").should("contain", "fruitloop")
        cy.get(".qCommentsText").should("contain", "I have the same problem!")
        cy.get(".showQcommentsBtn").click()

        //check if the comment section can still be found after close it
        cy.get(".questionComments").should("not.exist")
    })

    it("3.5 | successfully add comments to a question, and the most recent comment should show on the top", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser1", "11223344", "testemail@163.com")

        //check for the case if no comments yet
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Comments").click();
        cy.contains("No comments yet, leave your comment!")

        //Check for new question comment page error when text is empty
        cy.contains("Add Comment").click();
        cy.contains("Post Comment").click();
        cy.contains("Comment text cannot be empty")

        //check for post comment functionality
        cy.get("#qCommentTextInput").type("Test comment 1")
        cy.contains("Post Comment").click()
        cy.contains("Comments").click()
        cy.contains("testuser1:")
        cy.contains("Test comment 1")

        //Add another comment will show in the first of the list
        cy.contains("Add Comment").click();
        cy.get("#qCommentTextInput").type("Test comment 2")
        cy.contains("Post Comment").click()
        cy.contains("Comments").click();

        //Check for order
        cy.get('.questionComments').first().within(() => {
            cy.get('.qCommentsBy').should('contain','testuser1:');
            cy.get('.qCommentsText').should('contain','Test comment 2')
        })
    });

    it("3.6 | Adds multiple questions one by one and displays them in All Questions", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser1", "11223344", "testemail@163.com")

        // Add multiple questions
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 2");
        cy.get("#formTextInput").type("Test Question 2 Text");
        cy.get("#formTagInput").type("react");
        cy.contains("Post Question").click();

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 3");
        cy.get("#formTextInput").type("Test Question 3 Text");
        cy.get("#formTagInput").type("java");
        cy.contains("Post Question").click();

        // verify the presence of multiple questions in most recently added order.
        cy.contains("Fake Stack Overflow");
        const qTitles = [
            "Test Question 3",
            "Test Question 2",
            "Test Question 1",
            "Quick question about storage on android",
            "Object storage for a web application",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });

        // verify that when clicking "Unanswered", the unanswered questions are shown
        cy.contains("Unanswered").click();
        const qTitlesUnanswered = [
            "Test Question 3",
            "Test Question 2",
            "Test Question 1",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitlesUnanswered[index]);
        });
    })

    it("3.7 | Ask a Question creates and displays expected meta data", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser1", "11223344", "testemail@163.com")

        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();
        cy.contains("Fake Stack Overflow");
        cy.contains("5 questions");
        cy.contains("testuser1 asked 0 seconds ago");

        const answers = [
            "0 answers",
            "1 answers",
            "2 answers",
            "3 answers",
            "2 answers",
        ];
        const views = [
            "0 views",
            "103 views",
            "200 views",
            "121 views",
            "10 views",
        ];
        cy.get(".postStats").each(($el, index, $list) => {
            cy.wrap($el).should("contain", answers[index]);
            cy.wrap($el).should("contain", views[index]);
        });
        cy.contains("Unanswered").click();
        cy.get(".postTitle").should("have.length", 1);
        cy.contains("1 question");
    })

    it("3.8 | Ask a Question with empty title shows error", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser1", "11223344", "testemail@163.com")

        cy.contains("Ask a Question").click();
        cy.get("#formTextInput").type("Test Question 1 Text Q1");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();
        cy.contains("Title cannot be empty");
    })

    //Section 4, check for search functionality
    it("4.1 | Search for a question using text content that does not exist", () => {
        const searchText = "Web3";

        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type(`${searchText}{enter}`);
        cy.get(".postTitle").should("have.length", 0);
    });

    it("4.2 | Search string in question text", () => {
        const qTitles = ["Object storage for a web application"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("40 million{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.3 | Search string in question text", () => {
        const qTitles = ["Quick question about storage on android"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("data remains{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.4 | Search a question by tag (t1)", () => {
        const qTitles = ["Programmatically navigate using React router"];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[react]{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.5 | Search a question by tag (t2)", () => {
        const qTitles = [
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[javascript]{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.6 | Search a question by tag (t3)", () => {
        const qTitles = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[android-studio]{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.7 | Search a question by tag (t4)", () => {
        const qTitles = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
        ];
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[shared-preferences]{enter}");
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("4.8 | Search for a question using a tag that does not exist", () => {
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[nonExistentTag]{enter}");
        cy.get(".postTitle").should("have.length", 0);
    });

    it("4.9 | Search for questions using a tag and a content", () => {
        const qTitles = [
            "Object storage for a web application",
            "Programmatically navigate using React router"
        ]
        cy.visit("http://localhost:3000");
        cy.get("#searchBar").type("[react] web{enter}")
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    })
    //Section 5, check for Answer page functionality
    it("5.1 | Created new answer should be displayed at the top of the answers page", () => {
        const answers = [
            "Test Answer 1",
            "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
            "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        ];

        cy.visit("http://localhost:3000");
        cy.signUp("testuser2", "testuserPassword3", "testuser2@gmail.com")
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(answers[0]);
        cy.contains("Post Answer").click();
        cy.get(".answerText").each(($el, index) => {
            cy.contains(answers[index]);
        });
        cy.contains("testuser2");
        cy.contains("0 seconds ago");
    });

    it("5.2 | Answer is mandatory when creating a new answer", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser2", "testuserPassword3", "testuser2@gmail.com")
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.contains("Post Answer").click();
        cy.contains("Answer text cannot be empty");
    });

    it ("5.3 | Comment can be display and close properly", () => {
        cy.visit("http://localhost:3000");

        //direct to the question with one answer
        cy.contains("Quick question about storage on android").click()

        //click should comments button
        cy.get(".showAcommentsBtn").click();

        //check if the username and comment is correct
        cy.get(".aCommentsBy").should("contain", "rookieman1:");
        cy.get(".aCommentsText").should("contain", "I tried, it didn't work");

        //After hit show comments button again, comment section should be closed and cannot be found
        cy.get(".showAcommentsBtn").click();
        cy.get(".answerComments").should("not.exist")
    })

    it ("5.4 | Add 2 comments to an answer, the latest one should display on the top, and uncommented answer will should no comments yet", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser2", "testuserPassword3", "testuser2@gmail.com")

        //Create a new question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question for Answer1");
        cy.get("#formTextInput").type("Test Question for Answer1 text");
        cy.get("#formTagInput").type("test");
        cy.contains("Post Question").click();

        //Add a new answer
        cy.contains("Test Question for Answer1").click()
        cy.contains("Answer Question").click()
        cy.get("#answerTextInput").type("Test Answer 1")
        cy.contains("Post Answer").click()


        //Add a new comment
        cy.get(".addAcommentBtn").click()
        cy.get("#aCommentTextInput").type("Test comment 1");
        cy.contains("Post Comment").click();

        //Check if question comments are what we expect
        cy.get(".showAcommentsBtn").click();
        cy.get(".aCommentsBy").should("contain", "testuser2:")
        cy.get(".aCommentsText").should("contain", "Test comment 1")

        //Add a new comment for the same answer
        cy.get(".addAcommentBtn").click()
        cy.get("#aCommentTextInput").type("Test comment 2");
        cy.contains("Post Comment").click()

        //Check if the new comment is at the top of the list
        cy.get(".showAcommentsBtn").click();
        cy.get(".aCommentsText").first().should("contain","Test comment 2")

        //Create a new answer
        cy.contains("Answer Question").click()
        cy.get("#answerTextInput").type("Test Answer 2")
        cy.contains("Post Answer").click()

        cy.get(".showAcommentsBtn").first().click()
        cy.get(".aCommentsText").should("contain", "No comments yet, leave your comment!")
    })

    it ("5.5 | Add answer comments, each answer's comments can be displayed individually", () => {
        const acList = [
            "test answer comment 1",
            "test answer comment 2",
            "test answer comment 3"
        ]

        cy.visit("http://localhost:3000");
        cy.signUp("testuser2", "testuserPassword3", "testuser2@gmail.com")

        cy.contains("android studio save string shared preference, start activity and load the saved string").click();

        //Add comments to each of the answer
        for (let i = 0; i < acList.length; i++) {
            cy.get(".addAcommentBtn").eq(i).click();
            cy.get("#aCommentTextInput").type(acList[i]);
            cy.contains("Post Comment").click();
        }

        //Should display comments one by one and only one, it should contains what user commented
        for (let i = 0; i < acList.length; i++) {
            cy.get(".showAcommentsBtn").eq(i).click();
            cy.get(".aCommentsBy").should("contain","testuser2:");
            cy.get(".aCommentsText").should("contain", acList[i])
            cy.get(".answerComments").should("have.length",1)
            cy.get(".showAcommentsBtn").eq(i).click();
        }
    })


    it("5.6 | Adds a question, click active button, verifies the sequence", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser3", "testuserPassword!", "testuser3@neu.edu")

        // add a question
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript");
        cy.contains("Post Question").click();

        // add an answer to question of React Router
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer to React Router");
        cy.contains("Post Answer").click();

        // go back to main page
        cy.contains("Questions").click();

        // add an answer to question of Android Studio
        cy.contains(
          "android studio save string shared preference, start activity and load the saved string"
        ).click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer to android studio");
        cy.contains("Post Answer").click();

        // go back to main page
        cy.contains("Questions").click();

        // add an answer to question A
        cy.contains("Test Question A").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer Question A");
        cy.contains("Post Answer").click();

        // go back to main page
        cy.contains("Questions").click();

        // clicks active
        cy.contains("Active").click();

        const qTitles = [
            "Test Question A",
            "android studio save string shared preference, start activity and load the saved string",
            "Programmatically navigate using React router",
            "Quick question about storage on android",
            "Object storage for a web application",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qTitles[index]);
        });
    });

    it("5.7 | Checks if a6 and a7 exist in q3 answers page", () => {
        const answers = [
            "Using GridFS to chunk and store content.",
            "Storing content as BLOBs in databases.",
        ];
        cy.visit("http://localhost:3000");
        cy.contains("Object storage for a web application").click();
        cy.get(".answerText").each(($el, index) => {
            cy.contains(answers[index]);
        });
    });

    it("5.8 | Checks if a8 exist in q4 answers page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        cy.contains("Store data in a SQLLite database.");
    });

    //Section 6, check tags functionality

    it("6.1 | Adds a question with tags, checks the tags existied", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser3", "11223344","testuser3@neu.edu")

        // add a question with tags
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("test1 test2 test3");
        cy.contains("Post Question").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1");
        cy.contains("test2");
        cy.contains("test3");
    });

    it("6.2 | Checks if all tags exist", () => {
        cy.visit("http://localhost:3000");
        // all tags exist in the page
        cy.contains("Tags").click();
        cy.contains("react", { matchCase: false });
        cy.contains("javascript", { matchCase: false });
        cy.contains("android-studio", { matchCase: false });
        cy.contains("shared-preferences", { matchCase: false });
        cy.contains("storage", { matchCase: false });
        cy.contains("website", { matchCase: false });
        cy.contains("Flutter", { matchCase: false });
    });

    it("6.3 | Checks if all questions exist inside tags", () => {
        cy.visit("http://localhost:3000");
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("7 Tags");
        cy.contains("1 question");
        cy.contains("2 question");
        cy.contains("0 question");
    });

    it("6.4 | go to question in tag react", () => {
        cy.visit("http://localhost:3000");
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("react").click();
        cy.contains("Programmatically navigate using React router");
    });

    it("6.5 | go to questions in tag storage", () => {
        cy.visit("http://localhost:3000");
        // all question no. should be in the page
        cy.contains("Tags").click();
        cy.contains("storage").click();
        cy.contains("Quick question about storage on android");
        cy.contains("Object storage for a web application");
    });

    it("6.6 | create a new question with a new tag and finds the question through tag", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser3", "11223344","testuser3@neu.edu")

        // add a question with tags
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("test1-tag1");
        cy.contains("Post Question").click();

        // clicks tags
        cy.contains("Tags").click();
        cy.contains("test1-tag1").click();
        cy.contains("Test Question A");
    });

    //Section 7, check for question comment page and answer comment page
    it("7.1 | Return error when text input is empty in new question comment page and answer comment page", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser4", "11223344","testuser4@neu.edu")

        cy.contains("Quick question about storage on android").click();
        cy.get(".addQcommentBtn").click()
        cy.get("#qCommentTextInput")
        cy.contains("Post Comment").click()
        cy.contains("Comment text cannot be empty")

        cy.contains("Questions").click()
        cy.contains("Quick question about storage on android").click();
        cy.get(".addAcommentBtn").first().click();
        cy.contains("Post Comment").click()
        cy.contains("Comment text cannot be empty")
    })

    //Section 8, check for hyperlink functionality
    it("8.1 | Adds a question with a hyperlink and verifies", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser5", "11223344","testuser5@neu.edu")

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("How to add a hyperlink in Markdown?");
        cy.get("#formTextInput").type(
            "Here is a link: [Google](https://www.google.com)"
        );
        cy.get("#formTagInput").type("markdown");
        cy.contains("Post Question").click();
        cy.contains("How to add a hyperlink in Markdown?").click();
        cy.get("#questionBody")
            .find("a")
            .should("have.attr", "href", "https://www.google.com");
    });

    it("8.2 | Create new answer should be displayed at the top of the answers page", () => {
        const answers = [
            "Check this link for more info: [Documentation](https://docs.example.com)",
            "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
            "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        ];
        cy.visit("http://localhost:3000");
        cy.signUp("testuser5", "11223344","testuser5@neu.edu")

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(
            "Check this link for more info: [Documentation](https://docs.example.com)"
        );
        cy.contains("Post Answer").click();
        cy.get(".answerText")
            .first()
            .within(() => {
                cy.get("a").should("have.attr", "href", "https://docs.example.com");
            });
        cy.contains("testuser5");
        cy.contains("0 seconds ago");
    });

    it("8.3 | Tries to add a question with an invalid hyperlink and verifies failure", () => {
        const invalidUrls = [
            "[Google](htt://www.google.com)",
            "[Microsoft](microsoft.com)",
            "[](https://www.google.com/)",
            "[link]()",
            "dfv[]()",
            "[link](http://www.google.com/)",
            "[Google](https//www.google.com)",
            "[GitHub](http//github.com)",
            "[Facebook](https:/facebook.com)",
            "[Twitter](://twitter.com)",
            "[Netflix](htps://www.netflix)",
            "[Google](htts://www.goo<gle.com)",
            "[Google](http://www.google)",
            "[Dropbox](ttps://www.dropbox.c-m)",
            "[LinkedIn](ps:/www.linkedin.com)",
            "[Adobe](ttps://www.adobe..com)",
            "[Spotify](ttp:///www.spotify.com)",
            "[Reddit](http://reddit)",
            "[Wikipedia](tps://www.wikipedia=com)",
        ];
        cy.visit("http://localhost:3000");
        cy.signUp("testuser5", "11223344","testuser5@neu.edu")

        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type(
            "How to add an invalid hyperlink in Markdown?"
        );
        invalidUrls.forEach((url) => {
            cy.get("#formTextInput").clear().type(`This is an invalid link: ${url}`);
            cy.get("#formTagInput").clear().type("markdown");
            cy.contains("Post Question").click();
            cy.contains("Invalid hyperlink");
        });
        cy.visit("http://localhost:3000");
        cy.contains("How to add an invalid hyperlink in Markdown?").should(
            "not.exist"
        );
    });

    it("8.4 | Attempts to add an answer with an invalid hyperlink and verifies failure", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser5", "11223344","testuser5@neu.edu")

        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type(
            "Check this invalid link: [](https://wrong.url)"
        );
        cy.contains("Post Answer").click();
        cy.contains("Invalid hyperlink");
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.get(".answerText").should("not.contain", "https://wrong.url");
    });

    it("8.5 | Adds multiple questions with valid hyperlinks and verify", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser5", "11223344","testuser5@neu.edu")

        // List of question data
        const questions = [
          {
            title: "Test Question 1",
            text: "Test Question 1 Text [Google](https://www.google.com)",
            tag: "javascript",
            link: "https://www.google.com",
          },
          {
            title: "Test Question 2",
            text: "Test Question 2 Text [Yahoo](https://www.yahoo.com)",
            tag: "react",
            link: "https://www.yahoo.com",
          },
          {
            title: "How to add a hyperlink in Markdown?",
            text: "Here is a link: [Google](https://www.google.com)",
            tag: "markdown",
            link: "https://www.google.com",
          },
        ];

        // Add multiple questions with hyperlinks
        questions.forEach((question) => {
          cy.contains("Ask a Question").click();
          cy.get("#formTitleInput").type(question.title);
          cy.get("#formTextInput").type(question.text);
          cy.get("#formTagInput").type(question.tag);
          cy.contains("Post Question").click();
        });

        cy.contains("Questions").click();
        questions.reverse().forEach((q) => {
          cy.contains(q.title).click();
          cy.get("#questionBody").find("a").should("have.attr", "href", q.link);
          cy.contains("Questions").click();
        });
    });

    //Section 9, homepage tags
    it("9.1 | Clicks on a tag and verifies the tag is displayed", () => {
        const tagNames = "javascript";

        cy.visit("http://localhost:3000");
        cy.contains("Tags").click();

        cy.contains(tagNames).click();
        cy.get(".question_tags").each(($el, index, $list) => {
          cy.wrap($el).should("contain", tagNames);
        });
    });

    it("9.2 | Clicks on a tag in homepage and verifies the questions related tag is displayed", () => {
        const tagNames = "storage";

        cy.visit("http://localhost:3000");

        //clicks the 3rd tag associated with the question.
        cy.get(".question_tag_button").eq(2).click();

        cy.get(".question_tags").each(($el, index, $list) => {
          cy.wrap($el).should("contain", tagNames);
        });
    });

    //Section 10, user page functionality
    it("10.1 | No user page when user didn't log in", () => {
        cy.visit("http://localhost:3000");

        cy.get("menu_user").should("not.exist")
    })

    it("10.2 | After user log in, the side navi bar shows a menu of user's username",() => {
        cy.visit("http://localhost:3000");

        //Check for the first time
        const username1 = "testuser6"
        cy.signUp(username1, "11223344","testuser6@neu.edu")
        cy.get("#menu_user").should("contain", username1)
        cy.contains("Log out").click()
        cy.contains("Questions").click()

        //Cehck for the second time
        cy.signUp("Masterfruit", "1122334455", "masterfruit@gmail.com")
        cy.get("#menu_user").should("contain", "Masterfruit")
    })

    it("10.3 | Check user page components", () => {
        cy.visit("http://localhost:3000");
        const username = "testuser6"
        const useremail = "testuser6@neu.edu"
        const date = new Date()
        const userCreatedData = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
        cy.signUp(username, "11223344","testuser6@neu.edu")

        cy.contains(username).click()

        //check for welcome username msg, useremail msg, user joined date msg and related questions filter buttons
        cy.get("#usernameUP").should("contain", "Welcome, " + username)
        cy.get("#useremailUP").should("contain", "Email: "+ useremail)
        cy.get("#createdDateUP").should("contain", "You joined us on: " + userCreatedData)
        cy.get(".btns").should("contain", "Questions Asked")
        cy.get(".btns").should("contain", "Questions Answered")
        cy.get(".btns").should("contain", "Questions Commented")
    })

    it("10.4 | Should show all the questions that user answered", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //Add a new answer to a question
        cy.contains('Quick question about storage on android').click()
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("test answer 1")
        cy.contains("Post Answer").click()

        //Check if answer exists in answer page
        cy.contains("test answer 1")

        //check if answer exist in user page
        cy.get('#menu_user').click()
        cy.contains("Questions Answered").click()
        cy.get(".postTitle").should("contain", "Quick question about storage on android")

        //add a new answer to another question
        cy.contains('Questions').click()
        cy.contains("Programmatically navigate using React router").click()
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("test answer 2")
        cy.contains("Post Answer").click()

        //check if both answers are in there, and sorted by answer time
        cy.get('#menu_user').click()
        cy.contains("Questions Answered").click()
        cy.get(".postTitle").first().should("contain", "Programmatically navigate using React router")
        cy.contains('Quick question about storage on android')
    });

    it("10.5 | If user answered a question twice, do no show duplicate questions in user page", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        cy.contains('Quick question about storage on android').click()
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("test answer 1")
        cy.contains("Post Answer").click()

        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("test answer 2")
        cy.contains("Post Answer").click()

        cy.contains("testuser6").click()
        cy.contains("Questions Answered").click()

        cy.get(".postTitle").should("have.length", 1).and('contain', 'Quick question about storage on android')
    })

    it("10.6 | When user add a new question, it will show in the Questions Asked", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add a new test question
        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("test question 1")
        cy.get("#formTextInput").type("test question 1 text")
        cy.get("#formTagInput").type("test")
        cy.contains('Post Question').click()

        cy.contains("testuser6").click()
        cy.contains("Questions Asked").click()

        cy.get(".postTitle").should('contain', "test question 1")
        cy.get(".question_tag_button").should('contain', "test")

        cy.get(".question_author").should('contain', 'testuser6')

    })

    it("10.7 | Test the order of questions asked in user page is by the asked time", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add 2 new test questions
        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("test question 1")
        cy.get("#formTextInput").type("test question 1 text")
        cy.get("#formTagInput").type("test")
        cy.contains('Post Question').click()

        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("test question 2")
        cy.get("#formTextInput").type("test question 2 text")
        cy.get("#formTagInput").type("test")
        cy.contains('Post Question').click()

        //Check if first question is test question 2 and contains test question 1
        cy.contains("testuser6").click()
        cy.contains("Questions Asked").click()

        cy.get(".question").first().should('contain', "test question 2")

        cy.contains("test question 1")
    })

    it("10.8 | All unique questions that user commented should be show in Question Commented", () => {
        const qList = [
            "Quick question about storage on android",
            "android studio save string shared preference, start activity and load the saved string",
            "Object storage for a web application"

        ]

        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add 2 comments in one question, and 2 comment in other questions
        cy.contains("Quick question about storage on android").click()
        cy.get(".addQcommentBtn").click()
        cy.get('#qCommentTextInput').type("test comment 1")
        cy.contains("Post Comment").click()

        cy.get(".addQcommentBtn").click()
        cy.get('#qCommentTextInput').type("test comment 2")
        cy.contains("Post Comment").click()

        cy.contains("Questions").click()
        cy.contains("android studio save string shared preference, start activity and load the saved string").click()
        cy.get(".addQcommentBtn").click()
        cy.get('#qCommentTextInput').type("test comment 3")
        cy.contains("Post Comment").click()

        cy.contains("Questions").click()
        cy.contains("Object storage for a web application").click()
        cy.get(".addQcommentBtn").click()
        cy.get('#qCommentTextInput').type("test comment 4")
        cy.contains("Post Comment").click()

        cy.contains("testuser6").click()
        cy.contains("Questions Commented").click()

        //check if the length of commented questions is the same as qList for prevent duplicates
        cy.get(".postTitle").should('have.length', qList.length);

        //Check if questions are the same in the qlist
        cy.get(".postTitle").each(($el, index, $list) => {
            cy.wrap($el).should("contain", qList[index]);
        });
    })

    it("10.9 | Check if user can go to the answer page of question he asked", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add 2 new test questions
        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("test question 1")
        cy.get("#formTextInput").type("test question 1 text")
        cy.get("#formTagInput").type("test")
        cy.contains('Post Question').click()

        cy.contains("Ask a Question").click()
        cy.get("#formTitleInput").type("test question 2")
        cy.get("#formTextInput").type("test question 2 text")
        cy.get("#formTagInput").type("test")
        cy.contains('Post Question').click()

        cy.contains("testuser6").click()
        cy.contains("Questions Asked").click()

        //check if all elements are in the answer page of test question 1
        cy.contains("test question 1").click()
        cy.get(".answer_question_title").contains("test question 1")
        cy.get(".answer_question_text").contains("test question 1 text")
        cy.get(".question_author").contains("testuser6")

        //check if all elements are in the answer page of test question 2
        cy.contains("testuser6").click()
        cy.contains("Questions Asked").click()
        cy.contains("test question 2").click()
        cy.get(".answer_question_title").contains("test question 2")
        cy.get(".answer_question_text").contains("test question 2 text")
        cy.get(".question_author").contains("testuser6")
    })

    it("10.10 | Check if user can go to the answer page of question he answered", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add a new answer to a question
        cy.contains("Programmatically navigate using React router").click()
        cy.contains("Answer Question").click()
        cy.get("#answerTextInput").type("Test answer 1")
        cy.contains("Post Answer").click()

        //go to the answer page from userpage
        cy.contains("testuser6").click()
        cy.contains("Questions Answered").click()
        cy.contains("Programmatically navigate using React router").click()

        //check if elements are shown in the answer page
        cy.get(".answer_question_title").contains("Programmatically navigate using React router")
        cy.get(".answer_question_text").contains("the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.")
        cy.get(".question_author").contains("Joji John")
        cy.contains("React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.")
    })

    it("10.11 | Check if user can go to the answer page of question he commented", () => {
        cy.visit("http://localhost:3000");
        cy.signUp("testuser6", "11223344", "testuser6@neu.edu")

        //add a new answer to a question
        cy.contains("Programmatically navigate using React router").click()
        cy.get(".addQcommentBtn").click()
        cy.get("#qCommentTextInput").type("Test comment 1")
        cy.contains("Post Comment").click()

        //go to the answer page from userpage
        cy.contains("testuser6").click()
        cy.contains("Questions Commented").click()
        cy.contains("Programmatically navigate using React router").click()

        //check if elements are shown in the answer page
        cy.get(".answer_question_title").contains("Programmatically navigate using React router")
        cy.get(".answer_question_text").contains("the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.")
        cy.get(".question_author").contains("Joji John")
        cy.contains("React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.")
    })
});
