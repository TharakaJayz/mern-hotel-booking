import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSeleter: TypedUseSelectorHook<RootState> = useSelector;
