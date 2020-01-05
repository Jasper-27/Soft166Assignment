//The URL of the lights in SMB109
var URL = "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/"


//This function takes a light ID number.  It then switches the given light on or off.
function switchLightOn(lightID, color) {
    if (color == "green") {
        var lightCommand = {
            "on": true,
            "hue": 25500,
            "sat": 255,
            "bri": 100
        };
    } else if (color == "red") {
        var lightCommand = {
            "on": true,
            "hue": 0,
            "sat": 255,
            "bri": 100
        };
    }


    //var lightCommand = {"on" : true, "hue" : 25500};       //JSON to send to the lights
    var lightURI = URL + lightID + "/state/";

    console.log(lightCommand); //Outputs the light command (for debugging)
    console.log(lightURI); //Outputs the URL for debugging

    $.ajax({
        url: lightURI, //uses variable lightURI
        type: "PUT",
        data: JSON.stringify(lightCommand) //translates contents of lightCommand variable into jSON code
    })
}


//Switches a specific light on/off
function switchLightOff(lightID) {
    var lightCommand = {
        "on": false
    }; //the ajax
    var lightURI = URL + lightID + "/state/";

    $.ajax({
        url: lightURI, //Gets lights URL
        type: "PUT",
        data: JSON.stringify(lightCommand) //converts to json
    })
}

//This function clears the password field
function clearPass() {

    if (psw.value.length > 1) {
        psw.value = "";
    }
    txtLengthOver8.innerHTML = "&#128566;";
    txtLengthOver16.innerHTML = "&#128566;";
    txtMulticase.innerHTML = "&#128566;";
    txtSpecialChar.innerHTML = "&#128566;";
    txtAlphanumeric.innerHTML = "&#128566;";
    txtRepeatingChars.innerHTML = "&#128566;";


}

//Shows the password in plain text
function showPass() {
    var element = document.getElementById("psw");
    var button = document.getElementById("show-button");


    if (element.type === "password") {
        element.type = "text";
        button.innerHTML = "Hide";
    } else {
        element.type = "password";
        button.innerHTML = "Show";
    }
}


//Checks the password for key features and updates the web page accordingly
function passwordCheck() {


		//Setting up all the variables
    var pass = document.getElementById("psw").value;
    var points = 0;
    var lowPass = pass.toLowerCase(); //Needed for the case test
    var highPass = pass.toUpperCase();


    // &#9785; is a sad face
    // &#9786; is a happy face

    //&#128522; is happy emoji
    //&#128560; is sad emoji


    //Check the length
    if (pass.length >= 8) {
        points++;

        txtLengthOver8.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(1, 'green')

    } else {
        txtLengthOver8.innerHTML = "&#128560;".fontcolor("#F44336");
        switchLightOn(1, 'red')
    }

    if (pass.length >= 16) {
        points++

        txtLengthOver16.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(2, 'green')
    } else {
        txtLengthOver16.innerHTML = "&#128560;".fontcolor("#F44336");
        switchLightOn(2, 'red')
    }

    //Check for multi-case
    if (pass != lowPass && pass != highPass) {
        points++;

        txtMulticase.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(3, 'green')
    } else {
        txtMulticase.innerHTML = "&#128560;".fontcolor("#F44336");
        switchLightOn(3, 'red')
    }

    //Check for special chars
    if (!pass.match(/^[a-zA-Z0-9- ]*$/)) {
        points++;

        txtSpecialChar.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(4, 'green')
    } else {
        txtSpecialChar.innerHTML = "&#128560;".fontcolor("#F44336");
        switchLightOn(4, 'red')
    }

    //Check for alphanumeric
		if (pass.match(/.*[a-z].*/) && pass.match(/.*[0-9].*/)) {
        points++;

        txtAlphanumeric.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(5, 'green')
    } else {
        txtAlphanumeric.innerHTML = "&#128560".fontcolor("#F44336");
        switchLightOn(5, 'red')
    }

    //Check for consecutive characters
    if (!pass.match(/(.)\1\1/)) {
        points++;

        txtRepeatingChars.innerHTML = "&#128522;".fontcolor("#21FF21");
        switchLightOn(6, 'green')
    } else {
        txtRepeatingChars.innerHTML = "&#128560;".fontcolor("#F44336");
        switchLightOn(6, 'red')
    }

    //Doesn't fill in if the password is less than three
    if (pass.length < 2) {
        clearPass();
        points = 0;

    }


    document.getElementById("password-score").innerHTML = points.toString(); //Updates the points on the web app



}
