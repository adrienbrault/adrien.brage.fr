/**
 * Photo infrastructure for gallery pages.
 * Photos are stored in Cloudflare R2 and served via custom domain.
 *
 * R2 Bucket Structure:
 * adrienbrault-assets/
 * ├── photos/
 * │   ├── {collection-slug}/
 * │   │   ├── full/      # 2000-2500px, 80% quality JPEG
 * │   │   └── thumb/     # 600px, 70% quality JPEG
 * ├── og/                # Generated OG images
 * └── misc/              # Other assets
 */

export const ASSET_BASE = "https://adrien-assets.brage.fr";

export interface Photo {
  filename: string;
  alt: string;
  caption?: string;
}

export interface PhotoCollection {
  slug: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  cover: string;
  photos: Photo[];
}

/**
 * Get the full-resolution URL for a photo
 */
export function getPhotoUrl(collectionSlug: string, filename: string): string {
  return `${ASSET_BASE}/photos/${collectionSlug}/full/${filename}`;
}

/**
 * Get the thumbnail URL for a photo
 */
export function getThumbUrl(collectionSlug: string, filename: string): string {
  return `${ASSET_BASE}/photos/${collectionSlug}/thumb/${filename}`;
}

/**
 * Get the cover photo URL for a collection (uses thumbnail)
 */
export function getCoverUrl(collection: PhotoCollection): string {
  return getThumbUrl(collection.slug, collection.cover);
}

/**
 * Photo collections - add new collections here.
 * Photos should be synced to R2 before adding to this list.
 */
export const photoCollections: PhotoCollection[] = [
  // Example collection:
  // {
  //   slug: "japan-2024",
  //   title: "Japan 2024",
  //   description: "Cherry blossom season in Tokyo and Kyoto",
  //   date: "2024-04",
  //   location: "Japan",
  //   cover: "shibuya-crossing.jpg",
  //   photos: [
  //     { filename: "shibuya-crossing.jpg", alt: "Shibuya crossing at night" },
  //     { filename: "temple-kyoto.jpg", alt: "Golden temple in Kyoto", caption: "Kinkaku-ji" },
  //   ],
  // },
];

/**
 * Get a collection by slug
 */
export function getCollection(slug: string): PhotoCollection | undefined {
  return photoCollections.find((c) => c.slug === slug);
}

/**
 * Get all collections sorted by date (newest first)
 */
export function getAllCollections(): PhotoCollection[] {
  return [...photoCollections].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
