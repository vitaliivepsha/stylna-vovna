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
        $(this).closest('li').remove();

        if ($('.cart-list li').length) {
            $('.full-cart').show();
            $('.empty-cart').hide();
        }
        else {
            $('.full-cart').hide();
            $('.empty-cart').show();
        }
    });

    // tabs

    $('.tabs').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs-wrapper').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
        $(window).trigger('resize');
        $('.slick-slider').slick('setPosition');
    });

    $(document).delegate('.related-tabs li:not(.active)', 'click touchstart', function(e) {
        e.preventDefault();
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

    $('.mobile-menu .has-children > span').on('click', function () {
        $(this).toggleClass('opened').closest('li').find('.submenu').slideToggle();
    });

    // filters

    $('.btn-filters').on('click', function () {
        var btn_txt = $(this).find('span');
        btn_txt.html() == 'Скрыть фильтры' ? btn_txt.html('Отобразить фильтры') : btn_txt.html('Скрыть фильтры');
        $('.categories-main').toggleClass('opened-filters');
    });

    $(window).resize(function () {
        var btn_txt = $('.btn-filters').find('span');
        if ($(window).width() < 991) {
            btn_txt.html('Отобразить фильтры');
            $('.categories-main').removeClass('opened-filters');
        }
    });

    $('.btn-filters__mob').on('click', function () {
        $('body').toggleClass('filters-opened');
    });

    $('.mobile-filters__close').click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).click(function () {
        $('body').removeClass('filters-opened');
    });

    $(document).on('click', '.mobile-filters__wrapper', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.btn-filters__mob', function (e) {
        e.stopPropagation();
    });

    $('.categories-filter__head').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('body').removeClass('filters-opened');
        }
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

// spoiler

$(".spoiler-content").hide();
$(".spoiler-content.checkout-goods__list").show();
$('.spoiler-title').click(function () {
    $(this).toggleClass('active').next('.spoiler-content').slideToggle();
});
