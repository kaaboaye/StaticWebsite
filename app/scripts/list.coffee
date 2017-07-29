@app.controller "List", ["$scope", "$http", ($scope, $http) ->
  $http(
    url: "https://jsonplaceholder.typicode.com/users"
    method: "GET"
  )
  .then (response) ->
    $scope.wojewudztwa = response.data
]
