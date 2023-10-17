
<!-- <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js vjs-default-skin vjs-live vjs-liveui" controls preload="auto"  autoplay  style="width:100%;height:100%;position:absolute;left:0px;top:0px;">
    <source src="https://epg.pw/stream/1007d830565e93f89444e5b52302ed2d24506870d46b060143ba0d47cbf66900.ctv" type="application/x-mpegURL">
    </video>
</div>

<script>
    var player = videojs('vid1');
    player.play();
</script> -->


<!-- USE BUTTON: https://www.joshwcomeau.com/animation/3d-button/#a-hover-state-4 -->
<style>
  .pushable {
    background: skyblue; /* Changed button color to sky blue */
    /* background: hsl(340deg 100% 32%); */
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
  }
  .front {
    display: block;
    padding: 12px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    background: hsl(345deg 100% 47%);
    color: white;
    transform: translateY(-6px);
  }

  .pushable:active .front {
    /* background: hsl(215deg 100% 32%); /* Changed the active color */
    transform: translateY(-2px);
  }
  .pushable:focus:not(:focus-visible) {
    outline: none;
  }
</style>


<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script> -->

<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" controls preload="none" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
</div>

<script>
    function loadVideo(videoUrl) {
        // var videoUrl = document.getElementById("m3u8Link").value;
        var video = document.getElementById('vid1');
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoUrl;
            video.addEventListener('canplay', function() {
                video.play();
            });
        }
    }

    // Automatically load and play default video when page loads
    window.addEventListener('load', function() {
        var defaultVideoUrl = 'https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8';
        loadVideo(defaultVideoUrl);
    });
</script>


<!-- ADD LINK FOR CHANNEL -->
#
## HTV
<button class="pushable" onclick="loadVideo('https://epg.pw/stream/1007d830565e93f89444e5b52302ed2d24506870d46b060143ba0d47cbf66900.ctv')"> <span class="front">HTV 1</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8')"> <span class="front">HTV 2</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8')"> <span class="front">HTV 3</span> </button>

## HTVC
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHIM-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Phim</span> </button>

<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PLUS-HD-1080p/playlist.m3u8')"> <span class="front">HTV Plus</span> </button>

<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-THUANVIET-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Thuan Viet</span> </button>