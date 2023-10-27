---
hide:
  - toc
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
    background: #007ACC;     /*  hsl(345deg 100% 47%);  */
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
      /* display: flex; */
      flex: initial;
  }

  .video-column {
      flex: 2;
      max-width: 800px;  /* Adjust the width as needed */
      position: sticky;
      top: 20;
  }

  .content-column {
      flex: 1;
      padding-left: 20px;
      /* max-width: 35%; */
      /* max-height: 700px; */
      overflow-y: auto;
      position: relative;
  }
</style>


<script>
    function loadVideo(videoUrl) {
        // window.scrollTo(0, 0); // Scroll to the top after loading the video
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
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js vjs-default-skin" controls preload="none" autoplay style="width:100%;height:100%;left:0px;top:0px;position:absolute;" ></video>
  </div>
</div>
<!-- Second Column: Other Content -->
<div class="content-column" >
  <!-- ADD LINK FOR CHANNEL -->
  <h3>Tin Tuc</h3>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/dw-hd/playlist.m3u8')"> <span class="front">DW</span> </button>

  <h3>Kenh Phim</h3>
  <button class="pushable" onclick="loadVideo('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/hbo/playlist.m3u8')"> <span class="front">HBO Asia</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/cinemax/playlist.m3u8')"> <span class="front">Cinemax</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/axn/playlist.m3u8')"> <span class="front">AXN</span> </button>

  <h3>SCTV</h3>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8')"> <span class="front">SCTV 1</span> </button>
  <button class="pushable" onclick="loadVideo('')"> <span class="front">SCTV 14</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/sctvonline/sctv15/playlist.m3u8')"> <span class="front">SCTV 15</span> </button>

  <h3>HTV - HTVC</h3>
  <button class="pushable" onclick="loadVideo('https://epg.pw/stream/1007d830565e93f89444e5b52302ed2d24506870d46b060143ba0d47cbf66900.ctv')"> <span class="front">HTV 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8')"> <span class="front">HTV 2</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8')"> <span class="front">HTV 3</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/htv7-hd/playlist.m3u8')"> <span class="front">HTV 7</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHIM-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Phim</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PLUS-HD-1080p/playlist.m3u8')"> <span class="front">HTV Plus</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-THUANVIET-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Thuan Viet</span> </button>

  <h3>Khoa hoc - Doi song</h3>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/tvfree/discovery/playlist.m3u8')"> <span class="front">Discovery</span> </button>

  <h3>Dia Phuong</h3>
  <h4>Song Cuu Long</h4>

  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl1-hd/playlist.m3u8')"> <span class="front">Vinh Long 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl2-hd/playlist.m3u8')"> <span class="front">Vinh Long 2</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl3-hd/playlist.m3u8')"> <span class="front">Vinh Long 3</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/thvl4-hd/playlist.m3u8')"> <span class="front">Vinh Long 4</span> </button>

  <h4>Nam Trung Bo</h4>

  <button class="pushable" onclick="loadVideo('http://113.161.4.48:8080/phuyen/tv/index.m3u8')"> <span class="front">Phu Yen</span> </button>
  <button class="pushable" onclick="loadVideo('http://drtdnglive.e49a7c38.cdnviet.com/livedrt1/chunklist.m3u8')"> <span class="front">Da Nang 1</span> </button>
  <button class="pushable" onclick="loadVideo('http://drtdnglive.e49a7c38.cdnviet.com/livestream/chunklist.m3u8')"> <span class="front">Da Nang 2</span> </button>

</div>
</div>

#


