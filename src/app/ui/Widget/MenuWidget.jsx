import React from 'react'
import Link from "next/link";

export default function MenuWidget({ menuItems, menuHeading, variant }) {
  const firstFourItems = menuItems?.slice(0, 4);

  return (
    <>
      {menuHeading && <h2 className="cs-widget_title">{menuHeading}</h2>}
      <ul className={`${variant ? `cs-menu_widget ${variant}` : 'cs-menu_widget cs-style1'} cs-mp0`}>
        {firstFourItems?.map((item, index) => (
          <li key={index}>
            <Link href={`/service/${item?._id}`}>{item?.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
