/*
 * jQuery GoR plugin 1.0 - Custom plugin for Gods of Rock
 *
 * Copyright (c) 2010 Disruptor Beam LLC
 * By Jimbo Quijano - jimzqui@yahoo.com
 *
 * $Id: jquery.gor.js 5741 2010-06-21 15:22:16Z jimbo.quijano $
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Created: 2010-06-21 | Updated:  2010-08-10 
 *
 */
 
// Create closure
(function($) {

	"use strict";

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
  
  /* ------- Overlay ------- */
  
  var overlay_id = 0;
  
  // Overlay definition
  $.fn.overlay = function(options) {
    // Increment overlay id
	overlay_id++;
	
    // Build main options before element iteration
    var opts = $.extend({}, $.fn.overlay.defaults, options);
	
	// Build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	  
	// Append the overlay markup
    this.append('<div class="overlaywrap" id="overlaywrap_' + overlay_id + '"><div class="overlay" id="overlay_' + overlay_id + '"></div></div>');
	// Style and position background overlay according to the default options or the given options
	
	$('#overlay_' + overlay_id).css({
	  'background': o.overlayColor,
	  'opacity': o.overlayOpacity,
      'z-index': o.zIndex,
	  'top': 0,
	  'left': 0,
	  'width': '100%'
	});
	
	if(this.is('body')){
	  $('#overlay_' + overlay_id).css({
	    'position': 'fixed',
	    'height': this.height()
	  });
	}
	else{
	  $('#overlay_' + overlay_id).css({
	    'position': 'absolute',
	    'height': '100%'
	  });
	}
	
	// Remove overlaywrap and its content if background overlay is clicked
	$('#overlay_' + overlay_id).live('click', function() {
	  if(o.overlayClose == true){
	    var this_id = $(this).attr('id');
		var this_id_split = this_id.split('_');
	    $('#overlaywrap_' + this_id_split[1]).remove();
	  }
	});
	
	return overlay_id;
  };

  // Spinner defaults
  $.fn.overlay.defaults = {
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayClose: false,
	zIndex: 999
  };
  
  /* ------- GoR modal ------- */
  
  // GoR modal definition
  $.fn.gormodal = function(options, markup) {
    // Build main options before element iteration
    var opts = $.extend({}, $.fn.gormodal.defaults, options);
	
	// Build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	  
	  // Instantiate overlay
	  var overlay_id = $(o.overlayArea).overlay({
	    overlayColor: o.overlayColor,
        overlayOpacity: o.overlayOpacity,
		overlayClose: o.overlayClose,
	    zIndex: 999
	  });
	  
	  // Call function to initialize modal markup
	  $('#overlaywrap_' + overlay_id).append(init_modal(markup));
	  
	  // Remove modal if close button is clicked
	  $('#modalclose').live('click', function() {
	    $('#overlaywrap_' + overlay_id).remove();
	  });
	  
	  // Display modal
	  return display_modal(o);
  };
  
  // GoR modal defaults
  $.fn.gormodal.defaults = {
    modalType: 'itemmodal',
	width: 'auto',
	height: 'auto',
	centerModal: true, // If centerModal is false, set coordinates below
	posLeft: 0,
	posTop: 0,
	fixedPosition: true,
	hasOverlay: true, // If hasOverlay is true, set the options below
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayArea: 'body',
	overlayClose: true
  };
  
  // Initialize modal markup
  function init_modal(content) {
	var markup = '<div id="modal">';
	markup += '<a id="modalclose"></a>';
	markup += '<div id="modalcontent-wrap">';
	markup += '<div id="modalcontent">';
	markup += content;
	markup += '</div>';
	markup += '</div>';
	markup += '</div>';
	
	return markup;
  }
  
  // Fuction for displaying Modal
  function display_modal(o) {
	// Style and position modal according to type
	if(o.modalType == 'itemmodal') {
	  var modalcontent_padding = 20;
	  modalcontent_padding = o.modalType == 'itemmodal' ? modalcontent_padding - 11 : modalcontent_padding;
      var modal_height = (o.height == 'auto' ? $('#modalcontent').children('div:first-child').height() : $('#modal').height()) + modalcontent_padding * 2;
	  var modal_width = (o.width == 'auto' ? $('#modalcontent').children('div:first-child').width() : $('#modal').width()) + modalcontent_padding * 2;
	
	
      $('#modal').css({
        'width': modal_width,
	    'height': modal_height,
        'padding': 10,
        'background': '#000',
        'display' : 'block',
        'z-index' : 1000,
        'border': '1px dashed #FFFFFF',
        '-moz-border-radius': 5
	  });
	  
	  $('#modalcontent').css({
        'float': 'left',
		'padding': modalcontent_padding
	  });
	  
	  // Style and position close button for the modal
	  $('#modalclose').css({
	    'background': 'url(/images/modalclose.png) no-repeat',
	    'width': 14,
	    'height': 13,
	    'position': 'absolute',
	    'top': 0,
	    'right': 0,
	    'overflow': 'hidden',
	    'cursor': 'pointer',
		'z-index': 1
	  });
	}
	
	else if(o.modalType == 'announcemodal') {
	  var modalcontent_padding = 15;
	  modalcontent_padding = o.modalType == 'itemmodal' ? modalcontent_padding - 11 : modalcontent_padding;
      var modal_height = (o.height == 'auto' ? $('#modalcontent').children('div:first-child').height() : $('#modal').height()) + modalcontent_padding * 2;
	  var modal_width = (o.width == 'auto' ? $('#modalcontent').children('div:first-child').width() : $('#modal').width()) + modalcontent_padding * 2;
	
	  $('#modal').css({
		'width': modal_width,
		'height': modal_height,
		'padding': 13,
		'background': 'none',
		'border': 'none',
		'display': 'block',
		'z-index': 1000
	  });
	  
	  $('#modalcontent-wrap').css({
	    'background': '#000 url(/images/bg-announcemodal.png) repeat-x',
        'float': 'left',
		'position': 'relative',
		'z-index': 1
	  });
	  
	  $('#modalcontent').css({
	    'background': 'url(/images/amodal-decor1.png) no-repeat',
        'float': 'left',
		'position': 'relative',
		'z-index': 1,
		'padding': modalcontent_padding
	  });
	  
	  // Style and position close button for the modal
	  $('#modalclose').css({
	    'background': 'url(/images/amodalclose.png) no-repeat',
	    'width': 22,
	    'height': 22,
	    'position': 'absolute',
	    'top': 9,
	    'right': 9,
	    'overflow': 'hidden',
	    'cursor': 'pointer',
		'z-index': 2
	  });
	  
	  var markup = '<div class="modal-tr"></div>';
      markup += '<div class="modal-tl"></div>';
      markup += '<div class="modal-br"></div>';
      markup += '<div class="modal-bl"></div>';
      markup += '<div class="modal-top"></div>';
      markup += '<div class="modal-bottom"></div>';
      markup += '<div class="modal-left"></div>';
	  markup += '<div class="modal-right"></div>';
	  markup += '<img class="modal-splatterleft" src="/images/amodal-decor2.png" alt="" />';
	  markup += '<img class="modal-splatterright" src="/images/amodal-decor3.png" alt="" />';
	  $('#modal').append(markup);
	  
	  $('#modal .modal-splatterleft').css({
		'position': 'absolute',
		'z-index': 0,
		'left': -78,
		'top': -80
	  });
	  
	  $('#modal .modal-splatterright').css({
		'position': 'absolute',
		'z-index': 0,
		'right': -40,
		'bottom': -55
	  });
	  
	  $('#modal .modal-tr').css({
	    'background': 'url(/images/amodal-tr.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'right': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-tl').css({
	    'background': 'url(/images/amodal-tl.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-br').css({
	    'background': 'url(/images/amodal-br.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'right': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-bl').css({
	    'background': 'url(/images/amodal-bl.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-top').css({
	    'background': 'url(/images/amodal-top.png) repeat-x',
        'width': modal_width,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'left': 13,
		'z-index': 1
	  });
	  
	  $('#modal .modal-bottom').css({
	    'background': 'url(/images/amodal-bottom.png) repeat-x',
        'width': modal_width,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'left': 13,
		'z-index': 1
	  });
	  
	  $('#modal .modal-left').css({
	    'background': 'url(/images/amodal-left.png) repeat-y',
        'width': 13,
        'height': modal_height,
        'position': 'absolute',
        'top': 13,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-right').css({
	    'background': 'url(/images/amodal-right.png) repeat-y',
        'width': 13,
        'height': modal_height,
        'position': 'absolute',
        'top': 13,
        'right': 0,
		'z-index': 1
	  });
	}
	
	else if(o.modalType == 'bluemodal') {
	  var modalcontent_padding = 15;
	  modalcontent_padding = o.modalType == 'itemmodal' ? modalcontent_padding - 11 : modalcontent_padding;
      var modal_height = (o.height == 'auto' ? $('#modalcontent').children('div:first-child').height() : $('#modal').height()) + modalcontent_padding * 2;
	  var modal_width = (o.width == 'auto' ? $('#modalcontent').children('div:first-child').width() : $('#modal').width()) + modalcontent_padding * 2;
	
	  $('#modal').css({
		'width': modal_width,
		'height': modal_height,
		'padding': 13,
		'background': 'none',
		'border': 'none',
		'display': 'block',
		'z-index': 1000
	  });
	  
	  $('#modalcontent-wrap').css({
	    'background': '#000 url(/images/bg-announcemodal.png) repeat-x',
        'float': 'left',
		'position': 'relative',
		'z-index': 1
	  });
	  
	  $('#modalcontent').css({
        'float': 'left',
		'position': 'relative',
		'z-index': 1,
		'padding': modalcontent_padding
	  });
	  
	  // Style and position close button for the modal
	  $('#modalclose').css({
	    'background': 'url(/images/amodalclose.png) no-repeat',
	    'width': 22,
	    'height': 22,
	    'position': 'absolute',
	    'top': 9,
	    'right': 9,
	    'overflow': 'hidden',
	    'cursor': 'pointer',
		'z-index': 2
	  });
	  
	  var markup = '<div class="modal-tr"></div>';
      markup += '<div class="modal-tl"></div>';
      markup += '<div class="modal-br"></div>';
      markup += '<div class="modal-bl"></div>';
      markup += '<div class="modal-top"></div>';
      markup += '<div class="modal-bottom"></div>';
      markup += '<div class="modal-left"></div>';
	  markup += '<div class="modal-right"></div>';
	  $('#modal').append(markup);
	  
	  $('#modal .modal-tr').css({
	    'background': 'url(/images/amodal-tr.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'right': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-tl').css({
	    'background': 'url(/images/amodal-tl.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-br').css({
	    'background': 'url(/images/amodal-br.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'right': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-bl').css({
	    'background': 'url(/images/amodal-bl.png) no-repeat',
        'width': 13,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-top').css({
	    'background': 'url(/images/amodal-top.png) repeat-x',
        'width': modal_width,
        'height': 13,
        'position': 'absolute',
        'top': 0,
        'left': 13,
		'z-index': 1
	  });
	  
	  $('#modal .modal-bottom').css({
	    'background': 'url(/images/amodal-bottom.png) repeat-x',
        'width': modal_width,
        'height': 13,
        'position': 'absolute',
        'bottom': 0,
        'left': 13,
		'z-index': 1
	  });
	  
	  $('#modal .modal-left').css({
	    'background': 'url(/images/amodal-left.png) repeat-y',
        'width': 13,
        'height': modal_height,
        'position': 'absolute',
        'top': 13,
        'left': 0,
		'z-index': 1
	  });
	  
	  $('#modal .modal-right').css({
	    'background': 'url(/images/amodal-right.png) repeat-y',
        'width': 13,
        'height': modal_height,
        'position': 'absolute',
        'top': 13,
        'right': 0,
		'z-index': 1
	  });
	}
	
	else{
	  var modalcontent_padding = 20;
	  modalcontent_padding = o.modalType == 'itemmodal' ? modalcontent_padding - 11 : modalcontent_padding;
      var modal_height = (o.height == 'auto' ? $('#modalcontent').children('div:first-child').height() : $('#modal').height()) + modalcontent_padding * 2;
	  var modal_width = (o.width == 'auto' ? $('#modalcontent').children('div:first-child').width() : $('#modal').width()) + modalcontent_padding * 2;
	
	  $('#modal').css({
		'width': modal_width,
		'height': modal_height,
		'padding': 18,
		'background': 'none',
		'border': 'none',
		'display': 'block',
		'z-index': 1000,
	  });
	  
	  $('#modalcontent').css({
	    'background': '#000',
        'float': 'left',
		'padding': modalcontent_padding
	  });
	  
	  // Style and position close button for the modal
	  $('#modalclose').css({
	    'background': 'url(/images/modalclose.png) no-repeat',
	    'width': 14,
	    'height': 13,
	    'position': 'absolute',
	    'top': 6,
	    'right': 6,
	    'overflow': 'hidden',
	    'cursor': 'pointer',
		'z-index': 1
	  });
	  
	  var markup = '<div class="modal-tr"></div>';
      markup += '<div class="modal-tl"></div>';
      markup += '<div class="modal-br"></div>';
      markup += '<div class="modal-bl"></div>';
      markup += '<div class="modal-top"></div>';
      markup += '<div class="modal-bottom"></div>';
      markup += '<div class="modal-left"></div>';
	  markup += '<div class="modal-right"></div>';
	  $('#modal').append(markup);
	  
	  $('#modal .modal-tr').css({
	    'background': 'url(/images/modal-tr.png) no-repeat',
        'width': 18,
        'height': 18,
        'position': 'absolute',
        'top': 0,
        'right': 0
	  });
	  
	  $('#modal .modal-tl').css({
	    'background': 'url(/images/modal-tl.png) no-repeat',
        'width': 18,
        'height': 18,
        'position': 'absolute',
        'top': 0,
        'left': 0
	  });
	  
	  $('#modal .modal-br').css({
	    'background': 'url(/images/modal-br.png) no-repeat',
        'width': 18,
        'height': 18,
        'position': 'absolute',
        'bottom': 0,
        'right': 0
	  });
	  
	  $('#modal .modal-bl').css({
	    'background': 'url(/images/modal-bl.png) no-repeat',
        'width': 18,
        'height': 18,
        'position': 'absolute',
        'bottom': 0,
        'left': 0
	  });
	  
	  $('#modal .modal-top').css({
	    'background': 'url(/images/modal-top.png) repeat-x',
        'width': modal_width,
        'height': 18,
        'position': 'absolute',
        'top': 0,
        'left': 18
	  });
	  
	  $('#modal .modal-bottom').css({
	    'background': 'url(/images/modal-bottom.png) repeat-x',
        'width': modal_width,
        'height': 18,
        'position': 'absolute',
        'bottom': 0,
        'left': 18
	  });
	  
	  $('#modal .modal-left').css({
	    'background': 'url(/images/modal-left.png) repeat-y',
        'width': 18,
        'height': modal_height,
        'position': 'absolute',
        'top': 18,
        'left': 0
	  });
	  
	  $('#modal .modal-right').css({
	    'background': 'url(/images/modal-right.png) repeat-y',
        'width': 18,
        'height': modal_height,
        'position': 'absolute',
        'top': 18,
        'right': 0
	  });
	}
	  
	// If centerModal is true, modal is centered
	if(o.centerModal == true) {
	  $('#modal').css({
		'left': $(window).width() / 2 - $('#modal').width() / 2,
	    'top': $(window).height() / 2 - modal_height / 2,
	  });
	}
	// If centerModal is false, set the given coordinates
	else {
	  $('#modal').css({
	    'left': o.posLeft,
	    'top': o.posTop
	  });
	}
	  
	// If fixedPosition is true, modal will always be in its position regardless of the scrolling
	if(o.fixedPosition) {
	  $('#modal').css({
		'position': 'fixed'
      });
	}
	else {
	  $('#modal').css({
		'position': 'absolute'
	  });
	}
	
	return;
  }

  // Item modal definition
  $.fn.itemmodal = function(options) {
    // Build main options before element iteration
    var opts = $.extend({}, $.fn.itemmodal.defaults, options);
	
	// Build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	
	// If element is clicked, append modal markup and instantiate gormodal
	return this.live('click', function() {
      var json = $(this).attr("rel");
	  var data = eval('(' + json + ')');
	  var markup = '<div class="itemmodal">'
	  markup += equip_basicinfo(data) + equip_info(data);
	  markup += '</div>';
	  
	  // Call gormodal
	  return $.fn.gormodal(o, markup);
	});
  };
  
  // Item modal defaults
  $.fn.itemmodal.defaults = {
    modalType: 'itemmodal',
	width: 415,
	height: 'auto',
	padding: 10,
	centerModal: true, // If centerModal is false, set coordinates below
	posLeft: 0,
	posTop: 0,
	fixedPosition: true,
	hasOverlay: true, // If hasOverlay is true, set the options below
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayArea: 'body',
	overlayClose: true
  };
  
  function equip_basicinfo(data) {
    var markup = '<span class="equip-status">' + data.status +'</span>';
    markup += '<span class="equip-owned">Owned: ' + data.owned + '</span>';
    markup += '<span class="equip-name rarity' + data.rarity + '">' + data.name + '</span>';
    markup += '<span class="equip-subname">' + data.subname + '</span>';
		
    return markup;
  }
	
  function equip_info(data) {
    var markup = '<div class="equip-mainholder">';
    markup += '<a class="equip"><img src="/images/' + data.image_big + '" /></a>';
    markup += '<div class="equip-info">';
    markup += '<p class="equip-description">' + data.desc + '</p>';
    markup += equip_details(data);
    markup += '<p class="equip-flavor">' + data.flavor + '</p>';
    if(data.buy == 1) {
	  markup += '<span class="equip-cost' + data.cost_type + '"><span>Buy for ' + data.cost + '</span>' + data.cost_req + '</span>';
    }
    markup += '</div>';
    markup += equip_action(data);
    markup += equip_due(data);
    markup += '<div class="clearfix"></div>';
    markup += '</div>';
	markup += '<div class="clearfix"></div>';
		
    return markup;
  }
  
  function equip_details(data) {
    var markup = '';
		
    if(data.details != '') {
      var details = data.details.split('|');
      markup += '<ul class="equip-details">';
      for(var detail in details) {
	    markup += '<li>' + details[detail] + '</li>';
      }
      markup += '</ul>';
	}

    return markup;
  }
	
  function equip_due(data) {
	var markup  = '';
	
	if(data.remaining != '' && data.time) {
	  markup +=	'<div class="due">';
	  if(data.remaining != '')
	    markup +=	'<span class="remaining">Only ' + data.remaining + ' remaining</span>';
	  if(data.time != '')
	    markup +=	'<span class="timeleft">Time left: ' + data.time + '</span>';
      markup +=	'</div>';
	}
	
	return markup;
  }

  function equip_action(data) {
	var markup = '';
	var buy = '';
	var sell = '';
	var gift = '';
	var wish = '';
	var authid = encodeURIComponent($("#authid").val());
	var quantity = ["1", "5", "25", "100"];
	quantity.push(data.default_quantity);
	quantity.sort(sortNumber);
	
	if(data.buy != 1)
	  var buy = 'disabled';
	if(data.sell != 1)
	  var sell = 'disabled';
	if(data.gift != 1)
	  var gift = 'disabled';
	if(data.wish != 1)
	  var wish = 'disabled';
		
	if(data.id) {
	  var action_url = '/item/transact/' + data.id + '?category=' + data.category + '&route=' + data.route + '&authenticity_token=' + authid;
	}
	else {
	  var action_url = '/archetype/transact/' + data.archetype_id + '?category=' + data.category + '&route=' + data.route + '&authenticity_token=' + authid;
	}

	if(data.buy == 1 || data.sell == 1 || data.gift == 1 || data.wish == 1) {
	  var exceed = false;
		
	  markup +=	'<div class="equip-action">';
	  markup +=	'<form name="equip-form" method="post" action="' + action_url + '">';
	  markup +=	'<select name="quantity">';
		
	  for(var value in quantity) {
		if(parseInt(quantity[value]) == parseInt(data.default_quantity))
		  var selected = 'selected';
		else
		  var selected = '';
			
		if(parseInt(quantity[value]) >= parseInt(data.remaining))
		  break;
		else
		
		markup +=	'<option ' + selected + ' value="' + quantity[value] + '">' + quantity[value] + '</option>';
	  }
		
	  if(data.remaining != '') {
		markup +=	'<option ' + selected + ' value="' + data.remaining + '">' + data.remaining + '</option>';
	  }
		
	  markup +=	'</select>';
	  markup +=	'<input class="' + buy + '" type="image" src="/images/buybutton_' + buy + '.png" ' + buy + ' name="buy" value="submit" />';
	  markup +=	'<input class="' + sell + '" type="image" src="/images/sellbutton_' + sell + '.png" ' + sell + ' name="sell" value="submit" />';
	  markup +=	'<input class="' + gift + '" type="image" src="/images/giftbutton_' + gift + '.png" ' + gift + ' name="gift" value="submit" />';
	  markup +=	'<input class="' + wish + '" type="image" src="/images/wishbutton_' + wish + '.png" ' + wish + ' name="wish" value="submit" />';
	  markup +=	'</form>';
	  markup +=	'</div>';
	}
	
	return markup;
  }

  function sortNumber(a,b) {
	return a - b;
  }
  
  /* ------- Item chooser ------- */

  // Item chooser definition
  $.fn.itemchooser = function(options) {
    // Build main options before element iteration
    var opts = $.extend({}, $.fn.itemchooser.defaults, options);
	
	// Build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	

	  // If element is clicked, instantiate overlay and display item chooser
	  return this.live('click', function() {
	    // Check resources if able to perform action
	    //return check_resource($(this));
	  
	    // Get the song id
	    song_id = $(this).parents('.song').attr('id');
		
	    var overlay_id = $(o.overlayArea).overlay({
	      overlayColor: o.overlayColor,
          overlayOpacity: o.overlayOpacity,
	 	  overlayClose: o.overlayClose,
	      zIndex: 99
	    });
	
	    return display_itemchooser($(this), overlay_id, o);
	  });
	
	  // Remove itemchooser if close button is clicked
	  $('.cancelequip').live('click', function() {
        $('#overlaywrap_' + overlay_id).remove();
	  });
	
	  return $('.equipitem').live('click', function() {
		if(song_id != undefined){
	      var songdata = eval('(' + $(this).attr('rel') + ')');
	  
	      $('#overlaywrap_' + overlay_id).remove();
	
          var overlay_id2 = $('#' + song_id).overlay({
	        overlayColor: o.overlayColor,
            overlayOpacity: o.overlayOpacity,
            overlayClose: false,
	        zIndex: 101
	      });
	  
          display_spinner(overlay_id2, {
	        spinner: '/images/ajax-loader.gif',
	        centerSpinner: true,
	        fixedPosition: false
	      });
	  
          $.ajax({
	        url: '/song/improve/' + songdata.song_id + '?item_id=' + songdata.item_id + '&position=' + songdata.position, 
	        context: document.body, 
	        success:function(data) {
	          $('#' + song_id).html(data);
		      setTimeout(function() {
		        $('.improvements').hide();
		      }, 10000);
	        }
	      });
	    }
		
		return;
	  });
  };
  
  // Item chooser defaults
  $.fn.itemchooser.defaults = {
    category: 'songwriting_instrumentals',
	hasOverlay: true, // If hasOverlay is true, set the options below
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayArea: 'body',
	overlayClose: true
  };
  
  var ResourceValues = new Array();
  
  function check_resource($this) {
    load_ajax_refresh();
    var resource = ['inspiration', 'energy'];
	for(var i in resource) {
	  var resource_req = 'req_' + resource[i];
	  if($this.data(resource_req) != undefined) {
	    if($this.data('req_' + resource[i]) > ResourceValues[resource[i]]) {
	      return resource_required(resource[i], $this.data(resource_req), parseInt(ResourceValues[resource[i]]));
	    }
	  }
    }
	
	return;
  }
  
  function display_itemchooser($this, overlay_id, o) {
	var markup = '<div id="' + o.category + '" class="itemchooser">';
	markup += '<span class="itemname">Available Instrumentals</span>';
	markup += '<a class="cancelequip">Cancel</a>';
	markup += '<div class="itemchooser-items" id="' + o.category + '_items">';
	markup += '</div>';
    markup += '</div>';
	$('#overlaywrap_' + overlay_id).append(markup);
	
	if($this.is('.editsongitem'))
	  var the_item = $this.parents('.songitem');
	else
	  var the_item = $this;
	
	var placement_width = 352;
	var placement_height = 75;
    var pos = the_item.offset();
    var posLeft = pos.left - placement_width;
    var posTop = (pos.top + the_item.height() / 2) - placement_height;
	
	$('.songitem').css({
	  'z-index': 0
	});
	
	$('.addlyric-span').css({
	  'z-index': 0
	});
	
	the_item.css({
	  'z-index': 100
    });
	
	$('#' + o.category).css({
	  'left': posLeft,
	  'top': posTop,
	  'display': 'block',
	  'position': 'absolute',
	  'z-index': 101
    });
	

	var slot = the_item.attr('id');
	var slot_split = slot.split('_');
    var position = slot_split[2];
    var song_id = slot_split[1];
	
	$.ajax({ 
	  url: '/item/itemchooser?category=' + o.category + '&position=' + position + '&song_id=' + song_id,
	  context: document.body, 
	  success: function(data) {
	    $('#' + o.category + '_items').html(data);
	  }
	});
	
	return;
  }
		
// end of closure
})(jQuery);

