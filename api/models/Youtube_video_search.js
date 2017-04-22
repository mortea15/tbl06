/**
 * Youtube_video_search.js
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
          defaultsTo: 'https://www.jillwolcottknits.com/wp-content/uploads/2016/02/youtube-variation-round.png'
      },

      attributes: {
          Keyword: {
              type: 'string',
              required: true
          }

      }
}
};

