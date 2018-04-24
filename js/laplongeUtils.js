function laplongeUtils_sanitizeConsole()
{
  if (!window.console) window.console = {
    log: function() {},
    error: function() {},
    clear: function() {}
  };
}

function laplongeUtils_removeElement(element) { element.parentNode.removeChild(element); }
