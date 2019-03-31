"use strict";
// Si retourne TRUE, redirige ailleurs
X = function() {
	var today = new Date();
	var dayOfMonth = today.getDate();
	var month = today.getMonth();
	/*
	var dayOfWeek = today.getDay();
	var year = today.getFullYear();
	var singleDay = (month < 4) ? 26 : 1;
	*/
	
	// Ceria jusqu'au soir
	if (month == 5 && dayOfMonth == 6) {
		var hours = today.getHours();
		return (hours > 16);
	}
	
	// Congé le reste de la semaine
	return true;
}
