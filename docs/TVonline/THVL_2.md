

<!-- See this link: https://stackoverflow.com/questions/71228784/playing-a-iptv-live-tv-stream-with-videojs-or-similar -->


<!-- <div style="position:relative; padding-bottom:56.25%">
    <video id='live-video' class='video-js  vjs-default-skin  vjs-live  vjs-liveui' controls autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" >
    </video>
</div>

<script>
// The extra 'liveui' arg below, and two extra classnames are not REQUIRED, but documentation-tutorial
// refers to it as the newer/preferred API    See:  https://docs.videojs.com/tutorial-live.html
   var  player = videojs('live-video', {liveui: true} );
   player.src({ src:"https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8", type:'application/x-mpegURL'});
   // Note: We begin with the stream playing, but the audio is initially 'muted' (see that attribute in video tag above )
   //   See:   https://stackoverflow.com/questions/70719678/html5-video-autoplay-with-sound-unmuted
   player.play();

  /*   Note: Their "playlist.m3u8" file in their URL contains these lines (this info helps us understand the goal of their HLS)
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=2130537,RESOLUTION=1920x1080,CODECS="avc1.4d4028,mp4a.40.2",CLOSED-CAPTIONS=NONE
alarabiapublish/alarabiya_1080p/chunks.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1292733,RESOLUTION=1280x720,CODECS="avc1.4d401f,mp4a.40.2",CLOSED-CAPTIONS=NONE
alarabiapublish/alarabiya_720p/chunks.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=557217,RESOLUTION=640x360,CODECS="avc1.77.30,mp4a.40.2",CLOSED-CAPTIONS=NONE
alarabiapublish/alarabiya_360p/chunks.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=418515,RESOLUTION=426x240,CODECS="avc1.42c015,mp4a.40.2",CLOSED-CAPTIONS=NONE
alarabiapublish/alarabiya_240p/chunks.m3u8
*/
</script> -->



<script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script>

<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" controls preload="auto" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
</div>

<script>
    var videoSrc = 'https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8';
    var video = document.getElementById('vid1');
    if(Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('canplay',function() {
        video.play();
        });
    }
</script>


#