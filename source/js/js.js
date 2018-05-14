

/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define redips_init and random color generator
var redipsInit,
    rd,
    rndColor;

// redips initialization
redipsInit = function () {
    // reference to the REDIPS.drag lib
     rd = REDIPS.drag;
    // initialization
    rd.init();
    // dragged elements can be placed to the empty cells only
    rd.dropMode = 'single';
    // every change of current TD will have different background color
    rd.event.changed = function () {
        rd.hover.colorTd = rndColor();
    };
    rd.event.dropped = function () {
         //debugger;
        // var ddfd =  $( "#table2 .box-wrapper" );
        $( "#table2 .box-wrapper" ).resizable({
            //containment: "#table2"
        });
        $( "#table1 .ui-resizable" ).removeAttr("style");
        $( "#table1 .ui-resizable" ).resizable( "destroy" );
        $( "#table3 .ui-resizable" ).removeAttr("style");
        $( "#table3 .ui-resizable" ).resizable( "destroy" );


    };
    rd.enableDrag(false, '.redips-drag');
};

// random color generator - http://www.redips.net/javascript/random-color-generator/
function rndColor() {
    var hex = '0123456789ABCDEF'.split(''),
        color = '#', i;
    for (i = 0; i < 6 ; i++) {
        color = color + hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

// add onload event listener
if (window.addEventListener) {
    window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
    window.attachEvent('onload', redipsInit);
};

function enableDrop(e){

    var parent = e.parentNode;
    rd.enableDrag(true, parent);
};
function disableDrop(e){

    var parent = e.parentNode;
    rd.enableDrag(false, parent);
};
$(document).ready(function(){
    $( "#table2 .box-wrapper" ).resizable();
    $( "#table3 .box-wrapper" ).resizable();
    //$( ".box-wrapper" ).on( "resizestart", function( event, ui ) {
        //debugger;
        // var ddf= this;
        // var widget = $( "#table2 .box-wrapper" ).resizable( "widget" );
        //
        // ddf.style.position = "absolute";
        //
        // var parent =  ddf.parentNode;
        // parent.style.position = "relative";


    //} );

});


