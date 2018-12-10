(function () {
var print = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('mcePrint', function () {
      editor.getWin().print();
    });
  };
  var $_5lyahti1jcfx5ch5 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('print', {
      title: 'Print',
      cmd: 'mcePrint'
    });
    editor.addMenuItem('print', {
      text: 'Print',
      cmd: 'mcePrint',
      icon: 'print'
    });
  };
  var $_g8i3qfi2jcfx5ch6 = { register: register$1 };

  PluginManager.add('print', function (editor) {
    $_5lyahti1jcfx5ch5.register(editor);
    $_g8i3qfi2jcfx5ch6.register(editor);
    editor.addShortcut('Meta+P', '', 'mcePrint');
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
