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
    $("#start_date_search_datepicker").Zebra_DatePicker({
        onSelect: function(view, elements) {
            $.post("/start_date_search", {"date": view}, function(data) {
                $("#start_date_search_results").html("You Have Been Around For " + data + " Releases!")
            });
        }
    });
};

showDateRangeSearch = function() {
    $(".start_date_search").hide();
    $(".date_range_search").show();
    $("#start_date_range_search_datepicker").Zebra_DatePicker({
        // if end date is selected
    });
    $("#end_date_range_search_datepicker").Zebra_DatePicker({
        // if start date is selected
    });
};