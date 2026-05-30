import "server-only"
import type { Locale } from "./config"
import itDict from "./dictionaries/it.json"
import enDict from "./dictionaries/en.json"

// Static imports keep bundling simple. Adding a new locale: import + add to map.
const dictionaries = {
  it: itDict,
  en: enDict,
} as const

export type Dictionary = typeof itDict

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.it
}
