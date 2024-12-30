"use client";

import { useRef } from "react";
import Sidebar from "../admin_componensts/layout/Sidebar";
import Header from "../admin_componensts/layout/Header";
import '../scss/style.scss';

const RootLayout = ({ children }) => {
      const sidebarRef = useRef(null);

      return (
            <html>
                  {/* Meta and SEO Tags */}
                  <head>
                        <meta name="author" content="GalaxySpark" />
                        <link
                              rel="icon"
                              href="/images/faviconGS.png"
                              sizes="any"
                              type="image/png"
                        />
                        <link
                              rel="apple-touch-icon"
                              href="/images/faviconGS.png"
                        />
                        <link
                              rel="shortcut icon"
                              href="/images/faviconGS.png"
                              type="image/x-icon"
                        />
                  </head>

                  {/* Body */}
                  <body>
                        <div className="main-container">
                              <Sidebar ref={sidebarRef} />
                              <div className="main">
                                    <Header sidebarRef={sidebarRef} />
                                    {children}
                              </div>
                        </div>
                  </body>
            </html>
      );
};

export default RootLayout;
