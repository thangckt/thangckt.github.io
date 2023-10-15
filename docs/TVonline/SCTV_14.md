
<!-- <div style="position:relative; padding-bottom:56.25%">
  <video id="vid1" class="video-js vjs-default-skin vjs-live vjs-liveui" controls autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;">
    <source src="https://code.vthanhtivi.pw/getlink/sctvonline/sctv14/playlist.m3u8" type="application/x-mpegURL">
  </video>
</div>

<!-- <script>
    var player = videojs('vid1');
    player.play();
</script>


<script>
    var options = {};
    videojs.Hls.xhr.beforeRequest = function(options) {
        options.headers["http-user-agent"] = "ReactNativeVideo/3.4.4 (Linux;Android 9) ExoPlayerLib/2.13.3"
        return options
      };
    var player = videojs('vid1', options);
    player.play();
</script> -->




<!-- Use chrome extension: https://github.com/video-dev/hls.js -->

<script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script>
<!-- Or if you want the latest version from the main branch -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->
<video id="video"></video>
<script>
  var video = document.getElementById('video');
  var videoSrc = 'https://code.vthanhtivi.pw/getlink/sctvonline/sctv14/playlist.m3u8';
  //
  // First check for native browser HLS support
  //
  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
    //
    // If no native HLS support, check if HLS.js is supported
    //
  } else if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
  }
</script>

#
