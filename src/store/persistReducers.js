// o storage obtem a estratégia padrão para armazenamento,
// No caso para web o localstorage, e para o native seria o asyncstorage
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persisttedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persisttedReducer;
};
