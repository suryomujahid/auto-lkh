totalRayon.forEach(function(val) {
    let listRayon = [];
    for (let i = 1; i <= parseInt(val.split("_").pop()); i++) {
        let namaRayon = val.substring(0, val.length - 1) + i;

        listRayon.push(namaRayon);
        rayon.html(rayon.html() + `<option value="${namaRayon}">${namaRayon}</option>`);
    }
});

$(function(){
    document.getElementById('time-start').max = new Date().toISOString().split("T")[0];
    $('.submit-progress').css("display","none");
});

$('#gas').click(function() {
    if (timeStart.val() === '' || noAbsen.val() === '') {
        return alert('isi dimulai tgl / no absen');
    }

    let formId = idsRayon[rayon.prop('selectedIndex')];
    spamLKH(formId);
});

// new Date(new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' }))
const spamLKH = async (formId) => {
    idsQuestion = [];
    await getFormQuestions(formId);
    
    let time = new Date(timeStart.val());
    let today = new Date();
    const btnProcess = $('#gas');

    for (time; time <= today; time.setDate(time.getDate() + 1)) {
        $('#gas').prop('disabled', true);
        $('#loading').html('Cek terminal dibawah')
        if (time.getDay() === 0) continue;

        await submitForm(formId, time, fillQuestion);
    }

    $('#gas').prop('disabled', false);
    $('#loading').html('');
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});