/**
 * @file
 * Lowish-level DOM utilities for UI components
 */
;( function( $, w, undefined ) {
  'use strict';

  // Find a given selector only within the current scope, except ids, which
  // are found anywhere.
  $.fn.withinOrUnique = function(selector) {
    if ( selector.charAt(0) === '#' ) {
      return $(selector);
    } else {
      return this.find(selector);
    }
  };

  $.extend({
    kebabCase: function(string) {
      return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },

    safeTrim: function(object) {
      if (typeof object === 'string') {
        return $.trim(object);
      }
      return object;
    }
  });

  // Parse options passed via data-attribute component initialization and
  // turn them into an object.
  $.fn.dataOptions = function(pluginName, namespace) {
    var options = {};
    var optPair;
    var key;
    var value;
    var dataPrefix = 'data-' + ( typeof namespace === 'string' ? namespace + '-' : '' );
    var optionsArray = ($(this).attr(dataPrefix + $.kebabCase(pluginName)) || ':').split(';');

    // parse options
    for (var i = optionsArray.length - 1; i >= 0; i--) {
      optPair = optionsArray[i].split(':');
      key = optPair[0];
      value = optPair[1];

      if (/true/i.test(value)) { value = true; }
      if (/false/i.test(value)) { value = false; }
      if ($.isNumeric(value)) { value = parseFloat(value); }

      if (optPair.length === 2 && key.length > 0) {
        options[$.safeTrim(key)] = $.safeTrim(value);
      }
    }

    return options;
  };

})( jQuery, window );
