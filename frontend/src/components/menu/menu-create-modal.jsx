import React from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function MenuCreateModal(props) {
  const [menuItem, setMenuItem] = React.useState({
    name: "",
    price: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!menuItem.name || !menuItem.price) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (isNaN(menuItem.price) || menuItem.price <= 0) {
      setErrorMessage("Please enter a valid price");
      return;
    }

    // Create a new menu item payload
    const newMenuItem = {
      item_name: menuItem.name,
      price: menuItem.price,
    };

    const token = sessionStorage.getItem("token");
    axios
      .post("/menu", newMenuItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast("Create new item success");
        // Call the refresh function from parent to update the list
        if (props.onCreate) {
          props.onCreate();
        }
        // Close the modal and clear the form
        document.getElementById("menu_create_modal").close();
        setMenuItem({ name: "", price: "" });
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while creating the menu item");
        }
      });
  };

  // Close the dialog
  const handleClose = () => {
    document.getElementById("menu_create_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="menu_create_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create new Menu item</h3>
        <div className="modal-action">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input input-bordered"
                placeholder="Enter menu name"
                required
                value={menuItem.name}
                onChange={(e) =>
                  setMenuItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Price Field */}
            <div className="form-control mt-4">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                className="input input-bordered"
                placeholder="Enter menu price"
                required
                value={menuItem.price}
                onChange={(e) =>
                  setMenuItem((prev) => ({ ...prev, price: e.target.value }))
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
      </div>
    </dialog>
  );
}

export default MenuCreateModal;
