import * as React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { UsersSelector } from 'app/selectors';
import { fetchAsyncUsers, getUserAfterLogin, setCheckUser } from 'app/userSlice/userSlice';
import { checkLogin } from 'utils/authLogin/checkLogin';
import { User, userLogin } from 'types/type.auth';
import ModalDialog from 'components/modalDialog/ModalDialog';


export interface NoiNoUser {
  check: boolean;
  text: string;
}
const Login: React.FunctionComponent = () => {
  const initialValue: userLogin = {
    emOrPhone: '',
    password: '',
  };
  const noiNoUser: NoiNoUser = {
    check: false,
    text: '',
  };
  const user: User = {
    id: '',
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
  };
  const [showNoiNouser, setShowNoiNouser] = React.useState<NoiNoUser>(noiNoUser);
  const [checkTokenName, setCheckTokenName] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<userLogin>(initialValue);
  const [successLogin, setSuccessLogin] = React.useState<boolean>(false);
  const [errorEmorPhone, setErrorEmorPhone] = React.useState<string>('');
  const [errorPass, setErrorPass] = React.useState<string>('');
  const [getuser, setGetUser] = React.useState<User>(user);
  const [activeModal, setActiveModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector(UsersSelector);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleCheck = (e: string, value: any) => {
    checkLogin(
      value,
      users,
      e,
      setCheckTokenName,
      setShowNoiNouser,
      showNoiNouser,
      setErrorEmorPhone,
      setErrorPass,
      setSuccessLogin,
      setGetUser
    );
  };
  const hanldleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck('emOrPhone', formValues.emOrPhone);
    } else {
    }
  };
  const hanldleKeyDownPass = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck('passwprd', formValues.password);
    } else {
    }
  };

  React.useEffect(() => {
    dispatch(fetchAsyncUsers());
  }, [dispatch]);
  React.useEffect(() => {
    if (successLogin) {
      dispatch(getUserAfterLogin(getuser));
      dispatch(setCheckUser(true));
      setActiveModal(true);
    }
  }, [successLogin]);

  return (
    <div>
      <ModalDialog
        Active={activeModal}
        WordAuth={'????ng nh???p'}
        CloseBox={(activeModal) => setActiveModal(activeModal)}
      />
      <div className="signup">
        <div className="container">
          <div className="flex-wrap">
            <div className="msform">
              <div className="title-login">????ng nh???p</div>
              <div
                className="form-login pe-user"
                style={
                  showNoiNouser.check || checkTokenName
                    ? {
                        transform: 'scale(0.8)',
                        position: 'absolute',
                        opacity: 0,
                        visibility: 'hidden',
                      }
                    : {
                        transform: 'scale(1)',
                        position: 'absolute',
                        opacity: 1,
                        visibility: 'visible',
                      }
                }
              >
                <h3 className="fs-title">Email ho???c s??? ??i???n tho???i</h3>
                <div id="error-step1" className="error hide">
                  {errorEmorPhone}
                </div>
                <input
                  name="emOrPhone"
                  value={formValues.emOrPhone}
                  className="emailphone"
                  placeholder="Nh???p Email ho???c S??? ??i???n tho???i"
                  onChange={handleChange}
                  onKeyDown={hanldleKeyDown}
                ></input>
                <input
                  type="button"
                  name="next"
                  value="Ti???p t???c"
                  className="next action-button"
                  onClick={() => handleCheck('emOrPhone', formValues.emOrPhone)}
                ></input>
                <div className="other-login">
                  <div className="">Ho???c ????ng nh???p b???ng...</div>
                  <div className="f-p-v login-w-f">
                    <Link to={'#'} className="btn btn-default btn_login ">
                      <span>Facebook</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="form-login notification-nouser"
                style={
                  showNoiNouser.check || checkTokenName
                    ? {
                        maxWidth: '500px',
                        margin: '0px auto',
                        border: '1px solid',
                        textAlign: 'center',
                        visibility: 'visible',
                        paddingTop: '35px',
                        left: 0,
                        opacity: 1,
                        position: 'relative',
                        display: 'block',
                      }
                    : {
                        maxWidth: '500px',
                        margin: '0px auto',
                        border: '1px solid',
                        textAlign: 'center',
                        visibility: 'hidden',
                        paddingTop: '35px',
                        left: '50%',
                        opacity: 0,
                        position: 'relative',
                      }
                }
              >
                <h2 className="fs-title">Ch??o m???ng</h2>
                <h3 className="fs-subtitle emailinput">{showNoiNouser.text}</h3>
                {showNoiNouser.check && (
                  <div className="nouser">
                    <div className="noshopping">
                      <h5>
                        Ch??ng t??i nh???n th???y{' '}
                        <span className="emailorphone">{showNoiNouser.text}</span> ch??a ph???i l??
                        th??nh vi??n c???a Vascara.com. ????? tr??? th??nh th??nh vi??n, b???m n??t "????ng k?? nhanh"
                        b??n d?????i v?? ti???p t???c l??m theo h?????ng d???n ????? ???????c:
                      </h5>
                      <p> - L?? ng?????i ?????u ti??n nh???n th??ng tin khuy???n m??i t??? Vascara</p>
                      <p> - Mua h??ng nhanh, t??ch l??y ??i???m khi mua h??ng online</p>
                      <p> - C??ng nhi???u ??u ????i kh??c</p>
                      <div>
                        <Link to={'/register'} type="button" id="lnk_register" className="button">
                          ????ng k?? nhanh
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {checkTokenName && (
                  <div className="login-password">
                    <div id="error-step1" className="error hide">
                      {errorPass}
                    </div>
                    <input
                      value={formValues.password}
                      name="password"
                      id="pwemail"
                      className="password"
                      type="password"
                      placeholder="Nh???p m???t kh???u"
                      onKeyDown={hanldleKeyDownPass}
                      onChange={handleChange}
                    />
                    <input
                      type="submit"
                      name="submit"
                      value="????ng nh???p"
                      className="submit action-button"
                      onClick={() => handleCheck('password', formValues.password)}
                    />
                    <p>
                      <Link to={'/forgotpass'}>Qu??n m???t kh???u</Link>
                    </p>
                  </div>
                )}
                <input
                  type="button"
                  name="previous"
                  value="Quay l???i"
                  className="btn previous back-button"
                  onClick={() =>
                    showNoiNouser.check
                      ? setShowNoiNouser(() => ({ ...showNoiNouser, check: false }))
                      : checkTokenName
                      ? setCheckTokenName(false)
                      : true
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
