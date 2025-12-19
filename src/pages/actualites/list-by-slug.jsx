import { useParams } from "react-router-dom";
import { useGetActualitezBySlug } from "src/actions/actualites";
import BlogPage from "src/sections/actualites/blog-page";

export default function ActualitesByslug() {
  const { slug } = useParams(); 
  const { actualites, categories, actualitesLoading } = useGetActualitezBySlug(slug);
  return (
    <BlogPage
      articles={actualites}
      categories={categories}
      loading={actualitesLoading}
    />
  );
}
