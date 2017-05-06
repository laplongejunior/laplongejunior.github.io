window.laplonge_enumOS = {
  UNKNOWN = 0,
  WINDOWS = 1,
  MAC = 2,
  LINUX = 3,
  UNIX = 4
}

function getUserOS()
{
  if (navigator.appVersion.indexOf("Win")!=-1) return EnumOS.WINDOWS;
  if (navigator.appVersion.indexOf("Mac")!=-1) return EnumOS.MAC;
  if (navigator.appVersion.indexOf("X11")!=-1) return EnumOS.UNIX;
  if (navigator.appVersion.indexOf("Linux")!=-1) return EnumOS.LINUX;
  return EnumOS.UNKNOWN;
}
