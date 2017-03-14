$(document).foundation();


$(document).ready(function () {

    switch ($('.section-wrapper').data('page')) {

        case 'home':

            document.onmousemove = handleArrowHomeShowing;

            $('.home-slick').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,

                fade: true,
                dots: false,
                arrows: true,

                autoplay: true,
                autoplaySpeed: 4000,

                prevArrow: $('.prev-arrow-home'),
                nextArrow: $('.next-arrow-home'),

                swipeToSlide: true
            });

            break;

        case 'mobiliario':

            $('.mobiliario-slick').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,

                fade: true,
                dots: false,
                arrows: true,

                prevArrow: $('.prev-arrow-mobiliario'),
                nextArrow: $('.next-arrow-mobiliario'),

                swipeToSlide: true
            });


            $('.next-arrow-mobiliario').click(function(){
                changeMobTitle('Nuevo Título Chido');
            });

            $('.prev-arrow-mobiliario').click(function(){
                changeMobTitle('Nuevo Título Chido');
            });



            resizeMobiliarioText();
            $(window).resize(function () {
                resizeMobiliarioText();
            });


            break;





        case 'proyectoshome':

            setProjectsOvers();

            break;

        case 'proyecto':

            /*$('.submenu').css('position', 'relative', 'important');*/

            $('.proyecto-slick').height($(window).height() - 160);
            $('.project-details').height($(window).height() - 160);


            var newProyectoname = 'proyecto-' + $('.section-wrapper').data('proyecto');
            loadProjectImagesJson(newProyectoname);


            $(window).resize(function () {

                $('.proyecto-slick').height($(window).height() - 160);
                $('.project-details').height($(window).height() - 160);

                resizeGalerias();
            });

            break;

        case 'nosotros':

            initNosotrosScroll();

            var nosotrosIMG = $('<img src="images/nosotros.png" alt="nosotros"/>')
            nosotrosIMG.load(function (e) {
                $('.nosotros-image').append(nosotrosIMG);
                resizeNosotrosText();
            });

            $(window).resize(function () {
                resizeNosotrosText();
            });




            break;


        case 'noticias':

            resizeNoticias();

            $(window).resize(function () {
                resizeNoticias();
            });

            break;

        case 'procesos':

            var newProcessName = 'proceso-' + $('.section-wrapper').data('proceso');
            loadImagesJson(newProcessName);

            break;

        case 'contacto':

            $('#contacto-mail').click(function () {
                window.location.href = "mailto:taller@facileboreiro.com";
            });

            break;

        case 'procesoshome':

            $('.new-proceso').mouseover(function (e) {

                if ($(window).width() > 600) {
                    var text = $(e.currentTarget).find('.proceso-name');
                    var back = $(e.currentTarget);

                    TweenMax.to(text, .4, {color: "#FFFFFF"});
                    TweenMax.to(back, .4, {backgroundColor: "#000000"});

                    var nombre = $(e.currentTarget).data('procesonombre');
                    var currima = $(e.currentTarget).find('.procesos-img-thumb');

                    TweenMax.to($(currima), .2, {
                        alpha: 0, onComplete: function () {
                            $(currima).attr('src', 'images/proceso-btn-' + nombre + '-white.png');

                            TweenMax.to($(currima), .2, {alpha: 1});
                        }
                    });
                }
            });


            $('.new-proceso').mouseout(function (e) {
                if ($(window).width() > 600) {
                    var text = $(e.currentTarget).find('.proceso-name');
                    var back = $(e.currentTarget);

                    TweenMax.to(text, .4, {color: "#000000"});
                    TweenMax.to(back, .4, {backgroundColor: "#ffffff"});

                    var nombre = $(e.currentTarget).data('procesonombre');
                    var currima = $(e.currentTarget).find('.procesos-img-thumb');

                    TweenMax.to($(currima), .2, {
                        alpha: 0, onComplete: function () {
                            $(currima).attr('src', 'images/proceso-btn-' + nombre + '-black.png');

                            TweenMax.to($(currima), .2, {alpha: 1});
                        }
                    });
                }
            });


            break;
    }

});


/*HOME -------------------------------------------------------------------------------------------------------------------*/
function handleArrowHomeShowing() {
    var pageX, pageY;

    event = event || window.event; // IE-ism

    if (event.pageX > 0 && event.pageX < 100) {
        TweenMax.to($('.prev-arrow-home'), .5, {autoAlpha: 1});
    } else {
        TweenMax.to($('.prev-arrow-home'), .5, {autoAlpha: 0});
    }


    if (event.pageX > $(window).width() - 100 && event.pageX < $(window).width()) {
        TweenMax.to($('.next-arrow-home'), .5, {autoAlpha: 1});
    } else {
        TweenMax.to($('.next-arrow-home'), .5, {autoAlpha: 0});
    }
}


/*PROYECTOS GENERAL-------------------------------------------------------------------------------------------------------------------*/

function setProjectsOvers() {
    $.each($('.project-over'), function () {
        $(this).bind('mouseover', function () {
            overProject($(this));
        });

        $(this).bind('mouseout', function () {
            outProject($(this));
        });
    });

    TweenMax.to($('.project-over'), .5, {opacity: 0});
}

function overProject(e) {
    TweenMax.to(e, .5, {opacity: .75});
}

function outProject(e) {
    TweenMax.to(e, .5, {opacity: 0});
}


/*PROYECTO -------------------------------------------------------------------------------------------------------------------*/


function setProjectDetails() {
    TweenMax.set($('.project-details'), {autoAlpha: 0});

    $('.project-details').data('opened', false);

    $('.proyecto-info').bind('click', toggleProjectDetails);


    $('.project-details').css('display', 'block');
}

function toggleProjectDetails() {
    if ($('.project-details').data('opened') == false) {
        $('.project-details').data('opened', true);
        TweenMax.to($('.project-details'), .5, {autoAlpha: 1});
        $('.mas-info-icon').empty().html('<img src="images/cerrar-icon.svg" alt="icon" width="15"/>');
    }
    else {
        $('.project-details').data('opened', false);
        TweenMax.to($('.project-details'), .5, {autoAlpha: 0});
        $('.mas-info-icon').empty().append('<img src="images/mas-info-icon.svg" alt="icon" width="15"/>');
    }
}


function resizeGalerias() {
    $('.slick-foto img').each(function () {
        var maxWidth = $(window).width(); // Max width for the image
        var maxHeight = $('.proyecto-slick').height();    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = $(this).width();    // Current image width
        var height = $(this).height();  // Current image height


        // Check if the current width is larger than the max
        //if(width > maxWidth){
        ratio = maxWidth / width;   // get ratio for scaling image
        $(this).css("width", maxWidth); // Set new width
        $(this).css("height", height * ratio);  // Scale height based on ratio
        height = height * ratio;    // Reset height to match scaled image
        width = width * ratio;    // Reset width to match scaled image
        //}

        // Check if current height is larger than max
        if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            $(this).css("height", maxHeight);   // Set new height
            $(this).css("width", width * ratio);    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
        }
    });
}


//http://localhost:50035/ProjectDetail?Id=54f728db-317c-4198-bc81-095d7f6601f3

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var imagesProjectJson;

function loadProjectImagesJson($section) {


    $.ajax({
        url: 'http://localhost:50035/Service/Service.json',
        type: 'GET',
        data: getParameterByName('Id'),
        success: function (data) {

            imagesProjectJson = data;

            preloadProjectImges(imagesProjectJson[0].ImageUrls);
        },
        error: function (e) {
            //console.log(e.message);
        }
    });
}

function preloadProjectImges($imagesArray) {
    var i = 0;

    $.imageloader({
        urls: $imagesArray,

        smoothing: true,

        onComplete: function () {
            imagesProjectComplete();
        },

        onUpdate: function (ratio, image)///ratio: es el progress, image: es la imagen
        {
            i++;

            var $newimg = $('<div class="slick-foto"><img src="' + image + '" alt="' + image + '"/></div>');

            $newimg.appendTo('.proyecto-slick');

            if (i == 1) {
                TweenMax.fromTo($('.proyecto-slick'), .5, {alpha: 0}, {alpha: 1});
            } else {
                TweenMax.set($newimg, {alpha: 0});
            }

            resizeGalerias();

        },

        onError: function (err) {
            console.log(err);
        }
    });
}


function imagesProjectComplete() {


    ////iniciar slick
    $('.proyecto-slick').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,

        fade: true,
        dots: false,
        arrows: true,

        prevArrow: $('.prev-arrow-proyecto'),
        nextArrow: $('.next-arrow-proyecto'),

        swipeToSlide: true
    });

    $('.slick-list').css('height', '100%');

    $('.proyecto-slick').height($(window).height() - 160);
    $('.project-details').height($(window).height() - 160);


    //////quitar preloader del bottom
    $('.mas-info-icon').empty().append('<img src="images/mas-info-icon.svg" alt="icon" width="15"/>');
    setProjectDetails();

    $('.proyecto-info').addClass('pointer');
}


/*NOSOTROS -------------------------------------------------------------------------------------------------------------------*/

function initNosotrosScroll() {
    console.log('kjoiñn');
    $('.nosotros-text').mCustomScrollbar();
}


function resizeNosotrosText() {
    $('.nosotros-text').height($('.nosotros-image img').height());

    console.log($('.nosotros-image img').height())
}


function changeMobTitle(newtext){
    $('.mobiliario-title-int p').html(newtext);
}

function resizeMobiliarioText() {

    if($(window).width() >= 1024){
        $('.mobiliario-info').height($('.mobiliario-slick').height());
    }else{
        $('.mobiliario-info').css('height', 'auto');
        $('.mobiliario-info').css('overflow', 'auto');
    }



}

/*NOTICIAS -------------------------------------------------------------------------------------------------------------------*/

function resizeNoticias() {
    $.each($('.noticias-type'), function () {

        var newWidth = $(this).parent().width() - $(this).width();
        $(this).parent().parent().find($('.noticias-hr')).width(newWidth - 15);
    });
}


/*PROCESOS---------------------------------------------------------------------------------------------------------------------------*/

var imagesJson;

function loadImagesJson($section) {

    $.ajax({
        url: 'json/images.json',
        type: 'GET',
        data: '',
        success: function (data) {

            imagesJson = data;

            var thisImages = imagesJson[$section];
            preloadImges(thisImages);
        },
        error: function (e) {
            //console.log(e.message);
        }
    });
}

function preloadImges($imagesArray) {
    var i = 0;

    $.imageloader({
        urls: $imagesArray,

        smoothing: true,

        onComplete: function () {
            imagesComplete();
        },

        onUpdate: function (ratio, image)///ratio: es el progress, image: es la imagen
        {
            i++;

            var $newimg = $('<div class="row new-proceso-img-page align-bottom">' +
            '<div class="small-12 large-7 medium-11 columns large-centered medium-centered">' +
            '<img src="' + image + '" alt="' + image + '"/>' +
            '</div>' +
            '</div>');

            $newimg.appendTo('.grid-procesos');

            TweenMax.from($newimg, .5, {delay: i * .1, alpha: 0});
        },

        onError: function (err) {
            console.log(err);
        }
    });
}


function imagesComplete() {
}





