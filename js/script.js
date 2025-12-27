/**
 * Main JavaScript - Portfolio
 * abdomarrok.github.io
 * 
 * Handles: Scroll effects, navigation, animations
 */

(function ($) {
	"use strict";

	// Remove preload class after page loads
	function handlePreloader() {
		setTimeout(function () {
			$('body').removeClass('preload');
		}, 100);
	}

	// Header scroll effect
	function headerScrollEffect() {
		var header = $('.main-header');
		var scrollTop = $(window).scrollTop();

		if (scrollTop > 50) {
			header.addClass('scrolled');
		} else {
			header.removeClass('scrolled');
		}
	}

	// Scroll to top button visibility
	function scrollTopButton() {
		var scrollTop = $(window).scrollTop();
		var scrollButton = $('.scroll-top');

		if (scrollTop >= 300) {
			scrollButton.addClass('open');
		} else {
			scrollButton.removeClass('open');
		}
	}

	// Scroll progress indicator
	function updateScrollProgress() {
		var scrollTop = $(window).scrollTop();
		var docHeight = $(document).height() - $(window).height();
		var scrollPercent = (scrollTop / docHeight);

		$('.scroll-progress').css('transform', 'scaleX(' + scrollPercent + ')');
	}

	// Scroll to target
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function (e) {
			e.preventDefault();
			var target = $(this).attr('data-target');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 800);
		});
	}

	// One page navigation
	if ($('.scroll-nav').length) {
		$('.scroll-nav').onePageNav({
			currentClass: 'current',
			changeHash: false,
			scrollSpeed: 800,
			scrollThreshold: 0.5
		});
	}

	// Animate elements on scroll (Intersection Observer)
	function initScrollAnimations() {
		if ('IntersectionObserver' in window) {
			var observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						// Optional: stop observing after animation
						// observer.unobserve(entry.target);
					}
				});
			}, {
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			});

			document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(function (el) {
				observer.observe(el);
			});
		} else {
			// Fallback for older browsers
			$('.animate-on-scroll, .timeline-item').addClass('visible');
		}
	}

	// Lazy load images
	function initLazyLoading() {
		if ('IntersectionObserver' in window) {
			var imageObserver = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var img = entry.target;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.classList.add('loaded');
						}
						imageObserver.unobserve(img);
					}
				});
			});

			document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
				imageObserver.observe(img);
			});
		}
	}

	// Initialize on DOM ready
	$(document).ready(function () {
		headerScrollEffect();
		scrollTopButton();
		updateScrollProgress();
		initScrollAnimations();
		initLazyLoading();
	});

	// On scroll events
	$(window).on('scroll', function () {
		headerScrollEffect();
		scrollTopButton();
		updateScrollProgress();
	});

	// On page load
	$(window).on('load', function () {
		handlePreloader();
	});

})(window.jQuery);