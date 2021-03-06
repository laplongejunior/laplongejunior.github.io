"strict mode";
function _async() {
	var tagName = arguments[0];
	var tag = document.createElement(tagName);
	var length = arguments.length;
	for (var i = 1; i+1 < length; i+=2)
		tag[arguments[i]] = arguments[i+1];
	var first = document.getElementsByTagName(tagName)[0];
	first.parentNode.insertBefore(tag, first);
	return tag;
}

function _init(iframe) {
	_loaded(iframe.parentElement);
}

var s = new Set();
function _loaded(content) {
	if (!s.delete(content))
		s.add(content);
	else
		content.style.visibility='visible';
}

function _load(contentClass, playerID) {
	//_async('link','rel',"stylesheet",'href',"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
	
	var arr = window.document.getElementsByClassName(contentClass);
	for (var i=0; i<arr.length; ++i) {
		var content = arr[i];
		var wrapper = document.createElement(content.tagName);
		wrapper.style.display = 'inline-block';
		
		var base = content.parentElement;
		base.replaceChild(wrapper, content);
		wrapper.appendChild(content);
		
		var iframe = content.getElementsByTagName('iframe')[0];
		var mask = document.createElement('span');
		var href = iframe.dataset.href;
		
		// If needed, creates a link on the mask
		var child;
		if (href === undefined)
			child = mask;
		else
		{
			child = document.createElement('a');
			child.href=href;
			child.target='_blank';
			child.appendChild(mask);
		}	
		content.insertBefore(child, content.childNodes[1]);	
			
		// Enable superposition	
		var cStyle = content.style;
		var mStyle = mask.style;
		cStyle.position = 'relative';
		mStyle.position = 'absolute';	
		
		mStyle.borderTopColor = iframe.dataset.color;
		mask.classList.add(iframe.dataset.mask);	
		
		// TODO: Based on iframe's width?
		// var width = 91;
		var totWidth = iframe.width;
		/*
		350 = 89
		360 = 91
		*/
		var width = Math.ceil(totWidth/4) + 1;

		mStyle.left += (totWidth-width)+'px';	
		mStyle.borderTopWidth = mask.style.borderLeftWidth = width+'px';
		_loaded(content);
		
		// Frees memory
		iframe.removeAttribute('data-mask');
		iframe.removeAttribute('data-href');
		iframe.removeAttribute('data-color');
	}

	// Global object name reserved by YT api
	window.onYouTubeIframeAPIReady = function() {
		window.onYouTubeIframeAPIReady = undefined;
		
		new YT.Player(playerID, {events: {
			'onReady': function(event) {
				var trigger = new Date(2019,12-1,31,23,59,50);
				var func = function() {
					document.getElementById(playerID).parentElement.style.visibility='visible';
					event.target.playVideo();
				};

				var diff = trigger.getTime()-new Date().getTime();
				if (diff <= 0) func();
				else setTimeout(func, diff);
			}
		}});			
	}
	
	_async('script','src',"https://www.youtube.com/iframe_api");
}
