


<!-- <div style="position:relative; padding-bottom:56.25%">
<iframe
    src="blob:https://hplus.com.vn/3415df2e-c6d7-4d14-af51-69b421e5d671"
    style="width:100%;height:100%;position:absolute;left:0px;top:0px;" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" >
</iframe>
</div> -->


<!-- name="oauth2relay255174962" id="oauth2relay255174962" -->


<!-- <div style="position:relative; padding-bottom:56.25%">
<iframe
src="https //drm-livecdn.hplus.com.vn/CDN-FPT/THVL1-HD-ABR/playlist.m3u8"
    style="width:100%;height:100%;position:absolute;left:0px;top:0px;" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" >
</iframe>
</div> -->






<!-- <div style="position:relative; padding-bottom:56.25%">
    <video id="my_video" class="video-js vjs-default-skin" controls preload="auto" style="width:100%;height:100%;position:absolute;left:0px;top:0px;" autoplay="true">
    <source src="https://drm-livecdn.hplus.com.vn/CDN-FPT/THVL2-HD-ABR/playlist.m3u8" type="application/x-mpegURL">
    </video>
</div> -->


<!-- <video id="my_video" class="video-js vjs-default-skin" controls preload="auto"  autoplay="true">
    <source src="./iptv_list.m3u" type="application/x-mpegURL">
    </video>

<script>
var player = videojs('my_video');
player.play();
</script> -->


<!-- See this link: https://stackoverflow.com/questions/71228784/playing-a-iptv-live-tv-stream-with-videojs-or-similar -->

<video id='live-video' class='video-js   vjs-default-skin    vjs-live  vjs-liveui'    width='640' height='360'  controls  >
</video>

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
</script>
