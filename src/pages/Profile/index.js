import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
// import TabIcon from '~/components/TabIcon';
import Background from '~/components/Background';
import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogOutButton,
} from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setPassword('');
    setOldPassword('');
    setConfirmPassword('');
  }, [profile]);

  async function handleSubmit() {
    const data = {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
    };
    dispatch(updateProfileRequest(data));
  }

  const navigation = useNavigation();
  navigation.setOptions({
    tabBarLabel: 'Meu perfil',
    // tabBarIcon: (props) => <TabIcon {...props} iconName="person" />,
  });

  function handleLogout() {
    navigation.navigate('Dashboard');
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
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
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova  senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          <LogOutButton onPress={handleLogout}>Sair do GoBarber</LogOutButton>
        </Form>
      </Container>
    </Background>
  );
};

export default Profile;
