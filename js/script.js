$(document).ready(function () {
    $(".search > input").keyup(function (event) {
        showTags(text = $(this).val());
    });
    $(window).on("resize", function (event) {
        checkWindowSize(this);
    });
    checkWindowSize($(window));
});

$(document).on('click', '.tags > .selected > li > a', function () {

    tag = $(this).parent().remove();
    tag.children('a').children().remove('i');
    flag = true;
    $('.tags > .data > li').each(function () {

        //Order By Id
        //if(parseInt(tag.children('a').attr('id')) < parseInt($(this).children('a').attr('id'))){
        //    $(this).before(tag);
        //    flag = false;
        //    return  false;
        //}

        if (tag.children('a').html().toLowerCase() < $(this).children('a').html().toLowerCase()) {
            $(this).before(tag);
            flag = false;
            return false;
        }
    });
    if (flag)
        tag.appendTo(".tags > .data");

    $(".search > input").val('');
    showTags('');
});
$(document).on('click', '.tags > .data > li > a', function () {
    tag = $(this).parent().remove();
    tag.children().append('<i class="icon-circle-minus"></i>');
    tag.appendTo(".tags > .selected");

    $(".search > input").val('');
    showTags('');
});


function orderInsert(list, tag) {
    list.each(function () {
        var position = $(this).data('position');
        $(this).siblings().eq(position + 1).after(this);
    });
}

function showTags(text) {
    $(".tags").children(".data").children("li").each(function () {
        if ($(this).children().html().toLowerCase().indexOf(text.toLowerCase()) != -1) {
            if (!$(this).is(":visible"))
                $(this).show();
        } else {
            if ($(this).is(":visible"))
                $(this).hide();
        }
    })
}

function loadPage(page) {
    changeNav('loader');
    $.ajax({
        type: 'get',
        url: page,
        success: function (result) {
            if (result != "") {
                showPage(result);
            }
            changeNav();
        },
        error: function () {/*
            isError("Houve um problema no processamento desta requisição.\n"+
                    "Verifique sua conexão.\n"+
                    "Se o problema persistir, entre em contato com o suporte.","divError");*/
        }
    });
}

function showPage(page) {
    $('.main > .article').html(page);
    if (!$('.main > .article').is(":visible"))
        $('.main > .article').slideDown(300);
    if ($('.main > .boxes').is(":visible"))
        $('.main > .boxes').hide(300);
}
function showBox(page) {
    $('.main > .boxes').html(page);
    if ($('.main > .article').is(":visible"))
        $('.main > .article').hide(300);
    if (!$('.main > .boxes').is(":visible"))
        $('.main > .boxes').slideDown(300);
}

function changeNav(nav) {
    if (nav == 'more') {
        if (!$('.main > .more').is(":visible"))
            $('.main > .more').slideDown(300);
        if ($('.main > .loader').is(":visible"))
            $('.main > .loader').hide(300);
        if ($('.main > .finish').is(":visible"))
            $('.main > .finish').hide(300);
    }
    else
        if (nav == 'loader') {
            if ($('.main > .more').is(":visible"))
                $('.main > .more').hide(300);
            if (!$('.main > .loader').is(":visible"))
                $('.main > .loader').slideDown(300);
            if ($('.main > .finish').is(":visible"))
                $('.main > .finish').hide(300);
        }
        else
            if (nav == 'finish') {
                if ($('.main > .more').is(":visible"))
                    $('.main > .more').hide(300);
                if ($('.main > .loader').is(":visible"))
                    $('.main > .loader').hide(300);
                if (!$('.main > .finish').is(":visible"))
                    $('.main > .finish').slideDown(300);
            } else {
                if ($('.main > .more').is(":visible"))
                    $('.main > .more').hide(300);
                if ($('.main > .loader').is(":visible"))
                    $('.main > .loader').hide(300);
                if ($('.main > .finish').is(":visible"))
                    $('.main > .finish').hide(300);
            }
}



function openMenu() {
    /*$('.menu-open').hide(200, function(){
        $(".menu").animate({ marginLeft: '50px' }, 500 );
        $(".main").animate({ marginLeft: '380px' }, 500 );

    });*/
    $('.menu-open').hide(200, function () {
        $(".menu").show(500, function () {
            $(".menu-close").show(200);
        });
        $(".main").animate({ marginLeft: '370px', width: 'calc(100% - 80px)' }, 500);

    });
};
//width  : calc(100% - 410px);
function closeMenu() {
    $(".menu").hide(500);

    $(".main").animate({ marginLeft: '0px', width: '100%' }, 500, function () {
        $('.menu-open').show(200);
    });
};

function checkWindowSize(win){
    if ($(win).width() > 980) {
        if (!$('.menu').is(":visible"))
            $('.menu').show();
            
        $(".menu-close").hide();
        $(".menu-open").hide();
        $('.main').css("width", "100%").css('width', '-=410px');
        $('.main').css("margin-left", "370px");

    }
    else {
        if ($('.menu').is(":visible"))
            $('.menu').hide();

        $(".menu-open").show();
        $('.main').css("width", "100%");
        $('.main').css("margin-left", "0px");
    }
}