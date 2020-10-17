const express = require("express");
const mongoose = require("mongoose");
const { Category } = require("../models/category");
const router = require("express").Router();

router.post("/", (req, res) => {
  const category = new Category(req.body);
  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

router.get("/", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

router.get("/id", (req, res) => {
  let category = req.body.id;
  Category.findOne({ _id: id }, (err, category) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(category);
  });
});

router.get("/name", (req, res) => {
  let category = req.body.category;
  Category.findOne({ name: category }, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});

module.exports = router;
