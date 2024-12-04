import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <Text style={styles.header}>PROFILE</Text>
      
      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#d3d3d3" />
      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#d3d3d3" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#d3d3d3" secureTextEntry={true} />
      
      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      
      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
          <Ionicons name="cash-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
          <Ionicons name="stats-chart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={24} color="white" />
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
    backgroundColor: '#789b9b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
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
    backgroundColor: '#002222',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ProfileScreen;
