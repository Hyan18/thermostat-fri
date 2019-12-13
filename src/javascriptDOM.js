$( document ).ready(function() {

  var thermostat = new Thermostat();

  function updateTemperature(){
    $("#temperature").text(`${thermostat.temperature}°C`)
    $('#temperature').attr('class', thermostat.usage());
    console.log(thermostat.usage())
  };

  updateTemperature();

  $('#power-saving-status').text(thermostat.powerSaverStatus());

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
    $('#power-saving-status').text(thermostat.powerSaverStatus())
    updateTemperature();
  });

});
