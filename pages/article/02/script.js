$(document).ready(function () {
    changeCalendar(new Date());
});

/*--Click Events--*/
$(".calendar > .year > .back").click(function () {
    var year = $(".calendar > .year > .description").val() - 1;
    var month = $(".calendar > .month > .description").val() + 1;
    changeCalendar(new Date(year, month, 0));
});
$(".calendar > .year > .next").click(function () {
    var year = $(".calendar > .year > .description").val() + 1;
    var month = $(".calendar > .month > .description").val() + 1;
    changeCalendar(new Date(year, month, 0));
});
$(".calendar > .month > .back").click(function () {
    var year = $(".calendar > .year > .description").val();
    var month = $(".calendar > .month > .description").val();
    changeCalendar(new Date(year, month, 0));
});
$(".calendar > .month > .next").click(function () {
    var year = $(".calendar > .year > .description").val();
    var month = $(".calendar > .month > .description").val() + 2;
    changeCalendar(new Date(year, month, 0));
});
/*--Click Events--*/

/*--Constant with month names--*/
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
/*--Constant with month names--*/

/*--Function to change the calendar values--*/
function changeCalendar(date) {
    var year = $(".calendar > .year > .description");

    if (year.val() != date.getFullYear()) {
        year.html(date.getFullYear());
        year.val(date.getFullYear())
    }

    var month = $(".calendar > .month > .description");
    if (month.val() != date.getMonth()) {
        month.html(monthNames[date.getMonth()]);
        month.val(date.getMonth())
    }

    var last_day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();;

    date.setDate(1);
    var first_day_week = (date.getDay() + 1);

    var content = "";
    var i;

    for (i = (2 - first_day_week); i < 1; i++) {
        content += "<li></li>";
    }
    while (i <= last_day) {
        content += "<li><a>" + i + "</a></li>";
        i++;
    }
    $(".calendar > .days").html(content);
}
/*--Function to change the calendar values--*/
