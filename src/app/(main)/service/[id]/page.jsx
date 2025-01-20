'use client';
import Accordion from "../../../ui/Accordion";
import Button from "../../../ui/Button";
import Cta from "../../../ui/Cta";
import Div from "../../../ui/Div";
import IconBox from "../../../ui/IconBox";
import PageHeading from "../../../ui/PageHeading";
import SectionHeading from "../../../ui/SectionHeading";
import TestimonialSlider from "../../../ui/Slider/TestimonialSlider";
import Spacing from "../../../ui/Spacing";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "../../../ui/Loader/Loader";
import useFetchSingleData from "../../../../API/FetchSingleData";
import { useEffect } from "react";

const defaultBlurDataURL =
  'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVR42pWSv0oDQRCEv6cC8RFqooYuwih7axdrKqWskfQFX0B7+Bm/g2zljBZNIBm8s3BspUcqNgpGCLzKSmJz0kCYxZvH/+8eYuvYYzzPQgBT4AngDC+FXAJ25ihPoAmD+Mw0L0DHRHnAJHgAFgNeTTnCTYCoEAW8DNEw7HBWh98UqqBx4F4VtceW7Ae3BepGQWBYFZ+H1gCp8UBowXXAWLBvL8jQSCFblsP+S2PYWuYN4GaMRBodQa7wOcY3dm6bplx3jwAlhnsKOBdVYhve2w1NC7RNjjDwEPvwjqaPxtcOkZGkaCC8vssoZ4h9BLXrHt1UimViJjRLNzGpHTD7pbU26tCdUkt8FWN0r+n7OH7XxYc9HK4OxFNjmZYJRuB9DZJ8xWus9aQETaGQnkL/bvL87dF7VW1ve1+MwAAAABJRU5ErkJggg==';



export default function ServiceDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchSingleData('service', id, null);

  const {
    title,
    subtitle,
    description,
    showCaseImages,
    coverImage,
    status,
    views,
    includingServices,
    serverType,
  } = data?.data || {};

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong. Please try again later.</p>;


  return (
    <>
      {/* Page Heading */}
      <PageHeading
        title='Service Details'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='SERVICE-DETAILS'
      />
      <Spacing lg='145' md='80' />

      {/* Design Working Process Section */}
      <Div className="container">
        <SectionHeading
          title={title}
          subtitle={serverType}
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45' />
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_1.svg'
              title='Sketching'
              subtitle='Sketching the initial ideas and plans for design projects.'
            />
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_2.svg'
              title='Wireframing'
              subtitle='Creating wireframes to visualize the design structure.'
            />
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon='/images/icons/service_icon_3.svg'
              title='Prototyping'
              subtitle='Building prototypes to test user interactions and designs.'
            />
            <Spacing lg='30' md='30' />
          </Div>
        </Div>
      </Div>
      <Spacing lg='120' md='50' />

      {/* Services List Section */}
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image src={coverImage} alt="Service" className='cs-radius_15 w-100' placeholder="blur"
                layout="responsive" width={500} height={500}
                blurDataURL={defaultBlurDataURL}
              />
            </Div>
            <Spacing lg='0' md='40' />
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Below our most design related services</h2>
            <Spacing lg='50' md='30' />

            {/* Render Services in Columns */}
            <Div className="row">
              {Array.isArray(includingServices) && includingServices.length > 0 ? (
                [...Array(Math.ceil(includingServices.length / 6))]?.map((_, colIndex) => (
                  <Div className="col-lg-6" key={colIndex}>
                    {includingServices
                      ?.slice(colIndex * 6, (colIndex + 1) * 6)
                      ?.map((service, index) => (
                        <>
                          <Button
                            key={index}
                            btnLink="/service/service-details"
                            btnText={service || 'Web page design'}
                            variant="cs-type2"
                          />
                          <Spacing lg="20" md="10" />
                        </>
                      ))}
                  </Div>
                ))
              ) : (
                <Div className="col-lg-12">
                  <p>No services available at the moment.</p>
                </Div>
              )}
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80' />

      {/* Testimonial Slider */}
      <TestimonialSlider />
      <Spacing lg='145' md='80' />

      {/* FAQ Section */}
      <Div className="container cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-5 col-lg-6">
              <SectionHeading
                title='Some pre questions and answers'
                subtitle='FAQ’s'
              />
              <Spacing lg='90' md='45' />
            </Div>
            <Div className="col-lg-6 offset-xl-1">
              <Accordion />
            </Div>
          </Div>
        </Div>
      </Div>
    </>
  );
}
