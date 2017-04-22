/**
 * SoundCloud.js
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

      duration: {
        type: 'string',
          required: true
      },

      logo: {
        type: 'text',
          defaultsTo: 'http://icons.iconarchive.com/icons/sicons/basic-round-social/512/soundcloud-icon.png'
      }
  }
};

