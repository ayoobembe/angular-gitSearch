describe('GitUserSearchController', function(){
	beforeEach(module('GitUserSearch'));

	var scope, ctrl;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('GitUserSearchController', {
			$scope: scope
		});
	}));

	it('should initialize with an empty search result and term', function(){
		expect(scope.searchResult).toBeUndefined();
		expect(scope.searchTerm).toBeUndefined();
	});
	

	describe('when searching for a user', function() {

		var httpBackend;
		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend
			httpBackend
				.when("GET", "https://api.github.com/search/users?access_token=521f883ea1edb29c2d43c1f5091afc8cfc79ea62&q=hello")
				.respond({
					items: items
				});
			}));

  var items = [{
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "https://github.com/tansaku"
    }, {
      "login": "stephenlloyd",
      "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
      "html_url": "https://github.com/stephenlloyd"
  }];

	  it('should display search results', function() {
	  	scope.searchTerm = 'hello';
	  	scope.doSearch();
	  	// scope.$apply();
	  	httpBackend.flush();
	    expect(scope.searchResult.items).toEqual(items);
	  });

	});

	describe('having clicked on a user', function(){

		var httpBackend;
		beforeEach(inject(function($httpBackend) {
			httpBackend = $httpBackend
			httpBackend
				.when("GET", "https://api.github.com/search/users?access_token=521f883ea1edb29c2d43c1f5091afc8cfc79ea62&q=Callisto13")
				.respond({
					items: items
				});
			}));

		  var items = [{
      "login": "Callisto13",
      "avatar_url": "https://avatars.githubusercontent.com/u/8898786?v=3",
      "html_url": "https://github.com/Callisto13"
  }];

		it('it should pull up users github page', function(){
			scope.searchTerm = 'Callisto13';
	  	scope.doSearch();
	  	// scope.$apply();
	  	httpBackend.flush();
	    expect(scope.searchResult.items).toEqual(items);
	    // expect(scope.searchResult.items["avatar_url"]).toEqual("https://avatars.githubusercontent.com/u/8898786?v=3");
		});
			
	});

});


