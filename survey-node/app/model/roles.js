'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const tempSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String, // 角色名称
    // code: String,     //角色编码
    permission: Mixed, // 权限
    system: String, // 那个系统
    organization: Mixed, // 机构
    created: Number,
    updated: Number,
  }, {
    versionKey: false,
  });

  return mongoose.model('roles', tempSchema);
};
