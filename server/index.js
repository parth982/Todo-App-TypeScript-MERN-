const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const todosRoutes = require("./routes/todos.route.js");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use("/todos", todosRoutes);

// For all Other Routes Middleware return 404
app.use((req, res, next) => {
  res.status(404).send();
});

const initiate = () => {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(process.env.PORT || 4000, () =>
        console.log("Server running on port 4000")
      );
    })
    .catch((err) => console.log(err.message));
};
initiate();
