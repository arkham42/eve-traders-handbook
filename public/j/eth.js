$(document).ready(function () {

    // Clicking an item in the table loads the details via Ajax.
    $('.losses tbody a').click(function () {
        $('.details').html('<img src="/i/loader.gif" class="loader">');
        $.get(this.href, function (data) {
            $('.details').html(data);
        });
        return false;
    });

    // Clicking on filter checkboxes submits the form to reload the page.
    $('.filters input[type=checkbox]').click(function () {
        $('.filters')[0].submit();
    });

    // Updating the Material Efficiency dropdown changes the amounts/costs and saves the value.
    $('body').delegate('#material-efficiency', 'change', function () {
        var typeID = $('.details h3').attr('id');
        $('.details').html('<img src="/i/loader.gif" class="loader">');
        $.get('details/' + typeID, {
            me: this.value
        }, function (data) {
            $('.details').html(data);
        });
    });

    // Removing a solar system ID from the list.
    $('body').delegate('.remove-system', 'click', function () {
        var solarSystemID = $(this).attr('data-solarSystemID'),
            current_ids = $('input[name=systems]').val();
        $('input[name=systems]').val(current_ids.replace(solarSystemID, '').replace(',,', ',').replace(/^,|,$/, ''));
        $(this).parent().fadeOut();
        return false;
    });

    // Removing an alliance ID from the list.
    $('body').delegate('.remove-alliance', 'click', function () {
        var allianceID = $(this).attr('data-allianceID'),
            current_ids = $('input[name=alliances]').val();
        $('input[name=alliances]').val(current_ids.replace(allianceID, '').replace(',,', ',').replace(/^,|,$/, ''));
        $(this).parent().fadeOut();
        return false;
    });

    // Autocomplete selection of system/region names.
    $('#system-autocomplete').autocomplete({
        minLength: 2,
        source: '/settings/systems',
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>").append("<a>" + item.label + " (" + item.region + ")</a>").appendTo(ul);
            };
        },
        focus: function (event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            event.preventDefault();
            // Add the selected item to the list below.
            $('.selected-systems').append('<li><a href="#" class="remove-system" data-solarsystemid="' + ui.item.value + '">' + ui.item.label + ' (' + ui.item.region + ')</a></li>');
            $('input[name=systems]').val($('input[name=systems]').val() + ',' + ui.item.value);
            $(this).value = '';
            return false;
        }
    });

    // Autocomplete selection of alliance names.
    $('#alliance-autocomplete').autocomplete({
        minLength: 2,
        source: '/settings/alliances',
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
            };
        },
        focus: function (event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            event.preventDefault();
            // Add the selected item to the list below.
            $('.selected-alliances').append('<li><a href="#" class="remove-alliance" data-allianceid="' + ui.item.value + '">' + ui.item.label + '</a></li>');
            $('input[name=alliances]').val($('input[name=alliances]').val() + ',' + ui.item.value);
            $(this).value = '';
            return false;
        }
    });

    // Autocomplete selection of region names.
    $('#home-region-autocomplete').autocomplete({
        minLength: 2,
        source: '/settings/regions',
        create: function () {
            $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                return $("<li>").append("<a>" + item.label + "</a>").appendTo(ul);
            };
        },
        focus: function (event, ui) {
            event.preventDefault();
            $(this).val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            event.preventDefault();
            $('input[name=home_region_id]').val(ui.item.value);
            return false;
        }
    });

    // Make the API link work.
    $('.show-api').click(function () {
        $('.api-needed').remove();
    });

});
