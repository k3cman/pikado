# Pikado Functional Architecture

This chart visualizes the interactions between the core functional modules of Pikado based on the documentation in `docs/functional`.

```mermaid
graph TD
    %% Actors
    Guest((Guest))
    Player((Player))
    Manager((Club Manager))
    Admin((Platform Admin))

    %% Subsystems
    subgraph IAM [IAM & User System]
        Auth[Authentication]
        Profile[User Profile]
        Stats[Global Stats & History]
    end

    subgraph Club [Club Management]
        Roster[Member Roster]
        Groups[Player Groups]
        ClubProfile[Club Profile & News]
    end

    subgraph Tournament [Tournament System]
        TourneySetup[Tournament Setup]
        Bracket[Bracket Engine]
        ControlCenter[Control Center]
    end

    subgraph Gameplay [Scorekeeping & Gameplay]
        Scorepad[Scorekeeping Interface]
        GameEngine[Game Engine 501/Cricket]
        Training[Training Drills]
    end

    subgraph Device [Device Layer]
        Tablet[Connected Tablet/Board]
        BigScreen[Big Screen / TV Mode]
    end

    subgraph Social [Social & Community]
        Feed[Activity Feed]
        CommunityEvents[User-Organized Events]
    end

    %% Relationships

    %% IAM
    Guest -->|Anonymous Play| Scorepad
    Player -->|Login| Auth
    Manager -->|Login| Auth
    Admin -->|Login| Auth
    Auth --> Profile
    Profile --> Stats

    %% Club Management
    Manager -->|Manages| Club
    Club -->|Organizes| Tournament
    Player -->|Joins| Club

    %% Tournament Flow
    Manager -->|Configures| TourneySetup
    TourneySetup --> Bracket
    Bracket -->|Assigns Matches| ControlCenter
    ControlCenter -->|Locks Device| Tablet

    %% Gameplay Flow
    Player -->|Plays| Scorepad
    Tablet -->|Runs| Scorepad
    Scorepad -->|Input| GameEngine
    GameEngine -->|Updates| Stats
    GameEngine -->|Real-time Updates| BigScreen
    GameEngine -->|Real-time Updates| Feed

    %% Social
    Player -->|Creates| CommunityEvents
    Player -->|Interacts| Feed
    CommunityEvents -->|Uses| Scorepad

    %% Training
    Player -->|Practices| Training
    Training -->|Updates| Stats

    %% Styling
    classDef actor fill:#f9f,stroke:#333,stroke-width:2px;
    class Guest,Player,Manager,Admin actor;
    
    classDef system fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    class IAM,Club,Tournament,Gameplay,Device,Social system;
```

## Module Breakdown

### 1. IAM & Users
*   **Guests** can play immediately but don't save stats.
*   **Players** have profiles, stats, and history.
*   **Managers** run clubs and tournaments.

### 2. Club Management
*   Managers control rosters and groups.
*   Groups are used to quickly populate tournaments.

### 3. Tournaments
*   The **Control Center** is the brain.
*   It pushes match assignments to **Connected Tablets**, locking them into "Tournament Mode".

### 4. Gameplay (Scorekeeping)
*   The core engine supports 501, Cricket, and Training.
*   It feeds data to **Global Stats** and **Live Scoring** (Big Screen).

### 5. Social
*   Players can organize their own "Community Events" outside of clubs.
*   Activity Feed broadcasts achievements (e.g., "180!").
