const selectRayon = $('#rayon');
let listRayon = [];

totalRayon.forEach(function(val, index) {
    for (let i = 1; i <= parseInt(val.split("_").pop()); i++) {
        let rayon = val.substring(0, val.length - 1) + i;

        listRayon.push(rayon);
        selectRayon.html(selectRayon.html() + `<option value="${rayon}">${rayon}</option>`);
    }
});

$(function(){
    document.getElementById('time-start').max = new Date(new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' })).toISOString().split("T")[0];
    $('.submit-progress').css("display","none");
});

const startSpamming = () => {
    if (
        timeStart.val() === '' || noAbsen.val() === '' || !isIslam.is(':checked')
    ) {
        console.log(isIslam.is(':checked'), noAbsen.val(), timeStart.val())
        return alert('isi lkh rayon / no absen / agama');
    }

    let formId = idsRayon[rayon.prop('selectedIndex')];
    spamLKH(formId);
}

// new Date(new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' }))
const spamLKH = async (formId) => {
    idsQuestion = [];
    await getFormQuestions(formId);
    
    let time = new Date(timeStart.val());
    let today = new Date();

    for (time; time <= today; time.setDate(time.getDate() + 1)) {
        $('#loading').html('cek inspect element -> console <bold>mas</bold>')

        await submitForm(formId, time, fillQuestion);
    }

    $('#loading').html('');
};