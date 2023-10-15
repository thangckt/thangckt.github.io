
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

<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
<!-- Or if you want the latest version from the main branch -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->

<video id="video"></video>
<script>
  var video = document.getElementById('video');
  var videoSrc = 'https://code.vthanhtivi.pw/getlink/sctvonline/sctv14/playlist.m3u8';
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
  }
  // HLS.js is not supported on platforms that do not have Media Source
  // Extensions (MSE) enabled.
  //
  // When the browser has built-in HLS support (check using `canPlayType`),
  // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
  // element through the `src` property. This is using the built-in support
  // of the plain video element, without using HLS.js.
  //
  // Note: it would be more normal to wait on the 'canplay' event below however
  // on Safari (where you are most likely to find built-in HLS support) the
  // video.src URL must be on the user-driven white-list before a 'canplay'
  // event will be emitted; the last video event that can be reliably
  // listened-for when the URL is not on the white-list is 'loadedmetadata'.
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc;
  }
</script>

#
