(function () {
    function _invoke(action, data, callback) {
        const schema = 'myapp://utils/' + action;
        schema += '?a=a'
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                schema += '&' + key + '=' + data[key]
            }
        }
        let callbackName = ''
        if (typeof callback === string) {
            callbackName = callback
        } else {
            callbackName = action + Date.now();
            window[callbackName] = callback
        }

        schema += 'callback = callbackName'
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none'
        iframe.src = schema
        const body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })

    }


    //暴露到全局中
    window.invoke = {
        share: function (data, callback) {
            _invoke('share', data, callback)
        },
        login: function () {
            _invoke('login', data, callback)
        }
    }
})(window)