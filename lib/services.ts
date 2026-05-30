import type { Dictionary } from "@/lib/i18n/getDictionary"

export const serviceIds = ["web", "shopify", "wordpress", "ads", "apps", "automation", "store"] as const
export type ServiceId = (typeof serviceIds)[number]

/**
 * Resolve service data from a dictionary. Single source of truth for service
 * names/copy is the i18n dictionaries — this just gives us a typed walker.
 */
export function getService(dict: Dictionary, id: ServiceId) {
  const item = dict.services.items[id]
  return { id, ...item }
}

export function getAllServices(dict: Dictionary) {
  return serviceIds.map((id) => getService(dict, id))
}
