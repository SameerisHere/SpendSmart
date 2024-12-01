import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GoalsScreen() {
  const [view, setView] = useState('main'); // Tracks the current view (main, addGoalStep1, addGoalStep2)
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [automaticAdjust, setAutomaticAdjust] = useState(false);
  const [goals, setGoals] = useState([
    { name: 'Retirement', progress: 50, current: 5000, target: 10000 },
    { name: 'Emergency Fund', progress: 10, current: 500, target: 5000 },
  ]);

  const addNewGoal = () => {
    setGoals([...goals, { name: goalName, progress: 0, current: 0, target: parseFloat(goalAmount) }]);
    setGoalName('');
    setGoalAmount('');
    setGoalDeadline('');
    setAutomaticAdjust(false);
    setView('main');
  };

  const validateStep1 = () => {
    if (!goalName.trim()) {
      Alert.alert('Validation Error', 'Please enter a name for your goal.');
      return false;
    }
    if (!goalAmount || parseFloat(goalAmount) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid goal amount greater than 0.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!goalDeadline.trim()) {
      Alert.alert('Validation Error', 'Please enter a deadline for your goal.');
      return false;
    }
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(goalDeadline)) {
      Alert.alert('Validation Error', 'Please enter the deadline in the format MM/DD/YYYY.');
      return false;
    }
    return true;
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setView('addGoalStep2');
    }
  };

  const handleAddNewGoal = () => {
    if (validateStep2()) {
      addNewGoal();
    }
  };

  const renderMainView = () => (
    <View style={styles.container}>
      <Text style={styles.header}>GOALS & PLANNING</Text>
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={styles.goalCard}>
            <Text style={styles.goalTitle}>{goal.name}</Text>
            <Text style={styles.goalProgress}>{goal.progress}% {goal.name === 'Retirement' ? 'annual goal achieved' : 'funded'}</Text>
            <Text style={styles.goalAmount}>${goal.current} / ${goal.target}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setView('addGoalStep1')}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.tipsHeader}>Tips</Text>
      <View style={styles.tipsContainer}>
        <Text style={styles.tip}>Try to have 6 months of expenses saved in an emergency fund</Text>
        <Text style={styles.tip}>Diversify your investments by investing in ETFs and stocks</Text>
        <Text style={styles.tip}>Don't forget to save for wants like vacations as well!</Text>
      </View>
    </View>
  );

  const renderAddGoalStep1 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Goal</Text>
      <View style={styles.steps}>
        <View style={[styles.circle, styles.activeCircle]}><Text style={styles.circleText}>1</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text style={styles.circleText}>2</Text></View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Goal Name"
        value={goalName}
        onChangeText={setGoalName}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal Amount"
        value={goalAmount}
        onChangeText={setGoalAmount}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setView('main')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleStep1Continue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddGoalStep2 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Goal</Text>
      <View style={styles.steps}>
        <View style={styles.circle}><Text style={styles.circleText}>1</Text></View>
        <View style={styles.line}></View>
        <View style={[styles.circle, styles.activeCircle]}><Text style={styles.circleText}>2</Text></View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Goal Deadline (MM/DD/YYYY)"
        value={goalDeadline}
        onChangeText={setGoalDeadline}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Based Off Progress Allow for Automatic Deadline Adjustment</Text>
        <Switch
          value={automaticAdjust}
          onValueChange={setAutomaticAdjust}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setView('addGoalStep1')}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleAddNewGoal}>
          <Text style={styles.buttonText}>Start Saving!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    view === 'main' ? renderMainView() :
    view === 'addGoalStep1' ? renderAddGoalStep1() : renderAddGoalStep2()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
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
  goalProgress: {
    fontSize: 14,
    color: 'white',
    marginVertical: 5,
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
    color: 'black',
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
    borderColor: 'black',
    borderWidth: 2,
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    color: 'black',
    fontSize: 14,
    flex: 1,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#d3d3d3',
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
  circleText: {
    color: 'white',
    fontSize: 16,   
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'black',
    borderTopWidth: 1,
  },
  navText: {
    color: 'white',
    fontSize: 12,          
    marginTop: 5,          
  },
  navItem: {
    alignItems: 'center',  
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#BF0B0B',
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
