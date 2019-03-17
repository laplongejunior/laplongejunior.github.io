// Si retourne TRUE, redirige ailleurs
X = function() {
	var today = new Date()
	var dayOfWeek = today.getDay()
	var dayOfMonth = today.getDate()
	/*
	var month = today.getMonth()
	var year = today.getFullYear()
	*/
	
	var lastDay = (dayOfMonth < 20) ? 2 : 1
	
	// Ceria jusqu'au mardi soir
	if (dayOfWeek == lastDay) {
		var hours = today.getHours()
		return (hours > 16)
	}
	// Ceria le lundi
	else if (dayOfWeek == 1)
		return false
	
	// Congé le reste de la semaine
	return true
}
