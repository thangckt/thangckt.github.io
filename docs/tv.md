---
hide:
  - toc
  - navigation
  - footer
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


<!-- Load libs -->
<!-- <script src="https://www.unpkg.com/browse/videojs-hls-quality-selector@1.1.4/dist/videojs-hls-quality-selector.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-quality-levels/4.0.0/videojs-contrib-quality-levels.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/youtube-video-js@4.0.1/dist/youtube-video.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->



<!-- Load js function from another file <script src="TVonline/script_tv.js"></script> -->
<script>
    // Automatically load and play default video when page loads
    window.addEventListener('load', function () {
        loadVideojs('https://qnetlive.nethubtv.vn/live/dw.smil/chunklist_b1628000_sleng.m3u8');
    });

    function loadVideojs(videoUrl, vidElementID='vid1'){
      window.scrollTo(0, 0); // Scroll to the top after loading the video
      // Change class of video tag
      var player = document.getElementById(vidElementID);
          player.classList.remove("video-js"); // Remove the existing class
          player.classList.add("video-js"); // Add the new class

      var player = videojs(vidElementID);
          // Call plugin here, before load src
          // player.hlsQualitySelector({displayCurrentQuality: true});
          player.src({ src: videoUrl, type: 'application/x-mpegURL' });
          player.play();
    };

    function loadHls(videoUrl, vidElementID='vid1'){
      window.scrollTo(0, 0); // Scroll to the top after loading the video
      // Change class of video tag
      var player = document.getElementById(vidElementID);
          player.classList.remove("video-js"); // Remove the existing class
          // player.classList.add("video"); // Add the new class

      if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(videoUrl);
          hls.attachMedia(player);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
              player.play();
          });
      } else if (player.canPlayType("application/vnd.apple.mpegurl")) {
          player.src = videoUrl;
          player.addEventListener('canplay', function() {
              player.play();
          });
      }
    };


    function loadStream(vidElementID='vid1', method='videojs') {
        var videoUrl = document.getElementById("m3u8Link").value;
        if (!videoUrl) {
            alert("Please enter a stream link.");
            return;
        };

        if (method === 'hls'){
            loadHls(videoUrl, vidElementID);
        } else if (method === 'videojs'){
            loadVideojs(videoUrl, vidElementID);
        }
    };

    function loadPlayer(videoUrls) {
        if (Array.isArray(videoUrls)) {
            loadMultiLinks(videoUrls);
        } else {
            // Clear existing buttons
            var buttonsContainer = document.getElementById('linkButtons');
            buttonsContainer.innerHTML = '';

            loadVideojs(videoUrls);
        }
    };

    function loadMultiLinks(videoUrls){
        // Clear existing buttons
        var buttonsContainer = document.getElementById('linkButtons');
        buttonsContainer.innerHTML = '';

        // Loop through the array and create buttons for each link
        videoUrls.forEach(function (url, index) {
            var button = document.createElement('button');
            button.className = 'pushable';
            button.innerHTML = '<span class="front">Link ' + (index + 1) + '</span>';
            button.onclick = function () {
                loadVideojs(url,"vid1");
            };

            buttonsContainer.appendChild(button);
        });

        // Load the first video from the array
        loadVideojs(videoUrls[0]);
    };
</script>





<div class="container">
<!-- First Column: Video Frame  class="video-js" -->
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js" controls preload="none" autoplay style="position:absolute; width:100%; height:100%; left:0px; top:0px;" ></video>
  </div>

  <!-- New element for displaying dynamic buttons -->
  <div id="linkButtons" style="display:flex; justify-content:center; margin-top:20px; gap:5px;"></div>

  <!-- <h3>Stream link</h3> -->
  <!-- <label for="m3u8Link">Stream Link: </label> -->
  <button class="pushable" onclick="loadStream('vid1','videojs')"> <span class="front">Load Stream</span> </button> &nbsp
  <input type="text" id="m3u8Link" style="width: 65%" placeholder="Enter your link here...">
  <!-- <button class="pushable" onclick="loadStream('vid1','hls')"> <span class="front">Load HLS</span> </button> -->

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

<!-- Second Column: Other Content - ADD LINK FOR CHANNEL-->
<div class="content-column" >
  <p style="font-size:16pt; margin-top:0; margin-bottom:15">News</p>
  <!-- the right radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <button class="pushable" onclick="loadPlayer('https://fox-foxnewsnow-samsungus.amagi.tv/playlist.m3u8')"> <span class="front">FOX</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/oan_720p/playlist.m3u8')"> <span class="front">OAN</span> </button>
  <button class="pushable" onclick="loadPlayer(['https://ntd02.akamaized.net/NTDA/index.m3u8','https://ntd02.akamaized.net/NTD-West/index.m3u8'])"> <span class="front">NTD</span> </button>
  <button class="pushable" onclick="loadPlayer('https://nmxlive.akamaized.net/hls/live/529965/Live_1/index.m3u8')"> <span class="front">Newsmax</span> </button>

  <!-- the center biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <br><br>
  <button class="pushable" onclick="loadPlayer(['https://ctrl.laotv.la/live/DW/index.m3u8','https://qnetlive.nethubtv.vn/live/dw.smil/chunklist_b1628000_sleng.m3u8','https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8'])"> <span class="front">DW</span> </button>
  <button class="pushable" onclick="loadPlayer('https://reuters-reutersnow-1-us.plex.wurl.tv/playlist.m3u8')"> <span class="front">Reuters</span> </button>
  <button class="pushable" onclick="loadPlayer('https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8')"> <span class="front">EURO</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8')"> <span class="front">France 24</span> </button>
  <button class="pushable" onclick="loadPlayer('https://d7x8z4yuq42qn.cloudfront.net/index_1.m3u8')"> <span class="front">Wion</span> </button>


  <!-- the left radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
  <br><br>
  <button class="pushable" onclick="loadPlayer('https://d30x5vsa85tvmd.cloudfront.net/index_5.m3u8')"> <span class="front">CNN</span> </button>
  <button class="pushable" onclick="loadPlayer('https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8')"> <span class="front">ABC Us</span> </button>
  <button class="pushable" onclick="loadPlayer('https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8')"> <span class="front">ABC Au</span> </button>
  <button class="pushable" onclick="loadPlayer('https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8')"> <span class="front">CNA</span> </button>
  <button class="pushable" onclick="loadPlayer('https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8')"> <span class="front">CBS</span> </button>
  <button class="pushable" onclick="loadPlayer('https://tv-trtworld.live.trt.com.tr/master_720.m3u8')"> <span class="front">TRT World</span> </button>
  <button class="pushable" onclick="loadPlayer('https://yahoo-plex.amagi.tv/playlist.m3u8')"> <span class="front">Yahoo Finance</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/CNBC/index.m3u8')"> <span class="front">CNBC Asia</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/Arirang/index.m3u8')"> <span class="front">Arirang</span> </button>


  <h3>Discovery - Documentary</h3>
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






  <h3>Movies</h3>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/HBO/index.m3u8')"> <span class="front">HBO</span> </button>
  <button class="pushable" onclick="loadPlayer('https://ctrl.laotv.la/live/Cinemax/index.m3u8')"> <span class="front">Cinemax</span> </button>
<button class="pushable" onclick="loadPlayer('https://ucdn.beetv.kz/btv/live/hls/000000239.m3u8')"> <span class="front">CINEMA</span> </button>

  <button class="pushable" onclick="loadPlayer('https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8')"> <span class="front">Sony</span> </button>
  <button class="pushable" onclick="loadPlayer('https://wms4-kortv.akamaized.net/a_live/63719963/smil:20ch011.smil/chunklist_b2500000.m3u8')"> <span class="front">KBS World</span> </button>




 <h3>Music</h3>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/2gO1v2GPMFk?si=XGS3b_ygBc9LGMsA')"> <span class="front">Classic 1 (YT)</span> </button>
  <button class="pushable" onclick="loadYoutube('https://www.youtube.com/live/tSlOlKRuudU?si=Xa46YFg2UqwvFE5P')"> <span class="front">Classic 2 (YT)</span> </button>



<h3>Vietnamese Channels</h3>
  <h3>SCTV</h3>
  <button class="pushable" onclick="loadPlayer('https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8')"> <span class="front">SCTV 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV14.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 14</span> </button>
  <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV17.smil/chunklist_b1692000.m3u8')"> <span class="front">SCTV 17</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadPlayer('https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8')"> <span class="front">Phim Hay</span> </button>
  <button class="pushable" onclick="loadPlayer('https://bcovlive-a.akamaihd.net/07d9c30456d94f3dbbcd39af064fdefa/us-west-2/6314468039001/0914b33308e3498da3b00fe2c050764e/playlist_ssaiM.m3u8')"> <span class="front">TVB Vietnam</span> </button>


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
  <button class="pushable" onclick="loadPlayer('https://1117141481.vnns.net/VTC16/playlist.m3u8')"> <span class="front">VTC 16</span> </button>

  <br> <br>
  <button class="pushable" onclick="loadPlayer('https://e7.endpoint.cdn.sctvonline.vn/live/smil:VTVCAB16.smil/chunklist_w2005840737_b1692000.m3u8')"> <span class="front">VTVCab 16</span> </button>

<br> <br>
  <button class="pushable" onclick="loadPlayer('https://edge1.laotv.la/live/VTV1HD/index.m3u8')"> <span class="front">VTV 1</span> </button>
  <button class="pushable" onclick="loadPlayer('https://edge1.laotv.la/live/VTV3/index.m3u8')"> <span class="front">VTV 3</span> </button>
  <button class="pushable" onclick="loadPlayer('https://liveh12.vtvcab.vn/hls/ONVTV5_CL/04.m3u8')"> <span class="front">VTV 5</span> </button>
  <button class="pushable" onclick="loadPlayer('https://liveh12.vtvcab.vn/hls/ONVTV5TNB_CL/04.m3u8')"> <span class="front">VTV 5 Tay Nam Bo</span> </button>



  <h3>Dia Phuong</h3>
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


</div>
</div>

#


