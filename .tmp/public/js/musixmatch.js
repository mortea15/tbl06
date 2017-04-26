/**
 * Created by mortea15 on 23.04.2017.
 */

<!-- MusixMatch API Script -->
var apikey = 'e35483bc888d4502f1202967734e0ecd';

$(document).ready(function () {
    var search = function (query) {
        $.ajax({
            type: "GET",
            data: {
                apikey: apikey,
                q_track: query,
                format: "jsonp",
                callback: "jsonp_callback"
            },
            url: "https://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: "jsonp_callback",
            contentType: "application/json",
            success: function (data) {
                var track_id = (data.message.body.track_list["0"].track.track_id);
                var title = (data.message.body.track_list["0"].track.track_name);
                var artist = (data.message.body.track_list["0"].track.artist_name);

                $('#MMTitle').text(title + " - Lyrics");
                findLyrics(track_id);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }
    $("#searchButton").click(function () {
        search($('#searchField').val());
    });
});

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
            $('#MMLyricsPreview').text(lyrics);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
}
            //var MMSongLyrics = response.items[0];
            //var duration = YTSongDetails.contentDetails.duration;
            //$('#YTDuration').text(convert_time(duration));
            //$('#resultList').show();                                                  // Display the list after a search is done
<!-- End of MusixMatch API Script -->