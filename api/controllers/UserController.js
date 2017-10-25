/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    /**
     * `UserController.login()`
     */
    login: function (req, res) {

        // See `api/responses/login.js`
        return res.login({
            name: req.param('name'),
            group: req.param('group'),
            successRedirect: '/',
            invalidRedirect: '/login'
        });
    },


    /**
     * `UserController.signup()`
     */
    signup: function (req, res) {

        // Attempt to signup a user using the provided parameters
        User.signup({
            name: req.param('name'),
            group: req.param('group')
        }, function (err, user) {
            // res.negotiate() will determine if this is a validation error
            // or some kind of unexpected server error, then call `res.badRequest()`
            // or `res.serverError()` accordingly.
            if (err) return res.negotiate(err);

            // Go ahead and log this user in as well.
            // We do this by "remembering" the user in the session.
            // Subsequent requests from this user agent will have `req.session.me` set.
            req.session.me = user.id;

            // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
            // send a 200 response letting the user agent know the signup was successful.
            if (req.wantsJSON) {
                return res.ok('Registration successful!');
            }

            // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
            return res.redirect('/');
        });
    },

    show: function (req, res, next) {
        User.findOne(req.param('id')).populateAll().exec(function (err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({
                user: user
            });
        });
    },

    edit: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();

            res.view({
                user: user
            });
        });
    },

    update: function (req, res, next) {
        User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    },

    destroy: function (req, res, next) {
        User.destroy(req.param('id')).exec(function () {
            res.redirect('/user/');
        });
    }
};
