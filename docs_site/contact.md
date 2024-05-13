---
hide:
  # - toc
  # - navigation
  - footer
---


<style>
    textarea {
      width: 100%;
      /* padding: 12px; */
      /* border: 1px solid #ccc;  */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 16px; /* Bottom margin */
      resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
      }

          text email {
      width: 70%;
      /* padding: 12px; */
      /* border: 1px solid #ccc;  */
      border-radius: 4px; /* Rounded borders */
      box-sizing: border-box; /* Make sure that padding and width stays in place */
      margin-top: 6px; /* Add a top margin */
      margin-bottom: 16px; /* Bottom margin */
      resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
      }


/* Style for send button */
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

    /* Add a background color and some padding around the form */
    .container {
        border-radius: 5px;
        /* background-color: #f2f2f2; */
        padding: 0px;
    }

    .honeypot-field {
        display: none;
    }

    /* hide edit button */
    /* .md-typeset h1, */
    .md-content__button {
        display: none;
    }
</style>



<!--- Using Google App Mail: https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server -->
<!-- Define js script -->
<script>
    (function() {
    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
        }
        return true;
        }).map(function(k) {
        if(elements[k].name !== undefined) {
            return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
            return elements[k].item(0).name;
        }
        }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;

        // when our element has multiple items, get their values
        if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
                data.push(item.value);
            }
            }
            formData[name] = data.join(', ');
        }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default

        return {data: formData, honeypot: honeypot};
    }

    function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
        return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            var formElements = form.querySelector(".form-elements")
            if (formElements) {
                formElements.style.display = "none"; // hide form
            }
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {
                thankYouMessage.style.display = "block";
            }
            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    }
    
    function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        }
    }
    })();
</script>


<!-- HTML from here -->
<div class="container">
    <form id="myForm" class="gform" method="POST" data-emailed="caothangckt@gmail.com" action="https://script.google.com/macros/s/AKfycbyCSoCedun-pu3BG2MHgl_Yac9KhuhHOFKTBywij1EIUxxdhNqFloFrt-j18a0h2_Lg/exec">
    <div class="form-elements">
        <label for="fname">Name: </label>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email: </label>
        <input type="email" id="email" name="email" required><br>
        <label for="subject">Subject:</label><br>
        <input type="text" id="subject" name="subject" required placeholder="What would you want to discuss?"><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required placeholder="Write here..."></textarea><br>
        <label for="honeypot">To help avoid spam, utilize a Honeypot technique with a hidden text field; must be empty to submit the form! Otherwise, we assume the user is a spam bot.</label>
        <input id="honeypot" type="text" name="honeypot" value="" />
        <input class="pushable" type="submit" value="send">
    </div>
    <!-- Customise the Thankyou Message People See when they submit the form: -->
    <div class="thankyou_message" style="display:none;">
    <h2><em>Thanks</em> for contacting us!
        We will get back to you soon!</h2>
    </div>
    </form>
</div>



#

