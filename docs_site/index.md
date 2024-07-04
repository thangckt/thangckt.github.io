---
hide:
  # - toc
  # - navigation
  - footer
---


<style>
    .container {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }

    .container-image {
      width: 280px;
      padding-right: 20px;
    }

    .container-image img {
      display: block;
      margin: auto;
      border-radius: 50%;
      border: 0.1px solid black;
    }

    .container-text {
      position: relative;
    }

    .container-youtube{
      width:70%;
      margin-left:15%;
    }

    /* Mobile styles */
    @media screen and (max-width:600px) {
      .container {
        flex-wrap: wrap;
      }
      .container-youtube {
        width: 100%;
        margin-left:0%;
      }
    }

    /* hide edit button and page title */
    /* .md-typeset h1,    */
    .md-content__button {
        display: none;
    }

    /* remove top-space */
    .md-main__inner {
        margin-top: 0px;
    }
</style>

<!-- Include the JavaScript file -->
<script src="./1JavaScript/general_JScript.js"></script>


<!--- #### [My CV](https://thangckt.github.io/cv) -->
<!-- <img src="./1images/monkey.png" style="float:left; margin-right:20px" width="190" /> -->
<!-- <img src="./1images/thang_pic.jpg" style="border-radius:50%; border: 0.1px solid black; float:left; margin-right:20px" width="180" /> -->

<div class="container" style="margin-bottom:25px;">
  <div class="container-image">
    <img src="./1images/thang_pic.jpg" />
  </div>

  <div class="container-text">
  <p>
    This site serves as a repo for my personal notes. <br>
    The contents reflect neither community standards nor third-party rules. These notes are disorganized, spontaneous, and pertinent only to rare contexts, making them seemingly meaningless for most others.  <br>
    It wouldn't be abnormal if you find nothing valuable here, as they were not created for general audiences. You might prefer to enjoy Felix's excellent work or focus your attention elsewhere. If you need to discuss something, leave a message <a href="https://thang.eu.org/contact">here</a>.
  </p>
  </div>
</div>

<!--
!!! quote ""
    You cannot teach a man anything, you can only help him find it within himself - Galileo Galilei (1564–1642)
-->


<div class="container-youtube">
  <script>
    addYoutubeFrame("https://www.youtube-nocookie.com/embed/iwWYjbTPhcE")
  </script>
</div>


<!-- Visitor -->
<input type="submit" value="check" onclick="showElement()" style="font-size:13pt; border-radius:4px;cursor: pointer; margin-left:15%;" >
<input type="text" id="secret_number" style="width: 70px" required placeholder="fill number">

<div id="visitor" style="display:none; ">
  <p align="center">
    <a href="https://info.flagcounter.com/sXJW"><img src="https://s01.flagcounter.com/count2/sXJW/bg_FFFFFF/txt_000000/border_CCCCCC/columns_4/maxflags_20/viewers_3/labels_1/pageviews_0/flags_0/percent_0/" alt="Flag Counter" border="0"></a>
  </p>
</div>

<script>
  function showElement(){
    var secretNumber = document.getElementById("secret_number").value;
    if (secretNumber == 5) {
      document.getElementById("visitor").style.display = "block";
    }
  }
</script>


#
<!-- # Welcome -->