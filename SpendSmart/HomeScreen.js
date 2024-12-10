import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';  // Import WebView
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([false, false, false, false, false]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Start with Lesson 1 active (index 0)

  // Function to handle the completion of a lesson
  const handleLessonComplete = (lessonIndex) => {
    let updatedLessons = [...completedLessons];
    updatedLessons[lessonIndex] = true;
    setCompletedLessons(updatedLessons);
    setCurrentLessonIndex(lessonIndex + 1); // Move to the next lesson after completion

    // Show alert and navigate back to the home screen after "OK" is pressed
    Alert.alert(
        "Correct!",
        "You have completed this lesson!",
        [
            {
                text: "OK", 
                onPress: () => {
                    setSelectedLesson(null); // This will set the screen to home (reset selected lesson)
                    navigation.navigate('Home'); // Navigate back to the Home screen
                }
            }
        ]
    );
};

  const handleLessonSelect = (lesson, lessonIndex) => {
    setSelectedLesson(lesson);
    if (lessonIndex > 0 && !completedLessons[lessonIndex - 1]) {
      Alert.alert("Incomplete", "Please complete the previous lesson first.");
    }
  };

  const handleQuizOptionPress = (option) => {
    if (option === 'Federal Income Tax') {
      handleLessonComplete(0); // Complete Lesson 1 after the correct answer
    } else if (option === 'Social Security') {
      Alert.alert("Incorrect", "Try again!");
    } else if (option === 'Insurance Deduction') {
      Alert.alert("Incorrect", "Try again!");
    } else if (option === 'Retirement Deductions') {
      Alert.alert("Incorrect", "Try again!");
    }
  };

  // Render the home screen with lesson selection circles
  const renderHomeScreen = () => {
    const lessonsCompletedToday = completedLessons.filter((lesson) => lesson).length;
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>LEARN</Text>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightText}>
              {lessonsCompletedToday}/1 Lessons Done Today
            </Text>
            <Text style={styles.headerRightText}>10 Day Streak</Text>
          </View>
        </View>
    
        {/* Circles/ Lessons */}
        <View style={styles.lessonsContainer}>
          <TouchableOpacity 
            style={[styles.lessonCircle, currentLessonIndex >= 0 ? styles.activeLesson : styles.inactiveLesson]} 
            onPress={() => handleLessonSelect('Lesson 1: Understanding Your Income', 0)}>
            <Text style={styles.activeLessonText}>Lesson 1: Understanding Your Income</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            style={[styles.lessonCircle, currentLessonIndex >= 1 ? styles.activeLesson : (completedLessons[0] ? styles.completedLesson : styles.inactiveLesson)]}
            onPress={() => handleLessonSelect('Lesson 2: Budgeting Basics', 1)}>
            <Text style={styles.lessonText}>Lesson 2: Budgeting Basics</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            style={[styles.lessonCircle, currentLessonIndex >= 2 ? styles.activeLesson : (completedLessons[1] ? styles.completedLesson : styles.inactiveLesson)]}
            onPress={() => handleLessonSelect('Lesson 3: Saving Strategies', 2)}>
            <Text style={styles.lessonText}>Lesson 3: Saving Strategies</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            style={[styles.lessonCircle, currentLessonIndex >= 3 ? styles.activeLesson : (completedLessons[2] ? styles.completedLesson : styles.inactiveLesson)]}
            onPress={() => handleLessonSelect('Lesson 4: Investing Fundamentals', 3)}>
            <Text style={styles.lessonText}>Lesson 4: Investing Fundamentals</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            style={[styles.lessonCircle, currentLessonIndex >= 4 ? styles.activeLesson : (completedLessons[3] ? styles.completedLesson : styles.inactiveLesson)]}
            onPress={() => handleLessonSelect('Lesson 5: Debt Management', 4)}>
            <Text style={styles.lessonText}>Lesson 5: Debt Management</Text>
          </TouchableOpacity>
        </View>
    
        {/* Bottom Navbar */}
        <BottomNavbar navigation={navigation} />
      </View>
    );
  };
  
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
      <TouchableOpacity style={styles.continueButton} onPress={() => setSelectedLesson('')}>
        <Text style={styles.buttonText}>Back to Lessons</Text>
      </TouchableOpacity>
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
    backgroundColor: '#003333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000000',
  },
  headerText: {
    fontSize: 24,
    color: '#f9fafa',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerRightText: {
    color: '#f9fafa',
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
    backgroundColor: '#d0d3d4',
  },
  activeLesson: {
    backgroundColor: '#059d80', // Active lesson color (blue-green)
  },
  lessonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#white',
  },
  activeLessonText: {
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
    color: 'white',
  },
  videoPlayer: {
    height: 200,
    marginVertical: 20,
  },
  quizQuestion: {
    fontSize: 18,
    marginVertical: 20,
    color: 'white',
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
  continueButton: {
    backgroundColor: '#005e5e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
