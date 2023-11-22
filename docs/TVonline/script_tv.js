// These are functions to pass to html file
function loadVideo(videoUrl) {
    // if (Array.isArray(videoUrls)) {
    //     var videoUrl = videoUrls[0]
    // } else {
    //     var videoUrl = videoUrls
    // }
    window.scrollTo(0, 0); // Scroll to the top after loading the video
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
    var player = videojs('vid1');
    player.src({ src: videoUrl, type: 'application/x-mpegURL' });
    player.play();
};

function loadYoutube(videoUrl) {
    window.scrollTo(0, 0);
    var player = videojs('vid1', {
        "techOrder": ["youtube"], // Use YouTube as the primary playback technology
        "sources": [{ "type": "video/youtube", "src": videoUrl }]
    });
    player.play();
}

function loadHLS(videoUrl) {    // or name as: loadHLS
    window.scrollTo(0, 0);
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






/**
 * Creates a read/writable property which returns a function set for write/set (assignment)
 * and read/get access on a variable
 *
 * @param {Any} value initial value of the property
 */
function createProperty(value) {
    var _value = value;

    /**
     * Overwrite getter.
     *
     * @returns {Any} The Value.
     * @private
     */
    function _get() {
        return _value;
    }

    /**
     * Overwrite setter.
     *
     * @param {Any} v   Sets the value.
     * @private
     */
    function _set(v) {
        _value = v;
    }

    return {
        "get": _get,
        "set": _set
    };
};

/**
 * Creates or replaces a read-write-property in a given scope object, especially for non-writable properties.
 * This also works for built-in host objects (non-DOM objects), e.g. navigator.
 * Optional an initial value can be passed, otherwise the current value of the object-property will be set.
 *
 * @param {Object} objBase  e.g. window
 * @param {String} objScopeName    e.g. "navigator"
 * @param {String} propName    e.g. "userAgent"
 * @param {Any} initValue (optional)   e.g. window.navigator.userAgent
 */
function makePropertyWritable(objBase, objScopeName, propName, initValue) {
    var newProp,
        initObj;

    if (objBase && objScopeName in objBase && propName in objBase[objScopeName]) {
        if (typeof initValue === "undefined") {
            initValue = objBase[objScopeName][propName];
        }

        newProp = createProperty(initValue);

        try {
            Object.defineProperty(objBase[objScopeName], propName, newProp);
        } catch (e) {
            initObj = {};
            initObj[propName] = newProp;
            try {
                objBase[objScopeName] = Object.create(objBase[objScopeName], initObj);
            } catch (e) {
                // Workaround, but necessary to overwrite native host objects
            }
        }
    }
};

makePropertyWritable(window, "navigator", "userAgent");

window.navigator.userAgent = "BlackBerry8520/5.0.0.681 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/114";

console.log(window.navigator.userAgent);