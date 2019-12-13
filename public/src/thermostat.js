'use strict';

const DEFAULT_TEMPERATURE = 20
const MIN_TEMP = 10
const MAX_TEMP_PSM_ON = 25
const MAX_TEMP_PSM_OFF = 32

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
  if (this.powerSaverMode) return MAX_TEMP_PSM_ON;
  return MAX_TEMP_PSM_OFF
};

Thermostat.prototype.powerSaverSwitch = function(){
 this.powerSaverMode = !this.powerSaverMode

 if (this.powerSaverMode && this.temperature > MAX_TEMP_PSM_ON) this.temperature = this.maxTemp()
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
