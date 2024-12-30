'use client'
import Card from "../../ui/Card";
import Cta from "../../ui/Cta";
import Div from "../../ui/Div";
import PageHeading from "../../ui/PageHeading";
import PricingTableList from "../../ui/PricingTable/PricingTableList";
import SectionHeading from "../../ui/SectionHeading";
import TestimonialSlider from "../../ui/Slider/TestimonialSlider";
import Spacing from "../../ui/Spacing";
import Loader from "../../ui/Loader/Loader";
import { useEffect } from "react";
import useFetchDataFromDB from "../../../API/FetchData";

export default function ServicesPage() {
  const { data, isLoading, isError } = useFetchDataFromDB('service');



  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  if (isLoading) return <Loader />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <PageHeading
        title='Services'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='Services'
      />
      <Spacing lg='150' md='80' />
      <Div className='cs-shape_wrap_4'>
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title='Services we can help you with'
                subtitle='What Can We Do'
              />
              <Spacing lg='90' md='45' />
            </Div>
            <Div className='col-xl-8'>
              <Div className='row'>
                {data?.data?.map((service, index) => (
                  <>
                    {/* Insert empty space based on index to match design */}
                    {index !== 2 && <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>}

                    {index === 4 && (
                      <>
                        <Div className='col-lg-3 col-sm-6 cs-hidden_mobile'></Div>
                      </>
                    )}

                    {/* Render the actual service card */}
                    <Div className="col-lg-3 col-sm-6">
                      <Card
                        title={service.title}
                        link={`/service/${service.slug}`}
                        src={service.coverImage}
                        alt={service.title}
                        id={service._id}
                      />
                      <Spacing lg="0" md="30" />
                    </Div>
                  </>
                ))}
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80' />
      <Div className="container">
        <SectionHeading
          title='Providing best <br/>pricing for client'
          subtitle='Pricing & Packaging'
        />
        <Spacing lg='85' md='40' />
        <PricingTableList />
      </Div>
      <Spacing lg='125' md='55' />
      <TestimonialSlider />
    </>
  );
}
