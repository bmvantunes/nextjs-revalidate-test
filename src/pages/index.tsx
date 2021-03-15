import { GetStaticProps } from "next";

export default function Home({ lastRevalidation }) {
  return <div>Last Revalidation UTC: {lastRevalidation}</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  // lets simulate 2 seconds delay - for example DB query
  await new Promise((res) => setTimeout(res, 2000));

  return {
    props: { lastRevalidation: new Date().toISOString() },
    revalidate: 10,
  };
};
