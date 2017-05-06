window.laplonge_enumOS = {
  UNKNOWN : 0,
  WINDOWS : 1,
  MAC : 2,
  LINUX : 3,
  UNIX : 4
}

var m_DefaultClass, m_matchClass, m_invalidClass, m_unknownClass;
var userOS = getUserOS();

function getUserOS()
{
  var appVersion = navigator.appVersion;
  if (appVersion.indexOf("Win")!=-1) return window.laplonge_enumOS.WINDOWS;
  if (appVersion.indexOf("Mac")!=-1) return window.laplonge_enumOS.MAC;
  if (appVersion.indexOf("X11")!=-1) return window.laplonge_enumOS.UNIX;
  if (appVersion.indexOf("Linux")!=-1) return window.laplonge_enumOS.LINUX;
  return window.laplonge_enumOS.UNKNOWN;
}

function initOSloading(defaultClass, matchClass, invalidClass, unknownClass)
{
  m_defaultClass = defaultClass;
  m_matchClass = matchClass;
  m_invalidClass = invalidClass;
  m_unknownClass = unknownClass;  
}

var m_goodOSfound = [];
function adaptButtonToOS(buttonID, targetOS, arrayID)
{
  var button = document.getElementById(buttonID);
  var newClass;
  
  if (targetOS === userOS) {
    var index = m_goodOSfound.indexOf(arrayID);
    if (index === -1) m_goodOSfound.push(arrayID);
    newClass = m_matchClass;
  }  
  else if (targetOS !== window.laplonge_enumOS.UNKNOWN) newClass = m_invalidClass;
  else if (m_goodOSfound.indexOf(arrayID) !== -1) newClass = m_matchClass;
  else newClass = m_unknownClass;
  
  button.classList.remove(m_defaultClass);
  button.classList.add(newClass);
}
