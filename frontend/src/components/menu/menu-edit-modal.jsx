import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function MenuEditModal({ itemData, onUpdate }) {
  const [menuItem, setMenuItem] = useState({ name: "", price: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (itemData) {
      // Use itemData.item_name since your API returns that field
      setMenuItem({ name: itemData.item_name, price: itemData.price });
    }
  }, [itemData]);

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

    const token = sessionStorage.getItem("token");

    const updatedMenuItem = {
      item_name: menuItem.name,
      price: menuItem.price,
    };

    // Use itemData._id instead of itemData.id
    axios
      .put(`/menu/${itemData._id}`, updatedMenuItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast("Menu item updated successfully");
        if (onUpdate) {
          onUpdate(updatedMenuItem);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while updating the menu item");
        }
      });

    document.getElementById("menu_edit_modal").close();
    setErrorMessage("");
  };

  const handleClose = () => {
    document.getElementById("menu_edit_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="menu_edit_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Menu Item</h3>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-control">
            <label className="label" htmlFor="editName">
              <span className="label-text">Name</span>
            </label>
            <input
              id="editName"
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
            <label className="label" htmlFor="editPrice">
              <span className="label-text">Price</span>
            </label>
            <input
              id="editPrice"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default MenuEditModal;
