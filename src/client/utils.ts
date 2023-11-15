import jwt from "jsonwebtoken";

export const newPlayerStateKey: string = 'newPlayer';
export const newTeamStateKey: string = 'newTeam';

export const getFormattedDate = (date: Date) => {
  if (typeof (date) === "string")
    date = new Date(date);

  const year = date.getFullYear(),
    month = `${date.getMonth() + 1}`.padStart(2, '0'),
    day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const setToken = (userToken: any) => {
  sessionStorage.setItem('token', userToken);
}

export const clearToken = () => {
  sessionStorage.removeItem('token')
}

export const logOut = () => {
  sessionStorage.clear()
  window.location.replace("/")
}

export const api401 = (err: any) => {
  if (err.message === "Request failed with status code 401") {
    logOut()
    return true;
  }
  return false
}

export const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  return tokenString
}

export const getOwner = () => {
  const token = getToken();
  const decoded: any = jwt.decode(token!.split(' ')[1]);
  const parsed: any = JSON.parse(decoded.data);

  return parsed.id;
}

export const dropState = (key: string) => {
  sessionStorage.removeItem(key);
}

export const setState = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export const getState = (key: string): any => {
  const item: string = sessionStorage.getItem(key)!
  if (!item) {
    return null;
  } else {
    return JSON.parse(item);
  }
}
