var template = (function () {
  function literalSource (str) {
    return str ? '+' + JSON.stringify(str) : '';
  }

  function valueSource (key) {
    return '+e(v(o, ' + JSON.stringify(key) + '))';
  }

  function getValue (obj, dotKey) {
    if (!dotKey) {
      return obj
    }
    var keys = dotKey.split('.');
    var result = obj;
    for (var i = 0; i < keys.length; i++) {
      result = result[keys[i]];
      if (result === undefined || result === null) {
        return;
      }
    }
    return result;
  }

  function escapeHTML (value) {
    return value
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return function compile (template, re, e) {
    re = re || /\{\s*([\S\s]*?)\s*\}/g;
    e = e || escapeHTML;

    var source = 'return ""';

    var result;
    var lastIndex = 0;
    while (result = re.exec(template)) {
      source += literalSource(template.slice(lastIndex, result.index));
      source += valueSource(result[1]);
      lastIndex = re.lastIndex;
    }
    source += literalSource(template.slice(lastIndex));

    var render = new Function('o', 'v', 'e', source);
    return function (obj) {
      return render(obj, getValue, e);
    }
  }
})();

if (typeof module === 'object' && module.exports) {
  module.exports = template;
}
