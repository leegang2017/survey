const helper = require('./helper');
const mongoose = require('mongoose');

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }
    getClient(clientId, clientSecret) {
      if (clientId === 'my_app' && clientSecret === 'my_secret') {
        return {
          clientId: 'my_app',
          clientSecret: 'my_secret',
          refreshTokenLifetime: 0,
          accessTokenLifetime: 3600,
          grants: [
            'password', 'refresh_token',
          ],
        };
      }
      return;
    }

    async getUser(username, password) {
      console.log(`${username} ${password}`);
      const user = await this.ctx.service.users.login(username, password);
      if (!user) {
        return;
      }
      return { _id: user._id.toHexString() };

    }

    async getAccessToken(bearerToken) {
      const expiresIn = app.config.oAuth2Server.expiresIn;
      const tokendb = await app.model.OauthToken.findOne({ 'token.accessToken': bearerToken });
      const token = tokendb.token;
      const now = new Date().getTime();
      if (token.accessTokenExpiresAt > now) {
        token.accessTokenExpiresAt = now + expiresIn * 1000;
        await app.model.OauthToken.findOneAndUpdate({ _id: tokendb._id }, { $set: { 'token.accessTokenExpiresAt': token.accessTokenExpiresAt } }, { new: true });
      }

      token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
      token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
      token.user = tokendb.user;
      token.client = tokendb.client;
      return token;

    }

    async saveToken(token, client, user) {
      const _id = mongoose.Types.ObjectId();
      const tokendb = Object.assign({}, token);
      tokendb.accessTokenExpiresAt = tokendb.accessTokenExpiresAt.getTime();
      tokendb.refreshTokenExpiresAt = tokendb.refreshTokenExpiresAt.getTime();
      await app.model.OauthToken({ _id, token: tokendb, client, user }).save();
      const _token = Object.assign({}, token, { user }, { client });
      return _token;

    }

    async getAuthorizationCode(authorizationCode) {}
    async saveAuthorizationCode(code, client, user) {}

  }


  return Model;
};
