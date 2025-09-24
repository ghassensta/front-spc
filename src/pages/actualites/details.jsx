import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetNewsDetail } from 'src/actions/actualites'
import BlogDetails from 'src/sections/actualites/blog-details'

export default function Page() {
  const { slug } = useParams()

  const { actualite } = useGetNewsDetail(slug)

  console.log("actualite", actualite, slug)
  return (
    <BlogDetails actualitie={actualite}/>
  )
}