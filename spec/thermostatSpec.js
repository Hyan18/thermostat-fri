'use strict';

describe("Thermostat", function() {

  var thermostat

  beforeEach(function(){
    thermostat = new Thermostat();
  });

  it("starts at 20 degrees", function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it('has a minimum temperature set at 10', function(){
    let thermostat = new Thermostat(10)
  
    expect(function() {
      thermostat.down();
    }).toThrowError('Temperature already at minimum');
  });

  describe('#up', function (){
    it("increases the temperature by 1", function(){
    thermostat.up()
    expect(thermostat.temperature).toEqual(21);
    });
  });

  describe('#down', function() {
    it('decreases the temperature by 1', function(){
      thermostat.down()
      expect(thermostat.temperature).toEqual(19);
    });
  });

  describe('in power saver mode', function(){
    it('default setting is on power saver mode ', function(){
      expect(thermostat.powerSaverMode).toEqual(true);
    });
    
    it('has a maximum temperature of 25', function(){
      let thermostat = new Thermostat(25)
      expect(function(){
        thermostat.up();
      }).toThrowError('Temperature already at maximum');
    });

    it('puts the temperature back down to the maximum if over it', function(){
      let thermostat = new Thermostat
      thermostat.powerSaverSwitch()

      var i
      for(i = 0; i < 10; i++) {
        thermostat.up()
      };

      thermostat.powerSaverSwitch()
      expect(thermostat.temperature).toEqual(25)
    });
  });

  it("should not have a max temperature of 25 when power saving mode is off", function() {
    let thermostat = new Thermostat(25);
    thermostat.powerSaverSwitch();

    expect(function() {
      thermostat.up();
    }).not.toThrow();
  });

  it("should have a max temperature", function() {
    let thermostat = new Thermostat(32);

    expect(function() {
      thermostat.up();
    }).toThrowError("Temperature already at maximum");
  });

  it('can reset the temperature to 20', function(){
    thermostat.up()
    expect(thermostat.temperature).not.toEqual(20)
    thermostat.reset()
    expect(thermostat.temperature).toEqual(20)
  });

  describe("#usage", function() {

    it("should return low-usage when temperature is below 18", function() {
      let thermostat = new Thermostat(17);

      expect(thermostat.usage()).toEqual("low-usage");
    });

    it("should return medium-usage when temperature is above 17 and below 25", function() {
      let thermostat = new Thermostat(18);

      expect(thermostat.usage()).toEqual("medium-usage");
    });

    it("should return high-usage when temperature is 25 or above", function() {
      let thermostat = new Thermostat(25);

      expect(thermostat.usage()).toEqual("high-usage");
    });

  });

});
