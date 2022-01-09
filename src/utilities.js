let idsQuestion = [];

const getFormQuestions = (formId) => {
    let url = 'https://docs.google.com/forms/d/' + formId + '/formResponse';
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            data = JSON.parse(
                data.split("var FB_PUBLIC_LOAD_DATA_ = ")[1].split(";")[0]
            );

            data[1][1].forEach(function(val) {
                idsQuestion.push(val[4][0][0]);
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function fillQuestion(day) {
    let year = day.getFullYear();
    let month = ("0" + (day.getMonth() + 1)).slice(-2);
    let date = ("0" + day.getDate()).slice(-2);

    try {
        let entries = `?entry.${idsQuestion[0]}=${year}-${month}-${date}`;

        entries += `&entry.${idsQuestion[1]}=${noAbsen.val()}`;

        activities.forEach(function (val) {
            entries += `&entry.${idsQuestion[2]}=${val}`;
        })

        if (day.getDay() == 2 && isTen.is(':checked')) {
            entries += `&entry.${idsQuestion[2]}=P`;
        }

        if (day.getDay() == 5 && isIslam.is(':checked')) {
            entries += `&entry.${idsQuestion[2]}=N`;
        }

        return entries;
    } catch (error) {
        return console.log(error);
    }
}

const submitForm = async (formId, day, entries) => {
    let url = 'https://docs.google.com/forms/d/' + formId + '/formResponse' + entries(day);

    return $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            let now = new Date;
            let dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

            $('#terminal-wannabe-textarea').append(
                `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] SUCCESS Input LKH Hari ${dayNames[day.getDay()]}, ${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}&#13;&#10;`
            );
        },
        error: function(xhr, status, error) {
            $('#terminal-wannabe-textarea').append(
                `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ERROR Terjadi Kesalahan Ketika Input LKH Hari ${dayNames[day.getDay()]}, ${day.getDate()}-${day.getMonth()+1}-${day.getFullYear()}&#13;&#10;`
            );
            $('#terminal-wannabe-textarea').append(
                `Error: ${error} &#13;&#10;`
            );
        }
    });
}