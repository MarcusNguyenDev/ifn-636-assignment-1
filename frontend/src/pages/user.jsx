import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import { toast } from "react-toastify";
import UserCreateModal from "../components/user/UserCreateModal.jsx";
import UserEditModal from "../components/user/UserEditModal.jsx";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const pageSize = 5; // Items per page

  const fetchUsers = () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast(error.response.data.message);
        } else {
          toast("An error occurred while fetching users");
        }
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(users.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    document.getElementById("user_edit_modal").showModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = sessionStorage.getItem("token");
      axios
        .delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast("User deleted successfully");
          fetchUsers();
        })
        .catch((error) => {
          if (error.response) {
            toast(error.response.data.message);
          } else {
            toast("An error occurred while deleting the user");
          }
        });
    }
  };

  return (
    <div>
      {/* Create modal (refresh list via onCreate) */}
      <UserCreateModal onCreate={fetchUsers} />

      {/* Edit modal (rendered only when editingUser is set) */}
      {editingUser && (
        <UserEditModal
          userData={editingUser}
          onUpdate={() => {
            setEditingUser(null);
            fetchUsers();
          }}
        />
      )}

      <div className="font-extrabold text-4xl underline pb-6">Users</div>
      <button
        onClick={() => document.getElementById("user_create_modal").showModal()}
        className="btn btn-primary"
      >
        Create
      </button>

      <div className="w-full pt-5">
        <table className="table-auto w-full text-center">
          <thead>
            <tr className="border bg-primary text-primary-content border-gray-300">
              <th className="border border-gray-300">Id</th>
              <th className="border border-gray-300">First Name</th>
              <th className="border border-gray-300">Last Name</th>
              <th className="border border-gray-300">Email</th>
              <th className="border border-gray-300">Role</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user._id} className="border border-gray-300">
                  <td className="border border-gray-300">{user._id}</td>
                  <td className="border border-gray-300">{user.first_name}</td>
                  <td className="border border-gray-300">{user.last_name}</td>
                  <td className="border border-gray-300">{user.email}</td>
                  <td className="border border-gray-300">{user.role}</td>
                  <td className="border border-gray-300 space-x-2">
                    {user.role !== "ADMIN" ? (
                      <div>
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      "Not available for this user"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination UI */}
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

export default Users;
