import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import serviceFilterReducer from './serviceFilterSlice';

// Создаем store с типизацией
export const store = configureStore({
  reducer: {
    serviceFilter: serviceFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([]),
  devTools: process.env.NODE_ENV !== 'production',
});

// Типы для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Тип для async thunks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Хуки для типизированного Redux
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
