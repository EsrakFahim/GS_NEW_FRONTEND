import Link from "next/link";
import React from "react";

const PanelCard = ({ amount, label, colorClass, iconName, link, linkText }) => (
  <div className="col-md-6 col-xl-3">
    <div className="panel bg-white">
      <div className="panel-body p-4">
        <div className="d-flex justify-content-between">
          <div>
            <h4 className={`fw-bold fs-x`}>{amount}</h4>
            <h5 className="text-light fs-md fw-light">{label}</h5>
          </div>
          <div>
            <ion-icon name={iconName}></ion-icon>
          </div>
        </div>
      </div>
      <div className={`panel-footer ${colorClass}`}>
        <Link href={link} className="text-white float-end fs-sm">
          {linkText}
        </Link>
        <div className="clearfix"></div>
      </div>
    </div>
  </div>
);

export default PanelCard;