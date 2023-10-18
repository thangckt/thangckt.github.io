
# How to play m3u8 link in html

## Use videojs
https://github.com/videojs/videojs-contrib-hls

```html
<head>
    <link href="https://vjs.zencdn.net/8.6.1/video-js.css" rel="stylesheet" />
    <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
</head>

<body>
    <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" class="video-js vjs-default-skin vjs-live vjs-liveui" controls preload="auto"  autoplay  style="width:100%;height:100%;position:absolute;left:0px;top:0px;">
    <source src="http://drtdnglive.e49a7c38.cdnviet.com/livedrt1/chunklist.m3u8" type="application/x-mpegURL">
    </video>
    </div>

    <script>
        var player = videojs('vid1');
        player.play();
    </script>
</body>
```

## Use videojs-http-streaming (VHS)
https://github.com/videojs/http-streaming


## Use extension hls.js
https://github.com/video-dev/hls.js/blob/master/demo/basic-usage.html

https://nochev.github.io/hls.js/docs/html/

This has advantage that no extermal js lib is needed, then avoiding conflicts in `video.min.js` with mkdocs theme.


```html
<body>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
    <!-- Or if you want the latest version from the main branch -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@canary"></script> -->

    <div style="position:relative; padding-bottom:56.25%">
    <video id="vid1" controls autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
    </div>

    <script>
    var videoSrc = 'https://code.vthanhtivi.pw/getlink/sctvonline/sctv14/playlist.m3u8';
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

</body>
```

<script>
    var videoUrl = 'https://code.vthanhtivi.pw/getlink/vieon/htv7-hd/playlist.m3u8';
    var video = document.getElementById('vid1');
    var config = {
        xhrSetup: function (xhr,url) {
            xhr.withCredentials = true; // do send cookies
            // xhr.setRequestHeader("Authorization", "Bearer " + token);
            xhr.setRequestHeader("http-user-agent", "Dalvik/2.1.0");
            xhr.setRequestHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With");
            xhr.setRequestHeader("Access-Control-Allow-Origin": "*",);
            xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
        }};

    if(Hls.isSupported()) {
        var hls = new Hls(config);
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
    });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
        video.addEventListener('canplay',function() {
        video.play();
        });
    }
</script>


## Use button load video

<style>
  .pushable {
    background: hsl(340deg 100% 32%);
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
</style>



<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script> -->

<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" controls preload="auto" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
</div>


<label for="m3u8Link">Enter Stream Link: </label>
<input type="text" id="m3u8Link" style="width: 400px;"> <br> <br>
<button class="pushable" onclick="loadVideo()"> <span class="front">Load Video</span> </button>


<script>
    function loadVideo() {
        var videoUrl = document.getElementById("m3u8Link").value;
        if (!videoUrl) {
            alert("Please enter a stream link.");
            return;
        }

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
</script>


## defaul video when load page

<script>
    // Automatically load and play default video when page loads
    window.addEventListener('load', function() {
        var defaultVideoUrl = 'https://drm-livecdn.hplus.com.vn/CDN-FPT02/HTV2-HD-1080p/playlist.m3u8';
        loadVideo(defaultVideoUrl);
    });
</script>