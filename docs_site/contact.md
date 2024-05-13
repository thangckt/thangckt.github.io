---
hide:
  # - toc
  # - navigation
  - footer
---


<style>
    /* Style inputs with type="text", select elements and textareas */
    input[type=text], select, textarea {
    width: 100%;
    padding: 12px;
    /* border: 1px solid #ccc;  */
    border-radius: 4px; /* Rounded borders */
    box-sizing: border-box; /* Make sure that padding and width stays in place */
    margin-top: 6px; /* Add a top margin */
    margin-bottom: 16px; /* Bottom margin */
    resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
    }

    /* Style the submit button with a specific background color etc */
    input[type=submit] {
    background-color: #04AA6D;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }

    /* When moving the mouse over the submit button, add a darker green color */
    input[type=submit]:hover {
    background-color: #45a049;
    }

    /* Add a background color and some padding around the form */
    .container {
    border-radius: 5px;
    /* background-color: #f2f2f2; */
    padding: 0px;
    }

    /* hide edit button */
    /* .md-typeset h1, */
    .md-content__button {
        display: none;
    }
</style>



<!--- https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server -->

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


<div class="container">
    <form id="myForm" class="gform" method="POST" data-emailed="caothangckt@gmail.com" action="https://script.google.com/macros/s/AKfycbyCSoCedun-pu3BG2MHgl_Yac9KhuhHOFKTBywij1EIUxxdhNqFloFrt-j18a0h2_Lg/exec">
        <label for="fname">Name: </label>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email: </label>
        <input type="text" id="email" name="email" required><br>
        <label for="subject">Subject:</label><br>
        <input type="text" id="subject" name="subject" required placeholder="What would you intend to talk about?"><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required placeholder="Write here..."></textarea><br>
        <input type="submit" value="Submit">
    </form>
</div>

<script>
    document.getElementById('myForm').addEventListener('submit', function() {
        alert('Your message has been sent!');
    });
</script>




#

