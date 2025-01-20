"use client";

import React from 'react';
import Div from '../Div';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import Newsletter from '../Widget/Newsletter';
import SocialWidget from '../Widget/SocialWidget';
import TextWidget from '../Widget/TextWidget';
import { useFetchDataFromDB } from '@/API/FetchData';
import Loader from '../Loader/Loader';

const copyrightLinks = [
  {
    title: 'Terms of Use',
    href: '/',
  },
  {
    title: 'Privacy Policy',
    href: '/',
  },
];

const serviceMenu = [
  {
    title: 'UI/UX design',
    href: '/service/service-details',
  },
  {
    title: 'WP development',
    href: '/service/service-details',
  },
  {
    title: 'Digital marketing',
    href: '/service/service-details',
  },
  {
    title: 'React development',
    href: '/service/service-details',
  },
];

// Hero Social Links
const socialLinks = {
  facebook: 'https://www.facebook.com/GalaxySparkBD9',

  linkedin: 'https://www.linkedin.com/in/galaxy-spark-797090312/',

  instagram: 'https://www.instagram.com/galaxysparkbd/ ',

  pinterest: 'https://www.pinterest.com/galaxyspark_/',
};

const date = new Date().getFullYear();

export default function Footer({ copyrightText, logoSrc, logoAlt, text }) {
  const { data, isLoading, isError } = useFetchDataFromDB('service');

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <p>Error</p>
  }



  return (
    <footer className="cs-fooer">
      <Div className="cs-fooer_main">
        <Div className="container">
          <Div className="row">
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <TextWidget
                  logoSrc="/images/footer_logo.svg"
                  logoAlt="Logo"
                  text="Welcome to GalaxySpark sed ut perspiciae omunde omnis iste natus error sitort voluptatem accusantium."
                />
                <SocialWidget socialLinks={socialLinks} />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <MenuWidget menuItems={data?.data} menuHeading="Services" />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <ContactInfoWidget title="Contact Us" />
              </Div>
            </Div>
            {/* <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <Newsletter
                  title="Subscribe"
                  subtitle="At vero eos et accusamus et iusto odio as part dignissimos ducimus qui blandit."
                  placeholder="example@gmail.com"
                />
              </Div>
            </Div> */}
          </Div>
        </Div>
      </Div>
      <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">
              Copyright © {`${date}`} GalaxySpark.
            </Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <MenuWidget menuItems={copyrightLinks} variant=" cs-style2" />
          </Div>
        </Div>
      </Div>
    </footer>
  );
}
