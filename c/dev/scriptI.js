(function() {
	"use strict";
	// Log dans la page web
	var m_console = document.getElementById('console');
	
	var log = function(p_str) {	
		let start = m_console.firstChild;
		if (start)
			m_console.insertBefore(start = document.createElement("br"), m_console.firstChild);
		var now = new Date();
		var pad = function(p_val) {return ('00' + p_val).slice(-2)};
		p_str = '['+pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds())+'] ' + p_str;
		m_console.insertBefore(document.createTextNode(p_str), start);
	}
	log('Console prête');
	
	var fbElement = document.getElementById('fb');
	
	// Calcul redimensionnement fb;
	var m_fbSrc = fbElement.getAttribute('data-src');
	var m_prevWidth = -1, m_prevHeight = -1;
	var refreshFb = function() {
		var style = getComputedStyle(fbElement);
		var width = parseInt(style['width']);
		var height = parseInt(style['height']);
	
		if (m_prevWidth === width && m_prevHeight === height)
			return;
		m_prevWidth = width;
		m_prevHeight = height;
		
		fbElement.src = m_fbSrc + '&width='+width + '&height='+height;
		log('Facebook '+width+'x'+height);
	};
	
	// Trigger redimensionnement fb
	var m_fbTimer;
	var onResize = function() {
			if (m_fbTimer) clearTimeout(m_fbTimer);
			m_fbTimer = setTimeout(refreshFb, 5000);
		};
	addEventListener('load', onResize);
	addEventListener('resize', onResize);
	// En local, Chrome n'autorise pas à éditer depuis l'iframe
	var isTop;
	try { isTop = (window === top); }
	catch (e) { isTop = false; }
	if (isTop) {
		const link = document.createElement('link');
		link.rel = "icon";
		link.href = 'http://www.ceria.be/irl/templates/ja_purity/favicon.ico';
		document.head.appendChild(link);
	}
	
	// Rechargement
	const profsElement = document.getElementById('profs')
	setInterval(function(iframe) {
		const src = iframe.src
		iframe.src = 'about:blank'
		iframe.src = src
		log('Fenêtre Ceria rechargée')
	}, 600000, profsElement)
	// Suppression données inutiles
	fbElement.removeAttribute('data-src')
	m_console.removeAttribute('id');
	fbElement.removeAttribute('id');
	profsElement.removeAttribute('id');
})();
