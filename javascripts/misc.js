/*
 * Gods of Rock
 * Copyright (c) 2010 Disruptor Beam LLC
 * By Jimbo Quijano - jimzqui@yahoo.com
 *
 * misc.js
 * Gods of Rock custom functions.
 *
 * 01. GOR EVENTS AND INSTANTIATIONS
 *	   1. Image and Flash Preloader
 *	   2. Spinner
 *	   3. Item Modal
 *	   4. Item Chooser
 *	   5. Gigs
 *	   6. Tabs
 *	   7. Slideshow
 *	   8. Trivia Quiz
 *	   9. Songs
 *	   10. Opportunity
 *	   11. Activity
 *
 * 02. GOR FUNCTIONS
 */


/* ----------------------------------------------------------------------------------------------------------------
                                                  01. GOR EVENTS
---------------------------------------------------------------------------------------------------------------- */


$(document).ready(function(){

  // Test
  $('#levelup_simulator').click(function() {
    return level_up_dialog();
  });

  /* ------- 1. Image and Flash Preloader ------- */

  // Define preloader object
  var preload = {
	// Links for the image to be preloaded
    image: [
	  '/images/psychcdspin.gif',
	  '/images/profile/bg-itemchooser.png',
	  '/images/actionbuttons/button-equipitem.png',
	  '<img src="/images/profile/icon-check.png',
	  '/images/home/quizwheel-spinning.gif'
    ],
	// Object markup for the flash to be reloaded
    flash: [
      '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="750" height="465"><param name="movie" value="flash/soundwaves.swf"><param name="quality" value="high"><param name="bgcolor" value="#000"><param name="wmode" value="transparent"><embed src="/flash/soundwaves.swf" width="750" height="465" quality="high" bgcolor="#000" wmode="transparent" type="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></embed></object>'
    ]
  }
  
  // Call the preloader function and append the result markup in the body
  $("body").append(preloader(preload));

  // Function for preloading images and flash objects
  function preloader(preload) {
    var markup = '<div id="preload-image" style="display:none">';
    for(var i in preload.image) {
	  markup += '<img src="' + preload.image[i] + '" alt="" />';
	  for(var j in preload.flash) {
	    markup += '<img src="' + preload.flash[j] + '" alt="" />';
      }
    }
    markup += '</div>';
	
	return markup;
  }

  /* ------- 2. Spinner ------- */

  $('#leftnav a.spinner').spinner({
    spinner: '/images/psychcdspin.gif', // Image url of the spinner/ajax-loader
	centerSpinner: true, // If false, set coordinates below
	posLeft: 0, // x coordinate from left
	posTop: 0, // y coordinare from top
	fixedPosition: true, // If true, box will always stay to the position regardless of scrolling
	hasOverlay: true, // If true, set the options below
	overlayColor: '#000', // Background overlay color
    overlayOpacity: 0.7, // Background overlay fadeness
	overlayArea: 'body', // Element of the area to be covered by the background overlay
	overlayClose: false // If true, boxes(modal, itemchooser, spinner) will be closed when there corresponding overlay is clicked
  });
	
  /* ------- 3. Item modal ------- */
  
  $('a.equip').itemmodal({
    modalType: 'bluemodal', // There are two kinds of model base on layout. Item modal has the white dashed border. Basic modal has the shadow along border
	width: 'auto', // Box width
	height: 'auto', // Box Height
	centerModal: true, // If false, set coordinates below
	posLeft: 0, // x coordinate from left
	posTop: 0, // y coordinate from top
	fixedPosition: true, // If true, box will always stay to the position regardless of scrolling
	hasOverlay: true, // If is true, set the options below
	overlayColor: '#000', // Background overlay color
    overlayOpacity: 0.7, // Background overlay fadeness
	overlayArea: 'body', // Element of the area to be covered by the background overlay
	overlayClose: true // If true, boxes(modal, itemchooser, spinner) will be closed when there corresponding overlay is clicked
  });
  
   $('#testing1').itemmodal({
    modalType: 'itemmodal',
	width: 'auto',
	height: 'auto',
	centerModal: true,
	posLeft: 0,
	posTop: 0,
	fixedPosition: true,
	hasOverlay: true,
	overlayColor: '#000',
    overlayOpacity: 0.7,
	overlayArea: 'body',
	overlayClose: true
  });
  
   $('#testing2').itemmodal({
    modalType: 'basicmodal',
	width: 'auto',
	height: 'auto',
	centerModal: true,
	posLeft: 0,
	posTop: 0,
	fixedPosition: true,
	hasOverlay: true,
	overlayColor: '#fff',
    overlayOpacity: 0.5,
	overlayArea: 'body',
	overlayClose: true
  });
  
  $('#testing3').itemmodal({
    modalType: 'announcemodal',
	width: 'auto',
	height: 'auto',
	centerModal: true,
	posLeft: 0,
	posTop: 0,
	fixedPosition: true,
	hasOverlay: true,
	overlayColor: '#000',
    overlayOpacity: 0.8,
	overlayArea: 'body',
	overlayClose: true
  });
  
  /* ------- 4. Item chooser ------- */
  
  $('.songitem.empty').itemchooser({
    category: 'songwriting_instrumentals', 
	hasOverlay: true, // If true, set the options below
	overlayColor: '#000', // Background overlay color
    overlayOpacity: 0.7, // Background overlay fadeness
	overlayArea: 'body', // Element of the area to be covered by the background overlay
	overlayClose: true // If true, boxes(modal, itemchooser, spinner) will be closed when there corresponding overlay is clicked
  });
  
  $('.editsongitem').itemchooser({
    category: 'songwriting_instrumentals', 
	hasOverlay: true, // If true, set the options below
	overlayColor: '#000', // Background overlay color
    overlayOpacity: 0.7, // Background overlay fadeness
	overlayArea: 'body', // Element of the area to be covered by the background overlay
	overlayClose: true // If true, boxes(modal, itemchooser, spinner) will be closed when there corresponding overlay is clicked
  });
  
  $('.addlyric-span').itemchooser({
    category: 'songwriting_lyrics', 
	hasOverlay: true, // If true, set the options below
	overlayColor: '#000', // Background overlay color
    overlayOpacity: 0.7, // Background overlay fadeness
	overlayArea: 'body', // Element of the area to be covered by the background overlay
	overlayClose: true // If true, boxes(modal, itemchooser, spinner) will be closed when there corresponding overlay is clicked
  });

  /* ------- 5. Gigs ------- */
	
  $('span.gigtitle').click(function() {
	var this_gig = $(this).parents('div.gig');
    if(this_gig.is('.collapsed'))
      expand_gig(this_gig);
    else
      collapse_gig(this_gig);
  });
	
  /* ------- 6. Tabs ------- */

  $("ul.tabs > li a").live("click", function() {
    var tabs = $(this).parents(".tabs");

    tabs.children("li").removeClass("active");
    $(this).parent("li").addClass("active");
  });
	
  /* ------- 7. Slideshow ------- */
	
  $('#slideshow').scrollable({
    size: 1,
    items:	'.slides',
    item: '.slide',
    next: '#slideshow .nextslide',
    prev: '#slideshow .prevslide',
	circular: true
  }).autoscroll({
	autoplay: true,
	interval: 20000
  }).navigator({
	navi: '#slideshow .navi'
  });
  
  $('#concertitems').scrollable({
    size: 1,
    next: '#concertitems .rightarrow',
    prev: '#concertitems .leftarrow',
	circular: true
  });
	
  /* ------- 8. Trivia Quiz ------- */
	
  $('.quizwheel .tospin').live("click", function() {
    $(this).after('<img class="wheel spinning" src="/images/home/quizwheel-spinning.gif" alt="" />');
    $(this).remove();
  });
	
  $('.quizwheel .spinning').live("click", function() {
	$('#correctremove').remove();
    $('#correctshow').show();
  });
         
  $('.choices li a.button').click(function() {
    $('trivia-overlay').show();
    $('trivia-loader').show();
  });
	
  /* ------- 9. Songs ------- */
  
  $('#createsongform .getrandomtitle').spinner({
	spinner: '/images/ajax-loader.gif',
	centerSpinner: true,
	fixedPosition: false,
	overlayColor: '#000',
    overlayOpacity: 0.7,
    overlayClose: false,
	overlayArea: '#createsongform',
	zIndex: 101
  });
  
  $('#createsongform .getrandomtitle').live('click', function() {
	$.ajax({ 
	  url: '/song/random_name', 
	  context: document.body, 
	  success:function(data) {
	    $('#createsongform .song_name').val(data);
	    $('#createsongform').children('.overlaywrap').remove();
	  }
	});
  });
  
  $('#song_nane').bind('focus', function() {
    alert('testing');
  });
  
  $('#song_nane').blur(function() {
    $(this).val() = 'Enter a song title here';
  });
  
  $('input.savesong').click(function() {
    if($('#song_name').val() == 'Enter a song title' || jQuery.trim($('#song_name').val()) == '') {
	  alert('Invalid Name');
	  return false;
	}
  });
	
  $('.createsong').click(function() {
    var options = {
    modalType: 'bluemodal',
	width: 'auto',
	height: 'auto',
	centerModal: true,
	fixedPosition: true,
	hasOverlay: true,
	overlayArea: 'body',
	overlayColor: '#000',
    overlayOpacity: 0.8,
    }
	
	var initmarkup = $('#songform').html();
	var markup = '<div id="createsongform">' + initmarkup + '</div>';
	
    $.fn.gormodal(options, markup);
  });
	
  $('.cancelsong').click(function() {
    $("#songform").hide();
  });
	
  $('.songname').live('click', function() {
    if($(this).parents('.songhead').siblings('.songbody').is(':visible')) {
      $(this).parents('.song').addClass('collapsed');
      $(this).parents('.song').removeClass('expanded');
    }
    else {
      $(this).parents('.song').addClass('expanded');
      $(this).parents('.song').removeClass('collapsed');
    }
  });
	
  $('.addscalebar').live('click', function() {
	add_scalebar($(this));
	$(this).remove();
  });
	
  $('.songitem').live('mouseenter', function() {
    if(!($('.itemchooser').is(':visible'))) {
      $(this).children('.editsongitem').show();
	}
  });
	
  $('.songitem').live('mouseleave', function() {
    $(this).children('.editsongitem').hide();
  });
	
  $('.recordsong"').click(function() {
    var songname = $(this).parents('.songbody').siblings('.songhead').children('.songname').html();
    var recordmodal = '<div class="recordmodal">';
    recordmodal += '<h5>Now Recording: <span>' + songname + '</span></h5>';
    recordmodal += '<div class="soundwaves">';
    recordmodal += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="750" height="465">';
    recordmodal += '<param name="movie" value="flash/soundwaves.swf">';
    recordmodal += '<param name="quality" value="high">';
    recordmodal += '<param name="bgcolor" value="#000">';
    recordmodal += '<param name="wmode" value="transparent">';
    recordmodal += '<embed src="/flash/soundwaves.swf" width="750" height="465" quality="high" bgcolor="#000" wmode="transparent" type="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></embed>';
    recordmodal += '</object>';
    recordmodal += '</div>';
    recordmodal += '</div>';
		
    $('#popup a.popup-close').remove();
    $('#popup').append(recordmodal);
    show_popup();
  });
	
  /* ------- 10. Opportunity ------- */
	
  $(".callagent").click(function() {
	$(this).parents('.opportunity').removeClass('collapse');
	$(this).parents('.opportunity').addClass('expand');
  });
	
  /* ------- 11. Activity ------- */
  
  var activity_mode = 'all';
  var notifications = 0;
  
  $('.bluetab .toggle').toggle(
    function() {
      $(this).parents('.bluetab').animate({
	    'left': 0
	  });
	  $('#activityfeed .notifications').remove();
	  notifications = 0;
	  $('#feed').data('latest_feed', $('#feed ul.activity li:first-child'));
	  setTimeout(fadeHilight, 1000);
    },
    function() {
      $(this).parents('.bluetab').animate({
  	    'left': -310
	  });
    }
  );
  
  //timerFeed();
  pagination();
  
  $('#feed').data('latest_feed', $('#feed ul.activity li:first-child'));
  
  $('#comment_form input').spinner({
	spinner: '/images/ajax-loader.gif',
	centerSpinner: true,
	fixedPosition: false,
	overlayColor: '#000',
    overlayOpacity: 0.7,
    overlayClose: false,
	overlayArea: '#postmessage',
	zIndex: 101
  });
  
  $('#comment_form input').live('click', function() {
	var comment = $('#comment_input').val();
	var url = '/feed/comment';
	var data = 'comment=' + comment + '&activity_mode=' + activity_mode;
	var success = function(data) {
	  $('#feed').html(data);
      $('#postmessage .overlaywrap').remove();
	  pagination();
	  hilightLatestFeed();
	}
	updateFeed(url, data, success);
		
	return false;
  });
  
  /* ------- Jam Session ------- */
  var tabanchor = window.location.hash;
  
  if(tabanchor != '') {
	var jam = tabanchor.replace('jam', 'jam-');
	var jamtab = tabanchor.replace('jam', 'jamtab-');
    $('.jamfaction').hide();
	$(jam).show();
	$('.jam-songtab ul li').removeClass('current');
	$(jamtab).addClass('current');
  }
  else {
    var url = window.location.href;
    var tabinurl = url.search('&tab=');
	
    if(tabinurl != -1) {
	  var tab = (url.split('&tab='))[1];
	  var jam = tab.replace('jam', 'jam-');
	  var jamtab = tab.replace('jam', 'jamtab-');
      $('.jamfaction').hide();
	  $('#' + jam).show();
	  $('.jam-songtab ul li').removeClass('current');
	  $('#' + jamtab).addClass('current');
	}
	else {
      $('.jamfaction').each(function() {
        if($(this).attr('id') == 'jam-rock') {
	      $(this).show();
	    }
      });
	}
  }
  
  $('.jam-songtab ul li').click(function() {
    $('.jam-songtab ul li').removeClass('current');
	$(this).addClass('current');
    var this_id = $(this).attr('id');
	var faction = this_id.replace('jamtab', 'jam');
	$('.jamfaction').hide();
	$('#' + faction).show();
  });
  
  /* ------- Depreciated ------- */
	
  $("li.slidePanel > div.slideHeader > span.toggle").mouseup(function() {
    var body = $(this).parent().parent().children('ul.slideBody');

	if(body.is(':hidden')) {
	  body.slideDown();
	  $(this).parent().addClass('active');
	}
	else {
	  body.slideUp();
	  $(this).parent().removeClass('active');
	}
  });
 
});

/* ----------------------------------------------------------------------------------------------------------------
                                                  02. GOR FUNCTIONS
---------------------------------------------------------------------------------------------------------------- */

  function add_scalebar($this) {
	var data = eval('(' + $this.attr('rel') + ')');
  
    var scalebar = '<div class="scalebar">';
    scalebar +=	'<div class="songitems">';
	for (i=1; i<=4; i++) {
	  data.improved_count_instrumentals += i;
      scalebar +=	'<div class="songitem empty" id="instrumental_' + data.song_id + '_'+ data.improved_count_instrumentals +'"></div>';
	}
    scalebar +=	'</div>';
    scalebar +=	'<a class="addlyric"><span class="addlyric-span" id="lyric_'+ data.song_id +'_'+ data.improved_count_lyrics +'">Click to Add Lyric</span></a>';
    scalebar += '</div>';
    $this.before(scalebar);
  }

  function collapse_gig(this_gig) {
    this_gig.css({
      'opacity': 0
    });
	this_gig.animate({
	  'opacity': 1
	}, 600);
	this_gig.removeClass('expanded');
	this_gig.addClass('collapsed');
  }
	
  function expand_gig(this_gig) {
	this_gig.css({
	  'opacity': 0
	});
	this_gig.animate({
	  'opacity': 1
	}, 600);
	this_gig.removeClass('collapsed');
	this_gig.addClass('expanded');
  }
  

  function reply_to(name) {
	$('#comment_input').val('@' + name + ': ');
	$('#comment_input').focus();
	document.comment_form.comment_input.value=document.comment_form.comment_input.value
  }

  function updateFeed(url, data, success) {
	$.ajax({
	  url: url, 
	  data: data,
	  success: success
	});
  }

  function timerFeed() {
	var comment = $('#comment_input').val();
	var url = '/feed/update';
	var data = 'activity_mode=' + activity_mode;
	var success = function(data) {
	  $('#feed').html(data);
	  pagination();
	  if($('#activityfeed').position().left != 295)
	    showNotifications();
	  hilightLatestFeed();
	}
	updateFeed(url, data, success);
	setTimeout(timerFeed, 5000);
  }
 
  function pagination() {
	var opt = {
	  callback: pageselectCallback,
	  items_per_page: 5 // Show only one item per page
	};
	 
	function pageselectCallback(page_index, jq) {
	  $('#paginatefeed').empty();
	  var page = page_index * 5;
	  for(var i=0; i<opt.items_per_page; i++) {
		var pagecnt = page + i;
		var new_content = jQuery('#feed ul li:eq('+pagecnt+')').clone();
		new_content.attr('id', 'paginate-' + new_content.attr('id'));
		$('#paginatefeed').append(new_content);
	  }
	  
	  return false;
	}
   
	function initPagination() {
	  // count entries inside the hidden content
	  var num_entries = jQuery('#feed ul li').length;
	  // Create content inside pagination element
	  $("#pagination").pagination(num_entries, opt);
	}
	
	$(document).ready(function() {      
	  initPagination();
	});
  }
  
  function showNotifications() {
    var counter = 0;
	$('#feed ul.activity li').each(function() {
	  if($(this).attr('id') == $('#feed').data('latest_feed').attr('id'))
		notifications = counter;
	  counter++;
    });

	if(notifications)
      $('#activityfeed').append('<a class="notifications">' + notifications + '</a>');
  }
  
  function hilightLatestFeed() {
	var latest = true;
	$('#feed ul.activity li').each(function() {
	  if($(this).attr('id') == $('#feed').data('latest_feed').attr('id')) 
		latest = false;
	  if(latest == true && $('#activityfeed .notifications').length != 0) {
	    $('#paginate-' + $(this).attr('id')).css({
		  'background': '#133f5e'
		});
	  }
    });
  }
  
  function fadeHilight() {
    $('#paginatefeed li').css({
	  'background': '#061D2D'
	});
  }
  
  function level_up_dialog() {
    var options = {
      modalType: 'announcemodal',
	  width: 'auto',
	  height: 'auto',
	  centerModal: true,
	  posLeft: 0,
	  posTop: 0,
	  fixedPosition: true,
	  hasOverlay: true,
	  overlayColor: '#000',
      overlayOpacity: 0.,
	  overlayArea: 'body',
	  overlayClose: true
    }
  
    $.getJSON('/user/level_up_json', function(json) {
	  //temporary
	  json.message = 'Reach level 5 and record a song.';
	  var markup = '<div class="levelup">';
      markup += '<div class="yourock"><h6>You\'ve attained level ' + json.level + '</h6> ' + json.message + '</div><hr/>';
      markup += '<div class="rewards"><h6>Enjoy your rewards</h6><ul>';
      for(var i in json.rewards) {
	    markup += '<li>' + json.rewards[i] + '</li>';
	  }
	  markup += '</ul><a class="accentorange" href="#"><span>Buy Talents</span></a></div>';
      markup += '<div class="share"><h5>Share Your Success & Inspire Your Entourage</h5><a class="accentorange" href="#"><span>Send inspiration boost now</span></a></div>';
      markup += '</div>';
	  $.fn.gormodal(options, markup);
    });
  
    return false;
  }