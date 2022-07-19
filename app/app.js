// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/404.html');
    require('./assets/templates/layouts/about.html');
    require('./assets/templates/layouts/faq.html');
    require('./assets/templates/layouts/article.html');
    require('./assets/templates/layouts/blog.html');
    require('./assets/templates/layouts/return-change.html');
    require('./assets/templates/layouts/delivery-payment.html');
    require('./assets/templates/layouts/checkout.html');
    require('./assets/templates/layouts/proizvodstvo.html');
    require('./assets/templates/layouts/size.html');
    require('./assets/templates/layouts/showroom.html');
    require('./assets/templates/layouts/clients.html');
    require('./assets/templates/layouts/reviews.html');
    require('./assets/templates/layouts/th.html');
    require('./assets/templates/layouts/product-page.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/catalog-chosen.html');
    require('./assets/templates/layouts/catalog-list.html');
    require('./assets/templates/layouts/search-results-empty.html');
    require('./assets/templates/layouts/search-results.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
//require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/mark.js/dist/jquery.mark.min');
require('../node_modules/sweetalert2/dist/sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 200 /*&& scrolled > scrollPrev*/) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });


    // header-search

    if ($('.header-search input[type="search"]').val().length) {
        $('.header-search button').css('pointer-events', 'auto');
    }
    else {
        $('.header-search button').css('pointer-events', 'none');
    }

    $('.header-search input[type="search"]').on('keyup', function () {
        if ($('.header-search input[type="search"]').val().length) {
            $('.header-search button').css('pointer-events', 'auto');
        }
        else {
            $('.header-search button').css('pointer-events', 'none');
        }
    });

    $('.header-search input[type="search"]').bind('keyup keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            if ($(this).val() == '') {
                e.preventDefault();
                return false;
            }
        }
    });

    $('.header-search input[type="search"]').on('keyup', function (e) {
        var $this = $(this);
        if ($this.val().length < 3) {
            $this.closest('.header-search__wrapper').removeClass('focus').removeClass('active');
            $('.header-search > .search-results').hide();
            $('body').removeClass('open-search-results');
        } else {
            $this.closest('.header-search__wrapper').addClass('focus').addClass('active');
            $('.header-search > .search-results').show();
            $('body').addClass('open-search-results');
        }
    });

    $('.header-mob__search-btn').click(function () {
        $('body').toggleClass('mob-search').removeClass('mob-phones');
        $(this).toggleClass('active');
        $('.header-search__wrapper').toggleClass('show');
        $('.mobile-menu__btn').removeClass('active');
        $('.mobile-menu__wrapper').removeClass('active');
        $('body').addClass('active');
        return false;
    });

    $('.header-search__btn').click(function () {
        $('.header-search__wrapper').addClass('show');
    });

    $(document).click(function () {
        $('.header-search__wrapper').removeClass('show').removeClass('active');
        $('body').removeClass('mob-search').removeClass('mob-menu').removeClass('open-search-results');
        $('.header-search > .search-results').hide();
    });

    $(document).on('click', '.header-search__wrapper', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.header-search__wrapper .search-results', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.header-search__btn', function (e) {
        e.stopPropagation();
    });

    var $input = $('.header-search input'),
        $content = $('.header-search .search-results'),
        $results,
        currentIndex = 0;

    $input.on('input', function () {
        var searchVal = this.value;
        $('.header-search .search-results li a').each(function () {
            $(this).find('span').bind('DOMSubtreeModified', function () {
                if ($(this).find('mark').length) {
                    $(this).closest('li').addClass('show').closest('ul').addClass('highlighting-results');
                }
                else {
                    $(this).closest('li').removeClass('show');
                }
            });
        });

        $content.unmark({
            done: function () {
                $content.mark(searchVal, {
                    separateWordSearch: true,
                    done: function () {
                        $results = $content.find('mark');
                        currentIndex = 0;
                    }
                });
            }
        });
        if ($('.search-results > ul li.show').length) {
            $('.search-results > div > a').css('display', 'flex');
            $('.search-results > div > span').css('display', 'none');
        }
        else {
            $('.search-results > div > a').css('display', 'none');
            $('.search-results > div > span').css('display', 'flex');
        }
    });

    // header cart

    if ($('.cart-list li').length) {
        $('.full-cart').show();
        $('.empty-cart').hide();
    }
    else {
        $('.full-cart').hide();
        $('.empty-cart').show();
    }

    $(document).on('click', '.cart-remove__btn', function () {
        var cart_items = $(this).closest('.cart-list').find('li').length;
        var $full_cart = $(this).closest('.header-cart').find('.full-cart');
        var $empty_cart = $(this).closest('.header-cart').find('.empty-cart');
        cart_items--;
        $(this).closest('li').remove();
        if (cart_items > 0) {
            console.log(cart_items);
            $full_cart.show();
            $empty_cart.hide();
        }
        else {
            $full_cart.hide();
            $empty_cart.show();
        }
    });

    $('.mobile-cart__btn').on('click', function () {
        $('body').toggleClass('mob-cart-open');
    });

    $(document).click(function () {
        $('body').removeClass('mob-cart-open');
    });

    $(document).on('click', '.mobile-cart__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-cart', function (e) {
        e.stopPropagation();
    });

    $('.mobile-cart__close').click(function () {
        $('body').removeClass('mob-cart-open');
    });

    $(document).on('click', '.mobile-cart__close', function (e) {
        e.stopPropagation();
    });

    // tabs

    $('.tabs').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        $(window).trigger('resize');
        $('.slick-slider').slick('setPosition');
    });

    $(document).delegate('.related-tabs li:not(.active)', 'click touchstart', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.related-tabs__wrapper').find('.related-content').removeClass('active').eq($(this).index()).addClass('active');
        $(this)
            .closest('.related-tabs__wrapper').find('.related-nav').removeClass('active').eq($(this).index()).addClass('active');
        $(window).trigger('resize');
        $('.slick-slider').slick('setPosition');
    });

    // select
    $('.select.obl').SumoSelect({
        forceCustomRendering: true,
        search: true,
        searchText: 'Выбрать',
        noMatch: 'Не найдено'
    });

    $('.select').SumoSelect({
        forceCustomRendering: true
    });

    // checkout
    $(".deliver-nova").hide();
    $(".deliver-courier").hide();
    $(".select.delivery").change(function () {
        var value = $(this).val(),

            $nova = $(this).closest(".chechout-form").find(".deliver.deliver-nova"),
            $courier = $(this).closest(".chechout-form").find(".deliver.deliver-courier");

        if (value == "nova") {
            $nova.show();
        } else {
            $nova.hide();
        }

        if (value == "courier") {
            $courier.show();
        } else {
            $courier.hide();
        }

        if (value == "self") {
            $self.show();
        } else {
            $self.hide();
        }
    });

    // quantity
    $(document).on("click", ".btn-plus", function () {
        var input = $(this).parent().find("input");
        input.val(parseInt(input.val()) + 1).change();
    });
    $(document).on("click", ".btn-minus", function () {
        var input = $(this).parent().find("input");
        var val = parseInt(input.val());
        if (val > 1) {
            val--;
        }
        input.val(val).change();
    });

    $('.checkout-goods__close').click(function () {
        $(this).closest('li').remove();
        if (!$(".checkout-goods__list li").length) {
            $(".checkout-goods__list").closest('.checkout-goods').find('.checkout-title').css('pointer-events', 'none').removeClass('spoiler-title');
            $(".checkout-goods__list").closest('.checkout-goods').find('.checkout-title').find('i').css('display', 'none');
        }
    });

    if (!$(".checkout-goods__list li").length) {
        $(".checkout-goods__list").closest('.checkout-goods').find('.checkout-title').css('pointer-events', 'none').removeClass('spoiler-title');
        $(".checkout-goods__list").closest('.checkout-goods').find('.checkout-title').find('i').css('display', 'none');
    }

    // product-details

    $('.product-details.tabs').each(function () {
        let tabs = $(this);
        tabs.find('.product-details__body .container>div').not('.product-details__body .container>div.active').hide();
        tabs.find('.product-details__head li').click(function () {
            tabs.find('.product-details__head li').removeClass('active').eq($(this).index()).addClass('active');
            tabs.find('.product-details__body .container>div').hide().eq($(this).index()).fadeIn(500);
        }).eq(0).addClass('active');
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('.mobile-menu__btn').removeClass('active');
            $('body').removeClass('menu-opened');
        }
    });

    $('.mobile-menu__top .has-children > span').on('click', function () {
        $(this).closest('li').toggleClass('opened').find('div').slideToggle();
    });

    // filters

    $('.btn-filters').on('click', function () {
        $('body').addClass('opened-filters');
    });

    $('.mob-filters__close').on('click', function () {
        $('body').removeClass('opened-filters');
    });

    $('.btn-categories').on('click', function () {
        $('body').addClass('opened-categories');
    });

    $('.mob-categories__close').on('click', function () {
        $('body').removeClass('opened-categories');
    });

    // catalog sort dropdown

    $(".dropdown-sort-top").click(function () {
        $(this).closest(".dropdown-sort").toggleClass("open");
    });

    $(".dropdown-sort-bot").on("click", ".dropdown-sort-bot-item", function () {
        var val = $(this).html();
        $(this)
            .closest(".dropdown-sort")
            .removeClass("open")
            .find(".dropdown-sort-top > .dropdown-sort-top-text")
            .html(val)
            .addClass('chosen');
    });

    $(document).click(function () {
        $('.dropdown-sort').removeClass('open');
    });

    $(document).on('click', '.dropdown-sort', function (e) {
        e.stopPropagation();
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});

// faq
$('.faq-head').click(function () {
    $(this).toggleClass('active').next().slideToggle();
    $('.faq-head').not(this).removeClass('active').next().slideUp();
    if ($('.faq-head').has('.active')) {
        $(this).closest($('.faq-item')).toggleClass('active');
        $('.faq-head').not(this).closest($('.faq-item')).removeClass('active');
    }
});

// checkout spoiler

$(".spoiler-content").hide();
$(".spoiler-content.checkout-goods__list").show();
$('.spoiler-title').click(function () {
    $(this).toggleClass('active').next('.spoiler-content').slideToggle();
});

// upload life 

$(document).on('change', '.input-file input', function () {
    var $file = $(this),
        $label = $file.next('label'),
        $labelText = $label.find('span'),
        labelDefault = $labelText.text(),
        fileName = $file.val().split('\\').pop();
    if (fileName) {
        $labelText.text(fileName);
    } else {
        $labelText.text(labelDefault);
    }
});

// catalog filter
$('.catalog-filter__caption').click(function () {
    $(this).toggleClass('active').next('.catalog-filter__list').slideToggle();
});
