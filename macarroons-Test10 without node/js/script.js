'use strict';
function showThankYouMessage() {
    $('#thank-you-message').show();

}
function showLoader() {
    $('#loader-overlay').show(); // Показываем лоадер
}

function hideLoader() {
    $('#loader-overlay').hide(); // Скрываем лоадер
}
$('#submit-order').click(function () {
    let order = $('#write-your-order');
    let name = $('#your-name');
    let phone = $('#your-phone');
    let hasError = false;

    $('.error-input').hide();
    $('.order-input').removeClass('red-border');

    if (!order.val()) {
        order.next().show();
        order.addClass('red-border');
        hasError = true;
    }
    if (!name.val()) {
        name.next().show();
        name.addClass('red-border');
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        phone.addClass('red-border');
        hasError = true;
    }

    if (hasError) {
        return;
    }
    showLoader();
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: { product: order.val(), name: name.val(), phone: phone.val() },

        })
            .done(function (msg) {
                hideLoader();

                if (msg.success === 1) {
                    $('.order-form').hide();
                    showThankYouMessage();
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            })

});