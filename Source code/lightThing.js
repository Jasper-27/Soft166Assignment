
var URL = "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/"



function switchLightOn(lightID, color)             //This function takes a light ID number.  It then switches the given light on or off.
{
	if (color == "green")
	{
		var lightCommand = {"on" : true, "hue" : 25500, "sat" : 255 , "bri" : 100};
	}else if (color == "red")
	{
		var lightCommand = {"on" : true, "hue" : 0, "sat" : 255 , "bri" : 100};
	}



    //var lightCommand = {"on" : true, "hue" : 25500};       //JSON to send to the lights
    var lightURI =  URL + lightID + "/state/";

    console.log(lightCommand);  //Outputs to console content of lightCommand variable. We can then check that this is correct value and format
    console.log(lightURI);      //Check in the console that lightURI value is correct

    $.ajax({
        url: lightURI,                      //uses variable lightURI
        type: "PUT",
        data: JSON.stringify(lightCommand)  //translates contents of lightCommand variable into jSON code
    })
}


function switchLightOff(lightID)  //This function takes a light ID number.  It then switches the given light on or off.
{
    var lightCommand = {"on" : false}; //this creates a string of  { "on" : false }
    var lightURI = URL + lightID + "/state/";

    $.ajax({
        url: lightURI,  //calls function getLightURI (see below) and passes the required light ID
        type: "PUT",
        data: JSON.stringify(lightCommand)  //translates contents of lightCommand variable into jSON code
    })
}


function passwordCheck() {





    var pass = document.getElementById("psw").value;
    var points = 0;
    var lowPass = pass.toLowerCase();
    var highPass = pass.toUpperCase();

    //Strong password features
    var lengthOver8 = false;
    var lengthOver16 = false;
    var multicase = false;
    var specialChar = false;
    var alphanumeric = false;
    var noConsecutiveChars = false;


    //Check the length
    if (pass.length >= 8) {
        points++;
        lengthOver8 = true;
        if (pass.length >= 16) {
            points++
            lengthOver16 = true;
        }
    }

    //Check for multicase
    if (pass != lowPass && pass != highPass) {
        points++;
        multicase = true;
    }

    //Check for special chars
    if (!pass.match(/^[a-zA-Z0-9- ]*$/)) {
        points++;
        specialChar = true;
    }

    //Check for alphanumeric
    if (pass.match(/.*[a-z].*/) && pass.match(/.*[0-9].*/)) {
        points++;
        alphanumeric = true;
    }

    //Check for consecutive characters
    if (!pass.match(/(.)\1\1/)) {
        points++;
        noConsecutiveChars = true;
    }



		//Populating the text on the web page

    if (lengthOver8 == true) {
        txtLengthOver8.innerHTML = "Password is over eight charecters".fontcolor("green");
		switchLightOn(1,'green')
    } else {
        txtLengthOver8.innerHTML = "Password is not over eight charecters".fontcolor("red");
		switchLightOn(1,'red')
    }

    if (lengthOver16 == true) {
        txtLengthOver16.innerHTML = "Password is over sixteen charecters".fontcolor("green");
		switchLightOn(2,'green')
    } else {
        txtLengthOver16.innerHTML = "Password is not over sixteen charecters".fontcolor("red");
		switchLightOn(2,'red')
    }

    if (multicase == true) {
        txtMulticase.innerHTML = "Password uses multicase".fontcolor("green");
		switchLightOn(3,'green')
    } else {
        txtMulticase.innerHTML = "Password doesn't use multicase".fontcolor("red");
		switchLightOn(3,'red')
    }

    if (specialChar == true) {
        txtSpecialChar.innerHTML = "Password uses special charecters".fontcolor("green");
		switchLightOn(4,'green')
    } else {
        txtSpecialChar.innerHTML = "Password doesn't use special charecters".fontcolor("red");
		switchLightOn(4,'red')
    }

    if (alphanumeric == true) {
        txtAlphanumeric.innerHTML = "Password contains both letters and numbers".fontcolor("green");
		switchLightOn(5,'green')
    } else {
        txtAlphanumeric.innerHTML = "Password doesn't use both numbers and letters".fontcolor("red");
		switchLightOn(5,'red')
    }

    if (noConsecutiveChars == true) {
        txtNoConsecutiveChars.innerHTML = "Password doesn't use any consecutive charecters".fontcolor("green");
		switchLightOn(6,'green')
    } else {
        txtNoConsecutiveChars.innerHTML = "Password uses consecutive charecters".fontcolor("red");
		switchLightOn(6,'red')
    }

    //Doesn't fill in if the password is less than three
    if (pass.length < 1) {
			clearPass();
    }


    /*
    			psw.value = "";

          alert("Length over 8: " + lengthOver8 +
    			"  | Length over 16: " + lengthOver16 +
    			"  | multicase: " + multicase +
          "  | Has special characters: " + specialChar +
    			"  | Alphanumeric: " + alphanumeric +
    			"  | No consecutive characters: " + noConsecutiveChars +

    			"  | Points: " + points)

    			*/
}

//This function clears the password field
function clearPass(){
	psw.value = "";
	txtLengthOver8.innerHTML = "&#8287;";
	txtLengthOver16.innerHTML = "&#8287;";
	txtMulticase.innerHTML = "&#8287;";
	txtSpecialChar.innerHTML = "&#8287;";
	txtAlphanumeric.innerHTML = "&#8287;";
	txtNoConsecutiveChars.innerHTML = "&#8287;";
}
