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
    padding: 20px;
    }

    /* hide edit button */
    /* .md-typeset h1, */
    .md-content__button {
        display: none;
    }
</style>



<!--- https://www.w3schools.com/howto/howto_css_contact_form.asp -->

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

