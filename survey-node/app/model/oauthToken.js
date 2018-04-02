'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: Mixed,
    expires: String,
    client: Mixed,
    user: Mixed,
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('oauthtokens', tempSchema);
};
