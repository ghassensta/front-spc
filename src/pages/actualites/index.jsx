import { useGetNews } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";

export default function Page() {
  const { actualites, actualitesLoading } = useGetNews()
  return (
    <>
      <BlogPage articles={actualites} loading={actualitesLoading}/>
    </>
  );
}
