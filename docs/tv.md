---
hide:
  - toc
  - navigation
  - footer
---

<!-- SOME NOTE:
- Use botton style: https://www.joshwcomeau.com/animation/3d-button/#a-hover-state-4
- Do not need to use Hls, since Videojs may already include it
- May save js functions in a separated file, and load them by <script src="TVonline/script_tv.js"></script>. But not check?
- find more m3u8 links at: http://tonkiang.us/
-->


<style>
  .pushable {
    background: skyblue; /* Changed button color to sky blue */
    /* background: hsl(340deg 100% 32%); */
    border-radius: 7px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    /* margin-bottom: 8px; */
    margin-top: 8px; /* Add space at the top */
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
      flex-wrap: nowrap;
  }

  .video-column {
      width: 80%;
      padding-right: 25px;
      position: sticky;
  }

  .content-column {
      max-height: 85vh;
      overflow-y: auto;
      position: relative;
  }

    /* Mobile styles */
    @media screen and (max-width:600px) {
      .container {
        flex-wrap: wrap;
      }

      .video-column {
        width: 100%;
        padding-right: 0px;
      }

      .content-column {
        width: 100%;
        max-height: 35vh;
      }
    }

  /* hide edit button */
  .md-typeset h1,
  .md-content__button {
    display: none;
  }
</style>


<!-- LOAD LIBS -->
<!-- <script src="https://www.unpkg.com/browse/videojs-hls-quality-selector@1.1.4/dist/videojs-hls-quality-selector.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-quality-levels/4.0.0/videojs-contrib-quality-levels.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/youtube-video-js@4.0.1/dist/youtube-video.min.js"></script> -->
<!-- <script src="https://unpkg.com/browse/@videojs/http-streaming@3.11.1/dist/videojs-http-streaming.min.js"></script> -->

<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script> -->


<!-- DEFINE SCRIPT JS -->
<script>
    // Automatically load and play default video when page loads
    window.addEventListener('load', function () {
        playVideojs('https://i.mjh.nz/SamsungTVPlus/USBB52000022Q.m3u8');
    });


    //##### Functions to play video, use Videojs or Hls
    function playVideojs(videoURL, vidElementID='vid1'){
      window.scrollTo(0, 0); // Scroll to the top after loading the video
      // Change class of video tag
      var playerElement = document.getElementById(vidElementID);
      if (!playerElement.classList.contains("video-js")) { // Check if the class does not exist
         playerElement.classList.add("video-js"); // Add the new class
      }

      var player = videojs(vidElementID);
      // Call plugin here, before load src
      // player.hlsQualitySelector({displayCurrentQuality: true});
      player.src({ src: videoURL, type: 'application/x-mpegURL' });
      player.play();
    };

    function playHls(videoURL, vidElementID='vid1'){
      window.scrollTo(0, 0); // Scroll to the top after loading the video
      // Change class of video tag
      var playerElement = document.getElementById(vidElementID);
      if (playerElement.classList.contains("video-js")) { // Check if the class exists
          playerElement.classList.remove("video-js"); // Remove the existing class
      }

      var player = document.getElementById(vidElementID);
      if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoURL);
          hls.attachMedia(player);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
              player.play();
          });
      } else if (player.canPlayType("application/vnd.apple.mpegurl")) {
          player.src = videoURL;
          player.addEventListener('canplay', function() {
              player.play();
          });
      }
    };


    //##### Implementation: first tries to play the link using playVideojs(), and if that fails, then use playHls(). But this may not need, since Videojs also has Hls
    // function playVideoLink(videoURL, vidElementID='vid1') {
    // var playerElement = document.getElementById(vidElementID);

    // playerElement.addEventListener('error', function() {
    //     console.log('playVideojs failed, trying playHls');
    //     playHls(videoURL, vidElementID);
    // }, { once: true });

    // playVideojs(videoURL, vidElementID);
    // }


    //##### Functions to load videos to HTML video tag
    function loadStream(vidElementID='vid1', method='videojs') {
        var videoURL = document.getElementById("m3u8Link").value;
        if (!videoURL) {
            alert("Please enter a stream link.");
            return;
        };
        // playVideoLink(videoURL, vidElementID);

        if (method === 'hls'){
            playHls(videoURL, vidElementID);
        } else if (method === 'videojs'){
            playVideojs(videoURL, vidElementID);
        }
    };

      function loadPlayer(videoURLs, buttElementID='linkButton') {
          var videoURL;
          if (Array.isArray(videoURLs)) {
              if (videoURLs.length > 1) {
                  createLinkButton(videoURLs, buttElementID);
              }
              videoURL = videoURLs[0];
          } else {
              // Clean existing buttons
              var buttonsContainer = document.getElementById(buttElementID);
              buttonsContainer.innerHTML = '';
              videoURL = videoURLs;
          }
          playVideojs(videoURL);
      };


    //##### Functions to create link buttons below video frame
    function createLinkButton(videoURLs, buttElementID='linkButton'){
        // Clean existing buttons: this clean any existed button at the container with ID=ElementID
        var buttonsContainer = document.getElementById(buttElementID);
        buttonsContainer.innerHTML = '';

        // Loop through the array and create buttons for each link
        videoURLs.forEach(function (url, index) {
            var button = document.createElement('button');
            button.className = 'pushable';
            button.innerHTML = '<span class="front">Link ' + (index + 1) + '</span>';
            button.onclick = function () {
                playVideojs(url);
            };

            buttonsContainer.appendChild(button);
        });
    };
</script>






<div class="container">
<!-- FIRST COLUMN: VIDEO FRAME,  class="video-js" -->
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1"  controls preload="none" autoplay style="position:absolute; width:100%; height:100%; left:0px; top:0px;" ></video>
  </div>

  <!-- container for displaying dynamic buttons -->
  <div id='linkButton' style="display:flex; justify-content:center; margin-top:20px; gap:5px;"></div>


<!-- google ads -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6260920536615462" crossorigin="anonymous"></script>
<!-- Homepage Leaderboard -->
<br>
<!-- <ins class="adsbygoogle"
style="display:inline-block;width:728px;height:90px"
data-ad-client="ca-pub-6260920536615462"
data-ad-slot="1234567890"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script> -->

</div>




<!-- SECOND COLUMN: BUTTONS - ADD LINK FOR CHANNEL-->
<div class="content-column" >

<!-- <h3>Stream link</h3> -->
  <!-- <label for="m3u8Link">Stream Link: </label> -->
  <button class="pushable" onclick="loadStream()"> <span class="front">Load URL</span> </button> &nbsp
  <input type="text" id="m3u8Link" style="width: 70%" placeholder="Enter your link here...">
  <!-- <button class="pushable" onclick="loadStream('vid1','hls')"> <span class="front">Load HLS</span> </button> -->


<!-- <p style="font-size:16pt; margin-top:0; margin-bottom:15">News</p> -->
<h3>News - US</h3>
  <!-- the right radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <button class="pushable" onclick="loadPlayer(['https://fox-foxnewsnow-samsungus.amagi.tv/playlist720p.m3u8','https://fox-foxnewsnow-samsungus.amagi.tv/playlist.m3u8'])"> <span class="front">FOX</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/oan_720p/playlist.m3u8')"> <span class="front">OAN</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://ntd02.akamaized.net/NTDA/index.m3u8','https://ntd02.akamaized.net/NTD-West/index.m3u8'])"> <span class="front">NTD</span> </button>
  <button class="pushable" onclick="loadPlayer('https://newsmax-samsungus.amagi.tv/playlist.m3u8')"> <span class="front">Newsmax</span> </button>


  <br><br>
  <!-- the center biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <button class="pushable" onclick="loadPlayer('https://reuters-reutersnow-1-us.plex.wurl.tv/playlist.m3u8')"> <span class="front">Reuters</span> </button>

  <button class="pushable" onclick="loadPlayer('https://d7x8z4yuq42qn.cloudfront.net/index_1.m3u8')"> <span class="front">Wion</span> </button>


  <br><br>
  <!-- the left radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/INBD1300022TS.m3u8'])"> <span class="front">CNN</span> </button>
  <button class="pushable" onclick="loadPlayer('https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8')"> <span class="front">ABC Us</span> </button>
  <button class="pushable" onclick="loadPlayer('https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8')"> <span class="front">CNA</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8')"> <span class="front">CBS</span> </button>
  <button class="pushable" onclick="loadPlayer('https://tv-trtworld.live.trt.com.tr/master_720.m3u8')"> <span class="front">TRT World</span> </button>
  <button class="pushable" onclick="loadPlayer('https://yahoo-plex.amagi.tv/playlist.m3u8')"> <span class="front">Yahoo Finance</span> </button>



<h3>News - EU</h3>

  <br><br>
  <button class="pushable" onclick="loadPlayer(['https://ctrl.laotv.la/live/DW/index.m3u8','https://qnetlive.nethubtv.vn/live/dw.smil/chunklist_b1628000_sleng.m3u8','https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8'])"> <span class="front">DW</span> </button>
  <button class="pushable" onclick="loadPlayer('https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8')"> <span class="front">EURO</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8')"> <span class="front">France 24</span> </button>

  <br><br>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USBB52000022Q.m3u8'])"> <span class="front">Sky News</span> </button>


<h3>News - Asia</h3>

  <button class="pushable" onclick="loadPlayer(['https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index.m3u8','https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8','https://ctrl.laotv.la/live/ABCA/index.m3u8'])"> <span class="front">ABC Au</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/Arirang/index.m3u8')"> <span class="front">Arirang</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/CNBC/index.m3u8')"> <span class="front">CNBC Asia</span> </button>
  <button class="pushable" onclick="loadPlayer('https://4da261f13a2445c2a8fada9704df3e17.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-in_Bloomberg/playlist.m3u8')"> <span class="front">Bloomberg Asia</span> </button>



<h3>Documentary</h3>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/CABC2300019UD.m3u8'])"> <span class="front">Documentary+</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://lds-timeline-samsungau.amagi.tv/playlist720-p.m3u8','https://timeline-samsung-uk.amagi.tv/playlist.m3u8'])"> <span class="front">Timeline</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/ATBA1000005P4.m3u8'])"> <span class="front">Travelxp</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://ab96b349d4d14d80a1f8530a0bce4488.mediatailor.us-east-1.amazonaws.com/v1/master/04fd913bb278d8775298c26fdca9d9841f37601f/Samsung-de_BBCTravel/playlist.m3u8?ads.wurl_channel=985&ads.wurl_name=BBCTravel&ads.coppa=0&ads.psid=%7BPSID%7D&ads.targetopt=%7BTARGETOPT%7D&ads.app_domain=%7BAPP_DOMAIN%7D&ads.app_name=%7BAPP_NAME%7D&ads.consent=%7BTC_STRING%7D'])"> <span class="front">BBC Travel</span> </button>




<h3>Discovery</h3>
  <button class="pushable" onclick="loadPlayer('https://i.mjh.nz/SamsungTVPlus/GBBB5000002PL.m3u8')"> <span class="front">Wild Planet</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USBD1700001RW.m3u8'])"> <span class="front">BBC Earth</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USBC600017FG.m3u8'])"> <span class="front">BBC Home</span> </button>

  <button class="pushable" onclick="loadPlayer('https://hncfree-samsungau.amagi.tv/playlist.m3u8')"> <span class="front">Horse&Country</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/AnimalPlanet/index.m3u8')"> <span class="front">Animal Planet</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/Discovery/index.m3u8')"> <span class="front">Discovery Channel SEA</span> </button>

  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/XZ7BWbmvi94?si=XodlRK7c3EWvfsjI')"> <span class="front">Nat Geo WILD (YT)</span> </button>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/watch?v=gsA3-3_Cl8s')"> <span class="front">Nat Geo (YT)</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadPlayer('https://smithsonianaus-samsungau.amagi.tv/playlist1080p.m3u8?cc')"> <span class="front">Smithsonian</span> </button>
  <button class="pushable" onclick="loadPlayer('https://rt-rtd.rttv.com/dvr/rtdoc/playlist_4500Kb.m3u8')"> <span class="front">RT Doc</span> </button>
  <button class="pushable" onclick="loadPlayer('https://livedoc.cgtn.com/1000d/prog_index.m3u8')"> <span class="front">CGTN Doc</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lds-realstories-samsungau.amagi.tv/playlist.m3u8')"> <span class="front">Real Story</span> </button>




<h3>Movie</h3>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/HBO/index.m3u8')"> <span class="front">HBO</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/Cinemax/index.m3u8')"> <span class="front">Cinemax</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ucdn.beetv.kz/btv/live/hls/000000239.m3u8')"> <span class="front">CINEMA</span> </button>

  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8')"> <span class="front">Sony</span> </button>
  <button class="pushable" onclick="loadPlayer('https://wms4-kortv.akamaized.net/a_live/63719963/smil:20ch011.smil/chunklist_b2500000.m3u8')"> <span class="front">KBS World</span> </button>

  <button class="pushable" onclick="loadPlayer('https://minerva-bizzarromovies-1-it.samsung.wurl.tv/playlist.m3u8')"> <span class="front">B4U Movies</span> </button>
  <button class="pushable" onclick="loadPlayer('https://i.mjh.nz/SamsungTVPlus/USBD17000117B.m3u8')"> <span class="front">MovieSphere</span> </button>





<h3>Sport</h3>
  <button class="pushable" onclick="loadPlayer(['https://edgesport-rakuten-samsung.amagi.tv/playlist.m3u8'])"> <span class="front">EdgeSport</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USBD12000255B.m3u8'])"> <span class="front">FIFA+</span> </button>
  <button class="pushable" onclick="loadPlayer('https://edge1.laotv.la/live/BosiGolf/index.m3u8')"> <span class="front">Golf 2</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USAJ3504705A.m3u8'])"> <span class="front">Stadium</span> </button>



<h3>Music</h3>
  <button class="pushable" onclick="loadYoutube(['https://cdnlive.myspirit.tv/LS-ATL-43240-2/index.m3u8','https://cdnlive.myspirit.tv/LS-ATL-43240-2/tracks-v1a1/mono.m3u8'])"> <span class="front">Spirit TV</span> </button>
  <button class="pushable" onclick="loadYoutube(['https://fox-foxsoul-samsungus.amagi.tv/playlist.m3u8'])"> <span class="front">Fox Soul</span> </button>





<h3>Show</h3>
<button class="pushable" onclick="loadPlayer(['https://i.mjh.nz/SamsungTVPlus/USBC6000108Z.m3u8'])"> <span class="front">BBC Food</span> </button>
<button class="pushable" onclick="loadPlayer(['https://younghollywood-rakuten-samsung.amagi.tv/playlist.m3u8'])"> <span class="front">YouTV</span> </button>



<h3>Vietnamese Channels</h3>

  <button class="pushable" onclick="loadPlayer('https://edge2.laotv.la/live/K+Sport1/index.m3u8')"> <span class="front">K+ sport 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://edge1.laotv.la/live/K+Sport2/index.m3u8')"> <span class="front">K+ sport 2</span> </button>

  <br> <br>
  <!-- <button class="pushable" onclick="loadPlayer('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://bcovlive-a.akamaihd.net/07d9c30456d94f3dbbcd39af064fdefa/us-west-2/6314468039001/0914b33308e3498da3b00fe2c050764e/playlist_ssaiM.m3u8')"> <span class="front">TVB Vietnam</span> </button>


  <!-- <h3>SCTV</h3> -->
  <!-- <button class="pushable" onclick="loadPlayer('https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8')"> <span class="front">SCTV 1</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV14.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 14</span> </button>
  <!-- <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV17.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 17</span> </button> -->




  <!-- <h3>HTV - HTVC</h3>
  <button class="pushable" onclick="loadPlayer('https://vodcdn.hplus.com.vn/htvonline/_definst_/y9s1tlmt8a/Bau.trang.HTV.Challenge.cup.2023.mp4/chunklist.m3u8')"> <span class="front">HTV 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://vodcdn.hplus.com.vn/htvonline/_definst_/y9s1tlmt8a/Bau.trang.HTV.Challenge.cup.2023.mp4/chunklist.m3u8')"> <span class="front">HTV 2</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV3-SD-480p/playlist.m3u8')"> <span class="front">HTV 3</span> </button>
  <button class="pushable" onclick="loadPlayer('https://code.vthanhtivi.pw/getlink/vieon/htv7-hd/playlist.m3u8', 'Dalvik/2.1.0')"> <span class="front">HTV 7</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHIM-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Phim</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PLUS-HD-1080p/playlist.m3u8')"> <span class="front">HTV Plus</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-THUANVIET-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Thuan Viet</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-GIADINH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Gia Dinh</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-PHUNU-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Phu Nu</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-CANHAC-HD-1080p/chunks.m3u8')"> <span class="front">HTVC Ca Nhac</span> </button>
  <button class="pushable" onclick="loadPlayer('https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTVC-DULICH-HD-1080p/playlist.m3u8')"> <span class="front">HTVC Du Lich & Cuoc Song</span> </button> -->

<h3>VTV - VTC</h3>
  <button class="pushable" onclick="loadPlayer(['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv1-720p.m3u8','https://edge1.laotv.la/live/VTV1SD/index.m3u8'])"> <span class="front">VTV 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv2-720p.m3u8')"> <span class="front">VTV 2</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv3-720p.m3u8','https://edge1.laotv.la/live/VTV3/index.m3u8'])"> <span class="front">VTV 3</span> </button>

  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv4-720p.m3u8')"> <span class="front">VTV 4</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5-720p.m3u8')"> <span class="front">VTV 5</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5tnb-720p.m3u8')"> <span class="front">VTV 5 Tay Nam Bo</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5tn-720p.m3u8')"> <span class="front">VTV 5 Tay Nguyen</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv7-720p.m3u8')"> <span class="front">VTV 7</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv8-720p.m3u8')"> <span class="front">VTV 8</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv9-720p.m3u8')"> <span class="front">VTV 9</span> </button>
  <button class="pushable" onclick="loadPlayer('https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv6-720p.m3u8')"> <span class="front">VTV Can Tho</span> </button>



<!-- <br> <br>
  <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:VTVCAB16.smil/chunklist_w2005840737_b1692000.m3u8')"> <span class="front">VTVCab 16</span> </button>


<br> <br>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC1/playlist.m3u8')"> <span class="front">VTC 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC2/playlist.m3u8')"> <span class="front">VTC 2</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC3/playlist.m3u8')"> <span class="front">VTC 3</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC4/playlist.m3u8')"> <span class="front">VTC 4</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC5/playlist.m3u8')"> <span class="front">VTC 5</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC6/playlist.m3u8')"> <span class="front">VTC 6</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC7/playlist.m3u8')"> <span class="front">VTC 7</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC8/playlist.m3u8')"> <span class="front">VTC 8</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC9/playlist.m3u8')"> <span class="front">VTC 9</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC10/playlist.m3u8')"> <span class="front">VTC 10</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC11/playlist.m3u8')"> <span class="front">VTC 11</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC12/playlist.m3u8')"> <span class="front">VTC 12</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC13/playlist.m3u8')"> <span class="front">VTC 13</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC14/playlist.m3u8')"> <span class="front">VTC 14</span> </button>
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC16/playlist.m3u8')"> <span class="front">VTC 16</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://live.mediatech.vn/live/285fbc845578c6641d5a4c40534a0d1864b/playlist.m3u8')"> <span class="front">VOV</span> </button>


<h3>Local</h3>
  <!-- <h4>Song Cuu Long</h4> -->
  <button class="pushable" onclick="loadPlayer('https://live.canthotv.vn/live/tv/chunklist.m3u8')"> <span class="front">Can Tho</span> </button>
  <button class="pushable" onclick="loadPlayer('https://60acee235f4d5.streamlock.net/THTV/travinhtv/playlist.m3u8')"> <span class="front">Tra Vinh 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://618b88f69e53b.streamlock.net/THTV2/travinhtv2/playlist.m3u8')"> <span class="front">Tra Vinh 2</span> </button>

<button class="pushable" onclick="loadPlayer('https://60acee235f4d5.streamlock.net/HGTV/d1/playlist.m3u8')"> <span class="front">Hau Giang</span> </button>
<button class="pushable" onclick="loadPlayer('https://618b88f69e53b.streamlock.net/THDT/thdttv/playlist.m3u8')"> <span class="front">Dong Thap 1</span> </button>
<button class="pushable" onclick="loadPlayer('https://64d0d74b76158.streamlock.net/THDT2/thdttv2/playlist.m3u8')"> <span class="front">Dong Thap 2</span> </button>

<br> <br>

<!-- <h4>Dong Nam Bo</h4> -->
  <button class="pushable" onclick="loadPlayer('https://cdn.baobinhphuoc.com.vn/live/28550d6213460634105b0bae21016f68bce/playlist.m3u8')"> <span class="front">Binh Phuoc 2</span> </button>
<br> <br>

<!-- <h4>Tay Nguyen</h4> -->
  <button class="pushable" onclick="loadPlayer('https://live.mediatech.vn/live/285a27750861b964c27af22091662a74f2f/playlist.m3u8')"> <span class="front">Dak Lak</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ngvauezm51liv.vcdn.cloud/live/smil:daknong.smil/chunklist_b3128000_sleng.m3u8')"> <span class="front">Dak Nong</span> </button>
<br> <br>

<!-- <h4>Nam Trung Bo</h4> -->
  <button class="pushable" onclick="loadPlayer('https://60acee235f4d5.streamlock.net/live/mystream/playlist.m3u8')"> <span class="front">Ninh Thuan</span> </button>
  <button class="pushable" onclick="loadPlayer('https://64d0d74b76158.streamlock.net/BTVTV/binhthuantv/chunklist.m3u8')"> <span class="front">Binh Thuan</span> </button>
<br> <br>

<!-- <h4>Bac Trung Bo</h4> -->
  <!-- <button class="pushable" onclick="loadPlayer('')"> <span class="front">Thanh Hoa</span> </button> -->
  <!-- <button class="pushable" onclick="loadPlayer('')"> <span class="front">Nghe An</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://wse.hatinhtv.net/live/httv1/playlist.m3u8')"> <span class="front">Ha Tinh</span> </button>
  <!-- <button class="pushable" onclick="loadPlayer('')"> <span class="front">Quang Binh</span> </button> -->
  <!-- <button class="pushable" onclick="loadPlayer('')"> <span class="front">Quang Tri</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://live.trt.com.vn/TRT-Online/playlist.m3u8')"> <span class="front">Hue</span> </button>
<br> <br>


<!-- <h4>Dong Bang Song Hong</h4> -->
  <button class="pushable" onclick="loadPlayer('https://cecex9g5cpliv.vcdn.cloud/capture/smil:HN1.smil/chunklist_b3128000_slen.m3u8')"> <span class="front">Ha Noi 1</span> </button>
    <button class="pushable" onclick="loadPlayer('https://cecex9g5cpliv.vcdn.cloud/live/smil:HN2.smil/chunklist_b3128000_slen.m3u8')"> <span class="front">Ha Noi 2</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cdn.hanamtv.vn/live/285361fcafcd0ec47bba2fa3f5870f8dc72/chunklist.m3u8')"> <span class="front">Ha Nam</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://cdn.hungyentv.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8','https://live.mediatech.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8'])"> <span class="front">Hung Yen</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ott3.nethubtv.vn/live/namdinh/chunklist_1.m3u8')"> <span class="front">Nam Dinh</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ott3.nethubtv.vn/live/thaibinh/chunklist_1.m3u8')"> <span class="front">Thai Binh</span> </button>
  <button class="pushable" onclick="loadPlayer('https://live.mediatech.vn/live/28597f8fd7ea5064d0f84ab00b3699dfd86/playlist.m3u8')"> <span class="front">Ninh Binh</span> </button>
  <button class="pushable" onclick="loadPlayer('https://stream.thingnet.vn/live/smil:BTV.smil/playlist.m3u8')"> <span class="front">Bac Ninh</span> </button>
  <button class="pushable" onclick="loadPlayer('https://live.mediatech.vn/live/285a4c99665fdf84e94956c66bc7dc7eb5d/chunklist.m3u8')"> <span class="front">Hai Phong</span> </button>
  <button class="pushable" onclick="loadPlayer('https://live.mediatech.vn/live/28548ca35823d41426d8b3da7ed82bdab13/chunklist.m3u8')"> <span class="front">Hai Phong +</span> </button>

<br> <br>

<!-- <h4>Dong Bac</h4> -->
  <button class="pushable" onclick="loadPlayer('https://live.tuyenquangtv.vn/hls/ttv.m3u8')"> <span class="front">Tuyen Quang</span> </button>
  <button class="pushable" onclick="loadPlayer('https://streaming.thainguyentv.vn/hls/livestream.m3u8')"> <span class="front">Thai Nguyen</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://stream.langsontv.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8', 'https://live.mediatech.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8'])"> <span class="front">Lang Son</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ott3.nethubtv.vn/live/bacgiangtv/chunklist_1.m3u8')"> <span class="front">Bac Giang</span> </button>
  <br> <br>

  <!-- <h4>Tay Bac</h4> -->
  <button class="pushable" onclick="loadPlayer('https://hbtvlive.3ssoft.vn/hoabinhtv/playlist.m3u8')"> <span class="front">Hoa Binh</span> </button>
  <!-- <button class="pushable" onclick="loadPlayer('')"> <span class="front">Son La</span> </button>
  <button class="pushable" onclick="loadPlayer('')"> <span class="front">Lai Chau</span> </button> -->
  <button class="pushable" onclick="loadPlayer('https://truyenhinh.vnptvas.vn/live.m3u8?c=vstv362&deviceId=&deviceType=&gcId=1532&location=NA&pkg=pkg11.hni&q=high&requestTime=1586309420781&time=1586395820&token=LX-ibJYRUq9pflRtYAxfYQ&type=tv&userId=')"> <span class="front">Dien Bien</span> </button>

<!-- hai ngoai -->
<br> <br>
  <button class="pushable" onclick="loadPlayer('https://media.streambrothers.com:1936/8228/8228/playlist.m3u8')"> <span class="front">Little Saigon</span> </button>
  <button class="pushable" onclick="loadPlayer('https://5dcab9aed5331.streamlock.net/SET1/livestream/playlist.m3u8')"> <span class="front">SET TV 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://5dcabf026b188.streamlock.net/SET22/livestream/playlist.m3u8')"> <span class="front">SET TV 2</span> </button>



<!-- Visitor -->
<p align="center">
<a href="https://info.flagcounter.com/zg6Y"><img src="https://s01.flagcounter.com/count2/zg6Y/bg_FFFFFF/txt_000000/border_CCCCCC/columns_4/maxflags_20/viewers_3/labels_1/pageviews_0/flags_0/percent_0/" alt="Flag Counter" border="0"></a>
</p>

</div>
</div>



#
