'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isMale: Boolean,
    role: String,   //类型: OPERATOR,操作员,USER老人
    phone: String,
    password: String,
    identityNumber: String,
    company: String,
    department: String,
    header: String,
    status: String,
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('users', tempSchema);
};
