const data = {
    tags: [
        {
            id: 1,
            name: "C"
        },
        {
            id: 2,
            name: "Algoritmo"
        }
    ],

    boxes: [
        {
            id: 1,
            date: "25/10/2020",
            title: "Sobre mim",
            text: "Nessa minha primeira publicação conto um pouco sobre minha trajetória e meus objetivos em relação a esse blog.",
            link: "pages/about.html",
            tags:
                [
                ]
        }
    ]
};


class Data {

    static loadBoxes(tags, numberpage) {
        var boxes = [];
        var flag;
        Nav.changeNav('loader');
        if (tags.length == 0) {
            boxes = data.boxes;
        } else {
            data.boxes.forEach(box => {
                flag = true;
                tags.forEach(tag => {
                    if (box.tags.find(element => element.id == tag.id) == null)
                        flag = false;
                });
                if (flag)
                    boxes.push(box);
            });
        }
        var final = 0;
        if (boxes.length % 5 == 0) {
            final = boxes.length / 5;
        }
        else {
            final = parseInt(boxes.length / 5) + 1;
        }
        this.showBox(this.getBetween(boxes, (numberpage * 5), ((numberpage * 5) + 5)), 1 + numberpage, final);

    }
    static showBox(boxes, numberpage, last) {
        var html = "";
        boxes.forEach(box => {
            html += '<div class="box">' +
                '<div class="content">' +
                '<a class="title" href="javascript:loadPage(\''+box['link']+'\');">' + box.title + '</a>' +
                '<hr>' +
                '<label class="date">' + box.date + '</label>' +
                '<p class="text">' + box.text + '</p>' +
                '<div class="tags">';
            box.tags.sort(function (a, b) { return a.name < b.name ? 1 : -1; }).forEach(tag => {
                html +=
                    '<a id="' + tag['id'] + '"' +
                    ' href="javascript:searchTag('+tag['id']+');"' +
                    '>' + data.tags.find(e => e.id == tag['id']).name + '</a>';
            });
            html +=
                '</div>' +
                '</div>' +
                '<div class="read" ><a href="javascript:loadPage(\''+box['link']+'\');">Continuar lendo</a></div>' +
                '</div>';
        });
        if (numberpage > 1)
            $('.main > .boxes').append(html);
        else
            $('.main > .boxes').html(html);

        if ($('.main > .article').is(":visible"))
            $('.main > .article').hide(300);
        if (!$('.main > .boxes').is(":visible"))
            $('.main > .boxes').slideDown(300);

        if (numberpage == last)
            Nav.changeNav('finish');
        else
            Nav.changeNav('more', numberpage);
    }
    static loadTags() {
        var tags = "";

        data.tags.sort(function (a, b) { return a.name > b.name ? 1 : -1; }).forEach(element => {
            tags +=
                '<li><a id="' + element['id'] + '">' + element['name'] + '</a></li>';
        });

        $(".menu > .tags > .data").html(tags);
    }
    static getSelectedTags() {
        var list = [];
        $(".menu > .tags > .selected > li").each(function () {
            var a = {
                id: $(this).children().attr("id"),
                name: ''
            };
            list.push(a);
        });
        return list;
    }

    static getBetween(boxes, first, last) {
        var list = [];
        while (boxes.length > first && first < last) {
            list.push(boxes[first]);
            first++;
        }
        return list;
    }
}