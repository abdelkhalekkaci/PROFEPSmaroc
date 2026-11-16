/**
 * Firestore Security Rules Specification & Dirty Dozen Payload Verification
 * Validates that all 12 adversarial payloads defined in security_spec.md are rejected.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collection: 'testimonials' | 'article_comments';
  operation: 'create' | 'update' | 'delete' | 'list';
  payload: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_PAYLOADS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Shadow Field Injection (isAdmin: true)',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      name: 'Karim',
      rating: 5,
      comment: 'Excellent outil pour préparer mes séances.',
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 0,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z',
      isAdmin: true
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 2,
    name: 'Out-of-Range Rating (rating: 6)',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      name: 'Karim',
      rating: 6,
      comment: 'Excellent outil pour préparer mes séances.',
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 0,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 3,
    name: 'Oversized Comment DoS (> 800 chars)',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      name: 'Karim',
      rating: 5,
      comment: 'x'.repeat(1200),
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 0,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 4,
    name: 'Raw IP Address Leak Attempt',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      name: 'Karim',
      rating: 5,
      comment: 'Excellent outil pour préparer mes séances.',
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 0,
      ipHash: '192.168.1.100',
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 5,
    name: 'Pre-Moderated Creation (reportsCount: 10)',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      name: 'Karim',
      rating: 5,
      comment: 'Excellent outil pour préparer mes séances.',
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 10,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Path ID Poisoning (invalid characters)',
    collection: 'testimonials',
    operation: 'create',
    payload: {
      __docId: 'invalid/id$with*chars',
      name: 'Karim',
      rating: 5,
      comment: 'Excellent outil pour préparer mes séances.',
      profession: 'Prof EPS',
      city: 'Rabat',
      source: 'homepage',
      status: 'published',
      reportsCount: 0,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 7,
    name: 'Comment Text Tampering on Update',
    collection: 'article_comments',
    operation: 'update',
    payload: {
      comment: 'Contenu modifié frauduleusement après publication.'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 8,
    name: 'Report Count Jump Attack (+50 at once)',
    collection: 'article_comments',
    operation: 'update',
    payload: {
      reportsCount: 50,
      status: 'hidden'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 9,
    name: 'Terminal State Reversal (hidden -> published)',
    collection: 'testimonials',
    operation: 'update',
    payload: {
      status: 'published'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 10,
    name: 'Unfiltered List Query on Hidden Documents',
    collection: 'testimonials',
    operation: 'list',
    payload: {
      whereStatus: 'hidden'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 11,
    name: 'Unauthorized Public Delete',
    collection: 'article_comments',
    operation: 'delete',
    payload: {},
    expectedOutcome: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Invalid Article Slug Path Traversal',
    collection: 'article_comments',
    operation: 'create',
    payload: {
      articleSlug: '../../etc/passwd',
      name: 'Karim',
      comment: 'Tentative de traversée de chemin.',
      profession: '',
      city: '',
      status: 'published',
      reportsCount: 0,
      ipHash: 'a'.repeat(64),
      createdAtIso: '2026-11-16T12:00:00.000Z'
    },
    expectedOutcome: 'PERMISSION_DENIED'
  }
];
