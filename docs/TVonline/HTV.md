---
hide:
  # - toc
  - navigation
---


<!-- USE BUTTON: https://www.joshwcomeau.com/animation/3d-button/#a-hover-state-4 -->
<style>
  .pushable {
    background: skyblue; /* Changed button color to sky blue */
    /* background: hsl(340deg 100% 32%); */
    border-radius: 8px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    margin-bottom: 8px;
  }
  .front {
    display: block;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: 12pt;
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

  .container {
      display: flex;
      max-width: 800px;
      margin: 0 auto;
  }

  .column {
      flex: 1;
      padding: 20px;
  }

  .video-column {
      max-width: 600px; /* Adjust the width as needed */
  }
</style>


<!-- videojs-http-streaming (VHS) -->
<script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
<script src="https://unpkg.com/browse/@videojs/http-streaming@3.7.0/dist/videojs-http-streaming.min.js"></script>

<script>
    function loadVideo(videoUrl) {
        window.scrollTo(0, 0); // Scroll to the top after loading the video
        // var videoUrl = document.getElementById("m3u8Link").value;
        var player = videojs('vid1');
            player.src({src: videoUrl, type: 'application/x-mpegURL'});
            video.play();
    }

    // Automatically load and play default video when page loads
    window.addEventListener('load', function() {
        loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8');
    });
</script>


<div class="container">
    <!-- First Column: Video Frame -->
    <div style="position:relative; padding-bottom:56.25%">
        <video-js id="vid1" class="vjs-default-skin" controls preload="none" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video-js>
    </div>
    <!-- Second Column: Other Content -->
    <div class="column">
        <!-- ADD LINK FOR CHANNEL -->
        <h2>Tin Tuc</h2>
        <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/dw-hd/playlist.m3u8')"> <span class="front">DW</span> </button>

        <h2>Kenh Phim</h2>
        <h3>Phim Viet</h3>
        <button class="pushable" onclick="loadVideo('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button>

        <h3>Phim Nuoc Ngoai</h3>
        <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/hbo/playlist.m3u8')"> <span class="front">HBO Asia</span> </button>
        <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/cinemax/playlist.m3u8')"> <span class="front">Cinemax</span> </button>
        <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/axn/playlist.m3u8')"> <span class="front">AXN</span> </button>
    </div>
</div>

## SCTV
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8')"> <span class="front">SCTV 1</span> </button>
<button class="pushable" onclick="loadVideo('')"> <span class="front">SCTV 14</span> </button>
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/sctvonline/sctv15/playlist.m3u8')"> <span class="front">SCTV 15</span> </button>

## HTV - HTVC
HTV

<button class="pushable" onclick="loadVideo('https://epg.pw/stream/1007d830565e93f89444e5b52302ed2d24506870d46b060143ba0d47cbf66900.ctv')"> <span class="front">HTV 1</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8')"> <span class="front">HTV 2</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8')"> <span class="front">HTV 3</span> </button>
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/htv7-hd/playlist.m3u8')"> <span class="front">HTV 7</span> </button>

HTVC

<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHIM-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Phim</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PLUS-HD-1080p/playlist.m3u8')"> <span class="front">HTV Plus</span> </button>
<button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-THUANVIET-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Thuan Viet</span> </button>

## Khoa hoc - Doi song
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/discovery/playlist.m3u8')"> <span class="front">Discovery</span> </button>

## Dia Phuong
Song Cuu Long

<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl1-hd/playlist.m3u8')"> <span class="front">Vinh Long 1</span> </button>
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl2-hd/playlist.m3u8')"> <span class="front">Vinh Long 2</span> </button>
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl3-hd/playlist.m3u8')"> <span class="front">Vinh Long 3</span> </button>
<button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl4-hd/playlist.m3u8')"> <span class="front">Vinh Long 4</span> </button>

Nam Trung Bo

<button class="pushable" onclick="loadVideo('http://113.161.4.48:8080/phuyen/tv/index.m3u8')"> <span class="front">Phu Yen</span> </button>
<button class="pushable" onclick="loadVideo('http://drtdnglive.e49a7c38.cdnviet.com/livedrt1/chunklist.m3u8')"> <span class="front">Da Nang 1</span> </button>
<button class="pushable" onclick="loadVideo('http://drtdnglive.e49a7c38.cdnviet.com/livestream/chunklist.m3u8')"> <span class="front">Da Nang 2</span> </button>

