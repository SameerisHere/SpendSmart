import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';

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
      <TouchableOpacity style={styles.continueButton} onPress={() => setView('addGoalStep2')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('main')} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddGoalStep2 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Goal</Text>
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
      <TouchableOpacity style={styles.continueButton} onPress={addNewGoal}>
        <Text style={styles.buttonText}>Start Saving!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setView('main')} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
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
    padding: 20,
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
    color: 'white',
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: '#005e5e',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
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
});
