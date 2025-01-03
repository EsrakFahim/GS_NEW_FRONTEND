'use client';
import { useEffect, useState } from "react";
import Cta from "../../ui/Cta";
import Div from "../../ui/Div";
import PageHeading from "../../ui/PageHeading";
import Portfolio from "../../ui/Portfolio";
import SectionHeading from "../../ui/SectionHeading";
import Spacing from "../../ui/Spacing";
import { Icon } from "@iconify/react";
import Loader from "../../ui/Loader/Loader";
import useFetchDataWithLimit from "../../../API/useFetchDataWithLimit";
import { useFetchDataFromDB } from "../../../API/FetchData";

export default function PortfolioPage() {
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(10);
  const [projectPage, setProjectPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);

  // Fetch projects with pagination
  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useFetchDataWithLimit('projects', projectPage, itemShow);

  const {
    data: projectTypesData,
    isLoading: projectTypesLoading,
    isError: projectTypesError,
  } = useFetchDataFromDB('projects/types');

  // Fetch projects when projectsData changes
  useEffect(() => {
    if (projectsData?.data) {
      // Append new projects to the existing list
      setProjects(prevProjects => [...prevProjects, ...projectsData.data.projects]);
    }
  }, [projectsData]);

  // Fetch project types
  useEffect(() => {
    if (projectTypesData?.data) {
      setProjectTypes(prevTypes => [...prevTypes, ...projectTypesData.data]);
    }
  }, [projectTypesData]);

  // Loader or Error
  if (projectsLoading || projectTypesLoading) {
    return <Loader />;
  }

  if (projectsError || projectTypesError) {
    return <div>Error loading data...</div>;
  }

  // Load more projects by incrementing page
  const handleLoadMoreProjects = () => {
    setProjectPage(prev => prev + 1);
  };

  return (
    <>
      <PageHeading
        title="Portfolio"
        bgSrc="/images/portfolio_hero_bg.jpeg"
        pageLinkText="Portfolio"
      />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
          <SectionHeading title="Some recent work" subtitle="Our Portfolio" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === 'all' ? 'active' : ''}>
                <span onClick={() => setActive('all')}>All</span>
              </li>
              {projectTypes.map((item, index) => (
                <li className={active === item ? 'active' : ''} key={index}>
                  <span onClick={() => setActive(item)}>{item}</span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
        <Spacing lg="90" md="45" />
        <Div className="row">
          {projects.map((item, index) => (
            <Div
              className={`${index === 3 || index === 6 ? 'col-lg-8' : 'col-lg-4'} ${active === 'all' ? '' : !(active === item?.projectType) ? 'd-none' : ''}`}
              key={index}
            >
              <Portfolio
                title={item?.name}
                href={`/portfolio/${item?._id}`}
                src={item?.files[0]?.url || '/images/portfolio_4.jpeg'}
                variant="cs-style1 cs-type1"
              />
              <Spacing lg="25" md="25" />
            </Div>
          ))}
        </Div>
        <Div className="text-center">
          {projectsData?.data?.length < itemShow ? '' : (
            <>
              <Spacing lg="65" md="40" />
              <span className="cs-text_btn" onClick={handleLoadMoreProjects}>
                <span>Load More Projects</span>
                <Icon icon="bi:arrow-right" />
              </span>
            </>
          )}
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      <Cta
        title="galaxysparkbd@gmail.com"
        bgSrc="/images/cta_bg_2.jpeg"
        variant="rounded-0"
      />
    </>
  );
}
