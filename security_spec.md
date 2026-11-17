# Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Strict Collection Scope**: Only `/testimonials/{testimonialId}`, `/article_comments/{commentId}`, and `/admins/{adminId}` exist. All other paths are denied by the global catch-all `match /{document=**} { allow read, write: if false; }`.
2. **No Blanket List Reads (Query Enforcer)**: Listing `/testimonials` or `/article_comments` is strictly restricted to documents where `resource.data.status == 'published'`. Hidden or moderated documents (`status == 'hidden'`) cannot be read or listed by public clients.
3. **Strict Key & Volumetric Validation**:
   - Every string field enforces both minimum and maximum `.size()` bounds from `firebase-blueprint.json`.
   - `Testimonial.rating` must be an `int` strictly between `1` and `5`.
   - `ipHash` must be a 64-character lowercase hex SHA-256 string (`^[a-f0-9]{64}$`); raw IP addresses are never stored (Moroccan Law 09-08 compliance).
4. **Immutable Identity & Content Fields on Update**:
   - Once created, `name`, `comment`, `rating`, `articleSlug`, `profession`, `city`, `ipHash`, and `createdAtIso` can NEVER be modified by any update action.
   - Updates are strictly partitioned into two named actions:
     1. `isCommunityReportAction`: Increments `reportsCount` by `+1` and automatically transitions `status` to `'hidden'` when `reportsCount >= 2`.
     2. `isServerAdminHideAction`: Transitions `status` to `'hidden'` when accompanied by the verified `modKeyHash`.
5. **Terminal State Locking**: Once `resource.data.status == 'hidden'`, no public update can ever transition it back to `'published'`.

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1 (Shadow Field Injection)**: `Testimonial` create with extra field `"isAdmin": true` -> `PERMISSION_DENIED` (`hasOnly` check fails).
2. **Payload 2 (Out-of-Range Rating)**: `Testimonial` create with `"rating": 6` or `"rating": 0` -> `PERMISSION_DENIED`.
3. **Payload 3 (Oversized Comment DoS)**: `Testimonial` create with 50,000-char `comment` -> `PERMISSION_DENIED` (`comment.size() <= 800`).
4. **Payload 4 (Raw IP Leak Attempt)**: `Testimonial` create with `"ipHash": "192.168.1.1"` -> `PERMISSION_DENIED` (regex `^[a-f0-9]{64}$` fails).
5. **Payload 5 (Pre-Moderated Creation)**: `Testimonial` create with `"status": "hidden"` or `"reportsCount": 99` -> `PERMISSION_DENIED`.
6. **Payload 6 (Path ID Poisoning)**: Create document with 300-character ID or special characters -> `PERMISSION_DENIED` (`isValidId` fails).
7. **Payload 7 (Comment Content Tampering on Update)**: Update existing `ArticleComment.comment` text -> `PERMISSION_DENIED` (`affectedKeys().hasOnly` blocks content mutation).
8. **Payload 8 (Report Count Jump Attack)**: Update `reportsCount` from `0` directly to `50` -> `PERMISSION_DENIED` (`incoming().reportsCount == existing().reportsCount + 1` fails).
9. **Payload 9 (Terminal State Reversal)**: Attempt to update a `'hidden'` document back to `'published'` -> `PERMISSION_DENIED` (`existing().status == 'published'` terminal lock fails).
10. **Payload 10 (Unfiltered List Scraping of Hidden Items)**: Client queries `/testimonials` without `where('status', '==', 'published')` -> `PERMISSION_DENIED`.
11. **Payload 11 (Unauthorized Delete)**: Public client calls `deleteDoc` on `/testimonials/{id}` -> `PERMISSION_DENIED`.
12. **Payload 12 (Invalid Article Slug Injection)**: `ArticleComment` with `"articleSlug": "../../etc/passwd"` -> `PERMISSION_DENIED` (regex `^[a-zA-Z0-9_\-\.]+$` fails).
