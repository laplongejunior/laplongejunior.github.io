function controlAdWarning(warningId)
{
  var doc = document.getElementById(warningId);
  if (doc !== null && !laplongeUtils_isInIFRAME())
    laplongeUtils_removeElement(doc);
}
