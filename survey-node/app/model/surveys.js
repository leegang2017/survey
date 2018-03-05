'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    category: String,
    code: String,
    questions: Mixed,
    conclusions: Mixed,
    status: String,
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('surveys', tempSchema);
};
