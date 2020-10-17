const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

//Routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const chats = require("./routes/chats");
const categories = require("./routes/categories");

const app = express();

require("dotenv").config();

mongoose.Promise = global.Promise;
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/react/mongochat"
// );

mongoose
  .connect(process.env.MONGODB_CONNSTR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  })
  .then(() => {
    // app.listen(process.env.PORT || 3002, () => {
    //   console.log("server is running on port 3002");
    // });
  })
  .catch((err) => {
    console.log(
      "Connection failed",
      "Error could not connect to mongodb server"
    );
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/users/auth", users);
app.use("/api/users/login", users);
app.use("/api/users/logout", users);
app.use("/api/users/uploadimage", users);
app.use("/api/users/list", users);
app.use("/api/users/by_id", users);
app.use("/api/users/addtoFollowing", users);
app.use("/api/users/deletfromFollowing", users);
app.use("/api/users/addtoFavorites", users);
app.use("/api/users/deletefromFavorites", users);
app.use("/api/chats", chats);
app.use("/api/chats/article", chats);
app.use("/api/chats/view", chats);
app.use("/api/chats/articles", chats);
app.use("/api/chats/articles_by_id", chats);
app.use("/api/chats/like", chats);
app.use("/api/chats/dislike", chats);
app.use("/api/categories", categories);
app.use("/api/categories/id", categories);

//default
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
