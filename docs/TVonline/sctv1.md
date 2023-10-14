
<div style="position:relative; padding-bottom:56.25%">
  <video id="vid1" class="video-js vjs-default-skin vjs-live vjs-liveui" controls autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;">
    <source src="https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8" type="application/x-mpegURL">
  </video>
</div>

<script>
    var player = videojs('vid1');

    player.Hls.xhr.beforeRequest = function(options) {
        options.headers = { "User-Agent": "ReactNativeVideo/3.4.4 (Linux;Android 9) ExoPlayerLib/2.13.3" }
        return options
      };


    player.play();
</script>


# SCTV1