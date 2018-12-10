(function () {
var save = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var enableWhenDirty = function (editor) {
    return editor.getParam('save_enablewhendirty', true);
  };
  var hasOnSaveCallback = function (editor) {
    return !!editor.getParam('save_onsavecallback');
  };
  var hasOnCancelCallback = function (editor) {
    return !!editor.getParam('save_oncancelcallback');
  };
  var $_7ir9vzi9jcfx5chl = {
    enableWhenDirty: enableWhenDirty,
    hasOnSaveCallback: hasOnSaveCallback,
    hasOnCancelCallback: hasOnCancelCallback
  };

  var displayErrorMessage = function (editor, message) {
    editor.notificationManager.open({
      text: editor.translate(message),
      type: 'error'
    });
  };
  var save = function (editor) {
    var formObj;
    formObj = DOMUtils.DOM.getParent(editor.id, 'form');
    if ($_7ir9vzi9jcfx5chl.enableWhenDirty(editor) && !editor.isDirty()) {
      return;
    }
    editor.save();
    if ($_7ir9vzi9jcfx5chl.hasOnSaveCallback(editor)) {
      editor.execCallback('save_onsavecallback', editor);
      editor.nodeChanged();
      return;
    }
    if (formObj) {
      editor.setDirty(false);
      if (!formObj.onsubmit || formObj.onsubmit()) {
        if (typeof formObj.submit === 'function') {
          formObj.submit();
        } else {
          displayErrorMessage(editor, 'Error: Form submit field collision.');
        }
      }
      editor.nodeChanged();
    } else {
      displayErrorMessage(editor, 'Error: No form element found.');
    }
  };
  var cancel = function (editor) {
    var h = Tools.trim(editor.startContent);
    if ($_7ir9vzi9jcfx5chl.hasOnCancelCallback(editor)) {
      editor.execCallback('save_oncancelcallback', editor);
      return;
    }
    editor.setContent(h);
    editor.undoManager.clear();
    editor.nodeChanged();
  };
  var $_5hk4z0i6jcfx5chh = {
    save: save,
    cancel: cancel
  };

  var register = function (editor) {
    editor.addCommand('mceSave', function () {
      $_5hk4z0i6jcfx5chh.save(editor);
    });
    editor.addCommand('mceCancel', function () {
      $_5hk4z0i6jcfx5chh.cancel(editor);
    });
  };
  var $_641mxhi5jcfx5chf = { register: register };

  var stateToggle = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('nodeChange dirty', function () {
        ctrl.disabled($_7ir9vzi9jcfx5chl.enableWhenDirty(editor) && !editor.isDirty());
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('save', {
      icon: 'save',
      text: 'Save',
      cmd: 'mceSave',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addButton('cancel', {
      text: 'Cancel',
      icon: false,
      cmd: 'mceCancel',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addShortcut('Meta+S', '', 'mceSave');
  };
  var $_2wukymiajcfx5chm = { register: register$1 };

  PluginManager.add('save', function (editor) {
    $_2wukymiajcfx5chm.register(editor);
    $_641mxhi5jcfx5chf.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
