'use client'
import Button from "../../../ui/Button";
import Cta from "../../../ui/Cta";
import Div from "../../../ui/Div";
import PageHeading from "../../../ui/PageHeading";
import SectionHeading from "../../../ui/SectionHeading";
import Spacing from "../../../ui/Spacing";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loader from "../../../ui/Loader/Loader";
import Link from "next/link";
import useFetchSingleData from "../../../../API/FetchSingleData";

const defaultBlurDataURL =
  'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVR42pWSv0oDQRCEv6cC8RFqooYuwih7axdrKqWskfQFX0B7+Bm/g2zljBZNIBm8s3BspUcqNgpGCLzKSmJz0kCYxZvH/+8eYuvYYzzPQgBT4AngDC+FXAJ25ihPoAmD+Mw0L0DHRHnAJHgAFgNeTTnCTYCoEAW8DNEw7HBWh98UqqBx4F4VtceW7Ae3BepGQWBYFZ+H1gCp8UBowXXAWLBvL8jQSCFblsP+S2PYWuYN4GaMRBodQa7wOcY3dm6bplx3jwAlhnsKOBdVYhve2w1NC7RNjjDwEPvwjqaPxtcOkZGkaCC8vssoZ4h9BLXrHt1UimViJjRLNzGpHTD7pbU26tCdUkt8FWN0r+n7OH7XxYc9HK4OxFNjmZYJRuB9DZJ8xWus9aQETaGQnkL/bvL87dF7VW1ve1+MwAAAABJRU5ErkJggg==';



export default function PortfolioDetailsPage() {
  const { id } = useParams()
  const { data, isLoading, isError } = useFetchSingleData('projects', id)


  console.log('single data:', data)


  if (isLoading) return <Loader />
  if (isError) return <p>Error: {isError.message}</p>

  const {
    budget,
    client,
    description,
    endDate,
    files,
    isActive,
    livePreview,
    name,
    notes,
    projectManager,
    projectType,
    sourceFile,
    spent,
    startDate,
    status,
    team,
    tech,
    _id,
  } = data?.data || {};
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(description);


  return (
    <>
      <PageHeading
        title='Portfolio Details'
        bgSrc='/images/service_hero_bg.jpeg'
        pageLinkText='PORTFOLIO-DETAILS'
      />
      <Spacing lg='150' md='80' />
      <Div className="container">
        <Image src={files[0]?.url} alt={files[0]?.name} width={500} height={400} placeholder="blur" blurDataURL={defaultBlurDataURL} className="cs-radius_15 w-100" />
        <Spacing lg='90' md='40' />
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title={name}
              subtitle={projectType}
            >
              <Spacing lg='40' md='20' />
          <div>
            {isHTML ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
          <Spacing lg='10' md='10' />
        </SectionHeading>
      </Div>
      <Div className="col-lg-5 offset-lg-1">
        <Spacing lg='60' md='40' />
        <h2 className='cs-font_30 cs-font_26_sm cs-m0'>Project Info -</h2>
        <Spacing lg='50' md='30' />
        <Div className="row">
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Category:</h3>
            <p className='cs-m0'>
              {projectType}
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>
              Budget:
            </h3>
            <p className='cs-m0'>
              {
                budget ? budget : 'N/A'
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Software:</h3>
            <p className='cs-m0'>
              {
                tech.join(', ')
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Dated:</h3>
            <p className='cs-m0'>
              {
                startDate ? new Date(startDate).toDateString() : '-'
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Client:</h3>
            <p className='cs-m0'>
              {
                client
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>
              Team Member:
            </h3>
            <p className='cs-m0'>
              {
                team.map((item, index) => (
                  <Link href='#' key={index}>
                    {item}
                    {index < team.length - 1 ? ', ' : ''}
                  </Link>
                ))
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
          <Div className="col-6">
            <h3 className='cs-accent_color cs-font_22 cs-font_18_sm cs-m0'>Status:</h3>
            <p className='cs-m0'>
              {
                status
              }
            </p>
            <Spacing lg='30' md='30' />
          </Div>
        </Div>
      </Div>
    </Div >
      <Spacing lg='65' md='10' />
  {/* <Div className="cs-page_navigation cs-center">
          <Div>
            <Button btnLink='/portfolio/portfolio-details' btnText='Prev Project' variant='cs-type1' />
          </Div>
          <Div>
            <Button btnLink='/portfolio/portfolio-details' btnText='Next Project' />
          </Div>
        </Div> */}
    </Div >
      <Spacing lg='145' md='80' />
      <Cta
        title='galaxysparkbd@gmail.com'
        bgSrc='/images/cta_bg_2.jpeg'
        variant='rounded-0'
      />
    </>
  )
}
