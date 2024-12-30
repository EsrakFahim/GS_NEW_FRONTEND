import React, { useEffect, useState } from 'react';
import Section from '../Div';
import Div from '../Div';
import PricingTable from '.';
import Loader from '../Loader/Loader';
import useFetchDataFromDB from '../../../API/FetchData';

export default function PricingTableList() {
  const { data, isLoading, isError } = useFetchDataFromDB('price-plan');
  const [tab, setTab] = useState('monthly');

  if (isLoading) return <Loader />;
  if (isError) return <div>Something went wrong</div>;


  return (
    <Section className="position-relative">
      <ul className="cs-tab_links cs-style1 cs-mp0 cs-primary_font">
        <li
          className={tab === 'monthly' ? "active" : ""}
          onClick={() => setTab('monthly')}
        >
          Monthly
        </li>
        <li
          className={tab === 'yearly' ? "active" : ""}
          onClick={() => setTab('yearly')}
        >
          Yearly
        </li>
      </ul>

      <Section className="row align-items-stretch">
        {data?.data?.map((plan, index) => (
          <Section className="col-lg-4 d-flex" key={index}>
            {plan.published ? (
              <PricingTable
                title={plan.title}
                price={tab === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                currency={plan.currency}
                timeline={tab}
                features={plan.features}
                btnText={plan.btnText}
                btnLink={plan.btnLink || '/contact'}
              />
            ) : (
              <Div className="cs-pricing_table cs-style1 d-flex align-items-center justify-content-center">
                <h2 className="cs-coming_soon">Coming Soon</h2>
              </Div>
            )}
          </Section>
        ))}
      </Section>
    </Section>
  );
}
