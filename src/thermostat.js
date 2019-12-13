'use strict';

const DEFAULT_TEMPERATURE = 20;
const MIN_TEMP = 10

function Thermostat(temperature = DEFAULT_TEMPERATURE) {
  this.temperature = temperature;
  this.powerSaverMode = true
};

Thermostat.prototype.up = function(){
  if (this.temperature >= this.maxTemp()) throw new Error('Temperature already at maximum')
  this.temperature ++
};

Thermostat.prototype.down = function(){
  if (this.temperature <= MIN_TEMP) throw new Error('Temperature already at minimum');
  this.temperature --
};

Thermostat.prototype.maxTemp = function(){
  if (this.powerSaverMode) return 25;
  return 32
};

Thermostat.prototype.powerSaverSwitch = function(){
 this.powerSaverMode = !this.powerSaverMode

 if (this.powerSaverMode) this.temperature = this.maxTemp()
};

Thermostat.prototype.reset = function(){
  this.temperature = 20
};

Thermostat.prototype.usage = function(){
  if (this.temperature < 18) {
    return 'low-usage'
  }
  else if (this.temperature < 25) {
    return 'medium-usage'
  }
  return 'high-usage'
};

Thermostat.prototype.powerSaverStatus = function() {
  if (this.powerSaverMode) return "on"
  return "off"
};
