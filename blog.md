# Blog Application – Backend API Project

## Introduction

This backend project will guide you through building a fully-featured blog system API. You'll implement authentication, CRUD operations, role-based access control, search functionality, and user engagement features like comments and likes.

Each section below outlines specific features to implement with explicit endpoint requirements. Work through them sequentially as each builds upon previous sections.

---

## Project Requirements and Deliverables

### 1. Authentication & Authorization System

**Core Requirements:**

- [ ] Create a user registration endpoint with validation
- [ ] Implement a secure login system that generates JWT tokens
- [ ] Set up role-based access control with three roles: author, reader, and admin
- [ ] Implement secure password hashing using bcrypt
- [ ] Create middleware for protecting private routes
- [ ] Add refresh token functionality

**Required Endpoints:**

| Method | Endpoint              | Description                                |
| ------ | --------------------- | ------------------------------------------ |
| POST   | /auth/register        | Register a new user with validation        |
| POST   | /auth/login           | Authenticate user and return JWT token     |
| POST   | /auth/refresh         | Get a new access token using refresh token |
| GET    | /auth/me              | Get current user's information             |
| POST   | /auth/forgot-password | Request password reset link                |
| POST   | /auth/reset-password  | Reset password with token                  |
| POST   | /auth/logout          | Invalidate current token/session           |

**Additional Guidance:**

- Ensure validation catches weak passwords, invalid emails
- Implement proper error messages for authentication failures
- Consider implementing logout functionality (token invalidation)
- For email verification, use a time-limited token system (where a token expires after a certain period)

**Deliverable:** Complete authentication system with role-based access control and JWT implementation.

---

### 2. User Profile Management

**Core Requirements:**

- [ ] Create endpoints to view and update user profiles
- [ ] Implement fields for bio, avatar URL, and display name
- [ ] Build public profile endpoint showing user's published articles
- [ ] Add admin functionality to manage users (delete/ban)
- [ ] Implement profile picture upload (URL storage)

**Required Endpoints:**

| Method | Endpoint              | Description                           |
| ------ | --------------------- | ------------------------------------- |
| GET    | /users/:userId        | Get user profile (public information) |
| GET    | /users/:userId/posts  | Get user's published posts            |
| GET    | /users/profile        | Get current user's complete profile   |
| PUT    | /users/profile        | Update current user's profile         |
| POST   | /users/profile/avatar | Upload/update profile picture         |
| GET    | /admin/users          | Admin: List all users with pagination |
| PUT    | /admin/users/:userId  | Admin: Update user status (ban/unban) |
| DELETE | /admin/users/:userId  | Admin: Delete a user account          |

**Deliverable:** Complete user profile system with CRUD operations and admin management capabilities.

---

### 3. Blog Post Management

**For Authors - Core Requirements:**

- [ ] Create endpoints for blog post creation with all required fields
  - Title, content (with Markdown/HTML support), cover image URL
  - Category selection and tag addition
  - Draft/published status toggle
- [ ] Implement post update functionality with validation
- [ ] Add post deletion with proper authorization checks
- [ ] Create endpoints to list user's own posts with filtering options
- [ ] Implement post metadata features (reading time calculation, summary generation)

**For All Users - Core Requirements:**

- [ ] Build endpoints to browse published posts with pagination
- [ ] Implement search functionality for posts
- [ ] Create filtering system by category, tags, and author
- [ ] Add sorting options (recent, most liked, most commented)
- [ ] Implement single post retrieval with complete details

**Required Endpoints:**

| Method | Endpoint                  | Description                                      |
| ------ | ------------------------- | ------------------------------------------------ |
| GET    | /posts                    | List published posts with filtering & pagination |
| GET    | /posts/:postId            | Get single post by ID                            |
| GET    | /posts/search             | Search posts by title or content                 |
| GET    | /posts/category/:category | Get posts by category                            |
| GET    | /posts/tag/:tag           | Get posts by tag                                 |
| GET    | /posts/author/:userId     | Get posts by author                              |
| POST   | /posts                    | Create a new post (authenticated authors)        |
| PUT    | /posts/:postId            | Update a post (authors only)                     |
| DELETE | /posts/:postId            | Delete a post (authors only)                     |
| GET    | /author/posts             | Get current author's posts (including drafts)    |
| PUT    | /posts/:postId/publish    | Toggle publish status of a post                  |

**Additional Guidance:**

- For content storage, consider sanitizing HTML input
- Reading time calculation: approximately 200-250 words per minute
- Implement soft deletion for posts rather than permanent removal
- Use query parameters for filtering and sorting options
- Consider adding validation for minimum content length

**Deliverable:** Complete blog post management system with CRUD operations, filtering, and search capabilities.

---

### 4. Categories & Tags System

**Core Requirements:**

- [ ] Create a Category model with name, description, and slug fields
- [ ] Implement admin-only endpoints for category management (create/update/delete)
- [ ] Build a Tag model for user-generated tags
- [ ] Add endpoints for listing all categories and tags
- [ ] Implement relationships between posts and categories/tags
- [ ] Create filtering endpoints to find posts by category or tag

**Required Endpoints:**

| Method | Endpoint                 | Description                               |
| ------ | ------------------------ | ----------------------------------------- |
| GET    | /categories              | List all categories                       |
| GET    | /categories/:slug        | Get category details and associated posts |
| POST   | /admin/categories        | Admin: Create new category                |
| PUT    | /admin/categories/:id    | Admin: Update category                    |
| DELETE | /admin/categories/:id    | Admin: Delete category                    |
| GET    | /tags                    | List all tags with usage count            |
| GET    | /tags/:tag               | Get tag details and associated posts      |
| POST   | /posts/:postId/tags      | Add tags to post (author only)            |
| DELETE | /posts/:postId/tags/:tag | Remove tag from post (author only)        |

**Additional Guidance:**

- Categories should be pre-defined by admins
- Tags should be more flexible and user-generated
- Implement slug generation for categories (URL-friendly versions of names)
- Consider category hierarchies (optional)
- Ensure proper database indexing for efficient querying

**Deliverable:** Complete category and tag management system with proper relationships to posts.

---

### 5. Comments System

**Core Requirements:**

- [ ] Design a Comment model with content, author, and post reference
- [ ] Implement endpoint for adding comments to posts (authenticated users only)
- [ ] Create functionality to update and delete own comments
- [ ] Build endpoint to retrieve all comments for a specific post
- [ ] Implement admin functionality to delete any comment
- [ ] Add timestamps to track comment creation and updates

**Required Endpoints:**

| Method | Endpoint                     | Description                                 |
| ------ | ---------------------------- | ------------------------------------------- |
| GET    | /posts/:postId/comments      | Get all comments for a post with pagination |
| POST   | /posts/:postId/comments      | Add a comment to a post                     |
| PUT    | /comments/:commentId         | Update own comment                          |
| DELETE | /comments/:commentId         | Delete own comment                          |
| DELETE | /comments/admin/:commentId   | Admin: Delete any comment                   |
| GET    | /users/:userId/comments      | Get all comments by a user                  |
| GET    | /comments/replies/:commentId | Get replies to a specific comment           |
| POST   | /comments/:commentId/replies | Add a reply to a comment                    |

**Deliverable:** Functional commenting system with proper permissions and CRUD operations.

---

### 6. Likes & Reactions System

**Core Requirements:**

- [ ] Create a model to track user likes on posts
- [ ] Implement endpoints for liking/unliking posts
- [ ] Ensure users can only like a post once
- [ ] Build functionality to view total likes on a post
- [ ] Add endpoints to see which posts a user has liked

**Required Endpoints:**

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | /posts/:postId/like  | Like a post                     |
| DELETE | /posts/:postId/like  | Unlike a post                   |
| GET    | /posts/:postId/likes | Get users who liked a post      |
| GET    | /users/:userId/likes | Get posts liked by a user       |
| GET    | /users/me/likes      | Get posts liked by current user |

**Advanced Features (Optional):**

- [ ] Implement multiple reaction types (like, celebrate, support)
- [ ] Add analytics for most-liked content

**Additional Guidance:**

- Consider using a separate collection vs embedded documents for likes
- Implement efficient querying for checking if a user liked a post
- Think about how to handle likes in the post retrieval process (aggregation)

**Deliverable:** Complete like/reaction system with appropriate constraints and querying capabilities.

---

### 7. Draft & Publishing Workflow

**Core Requirements:**

- [ ] Implement status field for posts (draft, published)
- [ ] Create functionality to save posts as drafts
- [ ] Build endpoints to publish or unpublish posts
- [ ] Implement automatic slug generation from post titles
- [ ] Add validation to ensure published posts meet quality criteria

**Required Endpoints:**

| Method | Endpoint                 | Description                       |
| ------ | ------------------------ | --------------------------------- |
| GET    | /author/drafts           | Get all drafts by current author  |
| POST   | /posts/draft             | Save post as draft                |
| PUT    | /posts/:postId/publish   | Publish a draft post              |
| PUT    | /posts/:postId/unpublish | Unpublish a post back to draft    |
| GET    | /posts/slug/:slug        | Get post by slug                  |
| PUT    | /posts/:postId/slug      | Regenerate or customize post slug |

**Advanced Features (Optional):**

- [ ] Add scheduled publishing functionality
- [ ] Implement post revision history

**Additional Guidance:**

- Consider using a state machine pattern for post status
- For slug generation, handle duplicates and special characters
- Implement validation rules for published posts (minimum length, required fields)
- For scheduled publishing, consider using a job queue

**Deliverable:** Complete publishing workflow system with draft management and slug generation.

---

### 8. Search & Discovery System

**Core Requirements:**

- [ ] Implement full-text search on post title and content
- [ ] Create filtering by multiple criteria (category, tags, author)
- [ ] Add sorting options (date, popularity, relevance)
- [ ] Build endpoints for featured or trending content
- [ ] Implement pagination for search results

**Required Endpoints:**

| Method | Endpoint         | Description                                  |
| ------ | ---------------- | -------------------------------------------- |
| GET    | /search          | Search across posts with multiple parameters |
| GET    | /posts/featured  | Get featured or editor's pick posts          |
| GET    | /posts/trending  | Get trending posts based on engagement       |
| GET    | /posts/recent    | Get most recent posts                        |
| GET    | /posts/popular   | Get most popular posts                       |
| GET    | /recommendations | Get personalized post recommendations        |

**Deliverable:** Complete search system with filtering, sorting, and pagination capabilities.

---

### 9. Admin Features

**Core Requirements:**

- [ ] Create admin dashboard endpoints to view all posts
- [ ] Implement moderation tools for inappropriate content
- [ ] Build category management system
- [ ] Add user management functionality (view, ban, unban)
- [ ] Create basic statistics endpoints (posts, comments, likes per user/post)

**Required Endpoints:**

| Method | Endpoint                  | Description                             |
| ------ | ------------------------- | --------------------------------------- |
| GET    | /admin/posts              | Admin: Get all posts with filters       |
| PUT    | /admin/posts/:postId      | Admin: Update any post                  |
| DELETE | /admin/posts/:postId      | Admin: Remove any post                  |
| GET    | /admin/users              | Admin: Get all users with filters       |
| PUT    | /admin/users/:userId/role | Admin: Change user role                 |
| PUT    | /admin/users/:userId/ban  | Admin: Ban/unban user                   |
| GET    | /admin/stats/overview     | Admin: Get platform overview statistics |
| GET    | /admin/stats/users        | Admin: Get user statistics              |
| GET    | /admin/stats/posts        | Admin: Get post statistics              |
| GET    | /admin/reports            | Admin: Get reported content             |

**Additional Guidance:**

- Include filtering and sorting options for admin views
- Implement soft deletion where appropriate
- Consider implementing an activity log for admin actions
- Add validation for admin operations
- Design proper authorization checks for admin endpoints

**Deliverable:** Complete admin management system with moderation and statistics capabilities.

---

### 10. Analytics & Metrics (Optional)

**Core Requirements:**

- [ ] Implement post view tracking system
- [ ] Create trending post identification based on metrics
- [ ] Build endpoints to identify top authors
- [ ] Add basic reporting functionality
- [ ] Implement time-based filtering for analytics

**Required Endpoints:**

| Method | Endpoint                  | Description                              |
| ------ | ------------------------- | ---------------------------------------- |
| POST   | /posts/:postId/view       | Record a post view                       |
| GET    | /posts/:postId/analytics  | Get analytics for specific post          |
| GET    | /author/analytics         | Get analytics for current author's posts |
| GET    | /admin/analytics/posts    | Admin: Get post analytics                |
| GET    | /admin/analytics/users    | Admin: Get user engagement analytics     |
| GET    | /admin/analytics/overview | Admin: Get platform-wide analytics       |

**Additional Guidance:**

- Consider using a separate collection for analytics data
- Implement measures to prevent artificial inflation of views
- Use aggregation pipelines for complex analytics
- Consider privacy implications of tracking
- Think about data retention policies

**Deliverable:** Basic analytics system with view tracking and trend identification.

---

### 11. General API Features

**Core Requirements:**

- [ ] Implement input validation for all endpoints
- [ ] Create a centralized error handling system
- [ ] Organize code into proper routes, controllers, models, and middleware
- [ ] Set up environment variables for configuration
- [ ] Implement logging with morgan

**Additional Guidance:**

- Consider using validation libraries like Joi
- Implement consistent error responses across the API
- Use middleware for common functionality
- Create reusable utility functions
- Document your code thoroughly
- Implement security best practices

**Deliverable:** Well-organized, secure, and maintainable API codebase.

---

**Potential Implementations:**

- [ ] Bookmark system for users to save favorite posts
- [ ] Email notification system for new comments/likes

**Suggested Endpoints:**

| Method | Endpoint                | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| POST   | /posts/:postId/bookmark | Bookmark a post                     |
| DELETE | /posts/:postId/bookmark | Remove bookmark                     |
| GET    | /users/me/bookmarks     | Get current user's bookmarked posts |

## Technical Stack & Tools

**Recommended Technologies:**

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer (for optional email features)
- **Image Storage:** Multer for local storage or Cloudinary for cloud storage
- **Validation:** Joi, or express-validator

---

## Project Structure

**Recommended Organization:**

```
src/
  ├── config/            # Configuration files and environment setup
  ├── controllers/       # Request handlers for each route
  ├── middleware/        # Custom middleware (auth, validation, etc.)
  ├── models/            # Database schema definitions
  ├── routes/            # API route definitions
  ├── utils/             # Helper functions and utilities
  └── app.js             # Application entry point
```

---

## API Response Format

For consistency, all API responses should follow this format:

**Success Response:**

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Operation successful"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description of the error"
  }
}
```

---

## Learning Outcomes

By completing this project, you will gain practical experience in:

- Building secure authentication and authorization systems
- Designing and implementing content management workflows
- Creating user engagement features (comments, likes)
- Implementing search and filter mechanisms
- Structuring a clean, maintainable Node.js/Express application
- Working with MongoDB and Mongoose for data modeling
- Handling errors and edge cases in a real-world application
- Implementing proper API security measures

This project serves as an excellent portfolio piece demonstrating your backend development skills to potential employers.

---

## Getting Started

1. Set up a new Node.js project with Express
2. Install required dependencies
3. Create a MongoDB database (local or Atlas)
4. Set up your environment variables
5. Implement the core models (User, Post, Comment)
6. Begin with the authentication system
7. Work through each feature systematically

---

## Submission Requirements

Your completed project should include:

1. Complete source code with all implemented features
2. Documentation of your API endpoints
3. Setup instructions for local development
