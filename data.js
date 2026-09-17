// Shared data-access helpers, used by both the public page (read-only)
// and the editor page (read + write). Requires firebase-config.js to have
// run first (it defines `db`, `auth`, `WISHLIST_ID`, `REET_EMAIL`).

const WishData = (function () {
  const listRef = db.collection("wishlists").doc(WISHLIST_ID);
  const itemsRef = listRef.collection("items");

  async function getProfile() {
    const snap = await listRef.get();
    if (!snap.exists) return { displayName: "Riri", bio: "", avatar: null };
    return Object.assign({ displayName: "Riri", bio: "", avatar: null }, snap.data());
  }

  async function saveProfile(fields) {
    await listRef.set(fields, { merge: true });
  }

  async function getItems() {
    const snap = await itemsRef.orderBy("createdAt", "desc").get();
    return snap.docs.map((d) => Object.assign({ id: d.id }, d.data()));
  }

  async function addItem(fields) {
    const payload = Object.assign({}, fields, {
      purchased: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const ref = await itemsRef.add(payload);
    return ref.id;
  }

  async function updateItem(id, fields) {
    await itemsRef.doc(id).set(fields, { merge: true });
  }

  async function deleteItem(id) {
    await itemsRef.doc(id).delete();
  }

  // Resizes + re-encodes an image client-side before it's stored, so a
  // single photo doesn't balloon a Firestore document past its 1MB limit.
  function compressImage(file, maxWidth = 900, quality = 0.72) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  return { getProfile, saveProfile, getItems, addItem, updateItem, deleteItem, compressImage };
})();
