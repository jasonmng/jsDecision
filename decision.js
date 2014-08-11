'use strict';

(function(root, factory){

  if (typeof define === 'function' && define.amd) {

    define(['jquery'], function( $ ) { return factory( root, $ ); });

  } else if (typeof exports !== 'undefined') {

    var $ = require('jquery');
    module.exports = factory( root, $ );

  } else {

    if ( root.$ === undefined ) {

      console.log('Unable to load decision module: missing dependencies');

    } else {
       
      var previousDecision = root.decision, decision = factory( root, root.$ );

      decision.noConflict = function(){
         root.decision = previousDecision;
         return decision;
      }

      root.decision = decision;
    }
  }

})( window, function( root, $ ){

   var decision = function( selector ){

      this.data = {};
      this.callbacks = {};
      this.elem = $(selector);

      if ( this.elem.length == 0 ){
         console.log('Couldn\'t intialize decision element');
      }
   }

   decision.prototype = {
   
      click: function( attribute ) {

         attribute = attribute || 'data-decision';

         this.data = { evt: 'click', attribute: attribute };

         this.elem.on( 'click', this.decided.bind(this) );

         return this;

      },

      change: function( type ) {

         this.data = { evt: 'change', type: type };

         this.elem.on( 'change', this.decided.bind(this) );

         return this;

      },

      decided: function( event ) {

         var value, cb, data = this.data, evt = data.evt, type = data.type;

         if ( evt == 'click' ) {

            value = event.target.getAttribute(data.attribute);

         } else if ( evt == 'change' ){

            if ( type == 'select' ){
               value = this.elem.find('option:selected').val();
            } else if ( type == 'checkbox' || type == 'radio' ) {
               value = this.elem.val();
            } else {
               return;
            }
         }

         if ( value ) {

            value = value.toLowerCase();

            if ( (cb = this.callbacks[value]) ) {
               if ( cb.ctx ) cb.callback.apply(cb.ctx, arguments);
               else cb.callback( event );
            }
         }

         return;

      },

      define: function( decision, cb, ctx ) {

         decision = decision.toLowerCase();

         this.callbacks[decision] = { callback: cb, ctx: ctx || false }

         return this;

      }

   };

   return decision;

});
