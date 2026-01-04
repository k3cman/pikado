## Keypad x01

- [ ] Extract button styles to constants or use 'useMemo'
- [ ] Create reusable KeypadButton component
- [ ] Optimize rerenders with React.memo
- [ ] Haptic Feedback?
- [ ] Add Input like field
- [ ] Finish x01 game mode

## GamePage

- [ ] Add Error Boundary
- [ ] Add loading states
- [ ] Layout Components

## GameSetupPage

- [ ] Add form validation with error display
- [ ] Extract form submission to custom hook
- [ ] Add cancel button
- [ ] Add form reset
- [ ] Improve error handling
- [ ] Migrate to zustand

## Add login

- [ ] When not logged in can only add users and play
- [ ] When not logged in users are stored in the local storage but not sent to a server
- [ ] Add Profile page

## Router

- [ ] Add route guards (protected routes)
- [ ] Add loading states for route transitions
- [ ] Add error boundaries per route
- [ ] Add route-based code splitting with `React.lazy`

## Players

- [ ] Ability to add players
- [ ] Edit/Update etc

## Scoreboard Page

- [ ] Game history list
- [ ] Filtering and sorting
- [ ] Pagination
- [ ] Add statistics for each game

## Statistcis

- [ ] Statistics per player
- [ ] Charts, and statistics

## Keypad Factory

- [ ] Convert to proper React component
- [ ] Use React component pattern instead of factory function
- [ ] Add error handling for invalid modes
- [ ] Add TypeScript discriminated unions for type safety
- [ ] Consider using a registry pattern for extensibility

## GameStrategy

- [ ] Convert class-based to functional/hook-based strategies
- [ ] Create `useGameStrategy` custom hook
- [ ] Remove Redux dependency from strategies
- [ ] Add strategy-specific state management
- [ ] Implement strategy pattern with hooks instead of classes

## Cricket

- [ ] Combine with Strategy And Keypad factory
