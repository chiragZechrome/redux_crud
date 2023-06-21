import { createSlice } from "@reduxjs/toolkit";
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
    userAdded(state, action) {
      state.users.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, user } = action.payload;
      for (let data of state.users) {
        if (data.id === id) {
          for (let key in data) {
            data[key] = user[key];
          }
        }
      }
    },
    userDeleted(state, action) {
      for (let data in state.users) {
        if (state.users[data].id === action.payload) {
          state.users.splice(data, 1);
        }
        break;
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
  },
});

export const selectUser = (state) => state.handler.users;
export const selectEditUserId = (state) => state.handler.editUserId;
export const selectFieldData = (state) => state.handler.fieldData;
export const selectErrorData = (state) => state.handler.errorData;

export const {
  userAdded,
  userUpdated,
  userDeleted,
  onEdit,
  onEdited,
  onFieldChange,
  onFieldReset,
} = usersSlice.actions;

export default usersSlice.reducer;
