var m_boxDoc, m_divDoc;
var m_files, m_correctHashes;

function initHash(boxId, divId, ...args)
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

function updateHash()
{
	var hashInput = m_boxDoc.value.trim();
	if (hashInput.length == 0)
	{
		m_divDoc.innerHTML = "";
		return;
	}
	
	var compareResult = -1;
	for (var i = 0; i < m_correctHashes.length; i++)
	{
		var compare = compareHexa(hashInput, m_correctHashes[i]);
		if (compare === null) { compareResult = -2; break; }
		else if (compare === true) { compareResult = i; break; }
	}
	
	switch (compareResult)
	{
		case -2:
			m_divDoc.innerHTML = "<font color='red'>Un SHA1 contient 40 caractères</font>";
			break;
		case -1:
			m_divDoc.innerHTML = "<font color='red'>Ce SHA1 ne correspond à aucun fichier: retéléchargez</font>";
			break;
		default:
			m_divDoc.innerHTML = "<font color='green'>Les SHA1 correspondent : "+ m_files[i] +" est à jour</font>";
			break;
	}
}

function compareHexa(badHash, goodHash)
{
	var length = goodHash.length;
	if (badHash.length != length) return null;
	badHash = badHash.toLowerCase();
	
	for (var i = 0; i < length; i++)
		if (badHash[i] != goodHash[i])
			return false;
	return true;
}
