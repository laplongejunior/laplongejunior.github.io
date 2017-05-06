window.laplonge_enumOS = {
  UNKNOWN : 0,
  WINDOWS : 1,
  MAC : 2,
  LINUX : 3,
  UNIX : 4
}

var OSclass, otherClass, userOS;

function getUserOS()
{
  var appVersion = navigator.appVersion;
  if (appVersion.indexOf("Win")!=-1) return window.laplonge_enumOS.WINDOWS;
  if (appVersion.indexOf("Mac")!=-1) return window.laplonge_enumOS.MAC;
  if (appVersion.indexOf("X11")!=-1) return window.laplonge_enumOS.UNIX;
  if (appVersion.indexOf("Linux")!=-1) return window.laplonge_enumOS.LINUX;
  return window.laplonge_enumOS.UNKNOWN;
}

function initOSloading(classMatch, classInvalid)
{
  OSclass = classMatch;
  otherClass = classInvalid;
  userOS = getUserOS();
}

function adaptButtonToOS(buttonID, OS)
{
  var button = document.getElementByID(buttonID);
  if (userOS === OS) button.class = OSclass;
  else button.class = otherClass;
}
