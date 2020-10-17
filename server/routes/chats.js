const express = require("express");
const mongoose = require("mongoose");
const { Chat } = require("../models/chat");
const { Category } = require("../models/category");

const router = require("express").Router();
const async = require("async");
const { auth } = require("../middleware/auth");

router.post("/article", auth, (req, res) => {
  let newCtgry = { name: req.body.category };

  Category.findOne({ name: newCtgry }, (err, existing) => {
    if (err) return res.status(400).send(err);
    if (!existing) {
      const category = new Category(newCtgry);
      category.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        let ctgry = doc;
        let newChat = {};
        newChat.author = req.user._id;
        newChat.text = req.body.text;
        newChat.category = ctgry._id;
        newChat.images = req.body.images;

        console.log(newChat);
        const chat = new Chat(newChat);
        chat.save((err, doc) => {
          if (err) return res.json({ addSuccess: false, err });
          res.status(200).json({
            addSuccess: true,
            article: doc,
          });
        });
      });
    } else {
      let newChat = {};
      newChat.author = req.user._id;
      newChat.text = req.body.text;
      newChat.category = existing._id;
      newChat.images = req.body.images;

      console.log(newChat);
      const chat = new Chat(newChat);
      chat.save((err, doc) => {
        if (err) return res.json({ addSuccess: false, err });
        res.status(200).json({
          addSuccess: true,
          article: doc,
        });
      });
    }
  });
});

router.get("/by_id", auth, (req, res) => {
  // let type = req.query.type;
  // let items = req.query.id;
  let filter = {};
  let id = req.query.id;
  // if (type === "array") {
  //   let ids = req.query.id.split(",");
  //   items = [];
  //   items = ids.map((item) => {
  //     return mongoose.Types.ObjectId(item);
  //   });
  //   filter = { _id: { $in: items } };
  // } else {
  //   filter = { _id: req.query.id };
  // }

  Chat.find({ _id: mongoose.Types.ObjectId(id) }),
    (err, chat) => {
      if (err) return res.status(400).send(err);

      res.status(200).send(chat);
    };
});
router.get("/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  console.log(req.query.id);
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Chat.find({ _id: { $in: items } })
    //Product.find({ _id: items })
    .populate("author")
    .populate("category")
    .exec((err, docs) => {
      console.log(docs);
      return res.status(200).send(docs);
    });
});
router.post("/like", auth, (req, res) => {
  Chat.findOneAndUpdate(
    { _id: req.query.id },
    { $inc: { likes: 1 } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ editSuccess: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});
//Get Products
//
//SORT PRODUCTS
//By Arrival
// /articles?sortBy=createdAt&order=desc&limit=5

//By Sell date
// /articles?sortBy=sold&order=Desc&limit=5

router.post("/view", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key == "text") {
        findArgs[key] = { $regex: "/*" + req.body.filters[key] + "/*" };
      } else {
        //other filters
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(findArgs);
  Chat.find(findArgs)
    .populate("author")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles,
      });
    });
});

router.get("/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Chat.find()
    .populate("author")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

module.exports = router;
