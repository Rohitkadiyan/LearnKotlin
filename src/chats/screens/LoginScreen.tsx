/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {KEY, ROUTES} from '../utils/constants';
import {navigate} from '../utils/navigationUtils';
import {useToast} from '../utils/Toast/ToastProvider';

import database from '@react-native-firebase/database';
import {storage} from '../utils/mmkvStorage';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const Toast = useToast();

  //handler Login
  const handleLogin = async () => {
    if (!email || !password) {
      Toast?.show('Please fill in both email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const snapshot = await database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(email)
        .once('value');
      if (snapshot.exists()) {
        console.log('userData', snapshot.val());
        const users = snapshot.val();
        const user_key = Object.keys(users).find(
          key => users[key].password === password,
        );
        if (user_key) {
          const user_data = users[user_key];
          console.log(user_data);
          storage.set(KEY.USER_KEY, user_key);
          storage.set(KEY.USER_DATA, JSON.stringify(user_data));
          Toast?.show(`Welcome ${user_data.name} ! `, 'success');
          navigate(ROUTES.HOME);
        } else {
          Toast?.show('Invalid Credentials', 'error');
        }
        // console.log(user, 'user');
      } else {
        console.log('user Not Found');
      }
    } catch (err) {
      console.log('Error', err);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/Images/user.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Continue with Login !</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: focusedInput === 'email' ? 'lightgreen' : '#000',
              },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor:
                  focusedInput === 'password' ? 'lightgreen' : '#000',
              },
            ]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onBlur={() => setFocusedInput(null)}
            onFocus={() => setFocusedInput('password')}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator animating={loading} color={'black'} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'lightgreen',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: 'lightgreen',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
