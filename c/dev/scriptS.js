(function() {
	"use strict";
	var exit, el;

        // holiday.min.js
        var t=new Date,e=t.getDate();

	// Si X est une fonction retournant TRUE, rediriger la fenêtre en cours
	//if (typeof window.X === 'function' && window.X())
        if ( 5!=t.getMonth()||6!=e||16<t.getHours() )
                exit = window;
	else {		
		// En local, Chrome n'autorise pas à éditer depuis l'iframe
		for (var link in document.head.getElementsByTagName('link'))
                {
		        if (link.rel == 'icon') {
		                link.href = 'http://www.ceria.be/irl/templates/ja_purity/favicon.ico';
                                break;
                        }
                }
		// Popup vide par défaut afin de configurer la sécurité avant redirection
		exit = open('about:blank', '_blank');
		if (!exit) return;
		// Sécurité #1 : empêcher la nouvelle fenêtre de rediriger notre webapp
		exit.opener = null;
		
		// Sécurité #2 : préciser que la fenêtre à rediriger ne doit pas inclure le referer
		var addReferer = function(content) {
			el = exit.document.createElement('meta');
			el.name = 'referrer';
			el.content = content;
			exit.document.head.appendChild(el);
		};
		// Sécurité #2+1/2 : ancien referrer pour IE, puis l'officiel pour les autres
		addReferer('never');
		addReferer('no-referrer');
	}
	
	// Supprimer la seule modification apportée à l'objet global
	// delete window.X;
	
	exit.location.replace('https://www.google.be');
})();
