/*
 *	Site: MOAI MUSIC TOOLS
 *	Author: CHRISTOPHER MELVILLE
 *	Date: JUNE 2016
 *	Comments: Tap Tempo Module
 */

   /* * * * * * * * * * * * * * *
  *   Global Variables
  * * * * * * * * * * * * * * */
  var timeArray = [0, 0];
  var it = 0;

  // Tap time input
  function tap () {
  	// get time now in milliseconds
  	var now = Date.now();
  	// add time (miliseconds) to the array 
  	timeArray[it] = now;
  	// alternate pointer between the two array slots
  	if( it === 0 ) {
  		it = 1;
  	} else {
  		it = 0;
  	}
  	// calculate bpm
  	calculate();
  }

  // calculate the Beats per Minute
  function calculate() {
  	var difference = Math.max(timeArray[1], timeArray[0]) - Math.min(timeArray[1], timeArray[0]); 
  	var bpm = 60000 / difference;
  	display(bpm);
  }

  // Display reults in the display DOM
  function display(bpm) {
  	document.getElementById('tempo').innerHTML = bpm.toFixed(0);
  }
