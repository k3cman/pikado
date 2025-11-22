# IAM & User Features

## Overview
This module handles User Identity, Authentication, and Role-Based Access Control (RBAC). It defines how different types of users interact with the system and what data is tracked for them.

## Roles & Permissions

### 1. Guest (Anonymous)
*   **Description**: Walk-in players or casual users who do not want to register.
*   **Access**:
    *   Scorekeeping Interface (Play matches).
    *   View current match score.
*   **Limitations**:
    *   **No Statistics**: Stats are discarded after the match (or saved anonymously to the "Club" aggregate only).
    *   Cannot participate in official tournaments (unless added as a placeholder name).
    *   Cannot save game history.

### 2. Regular User (Player)
*   **Description**: The core user of the platform.
*   **Identity**:
    *   **Username** (Unique, display name).
    *   Email/Password (or Social Login).
    *   Avatar/Profile Picture.
*   **Statistics (Connected Data)**:
    *   **Global Stats**: 3-Dart Average, Checkout %, Win/Loss Record.
    *   **Game History**: Log of all matches played (opponent, date, result).
    *   **Personal Bests**: Highest checkout, fastest leg (dart count), most 180s.
    *   **Progression**: Graphs showing improvement over time.
*   **Capabilities**:
    *   Join Clubs.
    *   Register for Tournaments.
    *   "Check-in" to a board via QR code or PIN to load profile.

### 3. Club Manager (Club Role)
*   **Description**: Organizers who manage a "Club" (Clan/Group).
*   **Capabilities**:
    *   **Manage Members**: Invite/Remove players, assign internal ranks.
    *   **Organize Tournaments**: Create brackets, set rules, schedule matches.
    *   **Device Management**: Register and manage tablets/boards for the club.
    *   **Club Stats**:
        *   Leaderboards (Internal ranking of club members).
        *   Activity logs (Matches played per week).
        *   Tournament History.

### 4. Platform Admin
*   **Description**: Super-users managing the entire Pikado instance.
*   **Capabilities**:
    *   Manage all Clubs and Users.
    *   System-wide settings.
    *   Subscription/Billing management (if applicable).
    *   Global Analytics.

## Data Relationships

*   **User -> Statistics**: 1:1 relationship. Stats are calculated from the `Match` -> `Leg` -> `Throw` history where `player_id` matches.
*   **Club -> Users**: M:N relationship. A user can belong to multiple clubs (e.g., "Home Pub" and "Office League").
*   **Club -> Tournaments**: 1:N relationship. Tournaments belong to a specific club.

## Questions for Refinement
1.  **Club Membership**: Can a user belong to *multiple* clubs, or just one? (Assumed multiple above).
2.  **Guest Conversion**: Do we want a flow to "Claim" a guest session later? (e.g., "That was a great game, scan this QR to save it to your new account").
3.  **Authentication**: Email/Password only for MVP, or do we need Google/Apple login immediately?
