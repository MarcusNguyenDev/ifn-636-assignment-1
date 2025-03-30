import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function OrderCreateModal({ onCreate }) {
  const [orderData, setOrderData] = useState({
    user: "67e91d7353e5e5e8d5fc1179",
    // Each order item now includes an item_id (selected from the list),
    // item_name, and price.
    menu: [{ item_id: "", item_name: "", price: "" }],
  });
  const [availableMenuItems, setAvailableMenuItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch available menu items on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/menu", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setAvailableMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu items", error);
      });
  }, []);

  // When an order item is changed, update the row with selected menu data
  const handleItemChange = (index, selectedMenuItemId) => {
    const selectedItem = availableMenuItems.find(
      (item) => item._id === selectedMenuItemId,
    );
    if (!selectedItem) return;
    const newMenu = [...orderData.menu];
    newMenu[index] = {
      item_id: selectedItem._id,
      item_name: selectedItem.item_name,
      price: selectedItem.price,
    };
    setOrderData({ ...orderData, menu: newMenu });
  };

  const addOrderItem = () => {
    setOrderData({
      ...orderData,
      menu: [...orderData.menu, { item_id: "", item_name: "", price: "" }],
    });
  };

  const removeOrderItem = (index) => {
    const newMenu = orderData.menu.filter((_, i) => i !== index);
    setOrderData({ ...orderData, menu: newMenu });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderData.user) {
      setErrorMessage("User is required");
      return;
    }
    // Validate each order item row
    for (let i = 0; i < orderData.menu.length; i++) {
      const item = orderData.menu[i];
      if (
        !item.item_name ||
        !item.price ||
        isNaN(item.price) ||
        parseFloat(item.price) <= 0
      ) {
        setErrorMessage("Each order item must have a valid menu selection");
        return;
      }
    }

    // Calculate total price
    const total_price = orderData.menu.reduce(
      (sum, item) => sum + parseFloat(item.price),
      0,
    );

    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/orders",
        {
          user: orderData.user,
          // Only send the required fields for each menu item
          menu: orderData.menu.map(({ item_name, price }) => ({
            item_name,
            price,
          })),
          total_price,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        toast("Order created successfully");
        if (onCreate) onCreate();
        document.getElementById("order_create_modal").close();
        // Reset form
        setOrderData({
          user: "",
          menu: [{ item_id: "", item_name: "", price: "" }],
        });
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while creating the order");
        }
      });
  };

  const handleClose = () => {
    document.getElementById("order_create_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="order_create_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Order</h3>
        <form onSubmit={handleSubmit}>
          {/* User Field */}
          <div className="form-control">
            <label htmlFor="user" className="label">
              <span className="label-text">User ID</span>
            </label>
            <input
              id="user"
              name="user"
              type="text"
              className="input input-bordered"
              placeholder="Enter User ID"
              required
              value={orderData.user}
              onChange={(e) =>
                setOrderData({ ...orderData, user: e.target.value })
              }
            />
          </div>

          {/* Order Items */}
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Order Items</span>
            </label>
            {orderData.menu.map((item, index) => (
              <div key={index} className="flex space-x-2 items-center mb-2">
                <select
                  className="input input-bordered"
                  value={item.item_id}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  required
                >
                  <option value="">Select a menu item</option>
                  {availableMenuItems.map((menuItem) => (
                    <option key={menuItem._id} value={menuItem._id}>
                      {menuItem.item_name} (${menuItem.price})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="input input-bordered w-24"
                  placeholder="Price"
                  value={item.price}
                  readOnly
                />
                {orderData.menu.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeOrderItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary btn-sm mt-2"
              onClick={addOrderItem}
            >
              Add Item
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-error mt-4">
              <span>{errorMessage}</span>
            </div>
          )}

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

export default OrderCreateModal;
