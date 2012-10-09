$(function () {

    $(".big_button").hover(function () {
        $(this).addClass('inset_shadow');
    }, function () {
        $(this).removeClass('inset_shadow');
    });

    $('#start_date_button').click(function () {
        showStartDateSearch();
    });

    $('#date_range_button').click(function () {
        showDateRangeSearch();
    });

});

showStartDateSearch = function () {
    $(".date_range_search").hide();
    $(".start_date_search").show();
    $("#start_date_button").css("background-color", "lightgray");
    $("#date_range_button").css("background-color", "#fe851f");
    $("#start_date_search_datepicker").val("");
    $("#start_date_search_results").html("");
    $("#start_date_search_datepicker").Zebra_DatePicker({
        onSelect:function (view, elements) {
            $.blockUI();
            $.post("/start_date_search", {"date":view}, function (data) {
                $("#start_date_search_results").html("You Have Been Around For " + data + " Releases!")
                $.unblockUI();
            });
        }
    });
};

showDateRangeSearch = function () {
    $(".start_date_search").hide();
    $(".date_range_search").show();
    $("#start_date_button").css("background-color", "#fe851f");
    $("#date_range_button").css("background-color", "lightgray");
    $("#start_date_range_search_datepicker").val("");
    $("#end_date_range_search_datepicker").val("");
    $("#date_range_search_results").html("");
    $("#start_date_range_search_datepicker").Zebra_DatePicker({
        onSelect:function (view, elements) {
            if ($("#end_date_range_search_datepicker").val()) {
                doDateRangeAjax();
            }
        }
    });
    $("#end_date_range_search_datepicker").Zebra_DatePicker({
        onSelect:function (view, elements) {
            if ($("#start_date_range_search_datepicker").val()) {
                doDateRangeAjax();
            }
        }
    });
};

doDateRangeAjax = function () {
    $.blockUI();
    startDate = $("#start_date_range_search_datepicker").val();
    endDate = $("#end_date_range_search_datepicker").val();
    $.post("/date_range_search", {"start_date":startDate, "end_date":endDate}, function (data) {
        $.unblockUI();
        if (data == "backwards") {
            alert("End date cannot be after start date.")
        } else {
            $("#date_range_search_results").html("There Have Been " + data + " Releases Between These Dates!")
        }
    });
};