# Club Management & Groups

## Overview
This feature allows Club Admins to manage their community. It goes beyond a simple list of users by allowing the creation of **Player Groups** (subsets) for easier organization and tournament creation.

## Features

### 1. Member Roster (The "All Members" List)
*   **Description**: The master list of every user who has joined the club.
*   **Data**: Name, Username, Global Stats, Club-Specific Stats (Rank/Rating).
*   **Actions**:
    *   Invite User (via Email or Link).
    *   Remove User.
    *   Assign Role (Admin, Scorer, Player).

### 2. Player Groups (Custom Lists)
*   **Goal**: Organize members into logical subsets for bulk actions.
*   **Use Cases**:
    *   *Leagues*: "Thursday Night League", "Pro Division".
    *   *Teams*: "The Bullseyes", "Dart Vaders".
    *   *Skill Levels*: "Beginners", "Advanced".
*   **Functionality**:
    *   Create/Edit/Delete Groups.
    *   Add/Remove Members from Groups.
    *   **Bulk Invite**: "Add 'Thursday Night League' to Tournament" (One click adds all 16 players).

### 3. Club Profile & Discovery
*   **Public Page**: Club Name, Location, Description, Logo.
*   **Join Requests**: Users can request to join; Admins approve/deny.
*   **Announcements (News Feed)**:
    *   **Broadcast**: Admins can post updates (e.g., "Tournament this Friday!", "New Boards Installed").
    *   **Notifications**: Members receive push/in-app notifications.
    *   **Visibility**: Public (for potential members) or Private (Members Only).

## Integration with Tournaments
*   **Smart Seeding**: Use Club Rankings to seed tournaments automatically.
*   **Quick Setup**: Instead of adding players one by one, select a "Group" to populate the bracket.

## Questions for Refinement
1.  **Group Structure**: Are groups just "Tags" (a player can be in many) or "Teams" (mutually exclusive)? *Recommendation: Tags/Lists (flexible).*
2.  **Permissions**: Can "Group Leaders" exist? (e.g., Captain of a team can manage that specific group).
