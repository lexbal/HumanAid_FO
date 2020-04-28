export const isLoggedIn = () => {
  return localStorage.getItem('user') ? true : false;
};

export const getUserValue = (value) => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[value] : false;
};

export const removeUser = () => {
  localStorage.removeItem('user');

  return true;
};

export const setUserToken = user => {
  localStorage.setItem('user', JSON.stringify({ username: user.username, token: user.token }));

  return true;
};
