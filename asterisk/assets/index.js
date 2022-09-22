/* --------------------------
	Scroll Progress Bar	
----------------------------*/

	$(document).on("scroll", function(){
		var pixels = $(document).scrollTop();
		var pageHeight = $(document).height() - $(window).height();
		var progress = 100 * pixels / pageHeight;
		$("div.progress").css("height", progress + "vh");
	});


/* --------------------------
	Helpers
----------------------------*/

	function slugify(text) {
	  return text
	    .toString()                           // Cast to string (optional)
	    .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
	    .toLowerCase()                  // Convert the string to lowercase letters
	    .trim()                                  // Remove whitespace from both sides of a string (optional)
	    .replace(/\s+/g, '-')            // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
	    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
	}

	function elementVhPos( el ){
		var pageHeight = $(document).height();
		var hTextOffsetTop = $(el).offset().top;
		return hTextOffsetTop / pageHeight * 100;
	}

	
	$('h2').each(function(){
		// let chapterloc = ;
		let chapter = $(this).text();
		let chapterslug = slugify(chapter);

		$(this).attr('id', chapterslug);

		console.log(chapter, chapterslug);
		let top = elementVhPos( this );

		$('.chapter-indicators').append(
			`<a class="progress_bookmark chaptermark" style="top: ${top}vh" href="#${chapterslug}">
				<div class="dot"></div><div class="text"><span>${chapter}</span></div>
			</a>`);

	});
/* --------------------------
	Bookmark text	
----------------------------*/
	let bookmarks = [];
	let markcount = 0;

	function getSelectedText() {
		if (window.getSelection) {
			txt = window.getSelection();
		} else if (window.document.getSelection) {
			txt = window.document.getSelection();
		} else if (window.document.selection) {
			txt = window.document.selection.createRange().text;
		}
		return txt;  
	}

	$(".body p, .body h1, .body h2, .body h3, .body h4, .body li").mouseup(function() {
		let selection = getSelectedText();
		console.log(selection);
		if ( selection.isCollapsed == false ){
			$('.selected').removeClass('selected');
		// if(selection.length > 0) {
			var spn = '<span class="selected">' + selection + '</span>';
			var currentMousePosY = event.pageY - 20;
			$(this).html($(this).html().replace(selection, spn));
			$('.bookmark').css({
				'opacity':'1',
				'top' : currentMousePosY
			})
		}
		//remove previously selected 
			// document.querySelectorAll(".seleted")
			// .forEach(EL => EL.replaceWith(...EL.childNodes));

		// }
	});


/* --------------------------
	Add a bookMark text on the Progress bar
----------------------------*/

	$("#marker").click(function(){
		//remove 'bookmark' button
		$('.bookmark').css({
			'opacity' : '0'
		});

		//style highlighted text
		$('.selected').addClass('marked');
		$('.selected.marked').attr('id', 'mark'+markcount);
		

		var highlightedText = $('.selected.marked').text();
		var textLength =  highlightedText.length;
		var chapter = "";

		//calculate the vertical loc of the highlighted text 
		var hTextLoc =  elementVhPos( $('.selected.marked') );

		// console.log(hTextOffsetTop + ' / ' +  pageHeight + ' : ' + hTextLoc);

		//mark the highlighted text on the progress bar
		if (textLength > 20) {
			finalWord = highlightedText.substr(0,19) + '...';
		} else {
			finalWord = highlightedText;
		}
		console.log(finalWord);
		$('header').append(
			`<a class="progress_bookmark" style="top: ${hTextLoc}vh;" href="#mark${markcount}">
				<div class="dot"></div><div class="text"><img src="assets/img/asterisk_arrow_05.png"><span>${finalWord}</span></div>
			</a>`);

		markcount++;
			
	});
