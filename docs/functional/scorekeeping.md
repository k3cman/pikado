# Scorekeeping Feature Requirements

## Overview
The core feature of the application is a robust scorekeeping interface for Darts. The initial focus is on two game types: **501** (X01) and **Cricket**. The interface is designed for tablet use with a large, accessible numpad and clear statistical feedback, inspired by "MyDartsTraining".

### Universal Usage (Standalone Module)
This scorekeeping interface is the **single source of truth** for all gameplay. It is designed to be "Context Agnostic":
*   **Guest Mode**: A walk-in player uses it immediately without login.
*   **Casual Play**: Registered users log in to track stats, but play a friendly match.
*   **Tournament Mode**: The *exact same interface* is used, but the "Match Settings" are locked/pre-filled by the tournament engine.

## Game Modes

### 1. X01 (501)
*   **Standard Rules**: Start from 501 (or 301, 701, etc.), count down to 0.
*   **Ending**: Double Out (standard). Options for Single Out / Master Out yes.
*   **Scoring Input**: Enter score per throw (3 darts total).
*   **Display**:
    *   Current Score (Large).
    *   Legs/Sets won.
    *   Checkout suggestions (when in finish range).
    *   Throw history (current leg).

### 2. Cricket
*   **Targets**: 20, 19, 18, 17, 16, 15, Bull.
*   **Scoring**: Hit target 3 times to "close" it. Subsequent hits score points if opponent hasn't closed it.
*   **Winning**: Close all numbers and have equal or higher points.
*   **Display**:
    *   Scoreboard grid (Standard "Chalkboard" style).
    *   Marks for each number (/, X, O).
    *   Current point total.

## User Interface

### Input Area (Grid Layout)
*   **Reference Style**: "MyDartsTraining" Grid Layout.
*   **Structure**:
    *   **Modifiers Row**: Large "Double" and "Triple" toggle buttons at the top of the input area.
    *   **Number Grid**: 5x4 grid containing numbers 1 through 20.
    *   **Bottom Row**:
        *   **CLR** (Red): Clear current entry.
        *   **Bull**: Single/Double Bull toggle or separate entry.
        *   **Help** (Blue): Contextual help or checkout guide.
        *   **Miss**: Record a missed dart (0 score).
        *   **OK** (Green): Confirm turn / Next Player.
*   **Input Logic**:
    *   **Per-Dart Entry**: User enters each dart individually (e.g., "T20", "S20", "S20").
    *   **Feedback**: Display the sequence of darts thrown in the current turn (e.g., "S7 / S7 / S11").

### Visual Feedback & Layout
*   **Header**: Game Type (e.g., "501 - Double Out"), Back, Undo, Settings.
*   **Scoreboard**:
    *   Split view for Player 1 vs Player 2.
    *   **Active Player**: Highlighted background (e.g., Green) with large current score.
    *   **Inactive Player**: Dimmed background (e.g., Grey).
    *   **Stats**: Display "Avg" (3-dart average) immediately below the main score.
*   **Match Status Bar**:
    *   Small bar showing Sets/Legs count (e.g., "0 | S/L | 0").
*   **Current Turn Display**:
    *   Shows the specific darts thrown so far in this turn.
    *   Shows the sum of the current turn.

## Statistics (Real-time)
*   **X01 Stats**:
    *   3-Dart Average.
    *   Last Throw score.
    *   Checkout % (optional for MVP?).
*   **Cricket Stats**:
    *   Marks per round (MPR).
    *   Points per round (PPR).

### Cricket Input Strategy (Recommendation)
*   **Consistency**: Use the **same 1-20 Grid** as 501. This builds muscle memory and avoids jarring UI transitions.
*   **Visual Cues**: In Cricket mode, numbers 1-14 are **dimmed** (but still active, as they might be needed for rare variants or mis-clicks). Numbers 15-20 and Bull are **highlighted**.
*   **Interaction**:
    *   Tap "20" -> Adds 1 Mark (Slash).
    *   Tap "Triple" + "20" -> Adds 3 Marks (Circle).
    *   Tap "Double" + "Bull" -> Adds 2 Marks (X).
    *   Score calculation is automatic based on open/closed state.

## Finalized Scope
*   **Game Modes**: 501 (Double Out), Cricket.
*   **Players**: Head-to-Head (2 Players) AND Solo Practice.
*   **Bot/CPU**: **Excluded** from MVP.

## Business & Operational Context
*   **Device Identity**: The app must know *which* board it is (e.g., "Club A - Board 1"). This is critical for the central "Control Center" to display the correct match on the big screen.
    *   *Requirement*: Simple "Pairing/Login" screen for the tablet setup.
*   **Match Context**:
    *   **Tournament Mode**: Settings (Legs, Sets, Rules) are **locked** by the server. Players cannot change them.
    *   **Practice/Ad-hoc Mode**: Players have full control to change settings.
*   **Data Integrity (Offline Safety)**:
    *   *Risk*: Wi-Fi drops during a tournament final.
    *   *Requirement*: Scores must be saved **locally** on the device first. If connection is lost, the game continues, and data syncs when reconnected.
*   **User Retention**:
    *   *Requirement*: "Guest" vs "Registered Player" selection.
    *   *Goal*: Encourage users to select their profile to track stats (Averages, 180s), driving engagement.
