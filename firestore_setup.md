# Firebase Setup Guide

This document outlines the structure and configuration for your Firebase project.

## 1. Authentication Setup (Admin Account)
Before you can log in to the admin dashboard, you must enable authentication and create your account:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. In the left menu, click **Authentication**.
4. Click **Get Started** if this is your first time.
5. In the **Sign-in method** tab, click **Add new provider** and select **Email/Password**.
6. Enable it and click **Save**.
7. Go to the **Users** tab (next to Sign-in method).
8. Click **Add user**.
9. Enter the email and password you want to use for your portfolio admin.
10. Click **Add user**. You can now use these credentials on `/admin/login`.

## 2. Firestore Database Creation
1. In the left menu, click **Firestore Database**.
2. Click **Create database**.
5. Select a location near your users (e.g., `eur3 (europe-west)` for Europe).
6. Start in **Test Mode** for now (we will apply rules below).

## 2. Collections Structure

Create the following collections and documents as needed. Firestore is schemaless, but we will follow these types for consistency.

### `projects`
Documents in this collection represent your portfolio items.
- **Fields**:
  - `title_fr`: string
  - `title_en`: string
  - `description_fr`: string
  - `description_en`: string
  - `image_url`: string (Cloudinary URL)
  - `image_public_id`: string (Cloudinary Public ID)
  - `tech_stack`: array of strings
  - `repo_url`: string (optional)
  - `live_url`: string (optional)
  - `order`: number
  - `created_at`: timestamp

### `experiences`
- **Fields**:
  - `title_fr`: string
  - `title_en`: string
  - `company`: string
  - `start_date`: string
  - `end_date`: string (optional)
  - `description_fr`: string
  - `description_en`: string
  - `type`: string (`job`, `education`, or `event`)
  - `order`: number
  - `created_at`: timestamp

### `certifications`
- **Fields**:
  - `title_fr`: string
  - `title_en`: string
  - `issuer`: string
  - `date`: string
  - `image_url`: string
  - `order`: number
  - `created_at`: timestamp

### `profile`
Create a document with ID `main` (or any unique ID).
- **Fields**:
  - `name`: string
  - `bio_fr`: string
  - `bio_en`: string
  - `profile_image_url`: string
  - `social_links`: map
    - `github`: string
    - `linkedin`: string
    - `twitter`: string
    - `email`: string

## 3. Security Rules

Copy and paste these rules into the **Rules** tab of your Firestore Database to protect your data. These rules allow anyone to read, but only authenticated users (you) can write.

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read the data
    match /{document=**} {
      allow read: if true;
    }
    
    // Only authenticated users can write (Create, Update, Delete)
    // You can restrict this further by checking for your specific UID
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

## 4. Suggested Indexes
Firestore creates basic indexes automatically. If you plan to sort by `order` and filter by `type` simultaneously, Firestore will prompt you to create a composite index via a link in your browser console errors.
