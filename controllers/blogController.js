const Blog = require("../models/Blog");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("owner").sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate("owner");
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog does not exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const cloudinaryLink = await cloudinary.uploader.upload(req.file.path);

    const blog = await Blog.create({
      ...req.body,
      // image: req.file.path.replace(/\\/g, "/"),
      image: cloudinaryLink.url,
      owner: req.user._id,
    });
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let updatedBlog;
    if (req.file) {
      const updatingBlog = await Blog.findById(req.params.blogId);
      if (!updatingBlog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog does not exist",
        });
      }

      updatedBlog = {
        ...req.body,
      };
    } else {
      updatedBlog = {
        ...req.body,
      };
    }
    const blog = await Blog.findByIdAndUpdate(req.params.blogId, updatedBlog, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletingBlog = await Blog.findById(req.params.blogId);
    if (!deletingBlog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog does not exist",
      });
    }

    deletingBlog.delete();

    res.status(200).json({
      status: "success",
      message: "Blog Successfully Deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
