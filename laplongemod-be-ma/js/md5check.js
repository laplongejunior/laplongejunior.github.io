var m_boxDoc, m_divDoc;
var m_files, m_correctHashes;

function initMD5(boxId, divId, ...args)
{
	m_boxDoc = document.getElementById(boxId);
	m_divDoc = document.getElementById(divId);
	
	m_files = new Array(args.length);	
	m_correctHashes = new Array(args.length);
	
	for (var i = 0; i < args.length; i++)
	{
		var doc = document.getElementById(args[i]);
		if (doc === null) continue;
		var data = doc.innerHTML.replace(/\t| |\r?\n|\r/gm,'');
		m_files[i] = data.substring(0, data.length-33);
		m_correctHashes[i] = data.substring(data.length-32);
		console.log(m_files[i] + " " + m_correctHashes[i]);
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
			m_divDoc.innerHTML = "<font color='green'>Les MD5 correspondent : "+ m_files[i] +" est à jour</font>";
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
