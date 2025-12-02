import { useGetNews } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";

export default function Page() {
  const { actualites, categories, actualitesLoading } = useGetNews();
  return (
    <>
      <BlogPage
        articles={actualites}
        categories={categories}
        loading={actualitesLoading}
      />
    </>
  );
}
