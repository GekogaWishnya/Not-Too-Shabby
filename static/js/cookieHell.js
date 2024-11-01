function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function resetCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function addCookie(cname, cvalue, exdays) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            c = c.substring(name.length, c.length);
            let values = c.split(":");

            if (!values.includes('' + cvalue))
                setCookie(cname, c + ":" + cvalue, exdays);
            return;
        }
    }

    setCookie(cname, cvalue, exdays);
    return;
}

function removeCookie(cname, cvalue, exdays) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            c = c.substring(name.length, c.length);
            let values = c.split(":");

            if (values.includes('' + cvalue)) {
                const index = values.indexOf('' + cvalue)
                if (index > -1) {
                    values.splice(index, 1);
                }

                if (values.length == 0)
                    resetCookie(cname);
                else
                    setCookie(cname, values.join(":"), exdays);
            }
            return;
        }
    }

    return;
}
