import { GetStaticPaths, GetStaticProps } from 'next';

export default function Todo({ todo, lastRevalidation }) {
  return (
    <div>
      <h2>Last Revalidation UTC: {lastRevalidation}</h2>
      <h5>revalidate: 10</h5>
      <pre>{JSON.stringify(todo, null, 4)}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.id}`
  );
  const todoJSON = await response.json();

  return {
    props: { lastRevalidation: new Date().toISOString(), todo: todoJSON },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    fallback: true,
    // we will at build time create page /todo/1 and /todo/2
    paths: [{ params: {id: '1'} }, { params: {id: '2'} }],
  };
};
