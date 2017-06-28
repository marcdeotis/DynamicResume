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

        $('#Header').children().show();
        $(this).hide();
        $('#Details').children().hide();

        console.log($(this).attr('data-index'));

        $('#Details [data-index=' + $(this).attr('data-index') + ']').show();

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
    $('.name').text($(xml).find('Name').text());
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

    //stuff???

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

                $(html).find('.title').text($(header).attr('SectionTitle'));

                $(header).find('item').each(function (index, item) {
                    $(html).append($(itemTemplate).text($(item).text()));
                });

                $('#Details').append(html);        
            }

        });




    //$(xml).find('TechnicalSkills>item')
    //    .each(function (index, item) {
    //        $('#technical-skills-area>ul')
    //            .append($('<li>')
    //            .attr('class', 'col-md-4')
    //            .text($(item).text()))
    //    });

    //console.log($(xml).find('Experiences').attr('SectionTitle'));

    //$(xml).find('Experiences>Experience')
    //    .each(function (index, experience) {
    //        console.log($(experience).find('Company').text());
            
    //        $(experience)
    //            .find('item')
    //            .each(function (index, item) {
    //                console.log($(item).text())
    //            });
    //    });


};
