// name of app that appears in the body tag
angular.module('guitarscales-app', [])

	.controller('inputForm', function($scope) {

		$scope.chromatic = [
			{note:'e'},
			{note:'f'},
			{note:'f#'},
			{note:'g'},
			{note:'g#'},
			{note:'a'},
			{note:'a#'},
			{note:'b'},
			{note:'c'},
			{note:'c#'},
			{note:'d'},
			{note:'d#'}
		];

		$scope.intervals = [
			{name: 'Minor-Natural', steps: [2,1,2,2,1,2,2], chords: ['minor','dim','major','minor','minor','major','major']},
			{name: 'Minor-Harmonic', steps: [2,1,2,2,1,1,2], chords: ['minor','dim','aug','minor','major','major','dim']},
			{name: 'Minor-Melodic', steps: [2,1,2,2,1,2,2], chords: ['minor','minor','aug','major','major','dim','dim']},
			{name: 'Major', steps: [2,2,1,2,2,2,1], chords: ['major','minor','minor','major','major','minor','dim']},
		];

		$scope.tunings = [
			{name:"Standard",notes:"'e','a','d','g','b','e'"},
			{name:"Drop D",notes:"'d','a','d','g','b','e'"},
			{name:"open A",notes:"'e','a','c#','e','a','e'"},
			{name:"open B",notes:"'b','f#','b','f#','b','d#'"},
			{name:"open C",notes:"'c','g','c','g','c','e'"},
			{name:"open D",notes:"'d','a','d','f#','a','d'"},
			{name:"open E",notes:"'e','b','e','g#','b','e'"},
			{name:"open F",notes:"'f','a','c','f','c','f'"},
			{name:"open G",notes:"'g','g','d','g','b','d'"},
			{name:"A sus4",notes:"'e','a','d','e','a','e'"},
			{name:"B sus4",notes:"'b','f#','b','e','f#','b'"},
			{name:"C sus4",notes:"'c','g','c','g','c','f'"},
			{name:"D sus4",notes:"'d','a','d','g','a','d'"},
			{name:"E sus4",notes:"'e','b','e','a','b','e'"},
			{name:"G sus4",notes:"'d','g','d','g','c','d'"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
			// {name:"",notes:"'','','','','',''"},
		];

		
	});