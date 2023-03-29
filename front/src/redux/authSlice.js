import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async function (
    { username, password, navigate, setError },
    { rejectWithValue }
  ) {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/login`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      navigate("/");
      return response.data;
    } catch (error) {
      setError(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async function (
    { firstName, lastName, username, password, email, navigate, setError },
    { rejectWithValue }
  ) {
    try {
      const response = await axios.post(`http://localhost:8081/api/signup`, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
      });
      navigate("/login");
      return response.data;
    } catch (error) {
      setError(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async function (_, { dispatch }) {
    const instance = axios.create({ withCredentials: true });
    await instance
      .post("http://localhost:8081/api/logout", { withCredentials: true })
      .catch((err) => {
      });
    dispatch(signOut());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: "" },
    status: null,
    error: null,
    isAuth: false,
  },
  reducers: {
    signOut(state) {
      state.status = null;
      state.error = null;
      state.user = {};
      state.isAuth = false;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
      state.error = null;
      state.user = {};
      state.isAuth = false;
    },
    [login.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      state.isAuth = false;
    },
    [register.fulfilled]: (state) => {
      state.status = "resolved";
      state.user = {};
      state.isAuth = false;
      state.error = null;
    },
    [register.pending]: (state) => {
      state.status = "loading";
      state.error = null;
      state.user = {};
      state.isAuth = false;
    },
    [register.rejected]: (state, action) => {
      state.status = "rejected";
      state.isAuth = false;
      state.error = action.payload;
      state.user = {};
    },
  },
});

const { signOut } = authSlice.actions;
export const { resetError } = authSlice.actions;
export default authSlice.reducer;
