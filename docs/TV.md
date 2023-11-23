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

<!-- Load libs -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script>
<script src="https://www.unpkg.com/browse/videojs-hls-quality-selector@1.1.4/dist/videojs-hls-quality-selector.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-quality-levels/4.0.0/videojs-contrib-quality-levels.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/youtube-video-js@4.0.1/dist/youtube-video.min.js"></script> -->


<!-- Load js function from another file <script src="TVonline/script_tv.js"></script> -->
<script>
function loadVideo(videoUrl) {
    // if (Array.isArray(videoUrls)) {
    //     var videoUrl = videoUrls[0]
    // } else {
    //     var videoUrl = videoUrls
    // }
    window.scrollTo(0, 0); // Scroll to the top after loading the video
    // set_class('vid1','video-js');
    var player = videojs('vid1');
    // Call plugin here, before load src
    // player.hlsQualitySelector({displayCurrentQuality: true});
    player.src({ src: videoUrl, type: 'application/x-mpegURL' });
    player.play();
};


// Automatically load and play default video when page loads
window.addEventListener('load', function () {
    loadVideo('https://ctrl.laotv.la/live/HBO/index.m3u8');
});


function loadStream() {
    var videoUrl = document.getElementById("m3u8Link").value;
    if (!videoUrl) {
        alert("Please enter a stream link.");
        return;
    };

    window.scrollTo(0, 0);
    // set_class('vid1','video-js');
    var player = videojs('vid1');
    player.src({ src: videoUrl, type: 'application/x-mpegURL' });
    player.play();
};


function loadYoutube(videoUrl) {
    window.scrollTo(0, 0);
    replaceVideoElement("vid1", "iframe")           // use iframe to play youtube
    var video = document.getElementById("vid1");     // Get the video element
    video.setAttribute('src', videoUrl); // Replace with your actual video URL
}



function loadHLS(videoUrl) {    // or name as: loadHLS
    window.scrollTo(0, 0);
    set_class('vid1', ' ');
    var video = document.getElementById('vid1');
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.addEventListener('canplay', function () {
            video.play();
        });
    }
}


function set_class(my_id, my_class=' '){
    document.getElementById(my_id).className = my_class;
  }


    function replaceVideoElement(vidId, targetType) {
      var videoElement = document.getElementById(vidId);     // Get the video element
      var parentDiv = videoElement.parentElement;             // Get the parent div
      // Check if the current element is of the same type
      if ((targetType === 'video' && videoElement.tagName.toLowerCase() === 'video') ||
          (targetType === 'iframe' && videoElement.tagName.toLowerCase() === 'iframe')) {
        // If it's the same type, do nothing
        return;
      }

      // Create an element based on the targetType
      var newElement;
      if (targetType === 'video') {
        newElement = document.createElement('video');
        newElement.setAttribute('class', 'video-js');
        newElement.setAttribute('controls', 'controls');
        newElement.setAttribute('preload', 'none');
        newElement.setAttribute('autoplay', 'autoplay');
      } else if (targetType === 'iframe') {
        newElement = document.createElement('iframe');
        newElement.setAttribute('width', '100%');
        newElement.setAttribute('height', '100%');
        newElement.setAttribute('frameborder', '0');
        newElement.setAttribute('allowfullscreen', 'true');
      }

      // Replace the current element with the new one
      parentDiv.replaceChild(newElement, videoElement);
    }

</script>





<div class="container">
<!-- First Column: Video Frame  class="video-js" -->
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js" controls preload="none" autoplay style="width:100%;height:100%;left:0px;top:0px;position:absolute;" ></video>
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
  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/oan_720p/playlist.m3u8')"> <span class="front">OAN</span> </button>
  <button class="pushable" onclick="loadVideo('https://d30x5vsa85tvmd.cloudfront.net/index_5.m3u8')"> <span class="front">CNN</span> </button>
  <button class="pushable" onclick="loadVideo('https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8')"> <span class="front">CNA</span> </button>
  <button class="pushable" onclick="loadVideo('https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8')"> <span class="front">CBS</span> </button>
  <button class="pushable" onclick="loadVideo('https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8')"> <span class="front">ABC Au</span> </button>
  <button class="pushable" onclick="loadVideo('https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8')"> <span class="front">ABC Us</span> </button>
  <button class="pushable" onclick="loadVideo('https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8')"> <span class="front">EURO</span> </button>
  <button class="pushable" onclick="loadVideo('https://tv-trtworld.live.trt.com.tr/master_720.m3u8')"> <span class="front">TRT World</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8')"> <span class="front">France 24</span> </button>
  <button class="pushable" onclick="loadVideo('https://reuters-reutersnow-1-us.plex.wurl.tv/playlist.m3u8')"> <span class="front">Reuters</span> </button>
  <button class="pushable" onclick="loadVideo('https://yahoo-plex.amagi.tv/playlist.m3u8')"> <span class="front">Yahoo Finance</span> </button>
  <button class="pushable" onclick="loadVideo('https://ctrl.laotv.la/live/Arirang/index.m3u8')"> <span class="front">Arirang</span> </button>
  <button class="pushable" onclick="loadVideo('https://ctrl.laotv.la/live/CNBC/index.m3u8')"> <span class="front">CNBC Asia</span> </button>


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
<button class="pushable" onclick="loadVideo('https://ucdn.beetv.kz/btv/live/hls/000000239.m3u8')"> <span class="front">CINEMA</span> </button>

  <button class="pushable" onclick="loadVideo('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8')"> <span class="front">Sony</span> </button>
  <button class="pushable" onclick="loadVideo('https://wms4-kortv.akamaized.net/a_live/63719963/smil:20ch011.smil/chunklist_b2500000.m3u8')"> <span class="front">KBS World</span> </button>




 <h3>Music</h3>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/2gO1v2GPMFk?si=XGS3b_ygBc9LGMsA')"> <span class="front">Classic 1 (YT)</span> </button>
    <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/tSlOlKRuudU?si=Xa46YFg2UqwvFE5P')"> <span class="front">Classic 2 (YT)</span> </button>



<h3>Vietnamese Channels</h3>

 <button class="pushable" onclick="loadVideo('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button>

  <h3>SCTV</h3>
  <button class="pushable" onclick="loadHLS('https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8')"> <span class="front">SCTV 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV14.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 14</span> </button>
<button class="pushable" onclick="loadVideo('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV17.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 17</span> </button>



  <h3>HTV - HTVC</h3>
  <button class="pushable" onclick="loadVideo('https://vodcdn.hplus.com.vn/htvonline/_definst_/y9s1tlmt8a/Bau.trang.HTV.Challenge.cup.2023.mp4/chunklist.m3u8')"> <span class="front">HTV 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://vodcdn.hplus.com.vn/htvonline/_definst_/y9s1tlmt8a/Bau.trang.HTV.Challenge.cup.2023.mp4/chunklist.m3u8')"> <span class="front">HTV 2</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8')"> <span class="front">HTV 3</span> </button>
  <button class="pushable" onclick="loadVideo('https://code.vthanhtivi.pw/getlink/vieon/htv7-hd/playlist.m3u8', 'Dalvik/2.1.0')"> <span class="front">HTV 7</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHIM-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Phim</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PLUS-HD-1080p/playlist.m3u8')"> <span class="front">HTV Plus</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-THUANVIET-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Thuan Viet</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-GIADINH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Gia Dinh</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHUNU-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Phu Nu</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-CANHAC-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Ca Nhac</span> </button>
  <button class="pushable" onclick="loadVideo('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-DULICH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Du Lich & Cuoc Song</span> </button>

<h3>VTV - VTC</h3>

  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC1/playlist.m3u8')"> <span class="front">VTC 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC2/playlist.m3u8')"> <span class="front">VTC 2</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC3/playlist.m3u8')"> <span class="front">VTC 3</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC4/playlist.m3u8')"> <span class="front">VTC 4</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC5/playlist.m3u8')"> <span class="front">VTC 5</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC6/playlist.m3u8')"> <span class="front">VTC 6</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC7/playlist.m3u8')"> <span class="front">VTC 7</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC8/playlist.m3u8')"> <span class="front">VTC 8</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC9/playlist.m3u8')"> <span class="front">VTC 9</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC10/playlist.m3u8')"> <span class="front">VTC 10</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC11/playlist.m3u8')"> <span class="front">VTC 11</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC12/playlist.m3u8')"> <span class="front">VTC 12</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC13/playlist.m3u8')"> <span class="front">VTC 13</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC14/playlist.m3u8')"> <span class="front">VTC 14</span> </button>
  <button class="pushable" onclick="loadVideo('https://1117141481.vnns.net/VTC16/playlist.m3u8')"> <span class="front">VTC 16</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadVideo('https://e7.endpoint.cdn.sctvonline.vn/live/smil:VTVCAB16.smil/chunklist_w2005840737_b1692000.m3u8')"> <span class="front">VTVCab 16</span> </button>

<br> <br>
  <button class="pushable" onclick="loadVideo('https://edge1.laotv.la/live/VTV1HD/index.m3u8')"> <span class="front">VTV 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://edge1.laotv.la/live/VTV3/index.m3u8')"> <span class="front">VTV 3</span> </button>
  <button class="pushable" onclick="loadVideo('https://liveh12.vtvcab.vn/hls/ONVTV5_CL/04.m3u8')"> <span class="front">VTV 5</span> </button>
  <button class="pushable" onclick="loadVideo('https://liveh12.vtvcab.vn/hls/ONVTV5TNB_CL/04.m3u8')"> <span class="front">VTV 5 Tay Nam Bo</span> </button>



  <h3>Dia Phuong</h3>
  <button class="pushable" onclick="loadVideo('https://media.streambrothers.com:1936/8228/8228/playlist.m3u8')"> <span class="front">Little Saigon</span> </button>
  <button class="pushable" onclick="loadVideo('https://5dcabf026b188.streamlock.net/SET22/livestream/playlist.m3u8')"> <span class="front">SET TV 2</span> </button>
  <button class="pushable" onclick="loadVideo('https://bcovlive-a.akamaihd.net/07d9c30456d94f3dbbcd39af064fdefa/us-west-2/6314468039001/0914b33308e3498da3b00fe2c050764e/playlist_ssaiM.m3u8')"> <span class="front">TVB Vietnam</span> </button>
<br> <br>


  <!-- <h4>Song Cuu Long</h4> -->
  <button class="pushable" onclick="loadVideo('https://live.canthotv.vn/live/tv/chunklist.m3u8')"> <span class="front">Can Tho</span> </button>
  <button class="pushable" onclick="loadVideo('https://60acee235f4d5.streamlock.net/THTV/travinhtv/playlist.m3u8')"> <span class="front">Tra Vinh 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://618b88f69e53b.streamlock.net/THTV2/travinhtv2/playlist.m3u8')"> <span class="front">Tra Vinh 2</span> </button>
<br> <br>

  <!-- <h4>Dong Nam Bo</h4> -->
  <button class="pushable" onclick="loadVideo('https://cdn.baobinhphuoc.com.vn/live/28550d6213460634105b0bae21016f68bce/playlist.m3u8')"> <span class="front">Binh Phuoc 2</span> </button>
<br> <br>

  <!-- <h4>Tay Nguyen</h4> -->
  <button class="pushable" onclick="loadVideo('https://ngvauezm51liv.vcdn.cloud/live/smil:daknong.smil/chunklist_b3128000_sleng.m3u8')"> <span class="front">Dak Lak</span> </button>
<br> <br>

  <!-- <h4>Nam Trung Bo</h4> -->
  <button class="pushable" onclick="loadVideo('https://60acee235f4d5.streamlock.net/live/mystream/playlist.m3u8')"> <span class="front">Ninh Thuan</span> </button>
<br> <br>

  <!-- <h4>Bac Trung Bo</h4> -->
  <button class="pushable" onclick="loadVideo('https://wse.hatinhtv.net/live/httv1/playlist.m3u8')"> <span class="front">Ha Tinh</span> </button>
<br> <br>


  <!-- <h4>Dong Bang Song Hong</h4> -->
  <button class="pushable" onclick="loadVideo('https://cecex9g5cpliv.vcdn.cloud/capture/smil:HN1.smil/chunklist_b3128000_slen.m3u8')"> <span class="front">Ha Noi 1</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.hanamtv.vn/live/285361fcafcd0ec47bba2fa3f5870f8dc72/chunklist.m3u8')"> <span class="front">Ha Nam</span> </button>
  <button class="pushable" onclick="loadVideo('https://cdn.hungyentv.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8')"> <span class="front">Hung Yen</span> </button>
  <button class="pushable" onclick="loadVideo('https://ott3.nethubtv.vn/live/namdinh/chunklist_1.m3u8')"> <span class="front">Nam Dinh</span> </button>
  <button class="pushable" onclick="loadVideo('https://ott3.nethubtv.vn/live/thaibinh/chunklist_1.m3u8')"> <span class="front">Thai Binh</span> </button>
  <button class="pushable" onclick="loadVideo('https://live.mediatech.vn/live/28597f8fd7ea5064d0f84ab00b3699dfd86/playlist.m3u8')"> <span class="front">Ninh Binh</span> </button>
<br> <br>

  <!-- <h4>Dong Bac Bo</h4> -->
  <button class="pushable" onclick="loadVideo('https://live.tuyenquangtv.vn/hls/ttv.m3u8')"> <span class="front">Tuyen Quang</span> </button>
  <button class="pushable" onclick="loadVideo('https://streaming.thainguyentv.vn/hls/livestream.m3u8')"> <span class="front">Thai Nguyen</span> </button>
  <button class="pushable" onclick="loadVideo('https://stream.langsontv.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8')"> <span class="front">Lang Son</span> </button>
  <button class="pushable" onclick="loadVideo('https://ott3.nethubtv.vn/live/bacgiangtv/chunklist_1.m3u8')"> <span class="front">Bac Giang</span> </button>
<br> <br>








</div>
</div>

#


