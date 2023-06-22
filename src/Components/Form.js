import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryStateCityArray } from "../App";
import {
  onFieldReset,
  onFieldChange,
  onEdited,
  onErrorChange,
  selectEditUserId,
  selectErrorData,
  selectFieldData,
  selectUser,
  updateUser,
  addUser,
  deleteUser,
} from "../features/users/userSlice";

const Form = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const editUserId = useSelector(selectEditUserId);
  const errorData = useSelector(selectErrorData);
  const fieldData = useSelector(selectFieldData);

  const handleDeleteSelected = () => {
    if (
      editUserId !== -1 &&
      fieldData.id === editUserId &&
      fieldData.selected === true
    ) {
      dispatch(onFieldReset());
      dispatch(onEdited());
    }
    for (let user of users) {
      if (user.selected) {
        dispatch(deleteUser(user.id));
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedHobbies = [...fieldData.hobbies];
    if (checked) {
      updatedHobbies.push(value);
    } else {
      updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value);
    }
    if (updatedHobbies.length > 0) {
      dispatch(onErrorChange({ name: "hobbiesError", value: "" }));
    } else {
      dispatch(
        onErrorChange({ name: "hobbiesError", value: "this field is required" })
      );
    }
    dispatch(onFieldChange({ name: "hobbies", value: updatedHobbies }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let targetField = name + "Error";

    // set error message====================================
    if (value.length <= 0) {
      dispatch(
        onErrorChange({ name: targetField, value: "this field is required" })
      );
    } else {
      dispatch(onErrorChange({ name: targetField, value: "" }));
    }

    //   set form field=============================================
    if (name === "country") {
      dispatch(onFieldChange({ name: "state", value: "" }));
      dispatch(onFieldChange({ name: "city", value: "" }));
      dispatch(onFieldChange({ name: name, value: value }));
    } else if (name === "sate") {
      dispatch(onFieldChange({ name: "city", value: "" }));
      dispatch(onFieldChange({ name: name, value: value }));
    } else {
      dispatch(onFieldChange({ name: name, value: value }));
    }
  };

  const handleSubmit = (e) => {
    // debugger
    e.preventDefault();
    if (validateSubmit()) {
      if (editUserId !== -1) {
        // Edit existing user
        dispatch(
          updateUser({
            id: editUserId,
            fieldData: fieldData,
          })
        );
      } else {
        let number = 1;
        if(users.length){
          let getId = users.map((x) => x.id);
          number = Math.max(...getId) + 1;
        }
        dispatch(onFieldChange({ name: "id", value: changeId() }));
        dispatch(addUser(fieldData));
      }
      dispatch(onEdited());
      dispatch(onFieldReset());
    }
  };

  const validateSubmit = () => {
    let isValid = true;

    let errorArray = [];
    for (let field in fieldData) {
      if (field !== "id" && field !== "selected") {
        if (fieldData[field].length <= 0) {
          errorArray.push(field + "Error");
        }
      }
    }
    if (errorArray.length) {
      isValid = false;
      for (let errors of errorArray) {
        dispatch(
          onErrorChange({ name: errors, value: "this field is required" })
        );
      }
    }
    return isValid;
  };

  const changeId = () => {
    let number = 1;
    if (!users.length) {
      return number;
    } else if (users.length) {
      let getId = users.map((x) => x.id);
      number = Math.max(...getId) + 1;
      return number;
    }
  };

  const SettingId = () => {
    if (editUserId === -1) {
      dispatch(onFieldChange({ name: "id", value: changeId() }));
    }
  };

  const resetForm = () => {
    if (editUserId !== -1) {
      const fieldId = fieldData.id;
      const selected = fieldData.selected;
      dispatch(onFieldReset());
      dispatch(onFieldChange({ name: "id", value: fieldId }));
      dispatch(onFieldChange({ name: "selected", value: selected }));
    } else {
      dispatch(onFieldReset());
    }

    for (let field in errorData) {
      dispatch(onErrorChange({ name: field, value: "" }));
    }
  };

  return (
    <div>
      <div className="employee-form">
        <form onSubmit={handleSubmit}>
          <div className="label">
            <label className="text-left">First Name:</label>
            <label className="validation-error" id="firstNameError">
              {errorData.firstNameError}
            </label>
          </div>
          <input
            type="text"
            name="firstName"
            value={fieldData.firstName}
            onChange={handleInputChange}
            placeholder="first name"
          />

          <br />
          <label>
            <div className="label">
              Last Name:
              <label className="validation-error" id="lastNameError">
                {errorData.lastNameError}
              </label>
            </div>
            <input
              type="text"
              name="lastName"
              value={fieldData.lastName}
              onChange={handleInputChange}
              placeholder="last name"
            />
          </label>

          <br />
          <label>
            <div className="label">
              Email:
              <label className="validation-error" id="emailError">
                {errorData.emailError}
              </label>
            </div>
            <input
              type="email"
              name="email"
              value={fieldData.email}
              onChange={handleInputChange}
              placeholder="email"
            />
          </label>

          <br />
          <label>
            <div className="label">
              Address:
              <label className="validation-error" id="addressError">
                {errorData.addressError}
              </label>
            </div>
            <input
              type="text"
              name="address"
              value={fieldData.address}
              onChange={handleInputChange}
              placeholder="address"
            />
          </label>

          <br />
          <label>
            <div className="label">
              Gender:
              <label className="validation-error" id="genderError">
                {errorData.genderError}
              </label>
            </div>
            <div id="gender">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={fieldData.gender === "male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={fieldData.gender === "female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={fieldData.gender === "other"}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>
          </label>

          <label>
            <div className="label">
              Hobbies:
              <label className="validation-error" id="hobbiesError">
                {errorData.hobbiesError}
              </label>
            </div>
            <div id="hobby">
              <label>
                <input
                  type="checkbox"
                  name="hobbies"
                  value="reading"
                  checked={fieldData.hobbies.includes("reading")}
                  onChange={handleCheckboxChange}
                />
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hobbies"
                  value="watchingmovies"
                  checked={fieldData.hobbies.includes("watchingmovies")}
                  onChange={handleCheckboxChange}
                />
                Watching Movies
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hobbies"
                  value="listeningmusic"
                  checked={fieldData.hobbies.includes("listeningmusic")}
                  onChange={handleCheckboxChange}
                />
                Listening music
              </label>
            </div>
          </label>

          <label>
            <div className="label">
              Date of Birth:
              <label className="validation-error" id="dobError">
                {errorData.dobError}
              </label>
            </div>
            <input
              type="date"
              name="dob"
              value={fieldData.dob}
              onChange={handleInputChange}
            />
          </label>

          <br />
          <label>
            <div className="label">
              Country:
              <label className="validation-error" id="countryError">
                {errorData.countryError}
              </label>
            </div>
            <select
              id="country"
              name="country"
              value={fieldData.country}
              onChange={handleInputChange}
            >
              <option value="">Select a country</option>
              {countryStateCityArray.map((csca, index) => (
                <option key={index} value={csca.Country}>
                  {csca.Country}
                </option>
              ))}
            </select>
          </label>

          <br />
          {
            <>
              <label>
                <div className="label">
                  State:
                  <label className="validation-error" id="stateError">
                    {errorData.stateError}
                  </label>
                </div>
                <select
                  id="state"
                  name="state"
                  value={fieldData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select a state</option>
                  {fieldData.country &&
                    countryStateCityArray
                      .find((country) => country.Country === fieldData.country)
                      .StateList.map((state, index) => (
                        <option key={index} value={state.State}>
                          {state.State}
                        </option>
                      ))}
                </select>
              </label>
              <br />
            </>
          }

          {
            <>
              <label>
                <div className="label">
                  City:
                  <label className="validation-error" id="cityError">
                    {errorData.cityError}
                  </label>
                </div>
                <select
                  id="city"
                  name="city"
                  value={fieldData.city}
                  onChange={handleInputChange}
                >
                  <option value="">Select a city</option>
                  {fieldData.state &&
                    countryStateCityArray
                      .find((country) => country.Country === fieldData.country)
                      .StateList.find(
                        (state) => state.State === fieldData.state
                      )
                      .CityList.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
              </label>
              <br />
            </>
          }

          <br />
          <button type="submit" className="formButton">
            {editUserId !== -1 ? "Update" : "Submit"}
          </button>
          <button type="button" className="formButton" onClick={resetForm}>
            Reset Form
          </button>
          {users.filter((user) => user.selected === true).length > 0 && (
            <button type="button" className="formButton" onClick={handleDeleteSelected}>
              Delete Selected
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
