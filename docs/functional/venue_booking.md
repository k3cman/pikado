# Venue Booking & Payments (Priority 2)

## Overview
This feature allows players to reserve specific boards at a club and pay for the time. It transforms the app into a "Booking System" for club owners.

## Features

### 1. Board Reservation
*   **Calendar View**: See availability for "Board 1", "Board 2", etc.
*   **Slots**: Book in 30min / 1hr increments.
*   **Pricing**: Club sets hourly rates (e.g., $10/hr).

### 2. Payments
*   **In-App Payment**: Pay via Stripe/Apple Pay to confirm booking.
*   **Wallet**: "Club Credits" system (Buy $50 credit, get $5 bonus).

### 3. Access Control (Smart Integration)
*   **Unlock**: When the booking starts, the tablet on the board "Unlocks" for the user.
*   **Time Limit**: When time is up, the tablet shows "Booking Expired" (unless extended).

## Operational Context
*   **Priority**: **Post-MVP**. This requires significant backend work (Payments, Calendar Sync) and operational buy-in from clubs.
