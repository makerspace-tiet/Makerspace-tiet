$("#sendmessage").click(function () {
    submitmessage();
    return false;
});

function submitmessage() {
    console.log('button was clicked');
    console.log(document.getElementById('name').value);
    console.log(document.getElementById('email').value);
    console.log(document.getElementById('message').value);
    

    let message = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message:document.getElementById('message').value
     
    }; 
    if (checkEmptyString(message.name)) {
        alert('User name is required');
        return;
    }
    if (checkEmptyString(message.email)) {
        alert('pls enter your email id');
        return;
    }
    if (checkEmptyString(message.message)) {
        alert('pls enter some message');
        return;
    }
    
    $.ajax({
        type: "POST",
        url: "/query",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                if (msg[0].status == true) {
                    alert(msg[0].message);
                    location.href = '/';
                } else {
                    alert(msg[0].message);
                    return false;
                }
            }
            else {
                alert('Error Occurred');
                return false;
            }
        },
        data: message
    });

};

function checkEmptyString(val) {
    return (val == undefined || val == null || val.trim().length == 0);
}
