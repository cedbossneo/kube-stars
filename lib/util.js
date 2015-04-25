(function(){
  var A = window.Asteroids = window.Asteroids || {};

  A.Util = {};

  A.Util.inherits = function (child, parent) {
    function Surrogate(){}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  A.Util.randAngle = function () {
    return Math.random() * 360;
  };
})();
