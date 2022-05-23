import { NoiNoUser } from 'pages/login/Login';
import React from 'react';
import { User } from 'types/type.auth';

export const checkLogin = (
  value: any,
  Users: User[],
  type: string,
  setCheckTokenEoP: React.Dispatch<React.SetStateAction<boolean>>,
  setShowNoiNouser: React.Dispatch<React.SetStateAction<NoiNoUser>>,
  noiNoUser: NoiNoUser,
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>,
  setSuccessLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setGetUser: React.Dispatch<React.SetStateAction<User>>
) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexNumber = /^-?\d*$/;
  console.log(value);
  if (type === 'emOrPhone') {
    if (!value) {
      setErrorLogin('Vui lòng nhập Email hoặc Số điện thoại');
      return console.log('rỗng');
    }
    if (regexNumber.test(value)) {
      if (value.length === 10) {
        for (let i = 0; i < Users.length; i++) {
          if (Users[i].phoneNumber === value) {
            return setCheckTokenEoP(true);
          }
        }
        setShowNoiNouser({ ...noiNoUser, check: true, text: `${value}` });
      } else {
        setErrorLogin(
          'Vui lòng nhập đúng số điện thoại theo quy định của Bộ Thông Tin & Truyền Thông (10 số)'
        );
      }
    } else {
      if (!regexEmail.test(value)) {
        setErrorLogin('Email không đúng định dạng');
      } else {
        for (let i = 0; i < Users.length; i++) {
          if (Users[i].email === value) {
            console.log('email true');
            return setCheckTokenEoP(true);
          }
        }
        setShowNoiNouser({ ...noiNoUser, check: true, text: `${value}` });
      }
    }
  } else {
    if (!value) {
      setErrorLogin('Vui lòng nhập mật khẩu');
    } else {
      for (let i = 0; i < Users.length; i++) {
        if (Users[i].password === value) {
          setSuccessLogin(true);
          setGetUser({
            id: Users[i].id,
            email: Users[i].email,
            password: Users[i].password,
            phoneNumber: Users[i].phoneNumber,
            username: Users[i].username,
          });
        } else {
          setErrorLogin('Mật khẩu không chính xác');
        }
      }
    }
  }
};
