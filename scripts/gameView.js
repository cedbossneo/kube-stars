(function () {
  var A = window.Asteroids = window.Asteroids || {};

  var GameView = A.GameView = function (ctx) {
    this.ctx = ctx;
    window.addEventListener("keydown", function(e) {
      if([32, 37, 38, 39, 40, 87, 65, 83, 68].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);
  };

  GameView.prototype.start = function () {
    for (var i = 3; i > 0; i--) {
      var idStr = "xwing-img-" + i;
      document.getElementById(idStr).style.visibility = 'visible';
    }

    var currentGame = new A.Game();

    currentGame.addShip();
    var updateFrames = setInterval(function () {
      currentGame.step();
      currentGame.draw(this.ctx);
      if(currentGame.lives === 0){
        clearInterval(updateFrames);
      }
    }.bind(this), 20);
    var updateKubernetes = setInterval(function () {
      A.Kubernetes.getPods(function(pods){
        for (var i = 0; i < pods.items.length; i++){
          if (pods.items[i].status.conditions.length === 1
            && pods.items[i].status.conditions[0].type === 'Ready'
            && pods.items[i].status.conditions[0].status === 'True'
            && !currentGame.fighterExist(pods.items[i])){
            currentGame.addTieFighter(pods.items[i]);
          }
        }
      });
      A.Kubernetes.getReplicationControllers(function(rcs){
        for (var i = 0; i < rcs.items.length; i++){
          if (!currentGame.destroyerExist(rcs.items[i])){
            currentGame.addStarDestroyer(rcs.items[i]);
          }
        }
      });
    }, 1000);
  };
})();
