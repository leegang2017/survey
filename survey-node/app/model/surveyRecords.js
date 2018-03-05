'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    target: Mixed,      //用户
    name: String,
    category: String,
    code: String,
    questions: Mixed,    
    conclusions: Mixed, //测试的所有结果
    conclusion: Mixed,  //本次测试结果
    status: String,
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('surveyrecords', tempSchema);
};
