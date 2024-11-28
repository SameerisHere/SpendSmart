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
          <Text style={styles.activeLessonText}>Understanding Your Income</Text>
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
  );
}

// Styles for both screens and navbar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    color: '#000',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerRightText: {
    color: '#000',
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
    backgroundColor: '#2276F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveLesson: {
    backgroundColor: '#d3d3d3',
  },
  lessonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  activeLessonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  lessonContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000000',
  },
  videoPlayer: {
    height: 200,
    marginVertical: 20,
  },
  quizQuestion: {
    fontSize: 18,
    marginVertical: 20,
    color: '#000000',
  },
  quizOption: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,   
    borderRadius: 10,
    marginVertical: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  navText: {
    color: 'white',        // White text for visibility
    fontSize: 12,          // Adjust text size to fit nicely under the icons
    marginTop: 5,          // Add some space between the icon and the text
  },
  navItem: {
    alignItems: 'center',  // Align items vertically in the center
  },
});
