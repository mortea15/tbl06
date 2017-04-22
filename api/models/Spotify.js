/**
 * Spotify.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      title: {
          type: 'string',
          required: true
      },

      artist: {
          type: 'string',
          required: true
      },

      duration: {
          type: 'string',
          required: true
      },

      logo: {
          type: 'text',
          defaultsTo: 'http://pre14.deviantart.net/5e2b/th/pre/f/2015/245/9/b/new_spotify_icon_by_mattroxzworld-d98301o.png'
      },

  }
};

