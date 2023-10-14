
<!-- add user-agent: https://forum.libreelec.tv/thread/13563-pvr-iptv-simple-client-user-agent/ ; https://github.com/videojs/video.js/issues/4412-->



<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" class="video-js vjs-default-skin vjs-live vjs-liveui" controls preload="auto"  autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" >
    <source src="http://vthanhtivi.pw:5000/hbo/index.m3u8?|http_user_agent=Dalvik/2.1.0" type="application/x-mpegURL">
</video>
</div>

<script>
    var player = videojs('vid1');
    player.play();
</script>



<!-- <script>
    videojs.Hls.xhr.beforeRequest = function(options) {
        options.headers = { User-Agent: 'header' }
        return options
      }

    var player = videojs('vid1');
    player.play();
</script> -->


# HBO Asia