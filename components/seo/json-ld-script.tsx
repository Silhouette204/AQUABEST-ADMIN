import type { JsonLd } from '@/types/seo'

type JsonLdScriptProps = {
  data: JsonLd
}

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
