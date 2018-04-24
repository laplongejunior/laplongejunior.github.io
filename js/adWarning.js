function controlAdWarning(warningId)
{
  var doc = document.getElementById(warningId);
  console.log(laplongeUtils_isInIFRAME());
  if (doc !== null && laplongeUtils_isInIFRAME())
    laplongeUtils_removeElement(doc);
}
