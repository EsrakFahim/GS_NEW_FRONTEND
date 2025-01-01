"use client";

import { useRef } from "react";
import Sidebar from "../admin_componensts/layout/Sidebar";
import Header from "../admin_componensts/layout/Header";
import '../scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";



const queryClient = new QueryClient();


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
                        <title>
                              GalaxySpark | Admin Panel
                        </title>
                  </head>

                  {/* Body */}
                  <body>
                        <QueryClientProvider client={queryClient}>
                              <div className="main-container">
                                    <Sidebar ref={sidebarRef} />
                                    <div className="main">
                                          <Header sidebarRef={sidebarRef} />
                                          {children}
                                    </div>
                              </div>
                        </QueryClientProvider>
                  </body>
            </html>
      );
};

export default RootLayout;
