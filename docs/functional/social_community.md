# Social & Community Features

## Overview
This module transforms the platform from a strict "Club Management" tool into a **Social Network for Darts**. It empowers individual users to organize their own events and interact with the community, independent of official Club structures.

## Features

### 1. User-Organized Tournaments ("Community Events")
*   **Concept**: Any user can be an organizer. Think "Pickup Games" or "Private Leagues".
*   **Use Cases**:
    *   Friends playing at a garage.
    *   Ad-hoc tournament at a bar that doesn't use the official Club system.
*   **Functionality**:
    *   **Create Event**: Similar to Club Tournaments but simplified.
    *   **Invite Friends**: Direct invites via username, link sharing, or QR code.
    *   **Open/Public**: Option to make the tournament "Open to nearby players".
    *   **Self-Scoring**: Since there might not be "Official Tablets", players use their own phones as scoreboards (PWA/Mobile View).

### 2. The "Darts Feed" (Social Network)
*   **Activity Stream**:
    *   "John Doe just hit a 180!"
    *   "Jane Smith won the 'Friday Night Cup'."
    *   "Club A posted an announcement: New Boards!"
*   **Interactions**:
    *   Like / Comment on match results.
    *   "Challenge" a player (sends a match request).
*   **Discovery**:
    *   Find tournaments happening *now* or *near me*.
    *   Find players looking for a match.

### 3. Friend System
*   **Follow/Friend**: Track stats of rivals and friends.
*   **Rivalry Stats**: Head-to-Head record against specific friends.

## Integration with Core
*   **Scorekeeping**: User-organized tournaments use the same scoring engine, but likely run on **personal devices** (BYOD) rather than fixed club tablets.
*   **Stats**: These matches count towards "Global Stats" but might be filtered out of "Official Club Rankings" to prevent cheating/stat-padding.

## Questions for Refinement
1.  **Trust/Cheating**: If users organize their own ranked tournaments, how do we prevent them from faking 180s to boost stats? *Recommendation: Separate "Verified" (Club) vs "Unverified" (Social) stats.*
2.  **Monetization**: Are user-organized tournaments free, or is there a limit (e.g., "Create 1 free tournament/month")?
