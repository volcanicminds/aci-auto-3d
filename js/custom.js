$(document).ready(function() {

	var animation = 300;

	var cheModelloStep = 1;

	$('.che-modello').hide();
	$('#che-modello-step-1').show();

	$('.next-step').on('click', function(event) {
		event.preventDefault();
		if (cheModelloStep<3) {
			cheModelloStep++;
			$('.che-modello').hide(animation/2);
			$('#che-modello-step-'+cheModelloStep).show(animation/2);
		}
	});

	$('.torna-indietro').on('click', function(event) {
		event.preventDefault();
		if (cheModelloStep>1) {
			cheModelloStep--;
			$('.che-modello').hide(animation/2);
			$('#che-modello-step-'+cheModelloStep).show(animation/2);
		}
	});

	$('#header-1').on('click', '.circle:not(.circle-personas)', function(event) {
		event.preventDefault();
		if ($('.selezione-modello').is('.expanded')) {
			$('.selezione-modello').animate({ 'min-height' : 180 }, animation);

		} else {
			$('.selezione-modello').animate({ 'min-height' : 710 }, animation);
		}
		$('.selezione-modello').toggleClass('expanded');
		$('.circle:not(.circle-small)').toggleClass('opened');
		$('.nessun-modello, #carousel1, .selezione-tab').slideToggle(animation);

	});

	$('#select-celerio, #select-celerio-2').on('click', function(event) {
		event.preventDefault();
		$('.default-auto-icon, .default-circle, .selection-circle').hide();
		$('.circle:not(.circle-small)').addClass('celerio');
		$('.nessun-modello').text('Suzuki CELERIO');

		$('.selezione-modello').toggleClass('expanded');
		$('.nessun-modello, #carousel1, .selezione-tab').slideToggle(animation);
		$('.selezione-modello').animate({ 'min-height' : 180 }, animation);

		$('.caratteristiche-modello, .n-risultati').show();

		$('.non-celerio').remove();

		$('.isotope').isotope( 'reloadItems' ).isotope();
	});

	$('.avatar-m-f').on('click', function(event) {
		event.preventDefault();
		$('.avatar-m-f').removeClass('active');
		$(this).addClass('active');
	});

    $('.selection-filters').popover();

    $('.selection-buttons').on('click', '.vedi-tutti', function(event) {
        event.preventDefault();
        var parent_row = $(this).parent().parent();
        parent_row.toggleClass('row-one-line');
        if($(parent_row).hasClass('row-one-line'))
            $(this).text("Vedi tutti");
        else
            $(this).text("Mostra meno");
    });

    $('.selection-buttons-fuel').on('click', 'button:not(.average-price)', function(event) {
        event.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.anchor').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

});

// Starrr plugin (https://github.com/dobtco/starrr)
var __slice = [].slice;

(function($, window) {
    var Starrr;

    Starrr = (function() {
        Starrr.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function(e, value) {}
        };

        function Starrr($el, options) {
            var i, _, _ref,
                _this = this;

            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            _ref = this.defaults;
            for (i in _ref) {
                _ = _ref[i];
                if (this.$el.data(i) != null) {
                    this.options[i] = this.$el.data(i);
                }
            }
            this.createStars();
            this.syncRating();
            this.$el.on('mouseover.starrr', 'i', function(e) {
                return _this.syncRating(_this.$el.find('i').index(e.currentTarget) + 1);
            });
            this.$el.on('mouseout.starrr', function() {
                return _this.syncRating();
            });
            this.$el.on('click.starrr', 'i', function(e) {
                return _this.setRating(_this.$el.find('i').index(e.currentTarget) + 1);
            });
            this.$el.on('starrr:change', this.options.change);
        }

        Starrr.prototype.createStars = function() {
            var _i, _ref, _results;

            _results = [];
            for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                _results.push(this.$el.append("<i class='fa fa-star-o'></i>"));
            }
            return _results;
        };

        Starrr.prototype.setRating = function(rating) {
            if (this.options.rating === rating) {
                rating = void 0;
            }
            this.options.rating = rating;
            this.syncRating();
            return this.$el.trigger('starrr:change', rating);
        };

        Starrr.prototype.syncRating = function(rating) {
            var i, _i, _j, _ref;

            rating || (rating = this.options.rating);
            if (rating) {
                for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    this.$el.find('i').eq(i).removeClass('fa-star-o').addClass('fa-star');
                }
            }
            if (rating && rating < 5) {
                for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                    this.$el.find('i').eq(i).removeClass('fa-star').addClass('fa-star-o');
                }
            }
            if (!rating) {
                return this.$el.find('i').removeClass('fa-star').addClass('fa-star-o');
            }
        };

        return Starrr;

    })();
    return $.fn.extend({
        starrr: function() {
            var args, option;

            option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.each(function() {
                var data;

                data = $(this).data('star-rating');
                if (!data) {
                    $(this).data('star-rating', (data = new Starrr($(this), option)));
                }
                if (typeof option === 'string') {
                    return data[option].apply(data, args);
                }
            });
        }
    });
})(window.jQuery, window);

$(function() {
    return $(".starrr").starrr();
});