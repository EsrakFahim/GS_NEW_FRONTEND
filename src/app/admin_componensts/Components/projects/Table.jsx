

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
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.type || item?.projectType}</td>
              <td className="d-flex gap-1 flex-wrap">
                <button className="btn btn-primary btn-sm">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i>
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
