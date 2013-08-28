/**
 * @file
 */

;( function( $, window, document, undefined ) {
  'use strict';

  var pluginName = 'navTabs';
  var defaults = {
    target: '.js-nav-tabs__target',
    trigger: '.js-nav-tabs__trigger',
    collapsible: false
  };

  function NavTabs( element, dataOptions, options ) {
    this.options = $.extend( {}, defaults, dataOptions, options );
    this.element = element;
    this.$element = $(element);
    this.buffer = 5;

    this.init();
  }

  NavTabs.prototype.init = function() {

    if (this.options.collapsible) {
      this.$element.collapse({
        target: this.options.target,
        trigger: this.options.trigger
      });
      this.$element.addClass('is-collapse-enabled');
    }

    $(window).on('resize.navTabs', $.proxy(this, 'refresh'));

    this.$element.addClass('position-container is-horizontal-enabled');
    this.refreshAll();
  };

  NavTabs.prototype.refreshAll = function() {
    this.intrinsicWidth = this.$element.addClass('is-horizontal').intrinsic('width');
    this.$element.removeClass('is-horizontal');
    this.refresh();
  };

  NavTabs.prototype.refresh = function() {
    if ( this.$element.parent().width() > this.intrinsicWidth + this.buffer ) {
      this.$element.addClass('is-horizontal');
    } else {
      this.$element.removeClass('is-horizontal');
    }
  };

  NavTabs.prototype.destroy = function() {
    window.off('resize.navTabs');
    this.removeData('plugin_' + pluginName);
  };

  $.fn[pluginName] = function( options ) {
    return this.each( function() {
      if ( ! $.data(this, 'plugin_' + pluginName) ) {
        var dataOptions = $(this).dataOptions(pluginName, 'drupal');
        $.data( this, 'plugin_' + pluginName, new NavTabs(this, dataOptions, options) );
      }
    });
  };

})( jQuery, window, document );
