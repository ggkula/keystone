(function () {
var mobile = (function () {
  'use strict';

  var noop = function () {
  };
  var noarg = function (f) {
    return function () {
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never$1 = constant(false);
  var always$1 = constant(true);
  var $_30v3piwajcfx5gy5 = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never$1,
    always: always$1
  };

  var never = $_30v3piwajcfx5gy5.never;
  var always = $_30v3piwajcfx5gy5.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never,
      isSome: never,
      isNone: always,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_30v3piwajcfx5gy5.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always,
      isNone: never,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var $_8i7mfvw9jcfx5gxw = {
    some: some,
    none: none,
    from: from
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.some(r);
  };
  var contains$1 = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_8i7mfvw9jcfx5gxw.some(x);
      }
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return $_8i7mfvw9jcfx5gxw.some(i);
      }
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains$1(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.some(xs[xs.length - 1]);
  };
  var $_91ik4uw8jcfx5gxn = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains$1,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var global = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_9g0yftwdjcfx5gyd = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_9g0yftwdjcfx5gyd.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_a98lhfwcjcfx5gyb = { getOrDie: getOrDie };

  var node = function () {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_3hr4qowbjcfx5gy9 = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_8ohqlxwgjcfx5gym = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$1 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu$1(group(1), group(2));
  };
  var detect$2 = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown$1();
    return find$1(versionRegexes, cleanedAgent);
  };
  var unknown$1 = function () {
    return nu$1(0, 0);
  };
  var nu$1 = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_pdc4fwjjcfx5gyt = {
    nu: nu$1,
    detect: detect$2,
    unknown: unknown$1
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown = function () {
    return nu({
      current: undefined,
      version: $_pdc4fwjjcfx5gyt.unknown()
    });
  };
  var nu = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_ab7t5jwijcfx5gyq = {
    unknown: unknown,
    nu: nu,
    edge: $_30v3piwajcfx5gy5.constant(edge),
    chrome: $_30v3piwajcfx5gy5.constant(chrome),
    ie: $_30v3piwajcfx5gy5.constant(ie),
    opera: $_30v3piwajcfx5gy5.constant(opera),
    firefox: $_30v3piwajcfx5gy5.constant(firefox),
    safari: $_30v3piwajcfx5gy5.constant(safari)
  };

  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_pdc4fwjjcfx5gyt.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_cutwqbwkjcfx5gyv = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_30v3piwajcfx5gy5.constant(windows),
    ios: $_30v3piwajcfx5gy5.constant(ios),
    android: $_30v3piwajcfx5gy5.constant(android),
    linux: $_30v3piwajcfx5gy5.constant(linux),
    osx: $_30v3piwajcfx5gy5.constant(osx),
    solaris: $_30v3piwajcfx5gy5.constant(solaris),
    freebsd: $_30v3piwajcfx5gy5.constant(freebsd)
  };

  var DeviceType = function (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_30v3piwajcfx5gy5.constant(isiPad),
      isiPhone: $_30v3piwajcfx5gy5.constant(isiPhone),
      isTablet: $_30v3piwajcfx5gy5.constant(isTablet),
      isPhone: $_30v3piwajcfx5gy5.constant(isPhone),
      isTouch: $_30v3piwajcfx5gy5.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_30v3piwajcfx5gy5.constant(iOSwebview)
    };
  };

  var detect$3 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_91ik4uw8jcfx5gxn.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$3(browsers, userAgent).map(function (browser) {
      var version = $_pdc4fwjjcfx5gyt.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$3(oses, userAgent).map(function (os) {
      var version = $_pdc4fwjjcfx5gyt.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_3hfvqkwmjcfx5gz7 = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_e6c4u9wpjcfx5gzu = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.some(str.substring(1));
  };
  var $_6108ouwqjcfx5gzx = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_e6c4u9wpjcfx5gzu.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_e6c4u9wpjcfx5gzu.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_e6c4u9wpjcfx5gzu.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_e6c4u9wpjcfx5gzu.addToEnd(str, prefix);
  };
  var contains$2 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_6108ouwqjcfx5gzx.head(str).bind(function (head) {
      return $_6108ouwqjcfx5gzx.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_epbu6vwojcfx5gzq = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$2,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_epbu6vwojcfx5gzq.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_epbu6vwojcfx5gzq.contains(uastring, 'edge/') && $_epbu6vwojcfx5gzq.contains(uastring, 'chrome') && $_epbu6vwojcfx5gzq.contains(uastring, 'safari') && $_epbu6vwojcfx5gzq.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_epbu6vwojcfx5gzq.contains(uastring, 'chrome') && !$_epbu6vwojcfx5gzq.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_epbu6vwojcfx5gzq.contains(uastring, 'msie') || $_epbu6vwojcfx5gzq.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_epbu6vwojcfx5gzq.contains(uastring, 'safari') || $_epbu6vwojcfx5gzq.contains(uastring, 'mobile/')) && $_epbu6vwojcfx5gzq.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_epbu6vwojcfx5gzq.contains(uastring, 'iphone') || $_epbu6vwojcfx5gzq.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_26bvkpwnjcfx5gzc = {
    browsers: $_30v3piwajcfx5gy5.constant(browsers),
    oses: $_30v3piwajcfx5gy5.constant(oses)
  };

  var detect$1 = function (userAgent) {
    var browsers = $_26bvkpwnjcfx5gzc.browsers();
    var oses = $_26bvkpwnjcfx5gzc.oses();
    var browser = $_3hfvqkwmjcfx5gz7.detectBrowser(browsers, userAgent).fold($_ab7t5jwijcfx5gyq.unknown, $_ab7t5jwijcfx5gyq.nu);
    var os = $_3hfvqkwmjcfx5gz7.detectOs(oses, userAgent).fold($_cutwqbwkjcfx5gyv.unknown, $_cutwqbwkjcfx5gyv.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_6f8cwzwhjcfx5gyo = { detect: detect$1 };

  var detect = $_8ohqlxwgjcfx5gym.cached(function () {
    var userAgent = navigator.userAgent;
    return $_6f8cwzwhjcfx5gyo.detect(userAgent);
  });
  var $_f916s2wfjcfx5gyj = { detect: detect };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_30v3piwajcfx5gy5.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return $_8i7mfvw9jcfx5gxw.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_6k7v3dwsjcfx5h08 = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_g5801wtjcfx5h0g = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var ELEMENT = $_g5801wtjcfx5h0g.ELEMENT;
  var DOCUMENT = $_g5801wtjcfx5h0g.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_91ik4uw8jcfx5gxn.map(base.querySelectorAll(selector), $_6k7v3dwsjcfx5h08.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? $_8i7mfvw9jcfx5gxw.none() : $_8i7mfvw9jcfx5gxw.from(base.querySelector(selector)).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var $_7uhcp6wrjcfx5h00 = {
    all: all,
    is: is,
    one: one
  };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_91ik4uw8jcfx5gxn.exists(elements, $_30v3piwajcfx5gy5.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_3hr4qowbjcfx5gy9.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_f916s2wfjcfx5gyj.detect().browser;
  var contains = browser.isIE() ? ieContains : regularContains;
  var $_7yb5g2w7jcfx5gx7 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains,
    is: $_7uhcp6wrjcfx5h00.is
  };

  var isSource = function (component, simulatedEvent) {
    return $_7yb5g2w7jcfx5gx7.eq(component.element(), simulatedEvent.event().target());
  };
  var $_2isn1aw6jcfx5gx0 = { isSource: isSource };

  var $_7eoluuwwjcfx5h0z = {
    contextmenu: $_30v3piwajcfx5gy5.constant('contextmenu'),
    touchstart: $_30v3piwajcfx5gy5.constant('touchstart'),
    touchmove: $_30v3piwajcfx5gy5.constant('touchmove'),
    touchend: $_30v3piwajcfx5gy5.constant('touchend'),
    gesturestart: $_30v3piwajcfx5gy5.constant('gesturestart'),
    mousedown: $_30v3piwajcfx5gy5.constant('mousedown'),
    mousemove: $_30v3piwajcfx5gy5.constant('mousemove'),
    mouseout: $_30v3piwajcfx5gy5.constant('mouseout'),
    mouseup: $_30v3piwajcfx5gy5.constant('mouseup'),
    mouseover: $_30v3piwajcfx5gy5.constant('mouseover'),
    focusin: $_30v3piwajcfx5gy5.constant('focusin'),
    keydown: $_30v3piwajcfx5gy5.constant('keydown'),
    input: $_30v3piwajcfx5gy5.constant('input'),
    change: $_30v3piwajcfx5gy5.constant('change'),
    focus: $_30v3piwajcfx5gy5.constant('focus'),
    click: $_30v3piwajcfx5gy5.constant('click'),
    transitionend: $_30v3piwajcfx5gy5.constant('transitionend'),
    selectstart: $_30v3piwajcfx5gy5.constant('selectstart')
  };

  var alloy = { tap: $_30v3piwajcfx5gy5.constant('alloy.tap') };
  var $_fe7kcdwvjcfx5h0s = {
    focus: $_30v3piwajcfx5gy5.constant('alloy.focus'),
    postBlur: $_30v3piwajcfx5gy5.constant('alloy.blur.post'),
    receive: $_30v3piwajcfx5gy5.constant('alloy.receive'),
    execute: $_30v3piwajcfx5gy5.constant('alloy.execute'),
    focusItem: $_30v3piwajcfx5gy5.constant('alloy.focus.item'),
    tap: alloy.tap,
    tapOrClick: $_f916s2wfjcfx5gyj.detect().deviceType.isTouch() ? alloy.tap : $_7eoluuwwjcfx5h0z.click,
    longpress: $_30v3piwajcfx5gy5.constant('alloy.longpress'),
    sandboxClose: $_30v3piwajcfx5gy5.constant('alloy.sandbox.close'),
    systemInit: $_30v3piwajcfx5gy5.constant('alloy.system.init'),
    windowScroll: $_30v3piwajcfx5gy5.constant('alloy.system.scroll'),
    attachedToDom: $_30v3piwajcfx5gy5.constant('alloy.system.attached'),
    detachedFromDom: $_30v3piwajcfx5gy5.constant('alloy.system.detached'),
    changeTab: $_30v3piwajcfx5gy5.constant('alloy.change.tab'),
    dismissTab: $_30v3piwajcfx5gy5.constant('alloy.dismiss.tab')
  };

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_7mrhymwyjcfx5h18 = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var shallow = function (old, nu) {
    return nu;
  };
  var deep = function (old, nu) {
    var bothObjects = $_7mrhymwyjcfx5h18.isObject(old) && $_7mrhymwyjcfx5h18.isObject(nu);
    return bothObjects ? deepMerge(old, nu) : nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var deepMerge = baseMerge(deep);
  var merge = baseMerge(shallow);
  var $_cvmq7wxjcfx5h15 = {
    deepMerge: deepMerge,
    merge: merge
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$2 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return $_8i7mfvw9jcfx5gxw.some(x);
      }
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_929ptpwzjcfx5h1b = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$2,
    keys: keys,
    values: values,
    size: size
  };

  var emit = function (component, event) {
    dispatchWith(component, component.element(), event, {});
  };
  var emitWith = function (component, event, properties) {
    dispatchWith(component, component.element(), event, properties);
  };
  var emitExecute = function (component) {
    emit(component, $_fe7kcdwvjcfx5h0s.execute());
  };
  var dispatch = function (component, target, event) {
    dispatchWith(component, target, event, {});
  };
  var dispatchWith = function (component, target, event, properties) {
    var data = $_cvmq7wxjcfx5h15.deepMerge({ target: target }, properties);
    component.getSystem().triggerEvent(event, target, $_929ptpwzjcfx5h1b.map(data, $_30v3piwajcfx5gy5.constant));
  };
  var dispatchEvent = function (component, target, event, simulatedEvent) {
    component.getSystem().triggerEvent(event, target, simulatedEvent.event());
  };
  var dispatchFocus = function (component, target) {
    component.getSystem().triggerFocus(target, component.element());
  };
  var $_7pg78vwujcfx5h0i = {
    emit: emit,
    emitWith: emitWith,
    emitExecute: emitExecute,
    dispatch: dispatch,
    dispatchWith: dispatchWith,
    dispatchEvent: dispatchEvent,
    dispatchFocus: dispatchFocus
  };

  var generate = function (cases) {
    if (!$_7mrhymwyjcfx5h18.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_91ik4uw8jcfx5gxn.each(cases, function (acase, count) {
      var keys = $_929ptpwzjcfx5h1b.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_7mrhymwyjcfx5h18.isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = $_929ptpwzjcfx5h1b.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_91ik4uw8jcfx5gxn.forall(constructors, function (reqKey) {
            return $_91ik4uw8jcfx5gxn.contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var $_49o4fsx3jcfx5h2a = { generate: generate };

  var adt = $_49o4fsx3jcfx5h2a.generate([
    { strict: [] },
    { defaultedThunk: ['fallbackThunk'] },
    { asOption: [] },
    { asDefaultedOptionThunk: ['fallbackThunk'] },
    { mergeWithThunk: ['baseThunk'] }
  ]);
  var defaulted$1 = function (fallback) {
    return adt.defaultedThunk($_30v3piwajcfx5gy5.constant(fallback));
  };
  var asDefaultedOption = function (fallback) {
    return adt.asDefaultedOptionThunk($_30v3piwajcfx5gy5.constant(fallback));
  };
  var mergeWith = function (base) {
    return adt.mergeWithThunk($_30v3piwajcfx5gy5.constant(base));
  };
  var $_4dvdewx2jcfx5h25 = {
    strict: adt.strict,
    asOption: adt.asOption,
    defaulted: defaulted$1,
    defaultedThunk: adt.defaultedThunk,
    asDefaultedOption: asDefaultedOption,
    asDefaultedOptionThunk: adt.asDefaultedOptionThunk,
    mergeWith: mergeWith,
    mergeWithThunk: adt.mergeWithThunk
  };

  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return $_8i7mfvw9jcfx5gxw.some(o);
    };
    return {
      is: is,
      isValue: $_30v3piwajcfx5gy5.constant(true),
      isError: $_30v3piwajcfx5gy5.constant(false),
      getOr: $_30v3piwajcfx5gy5.constant(o),
      getOrThunk: $_30v3piwajcfx5gy5.constant(o),
      getOrDie: $_30v3piwajcfx5gy5.constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return $_30v3piwajcfx5gy5.die(message)();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: $_30v3piwajcfx5gy5.constant(false),
      isValue: $_30v3piwajcfx5gy5.constant(false),
      isError: $_30v3piwajcfx5gy5.constant(true),
      getOr: $_30v3piwajcfx5gy5.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_30v3piwajcfx5gy5.noop,
      bind: bind,
      exists: $_30v3piwajcfx5gy5.constant(false),
      forall: $_30v3piwajcfx5gy5.constant(true),
      toOption: $_8i7mfvw9jcfx5gxw.none
    };
  };
  var $_5jjfpzx7jcfx5h3t = {
    value: value$1,
    error: error
  };

  var comparison = $_49o4fsx3jcfx5h2a.generate([
    {
      bothErrors: [
        'error1',
        'error2'
      ]
    },
    {
      firstError: [
        'error1',
        'value2'
      ]
    },
    {
      secondError: [
        'value1',
        'error2'
      ]
    },
    {
      bothValues: [
        'value1',
        'value2'
      ]
    }
  ]);
  var partition$1 = function (results) {
    var errors = [];
    var values = [];
    $_91ik4uw8jcfx5gxn.each(results, function (result) {
      result.fold(function (err) {
        errors.push(err);
      }, function (value) {
        values.push(value);
      });
    });
    return {
      errors: errors,
      values: values
    };
  };
  var compare = function (result1, result2) {
    return result1.fold(function (err1) {
      return result2.fold(function (err2) {
        return comparison.bothErrors(err1, err2);
      }, function (val2) {
        return comparison.firstError(err1, val2);
      });
    }, function (val1) {
      return result2.fold(function (err2) {
        return comparison.secondError(val1, err2);
      }, function (val2) {
        return comparison.bothValues(val1, val2);
      });
    });
  };
  var $_3tz8qnx8jcfx5h3x = {
    partition: partition$1,
    compare: compare
  };

  var mergeValues = function (values, base) {
    return $_5jjfpzx7jcfx5h3t.value($_cvmq7wxjcfx5h15.deepMerge.apply(undefined, [base].concat(values)));
  };
  var mergeErrors = function (errors) {
    return $_30v3piwajcfx5gy5.compose($_5jjfpzx7jcfx5h3t.error, $_91ik4uw8jcfx5gxn.flatten)(errors);
  };
  var consolidateObj = function (objects, base) {
    var partitions = $_3tz8qnx8jcfx5h3x.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : mergeValues(partitions.values, base);
  };
  var consolidateArr = function (objects) {
    var partitions = $_3tz8qnx8jcfx5h3x.partition(objects);
    return partitions.errors.length > 0 ? mergeErrors(partitions.errors) : $_5jjfpzx7jcfx5h3t.value(partitions.values);
  };
  var $_1xap5vx6jcfx5h3k = {
    consolidateObj: consolidateObj,
    consolidateArr: consolidateArr
  };

  var narrow$1 = function (obj, fields) {
    var r = {};
    $_91ik4uw8jcfx5gxn.each(fields, function (field) {
      if (obj[field] !== undefined && obj.hasOwnProperty(field))
        r[field] = obj[field];
    });
    return r;
  };
  var indexOnKey$1 = function (array, key) {
    var obj = {};
    $_91ik4uw8jcfx5gxn.each(array, function (a) {
      var keyValue = a[key];
      obj[keyValue] = a;
    });
    return obj;
  };
  var exclude$1 = function (obj, fields) {
    var r = {};
    $_929ptpwzjcfx5h1b.each(obj, function (v, k) {
      if (!$_91ik4uw8jcfx5gxn.contains(fields, k)) {
        r[k] = v;
      }
    });
    return r;
  };
  var $_mel0ox9jcfx5h40 = {
    narrow: narrow$1,
    exclude: exclude$1,
    indexOnKey: indexOnKey$1
  };

  var readOpt$1 = function (key) {
    return function (obj) {
      return obj.hasOwnProperty(key) ? $_8i7mfvw9jcfx5gxw.from(obj[key]) : $_8i7mfvw9jcfx5gxw.none();
    };
  };
  var readOr$1 = function (key, fallback) {
    return function (obj) {
      return readOpt$1(key)(obj).getOr(fallback);
    };
  };
  var readOptFrom$1 = function (obj, key) {
    return readOpt$1(key)(obj);
  };
  var hasKey$1 = function (obj, key) {
    return obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null;
  };
  var $_dzifdmxajcfx5h47 = {
    readOpt: readOpt$1,
    readOr: readOr$1,
    readOptFrom: readOptFrom$1,
    hasKey: hasKey$1
  };

  var wrap$1 = function (key, value) {
    var r = {};
    r[key] = value;
    return r;
  };
  var wrapAll$1 = function (keyvalues) {
    var r = {};
    $_91ik4uw8jcfx5gxn.each(keyvalues, function (kv) {
      r[kv.key] = kv.value;
    });
    return r;
  };
  var $_2f3tbgxbjcfx5h4d = {
    wrap: wrap$1,
    wrapAll: wrapAll$1
  };

  var narrow = function (obj, fields) {
    return $_mel0ox9jcfx5h40.narrow(obj, fields);
  };
  var exclude = function (obj, fields) {
    return $_mel0ox9jcfx5h40.exclude(obj, fields);
  };
  var readOpt = function (key) {
    return $_dzifdmxajcfx5h47.readOpt(key);
  };
  var readOr = function (key, fallback) {
    return $_dzifdmxajcfx5h47.readOr(key, fallback);
  };
  var readOptFrom = function (obj, key) {
    return $_dzifdmxajcfx5h47.readOptFrom(obj, key);
  };
  var wrap = function (key, value) {
    return $_2f3tbgxbjcfx5h4d.wrap(key, value);
  };
  var wrapAll = function (keyvalues) {
    return $_2f3tbgxbjcfx5h4d.wrapAll(keyvalues);
  };
  var indexOnKey = function (array, key) {
    return $_mel0ox9jcfx5h40.indexOnKey(array, key);
  };
  var consolidate = function (objs, base) {
    return $_1xap5vx6jcfx5h3k.consolidateObj(objs, base);
  };
  var hasKey = function (obj, key) {
    return $_dzifdmxajcfx5h47.hasKey(obj, key);
  };
  var $_42faa8x5jcfx5h3h = {
    narrow: narrow,
    exclude: exclude,
    readOpt: readOpt,
    readOr: readOr,
    readOptFrom: readOptFrom,
    wrap: wrap,
    wrapAll: wrapAll,
    indexOnKey: indexOnKey,
    hasKey: hasKey,
    consolidate: consolidate
  };

  var json = function () {
    return $_a98lhfwcjcfx5gyb.getOrDie('JSON');
  };
  var parse = function (obj) {
    return json().parse(obj);
  };
  var stringify = function (obj, replacer, space) {
    return json().stringify(obj, replacer, space);
  };
  var $_euz44nxejcfx5h51 = {
    parse: parse,
    stringify: stringify
  };

  var formatObj = function (input) {
    return $_7mrhymwyjcfx5h18.isObject(input) && $_929ptpwzjcfx5h1b.keys(input).length > 100 ? ' removed due to size' : $_euz44nxejcfx5h51.stringify(input, null, 2);
  };
  var formatErrors = function (errors) {
    var es = errors.length > 10 ? errors.slice(0, 10).concat([{
        path: [],
        getErrorInfo: function () {
          return '... (only showing first ten failures)';
        }
      }]) : errors;
    return $_91ik4uw8jcfx5gxn.map(es, function (e) {
      return 'Failed path: (' + e.path.join(' > ') + ')\n' + e.getErrorInfo();
    });
  };
  var $_1i6xs7xdjcfx5h4s = {
    formatObj: formatObj,
    formatErrors: formatErrors
  };

  var nu$4 = function (path, getErrorInfo) {
    return $_5jjfpzx7jcfx5h3t.error([{
        path: path,
        getErrorInfo: getErrorInfo
      }]);
  };
  var missingStrict = function (path, key, obj) {
    return nu$4(path, function () {
      return 'Could not find valid *strict* value for "' + key + '" in ' + $_1i6xs7xdjcfx5h4s.formatObj(obj);
    });
  };
  var missingKey = function (path, key) {
    return nu$4(path, function () {
      return 'Choice schema did not contain choice key: "' + key + '"';
    });
  };
  var missingBranch = function (path, branches, branch) {
    return nu$4(path, function () {
      return 'The chosen schema: "' + branch + '" did not exist in branches: ' + $_1i6xs7xdjcfx5h4s.formatObj(branches);
    });
  };
  var unsupportedFields = function (path, unsupported) {
    return nu$4(path, function () {
      return 'There are unsupported fields: [' + unsupported.join(', ') + '] specified';
    });
  };
  var custom = function (path, err) {
    return nu$4(path, function () {
      return err;
    });
  };
  var toString = function (error) {
    return 'Failed path: (' + error.path.join(' > ') + ')\n' + error.getErrorInfo();
  };
  var $_1knk5mxcjcfx5h4m = {
    missingStrict: missingStrict,
    missingKey: missingKey,
    missingBranch: missingBranch,
    unsupportedFields: unsupportedFields,
    custom: custom,
    toString: toString
  };

  var typeAdt = $_49o4fsx3jcfx5h2a.generate([
    {
      setOf: [
        'validator',
        'valueType'
      ]
    },
    { arrOf: ['valueType'] },
    { objOf: ['fields'] },
    { itemOf: ['validator'] },
    {
      choiceOf: [
        'key',
        'branches'
      ]
    }
  ]);
  var fieldAdt = $_49o4fsx3jcfx5h2a.generate([
    {
      field: [
        'name',
        'presence',
        'type'
      ]
    },
    { state: ['name'] }
  ]);
  var $_lktv9xfjcfx5h54 = {
    typeAdt: typeAdt,
    fieldAdt: fieldAdt
  };

  var adt$1 = $_49o4fsx3jcfx5h2a.generate([
    {
      field: [
        'key',
        'okey',
        'presence',
        'prop'
      ]
    },
    {
      state: [
        'okey',
        'instantiator'
      ]
    }
  ]);
  var output = function (okey, value) {
    return adt$1.state(okey, $_30v3piwajcfx5gy5.constant(value));
  };
  var snapshot = function (okey) {
    return adt$1.state(okey, $_30v3piwajcfx5gy5.identity);
  };
  var strictAccess = function (path, obj, key) {
    return $_dzifdmxajcfx5h47.readOptFrom(obj, key).fold(function () {
      return $_1knk5mxcjcfx5h4m.missingStrict(path, key, obj);
    }, $_5jjfpzx7jcfx5h3t.value);
  };
  var fallbackAccess = function (obj, key, fallbackThunk) {
    var v = $_dzifdmxajcfx5h47.readOptFrom(obj, key).fold(function () {
      return fallbackThunk(obj);
    }, $_30v3piwajcfx5gy5.identity);
    return $_5jjfpzx7jcfx5h3t.value(v);
  };
  var optionAccess = function (obj, key) {
    return $_5jjfpzx7jcfx5h3t.value($_dzifdmxajcfx5h47.readOptFrom(obj, key));
  };
  var optionDefaultedAccess = function (obj, key, fallback) {
    var opt = $_dzifdmxajcfx5h47.readOptFrom(obj, key).map(function (val) {
      return val === true ? fallback(obj) : val;
    });
    return $_5jjfpzx7jcfx5h3t.value(opt);
  };
  var cExtractOne = function (path, obj, field, strength) {
    return field.fold(function (key, okey, presence, prop) {
      var bundle = function (av) {
        return prop.extract(path.concat([key]), strength, av).map(function (res) {
          return $_2f3tbgxbjcfx5h4d.wrap(okey, strength(res));
        });
      };
      var bundleAsOption = function (optValue) {
        return optValue.fold(function () {
          var outcome = $_2f3tbgxbjcfx5h4d.wrap(okey, strength($_8i7mfvw9jcfx5gxw.none()));
          return $_5jjfpzx7jcfx5h3t.value(outcome);
        }, function (ov) {
          return prop.extract(path.concat([key]), strength, ov).map(function (res) {
            return $_2f3tbgxbjcfx5h4d.wrap(okey, strength($_8i7mfvw9jcfx5gxw.some(res)));
          });
        });
      };
      return function () {
        return presence.fold(function () {
          return strictAccess(path, obj, key).bind(bundle);
        }, function (fallbackThunk) {
          return fallbackAccess(obj, key, fallbackThunk).bind(bundle);
        }, function () {
          return optionAccess(obj, key).bind(bundleAsOption);
        }, function (fallbackThunk) {
          return optionDefaultedAccess(obj, key, fallbackThunk).bind(bundleAsOption);
        }, function (baseThunk) {
          var base = baseThunk(obj);
          return fallbackAccess(obj, key, $_30v3piwajcfx5gy5.constant({})).map(function (v) {
            return $_cvmq7wxjcfx5h15.deepMerge(base, v);
          }).bind(bundle);
        });
      }();
    }, function (okey, instantiator) {
      var state = instantiator(obj);
      return $_5jjfpzx7jcfx5h3t.value($_2f3tbgxbjcfx5h4d.wrap(okey, strength(state)));
    });
  };
  var cExtract = function (path, obj, fields, strength) {
    var results = $_91ik4uw8jcfx5gxn.map(fields, function (field) {
      return cExtractOne(path, obj, field, strength);
    });
    return $_1xap5vx6jcfx5h3k.consolidateObj(results, {});
  };
  var value = function (validator) {
    var extract = function (path, strength, val) {
      return validator(val).fold(function (err) {
        return $_1knk5mxcjcfx5h4m.custom(path, err);
      }, $_5jjfpzx7jcfx5h3t.value);
    };
    var toString = function () {
      return 'val';
    };
    var toDsl = function () {
      return $_lktv9xfjcfx5h54.typeAdt.itemOf(validator);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var getSetKeys = function (obj) {
    var keys = $_929ptpwzjcfx5h1b.keys(obj);
    return $_91ik4uw8jcfx5gxn.filter(keys, function (k) {
      return $_42faa8x5jcfx5h3h.hasKey(obj, k);
    });
  };
  var objOnly = function (fields) {
    var delegate = obj(fields);
    var fieldNames = $_91ik4uw8jcfx5gxn.foldr(fields, function (acc, f) {
      return f.fold(function (key) {
        return $_cvmq7wxjcfx5h15.deepMerge(acc, $_42faa8x5jcfx5h3h.wrap(key, true));
      }, $_30v3piwajcfx5gy5.constant(acc));
    }, {});
    var extract = function (path, strength, o) {
      var keys = $_7mrhymwyjcfx5h18.isBoolean(o) ? [] : getSetKeys(o);
      var extra = $_91ik4uw8jcfx5gxn.filter(keys, function (k) {
        return !$_42faa8x5jcfx5h3h.hasKey(fieldNames, k);
      });
      return extra.length === 0 ? delegate.extract(path, strength, o) : $_1knk5mxcjcfx5h4m.unsupportedFields(path, extra);
    };
    return {
      extract: extract,
      toString: delegate.toString,
      toDsl: delegate.toDsl
    };
  };
  var obj = function (fields) {
    var extract = function (path, strength, o) {
      return cExtract(path, o, fields, strength);
    };
    var toString = function () {
      var fieldStrings = $_91ik4uw8jcfx5gxn.map(fields, function (field) {
        return field.fold(function (key, okey, presence, prop) {
          return key + ' -> ' + prop.toString();
        }, function (okey, instantiator) {
          return 'state(' + okey + ')';
        });
      });
      return 'obj{\n' + fieldStrings.join('\n') + '}';
    };
    var toDsl = function () {
      return $_lktv9xfjcfx5h54.typeAdt.objOf($_91ik4uw8jcfx5gxn.map(fields, function (f) {
        return f.fold(function (key, okey, presence, prop) {
          return $_lktv9xfjcfx5h54.fieldAdt.field(key, presence, prop);
        }, function (okey, instantiator) {
          return $_lktv9xfjcfx5h54.fieldAdt.state(okey);
        });
      }));
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var arr = function (prop) {
    var extract = function (path, strength, array) {
      var results = $_91ik4uw8jcfx5gxn.map(array, function (a, i) {
        return prop.extract(path.concat(['[' + i + ']']), strength, a);
      });
      return $_1xap5vx6jcfx5h3k.consolidateArr(results);
    };
    var toString = function () {
      return 'array(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_lktv9xfjcfx5h54.typeAdt.arrOf(prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var setOf = function (validator, prop) {
    var validateKeys = function (path, keys) {
      return arr(value(validator)).extract(path, $_30v3piwajcfx5gy5.identity, keys);
    };
    var extract = function (path, strength, o) {
      var keys = $_929ptpwzjcfx5h1b.keys(o);
      return validateKeys(path, keys).bind(function (validKeys) {
        var schema = $_91ik4uw8jcfx5gxn.map(validKeys, function (vk) {
          return adt$1.field(vk, vk, $_4dvdewx2jcfx5h25.strict(), prop);
        });
        return obj(schema).extract(path, strength, o);
      });
    };
    var toString = function () {
      return 'setOf(' + prop.toString() + ')';
    };
    var toDsl = function () {
      return $_lktv9xfjcfx5h54.typeAdt.setOf(validator, prop);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var anyValue = value($_5jjfpzx7jcfx5h3t.value);
  var arrOfObj = $_30v3piwajcfx5gy5.compose(arr, obj);
  var $_9j87nzx4jcfx5h2p = {
    anyValue: $_30v3piwajcfx5gy5.constant(anyValue),
    value: value,
    obj: obj,
    objOnly: objOnly,
    arr: arr,
    setOf: setOf,
    arrOfObj: arrOfObj,
    state: adt$1.state,
    field: adt$1.field,
    output: output,
    snapshot: snapshot
  };

  var strict = function (key) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.strict(), $_9j87nzx4jcfx5h2p.anyValue());
  };
  var strictOf = function (key, schema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.strict(), schema);
  };
  var strictFunction = function (key) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.strict(), $_9j87nzx4jcfx5h2p.value(function (f) {
      return $_7mrhymwyjcfx5h18.isFunction(f) ? $_5jjfpzx7jcfx5h3t.value(f) : $_5jjfpzx7jcfx5h3t.error('Not a function');
    }));
  };
  var forbid = function (key, message) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.asOption(), $_9j87nzx4jcfx5h2p.value(function (v) {
      return $_5jjfpzx7jcfx5h3t.error('The field: ' + key + ' is forbidden. ' + message);
    }));
  };
  var strictArrayOf = function (key, prop) {
    return strictOf(key, prop);
  };
  var strictObjOf = function (key, objSchema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.strict(), $_9j87nzx4jcfx5h2p.obj(objSchema));
  };
  var strictArrayOfObj = function (key, objFields) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.strict(), $_9j87nzx4jcfx5h2p.arrOfObj(objFields));
  };
  var option = function (key) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.asOption(), $_9j87nzx4jcfx5h2p.anyValue());
  };
  var optionOf = function (key, schema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.asOption(), schema);
  };
  var optionObjOf = function (key, objSchema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.asOption(), $_9j87nzx4jcfx5h2p.obj(objSchema));
  };
  var optionObjOfOnly = function (key, objSchema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.asOption(), $_9j87nzx4jcfx5h2p.objOnly(objSchema));
  };
  var defaulted = function (key, fallback) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.defaulted(fallback), $_9j87nzx4jcfx5h2p.anyValue());
  };
  var defaultedOf = function (key, fallback, schema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.defaulted(fallback), schema);
  };
  var defaultedObjOf = function (key, fallback, objSchema) {
    return $_9j87nzx4jcfx5h2p.field(key, key, $_4dvdewx2jcfx5h25.defaulted(fallback), $_9j87nzx4jcfx5h2p.obj(objSchema));
  };
  var field = function (key, okey, presence, prop) {
    return $_9j87nzx4jcfx5h2p.field(key, okey, presence, prop);
  };
  var state = function (okey, instantiator) {
    return $_9j87nzx4jcfx5h2p.state(okey, instantiator);
  };
  var $_32l4p2x1jcfx5h1y = {
    strict: strict,
    strictOf: strictOf,
    strictObjOf: strictObjOf,
    strictArrayOf: strictArrayOf,
    strictArrayOfObj: strictArrayOfObj,
    strictFunction: strictFunction,
    forbid: forbid,
    option: option,
    optionOf: optionOf,
    optionObjOf: optionObjOf,
    optionObjOfOnly: optionObjOfOnly,
    defaulted: defaulted,
    defaultedOf: defaultedOf,
    defaultedObjOf: defaultedObjOf,
    field: field,
    state: state
  };

  var chooseFrom = function (path, strength, input, branches, ch) {
    var fields = $_42faa8x5jcfx5h3h.readOptFrom(branches, ch);
    return fields.fold(function () {
      return $_1knk5mxcjcfx5h4m.missingBranch(path, branches, ch);
    }, function (fs) {
      return $_9j87nzx4jcfx5h2p.obj(fs).extract(path.concat(['branch: ' + ch]), strength, input);
    });
  };
  var choose$1 = function (key, branches) {
    var extract = function (path, strength, input) {
      var choice = $_42faa8x5jcfx5h3h.readOptFrom(input, key);
      return choice.fold(function () {
        return $_1knk5mxcjcfx5h4m.missingKey(path, key);
      }, function (chosen) {
        return chooseFrom(path, strength, input, branches, chosen);
      });
    };
    var toString = function () {
      return 'chooseOn(' + key + '). Possible values: ' + $_929ptpwzjcfx5h1b.keys(branches);
    };
    var toDsl = function () {
      return $_lktv9xfjcfx5h54.typeAdt.choiceOf(key, branches);
    };
    return {
      extract: extract,
      toString: toString,
      toDsl: toDsl
    };
  };
  var $_1nv0o1xhjcfx5h5g = { choose: choose$1 };

  var anyValue$1 = $_9j87nzx4jcfx5h2p.value($_5jjfpzx7jcfx5h3t.value);
  var arrOfObj$1 = function (objFields) {
    return $_9j87nzx4jcfx5h2p.arrOfObj(objFields);
  };
  var arrOfVal = function () {
    return $_9j87nzx4jcfx5h2p.arr(anyValue$1);
  };
  var arrOf = $_9j87nzx4jcfx5h2p.arr;
  var objOf = $_9j87nzx4jcfx5h2p.obj;
  var objOfOnly = $_9j87nzx4jcfx5h2p.objOnly;
  var setOf$1 = $_9j87nzx4jcfx5h2p.setOf;
  var valueOf = function (validator) {
    return $_9j87nzx4jcfx5h2p.value(validator);
  };
  var extract = function (label, prop, strength, obj) {
    return prop.extract([label], strength, obj).fold(function (errs) {
      return $_5jjfpzx7jcfx5h3t.error({
        input: obj,
        errors: errs
      });
    }, $_5jjfpzx7jcfx5h3t.value);
  };
  var asStruct = function (label, prop, obj) {
    return extract(label, prop, $_30v3piwajcfx5gy5.constant, obj);
  };
  var asRaw = function (label, prop, obj) {
    return extract(label, prop, $_30v3piwajcfx5gy5.identity, obj);
  };
  var getOrDie$1 = function (extraction) {
    return extraction.fold(function (errInfo) {
      throw new Error(formatError(errInfo));
    }, $_30v3piwajcfx5gy5.identity);
  };
  var asRawOrDie = function (label, prop, obj) {
    return getOrDie$1(asRaw(label, prop, obj));
  };
  var asStructOrDie = function (label, prop, obj) {
    return getOrDie$1(asStruct(label, prop, obj));
  };
  var formatError = function (errInfo) {
    return 'Errors: \n' + $_1i6xs7xdjcfx5h4s.formatErrors(errInfo.errors) + '\n\nInput object: ' + $_1i6xs7xdjcfx5h4s.formatObj(errInfo.input);
  };
  var choose = function (key, branches) {
    return $_1nv0o1xhjcfx5h5g.choose(key, branches);
  };
  var $_fj9y9nxgjcfx5h5a = {
    anyValue: $_30v3piwajcfx5gy5.constant(anyValue$1),
    arrOfObj: arrOfObj$1,
    arrOf: arrOf,
    arrOfVal: arrOfVal,
    valueOf: valueOf,
    setOf: setOf$1,
    objOf: objOf,
    objOfOnly: objOfOnly,
    asStruct: asStruct,
    asRaw: asRaw,
    asStructOrDie: asStructOrDie,
    asRawOrDie: asRawOrDie,
    getOrDie: getOrDie$1,
    formatError: formatError,
    choose: choose
  };

  var nu$3 = function (parts) {
    if (!$_42faa8x5jcfx5h3h.hasKey(parts, 'can') && !$_42faa8x5jcfx5h3h.hasKey(parts, 'abort') && !$_42faa8x5jcfx5h3h.hasKey(parts, 'run'))
      throw new Error('EventHandler defined by: ' + $_euz44nxejcfx5h51.stringify(parts, null, 2) + ' does not have can, abort, or run!');
    return $_fj9y9nxgjcfx5h5a.asRawOrDie('Extracting event.handler', $_fj9y9nxgjcfx5h5a.objOfOnly([
      $_32l4p2x1jcfx5h1y.defaulted('can', $_30v3piwajcfx5gy5.constant(true)),
      $_32l4p2x1jcfx5h1y.defaulted('abort', $_30v3piwajcfx5gy5.constant(false)),
      $_32l4p2x1jcfx5h1y.defaulted('run', $_30v3piwajcfx5gy5.noop)
    ]), parts);
  };
  var all$1 = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_91ik4uw8jcfx5gxn.foldl(handlers, function (acc, handler) {
        return acc && f(handler).apply(undefined, args);
      }, true);
    };
  };
  var any = function (handlers, f) {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      return $_91ik4uw8jcfx5gxn.foldl(handlers, function (acc, handler) {
        return acc || f(handler).apply(undefined, args);
      }, false);
    };
  };
  var read = function (handler) {
    return $_7mrhymwyjcfx5h18.isFunction(handler) ? {
      can: $_30v3piwajcfx5gy5.constant(true),
      abort: $_30v3piwajcfx5gy5.constant(false),
      run: handler
    } : handler;
  };
  var fuse = function (handlers) {
    var can = all$1(handlers, function (handler) {
      return handler.can;
    });
    var abort = any(handlers, function (handler) {
      return handler.abort;
    });
    var run = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      $_91ik4uw8jcfx5gxn.each(handlers, function (handler) {
        handler.run.apply(undefined, args);
      });
    };
    return nu$3({
      can: can,
      abort: abort,
      run: run
    });
  };
  var $_534bi9x0jcfx5h1i = {
    read: read,
    fuse: fuse,
    nu: nu$3
  };

  var derive$1 = $_42faa8x5jcfx5h3h.wrapAll;
  var abort = function (name, predicate) {
    return {
      key: name,
      value: $_534bi9x0jcfx5h1i.nu({ abort: predicate })
    };
  };
  var can = function (name, predicate) {
    return {
      key: name,
      value: $_534bi9x0jcfx5h1i.nu({ can: predicate })
    };
  };
  var preventDefault = function (name) {
    return {
      key: name,
      value: $_534bi9x0jcfx5h1i.nu({
        run: function (component, simulatedEvent) {
          simulatedEvent.event().prevent();
        }
      })
    };
  };
  var run = function (name, handler) {
    return {
      key: name,
      value: $_534bi9x0jcfx5h1i.nu({ run: handler })
    };
  };
  var runActionExtra = function (name, action, extra) {
    return {
      key: name,
      value: $_534bi9x0jcfx5h1i.nu({
        run: function (component) {
          action.apply(undefined, [component].concat(extra));
        }
      })
    };
  };
  var runOnName = function (name) {
    return function (handler) {
      return run(name, handler);
    };
  };
  var runOnSourceName = function (name) {
    return function (handler) {
      return {
        key: name,
        value: $_534bi9x0jcfx5h1i.nu({
          run: function (component, simulatedEvent) {
            if ($_2isn1aw6jcfx5gx0.isSource(component, simulatedEvent))
              handler(component, simulatedEvent);
          }
        })
      };
    };
  };
  var redirectToUid = function (name, uid) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByUid(uid).each(function (redirectee) {
        $_7pg78vwujcfx5h0i.dispatchEvent(redirectee, redirectee.element(), name, simulatedEvent);
      });
    });
  };
  var redirectToPart = function (name, detail, partName) {
    var uid = detail.partUids()[partName];
    return redirectToUid(name, uid);
  };
  var runWithTarget = function (name, f) {
    return run(name, function (component, simulatedEvent) {
      component.getSystem().getByDom(simulatedEvent.event().target()).each(function (target) {
        f(component, target, simulatedEvent);
      });
    });
  };
  var cutter = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.cut();
    });
  };
  var stopper = function (name) {
    return run(name, function (component, simulatedEvent) {
      simulatedEvent.stop();
    });
  };
  var $_286fidw5jcfx5gwv = {
    derive: derive$1,
    run: run,
    preventDefault: preventDefault,
    runActionExtra: runActionExtra,
    runOnAttached: runOnSourceName($_fe7kcdwvjcfx5h0s.attachedToDom()),
    runOnDetached: runOnSourceName($_fe7kcdwvjcfx5h0s.detachedFromDom()),
    runOnInit: runOnSourceName($_fe7kcdwvjcfx5h0s.systemInit()),
    runOnExecute: runOnName($_fe7kcdwvjcfx5h0s.execute()),
    redirectToUid: redirectToUid,
    redirectToPart: redirectToPart,
    runWithTarget: runWithTarget,
    abort: abort,
    can: can,
    cutter: cutter,
    stopper: stopper
  };

  var markAsBehaviourApi = function (f, apiName, apiFunction) {
    return f;
  };
  var markAsExtraApi = function (f, extraName) {
    return f;
  };
  var markAsSketchApi = function (f, apiFunction) {
    return f;
  };
  var getAnnotation = $_8i7mfvw9jcfx5gxw.none;
  var $_7ahhasxijcfx5h5l = {
    markAsBehaviourApi: markAsBehaviourApi,
    markAsExtraApi: markAsExtraApi,
    markAsSketchApi: markAsSketchApi,
    getAnnotation: getAnnotation
  };

  var Immutable = function () {
    var fields = arguments;
    return function () {
      var values = new Array(arguments.length);
      for (var i = 0; i < values.length; i++)
        values[i] = arguments[i];
      if (fields.length !== values.length)
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      var struct = {};
      $_91ik4uw8jcfx5gxn.each(fields, function (name, i) {
        struct[name] = $_30v3piwajcfx5gy5.constant(values[i]);
      });
      return struct;
    };
  };

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_7mrhymwyjcfx5h18.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_91ik4uw8jcfx5gxn.each(array, function (a) {
      if (!$_7mrhymwyjcfx5h18.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_91ik4uw8jcfx5gxn.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_52htsbxojcfx5h6j = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  var MixedBag = function (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_52htsbxojcfx5h6j.validateStrArr('required', required);
    $_52htsbxojcfx5h6j.validateStrArr('optional', optional);
    $_52htsbxojcfx5h6j.checkDupes(everything);
    return function (obj) {
      var keys = $_929ptpwzjcfx5h1b.keys(obj);
      var allReqd = $_91ik4uw8jcfx5gxn.forall(required, function (req) {
        return $_91ik4uw8jcfx5gxn.contains(keys, req);
      });
      if (!allReqd)
        $_52htsbxojcfx5h6j.reqMessage(required, keys);
      var unsupported = $_91ik4uw8jcfx5gxn.filter(keys, function (key) {
        return !$_91ik4uw8jcfx5gxn.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_52htsbxojcfx5h6j.unsuppMessage(unsupported);
      var r = {};
      $_91ik4uw8jcfx5gxn.each(required, function (req) {
        r[req] = $_30v3piwajcfx5gy5.constant(obj[req]);
      });
      $_91ik4uw8jcfx5gxn.each(optional, function (opt) {
        r[opt] = $_30v3piwajcfx5gy5.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? $_8i7mfvw9jcfx5gxw.some(obj[opt]) : $_8i7mfvw9jcfx5gxw.none());
      });
      return r;
    };
  };

  var $_ci6qsrxljcfx5h6b = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var nu$6 = $_ci6qsrxljcfx5h6b.immutableBag(['tag'], [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'domChildren',
    'defChildren'
  ]);
  var defToStr = function (defn) {
    var raw = defToRaw(defn);
    return $_euz44nxejcfx5h51.stringify(raw, null, 2);
  };
  var defToRaw = function (defn) {
    return {
      tag: defn.tag(),
      classes: defn.classes().getOr([]),
      attributes: defn.attributes().getOr({}),
      styles: defn.styles().getOr({}),
      value: defn.value().getOr('<none>'),
      innerHtml: defn.innerHtml().getOr('<none>'),
      defChildren: defn.defChildren().getOr('<none>'),
      domChildren: defn.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var $_99lcf3xkjcfx5h64 = {
    nu: nu$6,
    defToStr: defToStr,
    defToRaw: defToRaw
  };

  var fields = [
    'classes',
    'attributes',
    'styles',
    'value',
    'innerHtml',
    'defChildren',
    'domChildren'
  ];
  var nu$5 = $_ci6qsrxljcfx5h6b.immutableBag([], fields);
  var derive$2 = function (settings) {
    var r = {};
    var keys = $_929ptpwzjcfx5h1b.keys(settings);
    $_91ik4uw8jcfx5gxn.each(keys, function (key) {
      settings[key].each(function (v) {
        r[key] = v;
      });
    });
    return nu$5(r);
  };
  var modToStr = function (mod) {
    var raw = modToRaw(mod);
    return $_euz44nxejcfx5h51.stringify(raw, null, 2);
  };
  var modToRaw = function (mod) {
    return {
      classes: mod.classes().getOr('<none>'),
      attributes: mod.attributes().getOr('<none>'),
      styles: mod.styles().getOr('<none>'),
      value: mod.value().getOr('<none>'),
      innerHtml: mod.innerHtml().getOr('<none>'),
      defChildren: mod.defChildren().getOr('<none>'),
      domChildren: mod.domChildren().fold(function () {
        return '<none>';
      }, function (children) {
        return children.length === 0 ? '0 children, but still specified' : String(children.length);
      })
    };
  };
  var clashingOptArrays = function (key, oArr1, oArr2) {
    return oArr1.fold(function () {
      return oArr2.fold(function () {
        return {};
      }, function (arr2) {
        return $_42faa8x5jcfx5h3h.wrap(key, arr2);
      });
    }, function (arr1) {
      return oArr2.fold(function () {
        return $_42faa8x5jcfx5h3h.wrap(key, arr1);
      }, function (arr2) {
        return $_42faa8x5jcfx5h3h.wrap(key, arr2);
      });
    });
  };
  var merge$1 = function (defnA, mod) {
    var raw = $_cvmq7wxjcfx5h15.deepMerge({
      tag: defnA.tag(),
      classes: mod.classes().getOr([]).concat(defnA.classes().getOr([])),
      attributes: $_cvmq7wxjcfx5h15.merge(defnA.attributes().getOr({}), mod.attributes().getOr({})),
      styles: $_cvmq7wxjcfx5h15.merge(defnA.styles().getOr({}), mod.styles().getOr({}))
    }, mod.innerHtml().or(defnA.innerHtml()).map(function (innerHtml) {
      return $_42faa8x5jcfx5h3h.wrap('innerHtml', innerHtml);
    }).getOr({}), clashingOptArrays('domChildren', mod.domChildren(), defnA.domChildren()), clashingOptArrays('defChildren', mod.defChildren(), defnA.defChildren()), mod.value().or(defnA.value()).map(function (value) {
      return $_42faa8x5jcfx5h3h.wrap('value', value);
    }).getOr({}));
    return $_99lcf3xkjcfx5h64.nu(raw);
  };
  var $_1k6iv7xjjcfx5h5o = {
    nu: nu$5,
    derive: derive$2,
    merge: merge$1,
    modToStr: modToStr,
    modToRaw: modToRaw
  };

  var executeEvent = function (bConfig, bState, executor) {
    return $_286fidw5jcfx5gwv.runOnExecute(function (component) {
      executor(component, bConfig, bState);
    });
  };
  var loadEvent = function (bConfig, bState, f) {
    return $_286fidw5jcfx5gwv.runOnInit(function (component, simulatedEvent) {
      f(component, bConfig, bState);
    });
  };
  var create$1 = function (schema, name, active, apis, extra, state) {
    var configSchema = $_fj9y9nxgjcfx5h5a.objOfOnly(schema);
    var schemaSchema = $_32l4p2x1jcfx5h1y.optionObjOf(name, [$_32l4p2x1jcfx5h1y.optionObjOfOnly('config', schema)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var createModes$1 = function (modes, name, active, apis, extra, state) {
    var configSchema = modes;
    var schemaSchema = $_32l4p2x1jcfx5h1y.optionObjOf(name, [$_32l4p2x1jcfx5h1y.optionOf('config', modes)]);
    return doCreate(configSchema, schemaSchema, name, active, apis, extra, state);
  };
  var wrapApi = function (bName, apiFunction, apiName) {
    var f = function (component) {
      var args = arguments;
      return component.config({ name: $_30v3piwajcfx5gy5.constant(bName) }).fold(function () {
        throw new Error('We could not find any behaviour configuration for: ' + bName + '. Using API: ' + apiName);
      }, function (info) {
        var rest = Array.prototype.slice.call(args, 1);
        return apiFunction.apply(undefined, [
          component,
          info.config,
          info.state
        ].concat(rest));
      });
    };
    return $_7ahhasxijcfx5h5l.markAsBehaviourApi(f, apiName, apiFunction);
  };
  var revokeBehaviour = function (name) {
    return {
      key: name,
      value: undefined
    };
  };
  var doCreate = function (configSchema, schemaSchema, name, active, apis, extra, state) {
    var getConfig = function (info) {
      return $_42faa8x5jcfx5h3h.hasKey(info, name) ? info[name]() : $_8i7mfvw9jcfx5gxw.none();
    };
    var wrappedApis = $_929ptpwzjcfx5h1b.map(apis, function (apiF, apiName) {
      return wrapApi(name, apiF, apiName);
    });
    var wrappedExtra = $_929ptpwzjcfx5h1b.map(extra, function (extraF, extraName) {
      return $_7ahhasxijcfx5h5l.markAsExtraApi(extraF, extraName);
    });
    var me = $_cvmq7wxjcfx5h15.deepMerge(wrappedExtra, wrappedApis, {
      revoke: $_30v3piwajcfx5gy5.curry(revokeBehaviour, name),
      config: function (spec) {
        var prepared = $_fj9y9nxgjcfx5h5a.asStructOrDie(name + '-config', configSchema, spec);
        return {
          key: name,
          value: {
            config: prepared,
            me: me,
            configAsRaw: $_8ohqlxwgjcfx5gym.cached(function () {
              return $_fj9y9nxgjcfx5h5a.asRawOrDie(name + '-config', configSchema, spec);
            }),
            initialConfig: spec,
            state: state
          }
        };
      },
      schema: function () {
        return schemaSchema;
      },
      exhibit: function (info, base) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_42faa8x5jcfx5h3h.readOptFrom(active, 'exhibit').map(function (exhibitor) {
            return exhibitor(base, behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr($_1k6iv7xjjcfx5h5o.nu({}));
      },
      name: function () {
        return name;
      },
      handlers: function (info) {
        return getConfig(info).bind(function (behaviourInfo) {
          return $_42faa8x5jcfx5h3h.readOptFrom(active, 'events').map(function (events) {
            return events(behaviourInfo.config, behaviourInfo.state);
          });
        }).getOr({});
      }
    });
    return me;
  };
  var $_9dgavgw4jcfx5gwc = {
    executeEvent: executeEvent,
    loadEvent: loadEvent,
    create: create$1,
    createModes: createModes$1
  };

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_7mrhymwyjcfx5h18.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_52htsbxojcfx5h6j.validateStrArr('required', required);
    $_52htsbxojcfx5h6j.checkDupes(required);
    return function (obj) {
      var keys = $_929ptpwzjcfx5h1b.keys(obj);
      var allReqd = $_91ik4uw8jcfx5gxn.forall(required, function (req) {
        return $_91ik4uw8jcfx5gxn.contains(keys, req);
      });
      if (!allReqd)
        $_52htsbxojcfx5h6j.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_91ik4uw8jcfx5gxn.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_52htsbxojcfx5h6j.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_91ik4uw8jcfx5gxn.filter(keys, function (key) {
      return !$_91ik4uw8jcfx5gxn.contains(required, key);
    });
    if (unsupported.length > 0)
      $_52htsbxojcfx5h6j.unsuppMessage(unsupported);
  };
  var allowExtra = $_30v3piwajcfx5gy5.noop;
  var $_4fxhqgxrjcfx5h6z = {
    exactly: $_30v3piwajcfx5gy5.curry(base, handleExact),
    ensure: $_30v3piwajcfx5gy5.curry(base, allowExtra),
    ensureWith: $_30v3piwajcfx5gy5.curry(baseWith, allowExtra)
  };

  var BehaviourState = $_4fxhqgxrjcfx5h6z.ensure(['readState']);

  var init = function () {
    return BehaviourState({
      readState: function () {
        return 'No State required';
      }
    });
  };
  var $_g8b8q6xpjcfx5h6o = { init: init };

  var derive = function (capabilities) {
    return $_42faa8x5jcfx5h3h.wrapAll(capabilities);
  };
  var simpleSchema = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strict('fields'),
    $_32l4p2x1jcfx5h1y.strict('name'),
    $_32l4p2x1jcfx5h1y.defaulted('active', {}),
    $_32l4p2x1jcfx5h1y.defaulted('apis', {}),
    $_32l4p2x1jcfx5h1y.defaulted('extra', {}),
    $_32l4p2x1jcfx5h1y.defaulted('state', $_g8b8q6xpjcfx5h6o)
  ]);
  var create = function (data) {
    var value = $_fj9y9nxgjcfx5h5a.asRawOrDie('Creating behaviour: ' + data.name, simpleSchema, data);
    return $_9dgavgw4jcfx5gwc.create(value.fields, value.name, value.active, value.apis, value.extra, value.state);
  };
  var modeSchema = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strict('branchKey'),
    $_32l4p2x1jcfx5h1y.strict('branches'),
    $_32l4p2x1jcfx5h1y.strict('name'),
    $_32l4p2x1jcfx5h1y.defaulted('active', {}),
    $_32l4p2x1jcfx5h1y.defaulted('apis', {}),
    $_32l4p2x1jcfx5h1y.defaulted('extra', {}),
    $_32l4p2x1jcfx5h1y.defaulted('state', $_g8b8q6xpjcfx5h6o)
  ]);
  var createModes = function (data) {
    var value = $_fj9y9nxgjcfx5h5a.asRawOrDie('Creating behaviour: ' + data.name, modeSchema, data);
    return $_9dgavgw4jcfx5gwc.createModes($_fj9y9nxgjcfx5h5a.choose(value.branchKey, value.branches), value.name, value.active, value.apis, value.extra, value.state);
  };
  var $_7uu47fw3jcfx5gvw = {
    derive: derive,
    revoke: $_30v3piwajcfx5gy5.constant(undefined),
    noActive: $_30v3piwajcfx5gy5.constant({}),
    noApis: $_30v3piwajcfx5gy5.constant({}),
    noExtra: $_30v3piwajcfx5gy5.constant({}),
    noState: $_30v3piwajcfx5gy5.constant($_g8b8q6xpjcfx5h6o),
    create: create,
    createModes: createModes
  };

  var Toggler = function (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value$2 = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_g5801wtjcfx5h0g.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_g5801wtjcfx5h0g.ELEMENT);
  var isText = isType$1($_g5801wtjcfx5h0g.TEXT);
  var isDocument = isType$1($_g5801wtjcfx5h0g.DOCUMENT);
  var $_3wpq1xxwjcfx5h87 = {
    name: name,
    type: type,
    value: value$2,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_7mrhymwyjcfx5h18.isString(value) || $_7mrhymwyjcfx5h18.isBoolean(value) || $_7mrhymwyjcfx5h18.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_929ptpwzjcfx5h1b.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has$1 = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove$1 = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_91ik4uw8jcfx5gxn.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has$1(source, attr) && !has$1(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_3wpq1xxwjcfx5h87.isElement(source) || !$_3wpq1xxwjcfx5h87.isElement(destination))
      return;
    $_91ik4uw8jcfx5gxn.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_8bne1yxvjcfx5h7n = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has$1,
    remove: remove$1,
    hasNone: hasNone,
    transfer: transfer
  };

  var read$1 = function (element, attr) {
    var value = $_8bne1yxvjcfx5h7n.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add$2 = function (element, attr, id) {
    var old = read$1(element, attr);
    var nu = old.concat([id]);
    $_8bne1yxvjcfx5h7n.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_91ik4uw8jcfx5gxn.filter(read$1(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_8bne1yxvjcfx5h7n.set(element, attr, nu.join(' '));
    else
      $_8bne1yxvjcfx5h7n.remove(element, attr);
  };
  var $_dh5hwexyjcfx5h8p = {
    read: read$1,
    add: add$2,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$1 = function (element) {
    return $_dh5hwexyjcfx5h8p.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_dh5hwexyjcfx5h8p.add(element, 'class', clazz);
  };
  var remove$2 = function (element, clazz) {
    return $_dh5hwexyjcfx5h8p.remove(element, 'class', clazz);
  };
  var toggle$1 = function (element, clazz) {
    if ($_91ik4uw8jcfx5gxn.contains(get$1(element), clazz)) {
      remove$2(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_14wfb4xxjcfx5h8e = {
    get: get$1,
    add: add$1,
    remove: remove$2,
    toggle: toggle$1,
    supports: supports
  };

  var add = function (element, clazz) {
    if ($_14wfb4xxjcfx5h8e.supports(element))
      element.dom().classList.add(clazz);
    else
      $_14wfb4xxjcfx5h8e.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_14wfb4xxjcfx5h8e.supports(element) ? element.dom().classList : $_14wfb4xxjcfx5h8e.get(element);
    if (classList.length === 0) {
      $_8bne1yxvjcfx5h7n.remove(element, 'class');
    }
  };
  var remove = function (element, clazz) {
    if ($_14wfb4xxjcfx5h8e.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_14wfb4xxjcfx5h8e.remove(element, clazz);
    cleanClass(element);
  };
  var toggle = function (element, clazz) {
    return $_14wfb4xxjcfx5h8e.supports(element) ? element.dom().classList.toggle(clazz) : $_14wfb4xxjcfx5h8e.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_14wfb4xxjcfx5h8e.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_14wfb4xxjcfx5h8e.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_14wfb4xxjcfx5h8e.add(element, clazz);
    };
    return Toggler(off, on, has(element, clazz));
  };
  var has = function (element, clazz) {
    return $_14wfb4xxjcfx5h8e.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_axxg6hxtjcfx5h7e = {
    add: add,
    remove: remove,
    toggle: toggle,
    toggler: toggler,
    has: has
  };

  var swap = function (element, addCls, removeCls) {
    $_axxg6hxtjcfx5h7e.remove(element, removeCls);
    $_axxg6hxtjcfx5h7e.add(element, addCls);
  };
  var toAlpha = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.alpha(), swapConfig.omega());
  };
  var toOmega = function (component, swapConfig, swapState) {
    swap(component.element(), swapConfig.omega(), swapConfig.alpha());
  };
  var clear = function (component, swapConfig, swapState) {
    $_axxg6hxtjcfx5h7e.remove(component.element(), swapConfig.alpha());
    $_axxg6hxtjcfx5h7e.remove(component.element(), swapConfig.omega());
  };
  var isAlpha = function (component, swapConfig, swapState) {
    return $_axxg6hxtjcfx5h7e.has(component.element(), swapConfig.alpha());
  };
  var isOmega = function (component, swapConfig, swapState) {
    return $_axxg6hxtjcfx5h7e.has(component.element(), swapConfig.omega());
  };
  var $_ffm74mxsjcfx5h75 = {
    toAlpha: toAlpha,
    toOmega: toOmega,
    isAlpha: isAlpha,
    isOmega: isOmega,
    clear: clear
  };

  var SwapSchema = [
    $_32l4p2x1jcfx5h1y.strict('alpha'),
    $_32l4p2x1jcfx5h1y.strict('omega')
  ];

  var Swapping = $_7uu47fw3jcfx5gvw.create({
    fields: SwapSchema,
    name: 'swapping',
    apis: $_ffm74mxsjcfx5h75
  });

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_e2i036y3jcfx5ha7 = { toArray: toArray };

  var owner = function (element) {
    return $_6k7v3dwsjcfx5h08.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_6k7v3dwsjcfx5h08.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_6k7v3dwsjcfx5h08.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return $_8i7mfvw9jcfx5gxw.from(dom.parentNode).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_91ik4uw8jcfx5gxn.findIndex(kin, function (elem) {
        return $_7yb5g2w7jcfx5gx7.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_7mrhymwyjcfx5h18.isFunction(isRoot) ? isRoot : $_30v3piwajcfx5gy5.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_6k7v3dwsjcfx5h08.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return $_91ik4uw8jcfx5gxn.filter(elements, function (x) {
        return !$_7yb5g2w7jcfx5gx7.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return $_8i7mfvw9jcfx5gxw.from(dom.offsetParent).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return $_8i7mfvw9jcfx5gxw.from(dom.previousSibling).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return $_8i7mfvw9jcfx5gxw.from(dom.nextSibling).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var prevSiblings = function (element) {
    return $_91ik4uw8jcfx5gxn.reverse($_e2i036y3jcfx5ha7.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_e2i036y3jcfx5ha7.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_91ik4uw8jcfx5gxn.map(dom.childNodes, $_6k7v3dwsjcfx5h08.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return $_8i7mfvw9jcfx5gxw.from(children[index]).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_ci6qsrxljcfx5h6b.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_bke8thy2jcfx5h9w = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var before = function (marker, element) {
    var parent = $_bke8thy2jcfx5h9w.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_bke8thy2jcfx5h9w.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_bke8thy2jcfx5h9w.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_bke8thy2jcfx5h9w.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_bke8thy2jcfx5h9w.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap$2 = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_1g0by4y1jcfx5h9q = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap$2
  };

  var before$1 = function (marker, elements) {
    $_91ik4uw8jcfx5gxn.each(elements, function (x) {
      $_1g0by4y1jcfx5h9q.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_91ik4uw8jcfx5gxn.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_1g0by4y1jcfx5h9q.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_91ik4uw8jcfx5gxn.each(elements.slice().reverse(), function (x) {
      $_1g0by4y1jcfx5h9q.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_91ik4uw8jcfx5gxn.each(elements, function (x) {
      $_1g0by4y1jcfx5h9q.append(parent, x);
    });
  };
  var $_cn3np4y5jcfx5hai = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_91ik4uw8jcfx5gxn.each($_bke8thy2jcfx5h9w.children(element), function (rogue) {
      remove$4(rogue);
    });
  };
  var remove$4 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_bke8thy2jcfx5h9w.children(wrapper);
    if (children.length > 0)
      $_cn3np4y5jcfx5hai.before(wrapper, children);
    remove$4(wrapper);
  };
  var $_8mramzy4jcfx5haa = {
    empty: empty,
    remove: remove$4,
    unwrap: unwrap
  };

  var inBody = function (element) {
    var dom = $_3wpq1xxwjcfx5h87.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_8ohqlxwgjcfx5gym.cached(function () {
    return getBody($_6k7v3dwsjcfx5h08.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_6k7v3dwsjcfx5h08.fromDom(body);
  };
  var $_5392z2y6jcfx5hal = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var fireDetaching = function (component) {
    $_7pg78vwujcfx5h0i.emit(component, $_fe7kcdwvjcfx5h0s.detachedFromDom());
    var children = component.components();
    $_91ik4uw8jcfx5gxn.each(children, fireDetaching);
  };
  var fireAttaching = function (component) {
    var children = component.components();
    $_91ik4uw8jcfx5gxn.each(children, fireAttaching);
    $_7pg78vwujcfx5h0i.emit(component, $_fe7kcdwvjcfx5h0s.attachedToDom());
  };
  var attach = function (parent, child) {
    attachWith(parent, child, $_1g0by4y1jcfx5h9q.append);
  };
  var attachWith = function (parent, child, insertion) {
    parent.getSystem().addToWorld(child);
    insertion(parent.element(), child.element());
    if ($_5392z2y6jcfx5hal.inBody(parent.element()))
      fireAttaching(child);
    parent.syncComponents();
  };
  var doDetach = function (component) {
    fireDetaching(component);
    $_8mramzy4jcfx5haa.remove(component.element());
    component.getSystem().removeFromWorld(component);
  };
  var detach = function (component) {
    var parent = $_bke8thy2jcfx5h9w.parent(component.element()).bind(function (p) {
      return component.getSystem().getByDom(p).fold($_8i7mfvw9jcfx5gxw.none, $_8i7mfvw9jcfx5gxw.some);
    });
    doDetach(component);
    parent.each(function (p) {
      p.syncComponents();
    });
  };
  var detachChildren = function (component) {
    var subs = component.components();
    $_91ik4uw8jcfx5gxn.each(subs, doDetach);
    $_8mramzy4jcfx5haa.empty(component.element());
    component.syncComponents();
  };
  var attachSystem = function (element, guiSystem) {
    $_1g0by4y1jcfx5h9q.append(element, guiSystem.element());
    var children = $_bke8thy2jcfx5h9w.children(guiSystem.element());
    $_91ik4uw8jcfx5gxn.each(children, function (child) {
      guiSystem.getByDom(child).each(fireAttaching);
    });
  };
  var detachSystem = function (guiSystem) {
    var children = $_bke8thy2jcfx5h9w.children(guiSystem.element());
    $_91ik4uw8jcfx5gxn.each(children, function (child) {
      guiSystem.getByDom(child).each(fireDetaching);
    });
    $_8mramzy4jcfx5haa.remove(guiSystem.element());
  };
  var $_f1qsy3y0jcfx5h99 = {
    attach: attach,
    attachWith: attachWith,
    detach: detach,
    detachChildren: detachChildren,
    attachSystem: attachSystem,
    detachSystem: detachSystem
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_bke8thy2jcfx5h9w.children($_6k7v3dwsjcfx5h08.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_91ik4uw8jcfx5gxn.map(tags, function (x) {
      return $_6k7v3dwsjcfx5h08.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_91ik4uw8jcfx5gxn.map(texts, function (x) {
      return $_6k7v3dwsjcfx5h08.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_91ik4uw8jcfx5gxn.map(nodes, $_6k7v3dwsjcfx5h08.fromDom);
  };
  var $_38vd44ybjcfx5hb8 = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var get$2 = function (element) {
    return element.dom().innerHTML;
  };
  var set$1 = function (element, content) {
    var owner = $_bke8thy2jcfx5h9w.owner(element);
    var docDom = owner.dom();
    var fragment = $_6k7v3dwsjcfx5h08.fromDom(docDom.createDocumentFragment());
    var contentElements = $_38vd44ybjcfx5hb8.fromHtml(content, docDom);
    $_cn3np4y5jcfx5hai.append(fragment, contentElements);
    $_8mramzy4jcfx5haa.empty(element);
    $_1g0by4y1jcfx5h9q.append(element, fragment);
  };
  var getOuter = function (element) {
    var container = $_6k7v3dwsjcfx5h08.fromTag('div');
    var clone = $_6k7v3dwsjcfx5h08.fromDom(element.dom().cloneNode(true));
    $_1g0by4y1jcfx5h9q.append(container, clone);
    return get$2(container);
  };
  var $_1fdcs6yajcfx5hb6 = {
    get: get$2,
    set: set$1,
    getOuter: getOuter
  };

  var clone$1 = function (original, deep) {
    return $_6k7v3dwsjcfx5h08.fromDom(original.dom().cloneNode(deep));
  };
  var shallow$1 = function (original) {
    return clone$1(original, false);
  };
  var deep$1 = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_6k7v3dwsjcfx5h08.fromTag(tag);
    var attributes = $_8bne1yxvjcfx5h7n.clone(original);
    $_8bne1yxvjcfx5h7n.setAll(nu, attributes);
    return nu;
  };
  var copy = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_bke8thy2jcfx5h9w.children(deep$1(original));
    $_cn3np4y5jcfx5hai.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_1g0by4y1jcfx5h9q.before(original, nu);
    var children = $_bke8thy2jcfx5h9w.children(original);
    $_cn3np4y5jcfx5hai.append(nu, children);
    $_8mramzy4jcfx5haa.remove(original);
    return nu;
  };
  var $_61ytxzycjcfx5hbb = {
    shallow: shallow$1,
    shallowAs: shallowAs,
    deep: deep$1,
    copy: copy,
    mutate: mutate
  };

  var getHtml = function (element) {
    var clone = $_61ytxzycjcfx5hbb.shallow(element);
    return $_1fdcs6yajcfx5hb6.getOuter(clone);
  };
  var $_589exey9jcfx5hb0 = { getHtml: getHtml };

  var element = function (elem) {
    return $_589exey9jcfx5hb0.getHtml(elem);
  };
  var $_ap0k19y8jcfx5hay = { element: element };

  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return $_8i7mfvw9jcfx5gxw.none();
      }
    }
    return $_8i7mfvw9jcfx5gxw.some(f.apply(null, r));
  };
  var $_g8j28lydjcfx5hbe = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var unknown$3 = 'unknown';
  var debugging = true;
  var CHROME_INSPECTOR_GLOBAL = '__CHROME_INSPECTOR_CONNECTION_TO_ALLOY__';
  var eventsMonitored = [];
  var path$1 = [
    'alloy/data/Fields',
    'alloy/debugging/Debugging'
  ];
  var getTrace = function () {
    if (debugging === false)
      return unknown$3;
    var err = new Error();
    if (err.stack !== undefined) {
      var lines = err.stack.split('\n');
      return $_91ik4uw8jcfx5gxn.find(lines, function (line) {
        return line.indexOf('alloy') > 0 && !$_91ik4uw8jcfx5gxn.exists(path$1, function (p) {
          return line.indexOf(p) > -1;
        });
      }).getOr(unknown$3);
    } else {
      return unknown$3;
    }
  };
  var logHandler = function (label, handlerName, trace) {
  };
  var ignoreEvent = {
    logEventCut: $_30v3piwajcfx5gy5.noop,
    logEventStopped: $_30v3piwajcfx5gy5.noop,
    logNoParent: $_30v3piwajcfx5gy5.noop,
    logEventNoHandlers: $_30v3piwajcfx5gy5.noop,
    logEventResponse: $_30v3piwajcfx5gy5.noop,
    write: $_30v3piwajcfx5gy5.noop
  };
  var monitorEvent = function (eventName, initialTarget, f) {
    var logger = debugging && (eventsMonitored === '*' || $_91ik4uw8jcfx5gxn.contains(eventsMonitored, eventName)) ? function () {
      var sequence = [];
      return {
        logEventCut: function (name, target, purpose) {
          sequence.push({
            outcome: 'cut',
            target: target,
            purpose: purpose
          });
        },
        logEventStopped: function (name, target, purpose) {
          sequence.push({
            outcome: 'stopped',
            target: target,
            purpose: purpose
          });
        },
        logNoParent: function (name, target, purpose) {
          sequence.push({
            outcome: 'no-parent',
            target: target,
            purpose: purpose
          });
        },
        logEventNoHandlers: function (name, target) {
          sequence.push({
            outcome: 'no-handlers-left',
            target: target
          });
        },
        logEventResponse: function (name, target, purpose) {
          sequence.push({
            outcome: 'response',
            purpose: purpose,
            target: target
          });
        },
        write: function () {
          if ($_91ik4uw8jcfx5gxn.contains([
              'mousemove',
              'mouseover',
              'mouseout',
              $_fe7kcdwvjcfx5h0s.systemInit()
            ], eventName))
            return;
          console.log(eventName, {
            event: eventName,
            target: initialTarget.dom(),
            sequence: $_91ik4uw8jcfx5gxn.map(sequence, function (s) {
              if (!$_91ik4uw8jcfx5gxn.contains([
                  'cut',
                  'stopped',
                  'response'
                ], s.outcome))
                return s.outcome;
              else
                return '{' + s.purpose + '} ' + s.outcome + ' at (' + $_ap0k19y8jcfx5hay.element(s.target) + ')';
            })
          });
        }
      };
    }() : ignoreEvent;
    var output = f(logger);
    logger.write();
    return output;
  };
  var inspectorInfo = function (comp) {
    var go = function (c) {
      var cSpec = c.spec();
      return {
        '(original.spec)': cSpec,
        '(dom.ref)': c.element().dom(),
        '(element)': $_ap0k19y8jcfx5hay.element(c.element()),
        '(initComponents)': $_91ik4uw8jcfx5gxn.map(cSpec.components !== undefined ? cSpec.components : [], go),
        '(components)': $_91ik4uw8jcfx5gxn.map(c.components(), go),
        '(bound.events)': $_929ptpwzjcfx5h1b.mapToArray(c.events(), function (v, k) {
          return [k];
        }).join(', '),
        '(behaviours)': cSpec.behaviours !== undefined ? $_929ptpwzjcfx5h1b.map(cSpec.behaviours, function (v, k) {
          return v === undefined ? '--revoked--' : {
            config: v.configAsRaw(),
            'original-config': v.initialConfig,
            state: c.readState(k)
          };
        }) : 'none'
      };
    };
    return go(comp);
  };
  var getOrInitConnection = function () {
    if (window[CHROME_INSPECTOR_GLOBAL] !== undefined)
      return window[CHROME_INSPECTOR_GLOBAL];
    else {
      window[CHROME_INSPECTOR_GLOBAL] = {
        systems: {},
        lookup: function (uid) {
          var systems = window[CHROME_INSPECTOR_GLOBAL].systems;
          var connections = $_929ptpwzjcfx5h1b.keys(systems);
          return $_g8j28lydjcfx5hbe.findMap(connections, function (conn) {
            var connGui = systems[conn];
            return connGui.getByUid(uid).toOption().map(function (comp) {
              return $_42faa8x5jcfx5h3h.wrap($_ap0k19y8jcfx5hay.element(comp.element()), inspectorInfo(comp));
            });
          });
        }
      };
      return window[CHROME_INSPECTOR_GLOBAL];
    }
  };
  var registerInspector = function (name, gui) {
    var connection = getOrInitConnection();
    connection.systems[name] = gui;
  };
  var $_6hnwbgy7jcfx5hap = {
    logHandler: logHandler,
    noLogger: $_30v3piwajcfx5gy5.constant(ignoreEvent),
    getTrace: getTrace,
    monitorEvent: monitorEvent,
    isDebugging: $_30v3piwajcfx5gy5.constant(debugging),
    registerInspector: registerInspector
  };

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var ClosestOrAncestor = function (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? $_8i7mfvw9jcfx5gxw.some(scope) : $_7mrhymwyjcfx5h18.isFunction(isRoot) && isRoot(scope) ? $_8i7mfvw9jcfx5gxw.none() : ancestor(scope, a, isRoot);
  };

  var first$1 = function (predicate) {
    return descendant$1($_5392z2y6jcfx5hal.body(), predicate);
  };
  var ancestor$1 = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_7mrhymwyjcfx5h18.isFunction(isRoot) ? isRoot : $_30v3piwajcfx5gy5.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_6k7v3dwsjcfx5h08.fromDom(element);
      if (predicate(el))
        return $_8i7mfvw9jcfx5gxw.some(el);
      else if (stop(el))
        break;
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var closest$1 = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor$1, scope, predicate, isRoot);
  };
  var sibling$1 = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return $_8i7mfvw9jcfx5gxw.none();
    return child$2($_6k7v3dwsjcfx5h08.fromDom(element.parentNode), function (x) {
      return !$_7yb5g2w7jcfx5gx7.eq(scope, x) && predicate(x);
    });
  };
  var child$2 = function (scope, predicate) {
    var result = $_91ik4uw8jcfx5gxn.find(scope.dom().childNodes, $_30v3piwajcfx5gy5.compose(predicate, $_6k7v3dwsjcfx5h08.fromDom));
    return result.map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var descendant$1 = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_6k7v3dwsjcfx5h08.fromDom(element.childNodes[i])))
          return $_8i7mfvw9jcfx5gxw.some($_6k7v3dwsjcfx5h08.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return $_8i7mfvw9jcfx5gxw.none();
    };
    return descend(scope.dom());
  };
  var $_94hxagyhjcfx5hbo = {
    first: first$1,
    ancestor: ancestor$1,
    closest: closest$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1
  };

  var any$1 = function (predicate) {
    return $_94hxagyhjcfx5hbo.first(predicate).isSome();
  };
  var ancestor = function (scope, predicate, isRoot) {
    return $_94hxagyhjcfx5hbo.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest = function (scope, predicate, isRoot) {
    return $_94hxagyhjcfx5hbo.closest(scope, predicate, isRoot).isSome();
  };
  var sibling = function (scope, predicate) {
    return $_94hxagyhjcfx5hbo.sibling(scope, predicate).isSome();
  };
  var child$1 = function (scope, predicate) {
    return $_94hxagyhjcfx5hbo.child(scope, predicate).isSome();
  };
  var descendant = function (scope, predicate) {
    return $_94hxagyhjcfx5hbo.descendant(scope, predicate).isSome();
  };
  var $_ct40btygjcfx5hbm = {
    any: any$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var focus = function (element) {
    element.dom().focus();
  };
  var blur = function (element) {
    element.dom().blur();
  };
  var hasFocus = function (element) {
    var doc = $_bke8thy2jcfx5h9w.owner(element).dom();
    return element.dom() === doc.activeElement;
  };
  var active = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    return $_8i7mfvw9jcfx5gxw.from(doc.activeElement).map($_6k7v3dwsjcfx5h08.fromDom);
  };
  var focusInside = function (element) {
    var doc = $_bke8thy2jcfx5h9w.owner(element);
    var inside = active(doc).filter(function (a) {
      return $_ct40btygjcfx5hbm.closest(a, $_30v3piwajcfx5gy5.curry($_7yb5g2w7jcfx5gx7.eq, element));
    });
    inside.fold(function () {
      focus(element);
    }, $_30v3piwajcfx5gy5.noop);
  };
  var search = function (element) {
    return active($_bke8thy2jcfx5h9w.owner(element)).filter(function (e) {
      return element.dom().contains(e.dom());
    });
  };
  var $_dzy0lsyfjcfx5hbi = {
    hasFocus: hasFocus,
    focus: focus,
    blur: blur,
    active: active,
    search: search,
    focusInside: focusInside
  };

  var ThemeManager = tinymce.util.Tools.resolve('tinymce.ThemeManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var openLink = function (target) {
    var link = document.createElement('a');
    link.target = '_blank';
    link.href = target.href;
    link.rel = 'noreferrer noopener';
    var nuEvt = document.createEvent('MouseEvents');
    nuEvt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.body.appendChild(link);
    link.dispatchEvent(nuEvt);
    document.body.removeChild(link);
  };
  var $_awd4xbyljcfx5hc3 = { openLink: openLink };

  var isSkinDisabled = function (editor) {
    return editor.settings.skin === false;
  };
  var $_g72x2ymjcfx5hc4 = { isSkinDisabled: isSkinDisabled };

  var formatChanged = 'formatChanged';
  var orientationChanged = 'orientationChanged';
  var dropupDismissed = 'dropupDismissed';
  var $_e79ixyynjcfx5hc5 = {
    formatChanged: $_30v3piwajcfx5gy5.constant(formatChanged),
    orientationChanged: $_30v3piwajcfx5gy5.constant(orientationChanged),
    dropupDismissed: $_30v3piwajcfx5gy5.constant(dropupDismissed)
  };

  var chooseChannels = function (channels, message) {
    return message.universal() ? channels : $_91ik4uw8jcfx5gxn.filter(channels, function (ch) {
      return $_91ik4uw8jcfx5gxn.contains(message.channels(), ch);
    });
  };
  var events = function (receiveConfig) {
    return $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.receive(), function (component, message) {
        var channelMap = receiveConfig.channels();
        var channels = $_929ptpwzjcfx5h1b.keys(channelMap);
        var targetChannels = chooseChannels(channels, message);
        $_91ik4uw8jcfx5gxn.each(targetChannels, function (ch) {
          var channelInfo = channelMap[ch]();
          var channelSchema = channelInfo.schema();
          var data = $_fj9y9nxgjcfx5h5a.asStructOrDie('channel[' + ch + '] data\nReceiver: ' + $_ap0k19y8jcfx5hay.element(component.element()), channelSchema, message.data());
          channelInfo.onReceive()(component, data);
        });
      })]);
  };
  var $_ev9qnqyqjcfx5hcn = { events: events };

  var menuFields = [
    $_32l4p2x1jcfx5h1y.strict('menu'),
    $_32l4p2x1jcfx5h1y.strict('selectedMenu')
  ];
  var itemFields = [
    $_32l4p2x1jcfx5h1y.strict('item'),
    $_32l4p2x1jcfx5h1y.strict('selectedItem')
  ];
  var schema = $_fj9y9nxgjcfx5h5a.objOfOnly(itemFields.concat(menuFields));
  var itemSchema = $_fj9y9nxgjcfx5h5a.objOfOnly(itemFields);
  var $_57o8neytjcfx5hdh = {
    menuFields: $_30v3piwajcfx5gy5.constant(menuFields),
    itemFields: $_30v3piwajcfx5gy5.constant(itemFields),
    schema: $_30v3piwajcfx5gy5.constant(schema),
    itemSchema: $_30v3piwajcfx5gy5.constant(itemSchema)
  };

  var initSize = $_32l4p2x1jcfx5h1y.strictObjOf('initSize', [
    $_32l4p2x1jcfx5h1y.strict('numColumns'),
    $_32l4p2x1jcfx5h1y.strict('numRows')
  ]);
  var itemMarkers = function () {
    return $_32l4p2x1jcfx5h1y.strictOf('markers', $_57o8neytjcfx5hdh.itemSchema());
  };
  var menuMarkers = function () {
    return $_32l4p2x1jcfx5h1y.strictOf('markers', $_57o8neytjcfx5hdh.schema());
  };
  var tieredMenuMarkers = function () {
    return $_32l4p2x1jcfx5h1y.strictObjOf('markers', [$_32l4p2x1jcfx5h1y.strict('backgroundMenu')].concat($_57o8neytjcfx5hdh.menuFields()).concat($_57o8neytjcfx5hdh.itemFields()));
  };
  var markers = function (required) {
    return $_32l4p2x1jcfx5h1y.strictObjOf('markers', $_91ik4uw8jcfx5gxn.map(required, $_32l4p2x1jcfx5h1y.strict));
  };
  var onPresenceHandler = function (label, fieldName, presence) {
    var trace = $_6hnwbgy7jcfx5hap.getTrace();
    return $_32l4p2x1jcfx5h1y.field(fieldName, fieldName, presence, $_fj9y9nxgjcfx5h5a.valueOf(function (f) {
      return $_5jjfpzx7jcfx5h3t.value(function () {
        $_6hnwbgy7jcfx5hap.logHandler(label, fieldName, trace);
        return f.apply(undefined, arguments);
      });
    }));
  };
  var onHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_4dvdewx2jcfx5h25.defaulted($_30v3piwajcfx5gy5.noop));
  };
  var onKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_4dvdewx2jcfx5h25.defaulted($_8i7mfvw9jcfx5gxw.none));
  };
  var onStrictHandler = function (fieldName) {
    return onPresenceHandler('onHandler', fieldName, $_4dvdewx2jcfx5h25.strict());
  };
  var onStrictKeyboardHandler = function (fieldName) {
    return onPresenceHandler('onKeyboardHandler', fieldName, $_4dvdewx2jcfx5h25.strict());
  };
  var output$1 = function (name, value) {
    return $_32l4p2x1jcfx5h1y.state(name, $_30v3piwajcfx5gy5.constant(value));
  };
  var snapshot$1 = function (name) {
    return $_32l4p2x1jcfx5h1y.state(name, $_30v3piwajcfx5gy5.identity);
  };
  var $_7spjsaysjcfx5hd5 = {
    initSize: $_30v3piwajcfx5gy5.constant(initSize),
    itemMarkers: itemMarkers,
    menuMarkers: menuMarkers,
    tieredMenuMarkers: tieredMenuMarkers,
    markers: markers,
    onHandler: onHandler,
    onKeyboardHandler: onKeyboardHandler,
    onStrictHandler: onStrictHandler,
    onStrictKeyboardHandler: onStrictKeyboardHandler,
    output: output$1,
    snapshot: snapshot$1
  };

  var ReceivingSchema = [$_32l4p2x1jcfx5h1y.strictOf('channels', $_fj9y9nxgjcfx5h5a.setOf($_5jjfpzx7jcfx5h3t.value, $_fj9y9nxgjcfx5h5a.objOfOnly([
      $_7spjsaysjcfx5hd5.onStrictHandler('onReceive'),
      $_32l4p2x1jcfx5h1y.defaulted('schema', $_fj9y9nxgjcfx5h5a.anyValue())
    ])))];

  var Receiving = $_7uu47fw3jcfx5gvw.create({
    fields: ReceivingSchema,
    name: 'receiving',
    active: $_ev9qnqyqjcfx5hcn
  });

  var updateAriaState = function (component, toggleConfig) {
    var pressed = isOn(component, toggleConfig);
    var ariaInfo = toggleConfig.aria();
    ariaInfo.update()(component, ariaInfo, pressed);
  };
  var toggle$2 = function (component, toggleConfig, toggleState) {
    $_axxg6hxtjcfx5h7e.toggle(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var on = function (component, toggleConfig, toggleState) {
    $_axxg6hxtjcfx5h7e.add(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var off = function (component, toggleConfig, toggleState) {
    $_axxg6hxtjcfx5h7e.remove(component.element(), toggleConfig.toggleClass());
    updateAriaState(component, toggleConfig);
  };
  var isOn = function (component, toggleConfig) {
    return $_axxg6hxtjcfx5h7e.has(component.element(), toggleConfig.toggleClass());
  };
  var onLoad = function (component, toggleConfig, toggleState) {
    var api = toggleConfig.selected() ? on : off;
    api(component, toggleConfig, toggleState);
  };
  var $_djh46tywjcfx5hds = {
    onLoad: onLoad,
    toggle: toggle$2,
    isOn: isOn,
    on: on,
    off: off
  };

  var exhibit = function (base, toggleConfig, toggleState) {
    return $_1k6iv7xjjcfx5h5o.nu({});
  };
  var events$1 = function (toggleConfig, toggleState) {
    var execute = $_9dgavgw4jcfx5gwc.executeEvent(toggleConfig, toggleState, $_djh46tywjcfx5hds.toggle);
    var load = $_9dgavgw4jcfx5gwc.loadEvent(toggleConfig, toggleState, $_djh46tywjcfx5hds.onLoad);
    return $_286fidw5jcfx5gwv.derive($_91ik4uw8jcfx5gxn.flatten([
      toggleConfig.toggleOnExecute() ? [execute] : [],
      [load]
    ]));
  };
  var $_9ri2qwyvjcfx5hdp = {
    exhibit: exhibit,
    events: events$1
  };

  var updatePressed = function (component, ariaInfo, status) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-pressed', status);
    if (ariaInfo.syncWithExpanded())
      updateExpanded(component, ariaInfo, status);
  };
  var updateSelected = function (component, ariaInfo, status) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-selected', status);
  };
  var updateChecked = function (component, ariaInfo, status) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-checked', status);
  };
  var updateExpanded = function (component, ariaInfo, status) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-expanded', status);
  };
  var tagAttributes = {
    button: ['aria-pressed'],
    'input:checkbox': ['aria-checked']
  };
  var roleAttributes = {
    'button': ['aria-pressed'],
    'listbox': [
      'aria-pressed',
      'aria-expanded'
    ],
    'menuitemcheckbox': ['aria-checked']
  };
  var detectFromTag = function (component) {
    var elem = component.element();
    var rawTag = $_3wpq1xxwjcfx5h87.name(elem);
    var suffix = rawTag === 'input' && $_8bne1yxvjcfx5h7n.has(elem, 'type') ? ':' + $_8bne1yxvjcfx5h7n.get(elem, 'type') : '';
    return $_42faa8x5jcfx5h3h.readOptFrom(tagAttributes, rawTag + suffix);
  };
  var detectFromRole = function (component) {
    var elem = component.element();
    if (!$_8bne1yxvjcfx5h7n.has(elem, 'role'))
      return $_8i7mfvw9jcfx5gxw.none();
    else {
      var role = $_8bne1yxvjcfx5h7n.get(elem, 'role');
      return $_42faa8x5jcfx5h3h.readOptFrom(roleAttributes, role);
    }
  };
  var updateAuto = function (component, ariaInfo, status) {
    var attributes = detectFromRole(component).orThunk(function () {
      return detectFromTag(component);
    }).getOr([]);
    $_91ik4uw8jcfx5gxn.each(attributes, function (attr) {
      $_8bne1yxvjcfx5h7n.set(component.element(), attr, status);
    });
  };
  var $_bxhxcfyyjcfx5he4 = {
    updatePressed: updatePressed,
    updateSelected: updateSelected,
    updateChecked: updateChecked,
    updateExpanded: updateExpanded,
    updateAuto: updateAuto
  };

  var ToggleSchema = [
    $_32l4p2x1jcfx5h1y.defaulted('selected', false),
    $_32l4p2x1jcfx5h1y.strict('toggleClass'),
    $_32l4p2x1jcfx5h1y.defaulted('toggleOnExecute', true),
    $_32l4p2x1jcfx5h1y.defaultedOf('aria', { mode: 'none' }, $_fj9y9nxgjcfx5h5a.choose('mode', {
      'pressed': [
        $_32l4p2x1jcfx5h1y.defaulted('syncWithExpanded', false),
        $_7spjsaysjcfx5hd5.output('update', $_bxhxcfyyjcfx5he4.updatePressed)
      ],
      'checked': [$_7spjsaysjcfx5hd5.output('update', $_bxhxcfyyjcfx5he4.updateChecked)],
      'expanded': [$_7spjsaysjcfx5hd5.output('update', $_bxhxcfyyjcfx5he4.updateExpanded)],
      'selected': [$_7spjsaysjcfx5hd5.output('update', $_bxhxcfyyjcfx5he4.updateSelected)],
      'none': [$_7spjsaysjcfx5hd5.output('update', $_30v3piwajcfx5gy5.noop)]
    }))
  ];

  var Toggling = $_7uu47fw3jcfx5gvw.create({
    fields: ToggleSchema,
    name: 'toggling',
    active: $_9ri2qwyvjcfx5hdp,
    apis: $_djh46tywjcfx5hds
  });

  var format = function (command, update) {
    return Receiving.config({
      channels: $_42faa8x5jcfx5h3h.wrap($_e79ixyynjcfx5hc5.formatChanged(), {
        onReceive: function (button, data) {
          if (data.command === command) {
            update(button, data.state);
          }
        }
      })
    });
  };
  var orientation = function (onReceive) {
    return Receiving.config({ channels: $_42faa8x5jcfx5h3h.wrap($_e79ixyynjcfx5hc5.orientationChanged(), { onReceive: onReceive }) });
  };
  var receive = function (channel, onReceive) {
    return {
      key: channel,
      value: { onReceive: onReceive }
    };
  };
  var $_a2zkb1yzjcfx5her = {
    format: format,
    orientation: orientation,
    receive: receive
  };

  var prefix = 'tinymce-mobile';
  var resolve$1 = function (p) {
    return prefix + '-' + p;
  };
  var $_46bmn4z0jcfx5hew = {
    resolve: resolve$1,
    prefix: $_30v3piwajcfx5gy5.constant(prefix)
  };

  var exhibit$1 = function (base, unselectConfig) {
    return $_1k6iv7xjjcfx5h5o.nu({
      styles: {
        '-webkit-user-select': 'none',
        'user-select': 'none',
        '-ms-user-select': 'none',
        '-moz-user-select': '-moz-none'
      },
      attributes: { 'unselectable': 'on' }
    });
  };
  var events$2 = function (unselectConfig) {
    return $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.abort($_7eoluuwwjcfx5h0z.selectstart(), $_30v3piwajcfx5gy5.constant(true))]);
  };
  var $_9d7hm6z3jcfx5hfe = {
    events: events$2,
    exhibit: exhibit$1
  };

  var Unselecting = $_7uu47fw3jcfx5gvw.create({
    fields: [],
    name: 'unselecting',
    active: $_9d7hm6z3jcfx5hfe
  });

  var focus$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_dzy0lsyfjcfx5hbi.focus(component.element());
      focusConfig.onFocus()(component);
    }
  };
  var blur$1 = function (component, focusConfig) {
    if (!focusConfig.ignore()) {
      $_dzy0lsyfjcfx5hbi.blur(component.element());
    }
  };
  var isFocused = function (component) {
    return $_dzy0lsyfjcfx5hbi.hasFocus(component.element());
  };
  var $_av0tmjz7jcfx5hg0 = {
    focus: focus$1,
    blur: blur$1,
    isFocused: isFocused
  };

  var exhibit$2 = function (base, focusConfig) {
    if (focusConfig.ignore())
      return $_1k6iv7xjjcfx5h5o.nu({});
    else
      return $_1k6iv7xjjcfx5h5o.nu({ attributes: { 'tabindex': '-1' } });
  };
  var events$3 = function (focusConfig) {
    return $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.focus(), function (component, simulatedEvent) {
        $_av0tmjz7jcfx5hg0.focus(component, focusConfig);
        simulatedEvent.stop();
      })]);
  };
  var $_u4ga3z6jcfx5hfy = {
    exhibit: exhibit$2,
    events: events$3
  };

  var FocusSchema = [
    $_7spjsaysjcfx5hd5.onHandler('onFocus'),
    $_32l4p2x1jcfx5h1y.defaulted('ignore', false)
  ];

  var Focusing = $_7uu47fw3jcfx5gvw.create({
    fields: FocusSchema,
    name: 'focusing',
    active: $_u4ga3z6jcfx5hfy,
    apis: $_av0tmjz7jcfx5hg0
  });

  var $_fa5l47zdjcfx5hgw = {
    BACKSPACE: $_30v3piwajcfx5gy5.constant([8]),
    TAB: $_30v3piwajcfx5gy5.constant([9]),
    ENTER: $_30v3piwajcfx5gy5.constant([13]),
    SHIFT: $_30v3piwajcfx5gy5.constant([16]),
    CTRL: $_30v3piwajcfx5gy5.constant([17]),
    ALT: $_30v3piwajcfx5gy5.constant([18]),
    CAPSLOCK: $_30v3piwajcfx5gy5.constant([20]),
    ESCAPE: $_30v3piwajcfx5gy5.constant([27]),
    SPACE: $_30v3piwajcfx5gy5.constant([32]),
    PAGEUP: $_30v3piwajcfx5gy5.constant([33]),
    PAGEDOWN: $_30v3piwajcfx5gy5.constant([34]),
    END: $_30v3piwajcfx5gy5.constant([35]),
    HOME: $_30v3piwajcfx5gy5.constant([36]),
    LEFT: $_30v3piwajcfx5gy5.constant([37]),
    UP: $_30v3piwajcfx5gy5.constant([38]),
    RIGHT: $_30v3piwajcfx5gy5.constant([39]),
    DOWN: $_30v3piwajcfx5gy5.constant([40]),
    INSERT: $_30v3piwajcfx5gy5.constant([45]),
    DEL: $_30v3piwajcfx5gy5.constant([46]),
    META: $_30v3piwajcfx5gy5.constant([
      91,
      93,
      224
    ]),
    F10: $_30v3piwajcfx5gy5.constant([121])
  };

  var cycleBy = function (value, delta, min, max) {
    var r = value + delta;
    if (r > max)
      return min;
    else
      return r < min ? max : r;
  };
  var cap = function (value, min, max) {
    if (value <= min)
      return min;
    else
      return value >= max ? max : value;
  };
  var $_3y2jmdzijcfx5hho = {
    cycleBy: cycleBy,
    cap: cap
  };

  var all$3 = function (predicate) {
    return descendants$1($_5392z2y6jcfx5hal.body(), predicate);
  };
  var ancestors$1 = function (scope, predicate, isRoot) {
    return $_91ik4uw8jcfx5gxn.filter($_bke8thy2jcfx5h9w.parents(scope, isRoot), predicate);
  };
  var siblings$2 = function (scope, predicate) {
    return $_91ik4uw8jcfx5gxn.filter($_bke8thy2jcfx5h9w.siblings(scope), predicate);
  };
  var children$2 = function (scope, predicate) {
    return $_91ik4uw8jcfx5gxn.filter($_bke8thy2jcfx5h9w.children(scope), predicate);
  };
  var descendants$1 = function (scope, predicate) {
    var result = [];
    $_91ik4uw8jcfx5gxn.each($_bke8thy2jcfx5h9w.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants$1(x, predicate));
    });
    return result;
  };
  var $_brba9rzkjcfx5hhs = {
    all: all$3,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  var all$2 = function (selector) {
    return $_7uhcp6wrjcfx5h00.all(selector);
  };
  var ancestors = function (scope, selector, isRoot) {
    return $_brba9rzkjcfx5hhs.ancestors(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    }, isRoot);
  };
  var siblings$1 = function (scope, selector) {
    return $_brba9rzkjcfx5hhs.siblings(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    });
  };
  var children$1 = function (scope, selector) {
    return $_brba9rzkjcfx5hhs.children(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    });
  };
  var descendants = function (scope, selector) {
    return $_7uhcp6wrjcfx5h00.all(selector, scope);
  };
  var $_5iffulzjjcfx5hhq = {
    all: all$2,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var first$2 = function (selector) {
    return $_7uhcp6wrjcfx5h00.one(selector);
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_94hxagyhjcfx5hbo.ancestor(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    }, isRoot);
  };
  var sibling$2 = function (scope, selector) {
    return $_94hxagyhjcfx5hbo.sibling(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    });
  };
  var child$3 = function (scope, selector) {
    return $_94hxagyhjcfx5hbo.child(scope, function (e) {
      return $_7uhcp6wrjcfx5h00.is(e, selector);
    });
  };
  var descendant$2 = function (scope, selector) {
    return $_7uhcp6wrjcfx5h00.one(selector, scope);
  };
  var closest$2 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_7uhcp6wrjcfx5h00.is, ancestor$2, scope, selector, isRoot);
  };
  var $_ccmao7zljcfx5hhv = {
    first: first$2,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var dehighlightAll = function (component, hConfig, hState) {
    var highlighted = $_5iffulzjjcfx5hhq.descendants(component.element(), '.' + hConfig.highlightClass());
    $_91ik4uw8jcfx5gxn.each(highlighted, function (h) {
      $_axxg6hxtjcfx5h7e.remove(h, hConfig.highlightClass());
      component.getSystem().getByDom(h).each(function (target) {
        hConfig.onDehighlight()(component, target);
      });
    });
  };
  var dehighlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    $_axxg6hxtjcfx5h7e.remove(target.element(), hConfig.highlightClass());
    if (wasHighlighted)
      hConfig.onDehighlight()(component, target);
  };
  var highlight = function (component, hConfig, hState, target) {
    var wasHighlighted = isHighlighted(component, hConfig, hState, target);
    dehighlightAll(component, hConfig, hState);
    $_axxg6hxtjcfx5h7e.add(target.element(), hConfig.highlightClass());
    if (!wasHighlighted)
      hConfig.onHighlight()(component, target);
  };
  var highlightFirst = function (component, hConfig, hState) {
    getFirst(component, hConfig, hState).each(function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightLast = function (component, hConfig, hState) {
    getLast(component, hConfig, hState).each(function (lastComp) {
      highlight(component, hConfig, hState, lastComp);
    });
  };
  var highlightAt = function (component, hConfig, hState, index) {
    getByIndex(component, hConfig, hState, index).fold(function (err) {
      throw new Error(err);
    }, function (firstComp) {
      highlight(component, hConfig, hState, firstComp);
    });
  };
  var highlightBy = function (component, hConfig, hState, predicate) {
    var items = $_5iffulzjjcfx5hhq.descendants(component.element(), '.' + hConfig.itemClass());
    var itemComps = $_g8j28lydjcfx5hbe.cat($_91ik4uw8jcfx5gxn.map(items, function (i) {
      return component.getSystem().getByDom(i).toOption();
    }));
    var targetComp = $_91ik4uw8jcfx5gxn.find(itemComps, predicate);
    targetComp.each(function (c) {
      highlight(component, hConfig, hState, c);
    });
  };
  var isHighlighted = function (component, hConfig, hState, queryTarget) {
    return $_axxg6hxtjcfx5h7e.has(queryTarget.element(), hConfig.highlightClass());
  };
  var getHighlighted = function (component, hConfig, hState) {
    return $_ccmao7zljcfx5hhv.descendant(component.element(), '.' + hConfig.highlightClass()).bind(component.getSystem().getByDom);
  };
  var getByIndex = function (component, hConfig, hState, index) {
    var items = $_5iffulzjjcfx5hhq.descendants(component.element(), '.' + hConfig.itemClass());
    return $_8i7mfvw9jcfx5gxw.from(items[index]).fold(function () {
      return $_5jjfpzx7jcfx5h3t.error('No element found with index ' + index);
    }, component.getSystem().getByDom);
  };
  var getFirst = function (component, hConfig, hState) {
    return $_ccmao7zljcfx5hhv.descendant(component.element(), '.' + hConfig.itemClass()).bind(component.getSystem().getByDom);
  };
  var getLast = function (component, hConfig, hState) {
    var items = $_5iffulzjjcfx5hhq.descendants(component.element(), '.' + hConfig.itemClass());
    var last = items.length > 0 ? $_8i7mfvw9jcfx5gxw.some(items[items.length - 1]) : $_8i7mfvw9jcfx5gxw.none();
    return last.bind(component.getSystem().getByDom);
  };
  var getDelta = function (component, hConfig, hState, delta) {
    var items = $_5iffulzjjcfx5hhq.descendants(component.element(), '.' + hConfig.itemClass());
    var current = $_91ik4uw8jcfx5gxn.findIndex(items, function (item) {
      return $_axxg6hxtjcfx5h7e.has(item, hConfig.highlightClass());
    });
    return current.bind(function (selected) {
      var dest = $_3y2jmdzijcfx5hho.cycleBy(selected, delta, 0, items.length - 1);
      return component.getSystem().getByDom(items[dest]);
    });
  };
  var getPrevious = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, -1);
  };
  var getNext = function (component, hConfig, hState) {
    return getDelta(component, hConfig, hState, +1);
  };
  var $_awnkuqzhjcfx5hha = {
    dehighlightAll: dehighlightAll,
    dehighlight: dehighlight,
    highlight: highlight,
    highlightFirst: highlightFirst,
    highlightLast: highlightLast,
    highlightAt: highlightAt,
    highlightBy: highlightBy,
    isHighlighted: isHighlighted,
    getHighlighted: getHighlighted,
    getFirst: getFirst,
    getLast: getLast,
    getPrevious: getPrevious,
    getNext: getNext
  };

  var HighlightSchema = [
    $_32l4p2x1jcfx5h1y.strict('highlightClass'),
    $_32l4p2x1jcfx5h1y.strict('itemClass'),
    $_7spjsaysjcfx5hd5.onHandler('onHighlight'),
    $_7spjsaysjcfx5hd5.onHandler('onDehighlight')
  ];

  var Highlighting = $_7uu47fw3jcfx5gvw.create({
    fields: HighlightSchema,
    name: 'highlighting',
    apis: $_awnkuqzhjcfx5hha
  });

  var dom = function () {
    var get = function (component) {
      return $_dzy0lsyfjcfx5hbi.search(component.element());
    };
    var set = function (component, focusee) {
      component.getSystem().triggerFocus(focusee, component.element());
    };
    return {
      get: get,
      set: set
    };
  };
  var highlights = function () {
    var get = function (component) {
      return Highlighting.getHighlighted(component).map(function (item) {
        return item.element();
      });
    };
    var set = function (component, element) {
      component.getSystem().getByDom(element).fold($_30v3piwajcfx5gy5.noop, function (item) {
        Highlighting.highlight(component, item);
      });
    };
    return {
      get: get,
      set: set
    };
  };
  var $_1jbe2hzfjcfx5hh4 = {
    dom: dom,
    highlights: highlights
  };

  var inSet = function (keys) {
    return function (event) {
      return $_91ik4uw8jcfx5gxn.contains(keys, event.raw().which);
    };
  };
  var and = function (preds) {
    return function (event) {
      return $_91ik4uw8jcfx5gxn.forall(preds, function (pred) {
        return pred(event);
      });
    };
  };
  var is$1 = function (key) {
    return function (event) {
      return event.raw().which === key;
    };
  };
  var isShift = function (event) {
    return event.raw().shiftKey === true;
  };
  var isControl = function (event) {
    return event.raw().ctrlKey === true;
  };
  var $_f56ljjzojcfx5hi4 = {
    inSet: inSet,
    and: and,
    is: is$1,
    isShift: isShift,
    isNotShift: $_30v3piwajcfx5gy5.not(isShift),
    isControl: isControl,
    isNotControl: $_30v3piwajcfx5gy5.not(isControl)
  };

  var basic = function (key, action) {
    return {
      matches: $_f56ljjzojcfx5hi4.is(key),
      classification: action
    };
  };
  var rule = function (matches, action) {
    return {
      matches: matches,
      classification: action
    };
  };
  var choose$2 = function (transitions, event) {
    var transition = $_91ik4uw8jcfx5gxn.find(transitions, function (t) {
      return t.matches(event);
    });
    return transition.map(function (t) {
      return t.classification;
    });
  };
  var $_c18nnuznjcfx5hi1 = {
    basic: basic,
    rule: rule,
    choose: choose$2
  };

  var typical = function (infoSchema, stateInit, getRules, getEvents, getApis, optFocusIn) {
    var schema = function () {
      return infoSchema.concat([
        $_32l4p2x1jcfx5h1y.defaulted('focusManager', $_1jbe2hzfjcfx5hh4.dom()),
        $_7spjsaysjcfx5hd5.output('handler', me),
        $_7spjsaysjcfx5hd5.output('state', stateInit)
      ]);
    };
    var processKey = function (component, simulatedEvent, keyingConfig, keyingState) {
      var rules = getRules(component, simulatedEvent, keyingConfig, keyingState);
      return $_c18nnuznjcfx5hi1.choose(rules, simulatedEvent.event()).bind(function (rule) {
        return rule(component, simulatedEvent, keyingConfig, keyingState);
      });
    };
    var toEvents = function (keyingConfig, keyingState) {
      var otherEvents = getEvents(keyingConfig, keyingState);
      var keyEvents = $_286fidw5jcfx5gwv.derive(optFocusIn.map(function (focusIn) {
        return $_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.focus(), function (component, simulatedEvent) {
          focusIn(component, keyingConfig, keyingState, simulatedEvent);
          simulatedEvent.stop();
        });
      }).toArray().concat([$_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.keydown(), function (component, simulatedEvent) {
          processKey(component, simulatedEvent, keyingConfig, keyingState).each(function (_) {
            simulatedEvent.stop();
          });
        })]));
      return $_cvmq7wxjcfx5h15.deepMerge(otherEvents, keyEvents);
    };
    var me = {
      schema: schema,
      processKey: processKey,
      toEvents: toEvents,
      toApis: getApis
    };
    return me;
  };
  var $_dpivh5zejcfx5hh0 = { typical: typical };

  var cyclePrev = function (values, index, predicate) {
    var before = $_91ik4uw8jcfx5gxn.reverse(values.slice(0, index));
    var after = $_91ik4uw8jcfx5gxn.reverse(values.slice(index + 1));
    return $_91ik4uw8jcfx5gxn.find(before.concat(after), predicate);
  };
  var tryPrev = function (values, index, predicate) {
    var before = $_91ik4uw8jcfx5gxn.reverse(values.slice(0, index));
    return $_91ik4uw8jcfx5gxn.find(before, predicate);
  };
  var cycleNext = function (values, index, predicate) {
    var before = values.slice(0, index);
    var after = values.slice(index + 1);
    return $_91ik4uw8jcfx5gxn.find(after.concat(before), predicate);
  };
  var tryNext = function (values, index, predicate) {
    var after = values.slice(index + 1);
    return $_91ik4uw8jcfx5gxn.find(after, predicate);
  };
  var $_8lodm3zpjcfx5hi8 = {
    cyclePrev: cyclePrev,
    cycleNext: cycleNext,
    tryPrev: tryPrev,
    tryNext: tryNext
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_1k6nupzsjcfx5hiw = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_7mrhymwyjcfx5h18.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_1k6nupzsjcfx5hiw.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_1k6nupzsjcfx5hiw.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$3 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_929ptpwzjcfx5h1b.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_929ptpwzjcfx5h1b.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$4 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_5392z2y6jcfx5hal.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_1k6nupzsjcfx5hiw.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return $_8i7mfvw9jcfx5gxw.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_1k6nupzsjcfx5hiw.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_6k7v3dwsjcfx5h08.fromTag(tag);
    set$3(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$5 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_8bne1yxvjcfx5h7n.has(element, 'style') && $_epbu6vwojcfx5gzq.trim($_8bne1yxvjcfx5h7n.get(element, 'style')) === '') {
      $_8bne1yxvjcfx5h7n.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_8bne1yxvjcfx5h7n.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_8bne1yxvjcfx5h7n.remove : $_8bne1yxvjcfx5h7n.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy$1 = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_1k6nupzsjcfx5hiw.isSupported(sourceDom) && $_1k6nupzsjcfx5hiw.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$3(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_3wpq1xxwjcfx5h87.isElement(source) || !$_3wpq1xxwjcfx5h87.isElement(destination))
      return;
    $_91ik4uw8jcfx5gxn.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_3wulrizrjcfx5him = {
    copy: copy$1,
    set: set$3,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$5,
    get: get$4,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var Dimension = function (name, getOffset) {
    var set = function (element, h) {
      if (!$_7mrhymwyjcfx5h18.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_1k6nupzsjcfx5hiw.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_3wulrizrjcfx5him.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_91ik4uw8jcfx5gxn.foldl(properties, function (acc, property) {
        var val = $_3wulrizrjcfx5him.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  };

  var api = Dimension('height', function (element) {
    return $_5392z2y6jcfx5hal.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$2 = function (element, h) {
    api.set(element, h);
  };
  var get$3 = function (element) {
    return api.get(element);
  };
  var getOuter$1 = function (element) {
    return api.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api.max(element, value, inclusions);
    $_3wulrizrjcfx5him.set(element, 'max-height', absMax + 'px');
  };
  var $_9z6fpvzqjcfx5hii = {
    set: set$2,
    get: get$3,
    getOuter: getOuter$1,
    setMax: setMax
  };

  var create$2 = function (cyclicField) {
    var schema = [
      $_32l4p2x1jcfx5h1y.option('onEscape'),
      $_32l4p2x1jcfx5h1y.option('onEnter'),
      $_32l4p2x1jcfx5h1y.defaulted('selector', '[data-alloy-tabstop="true"]'),
      $_32l4p2x1jcfx5h1y.defaulted('firstTabstop', 0),
      $_32l4p2x1jcfx5h1y.defaulted('useTabstopAt', $_30v3piwajcfx5gy5.constant(true)),
      $_32l4p2x1jcfx5h1y.option('visibilitySelector')
    ].concat([cyclicField]);
    var isVisible = function (tabbingConfig, element) {
      var target = tabbingConfig.visibilitySelector().bind(function (sel) {
        return $_ccmao7zljcfx5hhv.closest(element, sel);
      }).getOr(element);
      return $_9z6fpvzqjcfx5hii.get(target) > 0;
    };
    var findInitial = function (component, tabbingConfig) {
      var tabstops = $_5iffulzjjcfx5hhq.descendants(component.element(), tabbingConfig.selector());
      var visibles = $_91ik4uw8jcfx5gxn.filter(tabstops, function (elem) {
        return isVisible(tabbingConfig, elem);
      });
      return $_8i7mfvw9jcfx5gxw.from(visibles[tabbingConfig.firstTabstop()]);
    };
    var findCurrent = function (component, tabbingConfig) {
      return tabbingConfig.focusManager().get(component).bind(function (elem) {
        return $_ccmao7zljcfx5hhv.closest(elem, tabbingConfig.selector());
      });
    };
    var isTabstop = function (tabbingConfig, element) {
      return isVisible(tabbingConfig, element) && tabbingConfig.useTabstopAt()(element);
    };
    var focusIn = function (component, tabbingConfig, tabbingState) {
      findInitial(component, tabbingConfig).each(function (target) {
        tabbingConfig.focusManager().set(component, target);
      });
    };
    var goFromTabstop = function (component, tabstops, stopIndex, tabbingConfig, cycle) {
      return cycle(tabstops, stopIndex, function (elem) {
        return isTabstop(tabbingConfig, elem);
      }).fold(function () {
        return tabbingConfig.cyclic() ? $_8i7mfvw9jcfx5gxw.some(true) : $_8i7mfvw9jcfx5gxw.none();
      }, function (target) {
        tabbingConfig.focusManager().set(component, target);
        return $_8i7mfvw9jcfx5gxw.some(true);
      });
    };
    var go = function (component, simulatedEvent, tabbingConfig, cycle) {
      var tabstops = $_5iffulzjjcfx5hhq.descendants(component.element(), tabbingConfig.selector());
      return findCurrent(component, tabbingConfig).bind(function (tabstop) {
        var optStopIndex = $_91ik4uw8jcfx5gxn.findIndex(tabstops, $_30v3piwajcfx5gy5.curry($_7yb5g2w7jcfx5gx7.eq, tabstop));
        return optStopIndex.bind(function (stopIndex) {
          return goFromTabstop(component, tabstops, stopIndex, tabbingConfig, cycle);
        });
      });
    };
    var goBackwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_8lodm3zpjcfx5hi8.cyclePrev : $_8lodm3zpjcfx5hi8.tryPrev;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var goForwards = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      var navigate = tabbingConfig.cyclic() ? $_8lodm3zpjcfx5hi8.cycleNext : $_8lodm3zpjcfx5hi8.tryNext;
      return go(component, simulatedEvent, tabbingConfig, navigate);
    };
    var execute = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEnter().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var exit = function (component, simulatedEvent, tabbingConfig, tabbingState) {
      return tabbingConfig.onEscape().bind(function (f) {
        return f(component, simulatedEvent);
      });
    };
    var getRules = $_30v3piwajcfx5gy5.constant([
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
      ]), goBackwards),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB()), goForwards),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ESCAPE()), exit),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isNotShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER())
      ]), execute)
    ]);
    var getEvents = $_30v3piwajcfx5gy5.constant({});
    var getApis = $_30v3piwajcfx5gy5.constant({});
    return $_dpivh5zejcfx5hh0.typical(schema, $_g8b8q6xpjcfx5h6o.init, getRules, getEvents, getApis, $_8i7mfvw9jcfx5gxw.some(focusIn));
  };
  var $_7ka3kszcjcfx5hgh = { create: create$2 };

  var AcyclicType = $_7ka3kszcjcfx5hgh.create($_32l4p2x1jcfx5h1y.state('cyclic', $_30v3piwajcfx5gy5.constant(false)));

  var CyclicType = $_7ka3kszcjcfx5hgh.create($_32l4p2x1jcfx5h1y.state('cyclic', $_30v3piwajcfx5gy5.constant(true)));

  var inside = function (target) {
    return $_3wpq1xxwjcfx5h87.name(target) === 'input' && $_8bne1yxvjcfx5h7n.get(target, 'type') !== 'radio' || $_3wpq1xxwjcfx5h87.name(target) === 'textarea';
  };
  var $_6fu8iuzwjcfx5hjj = { inside: inside };

  var doDefaultExecute = function (component, simulatedEvent, focused) {
    $_7pg78vwujcfx5h0i.dispatch(component, focused, $_fe7kcdwvjcfx5h0s.execute());
    return $_8i7mfvw9jcfx5gxw.some(true);
  };
  var defaultExecute = function (component, simulatedEvent, focused) {
    return $_6fu8iuzwjcfx5hjj.inside(focused) && $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE())(simulatedEvent.event()) ? $_8i7mfvw9jcfx5gxw.none() : doDefaultExecute(component, simulatedEvent, focused);
  };
  var $_63q1zzzxjcfx5hjr = { defaultExecute: defaultExecute };

  var schema$1 = [
    $_32l4p2x1jcfx5h1y.defaulted('execute', $_63q1zzzxjcfx5hjr.defaultExecute),
    $_32l4p2x1jcfx5h1y.defaulted('useSpace', false),
    $_32l4p2x1jcfx5h1y.defaulted('useEnter', true),
    $_32l4p2x1jcfx5h1y.defaulted('useControlEnter', false),
    $_32l4p2x1jcfx5h1y.defaulted('useDown', false)
  ];
  var execute = function (component, simulatedEvent, executeConfig, executeState) {
    return executeConfig.execute()(component, simulatedEvent, component.element());
  };
  var getRules = function (component, simulatedEvent, executeConfig, executeState) {
    var spaceExec = executeConfig.useSpace() && !$_6fu8iuzwjcfx5hjj.inside(component.element()) ? $_fa5l47zdjcfx5hgw.SPACE() : [];
    var enterExec = executeConfig.useEnter() ? $_fa5l47zdjcfx5hgw.ENTER() : [];
    var downExec = executeConfig.useDown() ? $_fa5l47zdjcfx5hgw.DOWN() : [];
    var execKeys = spaceExec.concat(enterExec).concat(downExec);
    return [$_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet(execKeys), execute)].concat(executeConfig.useControlEnter() ? [$_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isControl,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER())
      ]), execute)] : []);
  };
  var getEvents = $_30v3piwajcfx5gy5.constant({});
  var getApis = $_30v3piwajcfx5gy5.constant({});
  var ExecutionType = $_dpivh5zejcfx5hh0.typical(schema$1, $_g8b8q6xpjcfx5h6o.init, getRules, getEvents, getApis, $_8i7mfvw9jcfx5gxw.none());

  var flatgrid = function (spec) {
    var dimensions = Cell($_8i7mfvw9jcfx5gxw.none());
    var setGridSize = function (numRows, numColumns) {
      dimensions.set($_8i7mfvw9jcfx5gxw.some({
        numRows: $_30v3piwajcfx5gy5.constant(numRows),
        numColumns: $_30v3piwajcfx5gy5.constant(numColumns)
      }));
    };
    var getNumRows = function () {
      return dimensions.get().map(function (d) {
        return d.numRows();
      });
    };
    var getNumColumns = function () {
      return dimensions.get().map(function (d) {
        return d.numColumns();
      });
    };
    return BehaviourState({
      readState: $_30v3piwajcfx5gy5.constant({}),
      setGridSize: setGridSize,
      getNumRows: getNumRows,
      getNumColumns: getNumColumns
    });
  };
  var init$1 = function (spec) {
    return spec.state()(spec);
  };
  var $_47x2g6zzjcfx5hkb = {
    flatgrid: flatgrid,
    init: init$1
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_3wulrizrjcfx5him.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_5f5v3a101jcfx5hkl = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var useH = function (movement) {
    return function (component, simulatedEvent, config, state) {
      var move = movement(component.element());
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var west = function (moveLeft, moveRight) {
    var movement = $_5f5v3a101jcfx5hkl.onDirection(moveLeft, moveRight);
    return useH(movement);
  };
  var east = function (moveLeft, moveRight) {
    var movement = $_5f5v3a101jcfx5hkl.onDirection(moveRight, moveLeft);
    return useH(movement);
  };
  var useV = function (move) {
    return function (component, simulatedEvent, config, state) {
      return use(move, component, simulatedEvent, config, state);
    };
  };
  var use = function (move, component, simulatedEvent, config, state) {
    var outcome = config.focusManager().get(component).bind(function (focused) {
      return move(component.element(), focused, config, state);
    });
    return outcome.map(function (newFocus) {
      config.focusManager().set(component, newFocus);
      return true;
    });
  };
  var $_ds58sv100jcfx5hki = {
    east: east,
    west: west,
    north: useV,
    south: useV,
    move: useV
  };

  var indexInfo = $_ci6qsrxljcfx5h6b.immutableBag([
    'index',
    'candidates'
  ], []);
  var locate = function (candidates, predicate) {
    return $_91ik4uw8jcfx5gxn.findIndex(candidates, predicate).map(function (index) {
      return indexInfo({
        index: index,
        candidates: candidates
      });
    });
  };
  var $_a2gr47103jcfx5hkv = { locate: locate };

  var visibilityToggler = function (element, property, hiddenValue, visibleValue) {
    var initial = $_3wulrizrjcfx5him.get(element, property);
    if (initial === undefined)
      initial = '';
    var value = initial === hiddenValue ? visibleValue : hiddenValue;
    var off = $_30v3piwajcfx5gy5.curry($_3wulrizrjcfx5him.set, element, property, initial);
    var on = $_30v3piwajcfx5gy5.curry($_3wulrizrjcfx5him.set, element, property, value);
    return Toggler(off, on, false);
  };
  var toggler$1 = function (element) {
    return visibilityToggler(element, 'visibility', 'hidden', 'visible');
  };
  var displayToggler = function (element, value) {
    return visibilityToggler(element, 'display', 'none', value);
  };
  var isHidden = function (dom) {
    return dom.offsetWidth <= 0 && dom.offsetHeight <= 0;
  };
  var isVisible = function (element) {
    var dom = element.dom();
    return !isHidden(dom);
  };
  var $_csib5j104jcfx5hkz = {
    toggler: toggler$1,
    displayToggler: displayToggler,
    isVisible: isVisible
  };

  var locateVisible = function (container, current, selector) {
    var filter = $_csib5j104jcfx5hkz.isVisible;
    return locateIn(container, current, selector, filter);
  };
  var locateIn = function (container, current, selector, filter) {
    var predicate = $_30v3piwajcfx5gy5.curry($_7yb5g2w7jcfx5gx7.eq, current);
    var candidates = $_5iffulzjjcfx5hhq.descendants(container, selector);
    var visible = $_91ik4uw8jcfx5gxn.filter(candidates, $_csib5j104jcfx5hkz.isVisible);
    return $_a2gr47103jcfx5hkv.locate(visible, predicate);
  };
  var findIndex$2 = function (elements, target) {
    return $_91ik4uw8jcfx5gxn.findIndex(elements, function (elem) {
      return $_7yb5g2w7jcfx5gx7.eq(target, elem);
    });
  };
  var $_8vx1s3102jcfx5hkm = {
    locateVisible: locateVisible,
    locateIn: locateIn,
    findIndex: findIndex$2
  };

  var withGrid = function (values, index, numCols, f) {
    var oldRow = Math.floor(index / numCols);
    var oldColumn = index % numCols;
    return f(oldRow, oldColumn).bind(function (address) {
      var newIndex = address.row() * numCols + address.column();
      return newIndex >= 0 && newIndex < values.length ? $_8i7mfvw9jcfx5gxw.some(values[newIndex]) : $_8i7mfvw9jcfx5gxw.none();
    });
  };
  var cycleHorizontal = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var onLastRow = oldRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - oldRow * numCols : numCols;
      var newColumn = $_3y2jmdzijcfx5hho.cycleBy(oldColumn, delta, 0, colsInRow - 1);
      return $_8i7mfvw9jcfx5gxw.some({
        row: $_30v3piwajcfx5gy5.constant(oldRow),
        column: $_30v3piwajcfx5gy5.constant(newColumn)
      });
    });
  };
  var cycleVertical = function (values, index, numRows, numCols, delta) {
    return withGrid(values, index, numCols, function (oldRow, oldColumn) {
      var newRow = $_3y2jmdzijcfx5hho.cycleBy(oldRow, delta, 0, numRows - 1);
      var onLastRow = newRow === numRows - 1;
      var colsInRow = onLastRow ? values.length - newRow * numCols : numCols;
      var newCol = $_3y2jmdzijcfx5hho.cap(oldColumn, 0, colsInRow - 1);
      return $_8i7mfvw9jcfx5gxw.some({
        row: $_30v3piwajcfx5gy5.constant(newRow),
        column: $_30v3piwajcfx5gy5.constant(newCol)
      });
    });
  };
  var cycleRight = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, +1);
  };
  var cycleLeft = function (values, index, numRows, numCols) {
    return cycleHorizontal(values, index, numRows, numCols, -1);
  };
  var cycleUp = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, -1);
  };
  var cycleDown = function (values, index, numRows, numCols) {
    return cycleVertical(values, index, numRows, numCols, +1);
  };
  var $_8rji0b105jcfx5hl4 = {
    cycleDown: cycleDown,
    cycleUp: cycleUp,
    cycleLeft: cycleLeft,
    cycleRight: cycleRight
  };

  var schema$2 = [
    $_32l4p2x1jcfx5h1y.strict('selector'),
    $_32l4p2x1jcfx5h1y.defaulted('execute', $_63q1zzzxjcfx5hjr.defaultExecute),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onEscape'),
    $_32l4p2x1jcfx5h1y.defaulted('captureTab', false),
    $_7spjsaysjcfx5hd5.initSize()
  ];
  var focusIn = function (component, gridConfig, gridState) {
    $_ccmao7zljcfx5hhv.descendant(component.element(), gridConfig.selector()).each(function (first) {
      gridConfig.focusManager().set(component, first);
    });
  };
  var findCurrent = function (component, gridConfig) {
    return gridConfig.focusManager().get(component).bind(function (elem) {
      return $_ccmao7zljcfx5hhv.closest(elem, gridConfig.selector());
    });
  };
  var execute$1 = function (component, simulatedEvent, gridConfig, gridState) {
    return findCurrent(component, gridConfig).bind(function (focused) {
      return gridConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var doMove = function (cycle) {
    return function (element, focused, gridConfig, gridState) {
      return $_8vx1s3102jcfx5hkm.locateVisible(element, focused, gridConfig.selector()).bind(function (identified) {
        return cycle(identified.candidates(), identified.index(), gridState.getNumRows().getOr(gridConfig.initSize().numRows()), gridState.getNumColumns().getOr(gridConfig.initSize().numColumns()));
      });
    };
  };
  var handleTab = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.captureTab() ? $_8i7mfvw9jcfx5gxw.some(true) : $_8i7mfvw9jcfx5gxw.none();
  };
  var doEscape = function (component, simulatedEvent, gridConfig, gridState) {
    return gridConfig.onEscape()(component, simulatedEvent);
  };
  var moveLeft = doMove($_8rji0b105jcfx5hl4.cycleLeft);
  var moveRight = doMove($_8rji0b105jcfx5hl4.cycleRight);
  var moveNorth = doMove($_8rji0b105jcfx5hl4.cycleUp);
  var moveSouth = doMove($_8rji0b105jcfx5hl4.cycleDown);
  var getRules$1 = $_30v3piwajcfx5gy5.constant([
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.LEFT()), $_ds58sv100jcfx5hki.west(moveLeft, moveRight)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.RIGHT()), $_ds58sv100jcfx5hki.east(moveLeft, moveRight)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.UP()), $_ds58sv100jcfx5hki.north(moveNorth)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.DOWN()), $_ds58sv100jcfx5hki.south(moveSouth)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
      $_f56ljjzojcfx5hi4.isShift,
      $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
    ]), handleTab),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
      $_f56ljjzojcfx5hi4.isNotShift,
      $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
    ]), handleTab),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ESCAPE()), doEscape),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE().concat($_fa5l47zdjcfx5hgw.ENTER())), execute$1)
  ]);
  var getEvents$1 = $_30v3piwajcfx5gy5.constant({});
  var getApis$1 = {};
  var FlatgridType = $_dpivh5zejcfx5hh0.typical(schema$2, $_47x2g6zzjcfx5hkb.flatgrid, getRules$1, getEvents$1, getApis$1, $_8i7mfvw9jcfx5gxw.some(focusIn));

  var horizontal = function (container, selector, current, delta) {
    return $_8vx1s3102jcfx5hkm.locateVisible(container, current, selector, $_30v3piwajcfx5gy5.constant(true)).bind(function (identified) {
      var index = identified.index();
      var candidates = identified.candidates();
      var newIndex = $_3y2jmdzijcfx5hho.cycleBy(index, delta, 0, candidates.length - 1);
      return $_8i7mfvw9jcfx5gxw.from(candidates[newIndex]);
    });
  };
  var $_8lozyr107jcfx5hlo = { horizontal: horizontal };

  var schema$3 = [
    $_32l4p2x1jcfx5h1y.strict('selector'),
    $_32l4p2x1jcfx5h1y.defaulted('getInitial', $_8i7mfvw9jcfx5gxw.none),
    $_32l4p2x1jcfx5h1y.defaulted('execute', $_63q1zzzxjcfx5hjr.defaultExecute),
    $_32l4p2x1jcfx5h1y.defaulted('executeOnMove', false)
  ];
  var findCurrent$1 = function (component, flowConfig) {
    return flowConfig.focusManager().get(component).bind(function (elem) {
      return $_ccmao7zljcfx5hhv.closest(elem, flowConfig.selector());
    });
  };
  var execute$2 = function (component, simulatedEvent, flowConfig) {
    return findCurrent$1(component, flowConfig).bind(function (focused) {
      return flowConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$1 = function (component, flowConfig) {
    flowConfig.getInitial()(component).or($_ccmao7zljcfx5hhv.descendant(component.element(), flowConfig.selector())).each(function (first) {
      flowConfig.focusManager().set(component, first);
    });
  };
  var moveLeft$1 = function (element, focused, info) {
    return $_8lozyr107jcfx5hlo.horizontal(element, info.selector(), focused, -1);
  };
  var moveRight$1 = function (element, focused, info) {
    return $_8lozyr107jcfx5hlo.horizontal(element, info.selector(), focused, +1);
  };
  var doMove$1 = function (movement) {
    return function (component, simulatedEvent, flowConfig) {
      return movement(component, simulatedEvent, flowConfig).bind(function () {
        return flowConfig.executeOnMove() ? execute$2(component, simulatedEvent, flowConfig) : $_8i7mfvw9jcfx5gxw.some(true);
      });
    };
  };
  var getRules$2 = function (_) {
    return [
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.LEFT().concat($_fa5l47zdjcfx5hgw.UP())), doMove$1($_ds58sv100jcfx5hki.west(moveLeft$1, moveRight$1))),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.RIGHT().concat($_fa5l47zdjcfx5hgw.DOWN())), doMove$1($_ds58sv100jcfx5hki.east(moveLeft$1, moveRight$1))),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER()), execute$2),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE()), execute$2)
    ];
  };
  var getEvents$2 = $_30v3piwajcfx5gy5.constant({});
  var getApis$2 = $_30v3piwajcfx5gy5.constant({});
  var FlowType = $_dpivh5zejcfx5hh0.typical(schema$3, $_g8b8q6xpjcfx5h6o.init, getRules$2, getEvents$2, getApis$2, $_8i7mfvw9jcfx5gxw.some(focusIn$1));

  var outcome = $_ci6qsrxljcfx5h6b.immutableBag([
    'rowIndex',
    'columnIndex',
    'cell'
  ], []);
  var toCell = function (matrix, rowIndex, columnIndex) {
    return $_8i7mfvw9jcfx5gxw.from(matrix[rowIndex]).bind(function (row) {
      return $_8i7mfvw9jcfx5gxw.from(row[columnIndex]).map(function (cell) {
        return outcome({
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          cell: cell
        });
      });
    });
  };
  var cycleHorizontal$1 = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_3y2jmdzijcfx5hho.cycleBy(startCol, deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var cycleVertical$1 = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_3y2jmdzijcfx5hho.cycleBy(startRow, deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_3y2jmdzijcfx5hho.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var moveHorizontal = function (matrix, rowIndex, startCol, deltaCol) {
    var row = matrix[rowIndex];
    var colsInRow = row.length;
    var newColIndex = $_3y2jmdzijcfx5hho.cap(startCol + deltaCol, 0, colsInRow - 1);
    return toCell(matrix, rowIndex, newColIndex);
  };
  var moveVertical = function (matrix, colIndex, startRow, deltaRow) {
    var nextRowIndex = $_3y2jmdzijcfx5hho.cap(startRow + deltaRow, 0, matrix.length - 1);
    var colsInNextRow = matrix[nextRowIndex].length;
    var nextColIndex = $_3y2jmdzijcfx5hho.cap(colIndex, 0, colsInNextRow - 1);
    return toCell(matrix, nextRowIndex, nextColIndex);
  };
  var cycleRight$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, +1);
  };
  var cycleLeft$1 = function (matrix, startRow, startCol) {
    return cycleHorizontal$1(matrix, startRow, startCol, -1);
  };
  var cycleUp$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, -1);
  };
  var cycleDown$1 = function (matrix, startRow, startCol) {
    return cycleVertical$1(matrix, startCol, startRow, +1);
  };
  var moveLeft$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, -1);
  };
  var moveRight$3 = function (matrix, startRow, startCol) {
    return moveHorizontal(matrix, startRow, startCol, +1);
  };
  var moveUp = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, -1);
  };
  var moveDown = function (matrix, startRow, startCol) {
    return moveVertical(matrix, startCol, startRow, +1);
  };
  var $_7nm7oi109jcfx5hmf = {
    cycleRight: cycleRight$1,
    cycleLeft: cycleLeft$1,
    cycleUp: cycleUp$1,
    cycleDown: cycleDown$1,
    moveLeft: moveLeft$3,
    moveRight: moveRight$3,
    moveUp: moveUp,
    moveDown: moveDown
  };

  var schema$4 = [
    $_32l4p2x1jcfx5h1y.strictObjOf('selectors', [
      $_32l4p2x1jcfx5h1y.strict('row'),
      $_32l4p2x1jcfx5h1y.strict('cell')
    ]),
    $_32l4p2x1jcfx5h1y.defaulted('cycles', true),
    $_32l4p2x1jcfx5h1y.defaulted('previousSelector', $_8i7mfvw9jcfx5gxw.none),
    $_32l4p2x1jcfx5h1y.defaulted('execute', $_63q1zzzxjcfx5hjr.defaultExecute)
  ];
  var focusIn$2 = function (component, matrixConfig) {
    var focused = matrixConfig.previousSelector()(component).orThunk(function () {
      var selectors = matrixConfig.selectors();
      return $_ccmao7zljcfx5hhv.descendant(component.element(), selectors.cell());
    });
    focused.each(function (cell) {
      matrixConfig.focusManager().set(component, cell);
    });
  };
  var execute$3 = function (component, simulatedEvent, matrixConfig) {
    return $_dzy0lsyfjcfx5hbi.search(component.element()).bind(function (focused) {
      return matrixConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var toMatrix = function (rows, matrixConfig) {
    return $_91ik4uw8jcfx5gxn.map(rows, function (row) {
      return $_5iffulzjjcfx5hhq.descendants(row, matrixConfig.selectors().cell());
    });
  };
  var doMove$2 = function (ifCycle, ifMove) {
    return function (element, focused, matrixConfig) {
      var move = matrixConfig.cycles() ? ifCycle : ifMove;
      return $_ccmao7zljcfx5hhv.closest(focused, matrixConfig.selectors().row()).bind(function (inRow) {
        var cellsInRow = $_5iffulzjjcfx5hhq.descendants(inRow, matrixConfig.selectors().cell());
        return $_8vx1s3102jcfx5hkm.findIndex(cellsInRow, focused).bind(function (colIndex) {
          var allRows = $_5iffulzjjcfx5hhq.descendants(element, matrixConfig.selectors().row());
          return $_8vx1s3102jcfx5hkm.findIndex(allRows, inRow).bind(function (rowIndex) {
            var matrix = toMatrix(allRows, matrixConfig);
            return move(matrix, rowIndex, colIndex).map(function (next) {
              return next.cell();
            });
          });
        });
      });
    };
  };
  var moveLeft$2 = doMove$2($_7nm7oi109jcfx5hmf.cycleLeft, $_7nm7oi109jcfx5hmf.moveLeft);
  var moveRight$2 = doMove$2($_7nm7oi109jcfx5hmf.cycleRight, $_7nm7oi109jcfx5hmf.moveRight);
  var moveNorth$1 = doMove$2($_7nm7oi109jcfx5hmf.cycleUp, $_7nm7oi109jcfx5hmf.moveUp);
  var moveSouth$1 = doMove$2($_7nm7oi109jcfx5hmf.cycleDown, $_7nm7oi109jcfx5hmf.moveDown);
  var getRules$3 = $_30v3piwajcfx5gy5.constant([
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.LEFT()), $_ds58sv100jcfx5hki.west(moveLeft$2, moveRight$2)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.RIGHT()), $_ds58sv100jcfx5hki.east(moveLeft$2, moveRight$2)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.UP()), $_ds58sv100jcfx5hki.north(moveNorth$1)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.DOWN()), $_ds58sv100jcfx5hki.south(moveSouth$1)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE().concat($_fa5l47zdjcfx5hgw.ENTER())), execute$3)
  ]);
  var getEvents$3 = $_30v3piwajcfx5gy5.constant({});
  var getApis$3 = $_30v3piwajcfx5gy5.constant({});
  var MatrixType = $_dpivh5zejcfx5hh0.typical(schema$4, $_g8b8q6xpjcfx5h6o.init, getRules$3, getEvents$3, getApis$3, $_8i7mfvw9jcfx5gxw.some(focusIn$2));

  var schema$5 = [
    $_32l4p2x1jcfx5h1y.strict('selector'),
    $_32l4p2x1jcfx5h1y.defaulted('execute', $_63q1zzzxjcfx5hjr.defaultExecute),
    $_32l4p2x1jcfx5h1y.defaulted('moveOnTab', false)
  ];
  var execute$4 = function (component, simulatedEvent, menuConfig) {
    return menuConfig.focusManager().get(component).bind(function (focused) {
      return menuConfig.execute()(component, simulatedEvent, focused);
    });
  };
  var focusIn$3 = function (component, menuConfig, simulatedEvent) {
    $_ccmao7zljcfx5hhv.descendant(component.element(), menuConfig.selector()).each(function (first) {
      menuConfig.focusManager().set(component, first);
    });
  };
  var moveUp$1 = function (element, focused, info) {
    return $_8lozyr107jcfx5hlo.horizontal(element, info.selector(), focused, -1);
  };
  var moveDown$1 = function (element, focused, info) {
    return $_8lozyr107jcfx5hlo.horizontal(element, info.selector(), focused, +1);
  };
  var fireShiftTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_ds58sv100jcfx5hki.move(moveUp$1)(component, simulatedEvent, menuConfig) : $_8i7mfvw9jcfx5gxw.none();
  };
  var fireTab = function (component, simulatedEvent, menuConfig) {
    return menuConfig.moveOnTab() ? $_ds58sv100jcfx5hki.move(moveDown$1)(component, simulatedEvent, menuConfig) : $_8i7mfvw9jcfx5gxw.none();
  };
  var getRules$4 = $_30v3piwajcfx5gy5.constant([
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.UP()), $_ds58sv100jcfx5hki.move(moveUp$1)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.DOWN()), $_ds58sv100jcfx5hki.move(moveDown$1)),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
      $_f56ljjzojcfx5hi4.isShift,
      $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
    ]), fireShiftTab),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
      $_f56ljjzojcfx5hi4.isNotShift,
      $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
    ]), fireTab),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER()), execute$4),
    $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE()), execute$4)
  ]);
  var getEvents$4 = $_30v3piwajcfx5gy5.constant({});
  var getApis$4 = $_30v3piwajcfx5gy5.constant({});
  var MenuType = $_dpivh5zejcfx5hh0.typical(schema$5, $_g8b8q6xpjcfx5h6o.init, getRules$4, getEvents$4, getApis$4, $_8i7mfvw9jcfx5gxw.some(focusIn$3));

  var schema$6 = [
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onSpace'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onEnter'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onShiftEnter'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onLeft'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onRight'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onTab'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onShiftTab'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onUp'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onDown'),
    $_7spjsaysjcfx5hd5.onKeyboardHandler('onEscape'),
    $_32l4p2x1jcfx5h1y.option('focusIn')
  ];
  var getRules$5 = function (component, simulatedEvent, executeInfo) {
    return [
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE()), executeInfo.onSpace()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isNotShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER())
      ]), executeInfo.onEnter()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ENTER())
      ]), executeInfo.onShiftEnter()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
      ]), executeInfo.onShiftTab()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.and([
        $_f56ljjzojcfx5hi4.isNotShift,
        $_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.TAB())
      ]), executeInfo.onTab()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.UP()), executeInfo.onUp()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.DOWN()), executeInfo.onDown()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.LEFT()), executeInfo.onLeft()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.RIGHT()), executeInfo.onRight()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.SPACE()), executeInfo.onSpace()),
      $_c18nnuznjcfx5hi1.rule($_f56ljjzojcfx5hi4.inSet($_fa5l47zdjcfx5hgw.ESCAPE()), executeInfo.onEscape())
    ];
  };
  var focusIn$4 = function (component, executeInfo) {
    return executeInfo.focusIn().bind(function (f) {
      return f(component, executeInfo);
    });
  };
  var getEvents$5 = $_30v3piwajcfx5gy5.constant({});
  var getApis$5 = $_30v3piwajcfx5gy5.constant({});
  var SpecialType = $_dpivh5zejcfx5hh0.typical(schema$6, $_g8b8q6xpjcfx5h6o.init, getRules$5, getEvents$5, getApis$5, $_8i7mfvw9jcfx5gxw.some(focusIn$4));

  var $_3b0be6zajcfx5hgb = {
    acyclic: AcyclicType.schema(),
    cyclic: CyclicType.schema(),
    flow: FlowType.schema(),
    flatgrid: FlatgridType.schema(),
    matrix: MatrixType.schema(),
    execution: ExecutionType.schema(),
    menu: MenuType.schema(),
    special: SpecialType.schema()
  };

  var Keying = $_7uu47fw3jcfx5gvw.createModes({
    branchKey: 'mode',
    branches: $_3b0be6zajcfx5hgb,
    name: 'keying',
    active: {
      events: function (keyingConfig, keyingState) {
        var handler = keyingConfig.handler();
        return handler.toEvents(keyingConfig, keyingState);
      }
    },
    apis: {
      focusIn: function (component) {
        component.getSystem().triggerFocus(component.element(), component.element());
      },
      setGridSize: function (component, keyConfig, keyState, numRows, numColumns) {
        if (!$_42faa8x5jcfx5h3h.hasKey(keyState, 'setGridSize')) {
          console.error('Layout does not support setGridSize');
        } else {
          keyState.setGridSize(numRows, numColumns);
        }
      }
    },
    state: $_47x2g6zzjcfx5hkb
  });

  var field$1 = function (name, forbidden) {
    return $_32l4p2x1jcfx5h1y.defaultedObjOf(name, {}, $_91ik4uw8jcfx5gxn.map(forbidden, function (f) {
      return $_32l4p2x1jcfx5h1y.forbid(f.name(), 'Cannot configure ' + f.name() + ' for ' + name);
    }).concat([$_32l4p2x1jcfx5h1y.state('dump', $_30v3piwajcfx5gy5.identity)]));
  };
  var get$5 = function (data) {
    return data.dump();
  };
  var $_ijaov10cjcfx5hn2 = {
    field: field$1,
    get: get$5
  };

  var unique = 0;
  var generate$1 = function (prefix) {
    var date = new Date();
    var time = date.getTime();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
  };
  var $_4yc6r610fjcfx5ho0 = { generate: generate$1 };

  var premadeTag = $_4yc6r610fjcfx5ho0.generate('alloy-premade');
  var apiConfig = $_4yc6r610fjcfx5ho0.generate('api');
  var premade = function (comp) {
    return $_42faa8x5jcfx5h3h.wrap(premadeTag, comp);
  };
  var getPremade = function (spec) {
    return $_42faa8x5jcfx5h3h.readOptFrom(spec, premadeTag);
  };
  var makeApi = function (f) {
    return $_7ahhasxijcfx5h5l.markAsSketchApi(function (component) {
      var args = Array.prototype.slice.call(arguments, 0);
      var spi = component.config(apiConfig);
      return f.apply(undefined, [spi].concat(args));
    }, f);
  };
  var $_9s15br10ejcfx5hnm = {
    apiConfig: $_30v3piwajcfx5gy5.constant(apiConfig),
    makeApi: makeApi,
    premade: premade,
    getPremade: getPremade
  };

  var adt$2 = $_49o4fsx3jcfx5h2a.generate([
    { required: ['data'] },
    { external: ['data'] },
    { optional: ['data'] },
    { group: ['data'] }
  ]);
  var fFactory = $_32l4p2x1jcfx5h1y.defaulted('factory', { sketch: $_30v3piwajcfx5gy5.identity });
  var fSchema = $_32l4p2x1jcfx5h1y.defaulted('schema', []);
  var fName = $_32l4p2x1jcfx5h1y.strict('name');
  var fPname = $_32l4p2x1jcfx5h1y.field('pname', 'pname', $_4dvdewx2jcfx5h25.defaultedThunk(function (typeSpec) {
    return '<alloy.' + $_4yc6r610fjcfx5ho0.generate(typeSpec.name) + '>';
  }), $_fj9y9nxgjcfx5h5a.anyValue());
  var fDefaults = $_32l4p2x1jcfx5h1y.defaulted('defaults', $_30v3piwajcfx5gy5.constant({}));
  var fOverrides = $_32l4p2x1jcfx5h1y.defaulted('overrides', $_30v3piwajcfx5gy5.constant({}));
  var requiredSpec = $_fj9y9nxgjcfx5h5a.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var externalSpec = $_fj9y9nxgjcfx5h5a.objOf([
    fFactory,
    fSchema,
    fName,
    fDefaults,
    fOverrides
  ]);
  var optionalSpec = $_fj9y9nxgjcfx5h5a.objOf([
    fFactory,
    fSchema,
    fName,
    fPname,
    fDefaults,
    fOverrides
  ]);
  var groupSpec = $_fj9y9nxgjcfx5h5a.objOf([
    fFactory,
    fSchema,
    fName,
    $_32l4p2x1jcfx5h1y.strict('unit'),
    fPname,
    fDefaults,
    fOverrides
  ]);
  var asNamedPart = function (part) {
    return part.fold($_8i7mfvw9jcfx5gxw.some, $_8i7mfvw9jcfx5gxw.none, $_8i7mfvw9jcfx5gxw.some, $_8i7mfvw9jcfx5gxw.some);
  };
  var name$1 = function (part) {
    var get = function (data) {
      return data.name();
    };
    return part.fold(get, get, get, get);
  };
  var asCommon = function (part) {
    return part.fold($_30v3piwajcfx5gy5.identity, $_30v3piwajcfx5gy5.identity, $_30v3piwajcfx5gy5.identity, $_30v3piwajcfx5gy5.identity);
  };
  var convert = function (adtConstructor, partSpec) {
    return function (spec) {
      var data = $_fj9y9nxgjcfx5h5a.asStructOrDie('Converting part type', partSpec, spec);
      return adtConstructor(data);
    };
  };
  var $_9leb2110jjcfx5hp6 = {
    required: convert(adt$2.required, requiredSpec),
    external: convert(adt$2.external, externalSpec),
    optional: convert(adt$2.optional, optionalSpec),
    group: convert(adt$2.group, groupSpec),
    asNamedPart: asNamedPart,
    name: name$1,
    asCommon: asCommon,
    original: $_30v3piwajcfx5gy5.constant('entirety')
  };

  var placeholder = 'placeholder';
  var adt$3 = $_49o4fsx3jcfx5h2a.generate([
    {
      single: [
        'required',
        'valueThunk'
      ]
    },
    {
      multiple: [
        'required',
        'valueThunks'
      ]
    }
  ]);
  var isSubstitute = function (uiType) {
    return $_91ik4uw8jcfx5gxn.contains([placeholder], uiType);
  };
  var subPlaceholder = function (owner, detail, compSpec, placeholders) {
    if (owner.exists(function (o) {
        return o !== compSpec.owner;
      }))
      return adt$3.single(true, $_30v3piwajcfx5gy5.constant(compSpec));
    return $_42faa8x5jcfx5h3h.readOptFrom(placeholders, compSpec.name).fold(function () {
      throw new Error('Unknown placeholder component: ' + compSpec.name + '\nKnown: [' + $_929ptpwzjcfx5h1b.keys(placeholders) + ']\nNamespace: ' + owner.getOr('none') + '\nSpec: ' + $_euz44nxejcfx5h51.stringify(compSpec, null, 2));
    }, function (newSpec) {
      return newSpec.replace();
    });
  };
  var scan = function (owner, detail, compSpec, placeholders) {
    if (compSpec.uiType === placeholder)
      return subPlaceholder(owner, detail, compSpec, placeholders);
    else
      return adt$3.single(false, $_30v3piwajcfx5gy5.constant(compSpec));
  };
  var substitute = function (owner, detail, compSpec, placeholders) {
    var base = scan(owner, detail, compSpec, placeholders);
    return base.fold(function (req, valueThunk) {
      var value = valueThunk(detail, compSpec.config, compSpec.validated);
      var childSpecs = $_42faa8x5jcfx5h3h.readOptFrom(value, 'components').getOr([]);
      var substituted = $_91ik4uw8jcfx5gxn.bind(childSpecs, function (c) {
        return substitute(owner, detail, c, placeholders);
      });
      return [$_cvmq7wxjcfx5h15.deepMerge(value, { components: substituted })];
    }, function (req, valuesThunk) {
      var values = valuesThunk(detail, compSpec.config, compSpec.validated);
      return values;
    });
  };
  var substituteAll = function (owner, detail, components, placeholders) {
    return $_91ik4uw8jcfx5gxn.bind(components, function (c) {
      return substitute(owner, detail, c, placeholders);
    });
  };
  var oneReplace = function (label, replacements) {
    var called = false;
    var used = function () {
      return called;
    };
    var replace = function () {
      if (called === true)
        throw new Error('Trying to use the same placeholder more than once: ' + label);
      called = true;
      return replacements;
    };
    var required = function () {
      return replacements.fold(function (req, _) {
        return req;
      }, function (req, _) {
        return req;
      });
    };
    return {
      name: $_30v3piwajcfx5gy5.constant(label),
      required: required,
      used: used,
      replace: replace
    };
  };
  var substitutePlaces = function (owner, detail, components, placeholders) {
    var ps = $_929ptpwzjcfx5h1b.map(placeholders, function (ph, name) {
      return oneReplace(name, ph);
    });
    var outcome = substituteAll(owner, detail, components, ps);
    $_929ptpwzjcfx5h1b.each(ps, function (p) {
      if (p.used() === false && p.required()) {
        throw new Error('Placeholder: ' + p.name() + ' was not found in components list\nNamespace: ' + owner.getOr('none') + '\nComponents: ' + $_euz44nxejcfx5h51.stringify(detail.components(), null, 2));
      }
    });
    return outcome;
  };
  var singleReplace = function (detail, p) {
    var replacement = p;
    return replacement.fold(function (req, valueThunk) {
      return [valueThunk(detail)];
    }, function (req, valuesThunk) {
      return valuesThunk(detail);
    });
  };
  var $_efm6oj10kjcfx5hpm = {
    single: adt$3.single,
    multiple: adt$3.multiple,
    isSubstitute: isSubstitute,
    placeholder: $_30v3piwajcfx5gy5.constant(placeholder),
    substituteAll: substituteAll,
    substitutePlaces: substitutePlaces,
    singleReplace: singleReplace
  };

  var combine = function (detail, data, partSpec, partValidated) {
    var spec = partSpec;
    return $_cvmq7wxjcfx5h15.deepMerge(data.defaults()(detail, partSpec, partValidated), partSpec, { uid: detail.partUids()[data.name()] }, data.overrides()(detail, partSpec, partValidated), { 'debug.sketcher': $_42faa8x5jcfx5h3h.wrap('part-' + data.name(), spec) });
  };
  var subs = function (owner, detail, parts) {
    var internals = {};
    var externals = {};
    $_91ik4uw8jcfx5gxn.each(parts, function (part) {
      part.fold(function (data) {
        internals[data.pname()] = $_efm6oj10kjcfx5hpm.single(true, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        var partSpec = detail.parts()[data.name()]();
        externals[data.name()] = $_30v3piwajcfx5gy5.constant(combine(detail, data, partSpec[$_9leb2110jjcfx5hp6.original()]()));
      }, function (data) {
        internals[data.pname()] = $_efm6oj10kjcfx5hpm.single(false, function (detail, partSpec, partValidated) {
          return data.factory().sketch(combine(detail, data, partSpec, partValidated));
        });
      }, function (data) {
        internals[data.pname()] = $_efm6oj10kjcfx5hpm.multiple(true, function (detail, _partSpec, _partValidated) {
          var units = detail[data.name()]();
          return $_91ik4uw8jcfx5gxn.map(units, function (u) {
            return data.factory().sketch($_cvmq7wxjcfx5h15.deepMerge(data.defaults()(detail, u), u, data.overrides()(detail, u)));
          });
        });
      });
    });
    return {
      internals: $_30v3piwajcfx5gy5.constant(internals),
      externals: $_30v3piwajcfx5gy5.constant(externals)
    };
  };
  var $_7mnwlx10ijcfx5hoz = { subs: subs };

  var generate$2 = function (owner, parts) {
    var r = {};
    $_91ik4uw8jcfx5gxn.each(parts, function (part) {
      $_9leb2110jjcfx5hp6.asNamedPart(part).each(function (np) {
        var g = doGenerateOne(owner, np.pname());
        r[np.name()] = function (config) {
          var validated = $_fj9y9nxgjcfx5h5a.asRawOrDie('Part: ' + np.name() + ' in ' + owner, $_fj9y9nxgjcfx5h5a.objOf(np.schema()), config);
          return $_cvmq7wxjcfx5h15.deepMerge(g, {
            config: config,
            validated: validated
          });
        };
      });
    });
    return r;
  };
  var doGenerateOne = function (owner, pname) {
    return {
      uiType: $_efm6oj10kjcfx5hpm.placeholder(),
      owner: owner,
      name: pname
    };
  };
  var generateOne = function (owner, pname, config) {
    return {
      uiType: $_efm6oj10kjcfx5hpm.placeholder(),
      owner: owner,
      name: pname,
      config: config,
      validated: {}
    };
  };
  var schemas = function (parts) {
    return $_91ik4uw8jcfx5gxn.bind(parts, function (part) {
      return part.fold($_8i7mfvw9jcfx5gxw.none, $_8i7mfvw9jcfx5gxw.some, $_8i7mfvw9jcfx5gxw.none, $_8i7mfvw9jcfx5gxw.none).map(function (data) {
        return $_32l4p2x1jcfx5h1y.strictObjOf(data.name(), data.schema().concat([$_7spjsaysjcfx5hd5.snapshot($_9leb2110jjcfx5hp6.original())]));
      }).toArray();
    });
  };
  var names = function (parts) {
    return $_91ik4uw8jcfx5gxn.map(parts, $_9leb2110jjcfx5hp6.name);
  };
  var substitutes = function (owner, detail, parts) {
    return $_7mnwlx10ijcfx5hoz.subs(owner, detail, parts);
  };
  var components = function (owner, detail, internals) {
    return $_efm6oj10kjcfx5hpm.substitutePlaces($_8i7mfvw9jcfx5gxw.some(owner), detail, detail.components(), internals);
  };
  var getPart = function (component, detail, partKey) {
    var uid = detail.partUids()[partKey];
    return component.getSystem().getByUid(uid).toOption();
  };
  var getPartOrDie = function (component, detail, partKey) {
    return getPart(component, detail, partKey).getOrDie('Could not find part: ' + partKey);
  };
  var getParts = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_91ik4uw8jcfx5gxn.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]);
    });
    return $_929ptpwzjcfx5h1b.map(r, $_30v3piwajcfx5gy5.constant);
  };
  var getAllParts = function (component, detail) {
    var system = component.getSystem();
    return $_929ptpwzjcfx5h1b.map(detail.partUids(), function (pUid, k) {
      return $_30v3piwajcfx5gy5.constant(system.getByUid(pUid));
    });
  };
  var getPartsOrDie = function (component, detail, partKeys) {
    var r = {};
    var uids = detail.partUids();
    var system = component.getSystem();
    $_91ik4uw8jcfx5gxn.each(partKeys, function (pk) {
      r[pk] = system.getByUid(uids[pk]).getOrDie();
    });
    return $_929ptpwzjcfx5h1b.map(r, $_30v3piwajcfx5gy5.constant);
  };
  var defaultUids = function (baseUid, partTypes) {
    var partNames = names(partTypes);
    return $_42faa8x5jcfx5h3h.wrapAll($_91ik4uw8jcfx5gxn.map(partNames, function (pn) {
      return {
        key: pn,
        value: baseUid + '-' + pn
      };
    }));
  };
  var defaultUidsSchema = function (partTypes) {
    return $_32l4p2x1jcfx5h1y.field('partUids', 'partUids', $_4dvdewx2jcfx5h25.mergeWithThunk(function (spec) {
      return defaultUids(spec.uid, partTypes);
    }), $_fj9y9nxgjcfx5h5a.anyValue());
  };
  var $_8uasnh10hjcfx5hob = {
    generate: generate$2,
    generateOne: generateOne,
    schemas: schemas,
    names: names,
    substitutes: substitutes,
    components: components,
    defaultUids: defaultUids,
    defaultUidsSchema: defaultUidsSchema,
    getAllParts: getAllParts,
    getPart: getPart,
    getPartOrDie: getPartOrDie,
    getParts: getParts,
    getPartsOrDie: getPartsOrDie
  };

  var prefix$2 = 'alloy-id-';
  var idAttr$1 = 'data-alloy-id';
  var $_c3fvkj10mjcfx5hqw = {
    prefix: $_30v3piwajcfx5gy5.constant(prefix$2),
    idAttr: $_30v3piwajcfx5gy5.constant(idAttr$1)
  };

  var prefix$1 = $_c3fvkj10mjcfx5hqw.prefix();
  var idAttr = $_c3fvkj10mjcfx5hqw.idAttr();
  var write = function (label, elem) {
    var id = $_4yc6r610fjcfx5ho0.generate(prefix$1 + label);
    $_8bne1yxvjcfx5h7n.set(elem, idAttr, id);
    return id;
  };
  var writeOnly = function (elem, uid) {
    $_8bne1yxvjcfx5h7n.set(elem, idAttr, uid);
  };
  var read$2 = function (elem) {
    var id = $_3wpq1xxwjcfx5h87.isElement(elem) ? $_8bne1yxvjcfx5h7n.get(elem, idAttr) : null;
    return $_8i7mfvw9jcfx5gxw.from(id);
  };
  var find$3 = function (container, id) {
    return $_ccmao7zljcfx5hhv.descendant(container, id);
  };
  var generate$3 = function (prefix) {
    return $_4yc6r610fjcfx5ho0.generate(prefix);
  };
  var revoke = function (elem) {
    $_8bne1yxvjcfx5h7n.remove(elem, idAttr);
  };
  var $_ftkrhf10ljcfx5hqd = {
    revoke: revoke,
    write: write,
    writeOnly: writeOnly,
    read: read$2,
    find: find$3,
    generate: generate$3,
    attribute: $_30v3piwajcfx5gy5.constant(idAttr)
  };

  var getPartsSchema = function (partNames, _optPartNames, _owner) {
    var owner = _owner !== undefined ? _owner : 'Unknown owner';
    var fallbackThunk = function () {
      return [$_7spjsaysjcfx5hd5.output('partUids', {})];
    };
    var optPartNames = _optPartNames !== undefined ? _optPartNames : fallbackThunk();
    if (partNames.length === 0 && optPartNames.length === 0)
      return fallbackThunk();
    var partsSchema = $_32l4p2x1jcfx5h1y.strictObjOf('parts', $_91ik4uw8jcfx5gxn.flatten([
      $_91ik4uw8jcfx5gxn.map(partNames, $_32l4p2x1jcfx5h1y.strict),
      $_91ik4uw8jcfx5gxn.map(optPartNames, function (optPart) {
        return $_32l4p2x1jcfx5h1y.defaulted(optPart, $_efm6oj10kjcfx5hpm.single(false, function () {
          throw new Error('The optional part: ' + optPart + ' was not specified in the config, but it was used in components');
        }));
      })
    ]));
    var partUidsSchema = $_32l4p2x1jcfx5h1y.state('partUids', function (spec) {
      if (!$_42faa8x5jcfx5h3h.hasKey(spec, 'parts')) {
        throw new Error('Part uid definition for owner: ' + owner + ' requires "parts"\nExpected parts: ' + partNames.join(', ') + '\nSpec: ' + $_euz44nxejcfx5h51.stringify(spec, null, 2));
      }
      var uids = $_929ptpwzjcfx5h1b.map(spec.parts, function (v, k) {
        return $_42faa8x5jcfx5h3h.readOptFrom(v, 'uid').getOrThunk(function () {
          return spec.uid + '-' + k;
        });
      });
      return uids;
    });
    return [
      partsSchema,
      partUidsSchema
    ];
  };
  var base$1 = function (label, partSchemas, partUidsSchemas, spec) {
    var ps = partSchemas.length > 0 ? [$_32l4p2x1jcfx5h1y.strictObjOf('parts', partSchemas)] : [];
    return ps.concat([
      $_32l4p2x1jcfx5h1y.strict('uid'),
      $_32l4p2x1jcfx5h1y.defaulted('dom', {}),
      $_32l4p2x1jcfx5h1y.defaulted('components', []),
      $_7spjsaysjcfx5hd5.snapshot('originalSpec'),
      $_32l4p2x1jcfx5h1y.defaulted('debug.sketcher', {})
    ]).concat(partUidsSchemas);
  };
  var asRawOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, spec, partUidsSchemas);
    return $_fj9y9nxgjcfx5h5a.asRawOrDie(label + ' [SpecSchema]', $_fj9y9nxgjcfx5h5a.objOfOnly(baseS.concat(schema)), spec);
  };
  var asStructOrDie$1 = function (label, schema, spec, partSchemas, partUidsSchemas) {
    var baseS = base$1(label, partSchemas, partUidsSchemas, spec);
    return $_fj9y9nxgjcfx5h5a.asStructOrDie(label + ' [SpecSchema]', $_fj9y9nxgjcfx5h5a.objOfOnly(baseS.concat(schema)), spec);
  };
  var extend = function (builder, original, nu) {
    var newSpec = $_cvmq7wxjcfx5h15.deepMerge(original, nu);
    return builder(newSpec);
  };
  var addBehaviours = function (original, behaviours) {
    return $_cvmq7wxjcfx5h15.deepMerge(original, behaviours);
  };
  var $_5eonui10njcfx5hr1 = {
    asRawOrDie: asRawOrDie$1,
    asStructOrDie: asStructOrDie$1,
    addBehaviours: addBehaviours,
    getPartsSchema: getPartsSchema,
    extend: extend
  };

  var single$1 = function (owner, schema, factory, spec) {
    var specWithUid = supplyUid(spec);
    var detail = $_5eonui10njcfx5hr1.asStructOrDie(owner, schema, specWithUid, [], []);
    return $_cvmq7wxjcfx5h15.deepMerge(factory(detail, specWithUid), { 'debug.sketcher': $_42faa8x5jcfx5h3h.wrap(owner, spec) });
  };
  var composite$1 = function (owner, schema, partTypes, factory, spec) {
    var specWithUid = supplyUid(spec);
    var partSchemas = $_8uasnh10hjcfx5hob.schemas(partTypes);
    var partUidsSchema = $_8uasnh10hjcfx5hob.defaultUidsSchema(partTypes);
    var detail = $_5eonui10njcfx5hr1.asStructOrDie(owner, schema, specWithUid, partSchemas, [partUidsSchema]);
    var subs = $_8uasnh10hjcfx5hob.substitutes(owner, detail, partTypes);
    var components = $_8uasnh10hjcfx5hob.components(owner, detail, subs.internals());
    return $_cvmq7wxjcfx5h15.deepMerge(factory(detail, components, specWithUid, subs.externals()), { 'debug.sketcher': $_42faa8x5jcfx5h3h.wrap(owner, spec) });
  };
  var supplyUid = function (spec) {
    return $_cvmq7wxjcfx5h15.deepMerge({ uid: $_ftkrhf10ljcfx5hqd.generate('uid') }, spec);
  };
  var $_3vuege10gjcfx5ho2 = {
    supplyUid: supplyUid,
    single: single$1,
    composite: composite$1
  };

  var singleSchema = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strict('name'),
    $_32l4p2x1jcfx5h1y.strict('factory'),
    $_32l4p2x1jcfx5h1y.strict('configFields'),
    $_32l4p2x1jcfx5h1y.defaulted('apis', {}),
    $_32l4p2x1jcfx5h1y.defaulted('extraApis', {})
  ]);
  var compositeSchema = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strict('name'),
    $_32l4p2x1jcfx5h1y.strict('factory'),
    $_32l4p2x1jcfx5h1y.strict('configFields'),
    $_32l4p2x1jcfx5h1y.strict('partFields'),
    $_32l4p2x1jcfx5h1y.defaulted('apis', {}),
    $_32l4p2x1jcfx5h1y.defaulted('extraApis', {})
  ]);
  var single = function (rawConfig) {
    var config = $_fj9y9nxgjcfx5h5a.asRawOrDie('Sketcher for ' + rawConfig.name, singleSchema, rawConfig);
    var sketch = function (spec) {
      return $_3vuege10gjcfx5ho2.single(config.name, config.configFields, config.factory, spec);
    };
    var apis = $_929ptpwzjcfx5h1b.map(config.apis, $_9s15br10ejcfx5hnm.makeApi);
    var extraApis = $_929ptpwzjcfx5h1b.map(config.extraApis, function (f, k) {
      return $_7ahhasxijcfx5h5l.markAsExtraApi(f, k);
    });
    return $_cvmq7wxjcfx5h15.deepMerge({
      name: $_30v3piwajcfx5gy5.constant(config.name),
      partFields: $_30v3piwajcfx5gy5.constant([]),
      configFields: $_30v3piwajcfx5gy5.constant(config.configFields),
      sketch: sketch
    }, apis, extraApis);
  };
  var composite = function (rawConfig) {
    var config = $_fj9y9nxgjcfx5h5a.asRawOrDie('Sketcher for ' + rawConfig.name, compositeSchema, rawConfig);
    var sketch = function (spec) {
      return $_3vuege10gjcfx5ho2.composite(config.name, config.configFields, config.partFields, config.factory, spec);
    };
    var parts = $_8uasnh10hjcfx5hob.generate(config.name, config.partFields);
    var apis = $_929ptpwzjcfx5h1b.map(config.apis, $_9s15br10ejcfx5hnm.makeApi);
    var extraApis = $_929ptpwzjcfx5h1b.map(config.extraApis, function (f, k) {
      return $_7ahhasxijcfx5h5l.markAsExtraApi(f, k);
    });
    return $_cvmq7wxjcfx5h15.deepMerge({
      name: $_30v3piwajcfx5gy5.constant(config.name),
      partFields: $_30v3piwajcfx5gy5.constant(config.partFields),
      configFields: $_30v3piwajcfx5gy5.constant(config.configFields),
      sketch: sketch,
      parts: $_30v3piwajcfx5gy5.constant(parts)
    }, apis, extraApis);
  };
  var $_3wo7ba10djcfx5hna = {
    single: single,
    composite: composite
  };

  var events$4 = function (optAction) {
    var executeHandler = function (action) {
      return $_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.execute(), function (component, simulatedEvent) {
        action(component);
        simulatedEvent.stop();
      });
    };
    var onClick = function (component, simulatedEvent) {
      simulatedEvent.stop();
      $_7pg78vwujcfx5h0i.emitExecute(component);
    };
    var onMousedown = function (component, simulatedEvent) {
      simulatedEvent.cut();
    };
    var pointerEvents = $_f916s2wfjcfx5gyj.detect().deviceType.isTouch() ? [$_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.tap(), onClick)] : [
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.click(), onClick),
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mousedown(), onMousedown)
    ];
    return $_286fidw5jcfx5gwv.derive($_91ik4uw8jcfx5gxn.flatten([
      optAction.map(executeHandler).toArray(),
      pointerEvents
    ]));
  };
  var $_brobte10ojcfx5hrw = { events: events$4 };

  var factory = function (detail, spec) {
    var events = $_brobte10ojcfx5hrw.events(detail.action());
    var optType = $_42faa8x5jcfx5h3h.readOptFrom(detail.dom(), 'attributes').bind($_42faa8x5jcfx5h3h.readOpt('type'));
    var optTag = $_42faa8x5jcfx5h3h.readOptFrom(detail.dom(), 'tag');
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: detail.components(),
      events: events,
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
        Focusing.config({}),
        Keying.config({
          mode: 'execution',
          useSpace: true,
          useEnter: true
        })
      ]), $_ijaov10cjcfx5hn2.get(detail.buttonBehaviours())),
      domModification: {
        attributes: $_cvmq7wxjcfx5h15.deepMerge(optType.fold(function () {
          return optTag.is('button') ? { type: 'button' } : {};
        }, function (t) {
          return {};
        }), { role: detail.role().getOr('button') })
      },
      eventOrder: detail.eventOrder()
    };
  };
  var Button = $_3wo7ba10djcfx5hna.single({
    name: 'Button',
    factory: factory,
    configFields: [
      $_32l4p2x1jcfx5h1y.defaulted('uid', undefined),
      $_32l4p2x1jcfx5h1y.strict('dom'),
      $_32l4p2x1jcfx5h1y.defaulted('components', []),
      $_ijaov10cjcfx5hn2.field('buttonBehaviours', [
        Focusing,
        Keying
      ]),
      $_32l4p2x1jcfx5h1y.option('action'),
      $_32l4p2x1jcfx5h1y.option('role'),
      $_32l4p2x1jcfx5h1y.defaulted('eventOrder', {})
    ]
  });

  var getAttrs = function (elem) {
    var attributes = elem.dom().attributes !== undefined ? elem.dom().attributes : [];
    return $_91ik4uw8jcfx5gxn.foldl(attributes, function (b, attr) {
      if (attr.name === 'class')
        return b;
      else
        return $_cvmq7wxjcfx5h15.deepMerge(b, $_42faa8x5jcfx5h3h.wrap(attr.name, attr.value));
    }, {});
  };
  var getClasses = function (elem) {
    return Array.prototype.slice.call(elem.dom().classList, 0);
  };
  var fromHtml$2 = function (html) {
    var elem = $_6k7v3dwsjcfx5h08.fromHtml(html);
    var children = $_bke8thy2jcfx5h9w.children(elem);
    var attrs = getAttrs(elem);
    var classes = getClasses(elem);
    var contents = children.length === 0 ? {} : { innerHtml: $_1fdcs6yajcfx5hb6.get(elem) };
    return $_cvmq7wxjcfx5h15.deepMerge({
      tag: $_3wpq1xxwjcfx5h87.name(elem),
      classes: classes,
      attributes: attrs
    }, contents);
  };
  var sketch = function (sketcher, html, config) {
    return sketcher.sketch($_cvmq7wxjcfx5h15.deepMerge({ dom: fromHtml$2(html) }, config));
  };
  var $_vitqq10qjcfx5hsc = {
    fromHtml: fromHtml$2,
    sketch: sketch
  };

  var dom$1 = function (rawHtml) {
    var html = $_epbu6vwojcfx5gzq.supplant(rawHtml, { prefix: $_46bmn4z0jcfx5hew.prefix() });
    return $_vitqq10qjcfx5hsc.fromHtml(html);
  };
  var spec = function (rawHtml) {
    var sDom = dom$1(rawHtml);
    return { dom: sDom };
  };
  var $_copwu110pjcfx5hs6 = {
    dom: dom$1,
    spec: spec
  };

  var forToolbarCommand = function (editor, command) {
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, {});
  };
  var getToggleBehaviours = function (command) {
    return $_7uu47fw3jcfx5gvw.derive([
      Toggling.config({
        toggleClass: $_46bmn4z0jcfx5hew.resolve('toolbar-button-selected'),
        toggleOnExecute: false,
        aria: { mode: 'pressed' }
      }),
      $_a2zkb1yzjcfx5her.format(command, function (button, status) {
        var toggle = status ? Toggling.on : Toggling.off;
        toggle(button);
      })
    ]);
  };
  var forToolbarStateCommand = function (editor, command) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(command, function () {
      editor.execCommand(command);
    }, extraBehaviours);
  };
  var forToolbarStateAction = function (editor, clazz, command, action) {
    var extraBehaviours = getToggleBehaviours(command);
    return forToolbar(clazz, action, extraBehaviours);
  };
  var forToolbar = function (clazz, action, extraBehaviours) {
    return Button.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-' + clazz + ' ${prefix}-icon"></span>'),
      action: action,
      buttonBehaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([Unselecting.config({})]), extraBehaviours)
    });
  };
  var $_gg259uz1jcfx5hf0 = {
    forToolbar: forToolbar,
    forToolbarCommand: forToolbarCommand,
    forToolbarStateAction: forToolbarStateAction,
    forToolbarStateCommand: forToolbarStateCommand
  };

  var reduceBy = function (value, min, max, step) {
    if (value < min)
      return value;
    else if (value > max)
      return max;
    else if (value === min)
      return min - 1;
    else
      return Math.max(min, value - step);
  };
  var increaseBy = function (value, min, max, step) {
    if (value > max)
      return value;
    else if (value < min)
      return min;
    else if (value === max)
      return max + 1;
    else
      return Math.min(max, value + step);
  };
  var capValue = function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  };
  var snapValueOfX = function (bounds, value, min, max, step, snapStart) {
    return snapStart.fold(function () {
      var initValue = value - min;
      var extraValue = Math.round(initValue / step) * step;
      return capValue(min + extraValue, min - 1, max + 1);
    }, function (start) {
      var remainder = (value - start) % step;
      var adjustment = Math.round(remainder / step);
      var rawSteps = Math.floor((value - start) / step);
      var maxSteps = Math.floor((max - start) / step);
      var numSteps = Math.min(maxSteps, rawSteps + adjustment);
      var r = start + numSteps * step;
      return Math.max(start, r);
    });
  };
  var findValueOfX = function (bounds, min, max, xValue, step, snapToGrid, snapStart) {
    var range = max - min;
    if (xValue < bounds.left)
      return min - 1;
    else if (xValue > bounds.right)
      return max + 1;
    else {
      var xOffset = Math.min(bounds.right, Math.max(xValue, bounds.left)) - bounds.left;
      var newValue = capValue(xOffset / bounds.width * range + min, min - 1, max + 1);
      var roundedValue = Math.round(newValue);
      return snapToGrid && newValue >= min && newValue <= max ? snapValueOfX(bounds, newValue, min, max, step, snapStart) : roundedValue;
    }
  };
  var $_fjbkzw10vjcfx5htm = {
    reduceBy: reduceBy,
    increaseBy: increaseBy,
    findValueOfX: findValueOfX
  };

  var changeEvent = 'slider.change.value';
  var isTouch$1 = $_f916s2wfjcfx5gyj.detect().deviceType.isTouch();
  var getEventSource = function (simulatedEvent) {
    var evt = simulatedEvent.event().raw();
    if (isTouch$1 && evt.touches !== undefined && evt.touches.length === 1)
      return $_8i7mfvw9jcfx5gxw.some(evt.touches[0]);
    else if (isTouch$1 && evt.touches !== undefined)
      return $_8i7mfvw9jcfx5gxw.none();
    else if (!isTouch$1 && evt.clientX !== undefined)
      return $_8i7mfvw9jcfx5gxw.some(evt);
    else
      return $_8i7mfvw9jcfx5gxw.none();
  };
  var getEventX = function (simulatedEvent) {
    var spot = getEventSource(simulatedEvent);
    return spot.map(function (s) {
      return s.clientX;
    });
  };
  var fireChange = function (component, value) {
    $_7pg78vwujcfx5h0i.emitWith(component, changeEvent, { value: value });
  };
  var moveRightFromLedge = function (ledge, detail) {
    fireChange(ledge, detail.min());
  };
  var moveLeftFromRedge = function (redge, detail) {
    fireChange(redge, detail.max());
  };
  var setToRedge = function (redge, detail) {
    fireChange(redge, detail.max() + 1);
  };
  var setToLedge = function (ledge, detail) {
    fireChange(ledge, detail.min() - 1);
  };
  var setToX = function (spectrum, spectrumBounds, detail, xValue) {
    var value = $_fjbkzw10vjcfx5htm.findValueOfX(spectrumBounds, detail.min(), detail.max(), xValue, detail.stepSize(), detail.snapToGrid(), detail.snapStart());
    fireChange(spectrum, value);
  };
  var setXFromEvent = function (spectrum, detail, spectrumBounds, simulatedEvent) {
    return getEventX(simulatedEvent).map(function (xValue) {
      setToX(spectrum, spectrumBounds, detail, xValue);
      return xValue;
    });
  };
  var moveLeft$4 = function (spectrum, detail) {
    var newValue = $_fjbkzw10vjcfx5htm.reduceBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var moveRight$4 = function (spectrum, detail) {
    var newValue = $_fjbkzw10vjcfx5htm.increaseBy(detail.value().get(), detail.min(), detail.max(), detail.stepSize());
    fireChange(spectrum, newValue);
  };
  var $_fro4u010ujcfx5htf = {
    setXFromEvent: setXFromEvent,
    setToLedge: setToLedge,
    setToRedge: setToRedge,
    moveLeftFromRedge: moveLeftFromRedge,
    moveRightFromLedge: moveRightFromLedge,
    moveLeft: moveLeft$4,
    moveRight: moveRight$4,
    changeEvent: $_30v3piwajcfx5gy5.constant(changeEvent)
  };

  var platform = $_f916s2wfjcfx5gyj.detect();
  var isTouch = platform.deviceType.isTouch();
  var edgePart = function (name, action) {
    return $_9leb2110jjcfx5hp6.optional({
      name: '' + name + '-edge',
      overrides: function (detail) {
        var touchEvents = $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.runActionExtra($_7eoluuwwjcfx5h0z.touchstart(), action, [detail])]);
        var mouseEvents = $_286fidw5jcfx5gwv.derive([
          $_286fidw5jcfx5gwv.runActionExtra($_7eoluuwwjcfx5h0z.mousedown(), action, [detail]),
          $_286fidw5jcfx5gwv.runActionExtra($_7eoluuwwjcfx5h0z.mousemove(), function (l, det) {
            if (det.mouseIsDown().get())
              action(l, det);
          }, [detail])
        ]);
        return { events: isTouch ? touchEvents : mouseEvents };
      }
    });
  };
  var ledgePart = edgePart('left', $_fro4u010ujcfx5htf.setToLedge);
  var redgePart = edgePart('right', $_fro4u010ujcfx5htf.setToRedge);
  var thumbPart = $_9leb2110jjcfx5hp6.required({
    name: 'thumb',
    defaults: $_30v3piwajcfx5gy5.constant({ dom: { styles: { position: 'absolute' } } }),
    overrides: function (detail) {
      return {
        events: $_286fidw5jcfx5gwv.derive([
          $_286fidw5jcfx5gwv.redirectToPart($_7eoluuwwjcfx5h0z.touchstart(), detail, 'spectrum'),
          $_286fidw5jcfx5gwv.redirectToPart($_7eoluuwwjcfx5h0z.touchmove(), detail, 'spectrum'),
          $_286fidw5jcfx5gwv.redirectToPart($_7eoluuwwjcfx5h0z.touchend(), detail, 'spectrum')
        ])
      };
    }
  });
  var spectrumPart = $_9leb2110jjcfx5hp6.required({
    schema: [$_32l4p2x1jcfx5h1y.state('mouseIsDown', function () {
        return Cell(false);
      })],
    name: 'spectrum',
    overrides: function (detail) {
      var moveToX = function (spectrum, simulatedEvent) {
        var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
        $_fro4u010ujcfx5htf.setXFromEvent(spectrum, detail, spectrumBounds, simulatedEvent);
      };
      var touchEvents = $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchstart(), moveToX),
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchmove(), moveToX)
      ]);
      var mouseEvents = $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mousedown(), moveToX),
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mousemove(), function (spectrum, se) {
          if (detail.mouseIsDown().get())
            moveToX(spectrum, se);
        })
      ]);
      return {
        behaviours: $_7uu47fw3jcfx5gvw.derive(isTouch ? [] : [
          Keying.config({
            mode: 'special',
            onLeft: function (spectrum) {
              $_fro4u010ujcfx5htf.moveLeft(spectrum, detail);
              return $_8i7mfvw9jcfx5gxw.some(true);
            },
            onRight: function (spectrum) {
              $_fro4u010ujcfx5htf.moveRight(spectrum, detail);
              return $_8i7mfvw9jcfx5gxw.some(true);
            }
          }),
          Focusing.config({})
        ]),
        events: isTouch ? touchEvents : mouseEvents
      };
    }
  });
  var SliderParts = [
    ledgePart,
    redgePart,
    thumbPart,
    spectrumPart
  ];

  var onLoad$1 = function (component, repConfig, repState) {
    repConfig.store().manager().onLoad(component, repConfig, repState);
  };
  var onUnload = function (component, repConfig, repState) {
    repConfig.store().manager().onUnload(component, repConfig, repState);
  };
  var setValue = function (component, repConfig, repState, data) {
    repConfig.store().manager().setValue(component, repConfig, repState, data);
  };
  var getValue = function (component, repConfig, repState) {
    return repConfig.store().manager().getValue(component, repConfig, repState);
  };
  var $_bqtd1g10zjcfx5hu7 = {
    onLoad: onLoad$1,
    onUnload: onUnload,
    setValue: setValue,
    getValue: getValue
  };

  var events$5 = function (repConfig, repState) {
    var es = repConfig.resetOnDom() ? [
      $_286fidw5jcfx5gwv.runOnAttached(function (comp, se) {
        $_bqtd1g10zjcfx5hu7.onLoad(comp, repConfig, repState);
      }),
      $_286fidw5jcfx5gwv.runOnDetached(function (comp, se) {
        $_bqtd1g10zjcfx5hu7.onUnload(comp, repConfig, repState);
      })
    ] : [$_9dgavgw4jcfx5gwc.loadEvent(repConfig, repState, $_bqtd1g10zjcfx5hu7.onLoad)];
    return $_286fidw5jcfx5gwv.derive(es);
  };
  var $_2nnf0z10yjcfx5hu4 = { events: events$5 };

  var memory = function () {
    var data = Cell(null);
    var readState = function () {
      return {
        mode: 'memory',
        value: data.get()
      };
    };
    var isNotSet = function () {
      return data.get() === null;
    };
    var clear = function () {
      data.set(null);
    };
    return BehaviourState({
      set: data.set,
      get: data.get,
      isNotSet: isNotSet,
      clear: clear,
      readState: readState
    });
  };
  var manual = function () {
    var readState = function () {
    };
    return BehaviourState({ readState: readState });
  };
  var dataset = function () {
    var data = Cell({});
    var readState = function () {
      return {
        mode: 'dataset',
        dataset: data.get()
      };
    };
    return BehaviourState({
      readState: readState,
      set: data.set,
      get: data.get
    });
  };
  var init$2 = function (spec) {
    return spec.store().manager().state(spec);
  };
  var $_fjtkgz112jcfx5hut = {
    memory: memory,
    dataset: dataset,
    manual: manual,
    init: init$2
  };

  var setValue$1 = function (component, repConfig, repState, data) {
    var dataKey = repConfig.store().getDataKey();
    repState.set({});
    repConfig.store().setData()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$1 = function (component, repConfig, repState) {
    var key = repConfig.store().getDataKey()(component);
    var dataset = repState.get();
    return $_42faa8x5jcfx5h3h.readOptFrom(dataset, key).fold(function () {
      return repConfig.store().getFallbackEntry()(key);
    }, function (data) {
      return data;
    });
  };
  var onLoad$2 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      setValue$1(component, repConfig, repState, data);
    });
  };
  var onUnload$1 = function (component, repConfig, repState) {
    repState.set({});
  };
  var DatasetStore = [
    $_32l4p2x1jcfx5h1y.option('initialValue'),
    $_32l4p2x1jcfx5h1y.strict('getFallbackEntry'),
    $_32l4p2x1jcfx5h1y.strict('getDataKey'),
    $_32l4p2x1jcfx5h1y.strict('setData'),
    $_7spjsaysjcfx5hd5.output('manager', {
      setValue: setValue$1,
      getValue: getValue$1,
      onLoad: onLoad$2,
      onUnload: onUnload$1,
      state: $_fjtkgz112jcfx5hut.dataset
    })
  ];

  var getValue$2 = function (component, repConfig, repState) {
    return repConfig.store().getValue()(component);
  };
  var setValue$2 = function (component, repConfig, repState, data) {
    repConfig.store().setValue()(component, data);
    repConfig.onSetValue()(component, data);
  };
  var onLoad$3 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (data) {
      repConfig.store().setValue()(component, data);
    });
  };
  var ManualStore = [
    $_32l4p2x1jcfx5h1y.strict('getValue'),
    $_32l4p2x1jcfx5h1y.defaulted('setValue', $_30v3piwajcfx5gy5.noop),
    $_32l4p2x1jcfx5h1y.option('initialValue'),
    $_7spjsaysjcfx5hd5.output('manager', {
      setValue: setValue$2,
      getValue: getValue$2,
      onLoad: onLoad$3,
      onUnload: $_30v3piwajcfx5gy5.noop,
      state: $_g8b8q6xpjcfx5h6o.init
    })
  ];

  var setValue$3 = function (component, repConfig, repState, data) {
    repState.set(data);
    repConfig.onSetValue()(component, data);
  };
  var getValue$3 = function (component, repConfig, repState) {
    return repState.get();
  };
  var onLoad$4 = function (component, repConfig, repState) {
    repConfig.store().initialValue().each(function (initVal) {
      if (repState.isNotSet())
        repState.set(initVal);
    });
  };
  var onUnload$2 = function (component, repConfig, repState) {
    repState.clear();
  };
  var MemoryStore = [
    $_32l4p2x1jcfx5h1y.option('initialValue'),
    $_7spjsaysjcfx5hd5.output('manager', {
      setValue: setValue$3,
      getValue: getValue$3,
      onLoad: onLoad$4,
      onUnload: onUnload$2,
      state: $_fjtkgz112jcfx5hut.memory
    })
  ];

  var RepresentSchema = [
    $_32l4p2x1jcfx5h1y.defaultedOf('store', { mode: 'memory' }, $_fj9y9nxgjcfx5h5a.choose('mode', {
      memory: MemoryStore,
      manual: ManualStore,
      dataset: DatasetStore
    })),
    $_7spjsaysjcfx5hd5.onHandler('onSetValue'),
    $_32l4p2x1jcfx5h1y.defaulted('resetOnDom', false)
  ];

  var me = $_7uu47fw3jcfx5gvw.create({
    fields: RepresentSchema,
    name: 'representing',
    active: $_2nnf0z10yjcfx5hu4,
    apis: $_bqtd1g10zjcfx5hu7,
    extra: {
      setValueFrom: function (component, source) {
        var value = me.getValue(source);
        me.setValue(component, value);
      }
    },
    state: $_fjtkgz112jcfx5hut
  });

  var isTouch$2 = $_f916s2wfjcfx5gyj.detect().deviceType.isTouch();
  var SliderSchema = [
    $_32l4p2x1jcfx5h1y.strict('min'),
    $_32l4p2x1jcfx5h1y.strict('max'),
    $_32l4p2x1jcfx5h1y.defaulted('stepSize', 1),
    $_32l4p2x1jcfx5h1y.defaulted('onChange', $_30v3piwajcfx5gy5.noop),
    $_32l4p2x1jcfx5h1y.defaulted('onInit', $_30v3piwajcfx5gy5.noop),
    $_32l4p2x1jcfx5h1y.defaulted('onDragStart', $_30v3piwajcfx5gy5.noop),
    $_32l4p2x1jcfx5h1y.defaulted('onDragEnd', $_30v3piwajcfx5gy5.noop),
    $_32l4p2x1jcfx5h1y.defaulted('snapToGrid', false),
    $_32l4p2x1jcfx5h1y.option('snapStart'),
    $_32l4p2x1jcfx5h1y.strict('getInitialValue'),
    $_ijaov10cjcfx5hn2.field('sliderBehaviours', [
      Keying,
      me
    ]),
    $_32l4p2x1jcfx5h1y.state('value', function (spec) {
      return Cell(spec.min);
    })
  ].concat(!isTouch$2 ? [$_32l4p2x1jcfx5h1y.state('mouseIsDown', function () {
      return Cell(false);
    })] : []);

  var api$1 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$1.set(element, h);
  };
  var get$6 = function (element) {
    return api$1.get(element);
  };
  var getOuter$2 = function (element) {
    return api$1.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_3wulrizrjcfx5him.set(element, 'max-width', absMax + 'px');
  };
  var $_c2pn1d116jcfx5hwb = {
    set: set$4,
    get: get$6,
    getOuter: getOuter$2,
    setMax: setMax$1
  };

  var isTouch$3 = $_f916s2wfjcfx5gyj.detect().deviceType.isTouch();
  var sketch$2 = function (detail, components, spec, externals) {
    var range = detail.max() - detail.min();
    var getXCentre = function (component) {
      var rect = component.element().dom().getBoundingClientRect();
      return (rect.left + rect.right) / 2;
    };
    var getThumb = function (component) {
      return $_8uasnh10hjcfx5hob.getPartOrDie(component, detail, 'thumb');
    };
    var getXOffset = function (slider, spectrumBounds, detail) {
      var v = detail.value().get();
      if (v < detail.min()) {
        return $_8uasnh10hjcfx5hob.getPart(slider, detail, 'left-edge').fold(function () {
          return 0;
        }, function (ledge) {
          return getXCentre(ledge) - spectrumBounds.left;
        });
      } else if (v > detail.max()) {
        return $_8uasnh10hjcfx5hob.getPart(slider, detail, 'right-edge').fold(function () {
          return spectrumBounds.width;
        }, function (redge) {
          return getXCentre(redge) - spectrumBounds.left;
        });
      } else {
        return (detail.value().get() - detail.min()) / range * spectrumBounds.width;
      }
    };
    var getXPos = function (slider) {
      var spectrum = $_8uasnh10hjcfx5hob.getPartOrDie(slider, detail, 'spectrum');
      var spectrumBounds = spectrum.element().dom().getBoundingClientRect();
      var sliderBounds = slider.element().dom().getBoundingClientRect();
      var xOffset = getXOffset(slider, spectrumBounds, detail);
      return spectrumBounds.left - sliderBounds.left + xOffset;
    };
    var refresh = function (component) {
      var pos = getXPos(component);
      var thumb = getThumb(component);
      var thumbRadius = $_c2pn1d116jcfx5hwb.get(thumb.element()) / 2;
      $_3wulrizrjcfx5him.set(thumb.element(), 'left', pos - thumbRadius + 'px');
    };
    var changeValue = function (component, newValue) {
      var oldValue = detail.value().get();
      var thumb = getThumb(component);
      if (oldValue !== newValue || $_3wulrizrjcfx5him.getRaw(thumb.element(), 'left').isNone()) {
        detail.value().set(newValue);
        refresh(component);
        detail.onChange()(component, thumb, newValue);
        return $_8i7mfvw9jcfx5gxw.some(true);
      } else {
        return $_8i7mfvw9jcfx5gxw.none();
      }
    };
    var resetToMin = function (slider) {
      changeValue(slider, detail.min());
    };
    var resetToMax = function (slider) {
      changeValue(slider, detail.max());
    };
    var uiEventsArr = isTouch$3 ? [
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchstart(), function (slider, simulatedEvent) {
        detail.onDragStart()(slider, getThumb(slider));
      }),
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchend(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
      })
    ] : [
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mousedown(), function (slider, simulatedEvent) {
        simulatedEvent.stop();
        detail.onDragStart()(slider, getThumb(slider));
        detail.mouseIsDown().set(true);
      }),
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mouseup(), function (slider, simulatedEvent) {
        detail.onDragEnd()(slider, getThumb(slider));
        detail.mouseIsDown().set(false);
      })
    ];
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive($_91ik4uw8jcfx5gxn.flatten([
        !isTouch$3 ? [Keying.config({
            mode: 'special',
            focusIn: function (slider) {
              return $_8uasnh10hjcfx5hob.getPart(slider, detail, 'spectrum').map(Keying.focusIn).map($_30v3piwajcfx5gy5.constant(true));
            }
          })] : [],
        [me.config({
            store: {
              mode: 'manual',
              getValue: function (_) {
                return detail.value().get();
              }
            }
          })]
      ])), $_ijaov10cjcfx5hn2.get(detail.sliderBehaviours())),
      events: $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.run($_fro4u010ujcfx5htf.changeEvent(), function (slider, simulatedEvent) {
          changeValue(slider, simulatedEvent.event().value());
        }),
        $_286fidw5jcfx5gwv.runOnAttached(function (slider, simulatedEvent) {
          detail.value().set(detail.getInitialValue()());
          var thumb = getThumb(slider);
          refresh(slider);
          detail.onInit()(slider, thumb, detail.value().get());
        })
      ].concat(uiEventsArr)),
      apis: {
        resetToMin: resetToMin,
        resetToMax: resetToMax,
        refresh: refresh
      },
      domModification: { styles: { position: 'relative' } }
    };
  };
  var $_6qkwf7115jcfx5hvi = { sketch: sketch$2 };

  var Slider = $_3wo7ba10djcfx5hna.composite({
    name: 'Slider',
    configFields: SliderSchema,
    partFields: SliderParts,
    factory: $_6qkwf7115jcfx5hvi.sketch,
    apis: {
      resetToMin: function (apis, slider) {
        apis.resetToMin(slider);
      },
      resetToMax: function (apis, slider) {
        apis.resetToMax(slider);
      },
      refresh: function (apis, slider) {
        apis.refresh(slider);
      }
    }
  });

  var button = function (realm, clazz, makeItems) {
    return $_gg259uz1jcfx5hf0.forToolbar(clazz, function () {
      var items = makeItems();
      realm.setContextToolbar([{
          label: clazz + ' group',
          items: items
        }]);
    }, {});
  };
  var $_4diro8117jcfx5hwe = { button: button };

  var BLACK = -1;
  var makeSlider = function (spec) {
    var getColor = function (hue) {
      if (hue < 0) {
        return 'black';
      } else if (hue > 360) {
        return 'white';
      } else {
        return 'hsl(' + hue + ', 100%, 50%)';
      }
    };
    var onInit = function (slider, thumb, value) {
      var color = getColor(value);
      $_3wulrizrjcfx5him.set(thumb.element(), 'background-color', color);
    };
    var onChange = function (slider, thumb, value) {
      var color = getColor(value);
      $_3wulrizrjcfx5him.set(thumb.element(), 'background-color', color);
      spec.onChange(slider, thumb, color);
    };
    return Slider.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-slider ${prefix}-hue-slider-container"></div>'),
      components: [
        Slider.parts()['left-edge']($_copwu110pjcfx5hs6.spec('<div class="${prefix}-hue-slider-black"></div>')),
        Slider.parts().spectrum({
          dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-slider-gradient-container"></div>'),
          components: [$_copwu110pjcfx5hs6.spec('<div class="${prefix}-slider-gradient"></div>')],
          behaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({ toggleClass: $_46bmn4z0jcfx5hew.resolve('thumb-active') })])
        }),
        Slider.parts()['right-edge']($_copwu110pjcfx5hs6.spec('<div class="${prefix}-hue-slider-white"></div>')),
        Slider.parts().thumb({
          dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({ toggleClass: $_46bmn4z0jcfx5hew.resolve('thumb-active') })])
        })
      ],
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      onInit: onInit,
      stepSize: 10,
      min: 0,
      max: 360,
      getInitialValue: spec.getInitialValue,
      sliderBehaviours: $_7uu47fw3jcfx5gvw.derive([$_a2zkb1yzjcfx5her.orientation(Slider.refresh)])
    });
  };
  var makeItems = function (spec) {
    return [makeSlider(spec)];
  };
  var sketch$1 = function (realm, editor) {
    var spec = {
      onChange: function (slider, thumb, color) {
        editor.undoManager.transact(function () {
          editor.formatter.apply('forecolor', { value: color });
          editor.nodeChanged();
        });
      },
      getInitialValue: function () {
        return BLACK;
      }
    };
    return $_4diro8117jcfx5hwe.button(realm, 'color', function () {
      return makeItems(spec);
    });
  };
  var $_5gpylg10rjcfx5hsu = {
    makeItems: makeItems,
    sketch: sketch$1
  };

  var schema$7 = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strict('getInitialValue'),
    $_32l4p2x1jcfx5h1y.strict('onChange'),
    $_32l4p2x1jcfx5h1y.strict('category'),
    $_32l4p2x1jcfx5h1y.strict('sizes')
  ]);
  var sketch$4 = function (rawSpec) {
    var spec = $_fj9y9nxgjcfx5h5a.asRawOrDie('SizeSlider', schema$7, rawSpec);
    var isValidValue = function (valueIndex) {
      return valueIndex >= 0 && valueIndex < spec.sizes.length;
    };
    var onChange = function (slider, thumb, valueIndex) {
      if (isValidValue(valueIndex)) {
        spec.onChange(valueIndex);
      }
    };
    return Slider.sketch({
      dom: {
        tag: 'div',
        classes: [
          $_46bmn4z0jcfx5hew.resolve('slider-' + spec.category + '-size-container'),
          $_46bmn4z0jcfx5hew.resolve('slider'),
          $_46bmn4z0jcfx5hew.resolve('slider-size-container')
        ]
      },
      onChange: onChange,
      onDragStart: function (slider, thumb) {
        Toggling.on(thumb);
      },
      onDragEnd: function (slider, thumb) {
        Toggling.off(thumb);
      },
      min: 0,
      max: spec.sizes.length - 1,
      stepSize: 1,
      getInitialValue: spec.getInitialValue,
      snapToGrid: true,
      sliderBehaviours: $_7uu47fw3jcfx5gvw.derive([$_a2zkb1yzjcfx5her.orientation(Slider.refresh)]),
      components: [
        Slider.parts().spectrum({
          dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-slider-size-container"></div>'),
          components: [$_copwu110pjcfx5hs6.spec('<div class="${prefix}-slider-size-line"></div>')]
        }),
        Slider.parts().thumb({
          dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-slider-thumb"></div>'),
          behaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({ toggleClass: $_46bmn4z0jcfx5hew.resolve('thumb-active') })])
        })
      ]
    });
  };
  var $_t8kt4119jcfx5hwj = { sketch: sketch$4 };

  var ancestor$3 = function (scope, transform, isRoot) {
    var element = scope.dom();
    var stop = $_7mrhymwyjcfx5h18.isFunction(isRoot) ? isRoot : $_30v3piwajcfx5gy5.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_6k7v3dwsjcfx5h08.fromDom(element);
      var transformed = transform(el);
      if (transformed.isSome())
        return transformed;
      else if (stop(el))
        break;
    }
    return $_8i7mfvw9jcfx5gxw.none();
  };
  var closest$3 = function (scope, transform, isRoot) {
    var current = transform(scope);
    return current.orThunk(function () {
      return isRoot(scope) ? $_8i7mfvw9jcfx5gxw.none() : ancestor$3(scope, transform, isRoot);
    });
  };
  var $_80vtxh11bjcfx5hxn = {
    ancestor: ancestor$3,
    closest: closest$3
  };

  var candidates = [
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '32px',
    '36px'
  ];
  var defaultSize = 'medium';
  var defaultIndex = 2;
  var indexToSize = function (index) {
    return $_8i7mfvw9jcfx5gxw.from(candidates[index]);
  };
  var sizeToIndex = function (size) {
    return $_91ik4uw8jcfx5gxn.findIndex(candidates, function (v) {
      return v === size;
    });
  };
  var getRawOrComputed = function (isRoot, rawStart) {
    var optStart = $_3wpq1xxwjcfx5h87.isElement(rawStart) ? $_8i7mfvw9jcfx5gxw.some(rawStart) : $_bke8thy2jcfx5h9w.parent(rawStart);
    return optStart.map(function (start) {
      var inline = $_80vtxh11bjcfx5hxn.closest(start, function (elem) {
        return $_3wulrizrjcfx5him.getRaw(elem, 'font-size');
      }, isRoot);
      return inline.getOrThunk(function () {
        return $_3wulrizrjcfx5him.get(start, 'font-size');
      });
    }).getOr('');
  };
  var getSize = function (editor) {
    var node = editor.selection.getStart();
    var elem = $_6k7v3dwsjcfx5h08.fromDom(node);
    var root = $_6k7v3dwsjcfx5h08.fromDom(editor.getBody());
    var isRoot = function (e) {
      return $_7yb5g2w7jcfx5gx7.eq(root, e);
    };
    var elemSize = getRawOrComputed(isRoot, elem);
    return $_91ik4uw8jcfx5gxn.find(candidates, function (size) {
      return elemSize === size;
    }).getOr(defaultSize);
  };
  var applySize = function (editor, value) {
    var currentValue = getSize(editor);
    if (currentValue !== value) {
      editor.execCommand('fontSize', false, value);
    }
  };
  var get$7 = function (editor) {
    var size = getSize(editor);
    return sizeToIndex(size).getOr(defaultIndex);
  };
  var apply$1 = function (editor, index) {
    indexToSize(index).each(function (size) {
      applySize(editor, size);
    });
  };
  var $_tb7j911ajcfx5hww = {
    candidates: $_30v3piwajcfx5gy5.constant(candidates),
    get: get$7,
    apply: apply$1
  };

  var sizes = $_tb7j911ajcfx5hww.candidates();
  var makeSlider$1 = function (spec) {
    return $_t8kt4119jcfx5hwj.sketch({
      onChange: spec.onChange,
      sizes: sizes,
      category: 'font',
      getInitialValue: spec.getInitialValue
    });
  };
  var makeItems$1 = function (spec) {
    return [
      $_copwu110pjcfx5hs6.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-small-font ${prefix}-icon"></span>'),
      makeSlider$1(spec),
      $_copwu110pjcfx5hs6.spec('<span class="${prefix}-toolbar-button ${prefix}-icon-large-font ${prefix}-icon"></span>')
    ];
  };
  var sketch$3 = function (realm, editor) {
    var spec = {
      onChange: function (value) {
        $_tb7j911ajcfx5hww.apply(editor, value);
      },
      getInitialValue: function () {
        return $_tb7j911ajcfx5hww.get(editor);
      }
    };
    return $_4diro8117jcfx5hwe.button(realm, 'font-size', function () {
      return makeItems$1(spec);
    });
  };
  var $_9ntm0d118jcfx5hwg = {
    makeItems: makeItems$1,
    sketch: sketch$3
  };

  var record = function (spec) {
    var uid = $_42faa8x5jcfx5h3h.hasKey(spec, 'uid') ? spec.uid : $_ftkrhf10ljcfx5hqd.generate('memento');
    var get = function (any) {
      return any.getSystem().getByUid(uid).getOrDie();
    };
    var getOpt = function (any) {
      return any.getSystem().getByUid(uid).fold($_8i7mfvw9jcfx5gxw.none, $_8i7mfvw9jcfx5gxw.some);
    };
    var asSpec = function () {
      return $_cvmq7wxjcfx5h15.deepMerge(spec, { uid: uid });
    };
    return {
      get: get,
      getOpt: getOpt,
      asSpec: asSpec
    };
  };
  var $_ewms9y11djcfx5hye = { record: record };

  function create$3(width, height) {
    return resize(document.createElement('canvas'), width, height);
  }
  function clone$2(canvas) {
    var tCanvas, ctx;
    tCanvas = create$3(canvas.width, canvas.height);
    ctx = get2dContext(tCanvas);
    ctx.drawImage(canvas, 0, 0);
    return tCanvas;
  }
  function get2dContext(canvas) {
    return canvas.getContext('2d');
  }
  function get3dContext(canvas) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
    }
    if (!gl) {
      gl = null;
    }
    return gl;
  }
  function resize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
  var $_c7g5in11gjcfx5hzk = {
    create: create$3,
    clone: clone$2,
    resize: resize,
    get2dContext: get2dContext,
    get3dContext: get3dContext
  };

  function getWidth(image) {
    return image.naturalWidth || image.width;
  }
  function getHeight(image) {
    return image.naturalHeight || image.height;
  }
  var $_5fiesg11hjcfx5hzm = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var promise = function () {
    var Promise = function (fn) {
      if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function')
        throw new TypeError('not a function');
      this._state = null;
      this._value = null;
      this._deferreds = [];
      doResolve(fn, bind(resolve, this), bind(reject, this));
    };
    var asap = Promise.immediateFn || typeof setImmediate === 'function' && setImmediate || function (fn) {
      setTimeout(fn, 1);
    };
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }
    var isArray = Array.isArray || function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
    function handle(deferred) {
      var me = this;
      if (this._state === null) {
        this._deferreds.push(deferred);
        return;
      }
      asap(function () {
        var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (me._state ? deferred.resolve : deferred.reject)(me._value);
          return;
        }
        var ret;
        try {
          ret = cb(me._value);
        } catch (e) {
          deferred.reject(e);
          return;
        }
        deferred.resolve(ret);
      });
    }
    function resolve(newValue) {
      try {
        if (newValue === this)
          throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
            doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
            return;
          }
        }
        this._state = true;
        this._value = newValue;
        finale.call(this);
      } catch (e) {
        reject.call(this, e);
      }
    }
    function reject(newValue) {
      this._state = false;
      this._value = newValue;
      finale.call(this);
    }
    function finale() {
      for (var i = 0, len = this._deferreds.length; i < len; i++) {
        handle.call(this, this._deferreds[i]);
      }
      this._deferreds = null;
    }
    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function (value) {
          if (done)
            return;
          done = true;
          onFulfilled(value);
        }, function (reason) {
          if (done)
            return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done)
          return;
        done = true;
        onRejected(ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      var me = this;
      return new Promise(function (resolve, reject) {
        handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };
    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);
      return new Promise(function (resolve, reject) {
        if (args.length === 0)
          return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };
    return Promise;
  };
  var Promise = window.Promise ? window.Promise : promise();

  var Blob = function (parts, properties) {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('Blob');
    return new f(parts, properties);
  };

  var FileReader = function () {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('FileReader');
    return new f();
  };

  var Uint8Array = function (arr) {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('Uint8Array');
    return new f(arr);
  };

  var requestAnimationFrame = function (callback) {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('requestAnimationFrame');
    f(callback);
  };
  var atob = function (base64) {
    var f = $_a98lhfwcjcfx5gyb.getOrDie('atob');
    return f(base64);
  };
  var $_75a0jv11mjcfx5i01 = {
    atob: atob,
    requestAnimationFrame: requestAnimationFrame
  };

  function loadImage(image) {
    return new Promise(function (resolve) {
      function loaded() {
        image.removeEventListener('load', loaded);
        resolve(image);
      }
      if (image.complete) {
        resolve(image);
      } else {
        image.addEventListener('load', loaded);
      }
    });
  }
  function imageToBlob$1(image) {
    return loadImage(image).then(function (image) {
      var src = image.src;
      if (src.indexOf('blob:') === 0) {
        return anyUriToBlob(src);
      }
      if (src.indexOf('data:') === 0) {
        return dataUriToBlob(src);
      }
      return anyUriToBlob(src);
    });
  }
  function blobToImage$1(blob) {
    return new Promise(function (resolve, reject) {
      var blobUrl = URL.createObjectURL(blob);
      var image = new Image();
      var removeListeners = function () {
        image.removeEventListener('load', loaded);
        image.removeEventListener('error', error);
      };
      function loaded() {
        removeListeners();
        resolve(image);
      }
      function error() {
        removeListeners();
        reject('Unable to load data of type ' + blob.type + ': ' + blobUrl);
      }
      image.addEventListener('load', loaded);
      image.addEventListener('error', error);
      image.src = blobUrl;
      if (image.complete) {
        loaded();
      }
    });
  }
  function anyUriToBlob(url) {
    return new Promise(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        }
      };
      xhr.send();
    });
  }
  function dataUriToBlobSync$1(uri) {
    var data = uri.split(',');
    var matches = /data:([^;]+)/.exec(data[0]);
    if (!matches)
      return $_8i7mfvw9jcfx5gxw.none();
    var mimetype = matches[1];
    var base64 = data[1];
    var sliceSize = 1024;
    var byteCharacters = $_75a0jv11mjcfx5i01.atob(base64);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);
      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = Uint8Array(bytes);
    }
    return $_8i7mfvw9jcfx5gxw.some(Blob(byteArrays, { type: mimetype }));
  }
  function dataUriToBlob(uri) {
    return new Promise(function (resolve, reject) {
      dataUriToBlobSync$1(uri).fold(function () {
        reject('uri is not base64: ' + uri);
      }, resolve);
    });
  }
  function uriToBlob$1(url) {
    if (url.indexOf('blob:') === 0) {
      return anyUriToBlob(url);
    }
    if (url.indexOf('data:') === 0) {
      return dataUriToBlob(url);
    }
    return null;
  }
  function canvasToBlob(canvas, type, quality) {
    type = type || 'image/png';
    if (HTMLCanvasElement.prototype.toBlob) {
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          resolve(blob);
        }, type, quality);
      });
    } else {
      return dataUriToBlob(canvas.toDataURL(type, quality));
    }
  }
  function canvasToDataURL(getCanvas, type, quality) {
    type = type || 'image/png';
    return getCanvas.then(function (canvas) {
      return canvas.toDataURL(type, quality);
    });
  }
  function blobToCanvas(blob) {
    return blobToImage$1(blob).then(function (image) {
      revokeImageUrl(image);
      var context, canvas;
      canvas = $_c7g5in11gjcfx5hzk.create($_5fiesg11hjcfx5hzm.getWidth(image), $_5fiesg11hjcfx5hzm.getHeight(image));
      context = $_c7g5in11gjcfx5hzk.get2dContext(canvas);
      context.drawImage(image, 0, 0);
      return canvas;
    });
  }
  function blobToDataUri$1(blob) {
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
  function blobToBase64$1(blob) {
    return blobToDataUri$1(blob).then(function (dataUri) {
      return dataUri.split(',')[1];
    });
  }
  function revokeImageUrl(image) {
    URL.revokeObjectURL(image.src);
  }
  var $_fec14y11fjcfx5hz1 = {
    blobToImage: blobToImage$1,
    imageToBlob: imageToBlob$1,
    blobToDataUri: blobToDataUri$1,
    blobToBase64: blobToBase64$1,
    dataUriToBlobSync: dataUriToBlobSync$1,
    canvasToBlob: canvasToBlob,
    canvasToDataURL: canvasToDataURL,
    blobToCanvas: blobToCanvas,
    uriToBlob: uriToBlob$1
  };

  var blobToImage = function (image) {
    return $_fec14y11fjcfx5hz1.blobToImage(image);
  };
  var imageToBlob = function (blob) {
    return $_fec14y11fjcfx5hz1.imageToBlob(blob);
  };
  var blobToDataUri = function (blob) {
    return $_fec14y11fjcfx5hz1.blobToDataUri(blob);
  };
  var blobToBase64 = function (blob) {
    return $_fec14y11fjcfx5hz1.blobToBase64(blob);
  };
  var dataUriToBlobSync = function (uri) {
    return $_fec14y11fjcfx5hz1.dataUriToBlobSync(uri);
  };
  var uriToBlob = function (uri) {
    return $_8i7mfvw9jcfx5gxw.from($_fec14y11fjcfx5hz1.uriToBlob(uri));
  };
  var $_4uw5hq11ejcfx5hyv = {
    blobToImage: blobToImage,
    imageToBlob: imageToBlob,
    blobToDataUri: blobToDataUri,
    blobToBase64: blobToBase64,
    dataUriToBlobSync: dataUriToBlobSync,
    uriToBlob: uriToBlob
  };

  var addImage = function (editor, blob) {
    $_4uw5hq11ejcfx5hyv.blobToBase64(blob).then(function (base64) {
      editor.undoManager.transact(function () {
        var cache = editor.editorUpload.blobCache;
        var info = cache.create($_4yc6r610fjcfx5ho0.generate('mceu'), blob, base64);
        cache.add(info);
        var img = editor.dom.createHTML('img', { src: info.blobUri() });
        editor.insertContent(img);
      });
    });
  };
  var extractBlob = function (simulatedEvent) {
    var event = simulatedEvent.event();
    var files = event.raw().target.files || event.raw().dataTransfer.files;
    return $_8i7mfvw9jcfx5gxw.from(files[0]);
  };
  var sketch$5 = function (editor) {
    var pickerDom = {
      tag: 'input',
      attributes: {
        accept: 'image/*',
        type: 'file',
        title: ''
      },
      styles: {
        visibility: 'hidden',
        position: 'absolute'
      }
    };
    var memPicker = $_ewms9y11djcfx5hye.record({
      dom: pickerDom,
      events: $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.cutter($_7eoluuwwjcfx5h0z.click()),
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.change(), function (picker, simulatedEvent) {
          extractBlob(simulatedEvent).each(function (blob) {
            addImage(editor, blob);
          });
        })
      ])
    });
    return Button.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<span class="${prefix}-toolbar-button ${prefix}-icon-image ${prefix}-icon"></span>'),
      components: [memPicker.asSpec()],
      action: function (button) {
        var picker = memPicker.get(button);
        picker.element().dom().click();
      }
    });
  };
  var $_djb7se11cjcfx5hxz = { sketch: sketch$5 };

  var get$8 = function (element) {
    return element.dom().textContent;
  };
  var set$5 = function (element, value) {
    element.dom().textContent = value;
  };
  var $_3x7jey11pjcfx5i0w = {
    get: get$8,
    set: set$5
  };

  var isNotEmpty = function (val) {
    return val.length > 0;
  };
  var defaultToEmpty = function (str) {
    return str === undefined || str === null ? '' : str;
  };
  var noLink = function (editor) {
    var text = editor.selection.getContent({ format: 'text' });
    return {
      url: '',
      text: text,
      title: '',
      target: '',
      link: $_8i7mfvw9jcfx5gxw.none()
    };
  };
  var fromLink = function (link) {
    var text = $_3x7jey11pjcfx5i0w.get(link);
    var url = $_8bne1yxvjcfx5h7n.get(link, 'href');
    var title = $_8bne1yxvjcfx5h7n.get(link, 'title');
    var target = $_8bne1yxvjcfx5h7n.get(link, 'target');
    return {
      url: defaultToEmpty(url),
      text: text !== url ? defaultToEmpty(text) : '',
      title: defaultToEmpty(title),
      target: defaultToEmpty(target),
      link: $_8i7mfvw9jcfx5gxw.some(link)
    };
  };
  var getInfo = function (editor) {
    return query(editor).fold(function () {
      return noLink(editor);
    }, function (link) {
      return fromLink(link);
    });
  };
  var wasSimple = function (link) {
    var prevHref = $_8bne1yxvjcfx5h7n.get(link, 'href');
    var prevText = $_3x7jey11pjcfx5i0w.get(link);
    return prevHref === prevText;
  };
  var getTextToApply = function (link, url, info) {
    return info.text.filter(isNotEmpty).fold(function () {
      return wasSimple(link) ? $_8i7mfvw9jcfx5gxw.some(url) : $_8i7mfvw9jcfx5gxw.none();
    }, $_8i7mfvw9jcfx5gxw.some);
  };
  var unlinkIfRequired = function (editor, info) {
    var activeLink = info.link.bind($_30v3piwajcfx5gy5.identity);
    activeLink.each(function (link) {
      editor.execCommand('unlink');
    });
  };
  var getAttrs$1 = function (url, info) {
    var attrs = {};
    attrs.href = url;
    info.title.filter(isNotEmpty).each(function (title) {
      attrs.title = title;
    });
    info.target.filter(isNotEmpty).each(function (target) {
      attrs.target = target;
    });
    return attrs;
  };
  var applyInfo = function (editor, info) {
    info.url.filter(isNotEmpty).fold(function () {
      unlinkIfRequired(editor, info);
    }, function (url) {
      var attrs = getAttrs$1(url, info);
      var activeLink = info.link.bind($_30v3piwajcfx5gy5.identity);
      activeLink.fold(function () {
        var text = info.text.filter(isNotEmpty).getOr(url);
        editor.insertContent(editor.dom.createHTML('a', attrs, editor.dom.encode(text)));
      }, function (link) {
        var text = getTextToApply(link, url, info);
        $_8bne1yxvjcfx5h7n.setAll(link, attrs);
        text.each(function (newText) {
          $_3x7jey11pjcfx5i0w.set(link, newText);
        });
      });
    });
  };
  var query = function (editor) {
    var start = $_6k7v3dwsjcfx5h08.fromDom(editor.selection.getStart());
    return $_ccmao7zljcfx5hhv.closest(start, 'a');
  };
  var $_8m1gik11ojcfx5i0d = {
    getInfo: getInfo,
    applyInfo: applyInfo,
    query: query
  };

  var events$6 = function (name, eventHandlers) {
    var events = $_286fidw5jcfx5gwv.derive(eventHandlers);
    return $_7uu47fw3jcfx5gvw.create({
      fields: [$_32l4p2x1jcfx5h1y.strict('enabled')],
      name: name,
      active: { events: $_30v3piwajcfx5gy5.constant(events) }
    });
  };
  var config = function (name, eventHandlers) {
    var me = events$6(name, eventHandlers);
    return {
      key: name,
      value: {
        config: {},
        me: me,
        configAsRaw: $_30v3piwajcfx5gy5.constant({}),
        initialConfig: {},
        state: $_7uu47fw3jcfx5gvw.noState()
      }
    };
  };
  var $_9p4uz511rjcfx5i1s = {
    events: events$6,
    config: config
  };

  var getCurrent = function (component, composeConfig, composeState) {
    return composeConfig.find()(component);
  };
  var $_5ymxh711tjcfx5i22 = { getCurrent: getCurrent };

  var ComposeSchema = [$_32l4p2x1jcfx5h1y.strict('find')];

  var Composing = $_7uu47fw3jcfx5gvw.create({
    fields: ComposeSchema,
    name: 'composing',
    apis: $_5ymxh711tjcfx5i22
  });

  var factory$1 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_cvmq7wxjcfx5h15.deepMerge({
        tag: 'div',
        attributes: { role: 'presentation' }
      }, detail.dom()),
      components: detail.components(),
      behaviours: $_ijaov10cjcfx5hn2.get(detail.containerBehaviours()),
      events: detail.events(),
      domModification: detail.domModification(),
      eventOrder: detail.eventOrder()
    };
  };
  var Container = $_3wo7ba10djcfx5hna.single({
    name: 'Container',
    factory: factory$1,
    configFields: [
      $_32l4p2x1jcfx5h1y.defaulted('components', []),
      $_ijaov10cjcfx5hn2.field('containerBehaviours', []),
      $_32l4p2x1jcfx5h1y.defaulted('events', {}),
      $_32l4p2x1jcfx5h1y.defaulted('domModification', {}),
      $_32l4p2x1jcfx5h1y.defaulted('eventOrder', {})
    ]
  });

  var factory$2 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.getInitialValue()()
          }
        }),
        Composing.config({ find: $_8i7mfvw9jcfx5gxw.some })
      ]), $_ijaov10cjcfx5hn2.get(detail.dataBehaviours())),
      events: $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.runOnAttached(function (component, simulatedEvent) {
          me.setValue(component, detail.getInitialValue()());
        })])
    };
  };
  var DataField = $_3wo7ba10djcfx5hna.single({
    name: 'DataField',
    factory: factory$2,
    configFields: [
      $_32l4p2x1jcfx5h1y.strict('uid'),
      $_32l4p2x1jcfx5h1y.strict('dom'),
      $_32l4p2x1jcfx5h1y.strict('getInitialValue'),
      $_ijaov10cjcfx5hn2.field('dataBehaviours', [
        me,
        Composing
      ])
    ]
  });

  var get$9 = function (element) {
    return element.dom().value;
  };
  var set$6 = function (element, value) {
    if (value === undefined)
      throw new Error('Value.set was undefined');
    element.dom().value = value;
  };
  var $_acubdd11zjcfx5i3g = {
    set: set$6,
    get: get$9
  };

  var schema$8 = [
    $_32l4p2x1jcfx5h1y.option('data'),
    $_32l4p2x1jcfx5h1y.defaulted('inputAttributes', {}),
    $_32l4p2x1jcfx5h1y.defaulted('inputStyles', {}),
    $_32l4p2x1jcfx5h1y.defaulted('type', 'input'),
    $_32l4p2x1jcfx5h1y.defaulted('tag', 'input'),
    $_32l4p2x1jcfx5h1y.defaulted('inputClasses', []),
    $_7spjsaysjcfx5hd5.onHandler('onSetValue'),
    $_32l4p2x1jcfx5h1y.defaulted('styles', {}),
    $_32l4p2x1jcfx5h1y.option('placeholder'),
    $_32l4p2x1jcfx5h1y.defaulted('eventOrder', {}),
    $_ijaov10cjcfx5hn2.field('inputBehaviours', [
      me,
      Focusing
    ]),
    $_32l4p2x1jcfx5h1y.defaulted('selectOnFocus', true)
  ];
  var behaviours = function (detail) {
    return $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
      me.config({
        store: {
          mode: 'manual',
          initialValue: detail.data().getOr(undefined),
          getValue: function (input) {
            return $_acubdd11zjcfx5i3g.get(input.element());
          },
          setValue: function (input, data) {
            var current = $_acubdd11zjcfx5i3g.get(input.element());
            if (current !== data) {
              $_acubdd11zjcfx5i3g.set(input.element(), data);
            }
          }
        },
        onSetValue: detail.onSetValue()
      }),
      Focusing.config({
        onFocus: detail.selectOnFocus() === false ? $_30v3piwajcfx5gy5.noop : function (component) {
          var input = component.element();
          var value = $_acubdd11zjcfx5i3g.get(input);
          input.dom().setSelectionRange(0, value.length);
        }
      })
    ]), $_ijaov10cjcfx5hn2.get(detail.inputBehaviours()));
  };
  var dom$2 = function (detail) {
    return {
      tag: detail.tag(),
      attributes: $_cvmq7wxjcfx5h15.deepMerge($_42faa8x5jcfx5h3h.wrapAll([{
          key: 'type',
          value: detail.type()
        }].concat(detail.placeholder().map(function (pc) {
        return {
          key: 'placeholder',
          value: pc
        };
      }).toArray())), detail.inputAttributes()),
      styles: detail.inputStyles(),
      classes: detail.inputClasses()
    };
  };
  var $_3f10uo11yjcfx5i2x = {
    schema: $_30v3piwajcfx5gy5.constant(schema$8),
    behaviours: behaviours,
    dom: dom$2
  };

  var factory$3 = function (detail, spec) {
    return {
      uid: detail.uid(),
      dom: $_3f10uo11yjcfx5i2x.dom(detail),
      components: [],
      behaviours: $_3f10uo11yjcfx5i2x.behaviours(detail),
      eventOrder: detail.eventOrder()
    };
  };
  var Input = $_3wo7ba10djcfx5hna.single({
    name: 'Input',
    configFields: $_3f10uo11yjcfx5i2x.schema(),
    factory: factory$3
  });

  var exhibit$3 = function (base, tabConfig) {
    return $_1k6iv7xjjcfx5h5o.nu({
      attributes: $_42faa8x5jcfx5h3h.wrapAll([{
          key: tabConfig.tabAttr(),
          value: 'true'
        }])
    });
  };
  var $_23pts9121jcfx5i3k = { exhibit: exhibit$3 };

  var TabstopSchema = [$_32l4p2x1jcfx5h1y.defaulted('tabAttr', 'data-alloy-tabstop')];

  var Tabstopping = $_7uu47fw3jcfx5gvw.create({
    fields: TabstopSchema,
    name: 'tabstopping',
    active: $_23pts9121jcfx5i3k
  });

  var clearInputBehaviour = 'input-clearing';
  var field$2 = function (name, placeholder) {
    var inputSpec = $_ewms9y11djcfx5hye.record(Input.sketch({
      placeholder: placeholder,
      onSetValue: function (input, data) {
        $_7pg78vwujcfx5h0i.emit(input, $_7eoluuwwjcfx5h0z.input());
      },
      inputBehaviours: $_7uu47fw3jcfx5gvw.derive([
        Composing.config({ find: $_8i7mfvw9jcfx5gxw.some }),
        Tabstopping.config({}),
        Keying.config({ mode: 'execution' })
      ]),
      selectOnFocus: false
    }));
    var buttonSpec = $_ewms9y11djcfx5hye.record(Button.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<button class="${prefix}-input-container-x ${prefix}-icon-cancel-circle ${prefix}-icon"></button>'),
      action: function (button) {
        var input = inputSpec.get(button);
        me.setValue(input, '');
      }
    }));
    return {
      name: name,
      spec: Container.sketch({
        dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-input-container"></div>'),
        components: [
          inputSpec.asSpec(),
          buttonSpec.asSpec()
        ],
        containerBehaviours: $_7uu47fw3jcfx5gvw.derive([
          Toggling.config({ toggleClass: $_46bmn4z0jcfx5hew.resolve('input-container-empty') }),
          Composing.config({
            find: function (comp) {
              return $_8i7mfvw9jcfx5gxw.some(inputSpec.get(comp));
            }
          }),
          $_9p4uz511rjcfx5i1s.config(clearInputBehaviour, [$_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.input(), function (iContainer) {
              var input = inputSpec.get(iContainer);
              var val = me.getValue(input);
              var f = val.length > 0 ? Toggling.off : Toggling.on;
              f(iContainer);
            })])
        ])
      })
    };
  };
  var hidden = function (name) {
    return {
      name: name,
      spec: DataField.sketch({
        dom: {
          tag: 'span',
          styles: { display: 'none' }
        },
        getInitialValue: function () {
          return $_8i7mfvw9jcfx5gxw.none();
        }
      })
    };
  };
  var $_8mx44b11qjcfx5i0y = {
    field: field$2,
    hidden: hidden
  };

  var nativeDisabled = [
    'input',
    'button',
    'textarea'
  ];
  var onLoad$5 = function (component, disableConfig, disableState) {
    if (disableConfig.disabled())
      disable(component, disableConfig, disableState);
  };
  var hasNative = function (component) {
    return $_91ik4uw8jcfx5gxn.contains(nativeDisabled, $_3wpq1xxwjcfx5h87.name(component.element()));
  };
  var nativeIsDisabled = function (component) {
    return $_8bne1yxvjcfx5h7n.has(component.element(), 'disabled');
  };
  var nativeDisable = function (component) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'disabled', 'disabled');
  };
  var nativeEnable = function (component) {
    $_8bne1yxvjcfx5h7n.remove(component.element(), 'disabled');
  };
  var ariaIsDisabled = function (component) {
    return $_8bne1yxvjcfx5h7n.get(component.element(), 'aria-disabled') === 'true';
  };
  var ariaDisable = function (component) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-disabled', 'true');
  };
  var ariaEnable = function (component) {
    $_8bne1yxvjcfx5h7n.set(component.element(), 'aria-disabled', 'false');
  };
  var disable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_axxg6hxtjcfx5h7e.add(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeDisable : ariaDisable;
    f(component);
  };
  var enable = function (component, disableConfig, disableState) {
    disableConfig.disableClass().each(function (disableClass) {
      $_axxg6hxtjcfx5h7e.remove(component.element(), disableClass);
    });
    var f = hasNative(component) ? nativeEnable : ariaEnable;
    f(component);
  };
  var isDisabled = function (component) {
    return hasNative(component) ? nativeIsDisabled(component) : ariaIsDisabled(component);
  };
  var $_9nrmkq126jcfx5i55 = {
    enable: enable,
    disable: disable,
    isDisabled: isDisabled,
    onLoad: onLoad$5
  };

  var exhibit$4 = function (base, disableConfig, disableState) {
    return $_1k6iv7xjjcfx5h5o.nu({ classes: disableConfig.disabled() ? disableConfig.disableClass().map($_91ik4uw8jcfx5gxn.pure).getOr([]) : [] });
  };
  var events$7 = function (disableConfig, disableState) {
    return $_286fidw5jcfx5gwv.derive([
      $_286fidw5jcfx5gwv.abort($_fe7kcdwvjcfx5h0s.execute(), function (component, simulatedEvent) {
        return $_9nrmkq126jcfx5i55.isDisabled(component, disableConfig, disableState);
      }),
      $_9dgavgw4jcfx5gwc.loadEvent(disableConfig, disableState, $_9nrmkq126jcfx5i55.onLoad)
    ]);
  };
  var $_cxoff2125jcfx5i52 = {
    exhibit: exhibit$4,
    events: events$7
  };

  var DisableSchema = [
    $_32l4p2x1jcfx5h1y.defaulted('disabled', false),
    $_32l4p2x1jcfx5h1y.option('disableClass')
  ];

  var Disabling = $_7uu47fw3jcfx5gvw.create({
    fields: DisableSchema,
    name: 'disabling',
    active: $_cxoff2125jcfx5i52,
    apis: $_9nrmkq126jcfx5i55
  });

  var owner$1 = 'form';
  var schema$9 = [$_ijaov10cjcfx5hn2.field('formBehaviours', [me])];
  var getPartName = function (name) {
    return '<alloy.field.' + name + '>';
  };
  var sketch$8 = function (fSpec) {
    var parts = function () {
      var record = [];
      var field = function (name, config) {
        record.push(name);
        return $_8uasnh10hjcfx5hob.generateOne(owner$1, getPartName(name), config);
      };
      return {
        field: field,
        record: function () {
          return record;
        }
      };
    }();
    var spec = fSpec(parts);
    var partNames = parts.record();
    var fieldParts = $_91ik4uw8jcfx5gxn.map(partNames, function (n) {
      return $_9leb2110jjcfx5hp6.required({
        name: n,
        pname: getPartName(n)
      });
    });
    return $_3vuege10gjcfx5ho2.composite(owner$1, schema$9, fieldParts, make, spec);
  };
  var make = function (detail, components, spec) {
    return $_cvmq7wxjcfx5h15.deepMerge({
      'debug.sketcher': { 'Form': spec },
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([me.config({
          store: {
            mode: 'manual',
            getValue: function (form) {
              var optPs = $_8uasnh10hjcfx5hob.getAllParts(form, detail);
              return $_929ptpwzjcfx5h1b.map(optPs, function (optPThunk, pName) {
                return optPThunk().bind(Composing.getCurrent).map(me.getValue);
              });
            },
            setValue: function (form, values) {
              $_929ptpwzjcfx5h1b.each(values, function (newValue, key) {
                $_8uasnh10hjcfx5hob.getPart(form, detail, key).each(function (wrapper) {
                  Composing.getCurrent(wrapper).each(function (field) {
                    me.setValue(field, newValue);
                  });
                });
              });
            }
          }
        })]), $_ijaov10cjcfx5hn2.get(detail.formBehaviours())),
      apis: {
        getField: function (form, key) {
          return $_8uasnh10hjcfx5hob.getPart(form, detail, key).bind(Composing.getCurrent);
        }
      }
    });
  };
  var $_dx5al128jcfx5i5o = {
    getField: $_9s15br10ejcfx5hnm.makeApi(function (apis, component, key) {
      return apis.getField(component, key);
    }),
    sketch: sketch$8
  };

  var revocable = function (doRevoke) {
    var subject = Cell($_8i7mfvw9jcfx5gxw.none());
    var revoke = function () {
      subject.get().each(doRevoke);
    };
    var clear = function () {
      revoke();
      subject.set($_8i7mfvw9jcfx5gxw.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_8i7mfvw9jcfx5gxw.some(s));
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set
    };
  };
  var destroyable = function () {
    return revocable(function (s) {
      s.destroy();
    });
  };
  var unbindable = function () {
    return revocable(function (s) {
      s.unbind();
    });
  };
  var api$2 = function () {
    var subject = Cell($_8i7mfvw9jcfx5gxw.none());
    var revoke = function () {
      subject.get().each(function (s) {
        s.destroy();
      });
    };
    var clear = function () {
      revoke();
      subject.set($_8i7mfvw9jcfx5gxw.none());
    };
    var set = function (s) {
      revoke();
      subject.set($_8i7mfvw9jcfx5gxw.some(s));
    };
    var run = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      isSet: isSet,
      set: set,
      run: run
    };
  };
  var value$3 = function () {
    var subject = Cell($_8i7mfvw9jcfx5gxw.none());
    var clear = function () {
      subject.set($_8i7mfvw9jcfx5gxw.none());
    };
    var set = function (s) {
      subject.set($_8i7mfvw9jcfx5gxw.some(s));
    };
    var on = function (f) {
      subject.get().each(f);
    };
    var isSet = function () {
      return subject.get().isSome();
    };
    return {
      clear: clear,
      set: set,
      isSet: isSet,
      on: on
    };
  };
  var $_8ypal129jcfx5i6m = {
    destroyable: destroyable,
    unbindable: unbindable,
    api: api$2,
    value: value$3
  };

  var SWIPING_LEFT = 1;
  var SWIPING_RIGHT = -1;
  var SWIPING_NONE = 0;
  var init$3 = function (xValue) {
    return {
      xValue: xValue,
      points: []
    };
  };
  var move = function (model, xValue) {
    if (xValue === model.xValue) {
      return model;
    }
    var currentDirection = xValue - model.xValue > 0 ? SWIPING_LEFT : SWIPING_RIGHT;
    var newPoint = {
      direction: currentDirection,
      xValue: xValue
    };
    var priorPoints = function () {
      if (model.points.length === 0) {
        return [];
      } else {
        var prev = model.points[model.points.length - 1];
        return prev.direction === currentDirection ? model.points.slice(0, model.points.length - 1) : model.points;
      }
    }();
    return {
      xValue: xValue,
      points: priorPoints.concat([newPoint])
    };
  };
  var complete = function (model) {
    if (model.points.length === 0) {
      return SWIPING_NONE;
    } else {
      var firstDirection = model.points[0].direction;
      var lastDirection = model.points[model.points.length - 1].direction;
      return firstDirection === SWIPING_RIGHT && lastDirection === SWIPING_RIGHT ? SWIPING_RIGHT : firstDirection === SWIPING_LEFT && lastDirection === SWIPING_LEFT ? SWIPING_LEFT : SWIPING_NONE;
    }
  };
  var $_14kkom12ajcfx5i6s = {
    init: init$3,
    move: move,
    complete: complete
  };

  var sketch$7 = function (rawSpec) {
    var navigateEvent = 'navigateEvent';
    var wrapperAdhocEvents = 'serializer-wrapper-events';
    var formAdhocEvents = 'form-events';
    var schema = $_fj9y9nxgjcfx5h5a.objOf([
      $_32l4p2x1jcfx5h1y.strict('fields'),
      $_32l4p2x1jcfx5h1y.defaulted('maxFieldIndex', rawSpec.fields.length - 1),
      $_32l4p2x1jcfx5h1y.strict('onExecute'),
      $_32l4p2x1jcfx5h1y.strict('getInitialValue'),
      $_32l4p2x1jcfx5h1y.state('state', function () {
        return {
          dialogSwipeState: $_8ypal129jcfx5i6m.value(),
          currentScreen: Cell(0)
        };
      })
    ]);
    var spec = $_fj9y9nxgjcfx5h5a.asRawOrDie('SerialisedDialog', schema, rawSpec);
    var navigationButton = function (direction, directionName, enabled) {
      return Button.sketch({
        dom: $_copwu110pjcfx5hs6.dom('<span class="${prefix}-icon-' + directionName + ' ${prefix}-icon"></span>'),
        action: function (button) {
          $_7pg78vwujcfx5h0i.emitWith(button, navigateEvent, { direction: direction });
        },
        buttonBehaviours: $_7uu47fw3jcfx5gvw.derive([Disabling.config({
            disableClass: $_46bmn4z0jcfx5hew.resolve('toolbar-navigation-disabled'),
            disabled: !enabled
          })])
      });
    };
    var reposition = function (dialog, message) {
      $_ccmao7zljcfx5hhv.descendant(dialog.element(), '.' + $_46bmn4z0jcfx5hew.resolve('serialised-dialog-chain')).each(function (parent) {
        $_3wulrizrjcfx5him.set(parent, 'left', -spec.state.currentScreen.get() * message.width + 'px');
      });
    };
    var navigate = function (dialog, direction) {
      var screens = $_5iffulzjjcfx5hhq.descendants(dialog.element(), '.' + $_46bmn4z0jcfx5hew.resolve('serialised-dialog-screen'));
      $_ccmao7zljcfx5hhv.descendant(dialog.element(), '.' + $_46bmn4z0jcfx5hew.resolve('serialised-dialog-chain')).each(function (parent) {
        if (spec.state.currentScreen.get() + direction >= 0 && spec.state.currentScreen.get() + direction < screens.length) {
          $_3wulrizrjcfx5him.getRaw(parent, 'left').each(function (left) {
            var currentLeft = parseInt(left, 10);
            var w = $_c2pn1d116jcfx5hwb.get(screens[0]);
            $_3wulrizrjcfx5him.set(parent, 'left', currentLeft - direction * w + 'px');
          });
          spec.state.currentScreen.set(spec.state.currentScreen.get() + direction);
        }
      });
    };
    var focusInput = function (dialog) {
      var inputs = $_5iffulzjjcfx5hhq.descendants(dialog.element(), 'input');
      var optInput = $_8i7mfvw9jcfx5gxw.from(inputs[spec.state.currentScreen.get()]);
      optInput.each(function (input) {
        dialog.getSystem().getByDom(input).each(function (inputComp) {
          $_7pg78vwujcfx5h0i.dispatchFocus(dialog, inputComp.element());
        });
      });
      var dotitems = memDots.get(dialog);
      Highlighting.highlightAt(dotitems, spec.state.currentScreen.get());
    };
    var resetState = function () {
      spec.state.currentScreen.set(0);
      spec.state.dialogSwipeState.clear();
    };
    var memForm = $_ewms9y11djcfx5hye.record($_dx5al128jcfx5i5o.sketch(function (parts) {
      return {
        dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-serialised-dialog"></div>'),
        components: [Container.sketch({
            dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-serialised-dialog-chain" style="left: 0px; position: absolute;"></div>'),
            components: $_91ik4uw8jcfx5gxn.map(spec.fields, function (field, i) {
              return i <= spec.maxFieldIndex ? Container.sketch({
                dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-serialised-dialog-screen"></div>'),
                components: $_91ik4uw8jcfx5gxn.flatten([
                  [navigationButton(-1, 'previous', i > 0)],
                  [parts.field(field.name, field.spec)],
                  [navigationButton(+1, 'next', i < spec.maxFieldIndex)]
                ])
              }) : parts.field(field.name, field.spec);
            })
          })],
        formBehaviours: $_7uu47fw3jcfx5gvw.derive([
          $_a2zkb1yzjcfx5her.orientation(function (dialog, message) {
            reposition(dialog, message);
          }),
          Keying.config({
            mode: 'special',
            focusIn: function (dialog) {
              focusInput(dialog);
            },
            onTab: function (dialog) {
              navigate(dialog, +1);
              return $_8i7mfvw9jcfx5gxw.some(true);
            },
            onShiftTab: function (dialog) {
              navigate(dialog, -1);
              return $_8i7mfvw9jcfx5gxw.some(true);
            }
          }),
          $_9p4uz511rjcfx5i1s.config(formAdhocEvents, [
            $_286fidw5jcfx5gwv.runOnAttached(function (dialog, simulatedEvent) {
              resetState();
              var dotitems = memDots.get(dialog);
              Highlighting.highlightFirst(dotitems);
              spec.getInitialValue(dialog).each(function (v) {
                me.setValue(dialog, v);
              });
            }),
            $_286fidw5jcfx5gwv.runOnExecute(spec.onExecute),
            $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.transitionend(), function (dialog, simulatedEvent) {
              if (simulatedEvent.event().raw().propertyName === 'left') {
                focusInput(dialog);
              }
            }),
            $_286fidw5jcfx5gwv.run(navigateEvent, function (dialog, simulatedEvent) {
              var direction = simulatedEvent.event().direction();
              navigate(dialog, direction);
            })
          ])
        ])
      };
    }));
    var memDots = $_ewms9y11djcfx5hye.record({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-dot-container"></div>'),
      behaviours: $_7uu47fw3jcfx5gvw.derive([Highlighting.config({
          highlightClass: $_46bmn4z0jcfx5hew.resolve('dot-active'),
          itemClass: $_46bmn4z0jcfx5hew.resolve('dot-item')
        })]),
      components: $_91ik4uw8jcfx5gxn.bind(spec.fields, function (_f, i) {
        return i <= spec.maxFieldIndex ? [$_copwu110pjcfx5hs6.spec('<div class="${prefix}-dot-item ${prefix}-icon-full-dot ${prefix}-icon"></div>')] : [];
      })
    });
    return {
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-serializer-wrapper"></div>'),
      components: [
        memForm.asSpec(),
        memDots.asSpec()
      ],
      behaviours: $_7uu47fw3jcfx5gvw.derive([
        Keying.config({
          mode: 'special',
          focusIn: function (wrapper) {
            var form = memForm.get(wrapper);
            Keying.focusIn(form);
          }
        }),
        $_9p4uz511rjcfx5i1s.config(wrapperAdhocEvents, [
          $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchstart(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.set($_14kkom12ajcfx5i6s.init(simulatedEvent.event().raw().touches[0].clientX));
          }),
          $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchmove(), function (wrapper, simulatedEvent) {
            spec.state.dialogSwipeState.on(function (state) {
              simulatedEvent.event().prevent();
              spec.state.dialogSwipeState.set($_14kkom12ajcfx5i6s.move(state, simulatedEvent.event().raw().touches[0].clientX));
            });
          }),
          $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.touchend(), function (wrapper) {
            spec.state.dialogSwipeState.on(function (state) {
              var dialog = memForm.get(wrapper);
              var direction = -1 * $_14kkom12ajcfx5i6s.complete(state);
              navigate(dialog, direction);
            });
          })
        ])
      ])
    };
  };
  var $_b231ho123jcfx5i3r = { sketch: sketch$7 };

  var platform$1 = $_f916s2wfjcfx5gyj.detect();
  var preserve$1 = function (f, editor) {
    var rng = editor.selection.getRng();
    f();
    editor.selection.setRng(rng);
  };
  var forAndroid = function (editor, f) {
    var wrapper = platform$1.os.isAndroid() ? preserve$1 : $_30v3piwajcfx5gy5.apply;
    wrapper(f, editor);
  };
  var $_9a1gi212bjcfx5i6v = { forAndroid: forAndroid };

  var getGroups = $_8ohqlxwgjcfx5gym.cached(function (realm, editor) {
    return [{
        label: 'the link group',
        items: [$_b231ho123jcfx5i3r.sketch({
            fields: [
              $_8mx44b11qjcfx5i0y.field('url', 'Type or paste URL'),
              $_8mx44b11qjcfx5i0y.field('text', 'Link text'),
              $_8mx44b11qjcfx5i0y.field('title', 'Link title'),
              $_8mx44b11qjcfx5i0y.field('target', 'Link target'),
              $_8mx44b11qjcfx5i0y.hidden('link')
            ],
            maxFieldIndex: [
              'url',
              'text',
              'title',
              'target'
            ].length - 1,
            getInitialValue: function () {
              return $_8i7mfvw9jcfx5gxw.some($_8m1gik11ojcfx5i0d.getInfo(editor));
            },
            onExecute: function (dialog) {
              var info = me.getValue(dialog);
              $_8m1gik11ojcfx5i0d.applyInfo(editor, info);
              realm.restoreToolbar();
              editor.focus();
            }
          })]
      }];
  });
  var sketch$6 = function (realm, editor) {
    return $_gg259uz1jcfx5hf0.forToolbarStateAction(editor, 'link', 'link', function () {
      var groups = getGroups(realm, editor);
      realm.setContextToolbar(groups);
      $_9a1gi212bjcfx5i6v.forAndroid(editor, function () {
        realm.focusToolbar();
      });
      $_8m1gik11ojcfx5i0d.query(editor).each(function (link) {
        editor.selection.select(link.dom());
      });
    });
  };
  var $_4y9hls11njcfx5i03 = { sketch: sketch$6 };

  var DefaultStyleFormats = [
    {
      title: 'Headings',
      items: [
        {
          title: 'Heading 1',
          format: 'h1'
        },
        {
          title: 'Heading 2',
          format: 'h2'
        },
        {
          title: 'Heading 3',
          format: 'h3'
        },
        {
          title: 'Heading 4',
          format: 'h4'
        },
        {
          title: 'Heading 5',
          format: 'h5'
        },
        {
          title: 'Heading 6',
          format: 'h6'
        }
      ]
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Bold',
          icon: 'bold',
          format: 'bold'
        },
        {
          title: 'Italic',
          icon: 'italic',
          format: 'italic'
        },
        {
          title: 'Underline',
          icon: 'underline',
          format: 'underline'
        },
        {
          title: 'Strikethrough',
          icon: 'strikethrough',
          format: 'strikethrough'
        },
        {
          title: 'Superscript',
          icon: 'superscript',
          format: 'superscript'
        },
        {
          title: 'Subscript',
          icon: 'subscript',
          format: 'subscript'
        },
        {
          title: 'Code',
          icon: 'code',
          format: 'code'
        }
      ]
    },
    {
      title: 'Blocks',
      items: [
        {
          title: 'Paragraph',
          format: 'p'
        },
        {
          title: 'Blockquote',
          format: 'blockquote'
        },
        {
          title: 'Div',
          format: 'div'
        },
        {
          title: 'Pre',
          format: 'pre'
        }
      ]
    },
    {
      title: 'Alignment',
      items: [
        {
          title: 'Left',
          icon: 'alignleft',
          format: 'alignleft'
        },
        {
          title: 'Center',
          icon: 'aligncenter',
          format: 'aligncenter'
        },
        {
          title: 'Right',
          icon: 'alignright',
          format: 'alignright'
        },
        {
          title: 'Justify',
          icon: 'alignjustify',
          format: 'alignjustify'
        }
      ]
    }
  ];

  var findRoute = function (component, transConfig, transState, route) {
    return $_42faa8x5jcfx5h3h.readOptFrom(transConfig.routes(), route.start()).map($_30v3piwajcfx5gy5.apply).bind(function (sConfig) {
      return $_42faa8x5jcfx5h3h.readOptFrom(sConfig, route.destination()).map($_30v3piwajcfx5gy5.apply);
    });
  };
  var getTransition = function (comp, transConfig, transState) {
    var route = getCurrentRoute(comp, transConfig, transState);
    return route.bind(function (r) {
      return getTransitionOf(comp, transConfig, transState, r);
    });
  };
  var getTransitionOf = function (comp, transConfig, transState, route) {
    return findRoute(comp, transConfig, transState, route).bind(function (r) {
      return r.transition().map(function (t) {
        return {
          transition: $_30v3piwajcfx5gy5.constant(t),
          route: $_30v3piwajcfx5gy5.constant(r)
        };
      });
    });
  };
  var disableTransition = function (comp, transConfig, transState) {
    getTransition(comp, transConfig, transState).each(function (routeTransition) {
      var t = routeTransition.transition();
      $_axxg6hxtjcfx5h7e.remove(comp.element(), t.transitionClass());
      $_8bne1yxvjcfx5h7n.remove(comp.element(), transConfig.destinationAttr());
    });
  };
  var getNewRoute = function (comp, transConfig, transState, destination) {
    return {
      start: $_30v3piwajcfx5gy5.constant($_8bne1yxvjcfx5h7n.get(comp.element(), transConfig.stateAttr())),
      destination: $_30v3piwajcfx5gy5.constant(destination)
    };
  };
  var getCurrentRoute = function (comp, transConfig, transState) {
    var el = comp.element();
    return $_8bne1yxvjcfx5h7n.has(el, transConfig.destinationAttr()) ? $_8i7mfvw9jcfx5gxw.some({
      start: $_30v3piwajcfx5gy5.constant($_8bne1yxvjcfx5h7n.get(comp.element(), transConfig.stateAttr())),
      destination: $_30v3piwajcfx5gy5.constant($_8bne1yxvjcfx5h7n.get(comp.element(), transConfig.destinationAttr()))
    }) : $_8i7mfvw9jcfx5gxw.none();
  };
  var jumpTo = function (comp, transConfig, transState, destination) {
    disableTransition(comp, transConfig, transState);
    if ($_8bne1yxvjcfx5h7n.has(comp.element(), transConfig.stateAttr()) && $_8bne1yxvjcfx5h7n.get(comp.element(), transConfig.stateAttr()) !== destination)
      transConfig.onFinish()(comp, destination);
    $_8bne1yxvjcfx5h7n.set(comp.element(), transConfig.stateAttr(), destination);
  };
  var fasttrack = function (comp, transConfig, transState, destination) {
    if ($_8bne1yxvjcfx5h7n.has(comp.element(), transConfig.destinationAttr())) {
      $_8bne1yxvjcfx5h7n.set(comp.element(), transConfig.stateAttr(), $_8bne1yxvjcfx5h7n.get(comp.element(), transConfig.destinationAttr()));
      $_8bne1yxvjcfx5h7n.remove(comp.element(), transConfig.destinationAttr());
    }
  };
  var progressTo = function (comp, transConfig, transState, destination) {
    fasttrack(comp, transConfig, transState, destination);
    var route = getNewRoute(comp, transConfig, transState, destination);
    getTransitionOf(comp, transConfig, transState, route).fold(function () {
      jumpTo(comp, transConfig, transState, destination);
    }, function (routeTransition) {
      disableTransition(comp, transConfig, transState);
      var t = routeTransition.transition();
      $_axxg6hxtjcfx5h7e.add(comp.element(), t.transitionClass());
      $_8bne1yxvjcfx5h7n.set(comp.element(), transConfig.destinationAttr(), destination);
    });
  };
  var getState = function (comp, transConfig, transState) {
    var e = comp.element();
    return $_8bne1yxvjcfx5h7n.has(e, transConfig.stateAttr()) ? $_8i7mfvw9jcfx5gxw.some($_8bne1yxvjcfx5h7n.get(e, transConfig.stateAttr())) : $_8i7mfvw9jcfx5gxw.none();
  };
  var $_abs66012hjcfx5i92 = {
    findRoute: findRoute,
    disableTransition: disableTransition,
    getCurrentRoute: getCurrentRoute,
    jumpTo: jumpTo,
    progressTo: progressTo,
    getState: getState
  };

  var events$8 = function (transConfig, transState) {
    return $_286fidw5jcfx5gwv.derive([
      $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        $_abs66012hjcfx5i92.getCurrentRoute(component, transConfig, transState).each(function (route) {
          $_abs66012hjcfx5i92.findRoute(component, transConfig, transState, route).each(function (rInfo) {
            rInfo.transition().each(function (rTransition) {
              if (raw.propertyName === rTransition.property()) {
                $_abs66012hjcfx5i92.jumpTo(component, transConfig, transState, route.destination());
                transConfig.onTransition()(component, route);
              }
            });
          });
        });
      }),
      $_286fidw5jcfx5gwv.runOnAttached(function (comp, se) {
        $_abs66012hjcfx5i92.jumpTo(comp, transConfig, transState, transConfig.initialState());
      })
    ]);
  };
  var $_1sulw612gjcfx5i8y = { events: events$8 };

  var TransitionSchema = [
    $_32l4p2x1jcfx5h1y.defaulted('destinationAttr', 'data-transitioning-destination'),
    $_32l4p2x1jcfx5h1y.defaulted('stateAttr', 'data-transitioning-state'),
    $_32l4p2x1jcfx5h1y.strict('initialState'),
    $_7spjsaysjcfx5hd5.onHandler('onTransition'),
    $_7spjsaysjcfx5hd5.onHandler('onFinish'),
    $_32l4p2x1jcfx5h1y.strictOf('routes', $_fj9y9nxgjcfx5h5a.setOf($_5jjfpzx7jcfx5h3t.value, $_fj9y9nxgjcfx5h5a.setOf($_5jjfpzx7jcfx5h3t.value, $_fj9y9nxgjcfx5h5a.objOfOnly([$_32l4p2x1jcfx5h1y.optionObjOfOnly('transition', [
        $_32l4p2x1jcfx5h1y.strict('property'),
        $_32l4p2x1jcfx5h1y.strict('transitionClass')
      ])]))))
  ];

  var createRoutes = function (routes) {
    var r = {};
    $_929ptpwzjcfx5h1b.each(routes, function (v, k) {
      var waypoints = k.split('<->');
      r[waypoints[0]] = $_42faa8x5jcfx5h3h.wrap(waypoints[1], v);
      r[waypoints[1]] = $_42faa8x5jcfx5h3h.wrap(waypoints[0], v);
    });
    return r;
  };
  var createBistate = function (first, second, transitions) {
    return $_42faa8x5jcfx5h3h.wrapAll([
      {
        key: first,
        value: $_42faa8x5jcfx5h3h.wrap(second, transitions)
      },
      {
        key: second,
        value: $_42faa8x5jcfx5h3h.wrap(first, transitions)
      }
    ]);
  };
  var createTristate = function (first, second, third, transitions) {
    return $_42faa8x5jcfx5h3h.wrapAll([
      {
        key: first,
        value: $_42faa8x5jcfx5h3h.wrapAll([
          {
            key: second,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: second,
        value: $_42faa8x5jcfx5h3h.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: third,
            value: transitions
          }
        ])
      },
      {
        key: third,
        value: $_42faa8x5jcfx5h3h.wrapAll([
          {
            key: first,
            value: transitions
          },
          {
            key: second,
            value: transitions
          }
        ])
      }
    ]);
  };
  var Transitioning = $_7uu47fw3jcfx5gvw.create({
    fields: TransitionSchema,
    name: 'transitioning',
    active: $_1sulw612gjcfx5i8y,
    apis: $_abs66012hjcfx5i92,
    extra: {
      createRoutes: createRoutes,
      createBistate: createBistate,
      createTristate: createTristate
    }
  });

  var generateFrom$1 = function (spec, all) {
    var schema = $_91ik4uw8jcfx5gxn.map(all, function (a) {
      return $_32l4p2x1jcfx5h1y.field(a.name(), a.name(), $_4dvdewx2jcfx5h25.asOption(), $_fj9y9nxgjcfx5h5a.objOf([
        $_32l4p2x1jcfx5h1y.strict('config'),
        $_32l4p2x1jcfx5h1y.defaulted('state', $_g8b8q6xpjcfx5h6o)
      ]));
    });
    var validated = $_fj9y9nxgjcfx5h5a.asStruct('component.behaviours', $_fj9y9nxgjcfx5h5a.objOf(schema), spec.behaviours).fold(function (errInfo) {
      throw new Error($_fj9y9nxgjcfx5h5a.formatError(errInfo) + '\nComplete spec:\n' + $_euz44nxejcfx5h51.stringify(spec, null, 2));
    }, $_30v3piwajcfx5gy5.identity);
    return {
      list: all,
      data: $_929ptpwzjcfx5h1b.map(validated, function (blobOptionThunk) {
        var blobOption = blobOptionThunk();
        return $_30v3piwajcfx5gy5.constant(blobOption.map(function (blob) {
          return {
            config: blob.config(),
            state: blob.state().init(blob.config())
          };
        }));
      })
    };
  };
  var getBehaviours$1 = function (bData) {
    return bData.list;
  };
  var getData = function (bData) {
    return bData.data;
  };
  var $_bkt96o12mjcfx5ibb = {
    generateFrom: generateFrom$1,
    getBehaviours: getBehaviours$1,
    getData: getData
  };

  var getBehaviours = function (spec) {
    var behaviours = $_42faa8x5jcfx5h3h.readOptFrom(spec, 'behaviours').getOr({});
    var keys = $_91ik4uw8jcfx5gxn.filter($_929ptpwzjcfx5h1b.keys(behaviours), function (k) {
      return behaviours[k] !== undefined;
    });
    return $_91ik4uw8jcfx5gxn.map(keys, function (k) {
      return spec.behaviours[k].me;
    });
  };
  var generateFrom = function (spec, all) {
    return $_bkt96o12mjcfx5ibb.generateFrom(spec, all);
  };
  var generate$4 = function (spec) {
    var all = getBehaviours(spec);
    return generateFrom(spec, all);
  };
  var $_79nyyq12ljcfx5ib4 = {
    generate: generate$4,
    generateFrom: generateFrom
  };

  var ComponentApi = $_4fxhqgxrjcfx5h6z.exactly([
    'getSystem',
    'config',
    'hasConfigured',
    'spec',
    'connect',
    'disconnect',
    'element',
    'syncComponents',
    'readState',
    'components',
    'events'
  ]);

  var SystemApi = $_4fxhqgxrjcfx5h6z.exactly([
    'debugInfo',
    'triggerFocus',
    'triggerEvent',
    'triggerEscape',
    'addToWorld',
    'removeFromWorld',
    'addToGui',
    'removeFromGui',
    'build',
    'getByUid',
    'getByDom',
    'broadcast',
    'broadcastOn'
  ]);

  var NoContextApi = function (getComp) {
    var fail = function (event) {
      return function () {
        throw new Error('The component must be in a context to send: ' + event + '\n' + $_ap0k19y8jcfx5hay.element(getComp().element()) + ' is not in context.');
      };
    };
    return SystemApi({
      debugInfo: $_30v3piwajcfx5gy5.constant('fake'),
      triggerEvent: fail('triggerEvent'),
      triggerFocus: fail('triggerFocus'),
      triggerEscape: fail('triggerEscape'),
      build: fail('build'),
      addToWorld: fail('addToWorld'),
      removeFromWorld: fail('removeFromWorld'),
      addToGui: fail('addToGui'),
      removeFromGui: fail('removeFromGui'),
      getByUid: fail('getByUid'),
      getByDom: fail('getByDom'),
      broadcast: fail('broadcast'),
      broadcastOn: fail('broadcastOn')
    });
  };

  var byInnerKey = function (data, tuple) {
    var r = {};
    $_929ptpwzjcfx5h1b.each(data, function (detail, key) {
      $_929ptpwzjcfx5h1b.each(detail, function (value, indexKey) {
        var chain = $_42faa8x5jcfx5h3h.readOr(indexKey, [])(r);
        r[indexKey] = chain.concat([tuple(key, value)]);
      });
    });
    return r;
  };
  var $_7uiu0412rjcfx5ich = { byInnerKey: byInnerKey };

  var behaviourDom = function (name, modification) {
    return {
      name: $_30v3piwajcfx5gy5.constant(name),
      modification: modification
    };
  };
  var concat = function (chain, aspect) {
    var values = $_91ik4uw8jcfx5gxn.bind(chain, function (c) {
      return c.modification().getOr([]);
    });
    return $_5jjfpzx7jcfx5h3t.value($_42faa8x5jcfx5h3h.wrap(aspect, values));
  };
  var onlyOne = function (chain, aspect, order) {
    if (chain.length > 1)
      return $_5jjfpzx7jcfx5h3t.error('Multiple behaviours have tried to change DOM "' + aspect + '". The guilty behaviours are: ' + $_euz44nxejcfx5h51.stringify($_91ik4uw8jcfx5gxn.map(chain, function (b) {
        return b.name();
      })) + '. At this stage, this ' + 'is not supported. Future releases might provide strategies for resolving this.');
    else if (chain.length === 0)
      return $_5jjfpzx7jcfx5h3t.value({});
    else
      return $_5jjfpzx7jcfx5h3t.value(chain[0].modification().fold(function () {
        return {};
      }, function (m) {
        return $_42faa8x5jcfx5h3h.wrap(aspect, m);
      }));
  };
  var duplicate = function (aspect, k, obj, behaviours) {
    return $_5jjfpzx7jcfx5h3t.error('Mulitple behaviours have tried to change the _' + k + '_ "' + aspect + '"' + '. The guilty behaviours are: ' + $_euz44nxejcfx5h51.stringify($_91ik4uw8jcfx5gxn.bind(behaviours, function (b) {
      return b.modification().getOr({})[k] !== undefined ? [b.name()] : [];
    }), null, 2) + '. This is not currently supported.');
  };
  var safeMerge = function (chain, aspect) {
    var y = $_91ik4uw8jcfx5gxn.foldl(chain, function (acc, c) {
      var obj = c.modification().getOr({});
      return acc.bind(function (accRest) {
        var parts = $_929ptpwzjcfx5h1b.mapToArray(obj, function (v, k) {
          return accRest[k] !== undefined ? duplicate(aspect, k, obj, chain) : $_5jjfpzx7jcfx5h3t.value($_42faa8x5jcfx5h3h.wrap(k, v));
        });
        return $_42faa8x5jcfx5h3h.consolidate(parts, accRest);
      });
    }, $_5jjfpzx7jcfx5h3t.value({}));
    return y.map(function (yValue) {
      return $_42faa8x5jcfx5h3h.wrap(aspect, yValue);
    });
  };
  var mergeTypes = {
    classes: concat,
    attributes: safeMerge,
    styles: safeMerge,
    domChildren: onlyOne,
    defChildren: onlyOne,
    innerHtml: onlyOne,
    value: onlyOne
  };
  var combine$1 = function (info, baseMod, behaviours, base) {
    var behaviourDoms = $_cvmq7wxjcfx5h15.deepMerge({}, baseMod);
    $_91ik4uw8jcfx5gxn.each(behaviours, function (behaviour) {
      behaviourDoms[behaviour.name()] = behaviour.exhibit(info, base);
    });
    var byAspect = $_7uiu0412rjcfx5ich.byInnerKey(behaviourDoms, behaviourDom);
    var usedAspect = $_929ptpwzjcfx5h1b.map(byAspect, function (values, aspect) {
      return $_91ik4uw8jcfx5gxn.bind(values, function (value) {
        return value.modification().fold(function () {
          return [];
        }, function (v) {
          return [value];
        });
      });
    });
    var modifications = $_929ptpwzjcfx5h1b.mapToArray(usedAspect, function (values, aspect) {
      return $_42faa8x5jcfx5h3h.readOptFrom(mergeTypes, aspect).fold(function () {
        return $_5jjfpzx7jcfx5h3t.error('Unknown field type: ' + aspect);
      }, function (merger) {
        return merger(values, aspect);
      });
    });
    var consolidated = $_42faa8x5jcfx5h3h.consolidate(modifications, {});
    return consolidated.map($_1k6iv7xjjcfx5h5o.nu);
  };
  var $_1y36ra12qjcfx5ibz = { combine: combine$1 };

  var sortKeys = function (label, keyName, array, order) {
    var sliced = array.slice(0);
    try {
      var sorted = sliced.sort(function (a, b) {
        var aKey = a[keyName]();
        var bKey = b[keyName]();
        var aIndex = order.indexOf(aKey);
        var bIndex = order.indexOf(bKey);
        if (aIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + aKey + '.\nOrder specified: ' + $_euz44nxejcfx5h51.stringify(order, null, 2));
        if (bIndex === -1)
          throw new Error('The ordering for ' + label + ' does not have an entry for ' + bKey + '.\nOrder specified: ' + $_euz44nxejcfx5h51.stringify(order, null, 2));
        if (aIndex < bIndex)
          return -1;
        else if (bIndex < aIndex)
          return 1;
        else
          return 0;
      });
      return $_5jjfpzx7jcfx5h3t.value(sorted);
    } catch (err) {
      return $_5jjfpzx7jcfx5h3t.error([err]);
    }
  };
  var $_5a4oz12tjcfx5idc = { sortKeys: sortKeys };

  var nu$7 = function (handler, purpose) {
    return {
      handler: handler,
      purpose: $_30v3piwajcfx5gy5.constant(purpose)
    };
  };
  var curryArgs = function (descHandler, extraArgs) {
    return {
      handler: $_30v3piwajcfx5gy5.curry.apply(undefined, [descHandler.handler].concat(extraArgs)),
      purpose: descHandler.purpose
    };
  };
  var getHandler = function (descHandler) {
    return descHandler.handler;
  };
  var $_36d3fz12ujcfx5idh = {
    nu: nu$7,
    curryArgs: curryArgs,
    getHandler: getHandler
  };

  var behaviourTuple = function (name, handler) {
    return {
      name: $_30v3piwajcfx5gy5.constant(name),
      handler: $_30v3piwajcfx5gy5.constant(handler)
    };
  };
  var nameToHandlers = function (behaviours, info) {
    var r = {};
    $_91ik4uw8jcfx5gxn.each(behaviours, function (behaviour) {
      r[behaviour.name()] = behaviour.handlers(info);
    });
    return r;
  };
  var groupByEvents = function (info, behaviours, base) {
    var behaviourEvents = $_cvmq7wxjcfx5h15.deepMerge(base, nameToHandlers(behaviours, info));
    return $_7uiu0412rjcfx5ich.byInnerKey(behaviourEvents, behaviourTuple);
  };
  var combine$2 = function (info, eventOrder, behaviours, base) {
    var byEventName = groupByEvents(info, behaviours, base);
    return combineGroups(byEventName, eventOrder);
  };
  var assemble = function (rawHandler) {
    var handler = $_534bi9x0jcfx5h1i.read(rawHandler);
    return function (component, simulatedEvent) {
      var args = Array.prototype.slice.call(arguments, 0);
      if (handler.abort.apply(undefined, args)) {
        simulatedEvent.stop();
      } else if (handler.can.apply(undefined, args)) {
        handler.run.apply(undefined, args);
      }
    };
  };
  var missingOrderError = function (eventName, tuples) {
    return new $_5jjfpzx7jcfx5h3t.error(['The event (' + eventName + ') has more than one behaviour that listens to it.\nWhen this occurs, you must ' + 'specify an event ordering for the behaviours in your spec (e.g. [ "listing", "toggling" ]).\nThe behaviours that ' + 'can trigger it are: ' + $_euz44nxejcfx5h51.stringify($_91ik4uw8jcfx5gxn.map(tuples, function (c) {
        return c.name();
      }), null, 2)]);
  };
  var fuse$1 = function (tuples, eventOrder, eventName) {
    var order = eventOrder[eventName];
    if (!order)
      return missingOrderError(eventName, tuples);
    else
      return $_5a4oz12tjcfx5idc.sortKeys('Event: ' + eventName, 'name', tuples, order).map(function (sortedTuples) {
        var handlers = $_91ik4uw8jcfx5gxn.map(sortedTuples, function (tuple) {
          return tuple.handler();
        });
        return $_534bi9x0jcfx5h1i.fuse(handlers);
      });
  };
  var combineGroups = function (byEventName, eventOrder) {
    var r = $_929ptpwzjcfx5h1b.mapToArray(byEventName, function (tuples, eventName) {
      var combined = tuples.length === 1 ? $_5jjfpzx7jcfx5h3t.value(tuples[0].handler()) : fuse$1(tuples, eventOrder, eventName);
      return combined.map(function (handler) {
        var assembled = assemble(handler);
        var purpose = tuples.length > 1 ? $_91ik4uw8jcfx5gxn.filter(eventOrder, function (o) {
          return $_91ik4uw8jcfx5gxn.contains(tuples, function (t) {
            return t.name() === o;
          });
        }).join(' > ') : tuples[0].name();
        return $_42faa8x5jcfx5h3h.wrap(eventName, $_36d3fz12ujcfx5idh.nu(assembled, purpose));
      });
    });
    return $_42faa8x5jcfx5h3h.consolidate(r, {});
  };
  var $_7wxxzq12sjcfx5icn = { combine: combine$2 };

  var toInfo = function (spec) {
    return $_fj9y9nxgjcfx5h5a.asStruct('custom.definition', $_fj9y9nxgjcfx5h5a.objOfOnly([
      $_32l4p2x1jcfx5h1y.field('dom', 'dom', $_4dvdewx2jcfx5h25.strict(), $_fj9y9nxgjcfx5h5a.objOfOnly([
        $_32l4p2x1jcfx5h1y.strict('tag'),
        $_32l4p2x1jcfx5h1y.defaulted('styles', {}),
        $_32l4p2x1jcfx5h1y.defaulted('classes', []),
        $_32l4p2x1jcfx5h1y.defaulted('attributes', {}),
        $_32l4p2x1jcfx5h1y.option('value'),
        $_32l4p2x1jcfx5h1y.option('innerHtml')
      ])),
      $_32l4p2x1jcfx5h1y.strict('components'),
      $_32l4p2x1jcfx5h1y.strict('uid'),
      $_32l4p2x1jcfx5h1y.defaulted('events', {}),
      $_32l4p2x1jcfx5h1y.defaulted('apis', $_30v3piwajcfx5gy5.constant({})),
      $_32l4p2x1jcfx5h1y.field('eventOrder', 'eventOrder', $_4dvdewx2jcfx5h25.mergeWith({
        'alloy.execute': [
          'disabling',
          'alloy.base.behaviour',
          'toggling'
        ],
        'alloy.focus': [
          'alloy.base.behaviour',
          'focusing',
          'keying'
        ],
        'alloy.system.init': [
          'alloy.base.behaviour',
          'disabling',
          'toggling',
          'representing'
        ],
        'input': [
          'alloy.base.behaviour',
          'representing',
          'streaming',
          'invalidating'
        ],
        'alloy.system.detached': [
          'alloy.base.behaviour',
          'representing'
        ]
      }), $_fj9y9nxgjcfx5h5a.anyValue()),
      $_32l4p2x1jcfx5h1y.option('domModification'),
      $_7spjsaysjcfx5hd5.snapshot('originalSpec'),
      $_32l4p2x1jcfx5h1y.defaulted('debug.sketcher', 'unknown')
    ]), spec);
  };
  var getUid = function (info) {
    return $_42faa8x5jcfx5h3h.wrap($_c3fvkj10mjcfx5hqw.idAttr(), info.uid());
  };
  var toDefinition = function (info) {
    var base = {
      tag: info.dom().tag(),
      classes: info.dom().classes(),
      attributes: $_cvmq7wxjcfx5h15.deepMerge(getUid(info), info.dom().attributes()),
      styles: info.dom().styles(),
      domChildren: $_91ik4uw8jcfx5gxn.map(info.components(), function (comp) {
        return comp.element();
      })
    };
    return $_99lcf3xkjcfx5h64.nu($_cvmq7wxjcfx5h15.deepMerge(base, info.dom().innerHtml().map(function (h) {
      return $_42faa8x5jcfx5h3h.wrap('innerHtml', h);
    }).getOr({}), info.dom().value().map(function (h) {
      return $_42faa8x5jcfx5h3h.wrap('value', h);
    }).getOr({})));
  };
  var toModification = function (info) {
    return info.domModification().fold(function () {
      return $_1k6iv7xjjcfx5h5o.nu({});
    }, $_1k6iv7xjjcfx5h5o.nu);
  };
  var toApis = function (info) {
    return info.apis();
  };
  var toEvents = function (info) {
    return info.events();
  };
  var $_1t1yde12vjcfx5idk = {
    toInfo: toInfo,
    toDefinition: toDefinition,
    toModification: toModification,
    toApis: toApis,
    toEvents: toEvents
  };

  var add$3 = function (element, classes) {
    $_91ik4uw8jcfx5gxn.each(classes, function (x) {
      $_axxg6hxtjcfx5h7e.add(element, x);
    });
  };
  var remove$6 = function (element, classes) {
    $_91ik4uw8jcfx5gxn.each(classes, function (x) {
      $_axxg6hxtjcfx5h7e.remove(element, x);
    });
  };
  var toggle$3 = function (element, classes) {
    $_91ik4uw8jcfx5gxn.each(classes, function (x) {
      $_axxg6hxtjcfx5h7e.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_91ik4uw8jcfx5gxn.forall(classes, function (clazz) {
      return $_axxg6hxtjcfx5h7e.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_91ik4uw8jcfx5gxn.exists(classes, function (clazz) {
      return $_axxg6hxtjcfx5h7e.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$10 = function (element) {
    return $_14wfb4xxjcfx5h8e.supports(element) ? getNative(element) : $_14wfb4xxjcfx5h8e.get(element);
  };
  var $_aym9qo12xjcfx5iep = {
    add: add$3,
    remove: remove$6,
    toggle: toggle$3,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$10
  };

  var getChildren = function (definition) {
    if (definition.domChildren().isSome() && definition.defChildren().isSome()) {
      throw new Error('Cannot specify children and child specs! Must be one or the other.\nDef: ' + $_99lcf3xkjcfx5h64.defToStr(definition));
    } else {
      return definition.domChildren().fold(function () {
        var defChildren = definition.defChildren().getOr([]);
        return $_91ik4uw8jcfx5gxn.map(defChildren, renderDef);
      }, function (domChildren) {
        return domChildren;
      });
    }
  };
  var renderToDom = function (definition) {
    var subject = $_6k7v3dwsjcfx5h08.fromTag(definition.tag());
    $_8bne1yxvjcfx5h7n.setAll(subject, definition.attributes().getOr({}));
    $_aym9qo12xjcfx5iep.add(subject, definition.classes().getOr([]));
    $_3wulrizrjcfx5him.setAll(subject, definition.styles().getOr({}));
    $_1fdcs6yajcfx5hb6.set(subject, definition.innerHtml().getOr(''));
    var children = getChildren(definition);
    $_cn3np4y5jcfx5hai.append(subject, children);
    definition.value().each(function (value) {
      $_acubdd11zjcfx5i3g.set(subject, value);
    });
    return subject;
  };
  var renderDef = function (spec) {
    var definition = $_99lcf3xkjcfx5h64.nu(spec);
    return renderToDom(definition);
  };
  var $_5adf8x12wjcfx5ie7 = { renderToDom: renderToDom };

  var build$1 = function (spec) {
    var getMe = function () {
      return me;
    };
    var systemApi = Cell(NoContextApi(getMe));
    var info = $_fj9y9nxgjcfx5h5a.getOrDie($_1t1yde12vjcfx5idk.toInfo($_cvmq7wxjcfx5h15.deepMerge(spec, { behaviours: undefined })));
    var bBlob = $_79nyyq12ljcfx5ib4.generate(spec);
    var bList = $_bkt96o12mjcfx5ibb.getBehaviours(bBlob);
    var bData = $_bkt96o12mjcfx5ibb.getData(bBlob);
    var definition = $_1t1yde12vjcfx5idk.toDefinition(info);
    var baseModification = { 'alloy.base.modification': $_1t1yde12vjcfx5idk.toModification(info) };
    var modification = $_1y36ra12qjcfx5ibz.combine(bData, baseModification, bList, definition).getOrDie();
    var modDefinition = $_1k6iv7xjjcfx5h5o.merge(definition, modification);
    var item = $_5adf8x12wjcfx5ie7.renderToDom(modDefinition);
    var baseEvents = { 'alloy.base.behaviour': $_1t1yde12vjcfx5idk.toEvents(info) };
    var events = $_7wxxzq12sjcfx5icn.combine(bData, info.eventOrder(), bList, baseEvents).getOrDie();
    var subcomponents = Cell(info.components());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(getMe));
    };
    var syncComponents = function () {
      var children = $_bke8thy2jcfx5h9w.children(item);
      var subs = $_91ik4uw8jcfx5gxn.bind(children, function (child) {
        return systemApi.get().getByDom(child).fold(function () {
          return [];
        }, function (c) {
          return [c];
        });
      });
      subcomponents.set(subs);
    };
    var config = function (behaviour) {
      if (behaviour === $_9s15br10ejcfx5hnm.apiConfig())
        return info.apis();
      var b = bData;
      var f = $_7mrhymwyjcfx5h18.isFunction(b[behaviour.name()]) ? b[behaviour.name()] : function () {
        throw new Error('Could not find ' + behaviour.name() + ' in ' + $_euz44nxejcfx5h51.stringify(spec, null, 2));
      };
      return f();
    };
    var hasConfigured = function (behaviour) {
      return $_7mrhymwyjcfx5h18.isFunction(bData[behaviour.name()]);
    };
    var readState = function (behaviourName) {
      return bData[behaviourName]().map(function (b) {
        return b.state.readState();
      }).getOr('not enabled');
    };
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: config,
      hasConfigured: hasConfigured,
      spec: $_30v3piwajcfx5gy5.constant(spec),
      readState: readState,
      connect: connect,
      disconnect: disconnect,
      element: $_30v3piwajcfx5gy5.constant(item),
      syncComponents: syncComponents,
      components: subcomponents.get,
      events: $_30v3piwajcfx5gy5.constant(events)
    });
    return me;
  };
  var $_7887o012kjcfx5iam = { build: build$1 };

  var isRecursive = function (component, originator, target) {
    return $_7yb5g2w7jcfx5gx7.eq(originator, component.element()) && !$_7yb5g2w7jcfx5gx7.eq(originator, target);
  };
  var $_dznvmc12yjcfx5iev = {
    events: $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.can($_fe7kcdwvjcfx5h0s.focus(), function (component, simulatedEvent) {
        var originator = simulatedEvent.event().originator();
        var target = simulatedEvent.event().target();
        if (isRecursive(component, originator, target)) {
          console.warn($_fe7kcdwvjcfx5h0s.focus() + ' did not get interpreted by the desired target. ' + '\nOriginator: ' + $_ap0k19y8jcfx5hay.element(originator) + '\nTarget: ' + $_ap0k19y8jcfx5hay.element(target) + '\nCheck the ' + $_fe7kcdwvjcfx5h0s.focus() + ' event handlers');
          return false;
        } else {
          return true;
        }
      })])
  };

  var make$1 = function (spec) {
    return spec;
  };
  var $_elbv2n12zjcfx5if0 = { make: make$1 };

  var buildSubcomponents = function (spec) {
    var components = $_42faa8x5jcfx5h3h.readOr('components', [])(spec);
    return $_91ik4uw8jcfx5gxn.map(components, build);
  };
  var buildFromSpec = function (userSpec) {
    var spec = $_elbv2n12zjcfx5if0.make(userSpec);
    var components = buildSubcomponents(spec);
    var completeSpec = $_cvmq7wxjcfx5h15.deepMerge($_dznvmc12yjcfx5iev, spec, $_42faa8x5jcfx5h3h.wrap('components', components));
    return $_5jjfpzx7jcfx5h3t.value($_7887o012kjcfx5iam.build(completeSpec));
  };
  var text = function (textContent) {
    var element = $_6k7v3dwsjcfx5h08.fromText(textContent);
    return external({ element: element });
  };
  var external = function (spec) {
    var extSpec = $_fj9y9nxgjcfx5h5a.asStructOrDie('external.component', $_fj9y9nxgjcfx5h5a.objOfOnly([
      $_32l4p2x1jcfx5h1y.strict('element'),
      $_32l4p2x1jcfx5h1y.option('uid')
    ]), spec);
    var systemApi = Cell(NoContextApi());
    var connect = function (newApi) {
      systemApi.set(newApi);
    };
    var disconnect = function () {
      systemApi.set(NoContextApi(function () {
        return me;
      }));
    };
    extSpec.uid().each(function (uid) {
      $_ftkrhf10ljcfx5hqd.writeOnly(extSpec.element(), uid);
    });
    var me = ComponentApi({
      getSystem: systemApi.get,
      config: $_8i7mfvw9jcfx5gxw.none,
      hasConfigured: $_30v3piwajcfx5gy5.constant(false),
      connect: connect,
      disconnect: disconnect,
      element: $_30v3piwajcfx5gy5.constant(extSpec.element()),
      spec: $_30v3piwajcfx5gy5.constant(spec),
      readState: $_30v3piwajcfx5gy5.constant('No state'),
      syncComponents: $_30v3piwajcfx5gy5.noop,
      components: $_30v3piwajcfx5gy5.constant([]),
      events: $_30v3piwajcfx5gy5.constant({})
    });
    return $_9s15br10ejcfx5hnm.premade(me);
  };
  var build = function (rawUserSpec) {
    return $_9s15br10ejcfx5hnm.getPremade(rawUserSpec).fold(function () {
      var userSpecWithUid = $_cvmq7wxjcfx5h15.deepMerge({ uid: $_ftkrhf10ljcfx5hqd.generate('') }, rawUserSpec);
      return buildFromSpec(userSpecWithUid).getOrDie();
    }, function (prebuilt) {
      return prebuilt;
    });
  };
  var $_f8qap712jjcfx5i9p = {
    build: build,
    premade: $_9s15br10ejcfx5hnm.premade,
    external: external,
    text: text
  };

  var hoverEvent = 'alloy.item-hover';
  var focusEvent = 'alloy.item-focus';
  var onHover = function (item) {
    if ($_dzy0lsyfjcfx5hbi.search(item.element()).isNone() || Focusing.isFocused(item)) {
      if (!Focusing.isFocused(item))
        Focusing.focus(item);
      $_7pg78vwujcfx5h0i.emitWith(item, hoverEvent, { item: item });
    }
  };
  var onFocus = function (item) {
    $_7pg78vwujcfx5h0i.emitWith(item, focusEvent, { item: item });
  };
  var $_5ipi76133jcfx5ifm = {
    hover: $_30v3piwajcfx5gy5.constant(hoverEvent),
    focus: $_30v3piwajcfx5gy5.constant(focusEvent),
    onHover: onHover,
    onFocus: onFocus
  };

  var builder = function (info) {
    return {
      dom: $_cvmq7wxjcfx5h15.deepMerge(info.dom(), { attributes: { role: info.toggling().isSome() ? 'menuitemcheckbox' : 'menuitem' } }),
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
        info.toggling().fold(Toggling.revoke, function (tConfig) {
          return Toggling.config($_cvmq7wxjcfx5h15.deepMerge({ aria: { mode: 'checked' } }, tConfig));
        }),
        Focusing.config({
          ignore: info.ignoreFocus(),
          onFocus: function (component) {
            $_5ipi76133jcfx5ifm.onFocus(component);
          }
        }),
        Keying.config({ mode: 'execution' }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        })
      ]), info.itemBehaviours()),
      events: $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.runWithTarget($_fe7kcdwvjcfx5h0s.tapOrClick(), $_7pg78vwujcfx5h0i.emitExecute),
        $_286fidw5jcfx5gwv.cutter($_7eoluuwwjcfx5h0z.mousedown()),
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mouseover(), $_5ipi76133jcfx5ifm.onHover),
        $_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.focusItem(), Focusing.focus)
      ]),
      components: info.components(),
      domModification: info.domModification()
    };
  };
  var schema$11 = [
    $_32l4p2x1jcfx5h1y.strict('data'),
    $_32l4p2x1jcfx5h1y.strict('components'),
    $_32l4p2x1jcfx5h1y.strict('dom'),
    $_32l4p2x1jcfx5h1y.option('toggling'),
    $_32l4p2x1jcfx5h1y.defaulted('itemBehaviours', {}),
    $_32l4p2x1jcfx5h1y.defaulted('ignoreFocus', false),
    $_32l4p2x1jcfx5h1y.defaulted('domModification', {}),
    $_7spjsaysjcfx5hd5.output('builder', builder)
  ];

  var builder$1 = function (detail) {
    return {
      dom: detail.dom(),
      components: detail.components(),
      events: $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.stopper($_fe7kcdwvjcfx5h0s.focusItem())])
    };
  };
  var schema$12 = [
    $_32l4p2x1jcfx5h1y.strict('dom'),
    $_32l4p2x1jcfx5h1y.strict('components'),
    $_7spjsaysjcfx5hd5.output('builder', builder$1)
  ];

  var owner$2 = 'item-widget';
  var partTypes = [$_9leb2110jjcfx5hp6.required({
      name: 'widget',
      overrides: function (detail) {
        return {
          behaviours: $_7uu47fw3jcfx5gvw.derive([me.config({
              store: {
                mode: 'manual',
                getValue: function (component) {
                  return detail.data();
                },
                setValue: function () {
                }
              }
            })])
        };
      }
    })];
  var $_2g0j7h136jcfx5ig6 = {
    owner: $_30v3piwajcfx5gy5.constant(owner$2),
    parts: $_30v3piwajcfx5gy5.constant(partTypes)
  };

  var builder$2 = function (info) {
    var subs = $_8uasnh10hjcfx5hob.substitutes($_2g0j7h136jcfx5ig6.owner(), info, $_2g0j7h136jcfx5ig6.parts());
    var components = $_8uasnh10hjcfx5hob.components($_2g0j7h136jcfx5ig6.owner(), info, subs.internals());
    var focusWidget = function (component) {
      return $_8uasnh10hjcfx5hob.getPart(component, info, 'widget').map(function (widget) {
        Keying.focusIn(widget);
        return widget;
      });
    };
    var onHorizontalArrow = function (component, simulatedEvent) {
      return $_6fu8iuzwjcfx5hjj.inside(simulatedEvent.event().target()) ? $_8i7mfvw9jcfx5gxw.none() : function () {
        if (info.autofocus()) {
          simulatedEvent.setSource(component.element());
          return $_8i7mfvw9jcfx5gxw.none();
        } else {
          return $_8i7mfvw9jcfx5gxw.none();
        }
      }();
    };
    return $_cvmq7wxjcfx5h15.deepMerge({
      dom: info.dom(),
      components: components,
      domModification: info.domModification(),
      events: $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.runOnExecute(function (component, simulatedEvent) {
          focusWidget(component).each(function (widget) {
            simulatedEvent.stop();
          });
        }),
        $_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.mouseover(), $_5ipi76133jcfx5ifm.onHover),
        $_286fidw5jcfx5gwv.run($_fe7kcdwvjcfx5h0s.focusItem(), function (component, simulatedEvent) {
          if (info.autofocus())
            focusWidget(component);
          else
            Focusing.focus(component);
        })
      ]),
      behaviours: $_7uu47fw3jcfx5gvw.derive([
        me.config({
          store: {
            mode: 'memory',
            initialValue: info.data()
          }
        }),
        Focusing.config({
          onFocus: function (component) {
            $_5ipi76133jcfx5ifm.onFocus(component);
          }
        }),
        Keying.config({
          mode: 'special',
          onLeft: onHorizontalArrow,
          onRight: onHorizontalArrow,
          onEscape: function (component, simulatedEvent) {
            if (!Focusing.isFocused(component) && !info.autofocus()) {
              Focusing.focus(component);
              return $_8i7mfvw9jcfx5gxw.some(true);
            } else if (info.autofocus()) {
              simulatedEvent.setSource(component.element());
              return $_8i7mfvw9jcfx5gxw.none();
            } else {
              return $_8i7mfvw9jcfx5gxw.none();
            }
          }
        })
      ])
    });
  };
  var schema$13 = [
    $_32l4p2x1jcfx5h1y.strict('uid'),
    $_32l4p2x1jcfx5h1y.strict('data'),
    $_32l4p2x1jcfx5h1y.strict('components'),
    $_32l4p2x1jcfx5h1y.strict('dom'),
    $_32l4p2x1jcfx5h1y.defaulted('autofocus', false),
    $_32l4p2x1jcfx5h1y.defaulted('domModification', {}),
    $_8uasnh10hjcfx5hob.defaultUidsSchema($_2g0j7h136jcfx5ig6.parts()),
    $_7spjsaysjcfx5hd5.output('builder', builder$2)
  ];

  var itemSchema$1 = $_fj9y9nxgjcfx5h5a.choose('type', {
    widget: schema$13,
    item: schema$11,
    separator: schema$12
  });
  var configureGrid = function (detail, movementInfo) {
    return {
      mode: 'flatgrid',
      selector: '.' + detail.markers().item(),
      initSize: {
        numColumns: movementInfo.initSize().numColumns(),
        numRows: movementInfo.initSize().numRows()
      },
      focusManager: detail.focusManager()
    };
  };
  var configureMenu = function (detail, movementInfo) {
    return {
      mode: 'menu',
      selector: '.' + detail.markers().item(),
      moveOnTab: movementInfo.moveOnTab(),
      focusManager: detail.focusManager()
    };
  };
  var parts = [$_9leb2110jjcfx5hp6.group({
      factory: {
        sketch: function (spec) {
          var itemInfo = $_fj9y9nxgjcfx5h5a.asStructOrDie('menu.spec item', itemSchema$1, spec);
          return itemInfo.builder()(itemInfo);
        }
      },
      name: 'items',
      unit: 'item',
      defaults: function (detail, u) {
        var fallbackUid = $_ftkrhf10ljcfx5hqd.generate('');
        return $_cvmq7wxjcfx5h15.deepMerge({ uid: fallbackUid }, u);
      },
      overrides: function (detail, u) {
        return {
          type: u.type,
          ignoreFocus: detail.fakeFocus(),
          domModification: { classes: [detail.markers().item()] }
        };
      }
    })];
  var schema$10 = [
    $_32l4p2x1jcfx5h1y.strict('value'),
    $_32l4p2x1jcfx5h1y.strict('items'),
    $_32l4p2x1jcfx5h1y.strict('dom'),
    $_32l4p2x1jcfx5h1y.strict('components'),
    $_32l4p2x1jcfx5h1y.defaulted('eventOrder', {}),
    $_ijaov10cjcfx5hn2.field('menuBehaviours', [
      Highlighting,
      me,
      Composing,
      Keying
    ]),
    $_32l4p2x1jcfx5h1y.defaultedOf('movement', {
      mode: 'menu',
      moveOnTab: true
    }, $_fj9y9nxgjcfx5h5a.choose('mode', {
      grid: [
        $_7spjsaysjcfx5hd5.initSize(),
        $_7spjsaysjcfx5hd5.output('config', configureGrid)
      ],
      menu: [
        $_32l4p2x1jcfx5h1y.defaulted('moveOnTab', true),
        $_7spjsaysjcfx5hd5.output('config', configureMenu)
      ]
    })),
    $_7spjsaysjcfx5hd5.itemMarkers(),
    $_32l4p2x1jcfx5h1y.defaulted('fakeFocus', false),
    $_32l4p2x1jcfx5h1y.defaulted('focusManager', $_1jbe2hzfjcfx5hh4.dom()),
    $_7spjsaysjcfx5hd5.onHandler('onHighlight')
  ];
  var $_byitf3131jcfx5if5 = {
    name: $_30v3piwajcfx5gy5.constant('Menu'),
    schema: $_30v3piwajcfx5gy5.constant(schema$10),
    parts: $_30v3piwajcfx5gy5.constant(parts)
  };

  var focusEvent$1 = 'alloy.menu-focus';
  var $_fg223138jcfx5igi = { focus: $_30v3piwajcfx5gy5.constant(focusEvent$1) };

  var make$2 = function (detail, components, spec, externals) {
    return $_cvmq7wxjcfx5h15.deepMerge({
      dom: $_cvmq7wxjcfx5h15.deepMerge(detail.dom(), { attributes: { role: 'menu' } }),
      uid: detail.uid(),
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
        Highlighting.config({
          highlightClass: detail.markers().selectedItem(),
          itemClass: detail.markers().item(),
          onHighlight: detail.onHighlight()
        }),
        me.config({
          store: {
            mode: 'memory',
            initialValue: detail.value()
          }
        }),
        Composing.config({ find: $_30v3piwajcfx5gy5.identity }),
        Keying.config(detail.movement().config()(detail, detail.movement()))
      ]), $_ijaov10cjcfx5hn2.get(detail.menuBehaviours())),
      events: $_286fidw5jcfx5gwv.derive([
        $_286fidw5jcfx5gwv.run($_5ipi76133jcfx5ifm.focus(), function (menu, simulatedEvent) {
          var event = simulatedEvent.event();
          menu.getSystem().getByDom(event.target()).each(function (item) {
            Highlighting.highlight(menu, item);
            simulatedEvent.stop();
            $_7pg78vwujcfx5h0i.emitWith(menu, $_fg223138jcfx5igi.focus(), {
              menu: menu,
              item: item
            });
          });
        }),
        $_286fidw5jcfx5gwv.run($_5ipi76133jcfx5ifm.hover(), function (menu, simulatedEvent) {
          var item = simulatedEvent.event().item();
          Highlighting.highlight(menu, item);
        })
      ]),
      components: components,
      eventOrder: detail.eventOrder()
    });
  };
  var $_2doj6f137jcfx5igb = { make: make$2 };

  var Menu = $_3wo7ba10djcfx5hna.composite({
    name: 'Menu',
    configFields: $_byitf3131jcfx5if5.schema(),
    partFields: $_byitf3131jcfx5if5.parts(),
    factory: $_2doj6f137jcfx5igb.make
  });

  var preserve$2 = function (f, container) {
    var ownerDoc = $_bke8thy2jcfx5h9w.owner(container);
    var refocus = $_dzy0lsyfjcfx5hbi.active(ownerDoc).bind(function (focused) {
      var hasFocus = function (elem) {
        return $_7yb5g2w7jcfx5gx7.eq(focused, elem);
      };
      return hasFocus(container) ? $_8i7mfvw9jcfx5gxw.some(container) : $_94hxagyhjcfx5hbo.descendant(container, hasFocus);
    });
    var result = f(container);
    refocus.each(function (oldFocus) {
      $_dzy0lsyfjcfx5hbi.active(ownerDoc).filter(function (newFocus) {
        return $_7yb5g2w7jcfx5gx7.eq(newFocus, oldFocus);
      }).orThunk(function () {
        $_dzy0lsyfjcfx5hbi.focus(oldFocus);
      });
    });
    return result;
  };
  var $_1uadpb13cjcfx5ih0 = { preserve: preserve$2 };

  var set$7 = function (component, replaceConfig, replaceState, data) {
    $_f1qsy3y0jcfx5h99.detachChildren(component);
    $_1uadpb13cjcfx5ih0.preserve(function () {
      var children = $_91ik4uw8jcfx5gxn.map(data, component.getSystem().build);
      $_91ik4uw8jcfx5gxn.each(children, function (l) {
        $_f1qsy3y0jcfx5h99.attach(component, l);
      });
    }, component.element());
  };
  var insert = function (component, replaceConfig, insertion, childSpec) {
    var child = component.getSystem().build(childSpec);
    $_f1qsy3y0jcfx5h99.attachWith(component, child, insertion);
  };
  var append$2 = function (component, replaceConfig, replaceState, appendee) {
    insert(component, replaceConfig, $_1g0by4y1jcfx5h9q.append, appendee);
  };
  var prepend$2 = function (component, replaceConfig, replaceState, prependee) {
    insert(component, replaceConfig, $_1g0by4y1jcfx5h9q.prepend, prependee);
  };
  var remove$7 = function (component, replaceConfig, replaceState, removee) {
    var children = contents(component, replaceConfig);
    var foundChild = $_91ik4uw8jcfx5gxn.find(children, function (child) {
      return $_7yb5g2w7jcfx5gx7.eq(removee.element(), child.element());
    });
    foundChild.each($_f1qsy3y0jcfx5h99.detach);
  };
  var contents = function (component, replaceConfig) {
    return component.components();
  };
  var $_ctw7em13bjcfx5igu = {
    append: append$2,
    prepend: prepend$2,
    remove: remove$7,
    set: set$7,
    contents: contents
  };

  var Replacing = $_7uu47fw3jcfx5gvw.create({
    fields: [],
    name: 'replacing',
    apis: $_ctw7em13bjcfx5igu
  });

  var transpose = function (obj) {
    return $_929ptpwzjcfx5h1b.tupleMap(obj, function (v, k) {
      return {
        k: v,
        v: k
      };
    });
  };
  var trace = function (items, byItem, byMenu, finish) {
    return $_42faa8x5jcfx5h3h.readOptFrom(byMenu, finish).bind(function (triggerItem) {
      return $_42faa8x5jcfx5h3h.readOptFrom(items, triggerItem).bind(function (triggerMenu) {
        var rest = trace(items, byItem, byMenu, triggerMenu);
        return $_8i7mfvw9jcfx5gxw.some([triggerMenu].concat(rest));
      });
    }).getOr([]);
  };
  var generate$5 = function (menus, expansions) {
    var items = {};
    $_929ptpwzjcfx5h1b.each(menus, function (menuItems, menu) {
      $_91ik4uw8jcfx5gxn.each(menuItems, function (item) {
        items[item] = menu;
      });
    });
    var byItem = expansions;
    var byMenu = transpose(expansions);
    var menuPaths = $_929ptpwzjcfx5h1b.map(byMenu, function (triggerItem, submenu) {
      return [submenu].concat(trace(items, byItem, byMenu, submenu));
    });
    return $_929ptpwzjcfx5h1b.map(items, function (path) {
      return $_42faa8x5jcfx5h3h.readOptFrom(menuPaths, path).getOr([path]);
    });
  };
  var $_cvnmxi13fjcfx5iih = { generate: generate$5 };

  var LayeredState = function () {
    var expansions = Cell({});
    var menus = Cell({});
    var paths = Cell({});
    var primary = Cell($_8i7mfvw9jcfx5gxw.none());
    var toItemValues = Cell($_30v3piwajcfx5gy5.constant([]));
    var clear = function () {
      expansions.set({});
      menus.set({});
      paths.set({});
      primary.set($_8i7mfvw9jcfx5gxw.none());
    };
    var isClear = function () {
      return primary.get().isNone();
    };
    var setContents = function (sPrimary, sMenus, sExpansions, sToItemValues) {
      primary.set($_8i7mfvw9jcfx5gxw.some(sPrimary));
      expansions.set(sExpansions);
      menus.set(sMenus);
      toItemValues.set(sToItemValues);
      var menuValues = sToItemValues(sMenus);
      var sPaths = $_cvnmxi13fjcfx5iih.generate(menuValues, sExpansions);
      paths.set(sPaths);
    };
    var expand = function (itemValue) {
      return $_42faa8x5jcfx5h3h.readOptFrom(expansions.get(), itemValue).map(function (menu) {
        var current = $_42faa8x5jcfx5h3h.readOptFrom(paths.get(), itemValue).getOr([]);
        return [menu].concat(current);
      });
    };
    var collapse = function (itemValue) {
      return $_42faa8x5jcfx5h3h.readOptFrom(paths.get(), itemValue).bind(function (path) {
        return path.length > 1 ? $_8i7mfvw9jcfx5gxw.some(path.slice(1)) : $_8i7mfvw9jcfx5gxw.none();
      });
    };
    var refresh = function (itemValue) {
      return $_42faa8x5jcfx5h3h.readOptFrom(paths.get(), itemValue);
    };
    var lookupMenu = function (menuValue) {
      return $_42faa8x5jcfx5h3h.readOptFrom(menus.get(), menuValue);
    };
    var otherMenus = function (path) {
      var menuValues = toItemValues.get()(menus.get());
      return $_91ik4uw8jcfx5gxn.difference($_929ptpwzjcfx5h1b.keys(menuValues), path);
    };
    var getPrimary = function () {
      return primary.get().bind(lookupMenu);
    };
    var getMenus = function () {
      return menus.get();
    };
    return {
      setContents: setContents,
      expand: expand,
      refresh: refresh,
      collapse: collapse,
      lookupMenu: lookupMenu,
      otherMenus: otherMenus,
      getPrimary: getPrimary,
      getMenus: getMenus,
      clear: clear,
      isClear: isClear
    };
  };

  var make$3 = function (detail, rawUiSpec) {
    var buildMenus = function (container, menus) {
      return $_929ptpwzjcfx5h1b.map(menus, function (spec, name) {
        var data = Menu.sketch($_cvmq7wxjcfx5h15.deepMerge(spec, {
          value: name,
          items: spec.items,
          markers: $_42faa8x5jcfx5h3h.narrow(rawUiSpec.markers, [
            'item',
            'selectedItem'
          ]),
          fakeFocus: detail.fakeFocus(),
          onHighlight: detail.onHighlight(),
          focusManager: detail.fakeFocus() ? $_1jbe2hzfjcfx5hh4.highlights() : $_1jbe2hzfjcfx5hh4.dom()
        }));
        return container.getSystem().build(data);
      });
    };
    var state = LayeredState();
    var setup = function (container) {
      var componentMap = buildMenus(container, detail.data().menus());
      state.setContents(detail.data().primary(), componentMap, detail.data().expansions(), function (sMenus) {
        return toMenuValues(container, sMenus);
      });
      return state.getPrimary();
    };
    var getItemValue = function (item) {
      return me.getValue(item).value;
    };
    var toMenuValues = function (container, sMenus) {
      return $_929ptpwzjcfx5h1b.map(detail.data().menus(), function (data, menuName) {
        return $_91ik4uw8jcfx5gxn.bind(data.items, function (item) {
          return item.type === 'separator' ? [] : [item.data.value];
        });
      });
    };
    var setActiveMenu = function (container, menu) {
      Highlighting.highlight(container, menu);
      Highlighting.getHighlighted(menu).orThunk(function () {
        return Highlighting.getFirst(menu);
      }).each(function (item) {
        $_7pg78vwujcfx5h0i.dispatch(container, item.element(), $_fe7kcdwvjcfx5h0s.focusItem());
      });
    };
    var getMenus = function (state, menuValues) {
      return $_g8j28lydjcfx5hbe.cat($_91ik4uw8jcfx5gxn.map(menuValues, state.lookupMenu));
    };
    var updateMenuPath = function (container, state, path) {
      return $_8i7mfvw9jcfx5gxw.from(path[0]).bind(state.lookupMenu).map(function (activeMenu) {
        var rest = getMenus(state, path.slice(1));
        $_91ik4uw8jcfx5gxn.each(rest, function (r) {
          $_axxg6hxtjcfx5h7e.add(r.element(), detail.markers().backgroundMenu());
        });
        if (!$_5392z2y6jcfx5hal.inBody(activeMenu.element())) {
          Replacing.append(container, $_f8qap712jjcfx5i9p.premade(activeMenu));
        }
        $_aym9qo12xjcfx5iep.remove(activeMenu.element(), [detail.markers().backgroundMenu()]);
        setActiveMenu(container, activeMenu);
        var others = getMenus(state, state.otherMenus(path));
        $_91ik4uw8jcfx5gxn.each(others, function (o) {
          $_aym9qo12xjcfx5iep.remove(o.element(), [detail.markers().backgroundMenu()]);
          if (!detail.stayInDom())
            Replacing.remove(container, o);
        });
        return activeMenu;
      });
    };
    var expandRight = function (container, item) {
      var value = getItemValue(item);
      return state.expand(value).bind(function (path) {
        $_8i7mfvw9jcfx5gxw.from(path[0]).bind(state.lookupMenu).each(function (activeMenu) {
          if (!$_5392z2y6jcfx5hal.inBody(activeMenu.element())) {
            Replacing.append(container, $_f8qap712jjcfx5i9p.premade(activeMenu));
          }
          detail.onOpenSubmenu()(container, item, activeMenu);
          Highlighting.highlightFirst(activeMenu);
        });
        return updateMenuPath(container, state, path);
      });
    };
    var collapseLeft = function (container, item) {
      var value = getItemValue(item);
      return state.collapse(value).bind(function (path) {
        return updateMenuPath(container, state, path).map(function (activeMenu) {
          detail.onCollapseMenu()(container, item, activeMenu);
          return activeMenu;
        });
      });
    };
    var updateView = function (container, item) {
      var value = getItemValue(item);
      return state.refresh(value).bind(function (path) {
        return updateMenuPath(container, state, path);
      });
    };
    var onRight = function (container, item) {
      return $_6fu8iuzwjcfx5hjj.inside(item.element()) ? $_8i7mfvw9jcfx5gxw.none() : expandRight(container, item);
    };
    var onLeft = function (container, item) {
      return $_6fu8iuzwjcfx5hjj.inside(item.element()) ? $_8i7mfvw9jcfx5gxw.none() : collapseLeft(container, item);
    };
    var onEscape = function (container, item) {
      return collapseLeft(container, item).orThunk(function () {
        return detail.onEscape()(container, item);
      });
    };
    var keyOnItem = function (f) {
      return function (container, simulatedEvent) {
        return $_ccmao7zljcfx5hhv.closest(simulatedEvent.getSource(), '.' + detail.markers().item()).bind(function (target) {
          return container.getSystem().getByDom(target).bind(function (item) {
            return f(container, item);
          });
        });
      };
    };
    var events = $_286fidw5jcfx5gwv.derive([
      $_286fidw5jcfx5gwv.run($_fg223138jcfx5igi.focus(), function (sandbox, simulatedEvent) {
        var menu = simulatedEvent.event().menu();
        Highlighting.highlight(sandbox, menu);
      }),
      $_286fidw5jcfx5gwv.runOnExecute(function (sandbox, simulatedEvent) {
        var target = simulatedEvent.event().target();
        return sandbox.getSystem().getByDom(target).bind(function (item) {
          var itemValue = getItemValue(item);
          if (itemValue.indexOf('collapse-item') === 0) {
            return collapseLeft(sandbox, item);
          }
          return expandRight(sandbox, item).orThunk(function () {
            return detail.onExecute()(sandbox, item);
          });
        });
      }),
      $_286fidw5jcfx5gwv.runOnAttached(function (container, simulatedEvent) {
        setup(container).each(function (primary) {
          Replacing.append(container, $_f8qap712jjcfx5i9p.premade(primary));
          if (detail.openImmediately()) {
            setActiveMenu(container, primary);
            detail.onOpenMenu()(container, primary);
          }
        });
      })
    ].concat(detail.navigateOnHover() ? [$_286fidw5jcfx5gwv.run($_5ipi76133jcfx5ifm.hover(), function (sandbox, simulatedEvent) {
        var item = simulatedEvent.event().item();
        updateView(sandbox, item);
        expandRight(sandbox, item);
        detail.onHover()(sandbox, item);
      })] : []));
    var collapseMenuApi = function (container) {
      Highlighting.getHighlighted(container).each(function (currentMenu) {
        Highlighting.getHighlighted(currentMenu).each(function (currentItem) {
          collapseLeft(container, currentItem);
        });
      });
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([
        Keying.config({
          mode: 'special',
          onRight: keyOnItem(onRight),
          onLeft: keyOnItem(onLeft),
          onEscape: keyOnItem(onEscape),
          focusIn: function (container, keyInfo) {
            state.getPrimary().each(function (primary) {
              $_7pg78vwujcfx5h0i.dispatch(container, primary.element(), $_fe7kcdwvjcfx5h0s.focusItem());
            });
          }
        }),
        Highlighting.config({
          highlightClass: detail.markers().selectedMenu(),
          itemClass: detail.markers().menu()
        }),
        Composing.config({
          find: function (container) {
            return Highlighting.getHighlighted(container);
          }
        }),
        Replacing.config({})
      ]), $_ijaov10cjcfx5hn2.get(detail.tmenuBehaviours())),
      eventOrder: detail.eventOrder(),
      apis: { collapseMenu: collapseMenuApi },
      events: events
    };
  };
  var $_184hkg13djcfx5ihb = {
    make: make$3,
    collapseItem: $_30v3piwajcfx5gy5.constant('collapse-item')
  };

  var tieredData = function (primary, menus, expansions) {
    return {
      primary: primary,
      menus: menus,
      expansions: expansions
    };
  };
  var singleData = function (name, menu) {
    return {
      primary: name,
      menus: $_42faa8x5jcfx5h3h.wrap(name, menu),
      expansions: {}
    };
  };
  var collapseItem = function (text) {
    return {
      value: $_4yc6r610fjcfx5ho0.generate($_184hkg13djcfx5ihb.collapseItem()),
      text: text
    };
  };
  var TieredMenu = $_3wo7ba10djcfx5hna.single({
    name: 'TieredMenu',
    configFields: [
      $_7spjsaysjcfx5hd5.onStrictKeyboardHandler('onExecute'),
      $_7spjsaysjcfx5hd5.onStrictKeyboardHandler('onEscape'),
      $_7spjsaysjcfx5hd5.onStrictHandler('onOpenMenu'),
      $_7spjsaysjcfx5hd5.onStrictHandler('onOpenSubmenu'),
      $_7spjsaysjcfx5hd5.onHandler('onCollapseMenu'),
      $_32l4p2x1jcfx5h1y.defaulted('openImmediately', true),
      $_32l4p2x1jcfx5h1y.strictObjOf('data', [
        $_32l4p2x1jcfx5h1y.strict('primary'),
        $_32l4p2x1jcfx5h1y.strict('menus'),
        $_32l4p2x1jcfx5h1y.strict('expansions')
      ]),
      $_32l4p2x1jcfx5h1y.defaulted('fakeFocus', false),
      $_7spjsaysjcfx5hd5.onHandler('onHighlight'),
      $_7spjsaysjcfx5hd5.onHandler('onHover'),
      $_7spjsaysjcfx5hd5.tieredMenuMarkers(),
      $_32l4p2x1jcfx5h1y.strict('dom'),
      $_32l4p2x1jcfx5h1y.defaulted('navigateOnHover', true),
      $_32l4p2x1jcfx5h1y.defaulted('stayInDom', false),
      $_ijaov10cjcfx5hn2.field('tmenuBehaviours', [
        Keying,
        Highlighting,
        Composing,
        Replacing
      ]),
      $_32l4p2x1jcfx5h1y.defaulted('eventOrder', {})
    ],
    apis: {
      collapseMenu: function (apis, tmenu) {
        apis.collapseMenu(tmenu);
      }
    },
    factory: $_184hkg13djcfx5ihb.make,
    extraApis: {
      tieredData: tieredData,
      singleData: singleData,
      collapseItem: collapseItem
    }
  });

  var scrollable = $_46bmn4z0jcfx5hew.resolve('scrollable');
  var register$1 = function (element) {
    $_axxg6hxtjcfx5h7e.add(element, scrollable);
  };
  var deregister = function (element) {
    $_axxg6hxtjcfx5h7e.remove(element, scrollable);
  };
  var $_acvexl13gjcfx5iir = {
    register: register$1,
    deregister: deregister,
    scrollable: $_30v3piwajcfx5gy5.constant(scrollable)
  };

  var getValue$4 = function (item) {
    return $_42faa8x5jcfx5h3h.readOptFrom(item, 'format').getOr(item.title);
  };
  var convert$1 = function (formats, memMenuThunk) {
    var mainMenu = makeMenu('Styles', [].concat($_91ik4uw8jcfx5gxn.map(formats.items, function (k) {
      return makeItem(getValue$4(k), k.title, k.isSelected(), k.getPreview(), $_42faa8x5jcfx5h3h.hasKey(formats.expansions, getValue$4(k)));
    })), memMenuThunk, false);
    var submenus = $_929ptpwzjcfx5h1b.map(formats.menus, function (menuItems, menuName) {
      var items = $_91ik4uw8jcfx5gxn.map(menuItems, function (item) {
        return makeItem(getValue$4(item), item.title, item.isSelected !== undefined ? item.isSelected() : false, item.getPreview !== undefined ? item.getPreview() : '', $_42faa8x5jcfx5h3h.hasKey(formats.expansions, getValue$4(item)));
      });
      return makeMenu(menuName, items, memMenuThunk, true);
    });
    var menus = $_cvmq7wxjcfx5h15.deepMerge(submenus, $_42faa8x5jcfx5h3h.wrap('styles', mainMenu));
    var tmenu = TieredMenu.tieredData('styles', menus, formats.expansions);
    return { tmenu: tmenu };
  };
  var makeItem = function (value, text, selected, preview, isMenu) {
    return {
      data: {
        value: value,
        text: text
      },
      type: 'item',
      dom: {
        tag: 'div',
        classes: isMenu ? [$_46bmn4z0jcfx5hew.resolve('styles-item-is-menu')] : []
      },
      toggling: {
        toggleOnExecute: false,
        toggleClass: $_46bmn4z0jcfx5hew.resolve('format-matches'),
        selected: selected
      },
      itemBehaviours: $_7uu47fw3jcfx5gvw.derive(isMenu ? [] : [$_a2zkb1yzjcfx5her.format(value, function (comp, status) {
          var toggle = status ? Toggling.on : Toggling.off;
          toggle(comp);
        })]),
      components: [{
          dom: {
            tag: 'div',
            attributes: { style: preview },
            innerHtml: text
          }
        }]
    };
  };
  var makeMenu = function (value, items, memMenuThunk, collapsable) {
    return {
      value: value,
      dom: { tag: 'div' },
      components: [
        Button.sketch({
          dom: {
            tag: 'div',
            classes: [$_46bmn4z0jcfx5hew.resolve('styles-collapser')]
          },
          components: collapsable ? [
            {
              dom: {
                tag: 'span',
                classes: [$_46bmn4z0jcfx5hew.resolve('styles-collapse-icon')]
              }
            },
            $_f8qap712jjcfx5i9p.text(value)
          ] : [$_f8qap712jjcfx5i9p.text(value)],
          action: function (item) {
            if (collapsable) {
              var comp = memMenuThunk().get(item);
              TieredMenu.collapseMenu(comp);
            }
          }
        }),
        {
          dom: {
            tag: 'div',
            classes: [$_46bmn4z0jcfx5hew.resolve('styles-menu-items-container')]
          },
          components: [Menu.parts().items({})],
          behaviours: $_7uu47fw3jcfx5gvw.derive([$_9p4uz511rjcfx5i1s.config('adhoc-scrollable-menu', [
              $_286fidw5jcfx5gwv.runOnAttached(function (component, simulatedEvent) {
                $_3wulrizrjcfx5him.set(component.element(), 'overflow-y', 'auto');
                $_3wulrizrjcfx5him.set(component.element(), '-webkit-overflow-scrolling', 'touch');
                $_acvexl13gjcfx5iir.register(component.element());
              }),
              $_286fidw5jcfx5gwv.runOnDetached(function (component) {
                $_3wulrizrjcfx5him.remove(component.element(), 'overflow-y');
                $_3wulrizrjcfx5him.remove(component.element(), '-webkit-overflow-scrolling');
                $_acvexl13gjcfx5iir.deregister(component.element());
              })
            ])])
        }
      ],
      items: items,
      menuBehaviours: $_7uu47fw3jcfx5gvw.derive([Transitioning.config({
          initialState: 'after',
          routes: Transitioning.createTristate('before', 'current', 'after', {
            transition: {
              property: 'transform',
              transitionClass: 'transitioning'
            }
          })
        })])
    };
  };
  var sketch$9 = function (settings) {
    var dataset = convert$1(settings.formats, function () {
      return memMenu;
    });
    var memMenu = $_ewms9y11djcfx5hye.record(TieredMenu.sketch({
      dom: {
        tag: 'div',
        classes: [$_46bmn4z0jcfx5hew.resolve('styles-menu')]
      },
      components: [],
      fakeFocus: true,
      stayInDom: true,
      onExecute: function (tmenu, item) {
        var v = me.getValue(item);
        settings.handle(item, v.value);
      },
      onEscape: function () {
      },
      onOpenMenu: function (container, menu) {
        var w = $_c2pn1d116jcfx5hwb.get(container.element());
        $_c2pn1d116jcfx5hwb.set(menu.element(), w);
        Transitioning.jumpTo(menu, 'current');
      },
      onOpenSubmenu: function (container, item, submenu) {
        var w = $_c2pn1d116jcfx5hwb.get(container.element());
        var menu = $_ccmao7zljcfx5hhv.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var menuComp = container.getSystem().getByDom(menu).getOrDie();
        $_c2pn1d116jcfx5hwb.set(submenu.element(), w);
        Transitioning.progressTo(menuComp, 'before');
        Transitioning.jumpTo(submenu, 'after');
        Transitioning.progressTo(submenu, 'current');
      },
      onCollapseMenu: function (container, item, menu) {
        var submenu = $_ccmao7zljcfx5hhv.ancestor(item.element(), '[role="menu"]').getOrDie('hacky');
        var submenuComp = container.getSystem().getByDom(submenu).getOrDie();
        Transitioning.progressTo(submenuComp, 'after');
        Transitioning.progressTo(menu, 'current');
      },
      navigateOnHover: false,
      openImmediately: true,
      data: dataset.tmenu,
      markers: {
        backgroundMenu: $_46bmn4z0jcfx5hew.resolve('styles-background-menu'),
        menu: $_46bmn4z0jcfx5hew.resolve('styles-menu'),
        selectedMenu: $_46bmn4z0jcfx5hew.resolve('styles-selected-menu'),
        item: $_46bmn4z0jcfx5hew.resolve('styles-item'),
        selectedItem: $_46bmn4z0jcfx5hew.resolve('styles-selected-item')
      }
    }));
    return memMenu.asSpec();
  };
  var $_643zze12ejcfx5i7n = { sketch: sketch$9 };

  var getFromExpandingItem = function (item) {
    var newItem = $_cvmq7wxjcfx5h15.deepMerge($_42faa8x5jcfx5h3h.exclude(item, ['items']), { menu: true });
    var rest = expand(item.items);
    var newMenus = $_cvmq7wxjcfx5h15.deepMerge(rest.menus, $_42faa8x5jcfx5h3h.wrap(item.title, rest.items));
    var newExpansions = $_cvmq7wxjcfx5h15.deepMerge(rest.expansions, $_42faa8x5jcfx5h3h.wrap(item.title, item.title));
    return {
      item: newItem,
      menus: newMenus,
      expansions: newExpansions
    };
  };
  var getFromItem = function (item) {
    return $_42faa8x5jcfx5h3h.hasKey(item, 'items') ? getFromExpandingItem(item) : {
      item: item,
      menus: {},
      expansions: {}
    };
  };
  var expand = function (items) {
    return $_91ik4uw8jcfx5gxn.foldr(items, function (acc, item) {
      var newData = getFromItem(item);
      return {
        menus: $_cvmq7wxjcfx5h15.deepMerge(acc.menus, newData.menus),
        items: [newData.item].concat(acc.items),
        expansions: $_cvmq7wxjcfx5h15.deepMerge(acc.expansions, newData.expansions)
      };
    }, {
      menus: {},
      expansions: {},
      items: []
    });
  };
  var $_c3lgyp13hjcfx5iiv = { expand: expand };

  var register = function (editor, settings) {
    var isSelectedFor = function (format) {
      return function () {
        return editor.formatter.match(format);
      };
    };
    var getPreview = function (format) {
      return function () {
        var styles = editor.formatter.getCssText(format);
        return styles;
      };
    };
    var enrichSupported = function (item) {
      return $_cvmq7wxjcfx5h15.deepMerge(item, {
        isSelected: isSelectedFor(item.format),
        getPreview: getPreview(item.format)
      });
    };
    var enrichMenu = function (item) {
      return $_cvmq7wxjcfx5h15.deepMerge(item, {
        isSelected: $_30v3piwajcfx5gy5.constant(false),
        getPreview: $_30v3piwajcfx5gy5.constant('')
      });
    };
    var enrichCustom = function (item) {
      var formatName = $_4yc6r610fjcfx5ho0.generate(item.title);
      var newItem = $_cvmq7wxjcfx5h15.deepMerge(item, {
        format: formatName,
        isSelected: isSelectedFor(formatName),
        getPreview: getPreview(formatName)
      });
      editor.formatter.register(formatName, newItem);
      return newItem;
    };
    var formats = $_42faa8x5jcfx5h3h.readOptFrom(settings, 'style_formats').getOr(DefaultStyleFormats);
    var doEnrich = function (items) {
      return $_91ik4uw8jcfx5gxn.map(items, function (item) {
        if ($_42faa8x5jcfx5h3h.hasKey(item, 'items')) {
          var newItems = doEnrich(item.items);
          return $_cvmq7wxjcfx5h15.deepMerge(enrichMenu(item), { items: newItems });
        } else if ($_42faa8x5jcfx5h3h.hasKey(item, 'format')) {
          return enrichSupported(item);
        } else {
          return enrichCustom(item);
        }
      });
    };
    return doEnrich(formats);
  };
  var prune = function (editor, formats) {
    var doPrune = function (items) {
      return $_91ik4uw8jcfx5gxn.bind(items, function (item) {
        if (item.items !== undefined) {
          var newItems = doPrune(item.items);
          return newItems.length > 0 ? [item] : [];
        } else {
          var keep = $_42faa8x5jcfx5h3h.hasKey(item, 'format') ? editor.formatter.canApply(item.format) : true;
          return keep ? [item] : [];
        }
      });
    };
    var prunedItems = doPrune(formats);
    return $_c3lgyp13hjcfx5iiv.expand(prunedItems);
  };
  var ui = function (editor, formats, onDone) {
    var pruned = prune(editor, formats);
    return $_643zze12ejcfx5i7n.sketch({
      formats: pruned,
      handle: function (item, value) {
        editor.undoManager.transact(function () {
          if (Toggling.isOn(item)) {
            editor.formatter.remove(value);
          } else {
            editor.formatter.apply(value);
          }
        });
        onDone();
      }
    });
  };
  var $_94nyce12cjcfx5i71 = {
    register: register,
    ui: ui
  };

  var defaults = [
    'undo',
    'bold',
    'italic',
    'link',
    'image',
    'bullist',
    'styleselect'
  ];
  var extract$1 = function (rawToolbar) {
    var toolbar = rawToolbar.replace(/\|/g, ' ').trim();
    return toolbar.length > 0 ? toolbar.split(/\s+/) : [];
  };
  var identifyFromArray = function (toolbar) {
    return $_91ik4uw8jcfx5gxn.bind(toolbar, function (item) {
      return $_7mrhymwyjcfx5h18.isArray(item) ? identifyFromArray(item) : extract$1(item);
    });
  };
  var identify = function (settings) {
    var toolbar = settings.toolbar !== undefined ? settings.toolbar : defaults;
    return $_7mrhymwyjcfx5h18.isArray(toolbar) ? identifyFromArray(toolbar) : extract$1(toolbar);
  };
  var setup = function (realm, editor) {
    var commandSketch = function (name) {
      return function () {
        return $_gg259uz1jcfx5hf0.forToolbarCommand(editor, name);
      };
    };
    var stateCommandSketch = function (name) {
      return function () {
        return $_gg259uz1jcfx5hf0.forToolbarStateCommand(editor, name);
      };
    };
    var actionSketch = function (name, query, action) {
      return function () {
        return $_gg259uz1jcfx5hf0.forToolbarStateAction(editor, name, query, action);
      };
    };
    var undo = commandSketch('undo');
    var redo = commandSketch('redo');
    var bold = stateCommandSketch('bold');
    var italic = stateCommandSketch('italic');
    var underline = stateCommandSketch('underline');
    var removeformat = commandSketch('removeformat');
    var link = function () {
      return $_4y9hls11njcfx5i03.sketch(realm, editor);
    };
    var unlink = actionSketch('unlink', 'link', function () {
      editor.execCommand('unlink', null, false);
    });
    var image = function () {
      return $_djb7se11cjcfx5hxz.sketch(editor);
    };
    var bullist = actionSketch('unordered-list', 'ul', function () {
      editor.execCommand('InsertUnorderedList', null, false);
    });
    var numlist = actionSketch('ordered-list', 'ol', function () {
      editor.execCommand('InsertOrderedList', null, false);
    });
    var fontsizeselect = function () {
      return $_9ntm0d118jcfx5hwg.sketch(realm, editor);
    };
    var forecolor = function () {
      return $_5gpylg10rjcfx5hsu.sketch(realm, editor);
    };
    var styleFormats = $_94nyce12cjcfx5i71.register(editor, editor.settings);
    var styleFormatsMenu = function () {
      return $_94nyce12cjcfx5i71.ui(editor, styleFormats, function () {
        editor.fire('scrollIntoView');
      });
    };
    var styleselect = function () {
      return $_gg259uz1jcfx5hf0.forToolbar('style-formats', function (button) {
        editor.fire('toReading');
        realm.dropup().appear(styleFormatsMenu, Toggling.on, button);
      }, $_7uu47fw3jcfx5gvw.derive([
        Toggling.config({
          toggleClass: $_46bmn4z0jcfx5hew.resolve('toolbar-button-selected'),
          toggleOnExecute: false,
          aria: { mode: 'pressed' }
        }),
        Receiving.config({
          channels: $_42faa8x5jcfx5h3h.wrapAll([
            $_a2zkb1yzjcfx5her.receive($_e79ixyynjcfx5hc5.orientationChanged(), Toggling.off),
            $_a2zkb1yzjcfx5her.receive($_e79ixyynjcfx5hc5.dropupDismissed(), Toggling.off)
          ])
        })
      ]));
    };
    var feature = function (prereq, sketch) {
      return {
        isSupported: function () {
          return prereq.forall(function (p) {
            return $_42faa8x5jcfx5h3h.hasKey(editor.buttons, p);
          });
        },
        sketch: sketch
      };
    };
    return {
      undo: feature($_8i7mfvw9jcfx5gxw.none(), undo),
      redo: feature($_8i7mfvw9jcfx5gxw.none(), redo),
      bold: feature($_8i7mfvw9jcfx5gxw.none(), bold),
      italic: feature($_8i7mfvw9jcfx5gxw.none(), italic),
      underline: feature($_8i7mfvw9jcfx5gxw.none(), underline),
      removeformat: feature($_8i7mfvw9jcfx5gxw.none(), removeformat),
      link: feature($_8i7mfvw9jcfx5gxw.none(), link),
      unlink: feature($_8i7mfvw9jcfx5gxw.none(), unlink),
      image: feature($_8i7mfvw9jcfx5gxw.none(), image),
      bullist: feature($_8i7mfvw9jcfx5gxw.some('bullist'), bullist),
      numlist: feature($_8i7mfvw9jcfx5gxw.some('numlist'), numlist),
      fontsizeselect: feature($_8i7mfvw9jcfx5gxw.none(), fontsizeselect),
      forecolor: feature($_8i7mfvw9jcfx5gxw.none(), forecolor),
      styleselect: feature($_8i7mfvw9jcfx5gxw.none(), styleselect)
    };
  };
  var detect$4 = function (settings, features) {
    var itemNames = identify(settings);
    var present = {};
    return $_91ik4uw8jcfx5gxn.bind(itemNames, function (iName) {
      var r = !$_42faa8x5jcfx5h3h.hasKey(present, iName) && $_42faa8x5jcfx5h3h.hasKey(features, iName) && features[iName].isSupported() ? [features[iName].sketch()] : [];
      present[iName] = true;
      return r;
    });
  };
  var $_5075wyojcfx5hc9 = {
    identify: identify,
    setup: setup,
    detect: detect$4
  };

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_30v3piwajcfx5gy5.constant(target),
      'x': $_30v3piwajcfx5gy5.constant(x),
      'y': $_30v3piwajcfx5gy5.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_30v3piwajcfx5gy5.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_6k7v3dwsjcfx5h08.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_30v3piwajcfx5gy5.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_30v3piwajcfx5gy5.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$2 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_3e3fkh13kjcfx5ijd = {
    bind: bind$2,
    capture: capture$1
  };

  var filter$1 = $_30v3piwajcfx5gy5.constant(true);
  var bind$1 = function (element, event, handler) {
    return $_3e3fkh13kjcfx5ijd.bind(element, event, filter$1, handler);
  };
  var capture = function (element, event, handler) {
    return $_3e3fkh13kjcfx5ijd.capture(element, event, filter$1, handler);
  };
  var $_eteirt13jjcfx5ij9 = {
    bind: bind$1,
    capture: capture
  };

  var INTERVAL = 50;
  var INSURANCE = 1000 / INTERVAL;
  var get$11 = function (outerWindow) {
    var isPortrait = outerWindow.matchMedia('(orientation: portrait)').matches;
    return { isPortrait: $_30v3piwajcfx5gy5.constant(isPortrait) };
  };
  var getActualWidth = function (outerWindow) {
    var isIos = $_f916s2wfjcfx5gyj.detect().os.isiOS();
    var isPortrait = get$11(outerWindow).isPortrait();
    return isIos && !isPortrait ? outerWindow.screen.height : outerWindow.screen.width;
  };
  var onChange = function (outerWindow, listeners) {
    var win = $_6k7v3dwsjcfx5h08.fromDom(outerWindow);
    var poller = null;
    var change = function () {
      clearInterval(poller);
      var orientation = get$11(outerWindow);
      listeners.onChange(orientation);
      onAdjustment(function () {
        listeners.onReady(orientation);
      });
    };
    var orientationHandle = $_eteirt13jjcfx5ij9.bind(win, 'orientationchange', change);
    var onAdjustment = function (f) {
      clearInterval(poller);
      var flag = outerWindow.innerHeight;
      var insurance = 0;
      poller = setInterval(function () {
        if (flag !== outerWindow.innerHeight) {
          clearInterval(poller);
          f($_8i7mfvw9jcfx5gxw.some(outerWindow.innerHeight));
        } else if (insurance > INSURANCE) {
          clearInterval(poller);
          f($_8i7mfvw9jcfx5gxw.none());
        }
        insurance++;
      }, INTERVAL);
    };
    var destroy = function () {
      orientationHandle.unbind();
    };
    return {
      onAdjustment: onAdjustment,
      destroy: destroy
    };
  };
  var $_3nlaja13ijcfx5ij1 = {
    get: get$11,
    onChange: onChange,
    getActualWidth: getActualWidth
  };

  var DelayedFunction = function (fun, delay) {
    var ref = null;
    var schedule = function () {
      var args = arguments;
      ref = setTimeout(function () {
        fun.apply(null, args);
        ref = null;
      }, delay);
    };
    var cancel = function () {
      if (ref !== null) {
        clearTimeout(ref);
        ref = null;
      }
    };
    return {
      cancel: cancel,
      schedule: schedule
    };
  };

  var SIGNIFICANT_MOVE = 5;
  var LONGPRESS_DELAY = 400;
  var getTouch = function (event) {
    if (event.raw().touches === undefined || event.raw().touches.length !== 1)
      return $_8i7mfvw9jcfx5gxw.none();
    return $_8i7mfvw9jcfx5gxw.some(event.raw().touches[0]);
  };
  var isFarEnough = function (touch, data) {
    var distX = Math.abs(touch.clientX - data.x());
    var distY = Math.abs(touch.clientY - data.y());
    return distX > SIGNIFICANT_MOVE || distY > SIGNIFICANT_MOVE;
  };
  var monitor$1 = function (settings) {
    var startData = Cell($_8i7mfvw9jcfx5gxw.none());
    var longpress = DelayedFunction(function (event) {
      startData.set($_8i7mfvw9jcfx5gxw.none());
      settings.triggerEvent($_fe7kcdwvjcfx5h0s.longpress(), event);
    }, LONGPRESS_DELAY);
    var handleTouchstart = function (event) {
      getTouch(event).each(function (touch) {
        longpress.cancel();
        var data = {
          x: $_30v3piwajcfx5gy5.constant(touch.clientX),
          y: $_30v3piwajcfx5gy5.constant(touch.clientY),
          target: event.target
        };
        longpress.schedule(data);
        startData.set($_8i7mfvw9jcfx5gxw.some(data));
      });
      return $_8i7mfvw9jcfx5gxw.none();
    };
    var handleTouchmove = function (event) {
      longpress.cancel();
      getTouch(event).each(function (touch) {
        startData.get().each(function (data) {
          if (isFarEnough(touch, data))
            startData.set($_8i7mfvw9jcfx5gxw.none());
        });
      });
      return $_8i7mfvw9jcfx5gxw.none();
    };
    var handleTouchend = function (event) {
      longpress.cancel();
      var isSame = function (data) {
        return $_7yb5g2w7jcfx5gx7.eq(data.target(), event.target());
      };
      return startData.get().filter(isSame).map(function (data) {
        return settings.triggerEvent($_fe7kcdwvjcfx5h0s.tap(), event);
      });
    };
    var handlers = $_42faa8x5jcfx5h3h.wrapAll([
      {
        key: $_7eoluuwwjcfx5h0z.touchstart(),
        value: handleTouchstart
      },
      {
        key: $_7eoluuwwjcfx5h0z.touchmove(),
        value: handleTouchmove
      },
      {
        key: $_7eoluuwwjcfx5h0z.touchend(),
        value: handleTouchend
      }
    ]);
    var fireIfReady = function (event, type) {
      return $_42faa8x5jcfx5h3h.readOptFrom(handlers, type).bind(function (handler) {
        return handler(event);
      });
    };
    return { fireIfReady: fireIfReady };
  };
  var $_eyh91d13qjcfx5iko = { monitor: monitor$1 };

  var monitor = function (editorApi) {
    var tapEvent = $_eyh91d13qjcfx5iko.monitor({
      triggerEvent: function (type, evt) {
        editorApi.onTapContent(evt);
      }
    });
    var onTouchend = function () {
      return $_eteirt13jjcfx5ij9.bind(editorApi.body(), 'touchend', function (evt) {
        tapEvent.fireIfReady(evt, 'touchend');
      });
    };
    var onTouchmove = function () {
      return $_eteirt13jjcfx5ij9.bind(editorApi.body(), 'touchmove', function (evt) {
        tapEvent.fireIfReady(evt, 'touchmove');
      });
    };
    var fireTouchstart = function (evt) {
      tapEvent.fireIfReady(evt, 'touchstart');
    };
    return {
      fireTouchstart: fireTouchstart,
      onTouchend: onTouchend,
      onTouchmove: onTouchmove
    };
  };
  var $_cy2b6613pjcfx5ikk = { monitor: monitor };

  var isAndroid6 = $_f916s2wfjcfx5gyj.detect().os.version.major >= 6;
  var initEvents = function (editorApi, toolstrip, alloy) {
    var tapping = $_cy2b6613pjcfx5ikk.monitor(editorApi);
    var outerDoc = $_bke8thy2jcfx5h9w.owner(toolstrip);
    var isRanged = function (sel) {
      return !$_7yb5g2w7jcfx5gx7.eq(sel.start(), sel.finish()) || sel.soffset() !== sel.foffset();
    };
    var hasRangeInUi = function () {
      return $_dzy0lsyfjcfx5hbi.active(outerDoc).filter(function (input) {
        return $_3wpq1xxwjcfx5h87.name(input) === 'input';
      }).exists(function (input) {
        return input.dom().selectionStart !== input.dom().selectionEnd;
      });
    };
    var updateMargin = function () {
      var rangeInContent = editorApi.doc().dom().hasFocus() && editorApi.getSelection().exists(isRanged);
      alloy.getByDom(toolstrip).each((rangeInContent || hasRangeInUi()) === true ? Toggling.on : Toggling.off);
    };
    var listeners = [
      $_eteirt13jjcfx5ij9.bind(editorApi.body(), 'touchstart', function (evt) {
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_eteirt13jjcfx5ij9.bind(toolstrip, 'touchstart', function (evt) {
        editorApi.onTouchToolstrip();
      }),
      editorApi.onToReading(function () {
        $_dzy0lsyfjcfx5hbi.blur(editorApi.body());
      }),
      editorApi.onToEditing($_30v3piwajcfx5gy5.noop),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        editorApi.getCursorBox().each(function (bounds) {
          var cWin = editorApi.win();
          var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
          var cScrollBy = isOutside ? bounds.bottom() - cWin.innerHeight + 50 : 0;
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      })
    ].concat(isAndroid6 === true ? [] : [
      $_eteirt13jjcfx5ij9.bind($_6k7v3dwsjcfx5h08.fromDom(editorApi.win()), 'blur', function () {
        alloy.getByDom(toolstrip).each(Toggling.off);
      }),
      $_eteirt13jjcfx5ij9.bind(outerDoc, 'select', updateMargin),
      $_eteirt13jjcfx5ij9.bind(editorApi.doc(), 'selectionchange', updateMargin)
    ]);
    var destroy = function () {
      $_91ik4uw8jcfx5gxn.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_cm9jsj13ojcfx5ik3 = { initEvents: initEvents };

  var autocompleteHack = function () {
    return function (f) {
      setTimeout(function () {
        f();
      }, 0);
    };
  };
  var resume = function (cWin) {
    cWin.focus();
    var iBody = $_6k7v3dwsjcfx5h08.fromDom(cWin.document.body);
    var inInput = $_dzy0lsyfjcfx5hbi.active().exists(function (elem) {
      return $_91ik4uw8jcfx5gxn.contains([
        'input',
        'textarea'
      ], $_3wpq1xxwjcfx5h87.name(elem));
    });
    var transaction = inInput ? autocompleteHack() : $_30v3piwajcfx5gy5.apply;
    transaction(function () {
      $_dzy0lsyfjcfx5hbi.active().each($_dzy0lsyfjcfx5hbi.blur);
      $_dzy0lsyfjcfx5hbi.focus(iBody);
    });
  };
  var $_qmbmg13tjcfx5iln = { resume: resume };

  var safeParse = function (element, attribute) {
    var parsed = parseInt($_8bne1yxvjcfx5h7n.get(element, attribute), 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  var $_1we4ku13ujcfx5ilx = { safeParse: safeParse };

  var NodeValue = function (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return $_8i7mfvw9jcfx5gxw.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? $_8i7mfvw9jcfx5gxw.from(element.dom().nodeValue) : $_8i7mfvw9jcfx5gxw.none();
    };
    var browser = $_f916s2wfjcfx5gyj.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  };

  var api$3 = NodeValue($_3wpq1xxwjcfx5h87.isText, 'text');
  var get$12 = function (element) {
    return api$3.get(element);
  };
  var getOption = function (element) {
    return api$3.getOption(element);
  };
  var set$8 = function (element, value) {
    api$3.set(element, value);
  };
  var $_bp2mfk13xjcfx5iml = {
    get: get$12,
    getOption: getOption,
    set: set$8
  };

  var getEnd = function (element) {
    return $_3wpq1xxwjcfx5h87.name(element) === 'img' ? 1 : $_bp2mfk13xjcfx5iml.getOption(element).fold(function () {
      return $_bke8thy2jcfx5h9w.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_bp2mfk13xjcfx5iml.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_91ik4uw8jcfx5gxn.contains(elementsWithCursorPosition, $_3wpq1xxwjcfx5h87.name(elem));
  };
  var $_1qochk13wjcfx5img = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var adt$4 = $_49o4fsx3jcfx5h2a.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart$1 = function (situ) {
    return situ.fold($_30v3piwajcfx5gy5.identity, $_30v3piwajcfx5gy5.identity, $_30v3piwajcfx5gy5.identity);
  };
  var $_34gfvq140jcfx5in1 = {
    before: adt$4.before,
    on: adt$4.on,
    after: adt$4.after,
    cata: cata,
    getStart: getStart$1
  };

  var type$1 = $_49o4fsx3jcfx5h2a.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$1 = $_ci6qsrxljcfx5h6b.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$1.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_6k7v3dwsjcfx5h08.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_34gfvq140jcfx5in1.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart(selection);
    return $_bke8thy2jcfx5h9w.defaultView(start);
  };
  var $_7v39kg13zjcfx5imw = {
    domRange: type$1.domRange,
    relative: type$1.relative,
    exact: type$1.exact,
    exactFromRange: exactFromRange,
    range: range$1,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_bke8thy2jcfx5h9w.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_6k7v3dwsjcfx5h08.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_7yb5g2w7jcfx5gx7.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_arwnpg142jcfx5ine = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_91ik4uw8jcfx5gxn.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_6k7v3dwsjcfx5h08.fromDom(fragment);
  };
  var $_dptnj0143jcfx5ing = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$5 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return $_6k7v3dwsjcfx5h08.fromDom(fragment);
  };
  var toRect$1 = function (rect) {
    return {
      left: $_30v3piwajcfx5gy5.constant(rect.left),
      top: $_30v3piwajcfx5gy5.constant(rect.top),
      right: $_30v3piwajcfx5gy5.constant(rect.right),
      bottom: $_30v3piwajcfx5gy5.constant(rect.bottom),
      width: $_30v3piwajcfx5gy5.constant(rect.width),
      height: $_30v3piwajcfx5gy5.constant(rect.height)
    };
  };
  var getFirstRect$1 = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_8i7mfvw9jcfx5gxw.some(rect).map(toRect$1) : $_8i7mfvw9jcfx5gxw.none();
  };
  var getBounds$2 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? $_8i7mfvw9jcfx5gxw.some(rect).map(toRect$1) : $_8i7mfvw9jcfx5gxw.none();
  };
  var toString$1 = function (rng) {
    return rng.toString();
  };
  var $_72u4kv144jcfx5ink = {
    create: create$5,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    isWithin: isWithin,
    toString: toString$1
  };

  var adt$5 = $_49o4fsx3jcfx5h2a.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type($_6k7v3dwsjcfx5h08.fromDom(range.startContainer), range.startOffset, $_6k7v3dwsjcfx5h08.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_30v3piwajcfx5gy5.constant(rng),
          rtl: $_8i7mfvw9jcfx5gxw.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_8ohqlxwgjcfx5gym.cached(function () {
            return $_72u4kv144jcfx5ink.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_8ohqlxwgjcfx5gym.cached(function () {
            return $_8i7mfvw9jcfx5gxw.some($_72u4kv144jcfx5ink.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_8ohqlxwgjcfx5gym.cached(function () {
            return $_72u4kv144jcfx5ink.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_8ohqlxwgjcfx5gym.cached(function () {
            return $_8i7mfvw9jcfx5gxw.some($_72u4kv144jcfx5ink.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$5.rtl($_6k7v3dwsjcfx5h08.fromDom(rev.endContainer), rev.endOffset, $_6k7v3dwsjcfx5h08.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$5.ltr, rng);
      });
    } else {
      return fromRange(win, adt$5.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_d4ja1x145jcfx5ins = {
    ltr: adt$5.ltr,
    rtl: adt$5.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };

  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y > rect.bottom) {
      } else if (y < rect.top || curDeltaX > xDelta) {
        return i - 1;
      } else {
        xDelta = curDeltaX;
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_bn4i9t148jcfx5ioj = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };

  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_bp2mfk13xjcfx5iml.get(textnode).length;
    var offset = $_bn4i9t148jcfx5ioj.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate$2 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_g8j28lydjcfx5hbe.findMap(rects, function (rect) {
      return $_bn4i9t148jcfx5ioj.inRect(rect, x, y) ? $_8i7mfvw9jcfx5gxw.some(rect) : $_8i7mfvw9jcfx5gxw.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_6uh5zf149jcfx5iom = { locate: locate$2 };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_bke8thy2jcfx5h9w.children(node);
    return $_g8j28lydjcfx5hbe.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_bn4i9t148jcfx5ioj.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : $_8i7mfvw9jcfx5gxw.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_3wpq1xxwjcfx5h87.isText(node) ? $_6uh5zf149jcfx5iom.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_4xev3f147jcfx5iod = { locate: locate$1 };

  var first$3 = function (element) {
    return $_94hxagyhjcfx5hbo.descendant(element, $_1qochk13wjcfx5img.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_1qochk13wjcfx5img.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_bke8thy2jcfx5h9w.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return $_8i7mfvw9jcfx5gxw.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return $_8i7mfvw9jcfx5gxw.none();
    };
    return descend(scope);
  };
  var $_fi9n7314bjcfx5iov = {
    first: first$3,
    last: last$2
  };

  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_fi9n7314bjcfx5iov.first : $_fi9n7314bjcfx5iov.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return $_8i7mfvw9jcfx5gxw.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search$1 = function (doc, node, x) {
    var f = $_bke8thy2jcfx5h9w.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_3074aj14ajcfx5ior = { search: search$1 };

  var caretPositionFromPoint = function (doc, x, y) {
    return $_8i7mfvw9jcfx5gxw.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return $_8i7mfvw9jcfx5gxw.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return $_8i7mfvw9jcfx5gxw.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return $_8i7mfvw9jcfx5gxw.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_4xev3f147jcfx5iod.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_6k7v3dwsjcfx5h08.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_3074aj14ajcfx5ior.search(doc, elem, x);
      };
      return $_bke8thy2jcfx5h9w.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_6k7v3dwsjcfx5h08.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_7v39kg13zjcfx5imw.range($_6k7v3dwsjcfx5h08.fromDom(rng.startContainer), rng.startOffset, $_6k7v3dwsjcfx5h08.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_41ov9r146jcfx5io9 = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_72u4kv144jcfx5ink.create(win);
    var self = $_7uhcp6wrjcfx5h00.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_5iffulzjjcfx5hhq.descendants(ancestor, selector));
    return $_91ik4uw8jcfx5gxn.filter(elements, function (elem) {
      $_72u4kv144jcfx5ink.selectNodeContentsUsing(innerRange, elem);
      return $_72u4kv144jcfx5ink.isWithin(outerRange, innerRange);
    });
  };
  var find$4 = function (win, selection, selector) {
    var outerRange = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    var ancestor = $_6k7v3dwsjcfx5h08.fromDom(outerRange.commonAncestorContainer);
    return $_3wpq1xxwjcfx5h87.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_c7gyh214cjcfx5ioz = { find: find$4 };

  var beforeSpecial = function (element, offset) {
    var name = $_3wpq1xxwjcfx5h87.name(element);
    if ('input' === name)
      return $_34gfvq140jcfx5in1.after(element);
    else if (!$_91ik4uw8jcfx5gxn.contains([
        'br',
        'img'
      ], name))
      return $_34gfvq140jcfx5in1.on(element, offset);
    else
      return offset === 0 ? $_34gfvq140jcfx5in1.before(element) : $_34gfvq140jcfx5in1.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_34gfvq140jcfx5in1.before, beforeSpecial, $_34gfvq140jcfx5in1.after);
    var finish = finishSitu.fold($_34gfvq140jcfx5in1.before, beforeSpecial, $_34gfvq140jcfx5in1.after);
    return $_7v39kg13zjcfx5imw.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_7v39kg13zjcfx5imw.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_6k7v3dwsjcfx5h08.fromDom(rng.startContainer);
        var finish = $_6k7v3dwsjcfx5h08.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_13sa214djcfx5ip6 = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    $_8i7mfvw9jcfx5gxw.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_72u4kv144jcfx5ink.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_c7gyh214cjcfx5ioz.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_d4ja1x145jcfx5ins.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_13sa214djcfx5ip6.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_13sa214djcfx5ip6.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_7v39kg13zjcfx5imw.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_72u4kv144jcfx5ink.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_13sa214djcfx5ip6.preprocess(selection);
    return $_d4ja1x145jcfx5ins.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return $_8i7mfvw9jcfx5gxw.some($_7v39kg13zjcfx5imw.range($_6k7v3dwsjcfx5h08.fromDom(firstRng.startContainer), firstRng.startOffset, $_6k7v3dwsjcfx5h08.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return $_8i7mfvw9jcfx5gxw.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_6k7v3dwsjcfx5h08.fromDom(selection.anchorNode);
    var focusNode = $_6k7v3dwsjcfx5h08.fromDom(selection.focusNode);
    return $_arwnpg142jcfx5ine.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? $_8i7mfvw9jcfx5gxw.some($_7v39kg13zjcfx5imw.range($_6k7v3dwsjcfx5h08.fromDom(selection.anchorNode), selection.anchorOffset, $_6k7v3dwsjcfx5h08.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_72u4kv144jcfx5ink.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_72u4kv144jcfx5ink.selectNodeContents(win, element);
    return $_7v39kg13zjcfx5imw.range($_6k7v3dwsjcfx5h08.fromDom(rng.startContainer), rng.startOffset, $_6k7v3dwsjcfx5h08.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : $_8i7mfvw9jcfx5gxw.none();
  };
  var get$13 = function (win) {
    return getExact(win).map(function (range) {
      return $_7v39kg13zjcfx5imw.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect = function (win, selection) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    return $_72u4kv144jcfx5ink.getFirstRect(rng);
  };
  var getBounds$1 = function (win, selection) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    return $_72u4kv144jcfx5ink.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_41ov9r146jcfx5io9.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    return $_72u4kv144jcfx5ink.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$3 = function (win, selection) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    return $_72u4kv144jcfx5ink.cloneFragment(rng);
  };
  var replace = function (win, selection, elements) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    var fragment = $_dptnj0143jcfx5ing.fromElements(elements, win.document);
    $_72u4kv144jcfx5ink.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_d4ja1x145jcfx5ins.asLtrRange(win, selection);
    $_72u4kv144jcfx5ink.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_7yb5g2w7jcfx5gx7.eq(start, finish) && soffset === foffset;
  };
  var $_3vbfy1141jcfx5in8 = {
    setExact: setExact,
    getExact: getExact,
    get: get$13,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$3,
    replace: replace,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var COLLAPSED_WIDTH = 2;
  var collapsedRect = function (rect) {
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: $_30v3piwajcfx5gy5.constant(COLLAPSED_WIDTH),
      height: rect.height
    };
  };
  var toRect = function (rawRect) {
    return {
      left: $_30v3piwajcfx5gy5.constant(rawRect.left),
      top: $_30v3piwajcfx5gy5.constant(rawRect.top),
      right: $_30v3piwajcfx5gy5.constant(rawRect.right),
      bottom: $_30v3piwajcfx5gy5.constant(rawRect.bottom),
      width: $_30v3piwajcfx5gy5.constant(rawRect.width),
      height: $_30v3piwajcfx5gy5.constant(rawRect.height)
    };
  };
  var getRectsFromRange = function (range) {
    if (!range.collapsed) {
      return $_91ik4uw8jcfx5gxn.map(range.getClientRects(), toRect);
    } else {
      var start_1 = $_6k7v3dwsjcfx5h08.fromDom(range.startContainer);
      return $_bke8thy2jcfx5h9w.parent(start_1).bind(function (parent) {
        var selection = $_7v39kg13zjcfx5imw.exact(start_1, range.startOffset, parent, $_1qochk13wjcfx5img.getEnd(parent));
        var optRect = $_3vbfy1141jcfx5in8.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
        return optRect.map(collapsedRect).map($_91ik4uw8jcfx5gxn.pure);
      }).getOr([]);
    }
  };
  var getRectangles = function (cWin) {
    var sel = cWin.getSelection();
    return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [];
  };
  var $_b8zp6c13vjcfx5im1 = { getRectangles: getRectangles };

  var EXTRA_SPACING = 50;
  var data = 'data-' + $_46bmn4z0jcfx5hew.resolve('last-outer-height');
  var setLastHeight = function (cBody, value) {
    $_8bne1yxvjcfx5h7n.set(cBody, data, value);
  };
  var getLastHeight = function (cBody) {
    return $_1we4ku13ujcfx5ilx.safeParse(cBody, data);
  };
  var getBoundsFrom = function (rect) {
    return {
      top: $_30v3piwajcfx5gy5.constant(rect.top()),
      bottom: $_30v3piwajcfx5gy5.constant(rect.top() + rect.height())
    };
  };
  var getBounds = function (cWin) {
    var rects = $_b8zp6c13vjcfx5im1.getRectangles(cWin);
    return rects.length > 0 ? $_8i7mfvw9jcfx5gxw.some(rects[0]).map(getBoundsFrom) : $_8i7mfvw9jcfx5gxw.none();
  };
  var findDelta = function (outerWindow, cBody) {
    var last = getLastHeight(cBody);
    var current = outerWindow.innerHeight;
    return last > current ? $_8i7mfvw9jcfx5gxw.some(last - current) : $_8i7mfvw9jcfx5gxw.none();
  };
  var calculate = function (cWin, bounds, delta) {
    var isOutside = bounds.top() > cWin.innerHeight || bounds.bottom() > cWin.innerHeight;
    return isOutside ? Math.min(delta, bounds.bottom() - cWin.innerHeight + EXTRA_SPACING) : 0;
  };
  var setup$1 = function (outerWindow, cWin) {
    var cBody = $_6k7v3dwsjcfx5h08.fromDom(cWin.document.body);
    var toEditing = function () {
      $_qmbmg13tjcfx5iln.resume(cWin);
    };
    var onResize = $_eteirt13jjcfx5ij9.bind($_6k7v3dwsjcfx5h08.fromDom(outerWindow), 'resize', function () {
      findDelta(outerWindow, cBody).each(function (delta) {
        getBounds(cWin).each(function (bounds) {
          var cScrollBy = calculate(cWin, bounds, delta);
          if (cScrollBy !== 0) {
            cWin.scrollTo(cWin.pageXOffset, cWin.pageYOffset + cScrollBy);
          }
        });
      });
      setLastHeight(cBody, outerWindow.innerHeight);
    });
    setLastHeight(cBody, outerWindow.innerHeight);
    var destroy = function () {
      onResize.unbind();
    };
    return {
      toEditing: toEditing,
      destroy: destroy
    };
  };
  var $_9g50lw13sjcfx5il7 = { setup: setup$1 };

  var getBodyFromFrame = function (frame) {
    return $_8i7mfvw9jcfx5gxw.some($_6k7v3dwsjcfx5h08.fromDom(frame.dom().contentWindow.document.body));
  };
  var getDocFromFrame = function (frame) {
    return $_8i7mfvw9jcfx5gxw.some($_6k7v3dwsjcfx5h08.fromDom(frame.dom().contentWindow.document));
  };
  var getWinFromFrame = function (frame) {
    return $_8i7mfvw9jcfx5gxw.from(frame.dom().contentWindow);
  };
  var getSelectionFromFrame = function (frame) {
    var optWin = getWinFromFrame(frame);
    return optWin.bind($_3vbfy1141jcfx5in8.getExact);
  };
  var getFrame = function (editor) {
    return editor.getFrame();
  };
  var getOrDerive = function (name, f) {
    return function (editor) {
      var g = editor[name].getOrThunk(function () {
        var frame = getFrame(editor);
        return function () {
          return f(frame);
        };
      });
      return g();
    };
  };
  var getOrListen = function (editor, doc, name, type) {
    return editor[name].getOrThunk(function () {
      return function (handler) {
        return $_eteirt13jjcfx5ij9.bind(doc, type, handler);
      };
    });
  };
  var toRect$2 = function (rect) {
    return {
      left: $_30v3piwajcfx5gy5.constant(rect.left),
      top: $_30v3piwajcfx5gy5.constant(rect.top),
      right: $_30v3piwajcfx5gy5.constant(rect.right),
      bottom: $_30v3piwajcfx5gy5.constant(rect.bottom),
      width: $_30v3piwajcfx5gy5.constant(rect.width),
      height: $_30v3piwajcfx5gy5.constant(rect.height)
    };
  };
  var getActiveApi = function (editor) {
    var frame = getFrame(editor);
    var tryFallbackBox = function (win) {
      var isCollapsed = function (sel) {
        return $_7yb5g2w7jcfx5gx7.eq(sel.start(), sel.finish()) && sel.soffset() === sel.foffset();
      };
      var toStartRect = function (sel) {
        var rect = sel.start().dom().getBoundingClientRect();
        return rect.width > 0 || rect.height > 0 ? $_8i7mfvw9jcfx5gxw.some(rect).map(toRect$2) : $_8i7mfvw9jcfx5gxw.none();
      };
      return $_3vbfy1141jcfx5in8.getExact(win).filter(isCollapsed).bind(toStartRect);
    };
    return getBodyFromFrame(frame).bind(function (body) {
      return getDocFromFrame(frame).bind(function (doc) {
        return getWinFromFrame(frame).map(function (win) {
          var html = $_6k7v3dwsjcfx5h08.fromDom(doc.dom().documentElement);
          var getCursorBox = editor.getCursorBox.getOrThunk(function () {
            return function () {
              return $_3vbfy1141jcfx5in8.get(win).bind(function (sel) {
                return $_3vbfy1141jcfx5in8.getFirstRect(win, sel).orThunk(function () {
                  return tryFallbackBox(win);
                });
              });
            };
          });
          var setSelection = editor.setSelection.getOrThunk(function () {
            return function (start, soffset, finish, foffset) {
              $_3vbfy1141jcfx5in8.setExact(win, start, soffset, finish, foffset);
            };
          });
          var clearSelection = editor.clearSelection.getOrThunk(function () {
            return function () {
              $_3vbfy1141jcfx5in8.clear(win);
            };
          });
          return {
            body: $_30v3piwajcfx5gy5.constant(body),
            doc: $_30v3piwajcfx5gy5.constant(doc),
            win: $_30v3piwajcfx5gy5.constant(win),
            html: $_30v3piwajcfx5gy5.constant(html),
            getSelection: $_30v3piwajcfx5gy5.curry(getSelectionFromFrame, frame),
            setSelection: setSelection,
            clearSelection: clearSelection,
            frame: $_30v3piwajcfx5gy5.constant(frame),
            onKeyup: getOrListen(editor, doc, 'onKeyup', 'keyup'),
            onNodeChanged: getOrListen(editor, doc, 'onNodeChanged', 'selectionchange'),
            onDomChanged: editor.onDomChanged,
            onScrollToCursor: editor.onScrollToCursor,
            onScrollToElement: editor.onScrollToElement,
            onToReading: editor.onToReading,
            onToEditing: editor.onToEditing,
            onToolbarScrollStart: editor.onToolbarScrollStart,
            onTouchContent: editor.onTouchContent,
            onTapContent: editor.onTapContent,
            onTouchToolstrip: editor.onTouchToolstrip,
            getCursorBox: getCursorBox
          };
        });
      });
    });
  };
  var $_547lkj14ejcfx5ipb = {
    getBody: getOrDerive('getBody', getBodyFromFrame),
    getDoc: getOrDerive('getDoc', getDocFromFrame),
    getWin: getOrDerive('getWin', getWinFromFrame),
    getSelection: getOrDerive('getSelection', getSelectionFromFrame),
    getFrame: getFrame,
    getActiveApi: getActiveApi
  };

  var attr = 'data-ephox-mobile-fullscreen-style';
  var siblingStyles = 'display:none!important;';
  var ancestorPosition = 'position:absolute!important;';
  var ancestorStyles = 'top:0!important;left:0!important;margin:0' + '!important;padding:0!important;width:100%!important;';
  var bgFallback = 'background-color:rgb(255,255,255)!important;';
  var isAndroid = $_f916s2wfjcfx5gyj.detect().os.isAndroid();
  var matchColor = function (editorBody) {
    var color = $_3wulrizrjcfx5him.get(editorBody, 'background-color');
    return color !== undefined && color !== '' ? 'background-color:' + color + '!important' : bgFallback;
  };
  var clobberStyles = function (container, editorBody) {
    var gatherSibilings = function (element) {
      var siblings = $_5iffulzjjcfx5hhq.siblings(element, '*');
      return siblings;
    };
    var clobber = function (clobberStyle) {
      return function (element) {
        var styles = $_8bne1yxvjcfx5h7n.get(element, 'style');
        var backup = styles === undefined ? 'no-styles' : styles.trim();
        if (backup === clobberStyle) {
          return;
        } else {
          $_8bne1yxvjcfx5h7n.set(element, attr, backup);
          $_8bne1yxvjcfx5h7n.set(element, 'style', clobberStyle);
        }
      };
    };
    var ancestors = $_5iffulzjjcfx5hhq.ancestors(container, '*');
    var siblings = $_91ik4uw8jcfx5gxn.bind(ancestors, gatherSibilings);
    var bgColor = matchColor(editorBody);
    $_91ik4uw8jcfx5gxn.each(siblings, clobber(siblingStyles));
    $_91ik4uw8jcfx5gxn.each(ancestors, clobber(ancestorPosition + ancestorStyles + bgColor));
    var containerStyles = isAndroid === true ? '' : ancestorPosition;
    clobber(containerStyles + ancestorStyles + bgColor)(container);
  };
  var restoreStyles = function () {
    var clobberedEls = $_5iffulzjjcfx5hhq.all('[' + attr + ']');
    $_91ik4uw8jcfx5gxn.each(clobberedEls, function (element) {
      var restore = $_8bne1yxvjcfx5h7n.get(element, attr);
      if (restore !== 'no-styles') {
        $_8bne1yxvjcfx5h7n.set(element, 'style', restore);
      } else {
        $_8bne1yxvjcfx5h7n.remove(element, 'style');
      }
      $_8bne1yxvjcfx5h7n.remove(element, attr);
    });
  };
  var $_dfpxqk14fjcfx5ipo = {
    clobberStyles: clobberStyles,
    restoreStyles: restoreStyles
  };

  var tag = function () {
    var head = $_ccmao7zljcfx5hhv.first('head').getOrDie();
    var nu = function () {
      var meta = $_6k7v3dwsjcfx5h08.fromTag('meta');
      $_8bne1yxvjcfx5h7n.set(meta, 'name', 'viewport');
      $_1g0by4y1jcfx5h9q.append(head, meta);
      return meta;
    };
    var element = $_ccmao7zljcfx5hhv.first('meta[name="viewport"]').getOrThunk(nu);
    var backup = $_8bne1yxvjcfx5h7n.get(element, 'content');
    var maximize = function () {
      $_8bne1yxvjcfx5h7n.set(element, 'content', 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0');
    };
    var restore = function () {
      if (backup !== undefined && backup !== null && backup.length > 0) {
        $_8bne1yxvjcfx5h7n.set(element, 'content', backup);
      } else {
        $_8bne1yxvjcfx5h7n.set(element, 'content', 'user-scalable=yes');
      }
    };
    return {
      maximize: maximize,
      restore: restore
    };
  };
  var $_g7glth14gjcfx5iq0 = { tag: tag };

  var create$4 = function (platform, mask) {
    var meta = $_g7glth14gjcfx5iq0.tag();
    var androidApi = $_8ypal129jcfx5i6m.api();
    var androidEvents = $_8ypal129jcfx5i6m.api();
    var enter = function () {
      mask.hide();
      $_axxg6hxtjcfx5h7e.add(platform.container, $_46bmn4z0jcfx5hew.resolve('fullscreen-maximized'));
      $_axxg6hxtjcfx5h7e.add(platform.container, $_46bmn4z0jcfx5hew.resolve('android-maximized'));
      meta.maximize();
      $_axxg6hxtjcfx5h7e.add(platform.body, $_46bmn4z0jcfx5hew.resolve('android-scroll-reload'));
      androidApi.set($_9g50lw13sjcfx5il7.setup(platform.win, $_547lkj14ejcfx5ipb.getWin(platform.editor).getOrDie('no')));
      $_547lkj14ejcfx5ipb.getActiveApi(platform.editor).each(function (editorApi) {
        $_dfpxqk14fjcfx5ipo.clobberStyles(platform.container, editorApi.body());
        androidEvents.set($_cm9jsj13ojcfx5ik3.initEvents(editorApi, platform.toolstrip, platform.alloy));
      });
    };
    var exit = function () {
      meta.restore();
      mask.show();
      $_axxg6hxtjcfx5h7e.remove(platform.container, $_46bmn4z0jcfx5hew.resolve('fullscreen-maximized'));
      $_axxg6hxtjcfx5h7e.remove(platform.container, $_46bmn4z0jcfx5hew.resolve('android-maximized'));
      $_dfpxqk14fjcfx5ipo.restoreStyles();
      $_axxg6hxtjcfx5h7e.remove(platform.body, $_46bmn4z0jcfx5hew.resolve('android-scroll-reload'));
      androidEvents.clear();
      androidApi.clear();
    };
    return {
      enter: enter,
      exit: exit
    };
  };
  var $_76350m13njcfx5ijy = { create: create$4 };

  var MobileSchema = $_fj9y9nxgjcfx5h5a.objOf([
    $_32l4p2x1jcfx5h1y.strictObjOf('editor', [
      $_32l4p2x1jcfx5h1y.strict('getFrame'),
      $_32l4p2x1jcfx5h1y.option('getBody'),
      $_32l4p2x1jcfx5h1y.option('getDoc'),
      $_32l4p2x1jcfx5h1y.option('getWin'),
      $_32l4p2x1jcfx5h1y.option('getSelection'),
      $_32l4p2x1jcfx5h1y.option('setSelection'),
      $_32l4p2x1jcfx5h1y.option('clearSelection'),
      $_32l4p2x1jcfx5h1y.option('cursorSaver'),
      $_32l4p2x1jcfx5h1y.option('onKeyup'),
      $_32l4p2x1jcfx5h1y.option('onNodeChanged'),
      $_32l4p2x1jcfx5h1y.option('getCursorBox'),
      $_32l4p2x1jcfx5h1y.strict('onDomChanged'),
      $_32l4p2x1jcfx5h1y.defaulted('onTouchContent', $_30v3piwajcfx5gy5.noop),
      $_32l4p2x1jcfx5h1y.defaulted('onTapContent', $_30v3piwajcfx5gy5.noop),
      $_32l4p2x1jcfx5h1y.defaulted('onTouchToolstrip', $_30v3piwajcfx5gy5.noop),
      $_32l4p2x1jcfx5h1y.defaulted('onScrollToCursor', $_30v3piwajcfx5gy5.constant({ unbind: $_30v3piwajcfx5gy5.noop })),
      $_32l4p2x1jcfx5h1y.defaulted('onScrollToElement', $_30v3piwajcfx5gy5.constant({ unbind: $_30v3piwajcfx5gy5.noop })),
      $_32l4p2x1jcfx5h1y.defaulted('onToEditing', $_30v3piwajcfx5gy5.constant({ unbind: $_30v3piwajcfx5gy5.noop })),
      $_32l4p2x1jcfx5h1y.defaulted('onToReading', $_30v3piwajcfx5gy5.constant({ unbind: $_30v3piwajcfx5gy5.noop })),
      $_32l4p2x1jcfx5h1y.defaulted('onToolbarScrollStart', $_30v3piwajcfx5gy5.identity)
    ]),
    $_32l4p2x1jcfx5h1y.strict('socket'),
    $_32l4p2x1jcfx5h1y.strict('toolstrip'),
    $_32l4p2x1jcfx5h1y.strict('dropup'),
    $_32l4p2x1jcfx5h1y.strict('toolbar'),
    $_32l4p2x1jcfx5h1y.strict('container'),
    $_32l4p2x1jcfx5h1y.strict('alloy'),
    $_32l4p2x1jcfx5h1y.state('win', function (spec) {
      return $_bke8thy2jcfx5h9w.owner(spec.socket).dom().defaultView;
    }),
    $_32l4p2x1jcfx5h1y.state('body', function (spec) {
      return $_6k7v3dwsjcfx5h08.fromDom(spec.socket.dom().ownerDocument.body);
    }),
    $_32l4p2x1jcfx5h1y.defaulted('translate', $_30v3piwajcfx5gy5.identity),
    $_32l4p2x1jcfx5h1y.defaulted('setReadOnly', $_30v3piwajcfx5gy5.noop)
  ]);

  var adaptable = function (fn, rate) {
    var timer = null;
    var args = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        args = null;
      }
    };
    var throttle = function () {
      args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var first$4 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
        args = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var $_8iy77r14jjcfx5iqt = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var sketch$10 = function (onView, translate) {
    var memIcon = $_ewms9y11djcfx5hye.record(Container.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div aria-hidden="true" class="${prefix}-mask-tap-icon"></div>'),
      containerBehaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({
          toggleClass: $_46bmn4z0jcfx5hew.resolve('mask-tap-icon-selected'),
          toggleOnExecute: false
        })])
    }));
    var onViewThrottle = $_8iy77r14jjcfx5iqt.first(onView, 200);
    return Container.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-disabled-mask"></div>'),
      components: [Container.sketch({
          dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-content-container"></div>'),
          components: [Button.sketch({
              dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-content-tap-section"></div>'),
              components: [memIcon.asSpec()],
              action: function (button) {
                onViewThrottle.throttle();
              },
              buttonBehaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({ toggleClass: $_46bmn4z0jcfx5hew.resolve('mask-tap-icon-selected') })])
            })]
        })]
    });
  };
  var $_2j4vn014ijcfx5iqe = { sketch: sketch$10 };

  var produce = function (raw) {
    var mobile = $_fj9y9nxgjcfx5h5a.asRawOrDie('Getting AndroidWebapp schema', MobileSchema, raw);
    $_3wulrizrjcfx5him.set(mobile.toolstrip, 'width', '100%');
    var onTap = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_f8qap712jjcfx5i9p.build($_2j4vn014ijcfx5iqe.sketch(onTap, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    $_1g0by4y1jcfx5h9q.append(mobile.container, mask.element());
    var mode = $_76350m13njcfx5ijy.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: $_30v3piwajcfx5gy5.noop,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_30v3piwajcfx5gy5.noop
    };
  };
  var $_7ey66u13mjcfx5ijo = { produce: produce };

  var schema$14 = [
    $_32l4p2x1jcfx5h1y.defaulted('shell', true),
    $_ijaov10cjcfx5hn2.field('toolbarBehaviours', [Replacing])
  ];
  var enhanceGroups = function (detail) {
    return { behaviours: $_7uu47fw3jcfx5gvw.derive([Replacing.config({})]) };
  };
  var partTypes$1 = [$_9leb2110jjcfx5hp6.optional({
      name: 'groups',
      overrides: enhanceGroups
    })];
  var $_aog6qs14mjcfx5irj = {
    name: $_30v3piwajcfx5gy5.constant('Toolbar'),
    schema: $_30v3piwajcfx5gy5.constant(schema$14),
    parts: $_30v3piwajcfx5gy5.constant(partTypes$1)
  };

  var factory$4 = function (detail, components, spec, _externals) {
    var setGroups = function (toolbar, groups) {
      getGroupContainer(toolbar).fold(function () {
        console.error('Toolbar was defined to not be a shell, but no groups container was specified in components');
        throw new Error('Toolbar was defined to not be a shell, but no groups container was specified in components');
      }, function (container) {
        Replacing.set(container, groups);
      });
    };
    var getGroupContainer = function (component) {
      return detail.shell() ? $_8i7mfvw9jcfx5gxw.some(component) : $_8uasnh10hjcfx5hob.getPart(component, detail, 'groups');
    };
    var extra = detail.shell() ? {
      behaviours: [Replacing.config({})],
      components: []
    } : {
      behaviours: [],
      components: components
    };
    return {
      uid: detail.uid(),
      dom: detail.dom(),
      components: extra.components,
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive(extra.behaviours), $_ijaov10cjcfx5hn2.get(detail.toolbarBehaviours())),
      apis: { setGroups: setGroups },
      domModification: { attributes: { role: 'group' } }
    };
  };
  var Toolbar = $_3wo7ba10djcfx5hna.composite({
    name: 'Toolbar',
    configFields: $_aog6qs14mjcfx5irj.schema(),
    partFields: $_aog6qs14mjcfx5irj.parts(),
    factory: factory$4,
    apis: {
      setGroups: function (apis, toolbar, groups) {
        apis.setGroups(toolbar, groups);
      }
    }
  });

  var schema$15 = [
    $_32l4p2x1jcfx5h1y.strict('items'),
    $_7spjsaysjcfx5hd5.markers(['itemClass']),
    $_ijaov10cjcfx5hn2.field('tgroupBehaviours', [Keying])
  ];
  var partTypes$2 = [$_9leb2110jjcfx5hp6.group({
      name: 'items',
      unit: 'item',
      overrides: function (detail) {
        return { domModification: { classes: [detail.markers().itemClass()] } };
      }
    })];
  var $_68dgpq14ojcfx5irs = {
    name: $_30v3piwajcfx5gy5.constant('ToolbarGroup'),
    schema: $_30v3piwajcfx5gy5.constant(schema$15),
    parts: $_30v3piwajcfx5gy5.constant(partTypes$2)
  };

  var factory$5 = function (detail, components, spec, _externals) {
    return $_cvmq7wxjcfx5h15.deepMerge({ dom: { attributes: { role: 'toolbar' } } }, {
      uid: detail.uid(),
      dom: detail.dom(),
      components: components,
      behaviours: $_cvmq7wxjcfx5h15.deepMerge($_7uu47fw3jcfx5gvw.derive([Keying.config({
          mode: 'flow',
          selector: '.' + detail.markers().itemClass()
        })]), $_ijaov10cjcfx5hn2.get(detail.tgroupBehaviours())),
      'debug.sketcher': spec['debug.sketcher']
    });
  };
  var ToolbarGroup = $_3wo7ba10djcfx5hna.composite({
    name: 'ToolbarGroup',
    configFields: $_68dgpq14ojcfx5irs.schema(),
    partFields: $_68dgpq14ojcfx5irs.parts(),
    factory: factory$5
  });

  var dataHorizontal = 'data-' + $_46bmn4z0jcfx5hew.resolve('horizontal-scroll');
  var canScrollVertically = function (container) {
    container.dom().scrollTop = 1;
    var result = container.dom().scrollTop !== 0;
    container.dom().scrollTop = 0;
    return result;
  };
  var canScrollHorizontally = function (container) {
    container.dom().scrollLeft = 1;
    var result = container.dom().scrollLeft !== 0;
    container.dom().scrollLeft = 0;
    return result;
  };
  var hasVerticalScroll = function (container) {
    return container.dom().scrollTop > 0 || canScrollVertically(container);
  };
  var hasHorizontalScroll = function (container) {
    return container.dom().scrollLeft > 0 || canScrollHorizontally(container);
  };
  var markAsHorizontal = function (container) {
    $_8bne1yxvjcfx5h7n.set(container, dataHorizontal, 'true');
  };
  var hasScroll = function (container) {
    return $_8bne1yxvjcfx5h7n.get(container, dataHorizontal) === 'true' ? hasHorizontalScroll : hasVerticalScroll;
  };
  var exclusive = function (scope, selector) {
    return $_eteirt13jjcfx5ij9.bind(scope, 'touchmove', function (event) {
      $_ccmao7zljcfx5hhv.closest(event.target(), selector).filter(hasScroll).fold(function () {
        event.raw().preventDefault();
      }, $_30v3piwajcfx5gy5.noop);
    });
  };
  var $_eshc6g14pjcfx5irz = {
    exclusive: exclusive,
    markAsHorizontal: markAsHorizontal
  };

  var ScrollingToolbar = function () {
    var makeGroup = function (gSpec) {
      var scrollClass = gSpec.scrollable === true ? '${prefix}-toolbar-scrollable-group' : '';
      return {
        dom: $_copwu110pjcfx5hs6.dom('<div aria-label="' + gSpec.label + '" class="${prefix}-toolbar-group ' + scrollClass + '"></div>'),
        tgroupBehaviours: $_7uu47fw3jcfx5gvw.derive([$_9p4uz511rjcfx5i1s.config('adhoc-scrollable-toolbar', gSpec.scrollable === true ? [$_286fidw5jcfx5gwv.runOnInit(function (component, simulatedEvent) {
              $_3wulrizrjcfx5him.set(component.element(), 'overflow-x', 'auto');
              $_eshc6g14pjcfx5irz.markAsHorizontal(component.element());
              $_acvexl13gjcfx5iir.register(component.element());
            })] : [])]),
        components: [Container.sketch({ components: [ToolbarGroup.parts().items({})] })],
        markers: { itemClass: $_46bmn4z0jcfx5hew.resolve('toolbar-group-item') },
        items: gSpec.items
      };
    };
    var toolbar = $_f8qap712jjcfx5i9p.build(Toolbar.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-toolbar"></div>'),
      components: [Toolbar.parts().groups({})],
      toolbarBehaviours: $_7uu47fw3jcfx5gvw.derive([
        Toggling.config({
          toggleClass: $_46bmn4z0jcfx5hew.resolve('context-toolbar'),
          toggleOnExecute: false,
          aria: { mode: 'none' }
        }),
        Keying.config({ mode: 'cyclic' })
      ]),
      shell: true
    }));
    var wrapper = $_f8qap712jjcfx5i9p.build(Container.sketch({
      dom: { classes: [$_46bmn4z0jcfx5hew.resolve('toolstrip')] },
      components: [$_f8qap712jjcfx5i9p.premade(toolbar)],
      containerBehaviours: $_7uu47fw3jcfx5gvw.derive([Toggling.config({
          toggleClass: $_46bmn4z0jcfx5hew.resolve('android-selection-context-toolbar'),
          toggleOnExecute: false
        })])
    }));
    var resetGroups = function () {
      Toolbar.setGroups(toolbar, initGroups.get());
      Toggling.off(toolbar);
    };
    var initGroups = Cell([]);
    var setGroups = function (gs) {
      initGroups.set(gs);
      resetGroups();
    };
    var createGroups = function (gs) {
      return $_91ik4uw8jcfx5gxn.map(gs, $_30v3piwajcfx5gy5.compose(ToolbarGroup.sketch, makeGroup));
    };
    var refresh = function () {
      Toolbar.refresh(toolbar);
    };
    var setContextToolbar = function (gs) {
      Toggling.on(toolbar);
      Toolbar.setGroups(toolbar, gs);
    };
    var restoreToolbar = function () {
      if (Toggling.isOn(toolbar)) {
        resetGroups();
      }
    };
    var focus = function () {
      Keying.focusIn(toolbar);
    };
    return {
      wrapper: $_30v3piwajcfx5gy5.constant(wrapper),
      toolbar: $_30v3piwajcfx5gy5.constant(toolbar),
      createGroups: createGroups,
      setGroups: setGroups,
      setContextToolbar: setContextToolbar,
      restoreToolbar: restoreToolbar,
      refresh: refresh,
      focus: focus
    };
  };

  var makeEditSwitch = function (webapp) {
    return $_f8qap712jjcfx5i9p.build(Button.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-mask-edit-icon ${prefix}-icon"></div>'),
      action: function () {
        webapp.run(function (w) {
          w.setReadOnly(false);
        });
      }
    }));
  };
  var makeSocket = function () {
    return $_f8qap712jjcfx5i9p.build(Container.sketch({
      dom: $_copwu110pjcfx5hs6.dom('<div class="${prefix}-editor-socket"></div>'),
      components: [],
      containerBehaviours: $_7uu47fw3jcfx5gvw.derive([Replacing.config({})])
    }));
  };
  var showEdit = function (socket, switchToEdit) {
    Replacing.append(socket, $_f8qap712jjcfx5i9p.premade(switchToEdit));
  };
  var hideEdit = function (socket, switchToEdit) {
    Replacing.remove(socket, switchToEdit);
  };
  var updateMode = function (socket, switchToEdit, readOnly, root) {
    var swap = readOnly === true ? Swapping.toAlpha : Swapping.toOmega;
    swap(root);
    var f = readOnly ? showEdit : hideEdit;
    f(socket, switchToEdit);
  };
  var $_age4vv14qjcfx5is8 = {
    makeEditSwitch: makeEditSwitch,
    makeSocket: makeSocket,
    updateMode: updateMode
  };

  var getAnimationRoot = function (component, slideConfig) {
    return slideConfig.getAnimationRoot().fold(function () {
      return component.element();
    }, function (get) {
      return get(component);
    });
  };
  var getDimensionProperty = function (slideConfig) {
    return slideConfig.dimension().property();
  };
  var getDimension = function (slideConfig, elem) {
    return slideConfig.dimension().getDimension()(elem);
  };
  var disableTransitions = function (component, slideConfig) {
    var root = getAnimationRoot(component, slideConfig);
    $_aym9qo12xjcfx5iep.remove(root, [
      slideConfig.shrinkingClass(),
      slideConfig.growingClass()
    ]);
  };
  var setShrunk = function (component, slideConfig) {
    $_axxg6hxtjcfx5h7e.remove(component.element(), slideConfig.openClass());
    $_axxg6hxtjcfx5h7e.add(component.element(), slideConfig.closedClass());
    $_3wulrizrjcfx5him.set(component.element(), getDimensionProperty(slideConfig), '0px');
    $_3wulrizrjcfx5him.reflow(component.element());
  };
  var measureTargetSize = function (component, slideConfig) {
    setGrown(component, slideConfig);
    var expanded = getDimension(slideConfig, component.element());
    setShrunk(component, slideConfig);
    return expanded;
  };
  var setGrown = function (component, slideConfig) {
    $_axxg6hxtjcfx5h7e.remove(component.element(), slideConfig.closedClass());
    $_axxg6hxtjcfx5h7e.add(component.element(), slideConfig.openClass());
    $_3wulrizrjcfx5him.remove(component.element(), getDimensionProperty(slideConfig));
  };
  var doImmediateShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_3wulrizrjcfx5him.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_3wulrizrjcfx5him.reflow(component.element());
    disableTransitions(component, slideConfig);
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
    slideConfig.onShrunk()(component);
  };
  var doStartShrink = function (component, slideConfig, slideState) {
    slideState.setCollapsed();
    $_3wulrizrjcfx5him.set(component.element(), getDimensionProperty(slideConfig), getDimension(slideConfig, component.element()));
    $_3wulrizrjcfx5him.reflow(component.element());
    var root = getAnimationRoot(component, slideConfig);
    $_axxg6hxtjcfx5h7e.add(root, slideConfig.shrinkingClass());
    setShrunk(component, slideConfig);
    slideConfig.onStartShrink()(component);
  };
  var doStartGrow = function (component, slideConfig, slideState) {
    var fullSize = measureTargetSize(component, slideConfig);
    var root = getAnimationRoot(component, slideConfig);
    $_axxg6hxtjcfx5h7e.add(root, slideConfig.growingClass());
    setGrown(component, slideConfig);
    $_3wulrizrjcfx5him.set(component.element(), getDimensionProperty(slideConfig), fullSize);
    slideState.setExpanded();
    slideConfig.onStartGrow()(component);
  };
  var grow = function (component, slideConfig, slideState) {
    if (!slideState.isExpanded())
      doStartGrow(component, slideConfig, slideState);
  };
  var shrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doStartShrink(component, slideConfig, slideState);
  };
  var immediateShrink = function (component, slideConfig, slideState) {
    if (slideState.isExpanded())
      doImmediateShrink(component, slideConfig, slideState);
  };
  var hasGrown = function (component, slideConfig, slideState) {
    return slideState.isExpanded();
  };
  var hasShrunk = function (component, slideConfig, slideState) {
    return slideState.isCollapsed();
  };
  var isGrowing = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_axxg6hxtjcfx5h7e.has(root, slideConfig.growingClass()) === true;
  };
  var isShrinking = function (component, slideConfig, slideState) {
    var root = getAnimationRoot(component, slideConfig);
    return $_axxg6hxtjcfx5h7e.has(root, slideConfig.shrinkingClass()) === true;
  };
  var isTransitioning = function (component, slideConfig, slideState) {
    return isGrowing(component, slideConfig, slideState) === true || isShrinking(component, slideConfig, slideState) === true;
  };
  var toggleGrow = function (component, slideConfig, slideState) {
    var f = slideState.isExpanded() ? doStartShrink : doStartGrow;
    f(component, slideConfig, slideState);
  };
  var $_18mxcs14ujcfx5isy = {
    grow: grow,
    shrink: shrink,
    immediateShrink: immediateShrink,
    hasGrown: hasGrown,
    hasShrunk: hasShrunk,
    isGrowing: isGrowing,
    isShrinking: isShrinking,
    isTransitioning: isTransitioning,
    toggleGrow: toggleGrow,
    disableTransitions: disableTransitions
  };

  var exhibit$5 = function (base, slideConfig) {
    var expanded = slideConfig.expanded();
    return expanded ? $_1k6iv7xjjcfx5h5o.nu({
      classes: [slideConfig.openClass()],
      styles: {}
    }) : $_1k6iv7xjjcfx5h5o.nu({
      classes: [slideConfig.closedClass()],
      styles: $_42faa8x5jcfx5h3h.wrap(slideConfig.dimension().property(), '0px')
    });
  };
  var events$9 = function (slideConfig, slideState) {
    return $_286fidw5jcfx5gwv.derive([$_286fidw5jcfx5gwv.run($_7eoluuwwjcfx5h0z.transitionend(), function (component, simulatedEvent) {
        var raw = simulatedEvent.event().raw();
        if (raw.propertyName === slideConfig.dimension().property()) {
          $_18mxcs14ujcfx5isy.disableTransitions(component, slideConfig, slideState);
          if (slideState.isExpanded())
            $_3wulrizrjcfx5him.remove(component.element(), slideConfig.dimension().property());
          var notify = slideState.isExpanded() ? slideConfig.onGrown() : slideConfig.onShrunk();
          notify(component, simulatedEvent);
        }
      })]);
  };
  var $_f81vp814tjcfx5iss = {
    exhibit: exhibit$5,
    events: events$9
  };

  var SlidingSchema = [
    $_32l4p2x1jcfx5h1y.strict('closedClass'),
    $_32l4p2x1jcfx5h1y.strict('openClass'),
    $_32l4p2x1jcfx5h1y.strict('shrinkingClass'),
    $_32l4p2x1jcfx5h1y.strict('growingClass'),
    $_32l4p2x1jcfx5h1y.option('getAnimationRoot'),
    $_7spjsaysjcfx5hd5.onHandler('onShrunk'),
    $_7spjsaysjcfx5hd5.onHandler('onStartShrink'),
    $_7spjsaysjcfx5hd5.onHandler('onGrown'),
    $_7spjsaysjcfx5hd5.onHandler('onStartGrow'),
    $_32l4p2x1jcfx5h1y.defaulted('expanded', false),
    $_32l4p2x1jcfx5h1y.strictOf('dimension', $_fj9y9nxgjcfx5h5a.choose('property', {
      width: [
        $_7spjsaysjcfx5hd5.output('property', 'width'),
        $_7spjsaysjcfx5hd5.output('getDimension', function (elem) {
          return $_c2pn1d116jcfx5hwb.get(elem) + 'px';
        })
      ],
      height: [
        $_7spjsaysjcfx5hd5.output('property', 'height'),
        $_7spjsaysjcfx5hd5.output('getDimension', function (elem) {
          return $_9z6fpvzqjcfx5hii.get(elem) + 'px';
        })
      ]
    }))
  ];

  var init$4 = function (spec) {
    var state = Cell(spec.expanded());
    var readState = function () {
      return 'expanded: ' + state.get();
    };
    return BehaviourState({
      isExpanded: function () {
        return state.get() === true;
      },
      isCollapsed: function () {
        return state.get() === false;
      },
      setCollapsed: $_30v3piwajcfx5gy5.curry(state.set, false),
      setExpanded: $_30v3piwajcfx5gy5.curry(state.set, true),
      readState: readState
    });
  };
  var $_4ib3fr14wjcfx5itk = { init: init$4 };

  var Sliding = $_7uu47fw3jcfx5gvw.create({
    fields: SlidingSchema,
    name: 'sliding',
    active: $_f81vp814tjcfx5iss,
    apis: $_18mxcs14ujcfx5isy,
    state: $_4ib3fr14wjcfx5itk
  });

  var build$2 = function (refresh, scrollIntoView) {
    var dropup = $_f8qap712jjcfx5i9p.build(Container.sketch({
      dom: {
        tag: 'div',
        classes: $_46bmn4z0jcfx5hew.resolve('dropup')
      },
      components: [],
      containerBehaviours: $_7uu47fw3jcfx5gvw.derive([
        Replacing.config({}),
        Sliding.config({
          closedClass: $_46bmn4z0jcfx5hew.resolve('dropup-closed'),
          openClass: $_46bmn4z0jcfx5hew.resolve('dropup-open'),
          shrinkingClass: $_46bmn4z0jcfx5hew.resolve('dropup-shrinking'),
          growingClass: $_46bmn4z0jcfx5hew.resolve('dropup-growing'),
          dimension: { property: 'height' },
          onShrunk: function (component) {
            refresh();
            scrollIntoView();
            Replacing.set(component, []);
          },
          onGrown: function (component) {
            refresh();
            scrollIntoView();
          }
        }),
        $_a2zkb1yzjcfx5her.orientation(function (component, data) {
          disappear($_30v3piwajcfx5gy5.noop);
        })
      ])
    }));
    var appear = function (menu, update, component) {
      if (Sliding.hasShrunk(dropup) === true && Sliding.isTransitioning(dropup) === false) {
        window.requestAnimationFrame(function () {
          update(component);
          Replacing.set(dropup, [menu()]);
          Sliding.grow(dropup);
        });
      }
    };
    var disappear = function (onReadyToShrink) {
      window.requestAnimationFrame(function () {
        onReadyToShrink();
        Sliding.shrink(dropup);
      });
    };
    return {
      appear: appear,
      disappear: disappear,
      component: $_30v3piwajcfx5gy5.constant(dropup),
      element: dropup.element
    };
  };
  var $_2m877j14rjcfx5isi = { build: build$2 };

  var isDangerous = function (event) {
    return event.raw().which === $_fa5l47zdjcfx5hgw.BACKSPACE()[0] && !$_91ik4uw8jcfx5gxn.contains([
      'input',
      'textarea'
    ], $_3wpq1xxwjcfx5h87.name(event.target()));
  };
  var isFirefox = $_f916s2wfjcfx5gyj.detect().browser.isFirefox();
  var settingsSchema = $_fj9y9nxgjcfx5h5a.objOfOnly([
    $_32l4p2x1jcfx5h1y.strictFunction('triggerEvent'),
    $_32l4p2x1jcfx5h1y.strictFunction('broadcastEvent'),
    $_32l4p2x1jcfx5h1y.defaulted('stopBackspace', true)
  ]);
  var bindFocus = function (container, handler) {
    if (isFirefox) {
      return $_eteirt13jjcfx5ij9.capture(container, 'focus', handler);
    } else {
      return $_eteirt13jjcfx5ij9.bind(container, 'focusin', handler);
    }
  };
  var bindBlur = function (container, handler) {
    if (isFirefox) {
      return $_eteirt13jjcfx5ij9.capture(container, 'blur', handler);
    } else {
      return $_eteirt13jjcfx5ij9.bind(container, 'focusout', handler);
    }
  };
  var setup$2 = function (container, rawSettings) {
    var settings = $_fj9y9nxgjcfx5h5a.asRawOrDie('Getting GUI events settings', settingsSchema, rawSettings);
    var pointerEvents = $_f916s2wfjcfx5gyj.detect().deviceType.isTouch() ? [
      'touchstart',
      'touchmove',
      'touchend',
      'gesturestart'
    ] : [
      'mousedown',
      'mouseup',
      'mouseover',
      'mousemove',
      'mouseout',
      'click'
    ];
    var tapEvent = $_eyh91d13qjcfx5iko.monitor(settings);
    var simpleEvents = $_91ik4uw8jcfx5gxn.map(pointerEvents.concat([
      'selectstart',
      'input',
      'contextmenu',
      'change',
      'transitionend',
      'dragstart',
      'dragover',
      'drop'
    ]), function (type) {
      return $_eteirt13jjcfx5ij9.bind(container, type, function (event) {
        tapEvent.fireIfReady(event, type).each(function (tapStopped) {
          if (tapStopped)
            event.kill();
        });
        var stopped = settings.triggerEvent(type, event);
        if (stopped)
          event.kill();
      });
    });
    var onKeydown = $_eteirt13jjcfx5ij9.bind(container, 'keydown', function (event) {
      var stopped = settings.triggerEvent('keydown', event);
      if (stopped)
        event.kill();
      else if (settings.stopBackspace === true && isDangerous(event)) {
        event.prevent();
      }
    });
    var onFocusIn = bindFocus(container, function (event) {
      var stopped = settings.triggerEvent('focusin', event);
      if (stopped)
        event.kill();
    });
    var onFocusOut = bindBlur(container, function (event) {
      var stopped = settings.triggerEvent('focusout', event);
      if (stopped)
        event.kill();
      setTimeout(function () {
        settings.triggerEvent($_fe7kcdwvjcfx5h0s.postBlur(), event);
      }, 0);
    });
    var defaultView = $_bke8thy2jcfx5h9w.defaultView(container);
    var onWindowScroll = $_eteirt13jjcfx5ij9.bind(defaultView, 'scroll', function (event) {
      var stopped = settings.broadcastEvent($_fe7kcdwvjcfx5h0s.windowScroll(), event);
      if (stopped)
        event.kill();
    });
    var unbind = function () {
      $_91ik4uw8jcfx5gxn.each(simpleEvents, function (e) {
        e.unbind();
      });
      onKeydown.unbind();
      onFocusIn.unbind();
      onFocusOut.unbind();
      onWindowScroll.unbind();
    };
    return { unbind: unbind };
  };
  var $_12dgoz14zjcfx5iuh = { setup: setup$2 };

  var derive$3 = function (rawEvent, rawTarget) {
    var source = $_42faa8x5jcfx5h3h.readOptFrom(rawEvent, 'target').map(function (getTarget) {
      return getTarget();
    }).getOr(rawTarget);
    return Cell(source);
  };
  var $_a64a28151jcfx5iv4 = { derive: derive$3 };

  var fromSource = function (event, source) {
    var stopper = Cell(false);
    var cutter = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    var cut = function () {
      cutter.set(true);
    };
    return {
      stop: stop,
      cut: cut,
      isStopped: stopper.get,
      isCut: cutter.get,
      event: $_30v3piwajcfx5gy5.constant(event),
      setSource: source.set,
      getSource: source.get
    };
  };
  var fromExternal = function (event) {
    var stopper = Cell(false);
    var stop = function () {
      stopper.set(true);
    };
    return {
      stop: stop,
      cut: $_30v3piwajcfx5gy5.noop,
      isStopped: stopper.get,
      isCut: $_30v3piwajcfx5gy5.constant(false),
      event: $_30v3piwajcfx5gy5.constant(event),
      setTarget: $_30v3piwajcfx5gy5.die(new Error('Cannot set target of a broadcasted event')),
      getTarget: $_30v3piwajcfx5gy5.die(new Error('Cannot get target of a broadcasted event'))
    };
  };
  var fromTarget = function (event, target) {
    var source = Cell(target);
    return fromSource(event, source);
  };
  var $_38ydcr152jcfx5iva = {
    fromSource: fromSource,
    fromExternal: fromExternal,
    fromTarget: fromTarget
  };

  var adt$6 = $_49o4fsx3jcfx5h2a.generate([
    { stopped: [] },
    { resume: ['element'] },
    { complete: [] }
  ]);
  var doTriggerHandler = function (lookup, eventType, rawEvent, target, source, logger) {
    var handler = lookup(eventType, target);
    var simulatedEvent = $_38ydcr152jcfx5iva.fromSource(rawEvent, source);
    return handler.fold(function () {
      logger.logEventNoHandlers(eventType, target);
      return adt$6.complete();
    }, function (handlerInfo) {
      var descHandler = handlerInfo.descHandler();
      var eventHandler = $_36d3fz12ujcfx5idh.getHandler(descHandler);
      eventHandler(simulatedEvent);
      if (simulatedEvent.isStopped()) {
        logger.logEventStopped(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.stopped();
      } else if (simulatedEvent.isCut()) {
        logger.logEventCut(eventType, handlerInfo.element(), descHandler.purpose());
        return adt$6.complete();
      } else
        return $_bke8thy2jcfx5h9w.parent(handlerInfo.element()).fold(function () {
          logger.logNoParent(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.complete();
        }, function (parent) {
          logger.logEventResponse(eventType, handlerInfo.element(), descHandler.purpose());
          return adt$6.resume(parent);
        });
    });
  };
  var doTriggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, source, logger) {
    return doTriggerHandler(lookup, eventType, rawEvent, rawTarget, source, logger).fold(function () {
      return true;
    }, function (parent) {
      return doTriggerOnUntilStopped(lookup, eventType, rawEvent, parent, source, logger);
    }, function () {
      return false;
    });
  };
  var triggerHandler = function (lookup, eventType, rawEvent, target, logger) {
    var source = $_a64a28151jcfx5iv4.derive(rawEvent, target);
    return doTriggerHandler(lookup, eventType, rawEvent, target, source, logger);
  };
  var broadcast = function (listeners, rawEvent, logger) {
    var simulatedEvent = $_38ydcr152jcfx5iva.fromExternal(rawEvent);
    $_91ik4uw8jcfx5gxn.each(listeners, function (listener) {
      var descHandler = listener.descHandler();
      var handler = $_36d3fz12ujcfx5idh.getHandler(descHandler);
      handler(simulatedEvent);
    });
    return simulatedEvent.isStopped();
  };
  var triggerUntilStopped = function (lookup, eventType, rawEvent, logger) {
    var rawTarget = rawEvent.target();
    return triggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, logger);
  };
  var triggerOnUntilStopped = function (lookup, eventType, rawEvent, rawTarget, logger) {
    var source = $_a64a28151jcfx5iv4.derive(rawEvent, rawTarget);
    return doTriggerOnUntilStopped(lookup, eventType, rawEvent, rawTarget, source, logger);
  };
  var $_9olz3o150jcfx5iuv = {
    triggerHandler: triggerHandler,
    triggerUntilStopped: triggerUntilStopped,
    triggerOnUntilStopped: triggerOnUntilStopped,
    broadcast: broadcast
  };

  var closest$4 = function (target, transform, isRoot) {
    var delegate = $_94hxagyhjcfx5hbo.closest(target, function (elem) {
      return transform(elem).isSome();
    }, isRoot);
    return delegate.bind(transform);
  };
  var $_e61hp155jcfx5iwa = { closest: closest$4 };

  var eventHandler = $_ci6qsrxljcfx5h6b.immutable('element', 'descHandler');
  var messageHandler = function (id, handler) {
    return {
      id: $_30v3piwajcfx5gy5.constant(id),
      descHandler: $_30v3piwajcfx5gy5.constant(handler)
    };
  };
  var EventRegistry = function () {
    var registry = {};
    var registerId = function (extraArgs, id, events) {
      $_929ptpwzjcfx5h1b.each(events, function (v, k) {
        var handlers = registry[k] !== undefined ? registry[k] : {};
        handlers[id] = $_36d3fz12ujcfx5idh.curryArgs(v, extraArgs);
        registry[k] = handlers;
      });
    };
    var findHandler = function (handlers, elem) {
      return $_ftkrhf10ljcfx5hqd.read(elem).fold(function (err) {
        return $_8i7mfvw9jcfx5gxw.none();
      }, function (id) {
        var reader = $_42faa8x5jcfx5h3h.readOpt(id);
        return handlers.bind(reader).map(function (descHandler) {
          return eventHandler(elem, descHandler);
        });
      });
    };
    var filterByType = function (type) {
      return $_42faa8x5jcfx5h3h.readOptFrom(registry, type).map(function (handlers) {
        return $_929ptpwzjcfx5h1b.mapToArray(handlers, function (f, id) {
          return messageHandler(id, f);
        });
      }).getOr([]);
    };
    var find = function (isAboveRoot, type, target) {
      var readType = $_42faa8x5jcfx5h3h.readOpt(type);
      var handlers = readType(registry);
      return $_e61hp155jcfx5iwa.closest(target, function (elem) {
        return findHandler(handlers, elem);
      }, isAboveRoot);
    };
    var unregisterId = function (id) {
      $_929ptpwzjcfx5h1b.each(registry, function (handlersById, eventName) {
        if (handlersById.hasOwnProperty(id))
          delete handlersById[id];
      });
    };
    return {
      registerId: registerId,
      unregisterId: unregisterId,
      filterByType: filterByType,
      find: find
    };
  };

  var Registry = function () {
    var events = EventRegistry();
    var components = {};
    var readOrTag = function (component) {
      var elem = component.element();
      return $_ftkrhf10ljcfx5hqd.read(elem).fold(function () {
        return $_ftkrhf10ljcfx5hqd.write('uid-', component.element());
      }, function (uid) {
        return uid;
      });
    };
    var failOnDuplicate = function (component, tagId) {
      var conflict = components[tagId];
      if (conflict === component)
        unregister(component);
      else
        throw new Error('The tagId "' + tagId + '" is already used by: ' + $_ap0k19y8jcfx5hay.element(conflict.element()) + '\nCannot use it for: ' + $_ap0k19y8jcfx5hay.element(component.element()) + '\n' + 'The conflicting element is' + ($_5392z2y6jcfx5hal.inBody(conflict.element()) ? ' ' : ' not ') + 'already in the DOM');
    };
    var register = function (component) {
      var tagId = readOrTag(component);
      if ($_42faa8x5jcfx5h3h.hasKey(components, tagId))
        failOnDuplicate(component, tagId);
      var extraArgs = [component];
      events.registerId(extraArgs, tagId, component.events());
      components[tagId] = component;
    };
    var unregister = function (component) {
      $_ftkrhf10ljcfx5hqd.read(component.element()).each(function (tagId) {
        components[tagId] = undefined;
        events.unregisterId(tagId);
      });
    };
    var filter = function (type) {
      return events.filterByType(type);
    };
    var find = function (isAboveRoot, type, target) {
      return events.find(isAboveRoot, type, target);
    };
    var getById = function (id) {
      return $_42faa8x5jcfx5h3h.readOpt(id)(components);
    };
    return {
      find: find,
      filter: filter,
      register: register,
      unregister: unregister,
      getById: getById
    };
  };

  var create$6 = function () {
    var root = $_f8qap712jjcfx5i9p.build(Container.sketch({ dom: { tag: 'div' } }));
    return takeover(root);
  };
  var takeover = function (root) {
    var isAboveRoot = function (el) {
      return $_bke8thy2jcfx5h9w.parent(root.element()).fold(function () {
        return true;
      }, function (parent) {
        return $_7yb5g2w7jcfx5gx7.eq(el, parent);
      });
    };
    var registry = Registry();
    var lookup = function (eventName, target) {
      return registry.find(isAboveRoot, eventName, target);
    };
    var domEvents = $_12dgoz14zjcfx5iuh.setup(root.element(), {
      triggerEvent: function (eventName, event) {
        return $_6hnwbgy7jcfx5hap.monitorEvent(eventName, event.target(), function (logger) {
          return $_9olz3o150jcfx5iuv.triggerUntilStopped(lookup, eventName, event, logger);
        });
      },
      broadcastEvent: function (eventName, event) {
        var listeners = registry.filter(eventName);
        return $_9olz3o150jcfx5iuv.broadcast(listeners, event);
      }
    });
    var systemApi = SystemApi({
      debugInfo: $_30v3piwajcfx5gy5.constant('real'),
      triggerEvent: function (customType, target, data) {
        $_6hnwbgy7jcfx5hap.monitorEvent(customType, target, function (logger) {
          $_9olz3o150jcfx5iuv.triggerOnUntilStopped(lookup, customType, data, target, logger);
        });
      },
      triggerFocus: function (target, originator) {
        $_ftkrhf10ljcfx5hqd.read(target).fold(function () {
          $_dzy0lsyfjcfx5hbi.focus(target);
        }, function (_alloyId) {
          $_6hnwbgy7jcfx5hap.monitorEvent($_fe7kcdwvjcfx5h0s.focus(), target, function (logger) {
            $_9olz3o150jcfx5iuv.triggerHandler(lookup, $_fe7kcdwvjcfx5h0s.focus(), {
              originator: $_30v3piwajcfx5gy5.constant(originator),
              target: $_30v3piwajcfx5gy5.constant(target)
            }, target, logger);
          });
        });
      },
      triggerEscape: function (comp, simulatedEvent) {
        systemApi.triggerEvent('keydown', comp.element(), simulatedEvent.event());
      },
      getByUid: function (uid) {
        return getByUid(uid);
      },
      getByDom: function (elem) {
        return getByDom(elem);
      },
      build: $_f8qap712jjcfx5i9p.build,
      addToGui: function (c) {
        add(c);
      },
      removeFromGui: function (c) {
        remove(c);
      },
      addToWorld: function (c) {
        addToWorld(c);
      },
      removeFromWorld: function (c) {
        removeFromWorld(c);
      },
      broadcast: function (message) {
        broadcast(message);
      },
      broadcastOn: function (channels, message) {
        broadcastOn(channels, message);
      }
    });
    var addToWorld = function (component) {
      component.connect(systemApi);
      if (!$_3wpq1xxwjcfx5h87.isText(component.element())) {
        registry.register(component);
        $_91ik4uw8jcfx5gxn.each(component.components(), addToWorld);
        systemApi.triggerEvent($_fe7kcdwvjcfx5h0s.systemInit(), component.element(), { target: $_30v3piwajcfx5gy5.constant(component.element()) });
      }
    };
    var removeFromWorld = function (component) {
      if (!$_3wpq1xxwjcfx5h87.isText(component.element())) {
        $_91ik4uw8jcfx5gxn.each(component.components(), removeFromWorld);
        registry.unregister(component);
      }
      component.disconnect();
    };
    var add = function (component) {
      $_f1qsy3y0jcfx5h99.attach(root, component);
    };
    var remove = function (component) {
      $_f1qsy3y0jcfx5h99.detach(component);
    };
    var destroy = function () {
      domEvents.unbind();
      $_8mramzy4jcfx5haa.remove(root.element());
    };
    var broadcastData = function (data) {
      var receivers = registry.filter($_fe7kcdwvjcfx5h0s.receive());
      $_91ik4uw8jcfx5gxn.each(receivers, function (receiver) {
        var descHandler = receiver.descHandler();
        var handler = $_36d3fz12ujcfx5idh.getHandler(descHandler);
        handler(data);
      });
    };
    var broadcast = function (message) {
      broadcastData({
        universal: $_30v3piwajcfx5gy5.constant(true),
        data: $_30v3piwajcfx5gy5.constant(message)
      });
    };
    var broadcastOn = function (channels, message) {
      broadcastData({
        universal: $_30v3piwajcfx5gy5.constant(false),
        channels: $_30v3piwajcfx5gy5.constant(channels),
        data: $_30v3piwajcfx5gy5.constant(message)
      });
    };
    var getByUid = function (uid) {
      return registry.getById(uid).fold(function () {
        return $_5jjfpzx7jcfx5h3t.error(new Error('Could not find component with uid: "' + uid + '" in system.'));
      }, $_5jjfpzx7jcfx5h3t.value);
    };
    var getByDom = function (elem) {
      return $_ftkrhf10ljcfx5hqd.read(elem).bind(getByUid);
    };
    addToWorld(root);
    return {
      root: $_30v3piwajcfx5gy5.constant(root),
      element: root.element,
      destroy: destroy,
      add: add,
      remove: remove,
      getByUid: getByUid,
      getByDom: getByDom,
      addToWorld: addToWorld,
      removeFromWorld: removeFromWorld,
      broadcast: broadcast,
      broadcastOn: broadcastOn
    };
  };
  var $_c6apd514yjcfx5itz = {
    create: create$6,
    takeover: takeover
  };

  var READ_ONLY_MODE_CLASS = $_30v3piwajcfx5gy5.constant($_46bmn4z0jcfx5hew.resolve('readonly-mode'));
  var EDIT_MODE_CLASS = $_30v3piwajcfx5gy5.constant($_46bmn4z0jcfx5hew.resolve('edit-mode'));
  var OuterContainer = function (spec) {
    var root = $_f8qap712jjcfx5i9p.build(Container.sketch({
      dom: { classes: [$_46bmn4z0jcfx5hew.resolve('outer-container')].concat(spec.classes) },
      containerBehaviours: $_7uu47fw3jcfx5gvw.derive([Swapping.config({
          alpha: READ_ONLY_MODE_CLASS(),
          omega: EDIT_MODE_CLASS()
        })])
    }));
    return $_c6apd514yjcfx5itz.takeover(root);
  };

  var AndroidRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_46bmn4z0jcfx5hew.resolve('android-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_8ypal129jcfx5i6m.api();
    var switchToEdit = $_age4vv14qjcfx5is8.makeEditSwitch(webapp);
    var socket = $_age4vv14qjcfx5is8.makeSocket();
    var dropup = $_2m877j14rjcfx5isi.build($_30v3piwajcfx5gy5.noop, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_7ey66u13mjcfx5ijo.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        w.exit();
        Replacing.remove(socket, switchToEdit);
      });
    };
    var updateMode = function (readOnly) {
      $_age4vv14qjcfx5is8.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_30v3piwajcfx5gy5.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_30v3piwajcfx5gy5.constant(socket),
      dropup: $_30v3piwajcfx5gy5.constant(dropup)
    };
  };

  var initEvents$1 = function (editorApi, iosApi, toolstrip, socket, dropup) {
    var saveSelectionFirst = function () {
      iosApi.run(function (api) {
        api.highlightSelection();
      });
    };
    var refreshIosSelection = function () {
      iosApi.run(function (api) {
        api.refreshSelection();
      });
    };
    var scrollToY = function (yTop, height) {
      var y = yTop - socket.dom().scrollTop;
      iosApi.run(function (api) {
        api.scrollIntoView(y, y + height);
      });
    };
    var scrollToElement = function (target) {
      scrollToY(iosApi, socket);
    };
    var scrollToCursor = function () {
      editorApi.getCursorBox().each(function (box) {
        scrollToY(box.top(), box.height());
      });
    };
    var clearSelection = function () {
      iosApi.run(function (api) {
        api.clearSelection();
      });
    };
    var clearAndRefresh = function () {
      clearSelection();
      refreshThrottle.throttle();
    };
    var refreshView = function () {
      scrollToCursor();
      iosApi.run(function (api) {
        api.syncHeight();
      });
    };
    var reposition = function () {
      var toolbarHeight = $_9z6fpvzqjcfx5hii.get(toolstrip);
      iosApi.run(function (api) {
        api.setViewportOffset(toolbarHeight);
      });
      refreshIosSelection();
      refreshView();
    };
    var toEditing = function () {
      iosApi.run(function (api) {
        api.toEditing();
      });
    };
    var toReading = function () {
      iosApi.run(function (api) {
        api.toReading();
      });
    };
    var onToolbarTouch = function (event) {
      iosApi.run(function (api) {
        api.onToolbarTouch(event);
      });
    };
    var tapping = $_cy2b6613pjcfx5ikk.monitor(editorApi);
    var refreshThrottle = $_8iy77r14jjcfx5iqt.last(refreshView, 300);
    var listeners = [
      editorApi.onKeyup(clearAndRefresh),
      editorApi.onNodeChanged(refreshIosSelection),
      editorApi.onDomChanged(refreshThrottle.throttle),
      editorApi.onDomChanged(refreshIosSelection),
      editorApi.onScrollToCursor(function (tinyEvent) {
        tinyEvent.preventDefault();
        refreshThrottle.throttle();
      }),
      editorApi.onScrollToElement(function (event) {
        scrollToElement(event.element());
      }),
      editorApi.onToEditing(toEditing),
      editorApi.onToReading(toReading),
      $_eteirt13jjcfx5ij9.bind(editorApi.doc(), 'touchend', function (touchEvent) {
        if ($_7yb5g2w7jcfx5gx7.eq(editorApi.html(), touchEvent.target()) || $_7yb5g2w7jcfx5gx7.eq(editorApi.body(), touchEvent.target())) {
        }
      }),
      $_eteirt13jjcfx5ij9.bind(toolstrip, 'transitionend', function (transitionEvent) {
        if (transitionEvent.raw().propertyName === 'height') {
          reposition();
        }
      }),
      $_eteirt13jjcfx5ij9.capture(toolstrip, 'touchstart', function (touchEvent) {
        saveSelectionFirst();
        onToolbarTouch(touchEvent);
        editorApi.onTouchToolstrip();
      }),
      $_eteirt13jjcfx5ij9.bind(editorApi.body(), 'touchstart', function (evt) {
        clearSelection();
        editorApi.onTouchContent();
        tapping.fireTouchstart(evt);
      }),
      tapping.onTouchmove(),
      tapping.onTouchend(),
      $_eteirt13jjcfx5ij9.bind(editorApi.body(), 'click', function (event) {
        event.kill();
      }),
      $_eteirt13jjcfx5ij9.bind(toolstrip, 'touchmove', function () {
        editorApi.onToolbarScrollStart();
      })
    ];
    var destroy = function () {
      $_91ik4uw8jcfx5gxn.each(listeners, function (l) {
        l.unbind();
      });
    };
    return { destroy: destroy };
  };
  var $_7fen4f159jcfx5ixr = { initEvents: initEvents$1 };

  var refreshInput = function (input) {
    var start = input.dom().selectionStart;
    var end = input.dom().selectionEnd;
    var dir = input.dom().selectionDirection;
    setTimeout(function () {
      input.dom().setSelectionRange(start, end, dir);
      $_dzy0lsyfjcfx5hbi.focus(input);
    }, 50);
  };
  var refresh = function (winScope) {
    var sel = winScope.getSelection();
    if (sel.rangeCount > 0) {
      var br = sel.getRangeAt(0);
      var r = winScope.document.createRange();
      r.setStart(br.startContainer, br.startOffset);
      r.setEnd(br.endContainer, br.endOffset);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  };
  var $_fq5x0x15djcfx5iz7 = {
    refreshInput: refreshInput,
    refresh: refresh
  };

  var resume$1 = function (cWin, frame) {
    $_dzy0lsyfjcfx5hbi.active().each(function (active) {
      if (!$_7yb5g2w7jcfx5gx7.eq(active, frame)) {
        $_dzy0lsyfjcfx5hbi.blur(active);
      }
    });
    cWin.focus();
    $_dzy0lsyfjcfx5hbi.focus($_6k7v3dwsjcfx5h08.fromDom(cWin.document.body));
    $_fq5x0x15djcfx5iz7.refresh(cWin);
  };
  var $_8lcrnn15cjcfx5iyw = { resume: resume$1 };

  var FakeSelection = function (win, frame) {
    var doc = win.document;
    var container = $_6k7v3dwsjcfx5h08.fromTag('div');
    $_axxg6hxtjcfx5h7e.add(container, $_46bmn4z0jcfx5hew.resolve('unfocused-selections'));
    $_1g0by4y1jcfx5h9q.append($_6k7v3dwsjcfx5h08.fromDom(doc.documentElement), container);
    var onTouch = $_eteirt13jjcfx5ij9.bind(container, 'touchstart', function (event) {
      event.prevent();
      $_8lcrnn15cjcfx5iyw.resume(win, frame);
      clear();
    });
    var make = function (rectangle) {
      var span = $_6k7v3dwsjcfx5h08.fromTag('span');
      $_aym9qo12xjcfx5iep.add(span, [
        $_46bmn4z0jcfx5hew.resolve('layer-editor'),
        $_46bmn4z0jcfx5hew.resolve('unfocused-selection')
      ]);
      $_3wulrizrjcfx5him.setAll(span, {
        left: rectangle.left() + 'px',
        top: rectangle.top() + 'px',
        width: rectangle.width() + 'px',
        height: rectangle.height() + 'px'
      });
      return span;
    };
    var update = function () {
      clear();
      var rectangles = $_b8zp6c13vjcfx5im1.getRectangles(win);
      var spans = $_91ik4uw8jcfx5gxn.map(rectangles, make);
      $_cn3np4y5jcfx5hai.append(container, spans);
    };
    var clear = function () {
      $_8mramzy4jcfx5haa.empty(container);
    };
    var destroy = function () {
      onTouch.unbind();
      $_8mramzy4jcfx5haa.remove(container);
    };
    var isActive = function () {
      return $_bke8thy2jcfx5h9w.children(container).length > 0;
    };
    return {
      update: update,
      isActive: isActive,
      destroy: destroy,
      clear: clear
    };
  };

  var nu$9 = function (baseFn) {
    var data = $_8i7mfvw9jcfx5gxw.none();
    var callbacks = [];
    var map = function (f) {
      return nu$9(function (nCallback) {
        get(function (data) {
          nCallback(f(data));
        });
      });
    };
    var get = function (nCallback) {
      if (isReady())
        call(nCallback);
      else
        callbacks.push(nCallback);
    };
    var set = function (x) {
      data = $_8i7mfvw9jcfx5gxw.some(x);
      run(callbacks);
      callbacks = [];
    };
    var isReady = function () {
      return data.isSome();
    };
    var run = function (cbs) {
      $_91ik4uw8jcfx5gxn.each(cbs, call);
    };
    var call = function (cb) {
      data.each(function (x) {
        setTimeout(function () {
          cb(x);
        }, 0);
      });
    };
    baseFn(set);
    return {
      get: get,
      map: map,
      isReady: isReady
    };
  };
  var pure$2 = function (a) {
    return nu$9(function (callback) {
      callback(a);
    });
  };
  var $_l7hzc15gjcfx5izk = {
    nu: nu$9,
    pure: pure$2
  };

  var bounce = function (f) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      var me = this;
      setTimeout(function () {
        f.apply(me, args);
      }, 0);
    };
  };
  var $_1jhlf15hjcfx5izn = { bounce: bounce };

  var nu$8 = function (baseFn) {
    var get = function (callback) {
      baseFn($_1jhlf15hjcfx5izn.bounce(callback));
    };
    var map = function (fab) {
      return nu$8(function (callback) {
        get(function (a) {
          var value = fab(a);
          callback(value);
        });
      });
    };
    var bind = function (aFutureB) {
      return nu$8(function (callback) {
        get(function (a) {
          aFutureB(a).get(callback);
        });
      });
    };
    var anonBind = function (futureB) {
      return nu$8(function (callback) {
        get(function (a) {
          futureB.get(callback);
        });
      });
    };
    var toLazy = function () {
      return $_l7hzc15gjcfx5izk.nu(get);
    };
    return {
      map: map,
      bind: bind,
      anonBind: anonBind,
      toLazy: toLazy,
      get: get
    };
  };
  var pure$1 = function (a) {
    return nu$8(function (callback) {
      callback(a);
    });
  };
  var $_f8l37u15fjcfx5izi = {
    nu: nu$8,
    pure: pure$1
  };

  var adjust = function (value, destination, amount) {
    if (Math.abs(value - destination) <= amount) {
      return $_8i7mfvw9jcfx5gxw.none();
    } else if (value < destination) {
      return $_8i7mfvw9jcfx5gxw.some(value + amount);
    } else {
      return $_8i7mfvw9jcfx5gxw.some(value - amount);
    }
  };
  var create$8 = function () {
    var interval = null;
    var animate = function (getCurrent, destination, amount, increment, doFinish, rate) {
      var finished = false;
      var finish = function (v) {
        finished = true;
        doFinish(v);
      };
      clearInterval(interval);
      var abort = function (v) {
        clearInterval(interval);
        finish(v);
      };
      interval = setInterval(function () {
        var value = getCurrent();
        adjust(value, destination, amount).fold(function () {
          clearInterval(interval);
          finish(destination);
        }, function (s) {
          increment(s, abort);
          if (!finished) {
            var newValue = getCurrent();
            if (newValue !== s || Math.abs(newValue - destination) > Math.abs(value - destination)) {
              clearInterval(interval);
              finish(destination);
            }
          }
        });
      }, rate);
    };
    return { animate: animate };
  };
  var $_46mnhk15ijcfx5izo = {
    create: create$8,
    adjust: adjust
  };

  var findDevice = function (deviceWidth, deviceHeight) {
    var devices = [
      {
        width: 320,
        height: 480,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 320,
        height: 568,
        keyboard: {
          portrait: 300,
          landscape: 240
        }
      },
      {
        width: 375,
        height: 667,
        keyboard: {
          portrait: 305,
          landscape: 240
        }
      },
      {
        width: 414,
        height: 736,
        keyboard: {
          portrait: 320,
          landscape: 240
        }
      },
      {
        width: 768,
        height: 1024,
        keyboard: {
          portrait: 320,
          landscape: 400
        }
      },
      {
        width: 1024,
        height: 1366,
        keyboard: {
          portrait: 380,
          landscape: 460
        }
      }
    ];
    return $_g8j28lydjcfx5hbe.findMap(devices, function (device) {
      return deviceWidth <= device.width && deviceHeight <= device.height ? $_8i7mfvw9jcfx5gxw.some(device.keyboard) : $_8i7mfvw9jcfx5gxw.none();
    }).getOr({
      portrait: deviceHeight / 5,
      landscape: deviceWidth / 4
    });
  };
  var $_2wwk3p15ljcfx5j0c = { findDevice: findDevice };

  var softKeyboardLimits = function (outerWindow) {
    return $_2wwk3p15ljcfx5j0c.findDevice(outerWindow.screen.width, outerWindow.screen.height);
  };
  var accountableKeyboardHeight = function (outerWindow) {
    var portrait = $_3nlaja13ijcfx5ij1.get(outerWindow).isPortrait();
    var limits = softKeyboardLimits(outerWindow);
    var keyboard = portrait ? limits.portrait : limits.landscape;
    var visualScreenHeight = portrait ? outerWindow.screen.height : outerWindow.screen.width;
    return visualScreenHeight - outerWindow.innerHeight > keyboard ? 0 : keyboard;
  };
  var getGreenzone = function (socket, dropup) {
    var outerWindow = $_bke8thy2jcfx5h9w.owner(socket).dom().defaultView;
    var viewportHeight = $_9z6fpvzqjcfx5hii.get(socket) + $_9z6fpvzqjcfx5hii.get(dropup);
    var acc = accountableKeyboardHeight(outerWindow);
    return viewportHeight - acc;
  };
  var updatePadding = function (contentBody, socket, dropup) {
    var greenzoneHeight = getGreenzone(socket, dropup);
    var deltaHeight = $_9z6fpvzqjcfx5hii.get(socket) + $_9z6fpvzqjcfx5hii.get(dropup) - greenzoneHeight;
    $_3wulrizrjcfx5him.set(contentBody, 'padding-bottom', deltaHeight + 'px');
  };
  var $_ecede015kjcfx5j06 = {
    getGreenzone: getGreenzone,
    updatePadding: updatePadding
  };

  var fixture = $_49o4fsx3jcfx5h2a.generate([
    {
      fixed: [
        'element',
        'property',
        'offsetY'
      ]
    },
    {
      scroller: [
        'element',
        'offsetY'
      ]
    }
  ]);
  var yFixedData = 'data-' + $_46bmn4z0jcfx5hew.resolve('position-y-fixed');
  var yFixedProperty = 'data-' + $_46bmn4z0jcfx5hew.resolve('y-property');
  var yScrollingData = 'data-' + $_46bmn4z0jcfx5hew.resolve('scrolling');
  var windowSizeData = 'data-' + $_46bmn4z0jcfx5hew.resolve('last-window-height');
  var getYFixedData = function (element) {
    return $_1we4ku13ujcfx5ilx.safeParse(element, yFixedData);
  };
  var getYFixedProperty = function (element) {
    return $_8bne1yxvjcfx5h7n.get(element, yFixedProperty);
  };
  var getLastWindowSize = function (element) {
    return $_1we4ku13ujcfx5ilx.safeParse(element, windowSizeData);
  };
  var classifyFixed = function (element, offsetY) {
    var prop = getYFixedProperty(element);
    return fixture.fixed(element, prop, offsetY);
  };
  var classifyScrolling = function (element, offsetY) {
    return fixture.scroller(element, offsetY);
  };
  var classify = function (element) {
    var offsetY = getYFixedData(element);
    var classifier = $_8bne1yxvjcfx5h7n.get(element, yScrollingData) === 'true' ? classifyScrolling : classifyFixed;
    return classifier(element, offsetY);
  };
  var findFixtures = function (container) {
    var candidates = $_5iffulzjjcfx5hhq.descendants(container, '[' + yFixedData + ']');
    return $_91ik4uw8jcfx5gxn.map(candidates, classify);
  };
  var takeoverToolbar = function (toolbar) {
    var oldToolbarStyle = $_8bne1yxvjcfx5h7n.get(toolbar, 'style');
    $_3wulrizrjcfx5him.setAll(toolbar, {
      position: 'absolute',
      top: '0px'
    });
    $_8bne1yxvjcfx5h7n.set(toolbar, yFixedData, '0px');
    $_8bne1yxvjcfx5h7n.set(toolbar, yFixedProperty, 'top');
    var restore = function () {
      $_8bne1yxvjcfx5h7n.set(toolbar, 'style', oldToolbarStyle || '');
      $_8bne1yxvjcfx5h7n.remove(toolbar, yFixedData);
      $_8bne1yxvjcfx5h7n.remove(toolbar, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverViewport = function (toolbarHeight, height, viewport) {
    var oldViewportStyle = $_8bne1yxvjcfx5h7n.get(viewport, 'style');
    $_acvexl13gjcfx5iir.register(viewport);
    $_3wulrizrjcfx5him.setAll(viewport, {
      position: 'absolute',
      height: height + 'px',
      width: '100%',
      top: toolbarHeight + 'px'
    });
    $_8bne1yxvjcfx5h7n.set(viewport, yFixedData, toolbarHeight + 'px');
    $_8bne1yxvjcfx5h7n.set(viewport, yScrollingData, 'true');
    $_8bne1yxvjcfx5h7n.set(viewport, yFixedProperty, 'top');
    var restore = function () {
      $_acvexl13gjcfx5iir.deregister(viewport);
      $_8bne1yxvjcfx5h7n.set(viewport, 'style', oldViewportStyle || '');
      $_8bne1yxvjcfx5h7n.remove(viewport, yFixedData);
      $_8bne1yxvjcfx5h7n.remove(viewport, yScrollingData);
      $_8bne1yxvjcfx5h7n.remove(viewport, yFixedProperty);
    };
    return { restore: restore };
  };
  var takeoverDropup = function (dropup, toolbarHeight, viewportHeight) {
    var oldDropupStyle = $_8bne1yxvjcfx5h7n.get(dropup, 'style');
    $_3wulrizrjcfx5him.setAll(dropup, {
      position: 'absolute',
      bottom: '0px'
    });
    $_8bne1yxvjcfx5h7n.set(dropup, yFixedData, '0px');
    $_8bne1yxvjcfx5h7n.set(dropup, yFixedProperty, 'bottom');
    var restore = function () {
      $_8bne1yxvjcfx5h7n.set(dropup, 'style', oldDropupStyle || '');
      $_8bne1yxvjcfx5h7n.remove(dropup, yFixedData);
      $_8bne1yxvjcfx5h7n.remove(dropup, yFixedProperty);
    };
    return { restore: restore };
  };
  var deriveViewportHeight = function (viewport, toolbarHeight, dropupHeight) {
    var outerWindow = $_bke8thy2jcfx5h9w.owner(viewport).dom().defaultView;
    var winH = outerWindow.innerHeight;
    $_8bne1yxvjcfx5h7n.set(viewport, windowSizeData, winH + 'px');
    return winH - toolbarHeight - dropupHeight;
  };
  var takeover$1 = function (viewport, contentBody, toolbar, dropup) {
    var outerWindow = $_bke8thy2jcfx5h9w.owner(viewport).dom().defaultView;
    var toolbarSetup = takeoverToolbar(toolbar);
    var toolbarHeight = $_9z6fpvzqjcfx5hii.get(toolbar);
    var dropupHeight = $_9z6fpvzqjcfx5hii.get(dropup);
    var viewportHeight = deriveViewportHeight(viewport, toolbarHeight, dropupHeight);
    var viewportSetup = takeoverViewport(toolbarHeight, viewportHeight, viewport);
    var dropupSetup = takeoverDropup(dropup, toolbarHeight, viewportHeight);
    var isActive = true;
    var restore = function () {
      isActive = false;
      toolbarSetup.restore();
      viewportSetup.restore();
      dropupSetup.restore();
    };
    var isExpanding = function () {
      var currentWinHeight = outerWindow.innerHeight;
      var lastWinHeight = getLastWindowSize(viewport);
      return currentWinHeight > lastWinHeight;
    };
    var refresh = function () {
      if (isActive) {
        var newToolbarHeight = $_9z6fpvzqjcfx5hii.get(toolbar);
        var dropupHeight_1 = $_9z6fpvzqjcfx5hii.get(dropup);
        var newHeight = deriveViewportHeight(viewport, newToolbarHeight, dropupHeight_1);
        $_8bne1yxvjcfx5h7n.set(viewport, yFixedData, newToolbarHeight + 'px');
        $_3wulrizrjcfx5him.set(viewport, 'height', newHeight + 'px');
        $_3wulrizrjcfx5him.set(dropup, 'bottom', -(newToolbarHeight + newHeight + dropupHeight_1) + 'px');
        $_ecede015kjcfx5j06.updatePadding(contentBody, viewport, dropup);
      }
    };
    var setViewportOffset = function (newYOffset) {
      var offsetPx = newYOffset + 'px';
      $_8bne1yxvjcfx5h7n.set(viewport, yFixedData, offsetPx);
      refresh();
    };
    $_ecede015kjcfx5j06.updatePadding(contentBody, viewport, dropup);
    return {
      setViewportOffset: setViewportOffset,
      isExpanding: isExpanding,
      isShrinking: $_30v3piwajcfx5gy5.not(isExpanding),
      refresh: refresh,
      restore: restore
    };
  };
  var $_fos15r15jjcfx5izt = {
    findFixtures: findFixtures,
    takeover: takeover$1,
    getYFixedData: getYFixedData
  };

  var animator = $_46mnhk15ijcfx5izo.create();
  var ANIMATION_STEP = 15;
  var NUM_TOP_ANIMATION_FRAMES = 10;
  var ANIMATION_RATE = 10;
  var lastScroll = 'data-' + $_46bmn4z0jcfx5hew.resolve('last-scroll-top');
  var getTop = function (element) {
    var raw = $_3wulrizrjcfx5him.getRaw(element, 'top').getOr(0);
    return parseInt(raw, 10);
  };
  var getScrollTop = function (element) {
    return parseInt(element.dom().scrollTop, 10);
  };
  var moveScrollAndTop = function (element, destination, finalTop) {
    return $_f8l37u15fjcfx5izi.nu(function (callback) {
      var getCurrent = $_30v3piwajcfx5gy5.curry(getScrollTop, element);
      var update = function (newScroll) {
        element.dom().scrollTop = newScroll;
        $_3wulrizrjcfx5him.set(element, 'top', getTop(element) + ANIMATION_STEP + 'px');
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_3wulrizrjcfx5him.set(element, 'top', finalTop + 'px');
        callback(destination);
      };
      animator.animate(getCurrent, destination, ANIMATION_STEP, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyScroll = function (element, destination) {
    return $_f8l37u15fjcfx5izi.nu(function (callback) {
      var getCurrent = $_30v3piwajcfx5gy5.curry(getScrollTop, element);
      $_8bne1yxvjcfx5h7n.set(element, lastScroll, getCurrent());
      var update = function (newScroll, abort) {
        var previous = $_1we4ku13ujcfx5ilx.safeParse(element, lastScroll);
        if (previous !== element.dom().scrollTop) {
          abort(element.dom().scrollTop);
        } else {
          element.dom().scrollTop = newScroll;
          $_8bne1yxvjcfx5h7n.set(element, lastScroll, newScroll);
        }
      };
      var finish = function () {
        element.dom().scrollTop = destination;
        $_8bne1yxvjcfx5h7n.set(element, lastScroll, destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var moveOnlyTop = function (element, destination) {
    return $_f8l37u15fjcfx5izi.nu(function (callback) {
      var getCurrent = $_30v3piwajcfx5gy5.curry(getTop, element);
      var update = function (newTop) {
        $_3wulrizrjcfx5him.set(element, 'top', newTop + 'px');
      };
      var finish = function () {
        update(destination);
        callback(destination);
      };
      var distance = Math.abs(destination - getCurrent());
      var step = Math.ceil(distance / NUM_TOP_ANIMATION_FRAMES);
      animator.animate(getCurrent, destination, step, update, finish, ANIMATION_RATE);
    });
  };
  var updateTop = function (element, amount) {
    var newTop = amount + $_fos15r15jjcfx5izt.getYFixedData(element) + 'px';
    $_3wulrizrjcfx5him.set(element, 'top', newTop);
  };
  var moveWindowScroll = function (toolbar, viewport, destY) {
    var outerWindow = $_bke8thy2jcfx5h9w.owner(toolbar).dom().defaultView;
    return $_f8l37u15fjcfx5izi.nu(function (callback) {
      updateTop(toolbar, destY);
      updateTop(viewport, destY);
      outerWindow.scrollTo(0, destY);
      callback(destY);
    });
  };
  var $_9tg8xh15ejcfx5iza = {
    moveScrollAndTop: moveScrollAndTop,
    moveOnlyScroll: moveOnlyScroll,
    moveOnlyTop: moveOnlyTop,
    moveWindowScroll: moveWindowScroll
  };

  var BackgroundActivity = function (doAction) {
    var action = Cell($_l7hzc15gjcfx5izk.pure({}));
    var start = function (value) {
      var future = $_l7hzc15gjcfx5izk.nu(function (callback) {
        return doAction(value).get(callback);
      });
      action.set(future);
    };
    var idle = function (g) {
      action.get().get(function () {
        g();
      });
    };
    return {
      start: start,
      idle: idle
    };
  };

  var scrollIntoView = function (cWin, socket, dropup, top, bottom) {
    var greenzone = $_ecede015kjcfx5j06.getGreenzone(socket, dropup);
    var refreshCursor = $_30v3piwajcfx5gy5.curry($_fq5x0x15djcfx5iz7.refresh, cWin);
    if (top > greenzone || bottom > greenzone) {
      $_9tg8xh15ejcfx5iza.moveOnlyScroll(socket, socket.dom().scrollTop - greenzone + bottom).get(refreshCursor);
    } else if (top < 0) {
      $_9tg8xh15ejcfx5iza.moveOnlyScroll(socket, socket.dom().scrollTop + top).get(refreshCursor);
    } else {
    }
  };
  var $_1yzrm715njcfx5j0n = { scrollIntoView: scrollIntoView };

  var par$1 = function (asyncValues, nu) {
    return nu(function (callback) {
      var r = [];
      var count = 0;
      var cb = function (i) {
        return function (value) {
          r[i] = value;
          count++;
          if (count >= asyncValues.length) {
            callback(r);
          }
        };
      };
      if (asyncValues.length === 0) {
        callback([]);
      } else {
        $_91ik4uw8jcfx5gxn.each(asyncValues, function (asyncValue, i) {
          asyncValue.get(cb(i));
        });
      }
    });
  };
  var $_d8uqe15qjcfx5j0y = { par: par$1 };

  var par = function (futures) {
    return $_d8uqe15qjcfx5j0y.par(futures, $_f8l37u15fjcfx5izi.nu);
  };
  var mapM = function (array, fn) {
    var futures = $_91ik4uw8jcfx5gxn.map(array, fn);
    return par(futures);
  };
  var compose$1 = function (f, g) {
    return function (a) {
      return g(a).bind(f);
    };
  };
  var $_bsjuu915pjcfx5j0w = {
    par: par,
    mapM: mapM,
    compose: compose$1
  };

  var updateFixed = function (element, property, winY, offsetY) {
    var destination = winY + offsetY;
    $_3wulrizrjcfx5him.set(element, property, destination + 'px');
    return $_f8l37u15fjcfx5izi.pure(offsetY);
  };
  var updateScrollingFixed = function (element, winY, offsetY) {
    var destTop = winY + offsetY;
    var oldProp = $_3wulrizrjcfx5him.getRaw(element, 'top').getOr(offsetY);
    var delta = destTop - parseInt(oldProp, 10);
    var destScroll = element.dom().scrollTop + delta;
    return $_9tg8xh15ejcfx5iza.moveScrollAndTop(element, destScroll, destTop);
  };
  var updateFixture = function (fixture, winY) {
    return fixture.fold(function (element, property, offsetY) {
      return updateFixed(element, property, winY, offsetY);
    }, function (element, offsetY) {
      return updateScrollingFixed(element, winY, offsetY);
    });
  };
  var updatePositions = function (container, winY) {
    var fixtures = $_fos15r15jjcfx5izt.findFixtures(container);
    var updates = $_91ik4uw8jcfx5gxn.map(fixtures, function (fixture) {
      return updateFixture(fixture, winY);
    });
    return $_bsjuu915pjcfx5j0w.par(updates);
  };
  var $_2gfalt15ojcfx5j0q = { updatePositions: updatePositions };

  var input = function (parent, operation) {
    var input = $_6k7v3dwsjcfx5h08.fromTag('input');
    $_3wulrizrjcfx5him.setAll(input, {
      opacity: '0',
      position: 'absolute',
      top: '-1000px',
      left: '-1000px'
    });
    $_1g0by4y1jcfx5h9q.append(parent, input);
    $_dzy0lsyfjcfx5hbi.focus(input);
    operation(input);
    $_8mramzy4jcfx5haa.remove(input);
  };
  var $_7u32e115rjcfx5j11 = { input: input };

  var VIEW_MARGIN = 5;
  var register$2 = function (toolstrip, socket, container, outerWindow, structure, cWin) {
    var scroller = BackgroundActivity(function (y) {
      return $_9tg8xh15ejcfx5iza.moveWindowScroll(toolstrip, socket, y);
    });
    var scrollBounds = function () {
      var rects = $_b8zp6c13vjcfx5im1.getRectangles(cWin);
      return $_8i7mfvw9jcfx5gxw.from(rects[0]).bind(function (rect) {
        var viewTop = rect.top() - socket.dom().scrollTop;
        var outside = viewTop > outerWindow.innerHeight + VIEW_MARGIN || viewTop < -VIEW_MARGIN;
        return outside ? $_8i7mfvw9jcfx5gxw.some({
          top: $_30v3piwajcfx5gy5.constant(viewTop),
          bottom: $_30v3piwajcfx5gy5.constant(viewTop + rect.height())
        }) : $_8i7mfvw9jcfx5gxw.none();
      });
    };
    var scrollThrottle = $_8iy77r14jjcfx5iqt.last(function () {
      scroller.idle(function () {
        $_2gfalt15ojcfx5j0q.updatePositions(container, outerWindow.pageYOffset).get(function () {
          var extraScroll = scrollBounds();
          extraScroll.each(function (extra) {
            socket.dom().scrollTop = socket.dom().scrollTop + extra.top();
          });
          scroller.start(0);
          structure.refresh();
        });
      });
    }, 1000);
    var onScroll = $_eteirt13jjcfx5ij9.bind($_6k7v3dwsjcfx5h08.fromDom(outerWindow), 'scroll', function () {
      if (outerWindow.pageYOffset < 0) {
        return;
      }
      scrollThrottle.throttle();
    });
    $_2gfalt15ojcfx5j0q.updatePositions(container, outerWindow.pageYOffset).get($_30v3piwajcfx5gy5.identity);
    return { unbind: onScroll.unbind };
  };
  var setup$3 = function (bag) {
    var cWin = bag.cWin();
    var ceBody = bag.ceBody();
    var socket = bag.socket();
    var toolstrip = bag.toolstrip();
    var toolbar = bag.toolbar();
    var contentElement = bag.contentElement();
    var keyboardType = bag.keyboardType();
    var outerWindow = bag.outerWindow();
    var dropup = bag.dropup();
    var structure = $_fos15r15jjcfx5izt.takeover(socket, ceBody, toolstrip, dropup);
    var keyboardModel = keyboardType(bag.outerBody(), cWin, $_5392z2y6jcfx5hal.body(), contentElement, toolstrip, toolbar);
    var toEditing = function () {
      keyboardModel.toEditing();
      clearSelection();
    };
    var toReading = function () {
      keyboardModel.toReading();
    };
    var onToolbarTouch = function (event) {
      keyboardModel.onToolbarTouch(event);
    };
    var onOrientation = $_3nlaja13ijcfx5ij1.onChange(outerWindow, {
      onChange: $_30v3piwajcfx5gy5.noop,
      onReady: structure.refresh
    });
    onOrientation.onAdjustment(function () {
      structure.refresh();
    });
    var onResize = $_eteirt13jjcfx5ij9.bind($_6k7v3dwsjcfx5h08.fromDom(outerWindow), 'resize', function () {
      if (structure.isExpanding()) {
        structure.refresh();
      }
    });
    var onScroll = register$2(toolstrip, socket, bag.outerBody(), outerWindow, structure, cWin);
    var unfocusedSelection = FakeSelection(cWin, contentElement);
    var refreshSelection = function () {
      if (unfocusedSelection.isActive()) {
        unfocusedSelection.update();
      }
    };
    var highlightSelection = function () {
      unfocusedSelection.update();
    };
    var clearSelection = function () {
      unfocusedSelection.clear();
    };
    var scrollIntoView = function (top, bottom) {
      $_1yzrm715njcfx5j0n.scrollIntoView(cWin, socket, dropup, top, bottom);
    };
    var syncHeight = function () {
      $_3wulrizrjcfx5him.set(contentElement, 'height', contentElement.dom().contentWindow.document.body.scrollHeight + 'px');
    };
    var setViewportOffset = function (newYOffset) {
      structure.setViewportOffset(newYOffset);
      $_9tg8xh15ejcfx5iza.moveOnlyTop(socket, newYOffset).get($_30v3piwajcfx5gy5.identity);
    };
    var destroy = function () {
      structure.restore();
      onOrientation.destroy();
      onScroll.unbind();
      onResize.unbind();
      keyboardModel.destroy();
      unfocusedSelection.destroy();
      $_7u32e115rjcfx5j11.input($_5392z2y6jcfx5hal.body(), $_dzy0lsyfjcfx5hbi.blur);
    };
    return {
      toEditing: toEditing,
      toReading: toReading,
      onToolbarTouch: onToolbarTouch,
      refreshSelection: refreshSelection,
      clearSelection: clearSelection,
      highlightSelection: highlightSelection,
      scrollIntoView: scrollIntoView,
      updateToolbarPadding: $_30v3piwajcfx5gy5.noop,
      setViewportOffset: setViewportOffset,
      syncHeight: syncHeight,
      refreshStructure: structure.refresh,
      destroy: destroy
    };
  };
  var $_2rxvam15ajcfx5iy1 = { setup: setup$3 };

  var stubborn = function (outerBody, cWin, page, frame) {
    var toEditing = function () {
      $_8lcrnn15cjcfx5iyw.resume(cWin, frame);
    };
    var toReading = function () {
      $_7u32e115rjcfx5j11.input(outerBody, $_dzy0lsyfjcfx5hbi.blur);
    };
    var captureInput = $_eteirt13jjcfx5ij9.bind(page, 'keydown', function (evt) {
      if (!$_91ik4uw8jcfx5gxn.contains([
          'input',
          'textarea'
        ], $_3wpq1xxwjcfx5h87.name(evt.target()))) {
        toEditing();
      }
    });
    var onToolbarTouch = function () {
    };
    var destroy = function () {
      captureInput.unbind();
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: destroy
    };
  };
  var timid = function (outerBody, cWin, page, frame) {
    var dismissKeyboard = function () {
      $_dzy0lsyfjcfx5hbi.blur(frame);
    };
    var onToolbarTouch = function () {
      dismissKeyboard();
    };
    var toReading = function () {
      dismissKeyboard();
    };
    var toEditing = function () {
      $_8lcrnn15cjcfx5iyw.resume(cWin, frame);
    };
    return {
      toReading: toReading,
      toEditing: toEditing,
      onToolbarTouch: onToolbarTouch,
      destroy: $_30v3piwajcfx5gy5.noop
    };
  };
  var $_4o0l0s15sjcfx5j1a = {
    stubborn: stubborn,
    timid: timid
  };

  var create$7 = function (platform, mask) {
    var meta = $_g7glth14gjcfx5iq0.tag();
    var priorState = $_8ypal129jcfx5i6m.value();
    var scrollEvents = $_8ypal129jcfx5i6m.value();
    var iosApi = $_8ypal129jcfx5i6m.api();
    var iosEvents = $_8ypal129jcfx5i6m.api();
    var enter = function () {
      mask.hide();
      var doc = $_6k7v3dwsjcfx5h08.fromDom(document);
      $_547lkj14ejcfx5ipb.getActiveApi(platform.editor).each(function (editorApi) {
        priorState.set({
          socketHeight: $_3wulrizrjcfx5him.getRaw(platform.socket, 'height'),
          iframeHeight: $_3wulrizrjcfx5him.getRaw(editorApi.frame(), 'height'),
          outerScroll: document.body.scrollTop
        });
        scrollEvents.set({ exclusives: $_eshc6g14pjcfx5irz.exclusive(doc, '.' + $_acvexl13gjcfx5iir.scrollable()) });
        $_axxg6hxtjcfx5h7e.add(platform.container, $_46bmn4z0jcfx5hew.resolve('fullscreen-maximized'));
        $_dfpxqk14fjcfx5ipo.clobberStyles(platform.container, editorApi.body());
        meta.maximize();
        $_3wulrizrjcfx5him.set(platform.socket, 'overflow', 'scroll');
        $_3wulrizrjcfx5him.set(platform.socket, '-webkit-overflow-scrolling', 'touch');
        $_dzy0lsyfjcfx5hbi.focus(editorApi.body());
        var setupBag = $_ci6qsrxljcfx5h6b.immutableBag([
          'cWin',
          'ceBody',
          'socket',
          'toolstrip',
          'toolbar',
          'dropup',
          'contentElement',
          'cursor',
          'keyboardType',
          'isScrolling',
          'outerWindow',
          'outerBody'
        ], []);
        iosApi.set($_2rxvam15ajcfx5iy1.setup(setupBag({
          cWin: editorApi.win(),
          ceBody: editorApi.body(),
          socket: platform.socket,
          toolstrip: platform.toolstrip,
          toolbar: platform.toolbar,
          dropup: platform.dropup.element(),
          contentElement: editorApi.frame(),
          cursor: $_30v3piwajcfx5gy5.noop,
          outerBody: platform.body,
          outerWindow: platform.win,
          keyboardType: $_4o0l0s15sjcfx5j1a.stubborn,
          isScrolling: function () {
            return scrollEvents.get().exists(function (s) {
              return s.socket.isScrolling();
            });
          }
        })));
        iosApi.run(function (api) {
          api.syncHeight();
        });
        iosEvents.set($_7fen4f159jcfx5ixr.initEvents(editorApi, iosApi, platform.toolstrip, platform.socket, platform.dropup));
      });
    };
    var exit = function () {
      meta.restore();
      iosEvents.clear();
      iosApi.clear();
      mask.show();
      priorState.on(function (s) {
        s.socketHeight.each(function (h) {
          $_3wulrizrjcfx5him.set(platform.socket, 'height', h);
        });
        s.iframeHeight.each(function (h) {
          $_3wulrizrjcfx5him.set(platform.editor.getFrame(), 'height', h);
        });
        document.body.scrollTop = s.scrollTop;
      });
      priorState.clear();
      scrollEvents.on(function (s) {
        s.exclusives.unbind();
      });
      scrollEvents.clear();
      $_axxg6hxtjcfx5h7e.remove(platform.container, $_46bmn4z0jcfx5hew.resolve('fullscreen-maximized'));
      $_dfpxqk14fjcfx5ipo.restoreStyles();
      $_acvexl13gjcfx5iir.deregister(platform.toolbar);
      $_3wulrizrjcfx5him.remove(platform.socket, 'overflow');
      $_3wulrizrjcfx5him.remove(platform.socket, '-webkit-overflow-scrolling');
      $_dzy0lsyfjcfx5hbi.blur(platform.editor.getFrame());
      $_547lkj14ejcfx5ipb.getActiveApi(platform.editor).each(function (editorApi) {
        editorApi.clearSelection();
      });
    };
    var refreshStructure = function () {
      iosApi.run(function (api) {
        api.refreshStructure();
      });
    };
    return {
      enter: enter,
      refreshStructure: refreshStructure,
      exit: exit
    };
  };
  var $_70xg7z158jcfx5ix8 = { create: create$7 };

  var produce$1 = function (raw) {
    var mobile = $_fj9y9nxgjcfx5h5a.asRawOrDie('Getting IosWebapp schema', MobileSchema, raw);
    $_3wulrizrjcfx5him.set(mobile.toolstrip, 'width', '100%');
    $_3wulrizrjcfx5him.set(mobile.container, 'position', 'relative');
    var onView = function () {
      mobile.setReadOnly(true);
      mode.enter();
    };
    var mask = $_f8qap712jjcfx5i9p.build($_2j4vn014ijcfx5iqe.sketch(onView, mobile.translate));
    mobile.alloy.add(mask);
    var maskApi = {
      show: function () {
        mobile.alloy.add(mask);
      },
      hide: function () {
        mobile.alloy.remove(mask);
      }
    };
    var mode = $_70xg7z158jcfx5ix8.create(mobile, maskApi);
    return {
      setReadOnly: mobile.setReadOnly,
      refreshStructure: mode.refreshStructure,
      enter: mode.enter,
      exit: mode.exit,
      destroy: $_30v3piwajcfx5gy5.noop
    };
  };
  var $_a3ax4f157jcfx5iww = { produce: produce$1 };

  var IosRealm = function (scrollIntoView) {
    var alloy = OuterContainer({ classes: [$_46bmn4z0jcfx5hew.resolve('ios-container')] });
    var toolbar = ScrollingToolbar();
    var webapp = $_8ypal129jcfx5i6m.api();
    var switchToEdit = $_age4vv14qjcfx5is8.makeEditSwitch(webapp);
    var socket = $_age4vv14qjcfx5is8.makeSocket();
    var dropup = $_2m877j14rjcfx5isi.build(function () {
      webapp.run(function (w) {
        w.refreshStructure();
      });
    }, scrollIntoView);
    alloy.add(toolbar.wrapper());
    alloy.add(socket);
    alloy.add(dropup.component());
    var setToolbarGroups = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setGroups(groups);
    };
    var setContextToolbar = function (rawGroups) {
      var groups = toolbar.createGroups(rawGroups);
      toolbar.setContextToolbar(groups);
    };
    var focusToolbar = function () {
      toolbar.focus();
    };
    var restoreToolbar = function () {
      toolbar.restoreToolbar();
    };
    var init = function (spec) {
      webapp.set($_a3ax4f157jcfx5iww.produce(spec));
    };
    var exit = function () {
      webapp.run(function (w) {
        Replacing.remove(socket, switchToEdit);
        w.exit();
      });
    };
    var updateMode = function (readOnly) {
      $_age4vv14qjcfx5is8.updateMode(socket, switchToEdit, readOnly, alloy.root());
    };
    return {
      system: $_30v3piwajcfx5gy5.constant(alloy),
      element: alloy.element,
      init: init,
      exit: exit,
      setToolbarGroups: setToolbarGroups,
      setContextToolbar: setContextToolbar,
      focusToolbar: focusToolbar,
      restoreToolbar: restoreToolbar,
      updateMode: updateMode,
      socket: $_30v3piwajcfx5gy5.constant(socket),
      dropup: $_30v3piwajcfx5gy5.constant(dropup)
    };
  };

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var derive$4 = function (editor) {
    var base = $_42faa8x5jcfx5h3h.readOptFrom(editor.settings, 'skin_url').fold(function () {
      return EditorManager.baseURL + '/skins/' + 'lightgray';
    }, function (url) {
      return url;
    });
    return {
      content: base + '/content.mobile.min.css',
      ui: base + '/skin.mobile.min.css'
    };
  };
  var $_fi2md315tjcfx5j1k = { derive: derive$4 };

  var fontSizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large'
  ];
  var fireChange$1 = function (realm, command, state) {
    realm.system().broadcastOn([$_e79ixyynjcfx5hc5.formatChanged()], {
      command: command,
      state: state
    });
  };
  var init$5 = function (realm, editor) {
    var allFormats = $_929ptpwzjcfx5h1b.keys(editor.formatter.get());
    $_91ik4uw8jcfx5gxn.each(allFormats, function (command) {
      editor.formatter.formatChanged(command, function (state) {
        fireChange$1(realm, command, state);
      });
    });
    $_91ik4uw8jcfx5gxn.each([
      'ul',
      'ol'
    ], function (command) {
      editor.selection.selectorChanged(command, function (state, data) {
        fireChange$1(realm, command, state);
      });
    });
  };
  var $_bsa4x715vjcfx5j1r = {
    init: init$5,
    fontSizes: $_30v3piwajcfx5gy5.constant(fontSizes)
  };

  var fireSkinLoaded = function (editor) {
    var done = function () {
      editor._skinLoaded = true;
      editor.fire('SkinLoaded');
    };
    return function () {
      if (editor.initialized) {
        done();
      } else {
        editor.on('init', done);
      }
    };
  };
  var $_88bsa915wjcfx5j1y = { fireSkinLoaded: fireSkinLoaded };

  var READING = $_30v3piwajcfx5gy5.constant('toReading');
  var EDITING = $_30v3piwajcfx5gy5.constant('toEditing');
  ThemeManager.add('mobile', function (editor) {
    var renderUI = function (args) {
      var cssUrls = $_fi2md315tjcfx5j1k.derive(editor);
      if ($_g72x2ymjcfx5hc4.isSkinDisabled(editor) === false) {
        editor.contentCSS.push(cssUrls.content);
        DOMUtils.DOM.styleSheetLoader.load(cssUrls.ui, $_88bsa915wjcfx5j1y.fireSkinLoaded(editor));
      } else {
        $_88bsa915wjcfx5j1y.fireSkinLoaded(editor)();
      }
      var doScrollIntoView = function () {
        editor.fire('scrollIntoView');
      };
      var wrapper = $_6k7v3dwsjcfx5h08.fromTag('div');
      var realm = $_f916s2wfjcfx5gyj.detect().os.isAndroid() ? AndroidRealm(doScrollIntoView) : IosRealm(doScrollIntoView);
      var original = $_6k7v3dwsjcfx5h08.fromDom(args.targetNode);
      $_1g0by4y1jcfx5h9q.after(original, wrapper);
      $_f1qsy3y0jcfx5h99.attachSystem(wrapper, realm.system());
      var findFocusIn = function (elem) {
        return $_dzy0lsyfjcfx5hbi.search(elem).bind(function (focused) {
          return realm.system().getByDom(focused).toOption();
        });
      };
      var outerWindow = args.targetNode.ownerDocument.defaultView;
      var orientation = $_3nlaja13ijcfx5ij1.onChange(outerWindow, {
        onChange: function () {
          var alloy = realm.system();
          alloy.broadcastOn([$_e79ixyynjcfx5hc5.orientationChanged()], { width: $_3nlaja13ijcfx5ij1.getActualWidth(outerWindow) });
        },
        onReady: $_30v3piwajcfx5gy5.noop
      });
      var setReadOnly = function (readOnlyGroups, mainGroups, ro) {
        if (ro === false) {
          editor.selection.collapse();
        }
        realm.setToolbarGroups(ro ? readOnlyGroups.get() : mainGroups.get());
        editor.setMode(ro === true ? 'readonly' : 'design');
        editor.fire(ro === true ? READING() : EDITING());
        realm.updateMode(ro);
      };
      var bindHandler = function (label, handler) {
        editor.on(label, handler);
        return {
          unbind: function () {
            editor.off(label);
          }
        };
      };
      editor.on('init', function () {
        realm.init({
          editor: {
            getFrame: function () {
              return $_6k7v3dwsjcfx5h08.fromDom(editor.contentAreaContainer.querySelector('iframe'));
            },
            onDomChanged: function () {
              return { unbind: $_30v3piwajcfx5gy5.noop };
            },
            onToReading: function (handler) {
              return bindHandler(READING(), handler);
            },
            onToEditing: function (handler) {
              return bindHandler(EDITING(), handler);
            },
            onScrollToCursor: function (handler) {
              editor.on('scrollIntoView', function (tinyEvent) {
                handler(tinyEvent);
              });
              var unbind = function () {
                editor.off('scrollIntoView');
                orientation.destroy();
              };
              return { unbind: unbind };
            },
            onTouchToolstrip: function () {
              hideDropup();
            },
            onTouchContent: function () {
              var toolbar = $_6k7v3dwsjcfx5h08.fromDom(editor.editorContainer.querySelector('.' + $_46bmn4z0jcfx5hew.resolve('toolbar')));
              findFocusIn(toolbar).each($_7pg78vwujcfx5h0i.emitExecute);
              realm.restoreToolbar();
              hideDropup();
            },
            onTapContent: function (evt) {
              var target = evt.target();
              if ($_3wpq1xxwjcfx5h87.name(target) === 'img') {
                editor.selection.select(target.dom());
                evt.kill();
              } else if ($_3wpq1xxwjcfx5h87.name(target) === 'a') {
                var component = realm.system().getByDom($_6k7v3dwsjcfx5h08.fromDom(editor.editorContainer));
                component.each(function (container) {
                  if (Swapping.isAlpha(container)) {
                    $_awd4xbyljcfx5hc3.openLink(target.dom());
                  }
                });
              }
            }
          },
          container: $_6k7v3dwsjcfx5h08.fromDom(editor.editorContainer),
          socket: $_6k7v3dwsjcfx5h08.fromDom(editor.contentAreaContainer),
          toolstrip: $_6k7v3dwsjcfx5h08.fromDom(editor.editorContainer.querySelector('.' + $_46bmn4z0jcfx5hew.resolve('toolstrip'))),
          toolbar: $_6k7v3dwsjcfx5h08.fromDom(editor.editorContainer.querySelector('.' + $_46bmn4z0jcfx5hew.resolve('toolbar'))),
          dropup: realm.dropup(),
          alloy: realm.system(),
          translate: $_30v3piwajcfx5gy5.noop,
          setReadOnly: function (ro) {
            setReadOnly(readOnlyGroups, mainGroups, ro);
          }
        });
        var hideDropup = function () {
          realm.dropup().disappear(function () {
            realm.system().broadcastOn([$_e79ixyynjcfx5hc5.dropupDismissed()], {});
          });
        };
        $_6hnwbgy7jcfx5hap.registerInspector('remove this', realm.system());
        var backToMaskGroup = {
          label: 'The first group',
          scrollable: false,
          items: [$_gg259uz1jcfx5hf0.forToolbar('back', function () {
              editor.selection.collapse();
              realm.exit();
            }, {})]
        };
        var backToReadOnlyGroup = {
          label: 'Back to read only',
          scrollable: false,
          items: [$_gg259uz1jcfx5hf0.forToolbar('readonly-back', function () {
              setReadOnly(readOnlyGroups, mainGroups, true);
            }, {})]
        };
        var readOnlyGroup = {
          label: 'The read only mode group',
          scrollable: true,
          items: []
        };
        var features = $_5075wyojcfx5hc9.setup(realm, editor);
        var items = $_5075wyojcfx5hc9.detect(editor.settings, features);
        var actionGroup = {
          label: 'the action group',
          scrollable: true,
          items: items
        };
        var extraGroup = {
          label: 'The extra group',
          scrollable: false,
          items: []
        };
        var mainGroups = Cell([
          backToReadOnlyGroup,
          actionGroup,
          extraGroup
        ]);
        var readOnlyGroups = Cell([
          backToMaskGroup,
          readOnlyGroup,
          extraGroup
        ]);
        $_bsa4x715vjcfx5j1r.init(realm, editor);
      });
      return {
        iframeContainer: realm.socket().element().dom(),
        editorContainer: realm.element().dom()
      };
    };
    return {
      getNotificationManagerImpl: function () {
        return {
          open: $_30v3piwajcfx5gy5.identity,
          close: $_30v3piwajcfx5gy5.noop,
          reposition: $_30v3piwajcfx5gy5.noop,
          getArgs: $_30v3piwajcfx5gy5.identity
        };
      },
      renderUI: renderUI
    };
  });
  var Theme = function () {
  };

  return Theme;

}());
})()
