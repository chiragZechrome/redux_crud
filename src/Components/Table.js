import axios from "../axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onEdit,
  onEdited,
  onFieldChange,
  onFieldReset,
  onUpdateMainCheckbox,
  onUpdateSelected,
  selectEditUserId,
  selectFieldData,
  userDeleted,
} from "../features/users/userSlice";
import { selectUser } from "../features/users/userSlice";

const Table = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const fieldData = useSelector(selectFieldData);
  const editUserId = useSelector(selectEditUserId);

  const handleRowCheckboxChange = (id) => {
    dispatch(onUpdateSelected(id));
  };

  const handleSelectAllRowsChange = (e) => {
    dispatch(onUpdateMainCheckbox(e.target.checked));
  };

  const handleEdit = (id) => {
    dispatch(onEdit(id));
    axios.get(`users/${id}`).then((response) => {
      for (let field in fieldData) {
        dispatch(
          onFieldChange({
            name: field,
            value: response.data[field],
          })
        );
      }
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/users/${id}`);
    dispatch(userDeleted(id));
    if (editUserId === id) {
      dispatch(onFieldReset());
      dispatch(onEdited());
    }
  };

  return (
    <div>
      {users.length > 0 && (
        <>
          <div className="employees-table">
            <div className="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={users.filter((user) => user.selected === true).length === users.length}
                        onChange={(e) => handleSelectAllRowsChange(e)}
                      />
                    </th>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Hobbies</th>
                    <th>Date of Birth</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.selected}
                          onChange={() => handleRowCheckboxChange(user.id)}
                        />
                      </td>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.gender}</td>
                      <td>{user.hobbies.join(" ,")}</td>
                      <td>{user.dob}</td>
                      <td>{user.country}</td>
                      <td>{user.state}</td>
                      <td>{user.city}</td>
                      <td>
                        <div className="container">
                          <button
                            className="tableButton"
                            onClick={() => handleEdit(user.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="tableButton"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <br />
    </div>
  );
};

export default Table;
