function setCookie(res, cookieName, cookieValue, expiryDays) {
  const expiryDate = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
  res.cookie(cookieName, cookieValue, {
    expires: expiryDate,
    httpOnly: true,
    path: '/',
  });
}



function deleteCookie(res, cookieName) {
  res.clearCookie(cookieName, { path: '/' });
}

function getCookie(req, cookieName) {
  return req.cookies[cookieName] || null;
}

function checkCookie(req, res, cookieName) {
  const user = getCookie(req, cookieName);
  if (user !== null) {
    // User is signed in
  } else {
    res.status(401).json({ error: "Not signed in" });
  }

  return user
}

// reverting changes

