# React Hands-On Learning Plan

## Senior React Interview Preparation

**Goal**: Prepare for senior React pair-coding interview by building hands-on experience with modern React patterns, state management, and data fetching.

**Background**: Senior Frontend Developer (Vue/Angular/Capacitor) with conceptual React knowledge, needs practical implementation experience.

---

## 📋 Table of Contents

1. [Learning Objectives](#learning-objectives)
2. [Hands-On Refactoring Tasks (In This Repo)](#hands-on-refactoring-tasks-in-this-repo)
3. [Phase 1: React Fundamentals Review](#phase-1-react-fundamentals-review)
4. [Phase 2: State Management Migration (Redux → Zustand)](#phase-2-state-management-migration-redux--zustand)
5. [Phase 3: Data Fetching (React Query + Supabase)](#phase-3-data-fetching-react-query--supabase)
6. [Phase 4: Advanced Patterns & Optimization](#phase-4-advanced-patterns--optimization)
7. [Phase 5: Interview Preparation](#phase-5-interview-preparation)
8. [Common React Gotchas (Vue/Angular → React)](#common-react-gotchas-vueangular--react)
9. [Daily Practice Checklist](#daily-practice-checklist)

---

## 🎯 Learning Objectives

### Core Skills to Master

- [ ] React Hooks (useState, useEffect, useMemo, useCallback, custom hooks)
- [ ] Component composition and prop drilling solutions
- [ ] State management with Zustand (replacing Redux)
- [ ] Server state with React Query (TanStack Query)
- [ ] TypeScript with React (proper typing patterns)
- [ ] Performance optimization (memoization, re-render prevention)
- [ ] Common React patterns (render props, compound components, etc.)

### Interview-Ready Topics

- [ ] Explain React rendering cycle and when components re-render
- [ ] Implement optimistic updates with rollback
- [ ] Handle async operations and loading states
- [ ] Optimize component performance
- [ ] Debug React issues (DevTools, console)
- [ ] Write testable, maintainable components

---

## 🔨 Hands-On Refactoring Tasks (In This Repo)

**These are specific files and patterns in your codebase that you can refactor, improve, and learn from. Start with these instead of building from scratch!**

### 🎯 Component Refactoring Tasks

#### 1. **GamePlayers Component** (`src/features/game/components/GamePlayers.tsx`)

**Current State**: Empty placeholder component
**Tasks:**

- [ ] Implement player list display
- [ ] Add "Add Player" functionality with form
- [ ] Add player name editing
- [ ] Add player deletion
- [ ] Use `useState` for local player management
- [ ] Later: Connect to Zustand store
- [ ] Later: Connect to Supabase for persistencesse

**Learning Points:**

- Form handling in React
- List rendering with keys
- Conditional rendering
- Event handlers

---

#### 2. **GameForm Component** (`src/features/game/components/GameForm.tsx`)

**Current State**: Uses react-hook-form, has commented code, empty cricket mode
**Tasks:**

- [ ] Remove commented code (lines 13-18, 59-122 in KeypadX01)
- [ ] Add form validation with error messages
- [ ] Implement cricket-specific form fields (currently empty)
- [ ] Extract form field components for reusability
- [ ] Add form state management with `useState` (alternative to react-hook-form)
- [ ] Add loading states for form submission
- [ ] Improve TypeScript types (remove `any` types)

**Learning Points:**

- Controlled vs uncontrolled components
- Form validation patterns
- Component composition
- TypeScript with forms

---

#### 3. **KeypadX01 Component** (`src/features/game/components/keypads/KeypadX01.tsx`)

**Current State**: Has large commented-out code block, uses compound component pattern
**Tasks:**

- [ ] Remove all commented code (lines 59-122)
- [ ] Extract button styles to constants or use `useMemo`
- [ ] Create reusable `KeypadButton` component
- [ ] Optimize re-renders with `React.memo` for buttons
- [ ] Extract multiplier logic to custom hook `useMultiplier`
- [ ] Add keyboard shortcuts support
- [ ] Add haptic feedback (if on mobile)
- [ ] Improve accessibility (ARIA labels, keyboard navigation)

**Learning Points:**

- Component memoization
- Custom hooks extraction
- Performance optimization
- Accessibility in React

---

#### 4. **KeypadCricket Component** (`src/features/game/components/keypads/KeypadCricket.tsx`)

**Current State**: Similar structure to KeypadX01
**Tasks:**

- [ ] Review and apply same refactoring as KeypadX01
- [ ] Extract shared keypad logic to custom hook
- [ ] Create shared `KeypadButton` component
- [ ] Identify and extract common patterns between both keypads

**Learning Points:**

- Code reuse and DRY principles
- Shared component patterns
- Custom hooks for shared logic

---

#### 5. **ScoreBoard Component** (`src/features/game/components/ScoreBoard.tsx`)

**Current State**: Read-only, uses Redux, has commented dart indicators
**Tasks:**

- [ ] Uncomment and implement dart indicators (lines 34-44)
- [ ] Add animation for score changes
- [ ] Add turn history display
- [ ] Extract `PlayerCard` as separate component
- [ ] Add `React.memo` to prevent unnecessary re-renders
- [ ] Add loading skeleton state
- [ ] Later: Migrate from Redux to Zustand

**Learning Points:**

- Component extraction
- Performance optimization
- Animation in React
- Conditional rendering patterns

---

#### 6. **GamePage Component** (`src/features/game/pages/GamePage.tsx`)

**Current State**: Uses Redux, has `useMemo` with dispatch dependency
**Tasks:**

- [ ] Extract layout to separate component
- [ ] Add error boundary
- [ ] Add loading states
- [ ] Improve `useMemo` dependencies (will change after Zustand migration)
- [ ] Add keyboard shortcuts for common actions
- [ ] Add game pause/resume functionality
- [ ] Later: Migrate to Zustand

**Learning Points:**

- Error boundaries
- Layout components
- `useMemo` optimization
- Advanced hook patterns

---

#### 7. **GameSetupPage Component** (`src/features/game/pages/GameSetupPage.tsx`)

**Current State**: Uses Redux, react-hook-form, basic validation
**Tasks:**

- [ ] Add form validation with error display
- [ ] Add loading state during game start
- [ ] Add success/error toast notifications
- [ ] Extract form submission logic to custom hook
- [ ] Add "Cancel" button with navigation
- [ ] Add form reset functionality
- [ ] Improve error handling
- [ ] Later: Migrate to Zustand

**Learning Points:**

- Form handling patterns
- Custom hooks for business logic
- Error handling
- Navigation patterns

---

#### 8. **SelectGamePage Component** (`src/features/game/pages/SelectGamePage.tsx`)

**Current State**: Simple, functional
**Tasks:**

- [ ] Add game mode descriptions/tooltips
- [ ] Add icons for each game mode
- [ ] Add animation on hover/click
- [ ] Extract game modes to configuration file
- [ ] Add "Recent Games" section
- [ ] Add game mode preview/instructions

**Learning Points:**

- Component enhancement
- Configuration patterns
- Animation libraries
- UI/UX improvements

---

### 🏗️ Architecture & Pattern Improvements

#### 9. **KeypadFactory** (`src/features/game/components/keypads/KeypadFactory.tsx`)

**Current State**: Simple factory function returning JSX
**Tasks:**

- [ ] Convert to proper React component
- [ ] Use React component pattern instead of factory function
- [ ] Add error handling for invalid modes
- [ ] Add TypeScript discriminated unions for type safety
- [ ] Consider using a registry pattern for extensibility

**Learning Points:**

- Factory patterns in React
- Type safety with TypeScript
- Component vs function patterns

---

#### 10. **GameStrategy Pattern** (`src/features/game/strategies/`)

**Current State**: Class-based strategies with Redux dispatch
**Tasks:**

- [ ] Convert class-based to functional/hook-based strategies
- [ ] Create `useGameStrategy` custom hook
- [ ] Remove Redux dependency from strategies
- [ ] Add strategy-specific state management
- [ ] Implement strategy pattern with hooks instead of classes

**Learning Points:**

- Class to functional component migration
- Strategy pattern with hooks
- Custom hooks for business logic
- Dependency injection patterns

---

#### 11. **Router Configuration** (`src/router/index.ts`)

**Current State**: Basic routing setup
**Tasks:**

- [ ] Add route guards (protected routes)
- [ ] Add loading states for route transitions
- [ ] Add error boundaries per route
- [ ] Add route-based code splitting with `React.lazy`
- [ ] Add route metadata/SEO
- [ ] Add 404 page

**Learning Points:**

- React Router advanced patterns
- Code splitting
- Route protection
- Performance optimization

---

#### 12. **Empty Pages** (`src/pages/ScoreboardPage.tsx`, `StatisticsPage.tsx`, `ProfilePage.tsx`)

**Current State**: Placeholder "Coming soon" pages
**Tasks:**

- [ ] **ScoreboardPage**: Implement game history list
- [ ] **ScoreboardPage**: Add filtering and sorting
- [ ] **ScoreboardPage**: Add pagination
- [ ] **StatisticsPage**: Add player statistics charts
- [ ] **StatisticsPage**: Add game mode statistics
- [ ] **ProfilePage**: Add user profile form
- [ ] **ProfilePage**: Add settings
- [ ] All: Add loading skeletons
- [ ] All: Add error states
- [ ] All: Connect to Supabase data

**Learning Points:**

- Building complete features
- Data fetching patterns
- List rendering and pagination
- Chart integration (if using charts)

---

### 🔧 State Management Tasks

#### 13. **Redux to Zustand Migration** (Multiple files)

**Current State**: Redux Toolkit setup
**Tasks:**

- [ ] Create Zustand store (`useGameStore.ts`)
- [ ] Migrate `gameSlice.ts` logic to Zustand
- [ ] Replace `useAppSelector` in `ScoreBoard.tsx`
- [ ] Replace `useDispatch` in `GameSetupPage.tsx`
- [ ] Replace hooks in `GamePage.tsx`
- [ ] Update `GameStrategy` to use Zustand
- [ ] Remove Redux Provider from `main.tsx`
- [ ] Delete Redux files and dependencies
- [ ] Add Zustand devtools
- [ ] Add persistence middleware

**Learning Points:**

- State management migration
- Comparing Redux vs Zustand patterns
- Store architecture
- Middleware patterns

---

### 🎨 UI/UX Improvements

#### 14. **App Component** (`src/App.tsx`)

**Current State**: Simple menu
**Tasks:**

- [ ] Add animations/transitions
- [ ] Add active route highlighting
- [ ] Add user avatar/profile link
- [ ] Add dark/light theme toggle
- [ ] Add keyboard navigation
- [ ] Improve responsive design
- [ ] Add loading states

**Learning Points:**

- Navigation patterns
- Theme management
- Responsive design
- Accessibility

---

#### 15. **RootLayout Component** (`src/components/layouts/RootLayout.tsx`)

**Current State**: Basic layout wrapper
**Tasks:**

- [ ] Add navigation header
- [ ] Add footer
- [ ] Add sidebar (if needed)
- [ ] Add breadcrumbs
- [ ] Add global error boundary
- [ ] Add global loading indicator
- [ ] Add toast notification system

**Learning Points:**

- Layout patterns
- Global state management
- Error handling
- Notification systems

---

### 🧪 Code Quality Improvements

#### 16. **TypeScript Improvements**

**Tasks:**

- [ ] Remove all `any` types
- [ ] Add proper types for all props
- [ ] Add generic types where applicable
- [ ] Improve type inference
- [ ] Add strict TypeScript checks
- [ ] Add JSDoc comments for complex functions

**Learning Points:**

- Advanced TypeScript patterns
- Type safety
- Documentation

---

#### 17. **Performance Optimization**

**Tasks:**

- [ ] Add `React.memo` to expensive components
- [ ] Optimize `useMemo` and `useCallback` usage
- [ ] Add code splitting for routes
- [ ] Optimize bundle size
- [ ] Add performance monitoring
- [ ] Profile and fix re-render issues

**Learning Points:**

- React performance patterns
- Profiling tools
- Optimization techniques

---

#### 18. **Error Handling**

**Tasks:**

- [ ] Add Error Boundaries to all major sections
- [ ] Add error logging
- [ ] Add user-friendly error messages
- [ ] Add retry mechanisms for failed operations
- [ ] Add offline error handling

**Learning Points:**

- Error boundary patterns
- Error handling strategies
- User experience

---

### 📦 New Features to Build

#### 19. **Game History & Undo System**

**Tasks:**

- [ ] Implement undo functionality (button exists but not working)
- [ ] Add game history tracking
- [ ] Add redo functionality
- [ ] Add history visualization
- [ ] Persist history to localStorage/Supabase

**Learning Points:**

- State history management
- Command pattern
- Local storage patterns

---

#### 20. **Real-time Multiplayer** (After Supabase setup)

**Tasks:**

- [ ] Add Supabase realtime subscriptions
- [ ] Sync game state between players
- [ ] Handle conflicts and race conditions
- [ ] Add player presence indicators
- [ ] Add chat functionality

**Learning Points:**

- Real-time data synchronization
- Conflict resolution
- WebSocket patterns

---

### 🎯 Priority Order for Learning

**Week 1 Focus:**

1. GamePlayers component (start simple)
2. KeypadX01 cleanup (remove comments, extract components)
3. ScoreBoard enhancements (uncomment features)
4. GameForm improvements (validation, cricket fields)

**Week 2 Focus:** 5. Redux → Zustand migration (all components) 6. GameStrategy refactoring (class to hooks) 7. Error boundaries and loading states

**Week 3 Focus:** 8. Supabase integration (GamePlayers, ScoreboardPage) 9. React Query setup 10. Optimistic updates

**Week 4 Focus:** 11. Performance optimization 12. Advanced patterns 13. Empty pages implementation 14. Polish and interview prep

---

### 💡 Tips for Each Task

- **Start small**: Pick one component, understand it fully, then refactor
- **Test as you go**: Make sure things still work after each change
- **Commit often**: Use git to save your progress
- **Read the code first**: Understand what it does before changing it
- **Ask "why"**: Understand the current pattern before replacing it
- **Compare patterns**: Try different approaches and see which feels better

---

## 📚 Phase 1: React Fundamentals Review

### 1.1 Hooks Deep Dive

**Practice Exercises:**

- [ ] **useState**: Convert class component patterns to hooks
- [ ] **useEffect**: Understand dependency arrays, cleanup functions
- [ ] **useMemo**: Optimize expensive calculations
- [ ] **useCallback**: Prevent unnecessary re-renders
- [ ] **Custom Hooks**: Extract reusable logic

**Key Concepts:**

```typescript
// Dependency Array Rules
useEffect(() => {
  // Runs on every render
}, []); // Empty = mount/unmount only
}, [dep1, dep2]); // Runs when deps change
// No array = runs every render (usually wrong!)

// Cleanup Pattern
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe(); // Cleanup
}, []);
```

**Hands-On Task:**

- Refactor existing components to use hooks properly
- Create custom hooks for game logic (e.g., `useGameTurn`, `useScoreCalculation`)

### 1.2 Component Patterns

**Practice:**

- [ ] Controlled vs Uncontrolled components
- [ ] Lifting state up
- [ ] Composition over inheritance
- [ ] Render props pattern
- [ ] Compound components

**Vue/Angular → React Differences:**

```typescript
// Vue: v-model
// React: Controlled component
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />;

// Vue: computed
// React: useMemo
const computed = useMemo(() => expensiveCalc(data), [data]);

// Angular: @Input/@Output
// React: Props (one-way data flow)
```

### 1.3 TypeScript with React

**Practice:**

- [ ] Component prop types
- [ ] Hook return types
- [ ] Generic components
- [ ] Event handler types

```typescript
// Component Props
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

// Custom Hook Types
function useGameState(): {
  players: Player[];
  currentPlayer: Player | null;
  updateScore: (playerId: string, score: number) => void;
} {
  // ...
}
```

---

## 🔄 Phase 2: State Management Migration (Redux → Zustand)

### 2.1 Understanding Current Redux Setup

**Current State:**

- Redux Toolkit store in `src/app/store.ts`
- Game slice in `src/features/game/store/gameSlice.ts`
- Typed hooks in `src/app/hooks.ts`
- Used in: `GamePage`, `ScoreBoard`, `GameSetupPage`

**Redux Patterns Used:**

- `createSlice` with reducers
- `createSelector` for computed values
- Typed `useSelector` and `useDispatch`

### 2.2 Installation & Setup

```bash
# Install Zustand
pnpm add zustand

# Optional: Immer for immutable updates (if you want Redux-like syntax)
pnpm add immer
```

### 2.3 Migration Plan (Component by Component)

#### Step 1: Create Zustand Store

**File**: `src/features/game/store/useGameStore.ts`

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, Player } from "../types";

interface GameStore extends GameState {
  // Actions
  startGame: (config: Partial<GameState>) => void;
  throwDart: (points: number) => void;
  updatePlayerScore: (playerId: string, score: number) => void;
  switchTurn: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  mode: "501",
  bestOfLegs: 3,
  bestOfSets: 3,
  startScore: undefined,
  inputFormat: "score",
  history: [],
  players: [],
  currentPlayerId: "",
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startGame: (config) =>
        set((state) => ({
          ...state,
          ...config,
        })),

      throwDart: (points) => {
        const state = get();
        const player = state.players.find(
          (p) => p.id === state.currentPlayerId
        );
        if (!player) return;

        // Update score optimistically
        set((state) => ({
          players: state.players.map((p) =>
            p.id === state.currentPlayerId
              ? { ...p, score: p.score - points }
              : p
          ),
        }));
      },

      // ... other actions
    }),
    {
      name: "game-storage",
      partialize: (state) => ({
        players: state.players,
        currentPlayerId: state.currentPlayerId,
        mode: state.mode,
      }),
    }
  )
);
```

**Learning Points:**

- Direct mutations vs immutable updates
- Selector patterns (Zustand auto-selects, no need for `createSelector`)
- Persistence middleware
- TypeScript inference

#### Step 2: Migrate Components (One at a Time)

**Order of Migration:**

1. **ScoreBoard.tsx** (Read-only, simplest)

   - Replace `useAppSelector` with `useGameStore`
   - Learn: Selector patterns, re-render behavior

   ```typescript
   // Before (Redux)
   const { players, currentPlayerId } = useAppSelector((state) => state.game);

   // After (Zustand)
   const players = useGameStore((state) => state.players);
   const currentPlayerId = useGameStore((state) => state.currentPlayerId);

   // Or combine (but causes extra re-renders)
   const { players, currentPlayerId } = useGameStore((state) => ({
     players: state.players,
     currentPlayerId: state.currentPlayerId,
   }));
   ```

2. **GameSetupPage.tsx** (Action dispatch)

   - Replace `useDispatch` with Zustand actions
   - Learn: Direct action calls vs dispatch pattern

   ```typescript
   // Before (Redux)
   const dispatch = useDispatch();
   dispatch(startGame({ mode: '501', ... }));

   // After (Zustand)
   const startGame = useGameStore((state) => state.startGame);
   startGame({ mode: '501', ... });
   ```

3. **GamePage.tsx** (Both patterns)

   - Replace both hooks
   - Learn: Combining selectors and actions
   - Note: `useMemo` dependency on `dispatch` changes

   ```typescript
   // Before
   const config = useAppSelector(selectGameConfig);
   const dispatch = useAppDispatch();
   const strategy = useMemo(
     () => createGameStrategy(config.mode, dispatch),
     [config.mode, dispatch]
   );

   // After
   const mode = useGameStore((state) => state.mode);
   const throwDart = useGameStore((state) => state.throwDart);
   const strategy = useMemo(
     () => createGameStrategy(mode, throwDart),
     [mode, throwDart]
   );
   ```

#### Step 3: Clean Up Redux

- [ ] Remove Redux Provider from `main.tsx`
- [ ] Delete `src/app/store.ts`
- [ ] Delete `src/app/hooks.ts`
- [ ] Remove Redux dependencies: `pnpm remove @reduxjs/toolkit react-redux`
- [ ] Update all imports

### 2.4 Advanced Zustand Patterns

**Practice:**

- [ ] Computed selectors (like `selectGameConfig`)
- [ ] Middleware (devtools, persist)
- [ ] Store splitting (if needed)
- [ ] Async actions
- [ ] Optimistic updates with rollback

```typescript
// Computed selector pattern
const useGameConfig = () =>
  useGameStore((state) => ({
    mode: state.mode,
    bestOfLegs: state.bestOfLegs,
    bestOfSets: state.bestOfSets,
    startScore: state.startScore,
    inputFormat: state.inputFormat,
  }));

// Async action with error handling
const saveGame = useGameStore((state) => state.saveGame);
const saveGame = async () => {
  set({ loading: true });
  try {
    await api.saveGame(get().gameState);
    set({ loading: false });
  } catch (error) {
    set({ loading: false, error });
    // Rollback optimistic update
  }
};
```

---

## 🌐 Phase 3: Data Fetching (React Query + Supabase)

### 3.1 Setup Supabase

**Steps:**

1. Create Supabase project at https://supabase.com
2. Get API keys (URL + anon key)
3. Create tables:
   - `players` (id, name, created_at)
   - `games` (id, mode, best_of_legs, created_at)
   - `scores` (id, game_id, player_id, score, turn_number)

**Install:**

```bash
pnpm add @supabase/supabase-js @tanstack/react-query
```

### 3.2 React Query Setup

**File**: `src/lib/queryClient.ts`

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

**File**: `src/main.tsx`

```typescript
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Wrap app with QueryClientProvider (remove Redux Provider)
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>;
```

### 3.3 Create Custom Hooks for Data Fetching

**File**: `src/lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**File**: `src/hooks/usePlayers.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// ✅ Fetch players - runs automatically on mount
export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// ✅ Create player - runs only when you call mutate()
export function useCreatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase
        .from("players")
        .insert({ name })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Refetch players list
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
}
```

**Key Learning:**

- `useQuery`: Automatic fetching, caching, refetching
- `useMutation`: Manual triggering, optimistic updates
- `queryClient.invalidateQueries`: Manual cache invalidation
- No `useEffect` needed for `useQuery`!

### 3.4 Integrate with Zustand (Optimistic Updates)

**Pattern: Zustand for client state, React Query for server sync**

```typescript
// Zustand: Optimistic update + localStorage
const throwDart = (points: number) => {
  set((state) => ({
    players: state.players.map((p) =>
      p.id === state.currentPlayerId ? { ...p, score: p.score - points } : p
    ),
  }));

  // Trigger server sync
  syncScoreMutation.mutate({ points });
};

// React Query: Server sync
const syncScoreMutation = useMutation({
  mutationFn: async ({ points }) => {
    const state = useGameStore.getState();
    return await supabase.from("scores").insert({
      game_id: state.gameId,
      player_id: state.currentPlayerId,
      score: points,
    });
  },
  onError: (error) => {
    // Rollback optimistic update if needed
    console.error("Failed to sync:", error);
  },
});
```

### 3.5 Practice Exercises

- [ ] Fetch players list on game setup
- [ ] Save game state to Supabase
- [ ] Implement optimistic updates for score changes
- [ ] Handle offline scenarios (queue syncs)
- [ ] Add real-time subscriptions (Supabase realtime)

---

## ⚡ Phase 4: Advanced Patterns & Optimization

### 4.1 Performance Optimization

**Practice:**

- [ ] `React.memo` for component memoization
- [ ] `useMemo` for expensive calculations
- [ ] `useCallback` for stable function references
- [ ] Code splitting with `React.lazy`
- [ ] Virtualization for long lists

```typescript
// Memoize component
const ScoreBoard = React.memo(({ players, currentPlayerId }) => {
  // Component logic
});

// Memoize expensive calculation
const totalScore = useMemo(
  () => players.reduce((sum, p) => sum + p.score, 0),
  [players]
);

// Stable callback
const handleThrow = useCallback(
  (points: number) => {
    throwDart(points);
  },
  [throwDart]
);
```

### 4.2 Common React Patterns

**Practice:**

- [ ] Compound components (e.g., `<Game><Game.Header /><Game.ScoreBoard /></Game>`)
- [ ] Render props
- [ ] Higher-order components (HOCs)
- [ ] Context API (when to use vs Zustand)
- [ ] Error boundaries

### 4.3 TypeScript Advanced Patterns

- [ ] Generic components
- [ ] Utility types (`Pick`, `Omit`, `Partial`)
- [ ] Discriminated unions
- [ ] Type guards

```typescript
// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}
```

---

## 🎤 Phase 5: Interview Preparation

### 5.1 Pair Coding Scenarios to Practice

**Common Tasks:**

1. **Build a component from scratch**

   - Given requirements, implement a feature
   - Think out loud, explain decisions
   - Handle edge cases

2. **Debug existing code**

   - Find and fix bugs
   - Optimize performance
   - Refactor for maintainability

3. **Add a feature to existing code**
   - Understand existing patterns
   - Follow code style
   - Write clean, testable code

### 5.2 Key Topics to Explain Clearly

**Be ready to explain:**

- [ ] React rendering cycle
- [ ] When components re-render
- [ ] useEffect dependency arrays
- [ ] State management choices (Zustand vs Redux vs Context)
- [ ] Server state vs client state
- [ ] Performance optimization strategies
- [ ] Testing React components

### 5.3 Practice Problems

**Implement these in your dart game:**

1. **Undo/Redo functionality**

   - Use Zustand to track history
   - Implement undo/redo actions
   - Handle edge cases

2. **Real-time multiplayer**

   - Use Supabase realtime
   - Sync game state between players
   - Handle conflicts

3. **Offline support**

   - Queue actions when offline
   - Sync when back online
   - Show sync status

4. **Performance optimization**
   - Memoize expensive calculations
   - Prevent unnecessary re-renders
   - Optimize large lists

### 5.4 Communication Tips

- **Think out loud**: Explain your thought process
- **Ask questions**: Clarify requirements
- **Discuss trade-offs**: Mention alternatives
- **Handle errors gracefully**: Show error handling
- **Write clean code**: Follow React best practices

---

## ⚠️ Common React Gotchas (Vue/Angular → React)

### 1. useEffect Dependency Arrays

```typescript
// ❌ Wrong - missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // userId changes but effect doesn't re-run

// ✅ Correct
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 2. State Updates are Async

```typescript
// ❌ Wrong - state might be stale
setCount(count + 1);
setCount(count + 1); // Uses old count

// ✅ Correct - functional update
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

### 3. Object/Array Comparisons

```typescript
// ❌ Wrong - new object every render
const config = { mode: "501", legs: 3 };
useEffect(() => {
  // Runs every render!
}, [config]);

// ✅ Correct - memoize or use primitives
const config = useMemo(() => ({ mode: "501", legs: 3 }), []);
// Or
useEffect(() => {
  // ...
}, [mode, legs]); // Use primitives
```

### 4. Event Handlers

```typescript
// ❌ Wrong - creates new function every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Correct - useCallback or define outside
const handleClick = useCallback((id: string) => {
  // ...
}, [deps]);

<button onClick={() => handleClick(id)}>Click</button>
// Or better:
<button onClick={handleClick}>Click</button>
```

### 5. Conditional Rendering

```typescript
// Vue: v-if
// React: conditional rendering
{
  isLoading && <Spinner />;
}
{
  error ? <Error /> : <Content />;
}
```

### 6. Lists and Keys

```typescript
// ✅ Always use keys
{
  players.map((player) => <PlayerCard key={player.id} player={player} />);
}

// ❌ Don't use index as key if list can change
{
  players.map((player, index) => <PlayerCard key={index} player={player} />);
}
```

---

## ✅ Daily Practice Checklist

### Week 1: Fundamentals

- [ ] Day 1: Review hooks, refactor 2 components
- [ ] Day 2: Create 3 custom hooks
- [ ] Day 3: Practice useEffect patterns
- [ ] Day 4: TypeScript with React
- [ ] Day 5: Component composition patterns

### Week 2: Zustand Migration

- [ ] Day 1: Create Zustand store
- [ ] Day 2: Migrate ScoreBoard component
- [ ] Day 3: Migrate GameSetupPage
- [ ] Day 4: Migrate GamePage
- [ ] Day 5: Clean up Redux, test everything

### Week 3: React Query + Supabase

- [ ] Day 1: Setup Supabase, create tables
- [ ] Day 2: Setup React Query, create query hooks
- [ ] Day 3: Integrate with Zustand (optimistic updates)
- [ ] Day 4: Handle errors and loading states
- [ ] Day 5: Add real-time features

### Week 4: Advanced + Interview Prep

- [ ] Day 1: Performance optimization
- [ ] Day 2: Advanced patterns (compound components, etc.)
- [ ] Day 3: Practice pair coding scenarios
- [ ] Day 4: Review common gotchas
- [ ] Day 5: Mock interview practice

---

## 📝 Notes & Resources

### Useful Resources

- [React Docs](https://react.dev)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Supabase Docs](https://supabase.com/docs)

### Key Files to Understand

- `src/features/game/store/gameSlice.ts` - Current Redux implementation
- `src/features/game/pages/GamePage.tsx` - Component using Redux
- `src/features/game/components/ScoreBoard.tsx` - Read-only component

### Interview Prep Questions

1. Explain the difference between `useMemo` and `useCallback`
2. When would you use Context API vs Zustand?
3. How does React Query prevent unnecessary API calls?
4. Explain the React rendering cycle
5. How would you optimize a component that re-renders too often?

---

## 🎯 Success Criteria

You're ready for the interview when you can:

- [ ] Write React components from scratch without looking up syntax
- [ ] Explain why you chose a specific pattern
- [ ] Debug React performance issues
- [ ] Implement state management solutions
- [ ] Handle async operations properly
- [ ] Write TypeScript types for React components
- [ ] Think out loud while coding

**Good luck! 🚀**
