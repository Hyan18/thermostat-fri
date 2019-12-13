$( document ).ready(function() {

  var thermostat = new Thermostat();

  function postData(){
    $.ajax({
      type: "POST",
      url: '/temperature',
      data: {temperature: thermostat.temperature, psm: thermostat.powerSaverMode},
      dataType: 'json',
      success: function() {},
      error: function() { alert("Error") }
  });
};

  function getData(){
    $.ajax({
      type: "GET",
      url: '/temperature',
      success: function(response) {
        obj = JSON.parse(response)
        thermostat.temperature = obj.temperature
        thermostat.powerSaverMode = JSON.parse(obj.psm)

        updateTemperature()
        updatePSM()
      },
      error: function() { alert("Error") }
  });
};

  function updateTemperature(){
    $("#temperature").text(`${thermostat.temperature}°C`)
    $('#temperature').attr('class', thermostat.usage());
    postData()
  };

  function updatePSM(){
    $('#power-saving-status').text(thermostat.powerSaverStatus())
    postData()
  };

  getData()
  updateTemperature();
  updatePSM();

  $('#up').click(function( event ) {
    thermostat.up()
    updateTemperature();
  });

  $('#down').click(function( event ) {
    thermostat.down()
    updateTemperature();
  });

  $('#reset').click(function( event ) {
    thermostat.reset()
    updateTemperature();
  });

  $('#powerSaverSwitch').click(function( event ) {
    thermostat.powerSaverSwitch()
    updatePSM();
    updateTemperature();
  });

  $.get("https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=1682649219a5a9b2fa7914564a828452", function(data) {
  $("#weather").html(`${data.main.temp}°C`);
  });

});
