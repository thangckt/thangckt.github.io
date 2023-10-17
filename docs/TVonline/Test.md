<!-- USE BUTTON -->
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
    transform: translateY(-2px);
  }
</style>



<script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/hls.js@1.1.5"></script> -->

<div style="position:relative; padding-bottom:56.25%">
<video id="vid1" controls preload="auto" autoplay style="width:100%;height:100%;position:absolute;left:0px;top:0px;" ></video>
</div>


<label for="m3u8Link">Enter Stream Link: </label>
<input type="text" id="m3u8Link" style="width: 400px;"> <br>
<button type="pushable" onclick="loadVideo()" style="background-color: red;">Load Video</button>


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


#