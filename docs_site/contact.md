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
    <form id="contactForm">
        <label for="fname">Name: </label>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email: </label>
        <input type="text" id="email" name="email" required><br>
        <label for="subject">Subject:</label><br>
        <input type="text" id="subject" name="subject" required placeholder="What do you intend to talk about?"><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" required placeholder="Write here..."></textarea><br>
        <input type="submit" value="Submit">
    </form>
</div>


<script>
  $(document).ready(function(){
    $("#contactForm").submit(function(event){
      event.preventDefault();
      
      var name = $("#name").val();
      var email = $("#email").val();
      var subject = $("#subject").val();
      var message = $("#message").val();

      $.ajax({
        type: "POST",
        url: "/path/to/your/server/side/script",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
          recipient: "tha@gmail.com"
        },
        success: function(data){
          alert("Email sent successfully!");
        },
        error: function(data){
          alert("There was an error sending the email.");
        }
      });
    });
  });
</script>


#

