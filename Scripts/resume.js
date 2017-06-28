var $xml;


$(document).ready(function () {
    
    $.ajax({
        method: 'GET',
        url: 'resume-data.xml',
        dataType: 'xml',
        success: function (xml) {
            UpdateUserData(xml)
        }

    });
});


function UpdateUserData(xml) {

    $('.name').text($(xml).find('Name').text());
    $('#a-linkedin')
        .attr('href', 'https://www.linkedin.com/in/' + ($(xml).find('Linkedin-user').text()))
        .text($(xml).find('Linkedin').text());

    $('#a-github')
        .attr('href', 'https://www.github.com/' + ($(xml).find('Github-user').text()))
        .text($(xml).find('Github').text());

    $('#a-email')
        .attr('href', 'mailto: ' + ($(xml).find('Email').text()))
        .text($(xml).find('Email').text());

    $('#phone').text($(xml).find('Phone').text());

    $(xml).find('Certifications>item').each(function (index, item) {
        $('#certification-area>ul').append($('<li>').text($(item).text()))
    })


    $(xml).find('TechnicalSkills>item')
        .each(function (index, item) {
            $('#technical-skills-area>ul')
                .append($('<li>')
                .attr('class', 'col-md-4')
                .text($(item).text()))
    })
};
