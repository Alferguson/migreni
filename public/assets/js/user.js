
$(document.body).ready(function() {
    console.log("something");
   $("#submit-login").on("click", function(event) {
        event.preventDefault();
        var newUser = {
          username: $("#username").val(),
          password: $("#password").val(),
          email: $("#email").val(),
          age: $("#age").val(),
          gender: $("#intensity-val").val(),
        };
        console.log(newUser)

        $.ajax("/api/user", {
            type: "POST",
            data: newUser
        })
        // .then(function(result) {
        //     console.log("sent " + newUser);
        // });

    });
})
