import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store'

// 1. Export the Typed Dispatch Hook
// Use this to trigger actions (e.g. dispatch(throwDart(...)))
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2. Export the Typed Selector Hook
// Use this to read data (e.g. const score = useAppSelector(state => state.game.score))
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;