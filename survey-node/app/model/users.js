'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    shortName: String, //简写，用来登陆
    dob: Number, // 生日
    isMale: Boolean,// 性别
    roles: Mixed, // 角色权限
    phone: String,
    password: String,
    identityNumber: String, // 身份证号码
    header: String,
    status: String,
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('users', tempSchema);
};
