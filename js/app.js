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
                nextArrow: $('.next-arrow-home')
            });

            break;

        case 'proyectoshome':

            setProjectsOvers();

            break;

        case 'proyecto':

            /*$('.submenu').css('position', 'relative', 'important');*/

            $('.proyecto-slick').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,

                fade: true,
                dots: false,
                arrows: true,

                prevArrow: $('.prev-arrow-proyecto'),
                nextArrow: $('.next-arrow-proyecto')
            });

            $('.slick-list').css('height', '100%');


            $(window).load(function(){
                $('.mas-info-icon').empty().append('<img src="images/mas-info-icon.svg" alt="icon" width="15"/>');
                setProjectDetails();

                $('.proyecto-info').addClass('pointer');
            });

            break;

        case 'nosotros':

            initNosotrosScroll();

            var nosotrosIMG = $('<img src="images/nosotros.png" alt="nosotros"/>')
            nosotrosIMG.load(function(e){
                $('.nosotros-image').append(nosotrosIMG);
                resizeNosotrosText();
            });

            $(window).resize(function(){
                resizeNosotrosText();
            });

            break;


        case 'noticias':

            resizeNoticias();

            $(window).resize(function(){
                resizeNoticias();
            });

            break;

        case 'procesos':

            loadImagesJson('procesos1');

            break;

        case 'contacto':

            $('#contacto-mail').click(function(){
                window.location.href = "mailto:taller@facileboreiro.com";
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


/*NOSOTROS -------------------------------------------------------------------------------------------------------------------*/

function initNosotrosScroll(){
    console.log('kjoiñn');
    $('.nosotros-text').mCustomScrollbar();
}


function resizeNosotrosText(){
    $('.nosotros-text').height( $('.nosotros-image img').height() );

    console.log($('.nosotros-image img').height())
}


/*NOTICIAS -------------------------------------------------------------------------------------------------------------------*/

function resizeNoticias(){
    $.each($('.noticias-type'), function(){

        var newWidth = $(this).parent().width() - $(this).width();
        $(this).parent().parent().find($('.noticias-hr')).width( newWidth - 15 );
    });
}


/*PROCESOS---------------------------------------------------------------------------------------------------------------------------*/

var imagesJson;

function loadImagesJson($section) {

    //TweenMax.to($('.preloader'),.3, {autoAlpha:0});

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

            var $newimg = $('<div class="procesos-item"><img src="'+image+'" alt="'+image+'"/></div>');

            $newimg.appendTo('.grid-procesos');

            $('.grid-procesos').masonry( 'appended', $newimg );

            $('.grid-procesos').masonry({
                itemSelector: '.procesos-item',
                columnWidth: 620,
                gutter: 20,
                isFitWidth: true,
                transitionDuration: 0
            });

            TweenMax.from($newimg,.5, {delay:i *.1, alpha:0});

            /*$($newimg).bind('click', openColorsMenu);*/
        },

        onError: function (err) {
            console.log(err);
        }
    });
}


function imagesComplete(){
}





