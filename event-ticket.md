# Event Ticket Booker – Backend Project

## Project Objectives (Deliverables)

### 1. Authentication & Authorization

- User registration (attendee or organizer)
- User login with JWT
- Role-based access: admin, organizer, attendee
- Password hashing & reset (token-based)

---

### 2. Event Management

**For Organizers**

- Create an event (title, description, category, price, location, date & time, total tickets, poster image URL)
- Update an event
- Delete an event
- View list of their own events
- Toggle event status: draft / published / cancelled

**For Attendees**

- View all published events (with pagination & search)
- Filter by category, price range, date, location
- View single event details (including ticket availability)

---

### 3. Ticket Booking System

- Book ticket(s) for an event
- Validate availability
- Reduce available ticket count
- Prevent duplicate bookings for same user
- Generate a unique ticket reference number per booking
- View user’s booked tickets
- Cancel a ticket (optional; with refund logic if payment integrated)
- Email ticket confirmation (optional)

---

### 4. Payments Integration

- Integrate payment gateway (I recommend Paystack)
- Initiate payment for paid events
- Confirm transaction via webhook or verification endpoint
- Link successful payment to the ticket booking
- Mark free events as “booked” without payment flow
- Handle payment failures gracefully
- Store payment receipts / status per booking

---

### 5. Admin Features

- View all events
- Approve/reject events before they go live (optional moderation layer)
- View all users
- View all bookings (filter by user or event)
- Generate reports (e.g., total tickets sold per event)

---

### 6. Notifications (Optional but Educational)

- Send email confirmation on successful booking
- Send reminder email a day before event (cron job)

---

### 7. General API Features

- Input validation (e.g., Joi, Zod, express-validator)
- Proper error handling (404s, 500s, validation errors)
- API response formatting
- Rate limiting (to prevent abuse)
- Logging (simple console or winston)

---

### 8. Technical Details

- RESTful routing
- MongoDB (with Mongoose or equivalent ORM)
- Relationships (Users ↔ Events, Events ↔ Bookings)
- Deployment-ready code structure (e.g., controllers, routes, models, services)
- API documentation (Swagger or Postman collection)
