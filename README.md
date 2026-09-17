# WishWell — live, public wishlist with a private editor

Anyone can open the site and see the current wishlist — no login, no
link-sharing needed, it's just always there and always current. Only Reet
can log in (real Firebase Authentication, not a client-side password check)
to add, edit, or remove wishes.

## How it's structured

- `index.html` — **the public page.** This is what you share as your main
  URL. Anyone who opens it sees the live wishlist: pictures, prices, a
  1–5 star "how much I want this" rating, and which items are already
  marked as received. No login, no editing controls.
- `login.html` — Reet's login. Just a password (the account's email is
  fixed in the code, see setup step 3).
- `app.html` — Reet's private editor. Add/edit/delete wishes, mark things
  as received, sort and filter, edit your display name and photo. Requires
  being logged in — opening it directly without a session redirects to
  `login.html`.
- `firebase-config.js` — the one file you edit with your own Firebase
  project's keys (see setup below). Nothing sensitive enough to hide: these
  keys identify your project, they don't grant access on their own — actual
  access is controlled by the Firestore rules in step 5.
- `data.js` — shared read/write helpers (used by both the public page and
  the editor) plus automatic image compression so photos don't blow past
  Firestore's size limits.
- `styles.css`, `wishwell.js` — the shared design system and animations
  (starfield, the wishing-well hero, the coin/ripple moment).

## One-time setup (Firebase, free)

This is the trade-off for a wishlist that's actually live and public: the
data has to live somewhere shared, and Firebase is a free way to do that
without running your own server.

1. **Create a project.** Go to [console.firebase.google.com](https://console.firebase.google.com)
   → Add project → give it any name → you can skip Google Analytics →
   Create.

2. **Turn on Firestore.** In the left sidebar: Build → Firestore Database →
   Create database → Start in **production mode** → pick any location →
   Enable.

3. **Turn on login.** Left sidebar: Build → Authentication → Get started →
   under Sign-in method, enable **Email/Password** → Save. Then go to the
   **Users** tab → Add user → enter an email (it doesn't need to be a real
   inbox — `reet@wishwell.app` is fine) and the password `Reet.jimin` →
   Add user. Copy the **User UID** shown next to the new user — you'll need
   it in step 5.

4. **Get your config and connect the app.** Click the gear icon → Project
   settings → scroll to "Your apps" → click the `</>` (web) icon → give it
   any nickname → Register app. It'll show a `firebaseConfig` object —
   copy those values into `firebase-config.js` in this project, replacing
   the placeholder values. Also update `REET_EMAIL` in that same file if
   you used a different email in step 3.

5. **Lock down who can write.** Back in Firestore → the **Rules** tab →
   replace the contents with this, swapping in the UID from step 3:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /wishlists/{listId} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == "PASTE_REET_UID_HERE";
         match /items/{itemId} {
           allow read: if true;
           allow write: if request.auth != null && request.auth.uid == "PASTE_REET_UID_HERE";
         }
       }
     }
   }
   ```

   Click **Publish**. This is what actually enforces "anyone can see it,
   only Reet can edit" — the app's login screen is just the front door,
   this is the lock.

6. **Deploy.** This is still a static site — no build step, no server,
   no environment variables to set on the host. Drag the folder onto
   [app.netlify.com/drop](https://app.netlify.com/drop), or import it on
   Vercel, or push it to GitHub Pages. Whatever URL you get is the one
   you'd share as your public wishlist.

## Using it

- Go to `login.html` on your deployed site, log in with the password
  `Reet.jimin`, and start adding wishes from `app.html`.
- Share the plain root URL (`index.html`, or just your domain) with anyone
  — that's the live public view.

## Things worth knowing

- **Previous items don't carry over.** Earlier versions of this app stored
  everything in your browser's `localStorage`, which this version doesn't
  use at all — the two can't share data. You'll re-add your wishes once in
  the new editor.
- **Free tier limits** on Firebase's Spark plan: 1GiB storage, 50K reads
  and 20K writes per day. For one person's personal wishlist this is far
  more than you'll ever use.
- **Images are compressed automatically** (resized and re-encoded) before
  they're saved, so normal phone photos stay well under Firestore's 1MB
  per-document limit without you having to think about it.
- If the public page ever shows "Couldn't load the wishlist," it almost
  always means step 5's rules weren't published, or `firebase-config.js`
  still has placeholder values — double-check both.
