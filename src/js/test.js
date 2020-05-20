import * as aws from "./aws.js";

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

describe("Database Tests", function() {

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

    it("post gets removed from db", async function() {
        // let user = await aws.currentAuthenticatedUser();
        // console.log(user);
        // assert.equal();
    });


});