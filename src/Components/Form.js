import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryStateCityArray } from "../App";
import {
  onFieldReset,
  onFieldChange,
  selectEditUserId,
  selectErrorData,
  selectFieldData,
  userAdded,
  userUpdated,
} from "../features/users/userSlice";

const Form = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const editUserId = useSelector(selectEditUserId);
  const errorData = useSelector(selectErrorData);
  const fieldData = useSelector(selectFieldData);

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
    e.preventDefault();
    if (validateSubmit()) {
      // Edit existing user
      axios.put(`/users/${editUserId}`, fieldData).then((response) => {
        dispatch(
          userUpdated({
            id: editUserId,
            user: response.data,
          })
        );
      });
    } else {
      // Add new user
      axios.post("/users", fieldData).then((response) => {
        dispatch(userAdded(response.data));
      });
    }
    dispatch(onFieldReset());
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
        </form>
      </div>
    </div>
  );
};
