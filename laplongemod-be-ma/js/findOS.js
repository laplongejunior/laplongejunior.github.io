window.laplonge_enumOS = {
  UNKNOWN : 0,
  WINDOWS : 1,
  MAC : 2,
  LINUX : 3,
  UNIX : 4
}

var m_defaultClass, m_matchClass, m_invalidClass;
var m_userOS = getUserOS();

function getUserOS()
{
  var appVersion = navigator.appVersion;
  if (appVersion.indexOf("Win")!=-1) return window.laplonge_enumOS.WINDOWS;
  if (appVersion.indexOf("Mac")!=-1) return window.laplonge_enumOS.MAC;
  if (appVersion.indexOf("X11")!=-1) return window.laplonge_enumOS.UNIX;
  if (appVersion.indexOf("Linux")!=-1) return window.laplonge_enumOS.LINUX;
  return window.laplonge_enumOS.UNKNOWN;
}

function initOSloading(defaultClass, matchClass, invalidClass)
{
  m_defaultClass = defaultClass;
  m_matchClass = matchClass;
  m_invalidClass = invalidClass; 
}

function adaptButtonToOS(buttonID, targetOS)
{
  if (m_userOS === window.laplonge_enumOS.UNKNOWN) return;
  var button = document.getElementById(buttonID); 
  
  switch (targetOS)
  {
    case window.laplonge_enumOS.UNKNOWN:
      button.classList.add(m_defaultClass);
      break;
    case m_userOS:
      button.classList.add(m_matchClass);
      break;
    default:
      button.classList.add(m_invalidClass);
      break;
  }
}
