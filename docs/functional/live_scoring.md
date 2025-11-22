# Live Scoring & Spectator Mode

## Overview
This feature allows spectators, club patrons, and remote fans to watch matches in real-time. It turns a local game into a broadcast event.

## Features

### 1. The "Big Screen" (TV Mode)
*   **Use Case**: A large TV mounted in the club displaying the "Main Event" or a summary of all active boards.
*   **Views**:
    *   **Featured Match**: Full-screen view of a single high-stakes match. Shows large scores, current player, and last throw.
    *   **Multi-Board Overview**: Grid view showing the score of *all* active boards in the club (e.g., 8 matches at once).
    *   **Tournament Bracket**: Auto-rotating view of the current tournament tree.

### 2. Remote Spectating (Web/Mobile)
*   **Use Case**: A friend watching from home.
*   **Access**: Shareable link (e.g., `pikado.com/live/club-a/match-123`).
*   **Latency**: Real-time updates (WebSocket pushed) with <1s delay.

### 3. Visual Experience
*   **Animations**:
    *   "180!" celebration animation.
    *   "Game Shot" (Checkout) visual flare.
*   **Caller Audio**: Optional Text-to-Speech or pre-recorded "One Hundred and Eighty!" audio announcements.

## Technical Requirements
*   **WebSockets**: Critical for sub-second updates.
*   **Responsive Design**: "TV Mode" needs to scale to 4K screens, while "Mobile Spectator" fits on a phone.

## Questions for Refinement
1.  **Audio**: Do we want audio announcements on the "Big Screen"? (Can be noisy in a pub environment). *Recommendation: Off by default.*
2.  **Ads/Sponsorship**: Clubs might want to display sponsor logos on the Big Screen view.
