const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema ({
      user : {
          type : mongoose.Schema.ObjectId
      },
    //   this defines the object id of the liked object
      likeable : {
          type : mongoose.Schema.ObjectId,
          required : true,
          refPath: 'onModel'
      },
    //   this field is used for defining the type of the liked object since this is a dynamic reference
      onModel : {
          type : String,
          required : true,
          enum : ['Post', 'Comment']
      }
    //   enum ka value upar ye batata hai ki post aur comment k database k andar hi like reh sakta hai
}, {
    timestamps : true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;