'use client'
import Image from "next/image";
import Cta from "../../ui/Cta";
import Div from "../../ui/Div";
import FunFact from "../../ui/FunFact";
import PageHeading from "../../ui/PageHeading";
import SectionHeading from "../../ui/SectionHeading";
import TeamSlider from "../../ui/Slider/TeamSlider";
import Spacing from "../../ui/Spacing";
import aboutImg from '/public/images/about_img_1.jpeg'
import aboutImg2 from '/public/images/about_img_2.jpeg'
import aboutImg3 from '/public/images/about_img_3.jpeg'
import aboutImg4 from '/public/images/about_img_4.jpeg'
import Loader from "../../ui/Loader/Loader";
import { useFetchDataFromDB } from "../../../API/FetchData";

const defaultBlurDataURL =
  'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVR42pWSv0oDQRCEv6cC8RFqooYuwih7axdrKqWskfQFX0B7+Bm/g2zljBZNIBm8s3BspUcqNgpGCLzKSmJz0kCYxZvH/+8eYuvYYzzPQgBT4AngDC+FXAJ25ihPoAmD+Mw0L0DHRHnAJHgAFgNeTTnCTYCoEAW8DNEw7HBWh98UqqBx4F4VtceW7Ae3BepGQWBYFZ+H1gCp8UBowXXAWLBvL8jQSCFblsP+S2PYWuYN4GaMRBodQa7wOcY3dm6bplx3jwAlhnsKOBdVYhve2w1NC7RNjjDwEPvwjqaPxtcOkZGkaCC8vssoZ4h9BLXrHt1UimViJjRLNzGpHTD7pbU26tCdUkt8FWN0r+n7OH7XxYc9HK4OxFNjmZYJRuB9DZJ8xWus9aQETaGQnkL/bvL87dF7VW1ve1+MwAAAABJRU5ErkJggg==';



const funfaceData = [
  {
    title: 'Global Happy Clients',
    factNumber: '40K',
  },
  {
    title: 'Project Completed',
    factNumber: '50K',
  },
  {
    title: 'Team Members',
    factNumber: '245',
  },
  {
    title: 'Digital products',
    factNumber: '550',
  },
];

export default function AboutPage() {
  const { data, isLoading, isError } = useFetchDataFromDB('about-page')

  if (isLoading) return <Loader />
  if (isError) return <div>Error</div>

  console.log(data)

  const {
    title,
    description,
    whyWeTitle,
    whyWeDescription,
    images,
    whyWeImage,
    benefits,
  } = data?.data[0] || {}

  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="About Us"
        bgSrc="/images/about_hero_bg.jpeg"
        pageLinkText="About Us"
      />
      {/* End Page Heading Section */}

      {/* Start About Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <SectionHeading
              title={title}
              subtitle="About Our Agency"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                {
                  description
                }
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="40" />
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-xl-2">
            <Image
              width={500}
              height={500}
              layout="responsive"
              placeholder="blur"
              blurDataURL={defaultBlurDataURL}
              src={images[0]?.imageUrl || aboutImg}
              alt={images[0]?.alt || 'About'}
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-7">
            <Image
              width={500}
              height={500}
              layout="responsive"
              placeholder="blur"
              blurDataURL={defaultBlurDataURL}
              src={images[1]?.imageUrl || aboutImg2}
              alt={images[1]?.alt || 'About'}
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-5">
            <Image
              width={500}
              height={500}
              style={{
                // aspectRatio: '',
                objectFit: 'fill',
              }}
              layout="responsive"
              placeholder="blur"
              blurDataURL={defaultBlurDataURL}
              src={images[2]?.imageUrl || aboutImg}
              alt={images[2]?.alt || 'About'}
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />
      {/* End About Section */}

      {/* Start Fun Fact Section */}
      <Div className="container">
        <FunFact
          title="Our fun fact"
          subtitle="Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
          data={funfaceData}
        />
      </Div>
      {/* End Fun Fact Section */}

      {/* Start Why Choose Section */}
      <Spacing lg="100" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <Image
                  src={whyWeImage?.secure_url || aboutImg4}
                  alt="About"
                  width={500}
                  height={500}
                  style={{
                    objectFit: "cover",
                  }}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={defaultBlurDataURL}
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <SectionHeading
              title={whyWeTitle}
              subtitle="Why Choose Us"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                {
                  whyWeDescription
                }
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="0" />
            </SectionHeading>
          </Div>
        </Div>
      </Div>
      {/* End Why Choose Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Awesome team <br/>members"
          subtitle="Our Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      {/* End Team Section */}

      {/* Start CTA Section */}
      {/* <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div> */}
      {/* End CTA Section */}
    </>
  );
}
