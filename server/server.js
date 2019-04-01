const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

const app = express();

const mongoose = require("mongoose");
const async = require("async");

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/react/mongochat"
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
//Models
const { User } = require("./models/user");
const { Chat } = require("./models/chat");
const { Category } = require("./models/category");
//middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

//=================================
//             PRODUCTS
//=================================
app.post("/api/chats/article", auth, (req, res) => {
  console.log(req.body);

  let newChat = {};
  newChat.user = req.user._id;
  newChat.text = req.body.text;
  newChat.category = req.body.category;
  newChat.images = req.body.images;

  console.log(newChat);
  const chat = new Chat(newChat);
  chat.save((err, doc) => {
    if (err) return res.json({ addSuccess: false, err });
    res.status(200).json({
      addSuccess: true,
      article: doc
    });
  });
});

app.get("/api/chats/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Chat.find({ _id: { $in: items } })
    //Product.find({ _id: items })
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

//Get Products
//
//SORT PRODUCTS
//By Arrival
// /articles?sortBy=createdAt&order=desc&limit=5

//By Sell date
// /articles?sortBy=sold&order=Desc&limit=5

app.post("/api/chats/view", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key == "name") {
        findArgs[key] = { $regex: "/*" + req.body.filters[key] + "/*" };
      } else {
        //other filters
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  Chat.find(findArgs)
    .populate("user")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles
      });
    });
});

app.get("/api/chats/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Chat.find()
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});
//filter by category
// /articles?category=phones

//=================================
//             CATEGORY
//=================================

app.post("/api/categories", (req, res) => {
  const category = new Category(req.body);
  console.log(category);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc
    });
  });
});

app.get("/api/chats/categories", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

// app.get("/api/product/categories/id", (req, res) => {
//   let category = req.body.category;
//   console.log(category);

//   Category.find({ name: category }, (err, categories) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(categories);
//   });
// });

//=================================
//             USERS
//=================================

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ regSuccess: false, err });
    res.status(200).json({
      regSuccess: true
    });
  });
});
app.post("/api/users/edit", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ editSuccess: false, err });
      res.status(200).json({
        editSuccess: true
      });
    }
  );
});
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password"
        });
      // res.status(200).json({
      //   loginSuccess: true
      // });
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});
app.post("/api/users/addtoFavorits", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;
    doc.cart.forEach(item => {
      if (item.id == req.query.prodId) duplicate = true;
    });
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.prodId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.prodId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/deletefromFavorites", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      Chat.find({ " _id": { $in: array } })
        .populate("category")
        .exec((err, cardDetail) => {
          return res.status(200).json({ cardDetail, cart });
        });
    }
  );
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.post("/api/users/uploadimage", auth, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

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
