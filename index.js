// Import express and axios
import express from "express";
import axios from "axios";

// Creation of an express app and set the port number.
const app = express();
const port = 3000;

// Use the public folder for static files.
app.use(express.static("public"));

// When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://v2.jokeapi.dev/joke/any");
      res.render("index.ejs", {
        joke: result.data.joke,
        setup : result.data.setup,
        delivery: result.data.delivery
        });
    } catch (error) {
      res.render("index.ejs", { firstJoke: JSON.stringify(error.data) });
    }
});


// Listen on your predefined port and start the server.

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
