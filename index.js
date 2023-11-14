// Import express, axios & Body-Parser modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


// Creation of an express app and set the port number.
const app = express();
const port = 3000;

// Use the public folder for static files.
app.use(express.static("public"));

//We activate bodyparser to parse data from user's request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// //We set de engine as ejs so jQuery can work in this type of file.
// app.set("view engine", "ejs");

// When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://v2.jokeapi.dev/joke");
      res.render("index.ejs", {
        joke: result.data.joke,
        setup : result.data.setup,
        delivery: result.data.delivery
        });
    } catch (error) {
      res.render("index.ejs", { joke: JSON.stringify(error.data) });
    }
});

app.post("/get-joke", async (req, res) => {
    const jokeCategory = req.body.category;
    const jokeLanguage = req.body.language;
    const jokeQty = req.body.qty;
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/"+jokeCategory,{params: { lang: jokeLanguage} });
        res.render("index.ejs", {
            joke: result.data.joke,
            setup : result.data.setup,
            delivery: result.data.delivery
        });
    } catch (error) {
    res.render("index.ejs", { joke: JSON.stringify(error.data) });
    }
  });


// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
