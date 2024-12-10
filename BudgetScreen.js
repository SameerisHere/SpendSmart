import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BudgetScreen({ navigation }) {
  const [view, setView] = useState('main');
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState([
    { name: 'October', spent: 3500, saved: 500 },
    { name: 'November', spent: 3800, saved: 200 },
  ]);

  const addNewGoal = () => {
    setGoals([...goals, { name: goalName, spent: 0, saved: 0 }]);
    setGoalName('');
    setGoalAmount('');
    setGoalDeadline('');
    setView('main');
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.5;
              color: #333;
            }
            h1 {
              text-align: center;
              color: #014343;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Budget Summary</h1>
          <p><strong>Monthly Income Post-Tax:</strong> $${income || 0}</p>
          <p><strong>Saved:</strong> $${savings || 0}</p>
          <p><strong>Total Spent:</strong> $${parseFloat(rent || 0) + parseFloat(groceries || 0) + parseFloat(diningOut || 0) + parseFloat(otherSpending || 0)}</p>
          <h2>Spending Breakdown</h2>
          <ul>
            <li><strong>Rent:</strong> $${rent || 0}</li>
            <li><strong>Groceries:</strong> $${groceries || 0}</li>
            <li><strong>Dining Out:</strong> $${diningOut || 0}</li>
            <li><strong>Other:</strong> $${otherSpending || 0}</li>
          </ul>
          <h2>Recommendations</h2>
          <p>You spent <strong>$${parseFloat(diningOut || 0) + parseFloat(otherSpending || 0)}</strong> on unnecessary expenses:</p>
          <ul>
            <li>${diningOut} spent on dining out.</li>
            <li>${otherSpending} spent on other expenses.</li>
          </ul>
          <p>Consider spending more on groceries and cutting down on dining out to save more.</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      Alert.alert('PDF Generated', `Your PDF has been saved to: ${uri}`);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Sharing Unavailable', 'The sharing feature is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'There was an error generating the PDF.');
    }
  };

  const renderMainView = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalCard}>
            <Text style={styles.goalTitle}>{goal.name}</Text>
            <Text style={styles.goalAmount}>
              Spent: ${goal.spent} / Saved: ${goal.saved}
            </Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setStep('Step1')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.tipsHeader}>Tips</Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tip}>Prioritize needs like rent and groceries over unnecessary wants</Text>
        <Text style={styles.tip}>Track your spending daily to stay aware of where your money goes</Text>
        <Text style={styles.tip}>Build an emergency fund to cover unexpected expenses</Text>

      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.container}>
      {/* Step 1 Content */}
    </View>
  );

  // Bottom Navbar
  const renderNavbar = () => (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Goals')}
      >
        <Text style={styles.navText}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Budget')}
      >
        <Text style={styles.navText}>Budget</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      {view === 'main' ? renderMainView() :
       view === 'addGoalStep1' ? renderAddGoalStep1() : renderAddGoalStep2()}
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
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#003333',
  },
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60,

  },
  scrollContainer: {
    flexGrow: 1, //scrollable content
    paddingHorizontal: 20, //horizontal padding
    paddingBottom: 30, //padding
    backgroundColor: '#003333', 
  },
  whiteText: {
    color: 'white',
    fontSize: 18, //increased font size
    lineHeight: 23, //spacing
    textAlign: 'center',
  },
  header: {
    fontSize: 28, //larger
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15, //reducing spacing
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#797979',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#014343',
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#d3d3d3',
  },
  activeLine: {
    backgroundColor: '#b3a1d9',
  },
  subheader: {
    fontSize: 19, //larger
    fontWeight: 'bold', 
    color: 'white',
    marginBottom: 15,
  },
  input: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: '#005e5e',
    paddingVertical: 12, //for touch targets
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8, //reduced spacing 
  },
  smallerContinueButton: {
    backgroundColor: '#BF0B0B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8, //spacing
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circleText: {
    color: 'white',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#BF0B0B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  continueAndBackButton: {
    backgroundColor: '#005e5e',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  goalCard: {
    width: 150,
    backgroundColor: '#006b6b',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  goalAmount: {
    fontSize: 12,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderColor: '#000000',
    borderWidth: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'black',
  },
  tipsHeader: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tip: {
    width: '30%',
    backgroundColor: '#white',
    padding: 10,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    marginBottom: 5, //spacing 
  },
  centeredContent: {
    alignItems: 'center',
  },
  section: {
    marginBottom: 20, //spacing
  },
  recommendationHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8, 
  },
  centeredSection: {
    alignItems: 'center', 
  },
  buttonContainer: {
    marginTop: 10, //reduced top spacing
    paddingHorizontal: 20, //padding
    paddingBottom: 20, //padding
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#444444',
    paddingVertical: 16,
    position: 'absolute', //fixed to the bottom
    bottom: 0, //align with bottom of the screen
    width: '100%', 
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});





