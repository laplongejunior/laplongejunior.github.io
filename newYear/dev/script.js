function _init(iframe) {
	_loaded(iframe.parentElement);
}

var s = new Set();
function _loaded(content) {
	var ATT_NAME = "_customLoad";
	if (!s.delete(content))
		s.add(content);
	else
		content.style.visibility='visible';
}

function _load(contentClass) {	
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
	
	dateTrigger(new Date(2019,29,12,16,03,00), specialEffect);
}

function specialEffect() {
	alert("test");
}

function dateTrigger(trigger, func) {
	var diff = trigger-new Date();
	if (diff <= 0)
		func();
	else
		setTimeout(func, diff);
}
