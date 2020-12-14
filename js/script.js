const footer = {
    text:  '<hr><label class="footer">© 2020 <a href="/">Douglas Kenta Iwasaki </a>. Todos os direitos reservados.</label>'
};
$(document).ready(function () {
    $(".search > input").keyup(function (event) {
        showTags(text = $(this).val());
    });
    $(window).on("resize", function (event) {
        checkWindowSize(this);
    });
    checkWindowSize($(window));
    Data.loadTags();
    Data.loadBoxes(Data.getSelectedTags(), 0);
});

$(document).on('click', '.tags > .selected > li > a', function () {

    removeSelectedItem(this);
    Data.loadBoxes(Data.getSelectedTags(), 0);
});
$(document).on('click', '.tags > .data > li > a', function () {
    removeDataItem(this);
    Data.loadBoxes(Data.getSelectedTags(), 0);
});
$(document).on('click', '.main > .article > .back', function () {
    $('.main > .article').hide(300);
    $('.main > .boxes').slideDown(300);
    Nav.showLastNav();
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
    Nav.changeNav('loader');
    $.ajax({
        type: 'get',
        url: page,
        success: function (result) {
            if (result != "") {
                showPage(result);
            }
        },
        error: function () {
            /*adicionar mensagem de erro*/
        }
    });
}

function showPage(page) {
    $('.main > .article').html(page + footer.text);
    $('.main > .block').show();

        $('.main > .boxes').hide(300, function(){
                $('.main > .article').slideDown(300, function(){
                    $('.main > .block').hide();
                });
        });
    if ($(window).width() <= 980)
        closeMenu();

    Nav.changeNav();
}

function openMenu() {
    /*$('.menu-open').hide(200, function(){
        $(".menu").animate({ marginLeft: '50px' }, 500 );
        $(".main").animate({ marginLeft: '380px' }, 500 );

    });*/
    $('.menu-open').hide(200, function () {
        $(".menu").show(500, function () {
            $(".menu-close").show(350);
        });
        $(".main").animate({ marginLeft: '370px', width: 'calc(100% - 80px)' }, 500);

    });
};
function closeMenu() {
    $(".menu").hide(500);

    $(".main").animate({ marginLeft: '0px', width: '100%' }, 500, function () {
        $('.menu-open').show(350);
    });
};

function checkWindowSize(win) {
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


function removeSelectedItem(item) {
    tag = $(item).parent().remove();
    tag.children('a').children().remove('i');
    flag = true;
    $('.tags > .data > li').each(function () {
        if (tag.children('a').html().toLowerCase() < $(item).html().toLowerCase()) {
            $(item).before(tag);
            flag = false;
            return false;
        }
        //Order By Id
        //if(parseInt(tag.children('a').attr('id')) < parseInt($(item).children('a').attr('id'))){
        //    $(item).before(tag);
        //    flag = false;
        //    return  false;
        //}
    });
    if (flag)
        tag.appendTo(".tags > .data");

    $(".search > input").val('');
    showTags('');
}

function removeDataItem(item) {

    tag = $(item).parent().remove();
    tag.children().append('<i class="icon-circle-minus"></i>');
    tag.appendTo(".tags > .selected");

    $(".search > input").val('');
    showTags('');
}

function searchTag(id) {
    $('.tags > .selected > li').each(function () {
        removeSelectedItem($(this).children());
    });

    $('.tags > .data > li').each(function () {
        if (parseInt($(this).children().attr('id')) == id) {
            removeDataItem($(this).children());
            return 1;
        }
    });

    Data.loadBoxes([{ id: id }], 0);
}


class Nav {

    static setLastNav(lastNav) {
        this.lastNav = lastNav;
    }
    static getLastNav() {
        return this.lastNav;
    }
    static showLastNav() {
        if (this.getLastNav() != null)
            this.getLastNav().slideDown(300);
    }
    static changeNav(nav, numberpage) {
        if (nav == 'more') {
            if (!$('.main > .more').is(":visible"))
                $('.main > .more').slideDown(300);
            if ($('.main > .loader').is(":visible"))
                $('.main > .loader').hide();
            if ($('.main > .finish').is(":visible"))
                $('.main > .finish').hide();
            if (numberpage != null)
                $('.main > .more > .next').attr("href", "javascript:Data.loadBoxes(Data.getSelectedTags()," + numberpage + ");");
            this.setLastNav($('.main > .more'));

        }
        else
            if (nav == 'loader') {
                if ($('.main > .more').is(":visible"))
                    $('.main > .more').hide();
                if (!$('.main > .loader').is(":visible"))
                    $('.main > .loader').slideDown(300);
                if ($('.main > .finish').is(":visible"))
                    $('.main > .finish').hide();
            }
            else
                if (nav == 'finish') {
                    if ($('.main > .more').is(":visible"))
                        $('.main > .more').hide();
                    if ($('.main > .loader').is(":visible"))
                        $('.main > .loader').hide();
                    if (!$('.main > .finish').is(":visible"))
                        $('.main > .finish').slideDown(300);
                    this.setLastNav($('.main > .finish'));
                } else {
                    if ($('.main > .more').is(":visible"))
                        $('.main > .more').hide();
                    if ($('.main > .loader').is(":visible"))
                        $('.main > .loader').hide();
                    if ($('.main > .finish').is(":visible"))
                        $('.main > .finish').hide();
                }
    }
}