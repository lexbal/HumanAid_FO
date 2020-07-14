import React from 'react';
import { Redirect } from "react-router-dom";

export const isLoggedIn = () => {
  return localStorage.getItem('user') ? true : false;
};

export const getUserValue = (value) => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))[value] : false;
};

export const removeUser = () => {
  localStorage.removeItem('user');

  return <Redirect to='/'/>;
};

export const setUserToken = user => {
  localStorage.setItem('user', JSON.stringify({ username: user.username, role: JSON.parse(user.roles)[0], token: user.token }));

  return true;
};
