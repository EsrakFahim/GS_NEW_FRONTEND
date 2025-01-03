import useDeleteData from "@/API/useDeleteData.api";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const Table = ({
  tableHeader = ["Name", "Description", "Type", "Actions"],
  tableData = [],
  rootPath ,
}) => {
  const router = useRouter();

  const handleAction = async ({ action, id }) => {
    switch (action) {
      case "edit":
        router.push(`/admin/${rootPath}/edit/${id}`);
        break;
      case "delete":
        console.log("Delete", id);
        await useDeleteData(`${rootPath}`, id);
        break;
      default:
        break;
    }
  };

  return (
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
  );
};

export default Table;
