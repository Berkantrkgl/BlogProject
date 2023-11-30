import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3011;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

const result = [];
var length;

// For pushing the data to a global result array
function addPosts(data) {
    length = result.length;
    result.push(data);
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
    });
});

app.get("/write", (req, res) => {
    res.render("posting.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.post("/submit", (req, res) => {
    const data = getData(req);
    addPosts(data);
    res.render("posts.ejs", {
        array: result,
        index: length,
    });
})

app.get("/details", (req, res) => {
    console.log(req.body)
    res.render("postDetail.ejs", {
        array: result,
        index: length,
    });
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});