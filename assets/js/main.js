/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Leverage - Creative Agency & Portfolio WordPress Theme
* Version  : 1.1.0
* Author   : Codings
* Support  : adm.codings@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Responsive Menu
2. Navigation 
3. Slides 
4. Progress Bar
5. Sign and Register Form
6. Multi-Step Form 
7. Submission Parameters

----------------------------------------------*/

/*----------------------------------------------
1. Responsive Menu
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {

        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })

    
    $('.menu .nav-item.dropdown').each(function() {

        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (event) {

        if($(this).hasClass('prevent')) {
            event.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
})

/*----------------------------------------------
2. Navigation
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var toTop    = $('#scroll-to-top');
    var navbar   = $('.navbar');

    $(document).ready(function() {
        if (position > 0) {
            navbar.hide();
        }
    })

    toTop.hide();

    $(window).scroll(function () {

        let scroll = $(window).scrollTop();
        let navbar = $('.navbar');

        if (!navbar.hasClass('relative')) {

            if (scroll > position) {

                if (window.screen.width >= 767) {

                    navbar.fadeOut('fast');

                } else {

                    navbar.addClass('navbar-sticky');
                }

                toTop.fadeOut('fast');

            } else {

                if (position < 76) {

                    navbar.slideDown('fast').removeClass('navbar-sticky');

                } else {

                    navbar.slideDown('fast').addClass('navbar-sticky');
                }


                if (position > 1023) {

                    if (window.screen.width >= 767) {

                        toTop.fadeIn('fast');
                    }

                } else {

                    toTop.fadeOut('fast');

                }

            }

            position = scroll;

        }
    })

    $('.nav-link').each(function() {
        let href = $(this).attr('href');
        if (href.length > 1 && href.indexOf('#') != -1) {
            $(this).addClass('smooth-anchor');
        }
    })

    // Error before deploy
    // What the fuck is this shit
    $(document).on('click', '.smooth-anchor', function (event) {

        event.preventDefault();

        $('html, body').animate({

            scrollTop: $($.attr(this, 'href')).offset().top

        }, 500);
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {

            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {

            dropdown.parent().find('.nav-link').first().removeClass('active');

        })
    })
})

/*----------------------------------------------
3. Slides
----------------------------------------------*/

jQuery(function ($) {

    setTimeout(function() {

        $('.no-slider .left').addClass('init');

    }, 1200)

    var animation = function(slider) {

        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .btn');
        let nav = $(slider + ' nav');

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');

        setTimeout(function() {

            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');

            AOS.refresh();

        }, 100)

        if ($('.full-slider').hasClass('animation')) {

            $('.full-slider .left').addClass('off');
            $('.full-slider .left').removeClass('init');

            setTimeout(function() {

                $('.full-slider .left').removeClass('off');

            }, 200)

            setTimeout(function() {

                $('.full-slider .left').addClass('init');

            }, 1000)

        } else {

            $('.full-slider .left').addClass('init');
        }
    }

    var fullSlider = new Swiper('.full-slider', {

        autoplay: {
            delay: 10000,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            init: function() {

                animation('.full-slider')

                let pagination = $('.full-slider .swiper-pagination');

                pagination.hide();

                setTimeout(function() {

                    pagination.show();

                }, 2000)

            },
            slideChange: function() {

                animation('.full-slider')
            }
        }
    })

    var midSlider = new Swiper('.slider-mid', {

        autoplay: false,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    })

    var minSlider = new Swiper('.slider-min', {

        autoplay: {
            delay: 5000,
        },
        loop: true,
        slidesPerView: 2,
        spaceBetween: 15,
        breakpoints: {
            424: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1023: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1199: {
                slidesPerView: 5,
                spaceBetween: 15
            }
        },
        pagination: false,
    })

    var sliderDisabled = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: function() {
                animation('.no-slider')
            }
        }
    })
})

/*----------------------------------------------
4. Progress Bar
----------------------------------------------*/

jQuery(function($) {

    'use strict';

    function initCounter(section, item) {

        $(document).one('inview', item, function(event, inview) {

            if (inview) {            
    
                $(item).each(function() {
    
                    var percent = $(this).data('percent');
                    var pcolor  = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                    var scolor  = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
    
                    if ( $(section).hasClass('odd')) {
                        var tmode = 'rgba(255, 255, 255, 0.075)';
                    } else {
                        var tmode = 'rgba(0, 0, 0, 0.075)';
                    }
    
                    if ( $(section).hasClass('skills')) {
                        var symbol = '<i>%</i>';
                    } else {
                        var symbol = '';
                    }
    
                    $(this).radialProgress({
                        value: (percent / 100),
                        size: 120,
                        thickness: 10,
                        lineCap: 'butt',
                        emptyFill: tmode,
                        animation: { 
                            duration: 5000, 
                            easing: "radialProgressEasing" 
                        },
                        fill: {
                            gradient: [[pcolor, 0.1], [scolor, 1]], 
                            gradientAngle: Math.PI / 4
                        }
                    }).on('radial-animation-progress', function(event, progress) {
                        $(this).find('span').html(Math.round(percent * progress) + symbol);
                    })
                })
            }
        })
    }
    initCounter('.counter.funfacts', '.counter.funfacts .radial');
    initCounter('.counter.skills', '.counter.skills .radial');
})

/*----------------------------------------------
5. Sign and Register Form
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    $(document).on('click', 'a[data-target="#register"]', function() { 

        $('#sign').modal('hide');
    })

    $(document).on('click', 'a[data-target="#sign"]', function() { 

        $('#register').modal('hide');
    })

})

/*----------------------------------------------
6. Multi-Step Form
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    function next(button, group, show, hide) {

        $(document).on('click', button, function () {

            $(group + ' .pure-material-textfield-outlined').each(function () {

                var minlength = $(this).data('minlength');

                if ($(this).val() == null || $(this).val() == '') {

                    var value = 0;

                } else {

                    var value = $(this).val().length;
                }

                if (Number(minlength) <= Number(value)) {

                    $(this).removeClass('invalid').addClass('valid');

                } else {

                    $(this).removeClass('valid').addClass('invalid');
                }
            })

            let field = $(group).find('.pure-material-textfield-outlined').length;
            let valid = $(group).find('.valid').length;

            if (field == valid) {

                if (animating) return false;
                animating = true;

                current_fs = $(this).parents().eq(1);
                next_fs = $(this).parents().eq(1).next();

                $('.progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

                next_fs.show();

                current_fs.animate({

                    opacity: 0

                }, {
                    step: function (now, mx) {

                        scale = 1 - (1 - now) * 0.2;
                        left = (now * 50) + '%';
                        opacity = 1 - now;

                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'position': 'absolute'
                        })

                        next_fs.css({
                            'left': left,
                            'opacity': opacity
                        })
                    },
                    duration: 600,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    easing: 'easeInOutBack'
                })

                $(hide).hide();
                $(show).show();

                if($('.multi-step-form').data('steps') == 1) {
                    var sendButton = '#step-next-1';

                } else if($('.multi-step-form').data('steps') == 2) {
                    var sendButton = '#step-next-2';
                   
                } else if($('.multi-step-form').data('steps') == 3) {
                    var sendButton = '#step-next-3';
                    
                } else if($('.multi-step-form').data('steps') == 4) {
                    var sendButton = '#step-next-4';

                } else if($('.multi-step-form').data('steps') == 5) {
                    var sendButton = '#step-next-5';
                    
                } else {
                    var sendButton = '#step-next-6';
                }

                if (button == sendButton) {
                    $('.progressbar').addClass('complete');
                }

                if (button == sendButton) {

                    // $('.form .intro').css('opacity', '0');
                    
                    let height = $(button).parents().eq(5).height();
                    let message = $(button).parents().eq(5).find('.message');
                    
                    message.css('height', height);
                    message.addClass('active');
                    

                    // Here the form is sent.
                    $('.multi-step-form').submit();
                }
            }
        })

    }

    // Progressbar
    $('.progressbar li').first().addClass('active');

    $('.progressbar li').each(function(index) {
        $('.multi-step-form').attr('data-steps', (index+1));
    })

    // Step Image [ID]
    $('.step-image').each(function(index) {
        $(this).attr('id', 'step-image-'+(index+1));

        if(index) {
            $('#step-image-2, #step-image-3, #step-image-4, #step-image-5, #step-image-6').hide(); 
        }
    })

    // Step Title [ID]
    $('.step-title').each(function(index) {
        $(this).attr('id', 'step-title-'+(index+1));

        if(index) {
            $('#step-title-2, #step-title-3, #step-title-4, #step-title-5, #step-title-6').hide(); 
        }
    })

    // Step Group [ID]
    $('.step-group').each(function(index) {
        $(this).attr('id', 'step-group-'+(index+1));
    })

    // Step Next [ID]
    $('.step-next').each(function(index) {
        $(this).attr('id', 'step-next-'+(index+1));
    })
    
    // Step Prev [ID]
    $('.step-prev').each(function(index) {
        $(this).attr('id', 'step-prev-'+(index+2));
    })

    next('#step-next-1', '#step-group-1', '#step-image-2, #step-title-2', '#step-image-1, #step-title-1');
    next('#step-next-2', '#step-group-2', '#step-image-3, #step-title-3', '#step-image-2, #step-title-2');
    next('#step-next-3', '#step-group-3', '#step-image-4, #step-title-4', '#step-image-3, #step-title-3');
    next('#step-next-4', '#step-group-4', '#step-image-5, #step-title-5', '#step-image-4, #step-title-4');
    next('#step-next-5', '#step-group-5', '#step-image-6, #step-title-6', '#step-image-5, #step-title-5');
    next('#step-next-6', '#step-group-6', '#step-image-5', '#step-image-6');

    function prev(button, show, hide) {

        $(document).on('click', button, function () {

            if (animating) return false;
            animating = true;

            current_fs = $(this).parents().eq(1);
            previous_fs = $(this).parents().eq(1).prev();

            $('.progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

            previous_fs.show();
            current_fs.animate({

                opacity: 0

            }, {
                step: function (now, mx) {

                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + '%';
                    opacity = 1 - now;

                    current_fs.css({
                        'left': left
                    })

                    previous_fs.css({

                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    })
                },
                duration: 600,
                complete: function () {

                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            })

            $(hide).hide();
            $(show).show();

            if (button == '#step-prev-6') {
                $('.progressbar').removeClass('complete');
            }
        })
    }

    prev('#step-prev-2', '#step-image-1, #step-title-1', '#step-image-2, #step-title-2');
    prev('#step-prev-3', '#step-image-2, #step-title-2', '#step-image-3, #step-title-3');
    prev('#step-prev-4', '#step-image-3, #step-title-3', '#step-image-4, #step-title-4');
    prev('#step-prev-5', '#step-image-4, #step-title-4', '#step-image-5, #step-title-5');
})

/*----------------------------------------------
7. Submission Parameters
----------------------------------------------*/
jQuery(function ($) {

    'use strict';

    // Variable to hold request
    var request;

    // Bind to the submit event of our form
    $('form').each(function() {

        var form = $(this);

        if(form.attr('id') == 'leverage-form' || form.attr('id') == 'leverage-subscribe') {

            form.submit(function (event) {

                // Prevent default posting of form - put here to work in case of errors
                event.preventDefault();

                // Prevent
                setTimeout(function() {

                    let input = form.find('.pure-material-textfield-outlined');
                    let button = form.find('button');

                    input.attr('disabled', 'disabled');
                    button.attr('disabled', 'disabled').html('<i class="icon-check"></i>'+button.data('success'));

                }, 1500)

                // Abort any pending request
                if (request) {
                    request.abort();
                }

                // setup some local variables
                var $form = $(this);

                // Let's select and cache all the fields
                var $inputs = $form.find('input, select, button, textarea');

                // Serialize the data in the form
                var serializedData = $form.serialize();

                // Let's disable the inputs for the duration of the Ajax request
                // Note: we disable elements AFTER the form data has been serialized
                // Disabled form elements will not be serialized
                $inputs.prop('disabled', true);

                // Fire off the request
                request = $.ajax({
                    url: $form.attr('action'), // Enter your back-end URL here
                    type: 'post',
                    data: serializedData
                })

                // Callback handler that will be called on success
                request.done(function (response, textStatus, jqXHR) {

                    // Log a message to the console
                })

                // Callback handler that will be called on failure
                request.fail(function (jqXHR, textStatus, errorThrown) {

                    // Log the error to the console
                    console.error(textStatus, errorThrown);
                })

                // Callback handler that will be called regardless
                // if the request failed or succeeded
                request.always(function () {

                    // Reenable the inputs
                    $inputs.prop('disabled', false);
                })
            })
        }
    })
})


/*----------------------------------------------
8. Populate fields dynamically - MMULDER
----------------------------------------------*/

function populate(s1,s2){
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    var s3 = document.getElementById("variantDiv");

    s2.innerHTML = "";
    if(s1.value == "Incidente" || s1.value == "Problema"){
        var optionArray = ["|","sim|Sim","temvariante|Não","navariante|Não sei informar"];
    }

    if (typeof optionArray  != "undefined" ){
        s3.style.display = 'block'; 
        var newOption = document.createElement("option");
        newOption.value = "";
        newOption.innerHTML = "É possível simular no ambiente de homologação?";
        newOption.selected = "true";
        newOption.disabled = "true";
        s2.options.add(newOption);
        for(var option in optionArray){
            var pair = optionArray[option].split("|");
            var newOption = document.createElement("option");
            newOption.value = pair[0];
            newOption.innerHTML = pair[1];
            if (newOption.value != ""){
                s2.options.add(newOption);
             }
        }
    }else {
        s3.style.display = "none";
    }

}

function populatev2(s1,s2){
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    var s3 = document.getElementById("applicationDiv");

    if(s1.value == "Programa custom"){
        var defaultlabelName = "Informar o nome do Programa custom";
    } else if(s1.value == "Programa SAP"){
        var defaultlabelName = "Informar o nome do Programa SAP";
    } else if(s1.value == "Aplicação web SAP"){
        var defaultlabelName = "Informar o nome da Aplicação web SAP";
    } else if(s1.value == "Aplicação web custom"){
        var defaultlabelName = "Informar o nome da Aplicação web custom";
    } else if(s1.value == "Transação SAP"){
        var defaultlabelName = "Informar o nome da Transação SAP";
    } else if(s1.value == "Transação custom"){
        var defaultlabelName = "Informar o nome da Transação custom";
    }

    if (typeof defaultlabelName  != "undefined" ){
        s3.style.display = 'block'; 
        s2.innerHTML = defaultlabelName;
    }else {
        s3.style.display = "none";
    }

}

function populatev3(s1,s2){
    var s1 = document.getElementById(s1);
    var s2 = document.getElementById(s2);
    var s3 = document.getElementById("variantNameDiv");

    if (s1.value == 'sim' ){
        s3.style.display = 'block'; 
    }else {
        s3.style.display = "none";
    }

}

function populatev4(){
    var deliveryDate = document.getElementById("deliveryDate");
    var hours = document.getElementById("hours");
    var ticketType = document.getElementById("ticketType");
    var connection = document.getElementById("connection");
    var totalValue = document.getElementById("totalValue");
    var hourValue = document.getElementById("hourValue");
    var aditionalValue = document.getElementById("aditionalValue");
    var finalContact = document.getElementById("finalContact");

    var type = document.getElementById("type");
    var vpn = document.getElementById("vpn");
    var email = document.getElementById("email");

    connection.innerHTML = vpn.value;

    var someDate = new Date();
    
    if (type.value == 'Problema') {
        if (vpn.value == 'SAP Router') {
            hours.innerHTML = '16 horas';
            var numberOfDaysToAdd = 4;
            totalValue.innerHTML = '2.240,00 reais';
            aditionalValue.innerHTML = 'Sem adição de horas';
        }else {
            hours.innerHTML = '20 horas';
            var numberOfDaysToAdd = 5;
            totalValue.innerHTML = '2.800,00 reais';

            // This probably will change
            aditionalValue.innerHTML = 'Configuração de conexão';
        }
        hourValue.innerHTML = '140,00 reais';
        ticketType.innerHTML = 'Problema';
    
    }else{
        if (vpn.value == 'SAP Router') {
            hours.innerHTML = '4 horas';
            var numberOfDaysToAdd = 1;
            totalValue.innerHTML = '640,00 reais';
            aditionalValue.innerHTML = 'Sem adição de horas';
        }else {
            hours.innerHTML = '8 horas';
            var numberOfDaysToAdd = 2;
            totalValue.innerHTML = '1.280,00 reais';

            // This probably will change
            aditionalValue.innerHTML = 'Configuração de conexão';
        }
       
        hourValue.innerHTML = '160,00 reais';
        ticketType.innerHTML = 'Incidente';
    }

    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
    
    // Formatting to dd/mm/yyyy :
    
    var dd = ( '0' + someDate.getDate()).slice(-2);
    var mm = ( '0' + (someDate.getMonth() + 1)).slice(-2);
    var y = someDate.getFullYear();
    
    var someFormattedDate = dd + '/'+ mm + '/'+ y;

    // var labelDeliveryDate = 'Data de Entrega '.concat(someFormattedDate);
    deliveryDate.innerHTML =  someFormattedDate;
    finalContact.innerHTML =  email.value;


}

/*----------------------------------------------
9. Validate fields per step - MMULDER
----------------------------------------------*/

function validateStepOne(){
    // var form = document.getElementById("leverage-form");
    var emailValue = document.getElementById("email").value;
    var emailElemennt = document.getElementById("email");
    var emailSpan = document.getElementById("emailSpan");
    var phone_with_dddSpan = document.getElementById("phone_with_dddSpan");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Extra
    var nameElement = document.getElementById("name");   
    var phone_with_ddd = document.getElementById("phone_with_ddd");
    var nameCompany = document.getElementById("companyName");

    if (true) {

        nameElement.classList.add("valid");         
        nameCompany.classList.add("valid");

        if (phone_with_ddd.value.length == 15 ){
            phone_with_ddd.classList.add("valid");
            phone_with_ddd.classList.remove("invalid");
            phone_with_dddSpan.innerHTML = "Telefone móvel";
        }else{
            phone_with_ddd.classList.remove("valid");
            phone_with_ddd.classList.add("invalid");
            phone_with_dddSpan.innerHTML = "Informar um número válido";
            phone_with_ddd.click();
            phone_with_ddd.focus();
        }

    }

    if (emailValue.match(pattern) ){
        emailElemennt.classList.add("valid");
        emailElemennt.classList.remove("invalid");

        emailSpan.innerHTML = "E-mail";

        // form.style.borderColor = "rgba(var(--tempwhite, 255, 0, 0), 0.6)";
        // form.style.borderTopColor = "transparent";
        // form.style.backgroundColor = "transparent";
        // test.style.color = "#E0040B";
        // text.style.color = "#00ff00";
        // text.innerHTML = "";
        // text.style.color = "";
    }else{
        emailElemennt.classList.remove("valid");
        emailElemennt.classList.add("invalid");

        emailElemennt.click();
        emailElemennt.focus();
        emailSpan.innerHTML = "Informar um e-mail válido.";

        // email2.style.color = "rgba(var(--tempwhite, 255, 0, 0), 0.6)";
        // text.innerHTML = "E-mail inválido.";
        // text.style.color = "#E0040B";
        // text.style.position = "relative"; 
        // text.style.right = "170px";
    }

}

function validateStepTwo(){
    var system          = document.getElementById("system");   
    var vpn             = document.getElementById("vpn"); 
    var type            = document.getElementById("type");
    var applicationName = document.getElementById("applicationName");
    var application     = document.getElementById("application");
    var variant         = document.getElementById("variant");
    var variantName     = document.getElementById("variantName");

    if (true) {

        system.classList.add("valid");      
        vpn.classList.add("valid");
        type.classList.add("valid");
        application.classList.add("valid");
        applicationName.classList.add("valid");
        variant.classList.add("valid");
        variantName.classList.add("valid");

    }

}


function validateStepThree(){
    var module = document.getElementById("module");   
    var actionDetail = document.getElementById("actionDetail");
    var component = document.getElementById("component");
    var message = document.getElementById("message");

    if (true) {

        module.classList.add("valid");      
        actionDetail.classList.add("valid");
        component.classList.add("valid");
        message.classList.add("valid");

    }

}

/*----------------------------------------------
10. JQuery - Masks - MMULDER
----------------------------------------------*/

$(document).ready(function(){
    $('.date').mask('00/00/0000');
    $('.time').mask('00:00:00');
    $('.date_time').mask('00/00/0000 00:00:00');
    $('.cep').mask('00000-000');
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00', {reverse: true});
    $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.money2').mask("#.##0,00", {reverse: true});
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
      translation: {
        'Z': {
          pattern: /[0-9]/, optional: true
        }
      }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', {reverse: true});
    $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
    $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
    $('.fallback').mask("00r00r0000", {
        translation: {
          'r': {
            pattern: /[\/]/,
            fallback: '/'
          },
          placeholder: "__/__/____"
        }
      });
    $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
  });

/*----------------------------------------------
11. Clear localstorage - 
----------------------------------------------*/
// $(document).ready(function() {
//     $(".pure-material-textfield-outlined").val('');
//   });