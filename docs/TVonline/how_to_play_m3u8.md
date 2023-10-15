
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

## Use extension hls.js
https://github.com/video-dev/hls.js/blob/master/demo/basic-usage.html

This has advantage that avoiding conflicts in `video.min.js` with mkdocs theme.


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
    if (Hls.isSupported()) {
        var hls = new Hls({
        debug: true,
        });
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        video.play();
        });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element through the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('canplay', function () {
        video.play();
        });
    }
    </script>

</body>
```

