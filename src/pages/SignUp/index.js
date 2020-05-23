import React, { useRef, useState } from 'react';
import { Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import Background from '~/components/Background';

import { singUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const SignUp = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const navigation = useNavigation();

  const emailRef = useRef();
  const passwordRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(singUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Criar Conta
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignLinkText>Já tenho uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};

export default SignUp;
