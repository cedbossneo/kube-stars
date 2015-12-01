(function(){
  var A = window.Asteroids = window.Asteroids || {};

  A.Kubernetes = {};

  A.Kubernetes.getPods = function (callback) {
    $.getJSON('http://localhost:8080/api/v1/pods?labelSelector=game=starwars', callback);
  };

  A.Kubernetes.deletePod = function (pod, callback) {
    $.ajax({
      url: 'http://localhost:8080'+pod.metadata.selfLink,
      type: 'DELETE', success: callback
    });
  };

  A.Kubernetes.deleteReplicationController = function (rc, callback) {
    $.ajax({
      url: 'http://localhost:8080'+rc.metadata.selfLink,
      type: 'DELETE', success: callback
    });
  };

  A.Kubernetes.getReplicationControllers = function (callback) {
    $.getJSON('http://localhost:8080/api/v1/replicationcontrollers?labelSelector=game=starwars', callback);
  };
})();
