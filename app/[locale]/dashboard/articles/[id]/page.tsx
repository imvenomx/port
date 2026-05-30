import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArticleEditor } from "@/components/dashboard/article-editor"

type Params = { locale: string; id: string }

export default async function EditArticlePage({ params }: { params: Promise<Params> }) {
  const { id } = await params

  if (id === "new") {
    return <ArticleEditor />
  }

  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <ArticleEditor
      initial={{
        id: article.id,
        slug: article.slug,
        status: article.status as "draft" | "published",
        publishedAt: article.publishedAt?.toISOString() ?? null,
        category: article.category ?? "",
        tags: article.tags ?? "",
        coverImage: article.coverImage ?? "",
        metaTitleIt: article.metaTitleIt ?? "",
        metaDescIt: article.metaDescIt ?? "",
        metaTitleEn: article.metaTitleEn ?? "",
        metaDescEn: article.metaDescEn ?? "",
        ogImage: article.ogImage ?? "",
        titleIt: article.titleIt,
        excerptIt: article.excerptIt ?? "",
        bodyIt: article.bodyIt ?? "",
        titleEn: article.titleEn ?? "",
        excerptEn: article.excerptEn ?? "",
        bodyEn: article.bodyEn ?? "",
      }}
    />
  )
}
