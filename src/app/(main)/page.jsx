'use client';
import Cta from '../ui/Cta';
import Div from '../ui/Div';
import FunFact from '../ui/FunFact';
import Hero from '../ui/Hero';
import LogoList from '../ui/LogoList';
import MovingText from '../ui/MovingText';
import SectionHeading from '../ui/SectionHeading';
import PortfolioSlider from '../ui/Slider/PortfolioSlider';
import PostSlider from '../ui/Slider/PostSlider';
import TeamSlider from '../ui/Slider/TeamSlider';
import TestimonialSlider from '../ui/Slider/TestimonialSlider';
import TimelineSlider from '../ui/Slider/TimelineSlider';
import Spacing from '../ui/Spacing';
import VideoModal from '../ui/VideoModal';
import Card from '../ui/Card';
import useFetchDataFromDB from '../../API/FetchData';
import Loader from '../ui/Loader/Loader';

// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Facebook',
    links: 'https://www.facebook.com/GalaxySparkBD9',
  },
  {
    name: 'Linkedin',
    links: 'https://www.linkedin.com/in/galaxy-spark-797090312/',
  },
  {
    name: 'Instagram',
    links: 'https://www.instagram.com/galaxysparkbd/ '
  },
  {
    name: 'Pinterest',
    links: 'https://www.pinterest.com/galaxyspark_/'
  }
];
// FunFact Data
const funfaceData = [
  {
    title: 'Global Happy Clients',
    factNumber: '40',
  },
  {
    title: 'Project Completed',
    factNumber: '50',
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
// Portfolio Data
const portfolioData = [
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_1.jpeg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_2.jpeg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_0.jpg',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/portfolio_3.jpeg',
  },
];

export default function Home() {

  const { data, isLoading, isError } = useFetchDataFromDB('home-page');
  const { data: serviceData, isLoading: isServiceLoading, isError: isServiceError } = useFetchDataFromDB('service');
  const { data: portfolioData, isLoading: isPortfolioLoading, isError: isPortfolioError } = useFetchDataFromDB('projects');


  // Use optional chaining and a fallback value to avoid destructuring undefined
  const {
    bannerImage = "/images/hero_bg.jpg",
    callToAction = {},
    isActive,
    title = "",
    subTitle = '',
    video = '',
    videoText = ''
  } = data?.data?.[0] || {};

  if (isLoading || isServiceLoading || isPortfolioLoading) return <Loader />
  if (isError || isServiceError || isPortfolioError) return <div>Something went wrong</div>;

  return (
    <>
      {/* Start Hero Section */}
      <Hero
        title={title}
        subtitle={subTitle}
        btnText={callToAction?.text}
        btnLink="/contact"
        scrollDownId="#service"
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl={bannerImage}
        phoneNumber="+880 1958-392794"
        email="galaxysparkbd@gmail.com"
      />
      {/* End Hero Section */}

      {/* Start FunFact Section */}
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our fun fact"
          subtitle="Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}

      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Services we can help you with"
                subtitle="What Can We Do"
                btnText="See All Services"
                btnLink="/service"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className='row'>
                {serviceData?.data?.slice(0,5)?.map((service, index) => (
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
      {/* End Service Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="50" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Portfolio to explore"
            subtitle="Latest Projects"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData?.data?.projects} />
      </Div>
      {/* End Portfolio Section */}

      {/* Start Awards Section */}
      {/* <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="We get multiple awards"
                subtitle="Our Awards"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider />
            </Div>
          </Div>
        </Div>
      </Div> */}
      {/* End Awards Section */}

      {/* Start Video Block Section */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          {
            videoText
          }
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc={video}
          bgUrl="/images/video_bg.jpeg"
        />
      </Div>
      {/* End Video Block Section */}

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
      <Spacing lg="150" md="80" />
      {/* End Team Section */}

      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

      {/* Start Blog Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Explore recent publication"
                subtitle="Our Blog"
                btnText="View More Blog"
                btnLink="/blog"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Our reputed world wide partners" />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      {/* <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" /> */}
      {/* End LogoList Section */}

      {/* Start CTA Section */}
      {/* <Div className="container">
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
