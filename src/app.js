totalRayon.forEach(function(val) {
    let listRayon = [];
    for (let i = 1; i <= parseInt(val.split("_").pop()); i++) {
        let namaRayon = val.substring(0, val.length - 1) + i;

        listRayon.push(namaRayon);
        rayon.html(rayon.html() + `<option value="${namaRayon}">${namaRayon}</option>`);
    }
});

$(function(){
    let date = new Date()
    date.setDate(date.getDate() - 1);
    document.getElementById('time-start').max = date.toISOString().split("T")[0];
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

    let now = new Date;
    let randomNum1 = Math.floor(Math.random() * 12);
    $('#terminal-wannabe-textarea').html('');
    $('#terminal-wannabe-textarea').append(
        `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] Memulai proses hacking, ${tauntMessage[randomNum1]} &#13;&#10;`
    );

    let time = new Date(timeStart.val());
    let today = new Date();

    for (time; time <= today; time.setDate(time.getDate() + 1)) {
        $('#gas').prop('disabled', true);

        await submitForm(formId, time, fillQuestion);
    }

    $('#gas').prop('disabled', false);
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});