
// Add Youtube frame
function addYoutubeFrame(url, containerID = null) {
    // Define HTML for YouTube frame
    var html_str =`
    <div style="position:relative; padding-bottom:56.25%">
        <iframe src="${url}"
                style="position:absolute; left:0px; top:0px; width:100%; height:100%;" frameborder="0" allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation" >
        </iframe>
    </div>`;

    // Add HTML to div-container
    if (containerID) {
        var container = document.getElementById(containerID);
    } else {
        var container = document.currentScript.parentNode;
    }
    container.innerHTML = html_str;
}
