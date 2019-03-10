// Si retourne TRUE, redirige ailleurs
X = function() {
	var today = new Date();
	var dayOfWeek = today.getDay();
	var month = today.getMonth();
	/*
	var dayOfMonth = today.getDate();
	var year = today.getFullYear();
	*/
	
	// Ceria le lundi
	if (dayOfWeek == 1)
		return false;
	
	// Ceria jusqu'au mardi soir
	if (dayOfWeek == 2) {
		var hours = today.getHours();
		return (hours > 16);
	}
	
	// Congé le reste de la semaine
	return true;
}