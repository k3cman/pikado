# User Profile & Statistics

## Overview
The User Profile is the central hub for a player's identity and performance data. It transforms raw match data into actionable insights and visual progression.

## Core Features

### 1. Profile Header (Identity)
*   **Visuals**: Avatar, Username, "Member Since" date.
*   **Badges/Rank**: Display Club Ranks (e.g., "Club A - Gold League") or Global Levels.
*   **Bio**: Short text description.

### 2. Performance Dashboard (The "Stats")
*   **Global Averages**:
    *   **3-Dart Average**: The gold standard metric (e.g., 65.4).
    *   **First 9 Average**: Average score of the first 3 turns (indicates scoring power).
    *   **Checkout %**: Success rate on doubles (e.g., 35%).
*   **Best Performances**:
    *   Highest Checkout (e.g., 170).
    *   Best Leg (e.g., 14 darts).
    *   Most 180s in a match.

### 3. Visual Analytics (Graphs & Charts)
*   **Progression Graph**: Line chart showing 3-Dart Average over the last 30/90/365 days. *Goal: Show improvement.*
*   **Heatmap**: Visual representation of dartboard targets hit.
    *   *Red zones* on T20, T19, D16.
    *   Helps identify drift or weak spots.
*   **Win/Loss Pie Chart**: Breakdown by game type (501 vs Cricket).

### 4. Match History
*   **List View**: Chronological list of recent matches.
*   **Details**: Click to view the full scorecard of a past match.
*   **Opponent Stats**: "Head-to-Head" record vs specific opponents.

## Privacy Settings
*   **Visibility**:
    *   **Public**: Everyone can see full stats.
    *   **Friends Only**: Only accepted friends.
    *   **Private**: Only the user.

## Questions for Refinement
1.  **Granularity**: Do we store *every* dart coordinate for the Heatmap, or just the segment hit? (Storing coordinates requires high-precision input, usually not available on standard touch numpads). *Recommendation: Segment-based Heatmap (T20, S20, etc.) unless we have smartboard integration.*
