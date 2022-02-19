function acceptCookies(levels){
    if(levels.includes('FUN')) {setCookie('FUN', 'FUN', 'Y', 365)}
    document.getElementById('cookieBannerContainer').style.display = 'none';
}

if (getCookie('FUN')==='Y') {
    document.getElementById('cookieBannerContainer').style.display = 'none';
}

function setCookie(level, cookie_name, cookie_value, expiration) {
    //FUN, ANA, ADS
    if(level.toUpperCase()!=="FUN") {return}
    const d = new Date();
    d.setTime(d.getTime() + (expiration*24*60*60*1000));
    let expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookie_name}=${cookie_value};${expires};path=/";`
}

function getCookie(cookie_name) {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
