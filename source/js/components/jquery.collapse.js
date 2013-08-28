/**
 * @file
 */

;( function( $, window, document, undefined ) {
  'use strict';

  var pluginName = 'collapse';
  var defaults = {
    target: false,
    trigger: false,
    initState: 'closed'
  };

  function Collapse( element, options ) {
    this.options = $.extend( {}, defaults, options );
    this.element = element;
    this.$element = $(element);
    this.$target = null;
    this.$trigger = null;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Collapse.prototype.init = function() {
    var self = this;
    var opts = self.options;

    if (opts.target) {
      if ( opts.target.jquery ) {
        this.$target = opts.target;
      } else {
        this.$target = this.$element.withinOrUnique(opts.target);
      }
    }

    if (opts.trigger) {
      if ( opts.trigger.jquery ) {
        this.$trigger = opts.trigger;
      } else {
        this.$trigger = this.$element.withinOrUnique(opts.trigger);
      }
    } else {
      this.$trigger = this.$element;
    }

    this.refresh();

    if (this.options.initState !== 'closed') {
      this.$target.addClass('is-open');
    }

    this.$trigger.on('click', function(event) {
      self.toggle(event);
    });

    this.$element.on('transitionend webkitTransitionEnd', function() {
      if ( self.$target.hasClass('is-closing') ) {
        self.$target.removeClass('is-closing is-open');
        self.$target[0].style.removeProperty('max-height');
      }
    });
  };

  Collapse.prototype.refresh = function() {
    this.$target.data( 'intrinsicHeight', this.$target.intrinsic('height') + 'px' );
  };

  Collapse.prototype.toggle = function(event) {
    event.preventDefault();

    if ( this.$target.hasClass('is-open') ) {
      if ( Modernizr.csstransitions ) {
        this.$target.css('max-height', '0').addClass('is-closing');
      }
      else {
        this.$target.removeClass('is-open');
      }
    } else {
      if ( Modernizr.csstransitions ) {
        this.$target.css( 'max-height', this.$target.data('intrinsicHeight') );
      }
      this.$target.addClass('is-open');
    }
  };

  $.fn[pluginName] = function( options ) {
    return this.each( function() {
      if ( ! $.data(this, 'plugin_' + pluginName) ) {
        $.data( this, 'plugin_' + pluginName, new Collapse(this, options) );
      }
    });
  };

})( jQuery, window, document );
