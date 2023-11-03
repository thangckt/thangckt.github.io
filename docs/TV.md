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
    border-radius: 7px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    margin-bottom: 8px;
  }
  .front {
    display: block;
    border-radius: 7px;
    padding: 4px 8px;
    font-size: 12pt;
    background: #007ACC;     /*  hsl(345deg 100% 47%);  */
    color: white;
    transform: translateY(-4px);
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
  }

  .video-column {
      flex: 2;
      max-width: 800px;  /* Adjust the width as needed */
      position: sticky;
      /* top: 20; */
      /* overflow: hidden; */
  }

  .content-column {
      flex: 1;
      padding-left: 20px;
      /* max-width: 35%; */
      /* max-height: 700px; */
      /* overflow-y: auto; */
      /* position: relative; */
  }
</style>



<script>
    function loadVideo(videoUrl) {
        window.scrollTo(0, 0); // Scroll to the top after loading the video
        var player = videojs('vid1');
        player.src({src: videoUrl, type: 'application/x-mpegURL'});
        player.play();
    };

    // Automatically load and play default video when page loads
    window.addEventListener('load', function() {
        loadVideo('https://ctrl.laotv.la/live/HBO/index.m3u8');
    });


    function loadStream() {
        var videoUrl = document.getElementById("m3u8Link").value;
        if (!videoUrl) {
            alert("Please enter a stream link.");
            return;
        };
        window.scrollTo(0, 0);
        var player = videojs('vid1');
        player.src({src: videoUrl, type: 'application/x-mpegURL'});
        player.play();
    };

    function loadYoutube(videoUrl) {
        window.scrollTo(0, 0);
        var player = videojs('vid1', {"techOrder": ["youtube"], // Use YouTube as the primary playback technology
                                      "sources": [{ "type": "video/youtube", "src": videoUrl }]    });
        player.play();
    }

    // function loadYoutube(videoUrl) {
    //     window.scrollTo(0, 0); // Scroll to the top after loading the video
    //     var player = videojs('vid1');
    //     player.src({src: videoUrl, type: 'application/vnd.youtube.yt'});
    //     player.play();
    // };

</script>



<div class="container">
<!-- First Column: Video Frame -->
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video-js id="vid1" class="vjs-default-skin" controls preload="none" autoplay style="width:100%;height:100%;left:0px;top:0px;position:absolute;" ></video-js>
  </div>

  <!-- <h3>Stream link</h3> -->
  <br>
  <!-- <label for="m3u8Link">Stream Link: </label> -->
  <button class="pushable" onclick="loadStream()"> <span class="front">Stream Link</span> </button> &nbsp
  <input type="text" id="m3u8Link" style="width: 650px;">
</div>

<!-- Second Column: Other Content - ADD LINK FOR CHANNEL-->
<div class="content-column" >
  <h3>News</h3>
  <button class="pushable" onclick="loadVideo('https://qnetlive.nethubtv.vn/live/dw.smil/chunklist_b1628000_sleng.m3u8')"> <span class="front">DW</span> </button>
  <button class="pushable" onclick="loadVideo('https://fox-foxnewsnow-samsungus.amagi.tv/playlist.m3u8')"> <span class="front">FOX</span> </button>
  <button class="pushable" onclick="loadVideo('https://d30x5vsa85tvmd.cloudfront.net/index_5.m3u8')"> <span class="front">CNN</span> </button>
  <button class="pushable" onclick="loadVideo('https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8')"> <span class="front">CNA</span> </button>
  <button class="pushable" onclick="loadVideo('https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8')"> <span class="front">CBS</span> </button>
  <button class="pushable" onclick="loadVideo('https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8')"> <span class="front">ABC Au</span> </button>
  <button class="pushable" onclick="loadVideo('https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8')"> <span class="front">ABC Us</span> </button>
  <button class="pushable" onclick="loadVideo('https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8')"> <span class="front">EURO</span> </button>
  <button class="pushable" onclick="loadVideo('https://tv-trtworld.live.trt.com.tr/master_720.m3u8')"> <span class="front">TRT World</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8')"> <span class="front">France 24</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/oan_720p/playlist.m3u8')"> <span class="front">OAN</span> </button>




  <h3>Discovery - Documentary</h3>
  <button class="pushable" onclick="loadVideo('https://hncfree-samsungau.amagi.tv/playlist.m3u8')"> <span class="front">Horse&Country</span> </button>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/XZ7BWbmvi94?si=XodlRK7c3EWvfsjI')"> <span class="front">Nat Geo WILD (YT)</span> </button>
    <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/gsA3-3_Cl8s?si=-5BQZ6dnbWdBcQjT')"> <span class="front">Nat Geo (YT)</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadVideo('https://smithsonianaus-samsungau.amagi.tv/playlist1080p.m3u8?cc')"> <span class="front">Smithsonian</span> </button>
  <button class="pushable" onclick="loadVideo('https://rt-rtd.rttv.com/dvr/rtdoc/playlist_4500Kb.m3u8')"> <span class="front">RT Doc</span> </button>
  <button class="pushable" onclick="loadVideo('https://livedoc.cgtn.com/1000d/prog_index.m3u8')"> <span class="front">CGTN Doc</span> </button>
  <button class="pushable" onclick="loadVideo('https://lds-realstories-samsungau.amagi.tv/playlist.m3u8')"> <span class="front">Real Story</span> </button>





  <h3>Movies</h3>
  <button class="pushable" onclick="loadVideo('https://ctrl.laotv.la/live/HBO/index.m3u8')"> <span class="front">HBO</span> </button>
  <button class="pushable" onclick="loadVideo('https://ctrl.laotv.la/live/Cinemax/index.m3u8')"> <span class="front">Cinemax</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8')"> <span class="front">Sony</span> </button>

  <button class="pushable" onclick="loadVideo('https://wms4-kortv.akamaized.net/a_live/63719963/smil:20ch011.smil/chunklist_b2500000.m3u8')"> <span class="front">KBS World</span> </button>




 <h3>Music</h3>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/2gO1v2GPMFk?si=XGS3b_ygBc9LGMsA')"> <span class="front">Classic 1 (YT)</span> </button>
    <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/tSlOlKRuudU?si=Xa46YFg2UqwvFE5P')"> <span class="front">Classic 2 (YT)</span> </button>



<h3>Vietnamese Channels</h3>

 <button class="pushable" onclick="loadVideo('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button>

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
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-GIADINH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Gia Dinh</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHUNU-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Phu Nu</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-CANHAC-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Ca Nhac</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-DULICH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Du Lich & Cuoc Song</span> </button>

<h3>VTV - VTC</h3>
<button class="pushable" onclick="loadVideo('https://edge1.laotv.la/live/VTV1HD/index.m3u8')"> <span class="front">VTV 1</span> </button>
<button class="pushable" onclick="loadVideo('https://edge1.laotv.la/live/VTV3/index.m3u8')"> <span class="front">VTV 3</span> </button>
<button class="pushable" onclick="loadVideo('https://liveh12.vtvcab.vn/hls/ONVTV5_CL/04.m3u8')"> <span class="front">VTV 5</span> </button>
<button class="pushable" onclick="loadVideo('https://liveh12.vtvcab.vn/hls/ONVTV5TNB_CL/04.m3u8')"> <span class="front">VTV 5 Tay Nam Bo</span> </button>

<br> <br>
<button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC6/playlist.m3u8')"> <span class="front">VTC 6</span> </button>



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


