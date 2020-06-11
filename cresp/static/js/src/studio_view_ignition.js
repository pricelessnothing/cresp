function CrespXBlockSetup(runtime, element) {
    $(function() {
        const el = $(element).children('.cresp-app-setup')[0]

        startReactCrespXBlockSetup(el)
        var handlerUrl = runtime.handlerUrl(element, 'save_data');

        $(el).on('exportCards', function(e) {
            var updateButtonState = new CustomEvent('updateButtonState', {detail: 'pending'})
            el.dispatchEvent(updateButtonState)
            $.ajax({
                type: "POST",
                datatype: 'json',
                url: handlerUrl,
                data: JSON.stringify(e.detail.the_data),
                success: function (msg) {
                    console.log('succeed saving cards', msg)
                    var updateButtonState = new CustomEvent('updateButtonState', {detail: 'idle'})
                    el.dispatchEvent(updateButtonState)
                    window.location.reload()
                },
                error: function (msg) {
                    console.log('failed saving cards', msg)
                    var updateButtonState = new CustomEvent('updateButtonState', {detail: 'error'})
                    el.dispatchEvent(updateButtonState)
                    setTimeout(function () {
                        var updateButtonState = new CustomEvent('updateButtonState', {detail: 'idle'})
                        el.dispatchEvent(updateButtonState)
                    }, 2000)
                }
            });
        })
    })
}
