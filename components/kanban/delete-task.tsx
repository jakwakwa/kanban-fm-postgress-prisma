// components/DeleteUserButton.tsx
import { useState } from "react";

const DeleteTaskButton = ({ userId }: { userId: number }) => {
  const [loading, setLoading] = useState(false);

  const deleteTask = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/deleteTask", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        alert("Task deleted successfully");
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={deleteTask} disabled={loading}>
      {loading ? "Deleting..." : "Delete User"}
    </button>
  );
};

export default DeleteTaskButton;
