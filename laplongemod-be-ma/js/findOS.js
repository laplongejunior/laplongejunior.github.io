window.laplonge_enumOS = {
  UNKNOWN : 0,
  WINDOWS : 1,
  MAC : 2,
  LINUX : 3,
  UNIX : 4
}

var m_matchClass, m_invalidClass, m_unknownClass;
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

function initOSloading(matchClass, invalidClass, unknownClass)
{
  m_matchClass = classMatch;
  m_invalidClass = classInvalid;
  m_unknownClass = classUnknown;  
}

function adaptButtonToOS(buttonID, OS)
{
  var button = document.getElementById(buttonID);
  if (OS === userOS) button.class = m_matchClass;
  else if (OS == window.laplonge_enumOS.UNKNOWN) button.class = m_unknownClass;
  else button.class = m_invalidClass;
}
