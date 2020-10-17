const { User } = require("../models/user");
const mongoose = require("mongoose");
const { auth } = require("../middleware/auth");
const router = require("express").Router();
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

router.post("/", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ regSuccess: false, err });
    res.status(200).json({
      regSuccess: true,
    });
  });
});

router.post("/addtoFavorites", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { favorites: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.get("/deletefromFavorites", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { favorites: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.post("/addtoFollowing", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { following: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.post("/deletfromFollowing", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { following: { id: mongoose.Types.ObjectId(req.query.id) } } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        editSuccess: true,
      });
    }
  );
});

router.get("/by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  User.find({ _id: { $in: items } })
    //Product.find({ _id: items })
    .populate("following")
    .populate("favorites")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post("/uploadimage", auth, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

router.get("/list", (req, res) => {
  // let order = req.query.order ? req.query.order : "asc";
  // let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  // let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  User.find().exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users);
  });
});

module.exports = router;
