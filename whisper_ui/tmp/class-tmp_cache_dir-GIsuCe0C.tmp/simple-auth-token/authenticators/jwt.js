define('simple-auth-token/authenticators/jwt', ['exports', 'ember', 'simple-auth-token/configuration', 'simple-auth-token/authenticators/token'], function (exports, Ember, Configuration, TokenAuthenticator) {

  'use strict';

  exports['default'] = TokenAuthenticator['default'].extend({
    /**
      The endpoint on the server for refreshing a token.
      @property serverTokenRefreshEndpoint
      @type String
      @default '/api-token-refresh/'
    */
    serverTokenRefreshEndpoint: '/api-token-refresh/',

    /**
      Sets whether the authenticator automatically refreshes access tokens.
      @property refreshAccessTokens
      @type Boolean
      @default true
    */
    refreshAccessTokens: true,

    /**
      The number of seconds to subtract from the token's time of expiration when
      scheduling the automatic token refresh call.
      @property refreshLeeway
      @type Integer
      @default 0 (seconds)
    */
    refreshLeeway: 0,

    /**
      The amount of time to wait before refreshing the token - set automatically.
      @property refreshTokenTimeout
      @private
    */
    refreshTokenTimeout: null,

    /**
      The name for which decoded token field represents the token expire time.
      @property tokenExpireName
      @type String
      @default 'exp'
    */
    tokenExpireName: 'exp',

    /**
      Default time unit.
      @property timeFactor
      @type Integer
      @default 1 (seconds)
    */
    timeFactor: 1,

    /**
      @method init
      @private
    */
    init: function init() {
      this.serverTokenEndpoint = Configuration['default'].serverTokenEndpoint;
      this.serverTokenRefreshEndpoint = Configuration['default'].serverTokenRefreshEndpoint;
      this.identificationField = Configuration['default'].identificationField;
      this.tokenPropertyName = Configuration['default'].tokenPropertyName;
      this.refreshAccessTokens = Configuration['default'].refreshAccessTokens;
      this.refreshLeeway = Configuration['default'].refreshLeeway;
      this.tokenExpireName = Configuration['default'].tokenExpireName;
      this.timeFactor = Configuration['default'].timeFactor;
      this.headers = Configuration['default'].headers;
    },

    /**
      Restores the session from a set of session properties.
       It will return a resolving promise if one of two conditions is met:
       1) Both `data.token` and `data.expiresAt` are non-empty and `expiresAt`
         is greater than the calculated `now`.
      2) If `data.token` is non-empty and the decoded token has a key for
         `tokenExpireName`.
       If `refreshAccessTokens` is true, `scheduleAccessTokenRefresh` will
      be called and an automatic token refresh will be initiated.
       @method restore
      @param {Object} data The data to restore the session from
      @return {Ember.RSVP.Promise} A promise that when it resolves results
                                   in the session being authenticated
    */
    restore: function restore(data) {
      var _this = this,
          dataObject = Ember['default'].Object.create(data);

      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var now = new Date().getTime();
        var expiresAt = _this.resolveTime(dataObject.get(_this.tokenExpireName));
        var token = dataObject.get(_this.tokenPropertyName);

        if (Ember['default'].isEmpty(token)) {
          return reject(new Error('empty token'));
        }
        if (Ember['default'].isEmpty(expiresAt)) {
          // Fetch the expire time from the token data since `expiresAt`
          // wasn't included in the data object that was passed in.
          var tokenData = _this.getTokenData(data[_this.tokenPropertyName]);
          expiresAt = _this.resolveTime(tokenData[_this.tokenExpireName]);
          if (Ember['default'].isEmpty(expiresAt)) {
            return resolve(data);
          }
        }
        if (expiresAt !== expiresAt) {
          return reject(new Error('invalid expiration'));
        }
        if (expiresAt > now) {
          var wait = expiresAt - now - _this.refreshLeeway * 1000;
          if (wait > 0) {
            if (_this.refreshAccessTokens) {
              _this.scheduleAccessTokenRefresh(dataObject.get(_this.tokenExpireName), token);
            }
            resolve(data);
          } else if (_this.refreshAccessTokens) {
            resolve(_this.refreshAccessToken(token).then(function () {
              return data;
            }));
          } else {
            reject(new Error('unable to refresh token'));
          }
        } else {
          reject(new Error('token is expired'));
        }
      });
    },

    /**
      Authenticates the session with the specified `credentials`.
       It will return a resolving promise if it successfully posts a request
      to the `JWT.serverTokenEndpoint` with the valid credentials.
       An automatic token refresh will be scheduled with the new expiration date
      from the returned refresh token. That expiration will be merged with the
      response and the promise resolved.
       @method authenticate
      @param {Object} options The credentials to authenticate the session with
      @return {Ember.RSVP.Promise} A promise that resolves when an auth token is
                                   successfully acquired from the server and rejects
                                   otherwise
    */
    authenticate: function authenticate(credentials) {
      var _this = this;

      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var data = _this.getAuthenticateData(credentials);

        _this.makeRequest(_this.serverTokenEndpoint, data).then(function (response) {
          Ember['default'].run(function () {
            var token = response[_this.tokenPropertyName],
                tokenData = _this.getTokenData(token),
                expiresAt = tokenData[_this.tokenExpireName],
                tokenExpireData = {};

            _this.scheduleAccessTokenRefresh(expiresAt, token);

            tokenExpireData[_this.tokenExpireName] = expiresAt;

            response = Ember['default'].merge(response, tokenExpireData);

            resolve(_this.getResponseData(response));
          });
        }, function (xhr) {
          Ember['default'].run(function () {
            reject(xhr.responseJSON || xhr.responseText);
          });
        });
      });
    },

    /**
      Schedules a token refresh request to be sent to the backend after a calculated
      `wait` time has passed.
       If both `token` and `expiresAt` are non-empty, and `expiresAt` minus the optional
      refres leeway is greater than the calculated `now`, the token refresh will be scheduled
      through Ember.run.later.
       @method scheduleAccessTokenRefresh
      @private
    */
    scheduleAccessTokenRefresh: function scheduleAccessTokenRefresh(expiresAt, token) {
      if (this.refreshAccessTokens) {
        expiresAt = this.resolveTime(expiresAt);

        var now = new Date().getTime(),
            wait = expiresAt - now - this.refreshLeeway * 1000;

        if (!Ember['default'].isEmpty(token) && !Ember['default'].isEmpty(expiresAt) && wait > 0) {
          Ember['default'].run.cancel(this._refreshTokenTimeout);

          delete this._refreshTokenTimeout;

          if (!Ember['default'].testing) {
            this._refreshTokenTimeout = Ember['default'].run.later(this, this.refreshAccessToken, token, wait);
          }
        }
      }
    },

    /**
      Makes a refresh token request to grab a new authenticated JWT token from the server.
       It will return a resolving promise if a successful POST is made to the
      `JWT.serverTokenRefreshEndpoint`.
       After the new token is obtained it will schedule the next automatic token refresh
      based on the new `expiresAt` time.
       The session will be updated via the trigger `sessionDataUpdated`.
       @method refreshAccessToken
      @private
    */
    refreshAccessToken: function refreshAccessToken(token) {
      var _this = this,
          data = {};

      data[_this.tokenPropertyName] = token;

      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        _this.makeRequest(_this.serverTokenRefreshEndpoint, data).then(function (response) {
          Ember['default'].run(function () {
            var token = response[_this.tokenPropertyName],
                tokenData = _this.getTokenData(token),
                expiresAt = tokenData[_this.tokenExpireName],
                tokenExpireData = {};

            tokenExpireData[_this.tokenExpireName] = expiresAt;

            data = Ember['default'].merge(response, tokenExpireData);

            _this.scheduleAccessTokenRefresh(expiresAt, token);
            _this.trigger('sessionDataUpdated', data);

            resolve(response);
          });
        }, function (xhr, status, error) {
          Ember['default'].Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
          reject();
        });
      });
    },

    /**
      Returns the decoded token with accessible returned values.
       @method getTokenData
      @return {object} An object with properties for the session.
    */
    getTokenData: function getTokenData(token) {
      var tokenData = atob(token.split('.')[1]);

      try {
        return JSON.parse(tokenData);
      } catch (e) {
        //jshint unused:false
        return tokenData;
      }
    },

    /**
      Accepts a `url` and `data` to be used in an ajax server request.
       @method makeRequest
      @private
    */
    makeRequest: function makeRequest(url, data) {
      return Ember['default'].$.ajax({
        url: url,
        method: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function beforeSend(xhr, settings) {
          xhr.setRequestHeader('Accept', settings.accepts.json);
        },
        headers: this.headers
      });
    },

    /**
      Cancels any outstanding automatic token refreshes and returns a resolving
      promise.
      @method invalidate
      @param {Object} data The data of the session to be invalidated
      @return {Ember.RSVP.Promise} A resolving promise
    */
    invalidate: function invalidate() {
      Ember['default'].run.cancel(this._refreshTokenTimeout);

      delete this._refreshTokenTimeout;

      return new Ember['default'].RSVP.resolve();
    },

    /**
      Handles converting between time units for data between different systems.
      Default: seconds(1)
      @method resolveTime
      @private
    */
    resolveTime: function resolveTime(time) {
      if (Ember['default'].isEmpty(time)) {
        return time;
      }
      return new Date(time * this.timeFactor).getTime();
    }
  });

});