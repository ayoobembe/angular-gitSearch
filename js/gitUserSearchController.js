githubUserSearch.controller('GitUserSearchController', function($scope, $resource){

	var searchResource = $resource('https://api.github.com/search/users');

  $scope.doSearch = function() {
    // $scope.$apply();
    $scope.searchResult = searchResource.get({
    	q: $scope.searchTerm,
    	access_token: "521f883ea1edb29c2d43c1f5091afc8cfc79ea62" 
    });

	};

}); 