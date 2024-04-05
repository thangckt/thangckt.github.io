---
hide:
  - toc
  - navigation
  - footer
---

<!-- Find more m3u8 links at: http://tonkiang.us/ -->

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
<!-- <script src="https://unpkg.com/browse/@videojs/http-streaming@3.11.1/dist/videojs-http-streaming.min.js"></script> -->

<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1"></script> -->

<!-- for youtube -->
<script src="https://www.youtube.com/iframe_api"></script>
<script src="https://cdn.jsdelivr.net/npm/youtube-video-js@4.0.1/dist/youtube-video.min.js"></script>


<!-- DEFINE SCRIPT JS -->
<script>
    // Automatically load and play default video when the page loads
    window.addEventListener('load', function () {
        playVideojs('https://i.mjh.nz/SamsungTVPlus/USBB52000022Q.m3u8');
    });


    //##### Functions to play video, use only Videojs for simplicity
    function getMimeType(url) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return 'video/youtube';
        }

        var extension = url.split('.').pop();
        switch (extension) {
            case 'm3u8':
                return 'application/x-mpegURL';
            case 'mp4':
                return 'video/mp4';
            case 'webm':
                return 'video/webm';
            // Add more cases as needed
            default:
            return 'application/x-mpegURL';
        }
    }

    function playVideojs(videoURL, vidID='vid1'){
        window.scrollTo(0, 0); // Scroll to the top after loading the video

        var player = videojs(vidID);
        var mimeType = getMimeType(videoURL);

        if(mimeType === 'video/youtube') {
            player.tech({ IWillNotUseThisInPlugins: true });
        }
        player.src({ src: videoURL, type: mimeType });
        player.play();
    };


    //##### Functions to load videos to HTML video tag
    function loadStream(vidID='vid1') {
        var videoURL = document.getElementById("m3u8Link").value;
        if (!videoURL) {
            alert("Please enter a stream link.");
            return;
        };
        playVideojs(videoURL, vidID);
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


    //##### Functions to create link buttons below the video frame
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

    //##### Functions to create channel buttons
    function createChannelButton(videoURLs, buttonText) {
        var button = document.createElement('button');
        button.className = 'pushable';
        button.onclick = function () {
            loadPlayer(videoURLs);
        };
        button.innerHTML = '<span class="front">' + buttonText + '</span>';
        return button;
    }

    function createListChannelButton(listButtons, containerID='content-column') {
        // Get the container for the buttons
        var container = document.getElementById(containerID);
        // Create and append each button
        listButtons.forEach(function (buttonInfo) {
            var button = createChannelButton(buttonInfo.URL, buttonInfo.text);
            button.style.marginRight = "4px"; // Add a margin to the right of the button
            container.appendChild(button);
        });
    }
</script>



<!-- HTML CONTENT -->
<div class="container">
<!-- FIRST COLUMN: VIDEO FRAME,  class="video-js" -->
<div class="video-column" >
  <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js" controls preload="none" autoplay style="position:absolute; width:100%; height:100%; left:0px; top:0px;" ></video>
  </div>

  <!-- container for displaying dynamic buttons -->
  <div id='linkButton' style="display:flex; justify-content:center; margin-top:20px; gap:4px;"></div>


<!-- google ads -->
<!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6260920536615462" crossorigin="anonymous"></script> -->
<!-- Homepage Leaderboard -->
<!-- <br> -->
<!-- <ins class="adsbygoogle"
style="display:inline-block;width:728px;height:90px"
data-ad-client="ca-pub-6260920536615462"
data-ad-slot="1234567890"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script> -->

</div>



<!-- SECOND COLUMN: BUTTONS - ADD LINK FOR CHANNEL-->
<div class="content-column" id="content-column">

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


<!-- the center biases: https://www.allsides.com/media-bias/media-bias-chart -->
<br><br>
<script>
    // Use the script to void repeated creation of buttons line-by-line as in above
    // List of buttons to create
    var listButtons = [
        // {text: 'Reuters', URL: ['https://reuters-reutersnow-1-us.plex.wurl.tv/playlist.m3u8']},
        {text: 'Wion', URL: ['https://d7x8z4yuq42qn.cloudfront.net/index_1.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- the left radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
<br><br>
<script>
    var listButtons = [
        {text: 'CNN', URL: ['https://i.mjh.nz/SamsungTVPlus/INBD1300022TS.m3u8']},
        {text: 'CNN Int.', URL: ['https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8']},
        {text: 'ABC Us', URL: ['https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8']},
        {text: 'CNA', URL: ['https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8']},
        {text: 'CBS', URL: ['https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8']},
        {text: 'TRT World', URL: ['https://tv-trtworld.live.trt.com.tr/master_720.m3u8']},
        {text: 'Yahoo Finance', URL: ['https://yahoo-plex.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>News - EU</h3>
<script>
    var listButtons = [
        {text: 'DW', URL: ['https://ctrl.laotv.la/live/DW/index.m3u8','https://qnetlive.nethubtv.vn/live/dw.smil/chunklist_b1628000_sleng.m3u8','https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8']},
        {text: 'EURO', URL: 'https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8'},
        {text: 'France 24', URL: 'https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8'},
        {text: 'Sky News', URL: ['https://i.mjh.nz/SamsungTVPlus/USBB52000022Q.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>News - Asia</h3>
<script>
    var listButtons = [
        {text: 'ABC Au', URL: ['https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index.m3u8','https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8','https://ctrl.laotv.la/live/ABCA/index.m3u8']},
        {text: 'CNBC Asia', URL: ['https://ctrl.laotv.la/live/CNBC/index.m3u8']},
        {text: 'Bloomberg Asia', URL: ['https://4da261f13a2445c2a8fada9704df3e17.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-in_Bloomberg/playlist.m3u8']},
        {text: 'Arirang', URL: ['https://ctrl.laotv.la/live/Arirang/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Documentary</h3>
<script>
    var listButtons = [
        {text: 'Documentary+', URL: ['https://i.mjh.nz/SamsungTVPlus/CABC2300019UD.m3u8']},
        {text: 'Timeline', URL: ['https://lds-timeline-samsungau.amagi.tv/playlist720-p.m3u8','https://timeline-samsung-uk.amagi.tv/playlist.m3u8']},
        {text: 'CGTN Doc', URL: ['https://livedoc.cgtn.com/1000d/prog_index.m3u8']},
        {text: 'Real Stories', URL: ['https://lds-realstories-samsungau.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Discovery</h3>
<script>
    var listButtons = [
        {text: 'Travelxp', URL: ['https://travelxp-travelxp-1-nz.samsung.wurl.tv/playlist.m3u8', 'https://i.mjh.nz/SamsungTVPlus/ATBA1000005P4.m3u8']},
        {text: 'BBC Travel', URL: ['https://ab96b349d4d14d80a1f8530a0bce4488.mediatailor.us-east-1.amazonaws.com/v1/master/04fd913bb278d8775298c26fdca9d9841f37601f/Samsung-de_BBCTravel/playlist.m3u8?ads.wurl_channel=985&ads.wurl_name=BBCTravel&ads.coppa=0&ads.psid=%7BPSID%7D&ads.targetopt=%7BTARGETOPT%7D&ads.app_domain=%7BAPP_DOMAIN%7D&ads.app_name=%7BAPP_NAME%7D&ads.consent=%7BTC_STRING%7D']},
        {text: 'BBC Home', URL: ['https://i.mjh.nz/SamsungTVPlus/USBC600017FG.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>

<br> <br>
<script>
    var listButtons = [
        {text: 'Wild Planet', URL: ['https://i.mjh.nz/SamsungTVPlus/GBBB5000002PL.m3u8']},
        {text: 'BBC Earth', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD1700001RW.m3u8']},
        {text: 'Animal Planet', URL: ['https://ctrl.laotv.la/live/AnimalPlanet/index.m3u8']},
        {text: 'Discovery SEA', URL: ['https://ctrl.laotv.la/live/Discovery/index.m3u8']},
        {text: 'Horse&Country', URL: ['https://hncfree-samsungau.amagi.tv/playlist.m3u8']},
        {text: 'Love Nature', URL: ['https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/quietude/playlist.m3u8','https://d18dyiwu97wm6q.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/LoveNature4K2-prod/playlist.m3u8']},
        {text: 'Better Life', URL: ['https://tgn.bozztv.com/betterlife/betternature/betternature/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


https://live.playstop.me/LS-63503-4/index.m3u8



<h3>Movie</h3>
<script>
    var listButtons = [
        {text: 'HBO', URL: ['https://ctrl.laotv.la/live/HBO/index.m3u8']},
        {text: 'Cinemax', URL: ['https://ctrl.laotv.la/live/Cinemax/index.m3u8']},
        {text: 'MovieSphere', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD17000117B.m3u8']},
        {text: 'B4U Movies', URL: ['https://minerva-bizzarromovies-1-it.samsung.wurl.tv/playlist.m3u8']},
        {text: 'Sony', URL: ['https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>



<h3>Sport</h3>
<script>
    var listButtons = [
        {text: 'FIFA+', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD12000255B.m3u8']},
        {text: 'EdgeSport', URL: ['https://edgesport-rakuten-samsung.amagi.tv/playlist.m3u8']},
        {text: 'Stadium', URL: ['https://i.mjh.nz/SamsungTVPlus/USAJ3504705A.m3u8']},
        {text: 'Golf 2', URL: ['https://edge1.laotv.la/live/BosiGolf/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Music</h3>
<script>
    var listButtons = [
        {text: 'Spirit TV', URL: ['https://cdnlive.myspirit.tv/LS-ATL-43240-2/index.m3u8','https://cdnlive.myspirit.tv/LS-ATL-43240-2/tracks-v1a1/mono.m3u8']},
        {text: 'Fox Soul', URL: ['https://fox-foxsoul-samsungus.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Show</h3>
<script>
    var listButtons = [
        {text: 'BBC Food', URL: ['https://i.mjh.nz/SamsungTVPlus/USBC6000108Z.m3u8']},
        {text: 'YouTV', URL: ['https://younghollywood-rakuten-samsung.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Vietnamese Channels</h3>
<script>
    var listButtons = [
        {text: 'K+ sport 1', URL: ['https://edge2.laotv.la/live/K+Sport1/index.m3u8']},
        {text: 'K+ sport 2', URL: ['https://edge1.laotv.la/live/K+Sport2/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>

<br> <br>
<script>
    var listButtons = [
        {text: 'SCTV 14', URL: ['https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV14.smil/chunklist_b1692000.m3u8']},
        // {text: 'SCTV 17', URL: ['https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV17.smil/chunklist_b1692000.m3u8']},
        // {text: 'SCTV 1', URL: ['https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8']},
        // {text: 'Phim Hay', URL: ['https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8']},
        {text: 'TVB Vietnam', URL: ['https://bcovlive-a.akamaihd.net/07d9c30456d94f3dbbcd39af064fdefa/us-west-2/6314468039001/0914b33308e3498da3b00fe2c050764e/playlist_ssaiM.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h3>HTV - HTVC</h3> -->


<h3>VTV - VTC</h3>
<script>
    var listButtons = [
        {text: 'VTV 1', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv1-720p.m3u8','https://edge1.laotv.la/live/VTV1SD/index.m3u8']},
        {text: 'VTV 2', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv2-720p.m3u8']},
        {text: 'VTV 3', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv3-720p.m3u8','https://edge1.laotv.la/live/VTV3/index.m3u8']},
        {text: 'VTV 4', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv4-720p.m3u8']},
        {text: 'VTV 5', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5-720p.m3u8']},
        {text: 'VTV 5 TNB', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5tnb-720p.m3u8']},
        {text: 'VTV 5 TN', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv5tn-720p.m3u8']},
        {text: 'VTV 7', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv7-720p.m3u8']},
        {text: 'VTV 8', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv8-720p.m3u8']},
        {text: 'VTV 9', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv9-720p.m3u8']},
        {text: 'VTV Can Tho', URL: ['https://lms-vnetwork-vtv.swiftfederation.com/vtvgo/vtv6-720p.m3u8']},
        {text: 'VOV', URL: ['https://live.mediatech.vn/live/285fbc845578c6641d5a4c40534a0d1864b/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Local</h3>
<!-- <h4>Song Cuu Long</h4> -->
<script>
    var listButtons = [
        {text: 'Can Tho', URL: ['https://live.canthotv.vn/live/tv/chunklist.m3u8']},
        {text: 'Tra Vinh 1', URL: ['https://60acee235f4d5.streamlock.net/THTV/travinhtv/playlist.m3u8']},
        {text: 'Tra Vinh 2', URL: ['https://618b88f69e53b.streamlock.net/THTV2/travinhtv2/playlist.m3u8']},
        {text: 'Hau Giang', URL: ['https://60acee235f4d5.streamlock.net/HGTV/d1/playlist.m3u8']},
        {text: 'Dong Thap 1', URL: ['https://618b88f69e53b.streamlock.net/THDT/thdttv/playlist.m3u8']},
        {text: 'Dong Thap 2', URL: ['https://64d0d74b76158.streamlock.net/THDT2/thdttv2/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Nam Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Binh Phuoc 2', URL: ['https://cdn.baobinhphuoc.com.vn/live/28550d6213460634105b0bae21016f68bce/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Tay Nguyen</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Dak Lak', URL: ['https://live.mediatech.vn/live/285a27750861b964c27af22091662a74f2f/playlist.m3u8']},
        {text: 'Dak Nong', URL: ['https://ngvauezm51liv.vcdn.cloud/live/smil:daknong.smil/chunklist_b3128000_sleng.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Nam Trung Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Ninh Thuan', URL: ['https://60acee235f4d5.streamlock.net/live/mystream/playlist.m3u8']},
        {text: 'Binh Thuan', URL: ['https://64d0d74b76158.streamlock.net/BTVTV/binhthuantv/chunklist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Bac Trung Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        // {text: 'Thanh Hoa', URL: ['']},
        // {text: 'Nghe An', URL: ['']},
        {text: 'Ha Tinh', URL: ['https://wse.hatinhtv.net/live/httv1/playlist.m3u8']},
        // {text: 'Quang Binh', URL: ['']},
        // {text: 'Quang Tri', URL: ['']},
        {text: 'Hue', URL: ['https://live.trt.com.vn/TRT-Online/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Bang Song Hong</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Ha Noi 1', URL: ['https://cecex9g5cpliv.vcdn.cloud/capture/smil:HN1.smil/chunklist_b3128000_slen.m3u8']},
        {text: 'Ha Noi 2', URL: ['https://cecex9g5cpliv.vcdn.cloud/live/smil:HN2.smil/chunklist_b3128000_slen.m3u8']},
        {text: 'Ha Nam', URL: ['https://cdn.hanamtv.vn/live/285361fcafcd0ec47bba2fa3f5870f8dc72/chunklist.m3u8']},
        {text: 'Hung Yen', URL: ['https://cdn.hungyentv.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8','https://live.mediatech.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8']},
        {text: 'Nam Dinh', URL: ['https://ott3.nethubtv.vn/live/namdinh/chunklist_1.m3u8']},
        {text: 'Thai Binh', URL: ['https://ott3.nethubtv.vn/live/thaibinh/chunklist_1.m3u8']},
        {text: 'Ninh Binh', URL: ['https://live.mediatech.vn/live/28597f8fd7ea5064d0f84ab00b3699dfd86/playlist.m3u8']},
        {text: 'Bac Ninh', URL: ['https://stream.thingnet.vn/live/smil:BTV.smil/playlist.m3u8']},
        {text: 'Hai Phong', URL: ['https://live.mediatech.vn/live/285a4c99665fdf84e94956c66bc7dc7eb5d/chunklist.m3u8']},
        {text: 'Hai Phong +', URL: ['https://live.mediatech.vn/live/28548ca35823d41426d8b3da7ed82bdab13/chunklist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Bac</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Tuyen Quang', URL: ['https://live.tuyenquangtv.vn/hls/ttv.m3u8']},
        {text: 'Thai Nguyen', URL: ['https://streaming.thainguyentv.vn/hls/livestream.m3u8']},
        {text: 'Lang Son', URL: ['https://stream.langsontv.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8','https://live.mediatech.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8']},
        {text: 'Bac Giang', URL: ['https://ott3.nethubtv.vn/live/bacgiangtv/chunklist_1.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Tay Bac</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Hoa Binh', URL: ['https://hbtvlive.3ssoft.vn/hoabinhtv/playlist.m3u8']},
        // {text: 'Son La', URL: ['']},
        // {text: 'Lai Chau', URL: ['']},
        {text: 'Dien Bien', URL: ['https://truyenhinh.vnptvas.vn/live.m3u8?c=vstv362&deviceId=&deviceType=&gcId=1532&location=NA&pkg=pkg11.hni&q=high&requestTime=1586309420781&time=1586395820&token=LX-ibJYRUq9pflRtYAxfYQ&type=tv&userId=']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- hai ngoai -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Little Saigon', URL: ['https://media.streambrothers.com:1936/8228/8228/playlist.m3u8']},
        {text: 'SET TV 1', URL: ['https://5dcab9aed5331.streamlock.net/SET1/livestream/playlist.m3u8']},
        {text: 'SET TV 2', URL: ['https://5dcabf026b188.streamlock.net/SET22/livestream/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>



<!-- Visitor -->
<p align="center">
<a href="https://info.flagcounter.com/zg6Y"><img src="https://s01.flagcounter.com/count2/zg6Y/bg_FFFFFF/txt_000000/border_CCCCCC/columns_4/maxflags_20/viewers_3/labels_1/pageviews_0/flags_0/percent_0/" alt="Flag Counter" border="0"></a>
</p>

</div>
</div>

#
