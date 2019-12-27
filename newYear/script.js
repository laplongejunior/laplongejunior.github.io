function _init(iframe) {
	_init2(iframe);
	_loadedContent(iframe.parentElement);
}
function _init2(iframe) {
	iframe.location.replace(iframe.dataset.src)
	// Frees memory
	iframe.removeAttribute('data-src');
}
function _loadedContent(content) {
	var ATT_NAME = "_customLoad";
	if (!content.hasAttribute(ATT_NAME))
		content.setAttribute(ATT_NAME, 1);
	else
	{
		var att = content.getAttribute(ATT_NAME);
		if (att === 2) {
			content.removeAttribute(ATT_NAME);
			content.style.visibility='visible';
		}
	}
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
		var width = _computeWidth(totWidth);

		mStyle.left += (totWidth-width)+'px';	
		mStyle.borderTopWidth = mask.style.borderLeftWidth = width+'px';
		_loadedContent(content);
		
		// Frees memory
		iframe.removeAttribute('data-mask');
		iframe.removeAttribute('data-href');
		iframe.removeAttribute('data-color');
	}
}
/*
350 = 89
360 = 91
*/
function _computeWidth(width) {
	return Math.ceil(width/4) + 1;
}
