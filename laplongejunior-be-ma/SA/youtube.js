function initScript(IDviewer, IDtitle, IDdesign, IDcolor, IDloop)
{
	window.viewer = document.getElementById(IDviewer);
	(window.title = document.getElementById(IDtitle)).checked = false;
	(window.design = document.getElementById(IDdesign)).checked = false;
	(window.color = document.getElementById(IDcolor)).checked = false;
	(window.loop = document.getElementById(IDloop)).checked = false;
	
	window.originalWidth = window.viewer.width;
	window.originalHeight = window.viewer.height;
	setVideo();
}

function setPlaylist(URLlist)
{
	setVideo('videoseries?list=' + URLlist);
}

function setVideo(URLvideo)
{	
	if (URLvideo == undefined)
	{
		window.viewer.src = 'about:blank';
		if (window.viewer.width != 1)
			window.viewer.style.removeAttribute('border');
	}
	else
	{
		if (window.viewer.width == 1) setViewer();
		window.viewer.style.border = '0';
		if (URLvideo.indexOf("videoseries?list=") == -1)
			URLvideo += '?playlist=,';
			
		URLvideo = 'https://www.youtube.com/v/' + URLvideo + '&rel=0&autohide=1&controls=2&iv_load_policy=3&hl=fr&disabledkb=1&autoplay=1';
		if (!window.title.checked) URLvideo += '&showinfo=0';
		if (window.design.checked) URLvideo += '&theme=light';
		if (window.color.checked) URLvideo += '&color=white';
		if (window.loop.checked) URLvideo += '&loop=1';
		
		window.viewer.src = URLvideo;
	}
}

function setViewer(width, height)
{ 
	if (window.viewer.width == 1)
		window.viewer.frameBorder = 1;
		
	if (width > 0)
	{
		window.viewer.width = width;
		window.viewer.height = height;
	}
	else if (width == undefined)
	{					
		window.viewer.width = window.originalWidth;
		window.viewer.height = window.originalHeight;
	}
	else
	{		
		setVideo();
		setViewer(1, 1);		
		window.viewer.frameBorder = 0;
	}
}
