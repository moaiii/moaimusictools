/*
 *	Site: MOAI MUSIC TOOLS
 *	Author: CHRISTOPHER MELVILLE
 *	Date: JUNE 2016
 *	Comments: Guitar Scales Module
 */

/* * * * * * * * * * * * * * *
*   GLOBAL ARRAYS
* * * * * * * * * * * * * * */

  // 2d-array containing each string tunning (6 strings)
  var strings = [];

  // 2d-array of scales for each mode in the set (7 modes I > VII)
  var modes = [];

/* * * * * * * * * * * * * * *
*   INITIALISATION
* * * * * * * * * * * * * * */

// Load tunning layout as soon as the page has loaded
window.onload = function(){

}

function runMain () {
	tunning();
	keyInput();
	canvas();
	showDiv();
}

/* * * * * * * * * * * * * * *
*   OUTPUT [CANVAS DRAWINGS]
* * * * * * * * * * * * * * */

function canvas () {
	console.log("modes: "+modes);
	// loop through all canvas'
	for(var c=0; c<7; c++) {
		var id = "canvas-"+(c+1);
		var canvas = document.getElementById(id).getContext('2d');
		
		// starting co-ordinates
		var yC = 45; // vertical distance (from top edge) of active co-ordinate
		var xC = 45; // horizontal distance (from left edge) of active co-ordinate

		// header tags of fret number and string name
		canvas.fillText("0",45-4,15);
		canvas.fillText("3",135-4,15);
		canvas.fillText("5",195-4,15);
		canvas.fillText("7",255-4,15);
		canvas.fillText("9",315-4,15);
		canvas.fillText("12",405-5,15);
		canvas.fillText("15",495-5,15);
		canvas.fillText("17",555-5,15);
		canvas.fillText("19",605,15);

		// loop strings
		for (var s=0; s<6; s++) {
			// loop frets
			for(var f=0; f<22; f++) { //only need to check the first 12 frets, if no match is made then no match is possible from 12-24
				// fret note
				canvas.font="15px Georgia";
				canvas.fillText(strings[s][f],xC-4,yC+3); //-4 to centre text
				// create fret
				canvas.beginPath();
				canvas.arc(xC,yC,15,0,2*Math.PI);
				for(var x=0; x<22; x++){
					if(strings[s][f] === modes[c][x]){
						// console.log("strings[s ("+s+")][f ("+f+")]: "+strings[s][f]+">>> modes[c ("+c+")][x ("+x+")]"+modes[c][x]);
						canvas.fillStyle = "#FF3B3F";
						canvas.fill();	
						break;					
					}
				}
				canvas.stroke();
				xC += 30;
			}
			yC += 30;
			xC = 45;		
		}
	}
}


function keyInput() {
	// load in the user select form
	var x = document.forms["key"];
	// get the root note from the DOM
	var selectedNote = document.getElementById("selectedNote").innerHTML;
	// get the interval from the DOM and break into a usable array
	var selectedInterval = document.getElementById("selectedInterval").innerHTML;
	var intervalArray = DOMtoArray(selectedInterval);
	// get the chords from the DOM and break into a usable array
	var selectedChords = document.getElementById("selectedChords").innerHTML;
	var sEdit = selectedChords.replace(/['"]+/g, '');
	var chordsArray = DOMtoArray(sEdit);
	// call the note calculation function
	var scale = getNotes(selectedNote, intervalArray, false); // master level SCALE
	// highlightFretboard(scale);
	scaleOut(scale, chordsArray); // send master level scale to get scale pyramid scales

	return true;
}


/*	----------------------------------------------------------
	Scale output and clear functions
----------------------------------------------------------- */
function scaleOut(scale, chords) {
	$(".scaleList").remove(); //clear before adding new list
	// append the note type to the notes in the scale array (i.e. major, minor)
	for(var i=0; i<7; i++) {
		var int = chords[i];
		scale[i] += "-"+int;
		subScales(scale[i],(i+1));
	}
}


/*	----------------------------------------------------------
	Scale output and clear functions
----------------------------------------------------------- */
function subScales (scale, mode) {
	var stringRaw = scale.split("-");
	var note = stringRaw[0];
	var steps = stringRaw[1];

	var interval;
	if (steps === 'major') {
		interval = [2,2,1,2,2,2,1];
	} else if (steps === 'minor') {
		interval = [2,1,2,2,1,2,2];
	} else {
		interval = [2,1,2,2,1,2,2];
	}

	// append info to the accordian header
	var id = "#fb-"+mode+"-header";
	$(id).prepend(note.toUpperCase()+" - "+steps);

	var scale = getNotes(note, interval, true);
}

/*	----------------------------------------------------------
	Modular method to break the literal strings from the DOM 
	into arrays that Javascript functions can use 
----------------------------------------------------------- */
function DOMtoArray(string) { 
	var strLen = string.length;
	// break off the array enclosures '[' & ']'
	var strEdit = string.slice(1,length-1);
	// slice the string from the DOM into a useable JS array
	var output = strEdit.split(",");
	return output;
}


/*	----------------------------------------------------------
	Modular method to break the literal strings from the DOM 
	into arrays that Javascript functions can use 
----------------------------------------------------------- */
function tunning () {
	// set up tuning intervals 22 x 1 steps
	var ones = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	// clear the global tunning array
	strings = [];
	// get tuning selection from the DOM
	var t = document.getElementById("selectedTuning").innerHTML; 
	// remove quote marks ''
	var tEdit = t.replace(/['']+/g, '');
	var tuning = tEdit.split(",");
	// get full chromatic line starting from string root (fret = 0)
	// send to getNotes() to build the chromatic array
	for (var i=0; i<6; i++) { //6 = number of strings
		var notes = getNotes(tuning[i], ones, false);
		// push to the global tuning array variable
		strings.push(notes);
	}
}


/* ----------------------------------------------------------
	get array of notes based on the root and type of 
	interval set (major, minor etc) 
---------------------------------------------------------- */ 
function getNotes(root, intervals, mode) { //module returns valid notes
	//initialise the arrays (intervals array passed as param)
	var chromaticScale = [	'e','f','f#','g','g#','a','a#','b','c','c#','d','d#', 
							'e','f','f#','g','g#','a','a#','b','c','c#','d','d#', 
							'e','f','f#','g','g#','a','a#','b','c','c#','d','d#',
							'e','f','f#','g','g#','a','a#','b','c','c#','d','d#', 
							'e','f','f#','g','g#','a','a#','b','c','c#','d','d#' 
	];
	var neckSize = 22;
	var notes = []; // main notes array 
	var iI = 0; // index pointer for the Intervals array
	var iC = whereOnChromatic(root); // index pointer for the Chromatic array
	notes.push(chromaticScale[iC])
	// loop over the INTERVALS array
	// add to cumulative jump (integer) from start index
	for (var j=0; j<neckSize; j++) {
		iC += parseInt(intervals[iI]); // add interval amount to the iC
		notes.push(chromaticScale[iC]);
		iI++; // move iI to next slot
		//circulate back to start of INTERVAL if pointer is at the end
		if (iI > (intervals.length-1)){ // iI beyond scope of array 
			iI = 0;
		}
	}
	if(mode){
		modes.push(notes);
	}
	// Return the notes array
	return notes;
}


/* ----------------------------------------------------------
	look up position of note on chromatic scale
---------------------------------------------------------- */ 
function whereOnChromatic(note) {
	//initialise the arrays (intervals array passed as param)
	var chromaticScale = ['e','f','f#','g','g#','a','a#','b','c','c#','d','d#'];
	// position of note on chromatic scale
	var index = 0;
	// loop over chromatic scale loking for match
	for (var i=0; i<chromaticScale.length; i++) { // '12' as only 1 octave search needed
		if(chromaticScale[i] == note) { 
			index = i; // record index match was made on 
			break; // match found, break out of loop
		} 
	}
	return index;
}

/* ----------------------------------------------------------
	page animations
---------------------------------------------------------- */ 
// accordion
$(function() {
	$( "#accordion" ).accordion({
		heightStyle: "content"
	});
});


/*	----------------------------------------------------------
	Show output divs 
----------------------------------------------------------- */
function showDiv() {
	$("#output").css("display","block");
	$("#neck").css("display","block");
}

