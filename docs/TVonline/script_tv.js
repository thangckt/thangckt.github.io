






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

// makePropertyWritable(window, "navigator", "userAgent");
// window.navigator.userAgent = "BlackBerry8520/5.0.0.681 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/114";
// console.log(window.navigator.userAgent);

function set_userAgent(new_agent) {
    let agent = navigator.userAgent;   // read current agent
    agent += new_agent;
    makePropertyWritable(window, "navigator", "userAgent");
    window.navigator.userAgent = agent;
}

function replaceClass(myId, my_class = ' ') {
    document.getElementById(myId).className = my_class;
}


function replaceVideoElement(vidId, targetType) {
    var videoElement = document.getElementById(vidId);     // Get the video element
    // Check if the current element is of the same type, then do nothing
    if ((targetType === 'video' && videoElement.tagName.toLowerCase() === 'video') ||
        (targetType === 'iframe' && videoElement.tagName.toLowerCase() === 'iframe')) {
        return;
    }

    // Create new element with targetType and Replace the current element
    var newElement;
    if (targetType === 'video') {
        newElement = document.createElement('video');
        newElement.setAttribute('class', 'video-js');
        newElement.setAttribute('controls', 'controls');
        newElement.setAttribute('preload', 'none');
        newElement.setAttribute('autoplay', 'autoplay');
        newElement.setAttribute('style', 'width:100%;height:100%;left:0px;top:0px;position:absolute;');
    } else if (targetType === 'iframe') {
        newElement = document.createElement('iframe');
        newElement.setAttribute('style', 'width:100%;height:100%;left:0px;top:0px;position:absolute;');
        newElement.setAttribute('frameborder', '0');
        newElement.setAttribute('allowfullscreen', 'true');
        newElement.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    }
    newElement.setAttribute('id', vidId);

    var parentDiv = videoElement.parentElement;             // Get the parent div
    parentDiv.removeChild(videoElement);
    parentDiv.appendChild(newElement);
}







// These are functions to pass to html file
function loadVideo(videoUrl) {
    // set_userAgent(new_agent) // set user-agent
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


function loadStream(new_agent = '') {
    set_userAgent(new_agent) // set user-agent
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

function loadYoutube1(videoUrl) {
    window.scrollTo(0, 0);
    // replaceVideoElement("vid1", 'iframe')           // use iframe to play youtube
    var video = document.getElementById("vid1");     // Get the video element
    video.src = "https://www.youtube.com/embed/" + videoUrl.split('v=')[1]
}



function loadHLS(videoUrl) {    // or name as: loadHLS
    window.scrollTo(0, 0);
    // replaceVideoElement('vid1', 'video')
    replaceClass('vid1', ' ');
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
