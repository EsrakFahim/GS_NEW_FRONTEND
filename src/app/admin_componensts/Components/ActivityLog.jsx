const ActivityLog = () => {
  return (
    <div className="panel">
      <div className="panel-header text-uppercase border-bottom">Activity Log</div>
      <div className="panel-body p-4">
        <ul>
          <li className="primary">
            <span className="point"></span>
            <span className="time">just now</span>
            <p>admin Login Successful</p>
          </li>
          <li className="primary">
            <span className="point"></span>
            <span className="time">5 hours, 1 minute, 10 seconds ago</span>
            <p>admin Login Successful</p>
          </li>
          <li className="primary">
            <span className="point"></span>
            <span className="time">18 hours, 32 minutes, 32 seconds ago</span>
            <p>Admin Login Successful</p>
          </li>
          <li className="primary">
            <span className="point"></span>
            <span className="time">18 hours, 39 minutes, 24 seconds ago</span>
            <p>Admin Login Successful</p>
          </li>
          <li className="primary">
            <span className="point"></span>
            <span className="time">19 hours, 8 minutes, 16 seconds ago</span>
            <p>admin Login Successful</p>
          </li>
        </ul>
      </div>
      <div className="panel-header text-uppercase">version 1.0.0</div>
    </div>
  );
}

export default ActivityLog