/*
 *	Site: MOAI MUSIC TOOLS
 *	Author: CHRISTOPHER MELVILLE
 *	Date: JUNE 2016
 *	Comments: Note Frequency mdule
 */

   /* * * * * * * * * * * * * * *
  *   
  * * * * * * * * * * * * * * */

  // Load tunning layout as soon as the page has loaded
window.onload = function(){
	getDomInput();
}



function getDomInput() {
	// get the note selection
	var n = document.getElementById('noteSelection');
	var note = n.options[n.selectedIndex].value;
	// get the key selection
	var k = document.getElementById('keySelection');
	var key = k.options[k.selectedIndex].value;
	// get the interval steps from the key
	var ints = getIntervals(key);
	// get the allowed notes in the scale
	var allNotes = getNotes(note,ints);

	updateDisplay(allNotes);
}


function updateDisplay(allNotes) {

	// update the Ref-notes in left most column 
	for(var i=1; i<13; i++) {
		var idSelector = "n"+i;
		document.getElementById(idSelector).innerHTML = allNotes[i-1];		
	}

	// update the tables frequencies
	for (var n=1; n<13; n++) {
		var intermediate = noteFrequency(allNotes[n-1]);
		for(var o=1; o<10; o++) {
			var idSelector = "n"+n+"o"+o;
			document.getElementById(idSelector).innerHTML = intermediate[o-1];		
		}
	}
}

/*	----------------------------------------------------------
	step intervals between the scales notes
----------------------------------------------------------- */
function getIntervals (key) {

	if (key === 'Major') {
		intervals = [2,2,1,2,2,2,1];
	} else if (key === 'NaturalMinor') {
		intervals = [2,1,2,2,1,2,2];
	} else if (key === 'MelodicMinor') {
		intervals = [2,1,2,2,1,2,2];
	} else if (key === 'HarmonicMinor'){
		intervals === [2,1,2,2,1,1,2];
	} else {
		intervals === ['error: could not display intervals'];
	}
	return intervals;
}

/* ----------------------------------------------------------
	get array of notes based on the root and type of 
	interval set (major, minor etc) 
---------------------------------------------------------- */ 
function getNotes(root, intervals) { 
	//initialise the arrays (intervals array passed as param)
	var chromaticScale = [	'E','F','F#','G','G#','A','A#','B','C','C#','D','D#', 
							'E','F','F#','G','G#','A','A#','B','C','C#','D','D#', 
							'E','F','F#','G','G#','A','A#','B','C','C#','D','D#',
							'E','F','F#','G','G#','A','A#','B','C','C#','D','D#', 
							'E','F','F#','G','G#','A','A#','B','C','C#','D','D#' 
	];

	var notes = []; // main notes array 
	var iI = 0; // index pointer for the Intervals array
	var iC = startingIndex(root); // index pointer for the Chromatic array
	notes.push(chromaticScale[iC]);

	// loop over the INTERVALS array
	// add to cumulative jump (integer) from start index
	for (var j=0; j<12; j++) {
		iC += parseInt(intervals[iI]); // add interval amount to the iC
		notes.push(chromaticScale[iC]);
		noteFrequency(chromaticScale[iC]);
		iI++; // move iI to next slot
		//circulate back to start of INTERVAL if pointer is at the end
		if (iI > (intervals.length-1)){ // iI beyond scope of array 
			iI = 0;
		}
	}
	// Return the notes array
	return notes;
}


/* ----------------------------------------------------------
	look up position of starting note on chromatic scale
---------------------------------------------------------- */ 
function startingIndex(note) {
	//initialise the arrays (intervals array passed as param)
	var chromaticScale = ['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'];
	// loop over chromatic scale loking for match
	for (var i=0; i<chromaticScale.length; i++) { // '12' as only 1 octave search needed
		if(chromaticScale[i] == note) { 
			var index = i; // record index match was made on 
			break; // match found, break out of loop
		} 
	}
	return index;
}

/* ----------------------------------------------------------
	look up position of note on chromatic scale
---------------------------------------------------------- */ 
function noteFrequency (note) {
	// array of frequencies for note passed
	var noteFrequencyTable = [];
	// find base index 
	var index = startingIndex(note);
	// base freq of notes in HTz
	// e, f, f#, g, g#, a, a#, b, c, c#, d, d# 
	var base = [20.60,21.83,23.12,24.50,25.96,27.50,29.14,30.87,16.35,17.32,18.35,19.45];
	// push the first base freq to the array 
	noteFrequencyTable.push(base[index]);
	// populate the table for 8 octaves
	for (var i=1; i<9; i++) {
		var freq = noteFrequencyTable[(i-1)]*2;
		noteFrequencyTable.push(freq.toFixed(1));
	}
	return noteFrequencyTable;
};

	
