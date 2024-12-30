import { Helmet } from "react-helmet-async";

function MetaData({ title, description, canonical }) {
  return (
    <Helmet>
      <title>{`${title} - GalaxySpark`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}

export default MetaData;
