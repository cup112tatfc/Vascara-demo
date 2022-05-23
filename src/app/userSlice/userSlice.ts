import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'types/type.auth';
const baseUrl = 'https://fake-server-for-project.herokuapp.com/api/users';

export const fetchAsyncCheckUserEmail = createAsyncThunk(
  'user/fetchAsyncCheckUserEmail',
  async (email: string) => {
    const response = await axios.get<User>(`${baseUrl}?email=${email}`);
    return response.data;
  }
);
export const fetchAsyncCheckUserPhonenumber = createAsyncThunk(
  'user/fetchAsyncCheckUserPhonenumber',
  async (phoneNumber: string) => {
    const response = await axios.get<User>(`${baseUrl}?phoneNumber=${phoneNumber}`);
    return response.data;
  }
);

export const fetchAsyncUsers = createAsyncThunk('user/fetchAsyncUsers', async () => {
  const response = await axios.get<User[]>(`${baseUrl}`);
  console.log(response.data);
  return response.data;
});

export const fetchRegister = createAsyncThunk('user/fetchRegister', async (newUser: User) => {
  const response = await axios
    .post(`${baseUrl}`, newUser)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log(response);
});

const initialState = {
  status: 'idle',
  checkUerEmail: {} as User,
  checkUserPhone: {} as User,
  users: [] as User[],
  user: {} as User,
  checkUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeChecEmail: (state, action) => {
      state.checkUerEmail = {} as User;
    },
    getUserAfterLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction<boolean>) => {
      state.user = {} as User;
      state.checkUser = action.payload;
    },
    setCheckUser: (state, action: PayloadAction<boolean>) => {
      state.checkUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCheckUserEmail.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncCheckUserEmail.fulfilled, (state, action) => {
        state.checkUerEmail = action.payload;
      })
      .addCase(fetchAsyncCheckUserEmail.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(fetchAsyncCheckUserPhonenumber.fulfilled, (state, action) => {
        state.checkUserPhone = action.payload;
      })
      .addCase(fetchAsyncUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});
export const { removeChecEmail, getUserAfterLogin, removeUser, setCheckUser } = userSlice.actions;
export default userSlice;
