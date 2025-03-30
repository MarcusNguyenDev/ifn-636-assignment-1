import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import { toast } from "react-toastify";
import OrderCreateModal from "../components/order/OrderCreateModal.jsx";
import OrderStatusUpdateModal from "../components/order/OrderStatusUpdateModal.jsx";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrder, setEditingOrder] = useState(null);
  const pageSize = 5;

  const fetchOrders = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while fetching orders");
        }
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Sort orders: orders with status "COOKING" come first.
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.status === "COOKING" && b.status !== "COOKING") return -1;
    if (a.status !== "COOKING" && b.status === "COOKING") return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleUpdateStatus = (order) => {
    setEditingOrder(order);
    document.getElementById("order_status_modal").showModal();
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const token = sessionStorage.getItem("token");
      axios
        .delete(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast("Order deleted successfully");
          fetchOrders();
        })
        .catch((error) => {
          if (error.response) {
            toast(error.response.data.message);
          } else {
            toast("An error occurred while deleting the order");
          }
        });
    }
  };

  return (
    <div>
      {/* Create Order Modal */}
      <OrderCreateModal onCreate={fetchOrders} />

      {/* Update Order Status Modal */}
      {editingOrder && (
        <OrderStatusUpdateModal
          orderData={editingOrder}
          onUpdate={() => {
            setEditingOrder(null);
            fetchOrders();
          }}
        />
      )}

      <div className="font-extrabold text-4xl underline pb-6">Orders</div>
      <button
        onClick={() =>
          document.getElementById("order_create_modal").showModal()
        }
        className="btn btn-primary mb-4"
      >
        Create Order
      </button>

      {/* Horizontally scrollable container for order cards */}
      <div className="overflow-x-auto">
        <div className="flex flex-row space-x-4">
          {paginatedOrders.map((order) => (
            <div
              key={order._id}
              className="card card-bordered p-4 min-w-[300px]"
            >
              <div className="mb-2">
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className="mb-2">
                <strong>User:</strong>{" "}
                {order.user
                  ? `${order.user.first_name} ${order.user.last_name} (${order.user.email})`
                  : "Unknown"}
              </div>
              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="list-disc pl-5">
                  {order.menu.map((item, idx) => (
                    <li key={idx}>
                      {item.item_name} (${item.price})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Total Price:</strong> ${order.total_price}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {order.status}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateStatus(order)}
                  className="btn btn-sm"
                >
                  Update Status
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {paginatedOrders.length === 0 && (
            <div className="text-center">No orders available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
