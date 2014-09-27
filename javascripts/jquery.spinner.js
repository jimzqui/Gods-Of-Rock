/*
 * jQuery Spinner plugin 1.0 - Custom plugin for Road to Fame
 *
 * Copyright (c) 2010 Disruptor Beam LLC
 * By Jimbo Quijano - jimzqui@yahoo.com
 *
 * $Id: jquery.gor.js 5741 2011-01-06 03:47:00Z jimbo.quijano $
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Created: 2011-01-06 | Updated:  0000-00-00 
 *
 */
 
// Create closure
(function($) {

  /* ------- Spinner ------- */

  // Spinner definition
  $.fn.spinner = function(options) {
    // Build main options before element iteration
    var opts = $.extend({}, $.fn.spinner.defaults, options);
	
	// Build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	  
	// If element is clicked, call display_spinner and instantiate overlay
	return this.live('click', function() {
	  // Instantiate overlay
	  var overlay_id = $(o.overlayArea).overlay({
	    overlayColor: o.overlayColor,
        overlayOpacity: o.overlayOpacity,
		overlayClose: o.overlayClose,
	    zIndex: 1000
	  });
	  
      return display_spinner(overlay_id, o);
	});
  };

  // Spinner defaults
  $.fn.spinner.defaults = {
    spinner: '/images/psychcdspin.gif',
	centerSpinner: true, // If centerSpinner is false, set coordinates below
	posLeft: 0,
	posTop: 0,
	fixedPosition: true, // If true, box will always stay to the position regardless of scrolling
	hasOverlay: true, // If hasOverlay is true, set the options below
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayArea: 'body',
	overlayClose: false
  };
  
  // Function for displaying spinner
  function display_spinner(overlay_id, o) {
    // Append spinner in the given element
	$('#overlaywrap_' + overlay_id).append('<img id="spinner" src="' + o.spinner + '" />');
	
	// Style and position spinner image
	$('#spinner').css({
	  'display': 'block',
	  'z-index': 1002
	});
	
	// If fixedPosition is true, set position as fixed
	if(o.fixedPosition == true) {
	  $('#spinner').css({
	    'position': 'fixed'
	  });
	}
	else {
	  $('#spinner').css({
	    'position': 'absolute'
	  });
	}
	
	// If centerSpinner is true, center the spinner image
	if(o.centerSpinner == true) {
	  var relative_height = $('#overlay_' + overlay_id).height() > $(window).height() ? $(window).height() : $('#overlay_' + overlay_id).height();
	  $('#spinner').css({
	    'left': $('#overlay_' + overlay_id).width() / 2 - $('#spinner').width() / 2,
	    'top': relative_height / 2 - $('#spinner').height() / 2
	  });
	}
	// If centerSpinner is false, set the given coordinates
	else {
	  $('#spinner').css({
	    'left': o.posLeft,
	    'top': o.posTop
	  });
	}
	
	return;
  }
		
// end of closure
})(jQuery);

