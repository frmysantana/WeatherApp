/*Fremy Santana
Last worked on: July 4, 2017
Simple page that displays the weather at the user's location.
Work in Progress: 
1. Okay to use google images pictures? Maybe give credit to source in footer?
Done as part of the FreeCodeCamp curriculum.*/

$(document).ready(function() {
var temperature;
    
    var Temperature = function (longFahrenheit) {
    var fahrenheit = Math.round(longFahrenheit*10.0)/10.0;
    var celsius = Math.round(((longFahrenheit - 32)/1.8)*10.0)/10.0;
    this.getFahrenheit = function() {
        return fahrenheit;
    }
    this.getCelsius = function() {
        return celsius;
    }
    };
    
    function setBackground(strIcon) {
    /*Uses DarkSky API's current weather icon to set the background of the page to reflect the current weather.
    
    Arguments: A string representing the current weather icon.
    Returns: Nothing. The string is used to update the background to match the current weather.*/
    
    switch (strIcon) {
        case "clear-day":
        $("body").css("background-image","url('https://dncache-mauganscorp.netdna-ssl.com/thumbseg/418/418577-bigthumbnail.jpg')");
        break;
        case "clear-night":
        $("body").css("background-image","url('http://2il.org/wp-content/uploads/2015/12/CVqWELxWEAEEPsD.jpg')");
        break;
        case "rain":
        $("body").css("background-image","url('http://nowiknow.com/wp-content/uploads/2012/06/rain.jpeg')");
        break;
        case "snow":
        $("body").css("background-image","url('https://www.surfnetkids.com/resources/wp-content/uploads/2016/12/snow-720x477.jpg')");
        break;
        case "sleet":
        $("body").css("background-image","url('https://icons.wxug.com/data/wximagenew/t/TaylorTot/209.jpg')");
        break;
        case "wind":
        $("body").css("background-image","url('http://i1.trekearth.com/photos/3037/aovento.jpg')");
        break;
        case "fog":
        $("body").css("background-image","url('https://www.howitworksdaily.com/wp-content/uploads/2014/08/fog-06.jpg')");
        break;
        case "partly-cloudy-day":
        $("body").css("background-image", "url('http://3.bp.blogspot.com/-UWiXGXWk7iI/UIfYQcdyFEI/AAAAAAAACCo/XCrvNNFiPIc/s1600/C360_2012-10-21-15-49-40.jpg')");
        break;
        case "partly-cloudy-night":
        $("body").css("background-image", "url('https://cdn.shutterstock.com/shutterstock/videos/2303816/thumb/2.jpg')");
        break;
        case "cloudy":
        $("body").css("background-image", "url('https://ak8.picdn.net/shutterstock/videos/1456171/thumb/1.jpg')");
        break;
        //DarkSky may add more values that the current weather icon may have, so a default is needed.
        default:
        $("body").css("background-color", "rgba(53, 107, 183, 0.53)");
        break;
    }
    };
    
    function getWeather(position) {
    /*Uses a position object from geolocation to get the user's latitude and longitude and get the local weather from DarkSky API.
    
    Arguments: A position object returned from geolocation
    Returns: Nothing. The API response is used to display the weather on the page, and the icon feature is sent to the setBackground function.*/
    
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var urlEnd = latitude + "," + longitude;
    var proxy = "https://cors-anywhere.herokuapp.com/";  //DarkSky API does not allow Cross Origin Resource Sharing; this is a work-around
    var darkSkyLink = "https://api.darksky.net/forecast/2dbb98e763ef1d908e1218de49f186cf/";
        
    $.ajax({
        url: proxy + darkSkyLink + urlEnd, 
        success: function(data) {
            var weather = data.currently.summary; 
            //var temperature = Math.round(data.currently.temperature * 10.0)/10.0;
            //Use with the constructor
            temperature = new Temperature(data.currently.temperature);
            $("#weather").html(weather);
            $("#temperatureDisplay").html(temperature.getFahrenheit() + " &#176" + "F");
            setBackground(data.currently.icon);
        },
        error: function(jqXHR, exception) {
            alert("There was an error! Check the console.")
            console.log(jqXHR.status, exception);
        } 
        });
    };
    
    navigator.geolocation.getCurrentPosition(function(position) {
        getWeather(position);
    }, function(PositionError) {
        if (PositionError.code == 1) {
            alert("Please enable your browser's geolocation capabilities.");
        } else if (PositionError.code ==2) {
            alert("There was an internal error!");
        } else {
            alert("Geolocation ran out of time!");
        }
    });
    
    //Switches the displayed temperature between Fahrenheit and Celsius degrees.
    $("#convert").on("click", function(){
    var tempContent = $("#temperatureDisplay").html();
    /*if (tempContent.substr(tempContent.length-1, 1) == "F") {
        var celsius = Math.round(((parseFloat(tempContent) - 32)/1.8)*10)/10;
        $("#temperature").html(celsius + " &#176" + "C");
    } else {
        var fahrenheit = Math.round(((parseFloat(tempContent) *1.8) + 32)*10)/10;
        $("#temperature").html(fahrenheit + " &#176" + "F");
    }*/
    
    if (tempContent.substr(tempContent.length-1, 1) == "F") {
        $("#temperatureDisplay").html(temperature.getCelsius() + " &#176" + "C");
    } else {
        $("#temperatureDisplay").html(temperature.getFahrenheit() + " &#176" + "F");
    }
    });
});
