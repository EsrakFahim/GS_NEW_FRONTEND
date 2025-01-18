import React, { useState } from "react";
import useDeleteData from "@/API/useDeleteData.api";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal ";

const Table = ({
  tableHeader = ["Name", "Description", "Type", "Actions"],
  tableData: initialData = [],
  rootPath,
}) => {
  const router = useRouter();
  const [tableData, setTableData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    setLoading(true);
    try {
      await useDeleteData('service', selectedItem._id);
      setTableData((prevData) =>
        prevData.filter((item) => item._id !== selectedItem._id)
      );
      setShowModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = ({ action, id }) => {
    switch (action) {
      case "edit":
        router.push(`/admin/${rootPath}/edit/${id}`);
        break;
      case "delete":
        const itemToDelete = tableData.find((item) => item._id === id);
        handleShowModal(itemToDelete);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>S.No:#</th>
              {tableHeader.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.name || item?.title || item?.fullName}</td>
                <td>{item.description || item?.bio}</td>
                <td>{item.serviceType || item?.projectType || item?.experience}</td>
                <td className="d-flex gap-1 flex-wrap">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAction({ action: "edit", id: item._id })}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction({ action: "delete", id: item._id })}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use the ConfirmationModal Component */}
      <ConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        loading={loading}
        title="Confirm Deletion"
        body={`Are you sure you want to delete ${selectedItem?.name || "this item"
          }?`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </>
  );
};

export default Table;
