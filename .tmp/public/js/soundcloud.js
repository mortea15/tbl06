/**
 * Created by mortea15 on 23.04.2017.
 */

<!-- SoundCloud API Script -->
$(document).ready(function () {
    // Initialize SoundCloud
    SC.initialize({
        client_id: 'O3UkayfZTJjNeahVhqTiHcZ5iowrMRpk'
    });

    // Get track matching the search
    // Search for tracks only, and limit the search to 5 results
    $("#searchButton").click(function () {
        SC.get('/tracks', {
            q: $("#searchField").val(), limit: 5
        }).then(function (tracks) {
            var SCSong = tracks[0];                                       // Store the first result in a variable
            $("#SCTitle").text(SCSong.title);                             // Title & Artist of the track
            $("#SCDuration").text(millis_to_min_sec(SCSong.duration));    // Duration of track
            $("#SCURL").attr("href", SCSong.permalink_url);               // URL to track
        });
    });
});
<!-- End of SoundCloud API Script -->