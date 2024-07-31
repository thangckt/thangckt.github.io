---
hide:
  # - toc
  # - navigation
  - footer
---


<style>
    /* Add a background color and some padding around the form */
    .container {
        border-radius: 5px;
        /* background-color: #f2f2f2; */
        padding: 0px;
    }

    .flex-container {
        display: flex;
        align-items: center;
    }

    .flex-container label {
        margin-right: 10px; /* Adjust as needed */
    }

    .flex-container input[type="text"], .flex-container input[type=email]{
        flex-grow: 1;
        background-color: #2f2f2f;
        height:20px;
        border-radius: 4px;
    }

    textarea {
        background-color: #2f2f2f;
        width: 100%;
        border-radius: 6px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 6px; /* Add a top margin */
        margin-bottom: 6px; /* Bottom margin */
        resize: vertical; /* Allow the user to vertically resize the textarea (not horizontally) */
        overflow: hidden; /* Optional: for better appearance */
        min-height: 100px; /* Optional: define a minimum height */
        font-size: 12pt; /* Change font size */
    }

    .honeypot-field {
        display: none;
    }


    /* Style the submit button with a specific background color etc */
    input[type=submit] {
        background-color: #04AA6D;
        color: white;
        padding: 6px 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    /* When moving the mouse over the submit button, add a darker green color */
    input[type=submit]:hover {
        background-color: #04780a;
    }

    /* hide edit button */
    /* .md-typeset h1, */
    .md-content__button {
        display: none;
    }
</style>


<!-- Include the JavaScript file -->
<script src="./1JavaScript/form-submission-handler.js"></script>



<!-- HTML from here -->
<div class="container">
    <form id="myForm" class="gform" method="POST" action="https://script.google.com/macros/s/AKfycbxmd9UxNXhJoBXFwksde4ip_G1YMofHVHOT4ZLOIpJ8mzYxneUa48sTK2X1GU6cnkfP/exec">
    <!-- chang action link, and can use option data-email="name@something.com" -->
    <div class="form-elements">
        <div class="flex-container">
            <label for="fname">Name: </label>
            <input type="text" id="name" name="name" required><br>
        </div>
        <div class="flex-container">
            <label for="email">Email: </label>
            <input type="email" id="email" name="email" required><br>
        </div>
        <div class="flex-container">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required placeholder="What is your message about?"><br>
        </div>
        <div>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" required placeholder="Leave messages here..." oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea><br>
        </div>
        <div class="honeypot-field">
            <label for="honeypot">To help avoid spam, utilize a Honeypot technique with a hidden text field; must be empty to submit the form! Otherwise, we assume the user is a spam bot.</label>
            <input id="honeypot" type="text" name="honeypot" value=""  />
        </div>
        <p>* Ensure your email is correct to able to receive the feedback.</p>
        <input type="submit" value="Send" style="font-size:13pt">
    </div>
    <!-- Add a new sending message -->
    <div class="sending_message" style="display:none;">
        <h2>Sending ...</h2>
    </div>
    <!-- Customise the Thankyou Message People See when they submit the form: -->
    <div class="thankyou_message" style="display:none;">
        <h2>Your message has been sent. <br><br>
        <a href="https://thang.eu.org/contact">Send another message</a> 
        </h2>
    </div>
    </form>
</div>



#
<!-- # Contact -->


