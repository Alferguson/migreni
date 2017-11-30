
$(document.body).ready(function() {
    $("#login").on("click", function() {
        var user = {
            username: "akmac",
            email: "alyssakeimach@gmail.com",
            gender: "F",
            age: 24,
            location: "Oakland, CA"
        };
        console.log(user);
        $.ajax("/api/user", {
            type: "POST",
            data: user
        }).then(function(result) {
            console.log("sent " + user);
        });

    });
})