import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BudgetScreen() {
  const [step, setStep] = useState(1);

  const renderStep1 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={[styles.circle, styles.activeCircle]}><Text>1</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text>2</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text>3</Text></View>
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
        <View style={styles.circle}><Text>1</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}><Text>2</Text></View>
        <View style={styles.line}></View>
        <View style={styles.circle}><Text>3</Text></View>
      </View>
      <Text style={styles.subheader}>Expenses:</Text>
      <TextInput style={styles.input} placeholder="What was this month’s total spent on rent?" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="What was this month’s total spent on groceries?" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="What was this month’s total spent on dining out?" keyboardType="numeric" />
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(3)}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={styles.circle}><Text>1</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={styles.circle}><Text>2</Text></View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}><Text>3</Text></View>
      </View>
      <Text style={styles.subheader}>Other Spending:</Text>
      <TextInput style={styles.input} placeholder="What was this month’s total spent on other categories?" keyboardType="numeric" />
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(4)}>
        <Text style={styles.buttonText}>Create Budget</Text>
      </TouchableOpacity>
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
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(5)}>
        <Text style={styles.buttonText}>Recs & Simulate!</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
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
      <Text style={styles.subheader}>PROJECT NEXT MONTH’S BUDGET:</Text>
      <TextInput style={styles.input} placeholder="Income" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Rent" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Car Payments & Insurance" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Groceries" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Dining Out" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Other" keyboardType="numeric" />
      <TouchableOpacity style={styles.continueButton} onPress={() => setStep(1)}>
        <Text style={styles.buttonText}>Finish Simulation</Text>
      </TouchableOpacity>
    </View>
  );

  switch (step) {
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
    backgroundColor: '#003333',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#b3a1d9',
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
    color: 'white',
    marginBottom: 10,
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
  circleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

