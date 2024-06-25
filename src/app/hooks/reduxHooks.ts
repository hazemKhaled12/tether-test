// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTDispatch = () => useDispatch<AppDispatch>();
