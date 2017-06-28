var $xml;


$(document).ready(function () {
    
    $.ajax({
        method: 'GET',
        url: 'resume-data.xml',
        dataType: 'xml',
        success: function (xml) {
            UpdateUserData(xml)
            $xml = xml;
        }
    });

    $('.resume').on('click', '#Header>.Header-Item', null, function () {

        $('#Header').children().show(500);
        $(this).hide(500);
        $('#Details').children().hide(500);

        console.log($(this).attr('data-index'));

        $('#Details [data-index=' + $(this).attr('data-index') + ']').show(500);

    });

    $('.resume').on('mouseenter', '#Header>.Header-Item', null, function () {
        $(this).css({
            'cursor': 'zoom-in'
        })
    });

    $('.resume').on('mouseleave', '#Header>.Header-Item', null, function () {
        $(this).css({
            'cursor': ''
        })
    });
});


function UpdateUserData(xml) {
    //name
    $('.title-area .name').text($(xml).find('Name').text());
    $('.title-area .job-title').text($(xml).find('Resume>Title').text());
    $('.title-area .city').text($(xml).find('Location').text());

    //social networks
    $('#a-linkedin')
        .attr('href', 'https://www.linkedin.com/in/' + ($(xml).find('Linkedin-user').text()))
        .text($(xml).find('Linkedin-user').text());

    $('#a-github')
        .attr('href', 'https://www.github.com/' + ($(xml).find('Github-user').text()))
        .text($(xml).find('Github-user').text());

    $('#a-email')
        .attr('href', 'mailto: ' + ($(xml).find('Email').text()))
        .text($(xml).find('Email').text());

    $('#phone').text($(xml).find('Phone').text());

    var template = $('#social-links').clone().html();
    var html = $.parseHTML(template);
    var itemTemplate = $(html).find('.social-text').clone();
    $(html).remove('.social-text');

    $(xml).find('Account').each(function (index, data) {
        $(itemTemplate).text($(data).find('Text').text())

        if ($(data).find('Link').text() == '') {
            $(html).append(itemTemplate);
        }
        else {
            $(html).append($('<a>').attr({
                'href': $(data).find('Link').text(),
                'target': '_blank'
            }).append(itemTemplate));
        }


    });

    console.log(html);

    $('#social-area').append(html);




    $(xml)
        .find('[SectionTitle]')
        .each(function (index, header) {

            $('#Header').append($('<div>')
                .attr({'class': 'Header-Item', 'data-index': index})
                .text($(header).attr('SectionTitle')));

            console.log($(header).prop('tagName'));

            if ($(header).prop('tagName') == 'SingleColList'
                || $(header).prop('tagName') == 'MultiColList') {

                if ($(header).prop('tagName') == 'SingleColList') {
                    var template = $('#single-col-list').clone().html();
                } 
                else if ($(header).prop('tagName') == 'MultiColList') {
                    var template = $('#multi-col-list').clone().html();
                }

                var html = $.parseHTML(template);
                $(html).attr('data-index', index);
                var itemTemplate = $(html).find('.item').clone();
                
                $(html).find('.item').remove();

                $(html).find('.section-title').text($(header).attr('SectionTitle'));

                $(header).find('item').each(function (index, item) {
                    $(html).append($(itemTemplate).text($(item).text()));
                });

                $('#Details').append(html);        
            }

        });

};
