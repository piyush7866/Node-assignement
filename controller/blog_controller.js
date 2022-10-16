const blogModel = require("../models/blog_model");

const getBlog = async (req, res) => {
  try {
    await res.status(200).json({ blog: new blogModel() });
  } catch (error) {
    res.status(400).send(error);
  }
};

const postBlog = async (req, res) => {};
