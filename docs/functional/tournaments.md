# Tournament Feature

## Overview
The Tournament feature allows Clubs to organize competitive events. It bridges the gap between **Club Management** (organizers), **Players** (participants), and **Devices** (physical scoreboards).

## Roles & Responsibilities

### Club (Organizer)
*   **Create Tournament**: Sets name, date, format (e.g., Single Elimination, Round Robin), and rules (501, Best of 3).
*   **Manage Players**: Adds players to the roster.
*   **Control Center**: A dashboard to view the bracket, assign matches to specific boards, and monitor progress.

### Player (Participant)
*   **Invitation**: Players are added to the tournament by the Club.
    *   *Open Question*: Should players "Accept" an invite, or is it auto-assigned? (See below).
*   **Participation**: Players go to their assigned board and play.
*   **History**: Tournament results are permanently linked to their profile stats.

## Device Integration (The "Connected Board")

This is the critical link. The physical tablets must know they are part of a tournament.

### Workflow
1.  **Setup**: Club Admin registers tablets as "Board 1", "Board 2", etc.
2.  **Assignment**: In the Tournament Control Center, the Admin assigns "Match A vs B" to "Board 1".
3.  **Device State**:
    *   **Idle/Practice**: Tablet shows standard "Select Game" menu.
    *   **Tournament Mode**: When a match is assigned, the tablet **automatically locks** into that match.
        *   Screen changes to: "Tournament Match: Player A vs Player B".
        *   "Start Match" button appears.
        *   Settings are locked (players cannot change rules).
4.  **Result**: When the match ends, the tablet sends the result to the server and returns to "Waiting for next match" state.

## Future Enhancements
*   **Auto-Lock**: Strict "Kiosk Mode" where the tablet *only* allows the assigned match and prevents exiting to the main menu during tournament hours.
*   **Self-Service Check-in**: Players scan a QR code on the board to tell the system "We are here and ready".

## Questions for Refinement
1.  **Player Acceptance**:
    *   *Option A (Strict)*: Admin adds Player -> Player *must* click "Accept" in app -> Added to Bracket.
    *   *Option B (Club Managed)*: Admin simply adds Players (by username or guest name). No acceptance needed. (Faster for local club nights).
2.  **Bracket Seeding**: Random shuffle or Manual drag-and-drop?
3.  **Device Override**: What if a tablet breaks? Can the Admin manually enter scores from the Control Center?
