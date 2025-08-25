# API Endpoints Needed

## Authentication

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

## Users

- GET /api/users/profile
- PUT /api/users/profile
- POST /api/users/upload-avatar
- GET /api/users/:id

## Entrepreneurs

- GET /api/entrepreneurs
- POST /api/entrepreneurs
- PUT /api/entrepreneurs/:id
- DELETE /api/entrepreneurs/:id
- GET /api/entrepreneurs/:id/products
- POST /api/entrepreneurs/:id/reviews

## Products/Services

- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- POST /api/products/:id/images

## Bookings/Orders

- POST /api/bookings
- GET /api/bookings (user's bookings)
- PUT /api/bookings/:id/status
- GET /api/entrepreneurs/:id/bookings

## Reviews & Ratings

- POST /api/reviews
- GET /api/reviews/:entrepreneurId
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

## Categories

- GET /api/categories
- POST /api/categories (admin)

## Search & Filters

- GET /api/search/entrepreneurs
- GET /api/search/products
- GET /api/categories/:id/entrepreneurs

## Analytics (Admin)

- GET /api/analytics/dashboard
- GET /api/analytics/earnings
- GET /api/analytics/users

## Notifications

- GET /api/notifications
- POST /api/notifications/send
- PUT /api/notifications/:id/read

## File Upload

- POST /api/upload/image
- POST /api/upload/portfolio
