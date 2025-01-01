import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";



const Table = ({
  tableHeader = ["Name", "Description", "Type", "Actions"],
  tableData = [],
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            {tableHeader.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index}>
              <td>{item.name || item?.title || item?.fullName}</td>
              <td>{item.description || item?.bio}</td>
              <td>{item.serviceType || item?.projectType || item?.experience}</td>
              <td className="d-flex gap-1 flex-wrap">
                <button className="btn btn-primary btn-sm">
                  <AiFillEdit />
                </button>
                <button className="btn btn-danger btn-sm">
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
