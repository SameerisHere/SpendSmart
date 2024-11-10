import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';  // Import WebView
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleQuizOptionPress = (option) => {
    if (option === 'Federal Income Tax') {
      Alert.alert("Lesson Complete", "You have completed this lesson!");
    }
  };

  // Render the home screen with lesson selection circles
  const renderHomeScreen = () => (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>LEARN</Text>
        <View style={styles.headerRight}>
          <Text style={styles.headerRightText}>0/1 Lessons Done Today</Text>
          <Text style={styles.headerRightText}>10 Day Streak</Text>
        </View>
      </View>

      {/* Circles/ Lessons */}
      <View style={styles.lessonsContainer}>
        <TouchableOpacity 
          style={styles.lessonCircle} 
          onPress={() => handleLessonSelect('Understanding Your Income')}>
          <Text style={styles.lessonText}>Understanding Your Income</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCircle, styles.inactiveLesson]}>
          <Text style={styles.lessonText}>Budgeting Basics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCircle, styles.inactiveLesson]}>
          <Text style={styles.lessonText}>Saving Strategies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCircle, styles.inactiveLesson]}>
          <Text style={styles.lessonText}>Investing Fundamentals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.lessonCircle, styles.inactiveLesson]}>
          <Text style={styles.lessonText}>Debt Management</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  );

  // Render the lesson content screen when a lesson is selected
  const renderLessonScreen = () => (
    <View style={styles.lessonContainer}>
      <Text style={styles.lessonTitle}>{selectedLesson}</Text>

      {/* WebView with YouTube video */}
      <WebView
        source={{ uri: 'https://youtu.be/XQ0f87stf_o?si=LVRVWFpBII2hWQce' }}
        style={styles.videoPlayer}
      />

      <Text style={styles.quizQuestion}>What is the Most Common Type of Income Withholding?</Text>

      <TouchableOpacity style={styles.quizOption} onPress={() => handleQuizOptionPress('Federal Income Tax')}>
        <Text>Federal Income Tax</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quizOption} onPress={() => handleQuizOptionPress('Social Security')}>
        <Text>Social Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quizOption} onPress={() => handleQuizOptionPress('Insurance Deduction')}>
        <Text>Insurance Deduction</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quizOption} onPress={() => handleQuizOptionPress('Retirement Deductions')}>
        <Text>Retirement Deductions</Text>
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  );

  return selectedLesson ? renderLessonScreen() : renderHomeScreen();
}

// Bottom Navbar Component
function BottomNavbar({ navigation }) {
  return (
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
  );
}

// Styles for both screens and navbar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerRightText: {
    color: '#fff',
  },
  lessonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 40,
  },
  lessonCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#b3a1d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveLesson: {
    backgroundColor: '#d3d3d3',
  },
  lessonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  lessonContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#003333',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#fff',
  },
  videoPlayer: {
    height: 200,
    marginVertical: 20,
  },
  quizQuestion: {
    fontSize: 18,
    marginVertical: 20,
    color: '#fff',
  },
  quizOption: {
    padding: 15,
    backgroundColor: '#b3a1d9',
    borderRadius: 10,
    marginVertical: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
});
