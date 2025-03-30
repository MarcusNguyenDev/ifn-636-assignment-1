import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function UserEditModal({ userData, onUpdate }) {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "USER",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setUser({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role || "USER",
      });
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.first_name || !user.last_name || !user.email) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    const token = sessionStorage.getItem("token");

    const updatedUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    axios
      .put(`/users/${userData._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast("User updated successfully");
        if (onUpdate) onUpdate();
        document.getElementById("user_edit_modal").close();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while updating the user");
        }
      });
  };

  const handleClose = () => {
    document.getElementById("user_edit_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="user_edit_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User</h3>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="form-control">
            <label htmlFor="edit_first_name" className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              id="edit_first_name"
              name="first_name"
              type="text"
              className="input input-bordered"
              placeholder="Enter first name"
              required
              value={user.first_name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, first_name: e.target.value }))
              }
            />
          </div>

          {/* Last Name Field */}
          <div className="form-control mt-4">
            <label htmlFor="edit_last_name" className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              id="edit_last_name"
              name="last_name"
              type="text"
              className="input input-bordered"
              placeholder="Enter last name"
              required
              value={user.last_name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, last_name: e.target.value }))
              }
            />
          </div>

          {/* Email Field */}
          <div className="form-control mt-4">
            <label htmlFor="edit_email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="edit_email"
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Enter email"
              required
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* Role Field */}
          <div className="form-control mt-4">
            <label htmlFor="edit_role" className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              id="edit_role"
              name="role"
              className="input input-bordered"
              value={user.role}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="alert alert-error mt-4">
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Modal actions */}
          <div className="modal-action mt-6">
            <button type="button" className="btn" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default UserEditModal;
