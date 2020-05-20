import * as aws from "./aws.js";

describe("Database Tests", function() {
    let answer;

    let post = {
        title: "title",
        items: ["toilet paper", "vodka"],
        itemsCount: 2,
        latitude: "49.2510",
        longitude: "-123.0010",
        time: "today",
    
        userID: "userID",
        userFirstName: "userFirstName",
        userLastName: "userLastName",
        userEmail: "userEmail",
        userPhone: "userPhone",
    }

    it("post gets added to db", async function() {
        answer = await aws.createPost(post);
        let temp = await aws.getPost(answer.id);
        assert.equal(answer.id, temp.id);
    });

    it("post gets updated in db", async function() {
        answer.title = "updatedTitle";
        let temp = await aws.updatePost(answer);
        assert.equal(answer.id, temp.id);
    });

    it("post gets removed from db", async function() {
        let temp = await aws.deletePost(answer.id);
        assert.equal(answer.id, temp.id);
    });

});


describe("Authentication Tests", function() {
    this.timeout(5000);

    let user = {
        "username": "pehem40105@aprimail.com",
        "password": "pehem40105@aprimail.com",
        "attributes": {
          "given_name": "test",
          "family_name": "test",
          "phone_number": "+11111111111",
          'custom:latitude': "49.2777428",
          'custom:longitude': "-123.0937344"
        }
    };

    it("user can sign in", async function() {
        let u = await aws.signIn(user.username, user.password);
        assert.equal(u.attributes.email, user.username);
    });

});