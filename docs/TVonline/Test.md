


<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script> -->

<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" controls preload="auto" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
</div>

HTV_3.md

<script>
    var videoSrc = 'https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8';
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