/**
 * Youtube_video_searchController
 *
 * @description :: Server-side logic for managing youtube_video_searches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //  'new': function(req, res) {
//        res.view();
  //  },


    // After the API loads, call a function to enable the search box.
    'new': function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
},

// Search for a specified string.
'new': function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function(response) {
        var str = JSON.stringify(response.result);
        $('#search-container').html('<pre>' + str + '</pre>');
    });
 },



//create: function(req, res, next) {
     //   Customer.create( req.params.all(), function customerCreated(err, customer) {
       //     if (err) return next(err);
         //   res.redirect('/customer/show/' + customer.id);
    // });
 //   },

  //  var GoogleAuth; // Google Auth object.
  //  function initClient() {
  //  gapi.client.init({
   //     'apiKey': 'AIzaSyDDqlo0ySH4W2rR25cAbhAMPGX98_uyuCo',
   //     'clientId': 'YOUR_CLIENT_ID',
   //     'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
   //     'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
   // }).then(function () {
   //     GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
   //     GoogleAuth.isSignedIn.listen(updateSigninStatus);
  //  });
//},
};

