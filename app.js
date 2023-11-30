import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3011;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

const result = [];
var length = 0;

// For pushing the data to a global result array
function addPosts(data) {
    length = result.length;
    result.push(data);
}

function updatePost(updateData, index) {
    result[index].userName = updateData.userName;
    result[index].title = updateData.title;
    result[index].content = updateData.content;
}

// Get submitted data in particular form
function getData(req) { 
    var minute = "0";
    var contentLength = req.body["content"].length;
    if ( contentLength < 200) {
        minute = "1";
    } else if ( contentLength < 400 && contentLength > 200) {
        minute = "3";
    } else if (contentLength < 700 && contentLength > 400) {
        minute = "6";
    } else {
        minute = "10";
    }   
    const line = req.body["content"].slice(0,100);
    const data = {
        userName: req.body["name"],
        title: req.body["title"],
        content: req.body["content"],
        oneline: line,
        min: minute,
    }
    return data;
}

// Get current date with slashes
function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const withSlashes = [year, month, day].join('/');
    return withSlashes;
}

// For the home page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// To click to home section of the header 
app.get("/home", (req, res) => {
    res.render("home.ejs");
});

// To click to posts section of the header
app.get("/posts", (req, res) => {
    res.render("posts.ejs", {
        array: result,
        index: length,
        date: getDate(),
    });
});

// To post writing event 
app.get("/write", (req, res) => {
    res.render("posting.ejs");
});

// To about page
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// To entering data for post
app.post("/submit", (req, res) => {
    const data = getData(req);
    addPosts(data);
    res.render("posts.ejs", {
        array: result,
        index: length,
        date: getDate(),
    });
});

// Detail page
app.get("/details", (req, res) => {
    res.render("postDetail.ejs", {
        array: result,
        index: req.query["index"],
        date: getDate(),
    });
});

// To get edit page
app.get("/edit", (req, res) => {
    res.render("edit.ejs", {
        array: result,
        index: req.query["index"],
        date: getDate(),
    })
});

app.get("/update", (req, res) => {
    console.log(req.query)
    const postId = req.query["postId"];
    let name = req.query["name"];
    let title = req.query["title"];
    let content = req.query["content"];
    const req_data = {
        req_name: name,
        req_title: title,
        req_content: content,
    }
    updatePost(req_data, req.query["postId"])
    res.render("postDetail.ejs", {
        array: result,
        index: length,
        date: getDate(),
    })
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});