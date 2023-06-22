import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addUser = createAsyncThunk("handler/addUser", async (data) => {
  try {
    const response = await axios.post("/users", data);
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "handler/updateUser",
  async (data) => {
    const { id, fieldData } = data;
    try {
      const response = await axios.put(`/users/${id}`, fieldData);
      const responseData = await response.data;
      return responseData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "handler/deleteUser",
  async (data) => {
    try {
      await axios.delete(`/users/${data}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUser = createAsyncThunk("handler/getUser", async () => {
  try {
    console.log("try");
    const response = await axios.get("/users");
    const responseData = await response.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
});

const initialField = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  gender: "",
  hobbies: [],
  dob: "",
  country: "",
  state: "",
  city: "",
  selected: false,
};

const initialErrors = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  addressError: "",
  genderError: "",
  hobbiesError: "",
  dobError: "",
  countryError: "",
  stateError: "",
  cityError: "",
};

const initialState = {
  users: [],
  editUserId: -1,
  fieldData: initialField,
  errorData: initialErrors,
};

const usersSlice = createSlice({
  name: "handler",
  initialState,
  reducers: {
    onUpdateSelected(state, action) {
      const id = action.payload;
      for (let data of state.users) {
        if (data.id === id) {
          data.selected = !data.selected;
        }
      }
    },
    onUpdateMainCheckbox(state, action) {
      let checked = false;
      checked = action.payload;
      for (let data of state.users) {
        data.selected = checked;
      }
    },
    onEdit(state, action) {
      state.editUserId = action.payload;
    },
    onEdited(state) {
      state.editUserId = -1;
    },
    onFieldChange(state, action) {
      const { name, value } = action.payload;
      state.fieldData[name] = value;
    },
    onFieldReset(state) {
      for (let field in state.fieldData) {
        state.fieldData[field] = initialField[field];
      }
    },
    onErrorChange(state, action) {
      // debugger
      const { name, value } = action.payload;
      state.errorData[name] = value;
    },
  },
  extraReducers: (builder) => {
    // debugger;
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // const { id, user } = action.payload;
      const user = action.payload;
      for (let data of state.users) {
        if (data.id === user.id) {
          for (let key in user) {
            data[key] = user[key];
          }
        }
      }
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      for (let data in state.users) {
        if (state.users[data].id === action.payload) {
          state.users.splice(data, 1);
          break;
        }
      }
    });
  },
});

export const selectUser = (state) => state.handler.users;
export const selectEditUserId = (state) => state.handler.editUserId;
export const selectFieldData = (state) => state.handler.fieldData;
export const selectErrorData = (state) => state.handler.errorData;

export const {
  onEdit,
  onEdited,
  onFieldChange,
  onFieldReset,
  onErrorChange,
  onUpdateSelected,
  onUpdateMainCheckbox,
} = usersSlice.actions;

export default usersSlice.reducer;
