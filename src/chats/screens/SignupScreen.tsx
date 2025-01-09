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
// import auth from '@react-native-firebase/auth';
// import {navigate} from '../utils/navigationUtils';
// import {ROUTES} from '../utils/constants';
import {useToast} from '../utils/Toast/ToastProvider';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import {navigate} from '../utils/navigationUtils';
import {ROUTES} from '../utils/constants';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const Toast = useToast();

  //handler Signup
  const handleSignup = async () => {
    if (!email || !password || !name || !about) {
      Toast?.show('Please fill all fields.', 'error');
      return;
    }
    console.log('yes');
    const data = {
      id: uuid.v4(),
      email,
      name,
      password,
      about,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLJ0rygTw_DT-j_Edu53eB2rDpkBROln0YCDFngUS2yPD9KkMCLZ9pn7wQkp0snRDoalA&usqp=CAU',
    };

    setLoading(true);
    //save into RealTime Database
    try {
      const res = await database().ref(`/users/${data.id}`).set(data);
      console.log(res, 'response');
      Toast?.show('Successfully Signup User.', 'success');
      setName('');
      setEmail('');
      setAbout('');
      setPassword('');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      Toast?.show('Not SignUp', 'error');
      console.log(err);
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
          <Text style={styles.title}>Continue with SignUp !</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: focusedInput === 'name' ? 'lightgreen' : '#000',
              },
            ]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            onBlur={() => setFocusedInput(null)}
            onFocus={() => setFocusedInput('name')}
          />
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

          <TextInput
            style={[
              styles.input,
              {
                borderColor: focusedInput === 'about' ? 'lightgreen' : '#000',
              },
            ]}
            placeholder="About"
            value={about}
            onChangeText={setAbout}
            onBlur={() => setFocusedInput(null)}
            onFocus={() => setFocusedInput('about')}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator animating={loading} color={'black'} />
            ) : (
              <Text style={styles.buttonText}>Signup</Text>
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

export default SignupScreen;
