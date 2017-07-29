(function() {
  this.app.controller("List", [
    "$scope", "$http", function($scope, $http) {
      return $http({
        url: "https://jsonplaceholder.typicode.com/users",
        method: "GET"
      }).then(function(response) {
        return $scope.wojewudztwa = response.data;
      });
    }
  ]);

}).call(this);
