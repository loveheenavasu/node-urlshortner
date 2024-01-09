const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require('cors'); // Import the cors middleware


const app = express();
const PORT = 8001;
// mongodb://localhost:27017/
// connectToMongoDB("mongodb+srv://tanyajs:9xWzg2ZX0wHKpNGy@cluster0.2qcvq6d.mongodb.net/short-url").then(() =>
//   console.log("Mongodb connected")
// );
connectToMongoDB("mongodb://localhost:27017/short-urls").then(() =>
  console.log("Mongodb connected")
);
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
    try {
      // Your existing code for URL redirection
      const shortId = req.params.shortId;
      const entry = await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );
  
      if (!entry) {
        return res.status(404).send("URL not found");
      }
  
      // Set CORS headers explicitly
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type");
  
      res.redirect(entry.redirectURL);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));