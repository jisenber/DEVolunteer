'use strict';

module.exports = function() {
  return function(devs, bool=false) {
    if(bool === true) {
      devs = devs.filter(dev => {
        return dev.reviews.includes('2')
      })
      return devs
    }
    return devs;
  };
};
