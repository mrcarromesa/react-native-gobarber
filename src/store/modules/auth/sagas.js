import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

// import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  console.tron.log('response - sagas1');
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    console.tron.log('response - sagas2');
    console.tron.log(response);

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'Usuário não pode ser prestador de serviços'
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve uma falha no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
      // provider: true,
    });

    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados!'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
