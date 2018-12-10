(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_d31nqfbijcfx5b7f = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_2iy6zqbjjcfx5b7h = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_d31nqfbijcfx5b7f.register(editor);
    $_2iy6zqbjjcfx5b7h.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
