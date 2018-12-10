(function () {
var code = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(DOMUtils.DOM.getViewPort().h - 200, 500));
  };
  var $_bwz7k190jcfx5asi = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_34j66l92jcfx5asl = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_bwz7k190jcfx5asi.getMinWidth(editor);
    var minHeight = $_bwz7k190jcfx5asi.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_34j66l92jcfx5asl.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_34j66l92jcfx5asl.getContent(editor));
  };
  var $_ajwwkr8zjcfx5asg = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_ajwwkr8zjcfx5asg.open(editor);
    });
  };
  var $_5o6bmu8yjcfx5ase = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_ajwwkr8zjcfx5asg.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_ajwwkr8zjcfx5asg.open(editor);
      }
    });
  };
  var $_1n202493jcfx5asm = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_5o6bmu8yjcfx5ase.register(editor);
    $_1n202493jcfx5asm.register(editor);
    return {};
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
