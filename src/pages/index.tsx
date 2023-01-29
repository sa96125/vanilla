import { trpc } from "../utils/trpc";

export default function Home() {
  const { data, error, isLoading } = trpc.useQuery(["hello"]);

  if (isLoading) {
    return <p>loading..</p>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}
