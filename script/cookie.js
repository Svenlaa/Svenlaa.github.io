body = document.getElementsByTagName("body")[0]
let cookieBanner = makeElement("div", null, "cookieBanner")
cookieBanner.appendChild(makeElement("h2", "We use cookies"))
cookieBanner.appendChild(makeElement("p", "I am legally required to inform you that this website uses functional cookies."))
cookieBanner.appendChild(makeElement("p", "These cookies are used in order to save scores, or remembering that you have seen this banner. This way, you get a better experience. We don't store any personal data, nor are cookies transferred to us. Only the browser you are using right now has access to these cookies."))
let para = makeElement("p")
let link = makeElement("a", "Learn more about cookies", null, ["external"])
link.href = "https://www.learn-about-cookies.com/"
link.target = "_blank"
para.appendChild(link)
cookieBanner.appendChild(para)
let button = makeElement("button", "I understand", "cookieAccept")
button.addEventListener("click", () => acceptCookies(['FUN']));
cookieBanner.appendChild(button)
let cookieBannerContainer = makeElement("div", null, "cookieBannerContainer")
cookieBannerContainer.appendChild(cookieBanner)
body.appendChild(cookieBannerContainer)
head = document.getElementsByTagName("head")[0]
let cookieCSS = document.createElement("link")
cookieCSS.rel = "stylesheet"
cookieCSS.type = "text/css"
cookieCSS.href = "/style/cookie.css"
head.appendChild(cookieCSS)

function acceptCookies(levels) {
    if (levels.includes('FUN')) {
        setCookie('FUN', 'FUN', 'Y', 365)
    }
    document.getElementById('cookieBannerContainer').style.display = 'none';
}

if (getCookie('FUN') === 'Y') {
    document.getElementById('cookieBannerContainer').style.display = 'none';
}

function setCookie(level, cookie_name, cookie_value, expiration) {
    //FUN, ANA, ADS
    if (level.toUpperCase() !== "FUN") {
        return
    }
    const d = new Date();
    d.setTime(d.getTime() + (expiration * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`
    document.cookie = `${cookie_name}=${cookie_value};${expires};path=/`
}

function getCookie(cookie_name) {
    let name = cookie_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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