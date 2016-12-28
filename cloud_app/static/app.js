$(document).ready(function () {
    $('#spclick').click(function () {
        console.log("Enter")
       var recognition = new webkitSpeechRecognition();
       recognition.onresult = function(event) {
           console.log(event);
           recognizedtext = event.results[0][0].transcript;
           console.log(recognizedtext);
           if (recognizedtext.toLowerCase() == "light on") {
               make_ajax("led1");
           }
           else if (recognizedtext.toLowerCase() == "light off"){
               make_ajax("led2");
           }
       };
       recognition.start();
    });
    $('#ledon').click(function(){
        console.log("led on");
        make_ajax("led1");
    });
    $('#led_off').click(function(){
        make_ajax("led2");
    });
    $('#btnclick').click(function () {
        console.log("bondy");
        //console.log(currentPosition);
        make_ajax("temp");
    });

    $('#toggle').click(function () {
        if ($('#txt').html() === 'Celcius') {
            $('#txt').html('Farenhiet');
            $('#temperature').text(convert_celcius_to_farenhiet($('#temperature').html() - 0));
        } else {
            $('#txt').html('Celcius');
            $('#temperature').text(convert_farenhiet_to_celcius($('#temperature').html() - 0));
        }
    });
});

function set_weather_icon(msg) {
    var cond;
    switch (msg.weather[0].main) {
    case 'Clouds':
        cond = 'cloudy';
        break;
    case 'Thunderstorm':
        cond = 'thunderstorm';
        break;
    default:
        cond = 'sunny';
    }
    $('#weather-icon').addClass('wi-day-' + cond);
}
function convert_kelvin_to_celcius(temp) {
    return round(temp - 273.15);
}
function convert_celcius_to_farenhiet(temp) {
    return round(9 * temp / 5 + 32);
}
function convert_farenhiet_to_celcius(temp) {
    return round(5 * (temp - 32) / 9);
}
function round(num) {
    return Math.round(num * 100) / 100;
}

function make_ajax(apiurl){
    base_url = "http://127.0.0.1:5000/";
    apiurl = base_url + apiurl;
    $.ajax({
            type: 'GET',
            url: apiurl,
            success: function (msg) {
                console.log(msg);
                $('#temperature').text(msg);
                var float_temp = parseFloat(msg);
                if(10<float_temp && float_temp<40)
                    make_ajax_temp('buzz');
                $('#toggle').removeAttr('style');
                //set_weather_icon(msg);
            }
        });
}

function make_ajax_temp(apiurl){
    base_url = "http://127.0.0.1:5000/";
    apiurl = base_url + apiurl;
    $.ajax({
            type: 'GET',
            url: apiurl,
            success: function (msg) {
                console.log(msg);
            }
        });
}