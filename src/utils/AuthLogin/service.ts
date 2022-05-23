import * as jwt from 'jsonwebtoken';
export const authLoginToken = () => {
  const obj: Object = {
    id: 323123213,
    userName: 'tran Tuaan',
    password: 'hellor34234',
  };
  var token = jwt.sign(obj, '.tttt');
  console.log('token', token);
};
