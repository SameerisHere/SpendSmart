import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle Save Changes
  const handleSaveChanges = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    Alert.alert('Success', 'Your changes have been saved!');
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.header}>PROFILE</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#B3B3B3"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B3B3B3"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

     {/* Bottom Navigation */}
     <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Ionicons name="book-outline" size={24} color="white" />
          <Text style={styles.navText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Budget')} style={styles.navItem}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.navText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Goals')} style={styles.navItem}>
          <Ionicons name="stats-chart-outline" size={24} color="white" />
          <Text style={styles.navText}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003333',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#white',
    borderRadius: 10,
    color: 'white',
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#005e5e',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;