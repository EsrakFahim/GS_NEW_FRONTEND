import React from 'react'
import Link from "next/link";
import { Icon } from '@iconify/react';
import Div from '../Div';

// Hero Social Links
const socialLinks = {
  facebook: 'https://www.facebook.com/GalaxySparkBD9',

  linkedin: 'https://www.linkedin.com/in/galaxy-spark-797090312/',

  instagram: 'https://www.instagram.com/galaxysparkbd/ ',

  pinterest: 'https://www.pinterest.com/galaxyspark_/',
};


export default function SocialWidget() {
  const { facebook, instagram, linkedin, pinterest } = socialLinks || {}; // Destructure the links


  return (
    <Div className="cs-social_btns cs-style1">
      <Link href={facebook ? facebook : "#"} target='_blank' className="cs-center">
        <Icon icon="fa6-brands:facebook" />
      </Link>
      <Link href={linkedin ? linkedin : "#"} target='_blank' className="cs-center">
        <Icon icon="fa6-brands:linkedin-in" />
      </Link>
      <Link href={instagram ? instagram : "#"} target='_blank' className="cs-center">
        <Icon icon="fa6-brands:instagram" />
      </Link>
      <Link href={pinterest ? pinterest : "#"} target='_blank' className="cs-center">
        <Icon icon="fa6-brands:pinterest" />
      </Link>
    </Div>
  )
}
