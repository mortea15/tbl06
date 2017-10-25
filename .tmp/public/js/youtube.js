/**
 * Created by mortea15 on 23.04.2017.
 */

<!-- YouTube API Script -->
// Our private api key
var gapikey = 'AIzaSyAZHtMJkHY2Rc-Ag8VkdXAizCtdkwvfQ8A';
$(document).ready(function () {
    var search = function (query) {
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                q: query,
                type: 'video',
                maxResults: 5,
                part: 'snippet',
                order: 'relevance',
                key: gapikey
            },
            success: function (response) {
                var YTSong = response.items[0];                                           // Store the first result in a variable
                var YTSongURL = "https://www.youtube.com/watch?v=" + YTSong.id.videoId;   // Video URL (standard YouTube URL + video's ID)
                $('#YTTitle').text(YTSong.snippet.title);                                 // Title of the track
                $('#YTDuration').text(millis_to_min_sec(YTSong.duration_ms));             // Duration of track
                $('#YTURL').attr("href", YTSongURL);                                      // URL to track
                // When a song has been found, we can look up the duration of the track by running the next method
                findContentDetails(YTSong.id.videoId);
            }
        });
    };
    // When the user clicks the searchButton; run the search-function using the value of the searchField as a parameter
    $("#searchButton").click(function () {
        search($('#searchField').val());
    });
});

// After we've found a track, we'll need to use it's videoID to look up the duration of that track
// YouTube stores this in a separate JSON object, contentDetails, so we'll need to do a separate call to retrieve this
var findContentDetails = function (videoId) {
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        data: {
            id: videoId,
            part: 'contentDetails',
            key: gapikey
        },
        success: function (response) {
            var YTSongDetails = response.items[0];
            var duration = YTSongDetails.contentDetails.duration;
            $('#YTDuration').text(convert_time(duration));
            $('#resultList').show();                                                  // Display the list after a search is done
        }
    });
};
<!-- End of YouTube API Script -->