import express from "express";

const app = express();
const port = 3011;

app.use(express.static("public"))

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
    res.render("posts.ejs");
});

app.get("/write", (req, res) => {
    res.render("posting.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
});