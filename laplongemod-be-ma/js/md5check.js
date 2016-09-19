var laplongeInstallerMD5 = "f06bab837c300490573726dff6aa7d41";

var boxDoc;
var divDoc;
function initMD5(boxId, divId)
{
	boxDoc = document.getElementById(boxId);
	divDoc = document.getElementById(divId);
}

function updateMD5()
{
	var MD5 = boxDoc.value.trim();
	if (MD5.length == 0)
	{
		divDoc.innerHTML = "";
		return;
	}
	
	var compare = compareHexa(MD5, laplongeInstallerMD5);
	
	if (compare === null)
		divDoc.innerHTML = "<font color='red'>Un MD5 contient 32 caractères</font>";
	else if (!compare)
		divDoc.innerHTML = "<font color='red'>Ce MD5 n'est pas le bon</font>";
	else
		divDoc.innerHTML = "<font color='green'>Les MD5 correspondent</font>";
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
