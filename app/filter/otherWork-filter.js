'use strict';

module.exports = function() {
  return function(devs, bool=false) {
    if(bool === true) {
      devs = devs.filter(dev => {
        return dev.services.includes('otherwork')
      })
      return devs
    }
    return devs;
  };
};
