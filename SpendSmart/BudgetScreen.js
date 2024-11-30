import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

  export default function BudgetScreen() {
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
            <Text style={styles.tip}>Prioritize needs like rent and groceries over wants</Text>
          </View>
        </View>
      );
  
  const renderStep1 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={[styles.circle, styles.activeCircle]}><Text style={styles.circleText}>1</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text style={styles.circleText}>2</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text style={styles.circleText}>3</Text></View>
      </View>
      <Text style={styles.subheader}>Income and Savings:</Text>
      <TextInput style={styles.input} placeholder="What was this month's post tax income?" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="How much was saved this month?" keyboardType="numeric" />
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(2)}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={styles.circle}><Text style={styles.circleText}>1</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}><Text style={styles.circleText}>2</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text style={styles.circleText}>3</Text></View>
      </View>
      <Text style={styles.subheader}>Expenses:</Text>
      <TextInput style={styles.input} placeholder="What was this month’s total spent on rent?" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="What was this month’s total spent on groceries?" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="What was this month’s total spent on dining out?" keyboardType="numeric" />
      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueAndBackButton} onPress={() => setStep(3)}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={styles.circle}><Text style={styles.circleText}>1</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={styles.circle}><Text style={styles.circleText}>2</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}><Text style={styles.circleText}>3</Text></View>
      </View>
      <Text style={styles.subheader}>Other Spending:</Text>
      <TextInput style={styles.input} placeholder="This month’s total spent on other categories?" keyboardType="numeric" />
      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueAndBackButton} onPress={() => setStep(4)}>
        <Text style={styles.buttonText}>Create Budget</Text>
      </TouchableOpacity>
    </View>
    </View>
  );

  const renderSpendingHabits = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.circleContainer}>
        <Text>MONTHLY INCOME POST-TAX:</Text>
        <Text>$4,000</Text>
        <Text>SAVED: $600</Text>
        <Text>SPENT: $3,400</Text>
      </View>
      <Text style={styles.subheader}>SPENDING BREAKDOWN:</Text>
      <Text>Rent: $1,600</Text>
      <Text>Car Payments & Insurance: $800</Text>
      <Text>Groceries: $400</Text>
      <Text>Dining Out: $200</Text>
      <Text>Other: $400</Text>
      <Text style={styles.subheader}>RECS BASED ON YOUR BREAKDOWN:</Text>
      <Text>$200 was spent on unnecessary expenses:</Text>
      <Text>$200 spent on dining out.</Text>
      <Text>Spend more on groceries to cut dining costs.</Text>
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(5)}>
        <Text style={styles.buttonText}>Simulate a Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(1)}>
        <Text style={styles.buttonText}>Create New Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallerContinueButton} onPress={() => setStep(0)}>
        <Text style={styles.buttonText}>Back to All Budgets</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.container}>
      <Text style={styles.subheader}>PROJECT NEXT MONTH’S BUDGET:</Text>
      <TextInput style={styles.input} placeholder="Income" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Rent" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Car Payments & Insurance" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Groceries" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Dining Out" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Other" keyboardType="numeric" />
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(0)}>
        <Text style={styles.buttonText}>Finish Simulation</Text>
      </TouchableOpacity>
    </View>
  );

  switch (step) {
    case 0:
      return renderMainView();
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    case 3:
      return renderStep3();
    case 4:
      return renderSpendingHabits();
    case 5:
      return renderRecommendations();
    default:
      return renderStep1();
  }
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
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#white',
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
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  smallerContinueButton: {
    backgroundColor: '#BF0B0B',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

