const GetCookieAndCSRFTokenFromResponse = (response) => {
    let cookie = '';
    let CSRFToken = '';
    for (i in response.headers["set-cookie"]) {
        const val = response.headers["set-cookie"][i];
        const cookieItem = val.split(';')[0]
        cookie = cookie + cookieItem + '; ';
        if (val.search('CSRF-TOKEN') !== -1) {
            CSRFToken = cookieItem.slice(11, cookieItem.length);
        }
    }
    cookie = cookie.slice(0, -2);

    return {
        cookie: cookie,
        CSRFToken: CSRFToken,
    };
}

module.exports = {
    GetCookieAndCSRFTokenFromResponse,
}