/*global Quintus:false, module:false */

/**
Quintus HTML5 Game Engine - Pixels module

Module responsible for deciding how to resample
based on available resolution.

@module Quintus.Pixels
*/


var quintusPixels = function(Quintus) {
	"use strict";

	/**
	 * Quintus Pixel module
	 *
	 * @class Quintus.Pixels
	 */
	Quintus.Pixels = function(Q) {

		/**

    @for Quintus.Pixels
    @method Q.setup
    @param {String} [id="quintus"] - id of the canvas element to trigger quintus on
    @param {Object} [options] - options hash

   */
		Q.pixelsSetup = function(id, options) {
			if (Q._isObject(id)) {
				options = id;
				id = null;
			}
			options = options || {};
			id = id || "quintus";

			if (Q._isString(id)) {
				Q.el = document.getElementById(id);
			} else {
				Q.el = id;
			}

			if (!Q.el) {
				Q.el = document.createElement("canvas");

				// get REAL width and height
				var winW = window.innerWidth;
				var winH = window.innerHeight;
				var winRatio = winW / winH;
				var scaleRatio = winH / options.height;
				var pixelScaleRatio = Math.floor(scaleRatio);
				var actualWidth = Math.ceil(winW / pixelScaleRatio);
				var actualHeight = Math.ceil(winH / pixelScaleRatio);
				Q.pixelScaleRatio = pixelScaleRatio;
				//

				Q.el.width = actualWidth || 320;
				Q.el.height = actualHeight || 420;
				Q.el.id = id;

				document.body.appendChild(Q.el);
			}

			var w = parseInt(Q.el.width, 10),
				h = parseInt(Q.el.height, 10);

			var maxWidth = options.maxWidth || 5000,
				maxHeight = options.maxHeight || 5000,
				resampleWidth = options.resampleWidth,
				resampleHeight = options.resampleHeight,
				upsampleWidth = options.upsampleWidth,
				upsampleHeight = options.upsampleHeight;

			if (options.maximize === true || (Q.touchDevice && options.maximize ===
					'touch')) {
				document.body.style.padding = 0;
				document.body.style.margin = 0;

				w = options.width || Math.min(window.innerWidth, maxWidth) - ((options.pagescroll) ?
					17 : 0);
				h = options.height || Math.min(window.innerHeight - 5, maxHeight);

				if (Q.touchDevice) {
					Q.el.style.height = (h * 2) + "px";
					window.scrollTo(0, 1);

					w = Math.min(window.innerWidth, maxWidth);
					h = Math.min(window.innerHeight, maxHeight);
				}
			} else if (Q.touchDevice) {
				window.scrollTo(0, 1);
			}

			var elParent = Q.el.parentNode;

			if (elParent && !Q.wrapper) {
				Q.wrapper = document.createElement("div");
				Q.wrapper.id = Q.el.id + '_container';
				Q.wrapper.style.width = w + "px";
				Q.wrapper.style.margin = "0 auto";
				Q.wrapper.style.position = "relative";


				elParent.insertBefore(Q.wrapper, Q.el);
				Q.wrapper.appendChild(Q.el);
			}

			Q.el.style.position = 'relative';

			Q.ctx = Q.el.getContext &&
				Q.el.getContext("2d");


			Q.width = parseInt(Q.el.width, 10);
			Q.height = parseInt(Q.el.height, 10);
			Q.cssWidth = w;
			Q.cssHeight = h;

			//scale to fit
			if (options.scaleToFit) {

				Q.el.style.width = winW + "px";
				Q.el.style.height = winH + "px";

				if (Q.el.parentNode) {
					Q.el.parentNode.style.width = winW + "px";
					Q.el.parentNode.style.height = winH + "px";
				}

				Q.cssWidth = parseInt(winW, 10);
				Q.cssHeight = parseInt(winH, 10);

				/*center vertically when adjusting to width
				if(gameRatio > winRatio) {
				  var topPos = (winH - scaledH)/2;
				  Q.el.style.top = topPos+'px';
				}
				*/
			}

			window.addEventListener('orientationchange', function() {
				setTimeout(function() {
					window.scrollTo(0, 1);
				}, 0);
			});

			return Q;
		};

		/**
		 * Topdown Control Component
		 *
		 * Adds topdown controls onto a Sprite (Zelda-style)
		 *
		 * Topdown controls bind to left, right, up and down
		 *
		 * @class topdownControls
		 * @for Quintus.Pixels
		 */
		Q.component("topdownControls", {
			defaults: {
				speed: 200,
				collisions: []
			},

			step: function(dt) {
				var p = this.entity.p;

				if (p.ignoreControls === undefined || !p.ignoreControls) {
					var collision = null;

					if (Q.inputs['left']) {
						if (collision) {
							p.vx = p.speed * collision.normalY;
							p.vy = -p.speed * collision.normalX;
						} else {
							p.vx = -p.speed;
						}
					} else if (Q.inputs['right']) {
						p.direction = 'right';
						if (collision) {
							p.vx = -p.speed * collision.normalY;
							p.vy = p.speed * collision.normalX;
						} else {
							p.vx = p.speed;
						}
					} else {
						p.vx = 0;
						if (collision && p.landed > 0) {
							p.vy = 0;
						}
					}
				}
			}
		});

	};
};


if (typeof Quintus === 'undefined') {
	module.exports = quintusPixels;
} else {
	quintusPixels(Quintus);
}
