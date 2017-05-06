var m_boxDoc, m_divDoc;
function initMD5(boxId, divId)
{
	m_boxDoc = document.getElementById(boxId);
	m_divDoc = document.getElementById(divId);
}

var m_goodMD5;
function setMD5(spanId, MD5hash)
{
	m_goodMD5 = MD5hash;
	document.getElementById(spanId).innerHTML = m_goodMD5;
}

function updateMD5()
{
	var MD5input = m_boxDoc.value.trim();
	if (MD5input.length == 0)
	{
		m_divDoc.innerHTML = "";
		return;
	}
	
	var compare = compareHexa(MD5input, m_goodMD5);
	
	if (compare === null)
		m_divDoc.innerHTML = "<font color='red'>Un MD5 contient 32 caractères</font>";
	else if (!compare)
		m_divDoc.innerHTML = "<font color='red'>Ce MD5 n'est pas le bon : retéléchargez votre fichier</font>";
	else
		m_divDoc.innerHTML = "<font color='green'>Les MD5 correspondent : votre fichier est à jour</font>";
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
