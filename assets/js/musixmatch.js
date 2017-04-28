/**
 * Created by mortea15 on 23.04.2017.
 */

<!-- MusixMatch API Script -->
// Our private key needed for running requests
var apikey = 'e35483bc888d4502f1202967734e0ecd';

// Function to search for something
$(document).ready(function () {
    var searchMM = function (query) {
        $.ajax({
            type: "GET",
            data: {
                apikey: apikey,                                         // Our key
                q_track: query,                                         // The query (our search phrase)
                format: "jsonp",                                        // Request the data in JSONP formatting
                callback: "jsonp_callback"                              // Request the callback
            },
            url: "https://api.musixmatch.com/ws/1.1/track.search",      // URL for searching for tracks
            dataType: "jsonp",                                          // Datatype
            jsonpCallback: "jsonp_callback",                            // Callback
            contentType: "application/json",                            // Which content it is
            success: function (data) {
                var track_id = (data.message.body.track_list["0"].track.track_id);      // Store the tracks ID
                var title = (data.message.body.track_list["0"].track.track_name);       // Store the title
                var artist = (data.message.body.track_list["0"].track.artist_name);     // Store the artists' name

                $('#MMTitle').text(title + " by " + artist + " - Lyrics");              // Set the value of the element 'MMTitle'
                // Now that we've found our song, we'll need to find the lyrics related to this result
                findLyrics(track_id);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
    // When the searchButton is clicked, run the search-function
    $("#searchButton").click(function () {
        searchMM($('#searchField').val());
    });
});

// Find the lyrics of a specific song by looking up the song's ID
var findLyrics = function (trackId) {
    $.ajax({
        type: "GET",
        data: {
            apikey: apikey,
            track_id: trackId,
            format: "jsonp",
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function (data) {
            var lyrics = data.message.body.lyrics.lyrics_body;
            $('#MMLyricsPreview').text(lyrics);                                         // Display the lyrics of the song
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};
<!-- End of MusixMatch API Script -->