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
  m_matchClass = classMatch;
  m_invalidClass = classInvalid;
  m_unknownClass = classUnknown;  
}

function adaptButtonToOS(buttonID, OS)
{
  var button = document.getElementById(buttonID);
  button.classList.remove(m_defaultClass);
  if (OS === userOS) button.classList.add(m_matchClass);
  else if (OS == window.laplonge_enumOS.UNKNOWN) button.classList.add(m_unknownClass);
  else button.classList.add(m_invalidClass);
}
