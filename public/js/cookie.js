
function setCookie(res, cookieName, cookieValue, expiryDays) {
  const expiryDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
  res.cookie(cookieName, cookieValue, {
    expires: expiryDate,
    path: '/',
  });
}

// combine the two above together?

function deleteCookie(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(username) {
  let name = username + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';'); // splits into separate cookies
  for(let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    // removes whitespaces
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    // checks cookie name against search string - returns cookie value if match
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}
function checkCookie() {
  let user = document.cookie
  // console.log(user)
  if ( user !== "" ) {
  } else {
    alert("not signed in");
    window.location.replace("http://localhost:3000/login");
  }
  return user
}

module.exports = {setCookie, deleteCookie, getCookie, checkCookie}