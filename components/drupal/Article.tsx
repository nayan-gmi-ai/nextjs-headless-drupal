import Image from "next/image"
import { absoluteUrl, formatDate } from "@/lib/utils"
import type { DrupalNode } from "next-drupal"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

interface ArticleProps {
  node: DrupalNode
}

export function Article({ node, ...props }: ArticleProps) {
  return (
    <article {...props}>
      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <div className="mb-4 text-gray-600">
        {node.uid?.display_name ? (
          <span>
            Posted by{" "}
            <span className="font-semibold">{node.uid?.display_name}</span>
          </span>
        ) : null}
        <span> - {formatDate(node.created)}</span>
      </div>
      {node.field_image && (
        <figure>
          <Image
            src={absoluteUrl(node.field_image.uri.url)}
            width={768}
            height={400}
            alt={node.field_image.resourceIdObjMeta.alt || ""}
            priority
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {node.body?.processed && (
        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}
      {node.field_features?.length > 0 && (
        <div className="mt-10 space-y-10">
          <h2>Features</h2>
          {node.field_features.map((feature: any) => {
            const image = feature.field_image?.field_media_image
            console.log(image);
            

            return (
              <div key={feature.id} className="flex gap-6 items-start">

                Image
                {image?.uri?.value && (
                  <Image
                    src={absoluteUrl(image.uri.url)}
                    width={300}
                    height={200}
                    alt={image.resourceIdObjMeta?.alt || ""}
                  />
                )}

                {/* Content */}
                {feature.field_content && (
                  <div className="text-lg">
                    {feature.field_content}
                  </div>
                )}

              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
