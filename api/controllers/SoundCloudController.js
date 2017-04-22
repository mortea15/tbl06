/**
 * SoundCloudController
 *
 * @description :: Server-side logic for managing Soundclouds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // Search for something
    // SoundCloud API reference:
    // https://developers.soundcloud.com/docs/api/reference#tracks
    result: function (req, res, next) {
        SoundCloud.find(function foundSounds(err, sounds) {
            if (err) return next(err);

            var http = require('http');
            // Our client_id, needed to use the API
            var client_id = 'O3UkayfZTJjNeahVhqTiHcZ5iowrMRpk';

            function process_response(webservice_response, sound, callback) {
                var webservice_data = "";
                webservice_response.on('error', function (e) {
                    console.log(e.message);
                    callback("Error: " + e.message);
                });
                webservice_response.on('data', function (chunk) {
                    webservice_data += chunk;
                });

                // Response from query
                webservice_response.on('end', function () {
                    // Parse everything from the response (JSON)
                    sound_data = JSON.parse(webservice_data);
                    // Find the title of the first match
                    sound.title = sound_data.title;
                    // The duration provided by SoundCloud is in milliseconds
                    // convert to MM:SS format for readability
                    sound.duration = millis_to_min_sec(sound_data.duration);
                    // Logo for SoundCloud
                    sound.logo = 'http://icons.iconarchive.com/icons/sicons/basic-round-social/512/soundcloud-icon.png';
                    console.log(sound.title + ' ' + sound.duration);
                    callback();
                });
            };

            // Define host, path etc. for the search (JSON returned)
            function get_sound_data(sound, callback) {
                //http://api.soundcloud.com/tracks.json?client_id=O3UkayfZTJjNeahVhqTiHcZ5iowrMRpk&q=smile%20like%20you%20mean%20it
                console.log(sound.title);
                console.log(sound.duration);
                options = {
                    host: 'http://api.soundcloud.com',
                    port: 80,
                    path: '/tracks.json?client_id=O3UkayfZTJjNeahVhqTiHcZ5iowrMRpk&q=smile like you mean it&limit=2',   // client_id is given above, q='something to search for', limit to 2 results
                    method: 'GET'
                };

                var webservice_request = http.request(options, function (response) {
                    process_response(response, sound, callback)
                });
                webservice_request.end();

            };

            // Convert milliseconds to MM:SS format (minutes:seconds)
            function millis_to_min_sec(millis) {
                var minutes = Math.floor(millis / 60000);
                var seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            };

            async.each(sound.sounds, get_sound_data, function(err) {
                if(err) console.log(err);
                console.log('done');

                res.view({
                    sound: sound
                });
            });
        });
    },

};

