import Table from "../Components/projects/Table";

export const TableContainer = ({
  title = "Show All in table",
  tableHeader,
  tableData,
  rootPath
}) => {
  return (
    <>
      <div className="p-3">
        <div className="panel">
          <div className="panel-header border-bottom mb-3">
            {
              title && (
                <h3 className="panel-title">{title}</h3>
              )
            }
          </div>

          <div className="panel-body p-3 pb-0">
            <Table
              tableHeader={tableHeader}
              tableData={tableData}
              rootPath={rootPath}
            />
          </div>
        </div>
      </div>
    </>
  );
};
