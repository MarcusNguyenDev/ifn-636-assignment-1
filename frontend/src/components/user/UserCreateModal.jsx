import React from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function UserCreateModal({ onCreate }) {
  const [user, setUser] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // New user payload (role will default to "USER" in the backend)
    const newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    };

    const token = sessionStorage.getItem("token");
    axios
      .post("/users", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast("User created successfully");
        if (onCreate) onCreate();
        document.getElementById("user_create_modal").close();
        setUser({ first_name: "", last_name: "", email: "", password: "" });
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while creating the user");
        }
      });
  };

  const handleClose = () => {
    document.getElementById("user_create_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="user_create_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New User</h3>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="form-control">
            <label htmlFor="first_name" className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              id="first_name"
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
            <label htmlFor="last_name" className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              id="last_name"
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
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
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

          {/* Password Field */}
          <div className="form-control mt-4">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input input-bordered"
              placeholder="Enter password"
              required
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
            />
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
              Create
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default UserCreateModal;
