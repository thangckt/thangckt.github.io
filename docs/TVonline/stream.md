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
  }
  .front {
    display: block;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12pt;
    background: hsl(345deg 100% 47%);
    color: white;
    transform: translateY(-6px);
  }

  .pushable:active .front {
    /* background: hsl(215deg 100% 32%); /* Changed the active color */
    transform: translateY(-2px);
  }
</style>



<!-- videojs-http-streaming (VHS) -->
<script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
<script src="https://unpkg.com/browse/@videojs/http-streaming@3.7.0/dist/videojs-http-streaming.min.js"></script>

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

        var player = videojs('vid1');
            player.src({src: videoUrl, type: 'application/x-mpegURL'});
            video.play();
    }
</script>


#