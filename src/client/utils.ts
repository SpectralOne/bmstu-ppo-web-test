export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear(),
    month = `${date.getMonth() + 1}`.padStart(2, '0'),
    day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const setToken = (userToken: any) => {
  sessionStorage.setItem('token', userToken);
}

export const  getToken = () => {
  const tokenString = sessionStorage.getItem('token') || "";
  return tokenString
}

