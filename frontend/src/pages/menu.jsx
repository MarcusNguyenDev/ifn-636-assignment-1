import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import { toast } from "react-toastify";
import MenuCreateModal from "../components/menu/menu-create-modal.jsx";
import MenuEditModal from "../components/menu/menu-edit-modal.jsx";

function Menu(props) {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const pageSize = 8; // Items per page

  const fetchMenuItems = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/menu", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while fetching menu items");
        }
      });
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Pagination calculation
  const totalPages = Math.ceil(menuItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = menuItems.slice(startIndex, startIndex + pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    document.getElementById("menu_edit_modal").showModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = sessionStorage.getItem("token");
      axios
        .delete(`/menu/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast("Item deleted successfully");
          fetchMenuItems();
        })
        .catch((error) => {
          if (error.response) {
            toast(error.response.data.message);
          } else {
            toast("An error occurred while deleting the menu item");
          }
        });
    }
  };

  return (
    <div>
      <MenuCreateModal onCreate={fetchMenuItems} />
      {editingItem && (
        <MenuEditModal
          itemData={editingItem}
          onUpdate={() => {
            setEditingItem(null);
            fetchMenuItems();
          }}
        />
      )}
      <div className="font-extrabold text-4xl underline pb-6">Menu</div>
      <button
        onClick={() => document.getElementById("menu_create_modal").showModal()}
        className="btn btn-primary"
      >
        Create
      </button>
      <div className="w-full pt-5">
        <table className="table-auto w-full text-center">
          <thead>
            <tr className="border bg-primary text-primary-content border-gray-300">
              <th className="border border-gray-300">Id</th>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Price</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <tr key={item._id} className="border border-gray-300">
                  <td className="border border-gray-300">{item._id}</td>
                  <td className="border border-gray-300">{item.item_name}</td>
                  <td className="border border-gray-300">${item.price}</td>
                  <td className="border border-gray-300 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300">
                  No menu items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="join mt-4">
        <button
          className="join-item btn"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
        </button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Menu;
