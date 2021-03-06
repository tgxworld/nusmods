'use strict';

var $ = require('jquery');
var Marionette = require('backbone.marionette');
var template = require('../templates/chat.hbs');

function initializeHipChat (options) {
  if (options && options.url && options.el && options.timezone) {
    var $container = $(options.el);
    if ($container.length === 0) {
      return;
    }

    var params = {
      timezone: options.timezone,
      anonymous: options.anonymous,
      minimal: options.minimal
    };

    if (options.welcome) {
      /* jshint camelcase: false */
      params.welcome_msg = options.welcome;
    }

    var url = options.url + (options.url.indexOf('?') > 0 ? '&' : '?') + $.param(params);
    if (url.indexOf('https://') !== 0) {
      url = 'https://' + url;
    }
    var w = options.width || '100%';
    var h = options.height || 500;
    var nf = (options.noframes || '');
    $container.html('<iframe src="' + url + '" frameborder="' + 0 +
      '" width="' + w + '" height="' + h + '">' + nf + '</iframe>');
  }
}

module.exports = Marionette.LayoutView.extend({
  template: template,
  onShow: function () {
    initializeHipChat({
      el: '#nm-chat-container',
      url: 'https://www.hipchat.com/g6MlLApNR',
      timezone: 'SGT',
      noframes: 'Your browser has disabled iframes. Why?!',
      anonymous: 1,
      minimal: 0,
      width: '100%',
      height: 500,
      welcome: 'Welcome to NUSMods Support! Feel free to leave comments or feedback here.'
    });
  }
});
