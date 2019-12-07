
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



