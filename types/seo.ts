export type JsonLd = string | number | boolean | null | JsonLdRecord | readonly JsonLd[]

type JsonLdRecord = {
  readonly [key: string]: JsonLd
}
