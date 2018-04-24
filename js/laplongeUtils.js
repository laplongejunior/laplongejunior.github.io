function sanitizeConsole()
{
  if (!window.console) window.console = {
    log: function() {},
    error: function() {},
    clear: function() {}
  };
}

function removeElement(element)
{
  element.parentNode.removeChild(element);
}
