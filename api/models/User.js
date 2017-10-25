/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        group: {
            type: 'string',
            required: true
        }
    },


    /**
     * Create a new user using the provided inputs
     *
     * @param  {Object}   inputs
     *                     • name     {String}
     *                     • group    {String}
     * @param  {Function} cb
     */

    signup: function (inputs, cb) {
        // Create a user
        User.create({
            name: inputs.name,
            group: inputs.group
        })
            .exec(cb);
    },

    /**
     * Check validity of a login using the provided inputs.
     * But encrypt the password first.
     *
     * @param  {Object}   inputs
     *                     • email    {String}
     *                     • password {String}
     * @param  {Function} cb
     */

    attemptLogin: function (inputs, cb) {
        // Create a user
        User.findOne({
            name: inputs.name,
            group: inputs.group
        })
            .exec(cb);
    }
};