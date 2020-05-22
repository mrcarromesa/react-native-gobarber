import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  const { name, email, avatar_id, ...rest } = payload.data;

  const profile = { name, email, avatar_id, ...(rest.oldPassword ? rest : {}) };
  try {
    const { data } = yield call(api.put, 'users', profile);
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(data));
  } catch (error) {
    Alert.alert('Erro!', 'Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
