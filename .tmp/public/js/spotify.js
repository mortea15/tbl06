/**
 * Created by mortea15 on 23.04.2017.
 */

<!-- Spotify API Script -->
$(document).ready(function () {
    var searchTracks = function (query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track',
                limit: 5
            },
            success: function (response) {
                var SPTSong = response.tracks.items[0];                                     // Store the first result in a variable
                $('#SPTTitle').text(SPTSong.name);                                          // Title of the track
                $('#SPTArtist').text(SPTSong.artists[0].name);                              // Artists is an array containing one or more objects, but we'll take the first one and display that no matter what
                $('#SPTDuration').text(millis_to_min_sec(SPTSong.duration_ms));             // Duration of track
                $('#SPTURL').attr("href", SPTSong.external_urls.spotify);                   // URL to track
            }
        });
    };
    $("#searchButton").click(function () {
        searchTracks($('#searchField').val());
    });
});
<!-- End of Spotify API Script -->