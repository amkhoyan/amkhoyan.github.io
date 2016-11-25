angular.module('tyru', ['treeControl'])
.controller('MainCtrl', ['$http', '$timeout', function ($http, $timeout) {
  var ctrl = this;

  ctrl.loadingTime = 1500;
  ctrl.treeModel = [];
  ctrl.treeOptions = {
    dirSelectable: false,    // Click a folder name to expand (not select)
    isLeaf: function isLeafFn(node) {
      return !node.hasOwnProperty('children');
    }
  };

  ctrl.fetchChildNodes = function fetchChildNodes(node, expanded) {
    function doFetch(node) {
      if (node.hasOwnProperty('children')) {
        console.log('GET ' + node.children);
        $http.get(node.children)
          .success(function(data) {
            console.log('GET ' + node.children + ' ... ok! ' + angular.toJson(data));
            node.children = data;
          });
      } else {
        // Leaf node
      }
    }

    if (node._sent_request) {
      return;
    }
    node._sent_request = true;
    // Add a dummy node.
    node.children = [{name: 'Loading ...'}];
    $timeout(function() { doFetch(node) }, ctrl.loadingTime);
  };

  $http.get('root.json')
  
    .success(function(data) {
      ctrl.treeModel = data;
    });

}]);