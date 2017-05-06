var boxDoc;
var divDoc;
function initMD5(boxId, divId)
{
	boxDoc = document.getElementById(boxId);
	divDoc = document.getElementById(divId);
}

var goodMD5;
function setMD5(spanId, MD5hash)
{
	goodMD5 = MD5hash;
	alert(spanId);
	document.getElementById(spanId).innerHTML = goodMD5;
}

function updateMD5()
{
	var MD5input = boxDoc.value.trim();
	if (MD5input.length == 0)
	{
		divDoc.innerHTML = "";
		return;
	}
	
	var compare = compareHexa(MD5input, goodMD5);
	
	if (compare === null)
		divDoc.innerHTML = "<font color='red'>Un MD5 contient 32 caractères</font>";
	else if (!compare)
		divDoc.innerHTML = "<font color='red'>Ce MD5 n'est pas le bon : retéléchargez votre fichier</font>";
	else
		divDoc.innerHTML = "<font color='green'>Les MD5 correspondent : votre fichier est à jour</font>";
}

function compareHexa(badMD5, goodMD5)
{
	var length = goodMD5.length;
	if (badMD5.length != length) return null;
	badMD5 = badMD5.toLowerCase();
	
	for (var i = 0; i < length; i++)
	{
		if (badMD5[i] != goodMD5[i])
			return false;
	}
	return true;
}
