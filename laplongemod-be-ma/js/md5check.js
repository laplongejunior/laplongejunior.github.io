var m_boxDoc, m_divDoc;
var m_correctHashes;

function initMD5(boxId, divId, keyId)
{
	m_boxDoc = document.getElementById(boxId);
	m_divDoc = document.getElementById(divId);
	
	var namedArgs = 2;
	m_correctHashes = new Array(arguments.length-namedArgs);
	
	for (var i = 0; i < m_correctHashes.length; i++)
	{
		var doc = document.getElementById(arguments[i+namedArgs]);
		m_correctHashes[i] = doc.innerHTML.replace(/\t| |\r?\n|\r/gm,'');
		console.log(m_correctHashes[i]);
	}
}

function updateMD5()
{
	var MD5input = m_boxDoc.value.trim();
	if (MD5input.length == 0)
	{
		m_divDoc.innerHTML = "";
		return;
	}
	
	var compareResult = -1;
	for (var i = 0; i < m_correctHashes.length; i++)
	{
		var compare = compareHexa(MD5input, m_correctHashes[i]);
		if (compare === null) { compareResult = -2; break; }
		else if (compare === true) { compareResult = i; break; }
	}
	
	switch (compareResult)
	{
		case -2:
			m_divDoc.innerHTML = "<font color='red'>Un MD5 contient 32 caractères</font>";
			break;
		case -1:
			m_divDoc.innerHTML = "<font color='red'>Ce MD5 ne correspond à aucun fichier: retéléchargez</font>";
			break;
		default:
			m_divDoc.innerHTML = "<font color='green'>Les MD5 correspondent : votre fichier est à jour</font>";
			break;
	}
}

function compareHexa(badMD5, goodMD5)
{
	var length = goodMD5.length;
	if (badMD5.length != length) return null;
	badMD5 = badMD5.toLowerCase();
	
	for (var i = 0; i < length; i++)
		if (badMD5[i] != goodMD5[i])
			return false;
	return true;
}
