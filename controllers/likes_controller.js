const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async (req, res) => {
  try {
    //    likes/toggle/?id=abcdef&type=Post
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      console.log('req-query',req.query);
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }
    console.log(`likeable ${likeable}`);
    // check id a like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });
    console.log('existing like',existingLike);
    // if a like already exists then delete it
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      // else make a new like
      let newlike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      likeable.likes.push(newlike._id);
      likeable.save();
    }
    return res.status(200).json({
      message: "Request Successful!",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(`There is an error which is ${err}`);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
