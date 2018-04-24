function controlAdWarning(warningId)
{
  var doc = document.getElementById(warningId);
  if (doc !== null)
    doc.style.visibility = isInIFRAME() ? 'visible':'hidden';
}

function isInIFRAME()
{
    try { return window.self !== window.top; }
    catch (e) { return true; }
}
