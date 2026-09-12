# Curatheque

Curatheque is a full-stack app for cataloging and curating art and artist reviews into personal collections. Users write reviews of individual artworks or artists, then organize those reviews into themed collections that can be kept private or shared publicly with other users through a browsable home feed.


## Features

- User authentication with JWT-based sessions
- Create, edit, and delete artwork reviews and artist reviews
- Organize reviews into custom collections
- Link and unlink existing reviews to/from collections without duplicating data
- Public/private visibility control per collection
- Home feed for browsing public collections from all users
- Search, sort, and pagination on the user's own collections
- Ownership-based authorization: only the creator of a collection or review can edit or delete it, while anyone can view public content
- Responsive layout: bottom tab bar navigation on mobile, floating sidebar navigation on tablet and larger
- Masonry-style and grid-style card layouts for browsing collections and reviews
- Icon hover states throughout (default/filled icon swap pattern)


## Tech Stack

### Frontend
- React (Vite)
- React Router
- React Bootstrap (Modal, Offcanvas, Tabs, Form, ListGroup components)
- Bootstrap 5 (base styling and utility classes)
- Custom CSS (custom properties/theming, masonry and CSS Grid layouts, mobile-first media queries)

### Backend
- Python / Flask
- Flask-RESTful (resource-based routing)
- Flask-JWT-Extended (authentication)
- Flask-Bcrypt (password hashing)
- Flask-SQLAlchemy (ORM)
- Marshmallow (schema serialization/validation)
- SQLite (dev)


## Project Structure

```
curatheque/
├── client/
│   ├── src/
|   |   ├── api/
|   |   |   └── api.js                             # fetch wrapper, attached auth header
│   │   ├── components/
|   |   |   ├── layout/
|   |   |   |   ├── Navbar.jsx
|   |   |   |   └── ProtectedRoute.jsx 
│   │   │   ├── AddMenu.jsx
│   │   │   ├── AddToCollectionModal.jsx
│   │   │   ├── BottomSheet.jsx
│   │   │   ├── CollectionGrid.jsx
│   │   │   ├── CollectionSearchSort.jsx
│   │   │   ├── CollectionSummary.jsx
│   │   │   ├── CreateArtistReviewModal.jsx
│   │   │   ├── CreateArtworkReviewModal.jsx
│   │   │   ├── EditArtistReviewModal.jsx
│   │   │   ├── EditArtworkReviewModal.jsx
│   │   │   ├── EditCollectionModal.jsx
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ReviewGrid.jsx
│   │   │   └── SortOptions.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useIsMobile.jsx
│   │   ├── pages/
│   │   │   ├── CollectionPage.jsx
│   │   │   ├── HomeFeed.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyCollectionsPage.jsx             # fetches from /whoami, /collections, and artwork and artist reviews
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ReviewPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── services/
│   │   │   ├── ArtistCollectionLinkService.jsx   # links a review to a collection
│   │   │   ├── ArtistReviewService.jsx
│   │   │   ├── ArtworkCollectionLinkService.jsx
│   │   │   ├── ArtworkReviewService.jsx
│   │   │   ├── CollectionService.jsx
│   │   │   └── UserService.jsx
│   │   ├── styles/
│   │   │   ├── fonts/
│   │   │   ├── icons/                              # Bootstrap Icons SVG assets
│   │   │   └── *.css                              # about one stylesheet per component/page, except those that share the same styles
│   │   ├── App.css
│   │   ├── App.jsx                               # Routes and Navbar
│   │   ├── index.css                             # global theme variables and shared rules
│   │   └── main.jsx                              # StrictMode, AuthProvider
│   └── index.html
│
├── server/
│   ├── controllers/
│   |   ├── ArtistCollectionLink.py               # link an existing review to an existing collection
│   |   ├── ArtistReviewById.py
│   |   ├── ArtistReviewIndex.py
│   |   ├── ArtworkCollectionLink.py
│   |   ├── ArtworkReviewById.py
│   |   ├── ArtworkReviewIndex.py
│   |   ├── CollectionArtistReviewCreate.py       # creating a new review that is already linked to a collection
│   |   ├── CollectionArtworkReviewCreate.py
│   |   ├── CollectionById.py
│   |   ├── CollectionFeed.py                     # return a summary of collections, used in HomeFeed.jsx and CollectionGrid.jsx
│   |   ├── LogIn.py
│   |   ├── SignUp.py
│   |   ├── UserCollectionIndex.py
│   |   └── WhoAmI.py
│   ├── models/
│   │   └── schemas/
│   │   |   ├── ArtistCollectionSchema.py         # join table schema
│   │   |   ├── ArtistReviewSchema.py
│   │   |   ├── ArtworkCollectionSchema.py
│   │   |   ├── ArtworkReviewSchema.py
│   │   |   ├── CollectionSchema.py
│   │   |   ├── CollectionSummarySchema.py
│   │   |   └── UserSchema.py
│   │   ├── ArtistCollection.py    # join model: artist review <-> collection
│   │   ├── ArtworkCollection.py   # join model: artwork review <-> collection
│   │   ├── ArtistReview.py
│   │   ├── ArtworkReview.py
│   │   ├── Collection.py
│   │   └── User.py
│   ├── app.py                     # Flask app entry point, route registration
│   ├── config.py                  # DB and app configuration
│   └── seed.py                    # seed file for fake data
│
└── README.md
```


## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- pipenv or venv for Python dependency management
- npm or yarn for frontend dependencies

### Backend Setup

```bash
cd server
pipenv install
```

Set up your environment variables (create a `.env` file):

```
JWT_SECRET_KEY=<your secret key>
```

Initialize the database:

```bash
flask db upgrade
```

Run the backend server:

```bash
flask run --debug
```

The API runs at `http://localhost:5000` by default.


*Optional: seed the database with sample data*

```bash
python seed.py
```
This clears existing data and generates fake users, trips, checklists, checklist items, and itinerary items using Faker — useful for testing without manually creating records.


### Frontend Setup

```bash
cd server
npm install
npm run dev
```

The app run at `http://localhost:5173` by default (Vite's default port).


## API Overview

All endpoints below require a valid JWT (`Authorization: Bearer <token>`) unless noted otherwise. Response bodies are serialized via Marshmallow schemas.

| Method | Endpoint | Description |
### Auth
| POST | `/signup` | Create a new user account, does not require JWT |
| POST | `/login` | Authenticate and receive a JWT, does not require JWT |

### Home Feed
| GET | `/home` | Get all public collections across all users |

### Collections
| GET | `/collections` | Get the current user's collections (supports `search`, `sort`, `page` query params) |
| POST | `/collections` | Create a new collection |
| GET | `/collections/:collection_id` | Get a single collection by ID (owner or public only; 404 otherwise) |
| PATCH | `/collections/:collection_id` | Edit a collection (owner only) |
| DELETE | `/collections/:collection_id` | Delete a collection (owner only) |

### Artwork Reviews
| GET | `/artwork-reviews` | Get the current user's artwork reviews |
| POST | `/artwork-reviews` | Create a new artwork review |
| GET | `/artwork-reviews/:artwork_review_id` | Get a single artwork review by ID (viewable by any authenticated user) |
| PATCH | `/artwork-reviews/:artwork_review_id` | Edit an artwork review (owner only) |
| DELETE | `/artwork-reviews/:artwork_review_id` | Delete an artwork review (owner only) |

### Artist Reviews
| GET | `/artist-reviews` | Get the current user's artist reviews |
| POST | `/artist-reviews` | Create a new artist review |
| GET | `/artist-reviews/:artist_review_id` | Get a single artist review by ID (viewable by any authenticated user) |
| PATCH | `/artist-reviews/:artist_review_id` | Edit an artist review (owner only) |
| DELETE | `/artist-reviews/:artist_review_id` | Delete an artist review (owner only) |

### Collection–Review Links
| POST | `/collections/:collection_id/artwork-reviews/:artwork_review_id` | Link an artwork review to a collection (owner only) |
| DELETE | `/collections/:collection_id/artwork-reviews/:artwork_review_id` | Remove an artwork review from a collection (owner only) |
| POST | `/collections/:collection_id/artist-reviews/:artist_review_id` | Link an artist review to a collection (owner only) |
| DELETE | `/collections/:collection_id/artist-reviews/:artist_review_id` | Remove an artist review from a collection (owner only) |

### User
| GET | `/users/:id` | Get the current user's profile (username, email, profile image) |
| PATCH | `/users/:id` | Edit the current user's profile |


## Known Limitations

- No confirmation step before removing a review from a collection (unlike review deletion, which does prompt via `window.confirm`)
- No way to remove a review from a collection directly from the Review page — only from within a Collection page
- No pagination on the "reviews not yet in a collection" tabs (fetches all at once)
- True masonry ordering (strict left-to-right) is not implemented; grid layouts fill top-to-bottom per column/row depending on the component
- Bootstrap Icons are used as static image assets (`<img>` tags) rather than inline SVG, so icon recoloring via CSS variables is not currently possible without further refactoring
- No image upload — collection/review images are set via URL only
- No automated test suite
- Style and layout could use some polishing
- Token is stored in state, so it deletes on refresh - which can make for a frustrating user experience


## Future Improvements

- Direct messaging
- Users can save other user's reviews to their own collections
- Followers/friends list
- In-app camera to upload your own images
- Creating a review inside a collection (review is already linked in one go)
- Search public collections
- Inline SVG icon components (via SVGR or similar) to enable CSS-variable-driven theming and hover-state recoloring
- Confirmation modal for removing a review from a collection
- Ability to remove a review from any collection directly from the Review page, with a collection picker for reviews belonging to multiple collections
- Image upload support instead of URL-only cover images
- Server-side filtering for "unassigned" reviews (not yet in any collection) rather than client-side computation
- Automated testing (frontend and backend)
- True masonry packing via a dedicated library for strict left-to-right visual ordering

## License

This project was built as a capstone project for Flatiron School's Software Engineering course.
All rights reserved. This project is not currently licensed for reuse, modification, or distribution.

## Author

Sanaeya James