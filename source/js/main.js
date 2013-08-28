/*!
 * Main
 *
 * $  jQuery object
 * w  window object
 * d  document object
 *
 * ensure 'undefined' has not been modified
 */

(function( $, w, d, undefined ) {
  'use strict';

  $(d).ready(function() {
    if ( $('.js-popup').length ) {
      $('.js-popup').popup();
    }

    if ( $('.js-menu').length ) {
      $('.js-menu').menu();
    }

    if ( $('[data-drupal-nav-tabs]').length ) {
      $('[data-drupal-nav-tabs]').navTabs();
    }

    if ( $('.js-toggle').length ) {
      $('.js-toggle').on('click', function() {
        var $self = $(this);
        if ( $self.hasClass('is-active') ) {
          $self.removeClass('is-active').addClass('is-newly-inactive');
        } else {
          $self.addClass('is-active').addClass('is-newly-active');
        }
      }).on('mouseleave', function() {
        $(this).removeClass('is-newly-active is-newly-inactive');
      });
    }

  });

})( jQuery, this, document );
