'use client'
import Cta from "../../../ui/Cta"
import Div from "../../../ui/Div"
import PageHeading from "../../../ui/PageHeading"
import Spacing from "../../../ui/Spacing"
import SocialWidget from "../../../ui/Widget/SocialWidget"
import Image from "next/image"
import { useParams } from "next/navigation"
import Loader from "../../../ui/Loader/Loader"
import useFetchSingleData from "../../../../API/FetchSingleData"

const defaultBlurDataURL =
  'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWElEQVR42pWSv0oDQRCEv6cC8RFqooYuwih7axdrKqWskfQFX0B7+Bm/g2zljBZNIBm8s3BspUcqNgpGCLzKSmJz0kCYxZvH/+8eYuvYYzzPQgBT4AngDC+FXAJ25ihPoAmD+Mw0L0DHRHnAJHgAFgNeTTnCTYCoEAW8DNEw7HBWh98UqqBx4F4VtceW7Ae3BepGQWBYFZ+H1gCp8UBowXXAWLBvL8jQSCFblsP+S2PYWuYN4GaMRBodQa7wOcY3dm6bplx3jwAlhnsKOBdVYhve2w1NC7RNjjDwEPvwjqaPxtcOkZGkaCC8vssoZ4h9BLXrHt1UimViJjRLNzGpHTD7pbU26tCdUkt8FWN0r+n7OH7XxYc9HK4OxFNjmZYJRuB9DZJ8xWus9aQETaGQnkL/bvL87dF7VW1ve1+MwAAAABJRU5ErkJggg==';


export default function TeamDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFetchSingleData('team-member', id);

  // Safe destructuring with a fallback to an empty object
  const {
    avatar = '',
    bio = '',
    createdAt = '',
    description = '',
    experience = '',
    fullName = '',
    jobTitle = '',
    socialLinks = {},
  } = data?.data || {}; // Fallback to an empty object if data?.data is undefined
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(description ? description : '');


  if (isLoading) return <Loader />

  return (
    <>
      <PageHeading
        title='Team Details'
        bgSrc='/images/team_hero_bg.jpeg'
        pageLinkText='Team Details'
      />
      <Spacing lg='150' md='80' />
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <Image
                src={avatar}
                alt="Member"
                className="w-100"
                width={570}
                height={570}
                placeholder="blur"
                blurDataURL={defaultBlurDataURL}
              />
            </Div>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <Spacing lg='0' md='45' />
            <Div className="cs-section_heading cs-style1">
              <h2 className="cs-section_title">
                {
                  fullName
                }
              </h2>
              <Div className="cs-height_10 cs-height_lg_10" />
              <h3 className="cs-section_subtitle">
                {
                  jobTitle
                }
              </h3>
              <Div className="cs-height_5 cs-height_lg_5" />
              <Div className="cs-separator cs-accent_bg" />
              <Div className="cs-height_45 cs-height_lg_25" />
              <p className="cs-m0">
                Bio:{""} {bio}
              </p>
              <Div className="cs-height_25 cs-height_lg_20" />
              <p className="cs-m0">
                Description:{""} <>
                  {isHTML ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(description),
                      }}
                    />
                  ) : (
                    <p>{description}</p>
                  )}
                </>
              </p>
              <Div className="cs-height_45 cs-height_lg_30" />
              <SocialWidget
                socialLinks={socialLinks}
              />
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80' />
    </>
  )
}
