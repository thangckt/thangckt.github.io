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
      margin-top: -52px;
      margin-bottom: -50px;
      margin-right: -30px;
      margin-left: -30px;
  }

  .video-column {
      width: 68%;
      padding-right: 25px;
      position: sticky;
  }

  .content-column {
     width: 32%;
      max-height: 86vh;
      overflow-y: auto;
      position: relative;
  }

    /* Mobile styles */
    @media screen and (max-width:600px) {
      .container {
        flex-wrap: wrap;
        margin-top: -47px;
        margin-bottom: -30px;
        margin-right: -10px;
        margin-left: -10px;
      }

      .video-column {
        width: 100%;
        padding-right: 0px;
      }

      .content-column {
        width: 100%;
        max-height: 42vh;
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
<!-- <script src="https://www.youtube.com/iframe_api"></script>
<script src="https://cdn.jsdelivr.net/npm/youtube-video-js@4.0.1/dist/youtube-video.min.js"></script> -->


<!-- DEFINE SCRIPT JS -->
<script>
    //##### Functions to play video, use only Videojs for simplicity
    function playVideojs(videoURL, vidID='vid1'){
        window.scrollTo(0, 0); // Scroll to the top after loading the video
        var player = videojs(vidID);

        player.src({ src: videoURL, type: 'application/x-mpegURL' });
        player.play();
    };

    //##### Functions to load videos to HTML video tag
    function loadPlayer(videoURLs, vidID='vid1', buttElementID='linkButton') {
        // Clean existing buttons: this clean any existed button at the container with ID=ElementID
        var buttonsContainer = document.getElementById(buttElementID);
        buttonsContainer.innerHTML = '';

        var videoURL;
        if (Array.isArray(videoURLs)) {
            if (videoURLs.length > 1) {
                createLinkButton(videoURLs, buttElementID);
            }
            videoURL = videoURLs[0];
        } else {
            videoURL = videoURLs;
        }
        playVideojs(videoURL, vidID);
    };

    function loadStream(vidID='vid1') {
        var videoURL = document.getElementById("m3u8Link").value;
        if (!videoURL) {
            alert("Please enter a stream link.");
            return;
        };
        loadPlayer(videoURL, vidID);
    };

    //##### Functions to create link buttons below the video frame
    function createLinkButton(videoURLs, buttElementID='linkButton'){
        var buttonsContainer = document.getElementById(buttElementID);

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
<script>
    // Automatically load and play default video when the page loads
    window.addEventListener('load', function () {
        playVideojs('https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8');
    });
</script>


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

<!-- the center biases: https://www.allsides.com/media-bias/media-bias-chart -->
<br><br>
<script>
    // Use the script to void repeated creation of buttons line-by-line as in above
    // List of buttons to create
    var listButtons = [
        {text: 'Y! finance', URL: ['https://yahoo-samsung.amagi.tv/playlist.m3u8','https://yahoo-plex.amagi.tv/playlist.m3u8']},
        {text: 'Bloomberg', URL: ['https://bloomberg-bloomberg-1-be.samsung.wurl.tv/playlist.m3u8','https://bloomberg-bloomberg-2-nz.samsung.wurl.tv/playlist.m3u8','https://4da261f13a2445c2a8fada9704df3e17.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung-in_Bloomberg/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- the left radical side biases: https://www.allsides.com/media-bias/media-bias-chart -->
<br><br>
<script>
    var listButtons = [
        {text: 'CNN', URL: ['https://i.mjh.nz/SamsungTVPlus/GBBD1900008O3.m3u8','https://i.mjh.nz/SamsungTVPlus/INBD1300022TS.m3u8','https://i.mjh.nz/SamsungTVPlus/GBBD8000016N.m3u8']},
        {text: 'ABC Us', URL: ['https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8']},
        {text: 'CBS', URL: ['https://cbsnews.akamaized.net/hls/live/2020607/cbsnlineup_8/master.m3u8']},
        {text: 'NBC', URL: ['https://i.mjh.nz/SamsungTVPlus/GBBB1500004LG.m3u8','https://i.mjh.nz/SamsungTVPlus/CAAJ2700011IF.m3u8']},
        {text: 'CBC', URL: ['https://i.mjh.nz/SamsungTVPlus/CABC2300009KD.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>News - EU</h3>
<script>
    var listButtons = [
        {text: 'DW', URL: ['https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/stream05/streamPlaylist.m3u8','https://ctrl.laotv.la/live/DW/index.m3u8']},
        {text: 'BBC', URL: 'https://i.mjh.nz/SamsungTVPlus/US4000033L.m3u8'},
        {text: 'EURO', URL: ['https://i.mjh.nz/SamsungTVPlus/GBAJ4900020VP.m3u8','https://shls-live-ak.akamaized.net/out/v1/115bfcde8fa342d182ef846445cdbdcf/index.m3u8']},
        {text: 'France 24', URL: 'https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/playlist.m3u8'},
        {text: 'Sky News', URL: ['https://i.mjh.nz/SamsungTVPlus/USBB52000022Q.m3u8']},
        {text: 'GB News', URL: ['https://i.mjh.nz/SamsungTVPlus/GBBB1600008R3.m3u8','https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-gbnewsnz-samsungnz/playlist.m3u8']}
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>News - Asia</h3>
<script>
    var listButtons = [
        {text: 'ABC Au', URL: ['https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index.m3u8','https://abc-iview-mediapackagestreams-2.akamaized.net/out/v1/6e1cc6d25ec0480ea099a5399d73bc4b/index_45.m3u8','https://ctrl.laotv.la/live/ABCA/index.m3u8']},
        {text: 'TRT World', URL: ['https://tv-trtworld.live.trt.com.tr/master_720.m3u8']},
        {text: 'CNA', URL: ['https://d2e1asnsl7br7b.cloudfront.net/7782e205e72f43aeb4a48ec97f66ebbe/index_5.m3u8']},
        {text: 'Wion', URL: ['https://d7x8z4yuq42qn.cloudfront.net/index_1.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Documentary</h3>
<script>
    var listButtons = [
        {text: 'Doc+', URL: ['https://i.mjh.nz/SamsungTVPlus/CABC2300019UD.m3u8']},
        {text: 'Timeline', URL: ['https://timeline-samsung-uk.amagi.tv/playlist.m3u8','https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00426-littledotstudio-timelinenz-samsungnz/playlist.m3u8','https://lds-timeline-samsungau.amagi.tv/playlist720-p.m3u8']},
        {text: 'CGTN Doc', URL: ['https://livedoc.cgtn.com/1000d/prog_index.m3u8']},
        {text: 'Real Stories', URL: ['https://lds-realstories-samsungau.amagi.tv/playlist.m3u8']},
        {text: 'Bloomberg Original', URL: ['https://bloomberg-quicktake-1-be.samsung.wurl.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Discovery</h3>
<script>
    var listButtons = [
        {text: 'Outdoor', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00718-outdoorchannela-outdoortvnz-samsungnz/playlist.m3u8']},
        {text: 'Travelxp', URL: ['https://travelxp-travelxp-1-se.samsung.wurl.tv/playlist.m3u8','https://travelxp-travelxp-1-nz.samsung.wurl.tv/playlist.m3u8', 'https://i.mjh.nz/SamsungTVPlus/ATBA1000005P4.m3u8','https://travelxp-travelxp-3-nl.samsung.wurl.tv/playlist.m3u8']},
        {text: 'BBC Home', URL: ['https://i.mjh.nz/SamsungTVPlus/USBC600017FG.m3u8']},
        {text: 'BBC Travel', URL: ['https://ab96b349d4d14d80a1f8530a0bce4488.mediatailor.us-east-1.amazonaws.com/v1/master/04fd913bb278d8775298c26fdca9d9841f37601f/Samsung-de_BBCTravel/playlist.m3u8?ads.wurl_channel=985&ads.wurl_name=BBCTravel&ads.coppa=0&ads.psid=%7BPSID%7D&ads.targetopt=%7BTARGETOPT%7D&ads.app_domain=%7BAPP_DOMAIN%7D&ads.app_name=%7BAPP_NAME%7D&ads.consent=%7BTC_STRING%7D']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<br> <br>
<script>
    var listButtons = [
        {text: 'Wonder', URL: ['https://wonder-samsung-uk.amagi.tv/playlist.m3u8','https://lds-wonder-samsungau.amagi.tv/playlist.m3u8', 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00426-littledotstudio-wondernz-samsungnz/playlist.m3u8']},
        {text: 'Infast', URL: ['https://insighttv-samsung-canada.amagi.tv/playlist.m3u8']},
        {text: 'Real Life', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00426-littledotstudio-reallifenz-samsungnz/playlist.m3u8']},
        {text: 'Go USA', URL: ['https://brandusa-gousa-1-nl.samsung.wurl.tv/playlist.m3u8','https://brandusa-gousa-1-se.samsung.wurl.tv/playlist.m3u8']},
        {text: 'So Real', URL: ['https://soreal-tcl.amagi.tv/playlist.m3u8']},
        {text: 'Dust', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00219-gunpowdersky-dustintlnz-samsungnz/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<br> <br>
<script>
    var listButtons = [
        {text: 'BBC Earth', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD1700001RW.m3u8']},
        {text: 'Wild Planet', URL: ['https://i.mjh.nz/SamsungTVPlus/GBBB5000002PL.m3u8']},
        {text: 'Animal Planet', URL: ['https://ctrl.laotv.la/live/AnimalPlanet/index.m3u8']},
        {text: 'Discovery SEA', URL: ['https://ctrl.laotv.la/live/Discovery/index.m3u8']},
        {text: 'Real Wild', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg00426-littledotstudio-realwildnz-samsungnz/playlist.m3u8']},
        {text: 'Horse&Country', URL: ['https://hncfree-samsungau.amagi.tv/playlist.m3u8','https://hncfree-samsung-uk.amagi.tv/playlist.m3u8']},
        {text: 'Love Nature', URL: ['https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/quietude/playlist.m3u8','https://d18dyiwu97wm6q.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/LoveNature4K2-prod/playlist.m3u8']},
        {text: 'Better Life', URL: ['https://tgn.bozztv.com/betterlife/betternature/betternature/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>



<h3>Movie</h3>
<script>
    var listButtons = [
        {text: 'MovieSphere', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD17000117B.m3u8','https://moviesphereuk-samsunguk.amagi.tv/playlist.m3u8']},
        {text: 'MyTime', URL: ['https://mytime-tcl.amagi.tv/playlist1080-p.m3u8','https://mytime-tcl.amagi.tv/playlist1080-p.m3u8?blog.ntnas.top']},
        {text: 'HBO', URL: ['https://ctrl.laotv.la/live/HBO/index.m3u8']},
        {text: 'WildSide', URL: ['https://versatile-wildsidetv-1-fr.samsung.wurl.tv/playlist.m3u8']},
        {text: 'Circle', URL: ['https://circle-samsung.amagi.tv/playlist.m3u8']},
        {text: 'FilmStream', URL: ['https://spi-filmstream-1-in.samsung.wurl.tv/playlist.m3u8']},
        {text: 'B4U Movies', URL: ['https://minerva-bizzarromovies-1-it.samsung.wurl.tv/playlist.m3u8']},
        {text: 'Cinemax', URL: ['https://ctrl.laotv.la/live/Cinemax/index.m3u8']},
        {text: 'Sony', URL: ['https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live1/smc_720p/playlist.m3u8']},
        {text: 'Theater 3000', URL: ['https://mst3k-localnow.amagi.tv/playlistR1080p.m3u8','https://mst3k-localnow.amagi.tv/playlist.m3u8']},
        {text: 'Dove', URL: ['https://dovenow-tcl.amagi.tv/playlist.m3u8']},
        {text: 'Action Holywood', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-actionhollywood-samsungnz/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>



<h3>Sport</h3>
<script>
    var listButtons = [
        {text: 'FIFA+', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD12000255B.m3u8','https://d2anxt9uu5yxtz.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-ja4uwkkhcliwv/v1/chili_fifa_eng_1/samsungheadend_us/latest/main/hls/playlist.m3u8']},
        // {text: 'Edge', URL: ['https://edgesport-rakuten-samsung.amagi.tv/playlist.m3u8']},
        {text: 'Tennis', URL: ['https://tennischannel-intl-samsung-uk.amagi.tv/playlist540_p.m3u8']},
        {text: 'SkySport Golf', URL: ['https://30a-tv.com/feeds/vidaa/golf.m3u8']},
        {text: 'Golf 2', URL: ['https://edge1.laotv.la/live/BosiGolf/index.m3u8']},
        {text: 'Stadium', URL: ['https://i.mjh.nz/SamsungTVPlus/USAJ3504705A.m3u8']},
        {text: 'Sigma', URL: ['https://rightsboosterltd-scl-1-nl.samsung.wurl.tv/playlist.m3u8']},
        {text: 'PAC12 Insider', URL: ['https://pac12-samsungus.amagi.tv/playlist.m3u8']},
        {text: 'Sport Grid', URL: ['https://sportsgrid-samsungus.amagi.tv/playlist.m3u8']},
        {text: 'MotorVision', URL: ['https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01329-otterainc-motorvisionnz-samsungnz/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>

<script>
    var listButtons = [
        {text: 'RedBull', URL: ['https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8','https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_928.m3u8','https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_6660.m3u8']},
        {text: 'Trace', URL: ['https://trace-sportstars-samsungnz.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>

<br> <br>
vn:
<script>
    var listButtons = [
        {text: 'K+ sport 1', URL: ['https://edge2.laotv.la/live/K+Sport1/index.m3u8']},
        {text: 'K+ sport 2', URL: ['https://edge1.laotv.la/live/K+Sport2/index.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Music</h3>
<script>
    var listButtons = [
        {text: 'S-ray Qello', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500024YB.m3u8']},
        {text: 'S-ray DJAZZ', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500025GS.m3u8']},
        {text: 'S-ray Jazz', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD35000128A.m3u8']},
        {text: 'S-ray Country', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3300021KV.m3u8']},
        {text: 'S-ray Easy', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500011J3.m3u8']},
        {text: 'S-ray Spa', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500013DG.m3u8']},
        {text: 'S-ray Romance', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500017CE.m3u8']},
        {text: 'S-ray Classic Rock', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD35000180U.m3u8']},
        {text: 'S-ray Classica', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD350002623.m3u8']},
        {text: 'S-ray Greatest hits', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500022DN.m3u8']},
        {text: 'S-ray Flashback 70s', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500008IJ.m3u8']},
        {text: 'S-ray Hiphop', URL: ['https://i.mjh.nz/SamsungTVPlus/USBD3500010MT.m3u8']},
        {text: 'Spirit', URL: ['https://cdnlive.myspirit.tv/LS-ATL-43240-2/index.m3u8','https://cdnlive.myspirit.tv/LS-ATL-43240-2/tracks-v1a1/mono.m3u8']},
        {text: 'Xite', URL: ['https://xite-samsung-de.amagi.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<h3>Show</h3>
<script>
    var listButtons = [
        {text: 'Beach', URL: ['https://30a-tv.com/beachy.m3u8']},
        {text: 'Fashion TV', URL: ['https://fashiontv-fashiontv-5-se.samsung.wurl.tv/playlist.m3u8','https://fashiontv-fashiontv-5-nl.samsung.wurl.tv/playlist.m3u8']},
        {text: 'People AWE', URL: ['https://jukin-peopleareawesome-2-ca.samsung.wurl.tv/playlist.m3u8','https://jukin-peopleareawesome-2-se.samsung.wurl.tv/playlist.m3u8']},
        {text: 'HBO family', URL: ['https://futuretoday-afv-family-2-be.samsung.wurl.tv/playlist.m3u8']},
        {text: 'Pet Club', URL: ['https://the-pet-collective-international-nl.samsung.wurl.tv/playlist.m3u8','https://the-pet-collective-international-it.samsung.wurl.tv/playlist.m3u8','https://the-pet-collective-international-es.samsung.wurl.tv/playlist.m3u8']},
        {text: 'Young', URL: ['https://younghollywood-tcl.amagi.tv/playlist.m3u8','https://younghollywood-rakuten-samsung.amagi.tv/playlist.m3u8']},
        {text: 'Fox Soul', URL: ['https://fox-foxsoul-samsungus.amagi.tv/playlist.m3u8']},
        {text: 'Discovered UK', URL: ['https://30a-tv.com/feeds/vidaa/luxelife.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>

<br> <br>
<script>
    var listButtons = [
        {text: 'BBC Food', URL: ['https://i.mjh.nz/SamsungTVPlus/USBC6000108Z.m3u8']},
        {text: 'Tastemade', URL: ['https://tmint-aus-samsungswedan.amagi.tv/playlist.m3u8','https://i.mjh.nz/SamsungTVPlus/CABD1200002T9.m3u8']},
        {text: 'Comedy Dynamics', URL:['https://comedydynamics-tcl.amagi.tv/playlist.m3u8']},
        {text: 'Drybar', URL: ['https://drybar-drybarcomedy-1-ca.samsung.wurl.tv/playlist.m3u8','https://drybar-drybarcomedy-1-nz.samsung.wurl.tv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>




<h3>Vietnamese Channels</h3>
<script>
    var listButtons = [
        {text: 'SCTV 14', URL: ['https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV14.smil/chunklist_b1692000.m3u8']},
        // {text: 'SCTV 17', URL: ['https://e7.endpoint.cdn.sctvonline.vn/live/smil:SCTV17.smil/chunklist_b1692000.m3u8']},
        // {text: 'SCTV 1', URL: ['https://code.vthanhtivi.pw/getlink/sctvonline/sctv1/playlist.m3u8']},
        // {text: 'Phim Hay', URL: ['https://cdnw-liv02.todayplus.com.vn/hdb/smil:phimhay.smil/chunklist_b228915playlist.m3u8']},
        {text: 'TVB', URL: ['https://bcovlive-a.akamaihd.net/07d9c30456d94f3dbbcd39af064fdefa/us-west-2/6314468039001/0914b33308e3498da3b00fe2c050764e/playlist_ssaiM.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h3>HTV - HTVC</h3> -->



<h3>Local</h3>
<!-- <h4>Song Cuu Long</h4>  t.ly/zT6EL -->
<script>
    var listButtons = [
        {text: 'Can Tho', URL: ['https://live.canthotv.vn/live/tv/chunklist.m3u8']},
        // {text: 'Ca Mau', URL: [' ']},
        // {text: 'Bac Lieu', URL: [' ']},
        // {text: 'Soc Trang', URL: [' ']},
        // {text: 'Kien Giang', URL: [' ']},
        {text: 'Hau Giang', URL: ['https://60acee235f4d5.streamlock.net/HGTV/d1/playlist.m3u8']},
        {text: 'Tra Vinh 1', URL: ['https://60acee235f4d5.streamlock.net/THTV/travinhtv/playlist.m3u8']},
        {text: 'Tra Vinh 2', URL: ['https://618b88f69e53b.streamlock.net/THTV2/travinhtv2/playlist.m3u8']},
        // {text: 'Vinh Long', URL: [' ']},
        // {text: 'Ben Tre', URL: [' ']},
        // {text: 'An Giang', URL: [' ']},
        // {text: 'Tien Giang', URL: [' ']},
        {text: 'Dong Thap 1', URL: ['https://618b88f69e53b.streamlock.net/THDT/thdttv/playlist.m3u8']},
        {text: 'Dong Thap 2', URL: ['https://64d0d74b76158.streamlock.net/THDT2/thdttv2/playlist.m3u8']},
        // {text: 'Long An', URL: [' ']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Nam Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        // {text: 'Vung Tau', URL: [' ']},
        // {text: 'Tay Ninh', URL: [' ']},
        // {text: 'Dong Nai', URL: [' ']},
        // {text: 'Binh Duong', URL: [' ']},
        // {text: 'Binh Phuoc 1', URL: ['http://vncdn.mediatech.vn/bptvlive/tv1live.m3u8']},
        {text: 'Binh Phuoc 2', URL: ['https://cdn.baobinhphuoc.com.vn/live/28550d6213460634105b0bae21016f68bce/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Tay Nguyen</h4> -->
<br> <br>
<script>
    var listButtons = [
        // {text: 'Lam Dong', URL: [' ']},
        {text: 'Dak Nong', URL: ['https://cloudstreamthdn.tek4tv.vn/live/smil:daknong.smil/chunklist_b3128000_sleng.m3u8']},
        {text: 'Dak Lak', URL: ['https://live.mediatech.vn/live/285a27750861b964c27af22091662a74f2f/playlist.m3u8']},
        // {text: 'Gia Lai', URL: [' ']},
        // {text: 'Kon Tum', URL: [' ']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Nam Trung Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Binh Thuan', URL: ['https://64d0d74b76158.streamlock.net/BTVTV/binhthuantv/chunklist.m3u8']},
        {text: 'Ninh Thuan', URL: ['https://60acee235f4d5.streamlock.net/live/mystream/playlist.m3u8']},
        // {text: 'Khanh Hoa', URL: [' ']},
        // {text: 'Phu Yen', URL: [' ']},
        // {text: 'Binh Dinh', URL: [' ']},
        // {text: 'Quang Ngai', URL: [' ']},
        // {text: 'Quang Nam', URL: [' ']},
        // {text: 'Da Nang', URL: [' ']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Bac Trung Bo</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Hue', URL: ['https://live.trt.com.vn/TRT-Online/playlist.m3u8']},
        // {text: 'Quang Tri', URL: ['']},
        // {text: 'Quang Binh', URL: ['']},
        {text: 'Ha Tinh', URL: ['https://wse.hatinhtv.net/live/httv1/playlist.m3u8']},
        // {text: 'Nghe An', URL: ['']},
        // {text: 'Thanh Hoa', URL: ['']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Bang Song Hong</h4> -->
<br> <br>
<script>
    var listButtons = [
        // {text: 'Vinh Phuc', URL: ['']},
        {text: 'Thai Binh', URL: ['https://live.mediatech.vn/live/285fe61ba73072f428d8a626d764222e744/playlist.m3u8']},
        {text: 'Ninh Binh', URL: ['https://live.mediatech.vn/live/28597f8fd7ea5064d0f84ab00b3699dfd86/playlist.m3u8']},
        {text: 'Nam Dinh', URL: ['https://ott3.nethubtv.vn/live/namdinh/chunklist_1.m3u8']},
        {text: 'Hung Yen', URL: ['https://cdn.hungyentv.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8','https://live.mediatech.vn/live/285f5449d7d7d2946e0bd2d54b7e60f25a4/chunklist.m3u8']},
        {text: 'Hai Phong', URL: ['https://live.mediatech.vn/live/285a4c99665fdf84e94956c66bc7dc7eb5d/chunklist.m3u8']},
        {text: 'Hai Phong +', URL: ['https://live.mediatech.vn/live/28548ca35823d41426d8b3da7ed82bdab13/chunklist.m3u8']},
        // {text: 'Hai Duong', URL: ['']},
        {text: 'Ha Noi 1', URL: ['https://cloudstreamhntv.tek4tv.vn/capture/smil:HN1.smil/playlist.m3u8']},
        {text: 'Ha Noi 2', URL: ['https://cloudstreamhntv.tek4tv.vn/live/smil:HN2.smil/playlist.m3u8']},
        {text: 'Ha Nam', URL: ['https://cdn.hanamtv.vn/live/285361fcafcd0ec47bba2fa3f5870f8dc72/chunklist.m3u8']},
        {text: 'Bac Ninh', URL: ['https://stream.thingnet.vn/live/smil:BTV.smil/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Dong Bac</h4> -->
<br> <br>
<script>
    var listButtons = [
        // {text: 'Quang Ninh 1', URL: ['https://live.baoquangninh.vn/qtvlive/tv1live.m3u8']},
        // {text: 'Quang Ninh 2', URL: ['']},
        {text: 'Bac Giang', URL: ['https://ott3.nethubtv.vn/live/bacgiangtv/chunklist_1.m3u8']},
        // {text: 'Phu Tho', URL: ['']},
        {text: 'Thai Nguyen', URL: ['https://streaming.thainguyentv.vn/hls/livestream.m3u8']},
        {text: 'Tuyen Quang', URL: ['https://live.tuyenquangtv.vn/hls/ttv.m3u8']},
        {text: 'Lang Son', URL: ['https://stream.langsontv.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8','https://live.mediatech.vn/live/285c78da0c246524c90917842f8de03bd21/chunklist.m3u8']},
        {text: 'Bac Kan', URL: ['https://truyenhinh.vnptvas.vn/live.m3u8?c=vstv360&q=high&type=tv&location=NA&pkg=pkg11.hni']},
        // {text: 'Cao Bang', URL: ['']},
        {text: 'Ha Giang', URL: ['https://ott4.nethubtv.vn/live/hagiangtv/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- <h4>Tay Bac</h4> -->
<br> <br>
<script>
    var listButtons = [
        {text: 'Son La', URL: ['https://live.mediatech.vn/live/28595222e707a364251b8724717894baa46/playlist.m3u8']},
        // {text: 'Lai Chau', URL: ['']},
        {text: 'Hoa Binh', URL: ['https://hbtvlive.3ssoft.vn/hoabinhtv/playlist.m3u8']},
        {text: 'Dien Bien', URL: ['https://truyenhinh.vnptvas.vn/live.m3u8?c=vstv362&deviceId=&deviceType=&gcId=1532&location=NA&pkg=pkg11.hni&q=high&requestTime=1586309420781&time=1586395820&token=LX-ibJYRUq9pflRtYAxfYQ&type=tv&userId=']},
        // {text: 'Yen Bai', URL: ['https://live.yenbaitv.org.vn/hls/livestream.m3u8']},
        // {text: 'Lao Cai', URL: ['']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script>


<!-- hai ngoai -->
<!-- <br> <br>
<script>
    var listButtons = [
        {text: 'Little Saigon', URL: ['https://media.streambrothers.com:1936/8228/8228/playlist.m3u8']},
        {text: 'SET TV 1', URL: ['https://5dcab9aed5331.streamlock.net/SET1/livestream/playlist.m3u8']},
        {text: 'SET TV 2', URL: ['https://5dcabf026b188.streamlock.net/SET22/livestream/playlist.m3u8']},
    ];
    createListChannelButton(listButtons, 'content-column');
</script> -->

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



<!-- Visitor -->
<p align="center">
<a href="https://info.flagcounter.com/zg6Y"><img src="https://s01.flagcounter.com/count2/zg6Y/bg_FFFFFF/txt_000000/border_CCCCCC/columns_4/maxflags_20/viewers_3/labels_1/pageviews_0/flags_0/percent_0/" alt="Flag Counter" border="0"></a>
</p>

</div>
</div>

#
