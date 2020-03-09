const isExpired = token => {
  const currentTime = new Date().getTime() / 1000;

  return token.exp - currentTime
};

export default isExpired;
