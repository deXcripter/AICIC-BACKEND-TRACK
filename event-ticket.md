# Event Ticket Booker – Backend Development Project

## Introduction

In this project, you will build a complete event ticket booking system using Node.js, Express, and MongoDB. This project will test your ability to create a production-quality backend API that handles user authentication, event management, ticket booking, and payment processing.

Your task is to implement a system that allows users to register events, book tickets, process payments, and manage the entire event lifecycle. This project will assess your backend development skills in a real-world scenario.

## Objectives

By completing this project, you will demonstrate your ability to:

- Design and build a RESTful API with proper architecture patterns
- Implement secure authentication and authorization systems
- Create complex database models with appropriate relationships
- Integrate third-party services (payment processing)
- Handle edge cases and implement proper error management
- Organize code in a maintainable, deployment-ready structure

## Project Requirements

### 1. Project Setup and Authentication

**Requirements:**

- [ ] Set up the project with a clean, organized structure (models, routes, controllers, middleware)
- [ ] Implement a User model that supports multiple roles (admin, organizer, attendee)
- [ ] Create a user registration endpoint that validates inputs and allows role selection (between organizer & attendee)
- [ ] Build a secure login endpoint that generates JWT tokens
- [ ] Implement password hashing using bcrypt
- [ ] Create middleware to protect routes based on authentication status
- [ ] Implement role-based authorization middleware
- [ ] Build a complete password reset flow with token-based verification

**Required Endpoints:**

| Method | Endpoint              | Description                                |
| ------ | --------------------- | ------------------------------------------ |
| POST   | /auth/register        | Register a new user with role selection    |
| POST   | /auth/login           | Authenticate user and return JWT token     |
| GET    | /auth/me              | Get current user's profile information     |
| POST   | /auth/forgot-password | Request a password reset link              |
| POST   | /auth/reset-password  | Reset password with token                  |
| POST   | /auth/refresh-token   | Get a new access token using refresh token |
| POST   | /auth/logout          | Invalidate current token/session           |

**Additional Guidance:**

- Implement proper validation for registration (email format, password strength)
- Store passwords securely using bcrypt with appropriate salt rounds
- Create role-specific middleware to protect routes based on user roles
- Consider implementing token blacklisting for logout functionality

**Deliverable:** Complete authentication system with user registration, login, and role-based access control.

---

### 2. Event Management

**Event Modeling**

- [ ] Create a comprehensive Event model with the following fields:
  - Basic info: title, description, category
  - Logistics: location, date, time
  - Capacity tracking: total tickets, available tickets
  - Status management: draft, published, cancelled
  - Media: poster image URL
  - Pricing information
  - Relationships: organizer reference (User model)

**Organizer Features**

- [ ] Implement a protected endpoint for event creation (organizers only)
- [ ] Create endpoints for updating event details (with proper ownership validation)
- [ ] Build event deletion functionality with appropriate checks
- [ ] Implement an endpoint to list events created by the authenticated organizer
- [ ] Create functionality to toggle event status (draft → published → cancelled)

**Attendee Features**

- [ ] Build a public endpoint to list all published events
- [ ] Implement pagination for event listings
- [ ] Create search functionality by title/description
- [ ] Implement a filtering system by category, price range, date, location
- [ ] Create an endpoint to view complete details of a single event

**Required Endpoints:**

| Method | Endpoint                     | Description                                   |
| ------ | ---------------------------- | --------------------------------------------- |
| POST   | /events                      | Create a new event (organizers only)          |
| GET    | /events                      | List all published events with filters        |
| GET    | /events/:eventId             | Get detailed information about specific event |
| PUT    | /events/:eventId             | Update event details (organizers only)        |
| DELETE | /events/:eventId             | Delete an event (organizers only)             |
| PUT    | /events/:eventId/status      | Toggle event status (draft/publish/cancel)    |
| GET    | /events/search               | Search events by title/description            |
| GET    | /events/categories/:category | Filter events by category                     |
| GET    | /organizer/events            | Get all events created by current organizer   |
| GET    | /events/featured             | Get featured/highlighted events               |

**Additional Guidance:**

- Implement proper ownership validation for event updates/deletions
- Use query parameters for filtering (price range, date range, location)
- Add validation for required event fields before publishing

**Evaluation Criteria:**

- Proper database modeling and relationships
- Implementation of ownership validation
- Effective search and filtering implementation
- API design and organization

**Deliverable:** Complete event management system with CRUD operations and filtering capabilities.

---

### 3. Ticket Booking System

**Ticket Modeling**

- [ ] Design a Booking/Ticket model that includes:
  - References to User (attendee) and Event
  - Quantity of tickets booked
  - Total price calculation
  - Status tracking (reserved, paid, cancelled)
  - Unique ticket reference number
  - Appropriate timestamp data

**Booking Functionality**

- [ ] Create an endpoint for reserving tickets
- [ ] Implement validation to check ticket availability before booking
- [ ] Build logic to prevent duplicate bookings by the same user
- [ ] Create a system to generate unique ticket reference numbers
- [ ] Implement an endpoint for users to view their booked tickets
- [ ] Add functionality to cancel a ticket (with appropriate business rules)
- [ ] Create logic to update available ticket counts when bookings are made/cancelled

**Required Endpoints:**

| Method | Endpoint                            | Description                                            |
| ------ | ----------------------------------- | ------------------------------------------------------ |
| POST   | /tickets/reserve                    | Reserve tickets for an event                           |
| GET    | /tickets                            | Get all tickets booked by current user                 |
| GET    | /tickets/:ticketId                  | Get details of a specific ticket                       |
| PUT    | /tickets/:ticketId/cancel           | Cancel a ticket booking                                |
| GET    | /events/:eventId/availability       | Check ticket availability for an event                 |
| GET    | /organizer/events/:eventId/bookings | Get all bookings for a specific event (organizer only) |
| GET    | /admin/tickets                      | Admin: View all tickets with filtering options         |
| GET    | /tickets/reference/:reference       | Get ticket by reference number                         |

**Additional Guidance:**

- Create a robust reference number generation system
- Consider implementing a time limit for reserved (but unpaid) tickets
- Add validation for maximum tickets per booking based on availability

**Evaluation Criteria:**

- Validation of business rules
- Unique identifier generation
- Relationship management between models

**Deliverable:** Functional ticket booking system with validation and reference generation.

---

### 4. Payment Integration

**Payment Setup**

- [ ] Set up integration with Paystack payment gateway
- [ ] Implement a payment initialization endpoint
- [ ] Create a webhook or verification endpoint for payment confirmation

**Payment Flow**

- [ ] Connect payment flow to the ticket booking process
- [ ] Update ticket status based on payment outcome
- [ ] Implement a bypass flow for free events
- [ ] Add comprehensive error handling for payment failures
- [ ] Store payment receipts and link them to bookings
- [ ] Create an endpoint to view payment history for a booking

**Required Endpoints:**

| Method | Endpoint                         | Description                             |
| ------ | -------------------------------- | --------------------------------------- |
| POST   | /payments/initialize             | Initialize payment for booked tickets   |
| GET    | /payments/verify/:reference      | Verify payment status                   |
| POST   | /payments/webhook                | Webhook for payment service callbacks   |
| GET    | /payments/:paymentId             | Get payment details                     |
| GET    | /tickets/:ticketId/payment       | Get payment information for a ticket    |
| GET    | /user/payments                   | Get payment history for current user    |
| POST   | /tickets/:ticketId/complete-free | Complete booking for free events        |
| GET    | /admin/payments                  | Admin: View all payments with filtering |

**Additional Guidance:**

- Securely store Paystack API keys in environment variables
- Implement proper verification of payment callbacks
- Handle edge cases like payment timeouts and failures
- Consider implementing payment expiration for pending payments

**Evaluation Criteria:**

- Successful integration with external payment service
- Proper error handling for payment scenarios
- Security of payment information
- Transaction management

**Deliverable:** Complete payment flow integration with Paystack, supporting both paid and free events.

---

### 5. Admin Features and Notifications

**Admin Dashboard Endpoints**

- [ ] Create admin-only endpoints to view and manage all users
- [ ] Build endpoints to view/manage all events across organizers
- [ ] Implement an event approval workflow (optional moderation layer)
- [ ] Create admin endpoints for viewing all bookings with filtering options
- [ ] Build basic reporting endpoints (tickets sold, revenue generated)

**Notification System**

- [ ] Set up email service integration using nodemailer
- [ ] Create a booking confirmation email template
- [ ] Implement email sending logic for successful bookings
- [ ] Build a reminder system for upcoming events
- [ ] (Advanced) Set up scheduled jobs for automated reminders

**Required Endpoints:**

| Method | Endpoint                       | Description                                  |
| ------ | ------------------------------ | -------------------------------------------- |
| GET    | /admin/users                   | Admin: List all users with filtering         |
| PUT    | /admin/users/:userId           | Admin: Update user details/status            |
| DELETE | /admin/users/:userId           | Admin: Delete a user account                 |
| GET    | /admin/events                  | Admin: Get all events with filtering         |
| PUT    | /admin/events/:eventId/approve | Admin: Approve/reject an event               |
| GET    | /admin/bookings                | Admin: View all bookings with filtering      |
| GET    | /admin/stats/overview          | Admin: Get platform overview statistics      |
| GET    | /admin/stats/events            | Admin: Get event statistics                  |
| GET    | /admin/stats/revenue           | Admin: Get revenue reports with date filters |
| POST   | /notifications/test            | Admin: Test email notification delivery      |

**Additional Guidance:**

- Consider adding pagination for all listing endpoints
- Create reusable email templates for different notification types
- For scheduled reminders, consider using a package like node-cron
- Ensure all admin endpoints are properly protected

**Evaluation Criteria:**

- Implementation of admin privileges
- Report generation functionality
- Email template design and delivery
- Scheduled task management

**Deliverable:** Admin management capabilities and email notification system.

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

## Evaluation Criteria

Your project will be evaluated based on:

1. **Code organization and architecture** - How well is your code structured?
2. **Security practices** - Have you implemented proper authentication, authorization, and data protection?
3. **Database design** - Are your models and relationships appropriate for the problem?
4. **Error handling** - Does your application handle errors gracefully?
5. **API documentation** - Is your API well-documented and easy to understand?
6. **Feature completeness** - Have you implemented all required functionality?
7. **Code quality** - Is your code readable, maintainable, and following best practices?

## Resources

- Express.js documentation: https://expressjs.com/
- Mongoose documentation: https://mongoosejs.com/docs/
- JWT authentication: https://jwt.io/
- Paystack API documentation: https://paystack.com/docs/api/
- Nodemailer for sending emails: https://nodemailer.com/

## Submission Guidelines

Submit your completed project as a GitHub repository with:

1. Complete source code
2. README with setup instructions
3. API documentation
4. Environment variables template (.env.example)
5. Any additional documentation explaining your implementation decisions
