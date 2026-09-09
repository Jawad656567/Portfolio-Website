const getAuthCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
};

module.exports = getAuthCookieOptions;
