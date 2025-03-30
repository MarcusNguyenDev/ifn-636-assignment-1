import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { toast } from "react-toastify";

function OrderStatusUpdateModal({ orderData, onUpdate }) {
  const [status, setStatus] = useState("PENDING");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (orderData) {
      setStatus(orderData.status.toUpperCase());
    }
  }, [orderData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allowedStatuses = ["PENDING", "COOKING", "FINALISED"];
    if (!allowedStatuses.includes(status)) {
      setErrorMessage("Invalid status selected");
      return;
    }
    const token = sessionStorage.getItem("token");
    axios
      .put(
        `/orders/${orderData._id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        toast("Order status updated successfully");
        if (onUpdate) onUpdate();
        document.getElementById("order_status_modal").close();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while updating order status");
        }
      });
  };

  const handleClose = () => {
    document.getElementById("order_status_modal").close();
    setErrorMessage("");
  };

  return (
    <dialog id="order_status_modal" className="modal justify-center">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Order Status</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="status">
              <span className="label-text">Status</span>
            </label>
            <select
              id="status"
              name="status"
              className="input input-bordered"
              value={status}
              onChange={(e) => setStatus(e.target.value.toUpperCase())}
            >
              <option value="PENDING">PENDING</option>
              <option value="COOKING">COOKING</option>
              <option value="FINALISED">FINALISED</option>
            </select>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default OrderStatusUpdateModal;
