/*
 *	Site: MOAI MUSIC TOOLS
 *	Author: CHRISTOPHER MELVILLE
 *	Date: JUNE 2016
 *	Comments: BPM calculation module logic
 */

   /* * * * * * * * * * * * * * *
  *   CALCULATION LOGIC
  * * * * * * * * * * * * * * */
  window.onload = function() {
    calculate();
  };

  function calculate () {
    // get the variable values in from the DOM
    var bpm = document.getElementById('bpm').value;
    var denominator = document.getElementById('denominator').innerHTML;
    var numerator = document.getElementById('numerator').innerHTML;
    // pass values out to calculation modules
    var ms = milliseconds(bpm, numerator, denominator);
    var htz = frequency(ms);
    // finally pass calculated results back to the DOM for display
    console.log("bpm: "+bpm+", num: "+numerator+", den: "+denominator+", ms: "+ms+", htz: "+htz);
    updateDOM(ms, htz);
  }

  function milliseconds (bpm, num, den) {
    // 240000 / bpm = ms @ 1/1
    var ms = ( ( 240000 / bpm ) / den ) * num;
    return ms.toFixed(1);
  }

  function frequency (ms) {
    htz = 1000 / ms;
    return htz.toFixed(1);
  }

  // Update the display with newly calulcated results as the UI changes
  function updateDOM (ms, htz) {
    document.getElementById('msResult').innerHTML = ms+" milliseconds";
    document.getElementById('htzResult').innerHTML = htz+" htz";
  }

   /* * * * * * * * * * * * * * *
  * UI SLIDERS
  * * * * * * * * * * * * * * */

  // SLIDER UI-WIDGETS FOR TIMING SELECTION
  // TOP SLIDER - NUMERATOR
    $(function() {
      $( "#slider-numerator" ).slider({
        'value': 1,
        'min': 1,
        'max': 8,
        'step': 1,
        slide: function( event, ui ) {
          $( "#numerator" ).val( ui.value );
          updateNumerator();
          calculate();
        },
        stop: function ( event, ui ) {
          console.log("Current value:"+ $(this).slider('option', 'ui.value'));
        }
      });
      function updateNumerator() {
        $( "#numerator" ).html( $( "#slider-numerator" ).slider( "value" ) ); 
      }
    });
  // BOTTOM SLIDER - DENOMINATOR
    $(function() {
      $( "#slider-denominator" ).slider({
        value: 1,
        min: 1,
        max: 64,
        step: 1,
        slide: function( event, ui ) {
          $( "#denominator" ).val( ui.value );
          updateDenominator();
          calculate();
        },
        stop: function ( event, ui ) {
          console.log("Current value:"+ $(this).slider('option', 'value'));
        }
      });
      function updateDenominator () {
        $( "#denominator" ).html( $( "#slider-denominator" ).slider( "value" ) );
      }
    });