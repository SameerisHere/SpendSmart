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

  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');
  
  const validateStep1 = () => {
    if (!income || Number(income) <= 0 || !savings || Number(savings) <= 0) {
      Alert.alert('Validation Error', 'Please enter values greater than 0 for both fields.');
      return false;
    }
    return true;
  };
  
  const handleStep1Continue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };
  
  const renderStep1 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={[styles.circle, styles.activeCircle]}>
          <Text style={styles.circleText}>1</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>3</Text>
        </View>
      </View>
      <Text style={styles.subheader}>Income and Savings:</Text>
      <TextInput
        style={styles.input}
        placeholder="What was this month's post-tax income?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />
      <TextInput
        style={styles.input}
        placeholder="How much was saved this month?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={savings}
        onChangeText={setSavings}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleStep1Continue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
  

  const [rent, setRent] = useState('');
  const [groceries, setGroceries] = useState('');
  const [diningOut, setDiningOut] = useState('');
  
  const validateStep2 = () => {
    if (
      !rent || Number(rent) <= 0 ||
      !groceries || Number(groceries) <= 0 ||
      !diningOut || Number(diningOut) <= 0
    ) {
      Alert.alert('Validation Error', 'Please enter values greater than 0 for all fields.');
      return false;
    }
    return true;
  };
  
  const handleStep2Continue = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };
  
  const renderStep2 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>1</Text>
        </View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>3</Text>
        </View>
      </View>
      <Text style={styles.subheader}>Expenses:</Text>
      <TextInput
        style={styles.input}
        placeholder="What was this month’s spend on rent?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={rent}
        onChangeText={setRent}
      />
      <TextInput
        style={styles.input}
        placeholder="What was this month’s spend on groceries?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={groceries}
        onChangeText={setGroceries}
      />
      <TextInput
        style={styles.input}
        placeholder="What was this month’s spend on dining?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={diningOut}
        onChangeText={setDiningOut}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueAndBackButton} onPress={handleStep2Continue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const [otherSpending, setOtherSpending] = useState('');

  const validateStep3 = () => {
    if (!otherSpending || Number(otherSpending) <= 0) {
      Alert.alert('Validation Error', 'Please enter a value greater than 0 for other spending.');
      return false;
    }
    return true;
  };
  
  const handleStep3Continue = () => {
    if (validateStep3()) {
      setStep(4); // Navigate to Step 4 (Spending Habits)
    }
  };
  
  const renderStep3 = () => (
    <View style={styles.container}>
      <Text style={styles.header}>BUDGET</Text>
      <View style={styles.steps}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>1</Text>
        </View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>2</Text>
        </View>
        <View style={[styles.line, styles.activeLine]}></View>
        <View style={[styles.circle, styles.activeCircle]}>
          <Text style={styles.circleText}>3</Text>
        </View>
      </View>
      <Text style={styles.subheader}>Other Spending:</Text>
      <TextInput
        style={styles.input}
        placeholder="This month’s total spent on other?"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={otherSpending}
        onChangeText={setOtherSpending}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueAndBackButton} onPress={handleStep3Continue}>
          <Text style={styles.buttonText}>Create Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );      

  const renderSpendingHabits = () => (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>BUDGET</Text>
  
      <View style={[styles.section, styles.centeredSection]}>
        <Text style={styles.subheader}>MONTHLY INCOME POST-TAX:</Text>
        <Text style={styles.whiteText}>${income}</Text>
        <Text style={styles.whiteText}>SAVED: ${savings}</Text>
        <Text style={styles.whiteText}>
          SPENT: ${parseFloat(rent || 0) + parseFloat(groceries || 0) + parseFloat(diningOut || 0) + parseFloat(otherSpending || 0)}
        </Text>
      </View>
  
      <View style={[styles.section, styles.centeredSection]}>
        <Text style={styles.subheader}>YOUR SPENDING BREAKDOWN:</Text>
        <Text style={styles.centeredText}>Rent: ${rent}</Text>
        <Text style={styles.centeredText}>Groceries: ${groceries}</Text>
        <Text style={styles.centeredText}>Dining Out: ${diningOut}</Text>
        <Text style={styles.centeredText}>Other: ${otherSpending}</Text>
      </View>
  
      <View style={styles.section}>
        <Text style={styles.recommendationHeader}>RECOMMENDATIONS BASED ON YOUR SPENDING:</Text>
        <Text style={styles.recommendationText}>
          ${parseFloat(diningOut || 0) + parseFloat(otherSpending || 0)} was spent on unnecessary expenses:
        </Text>
        <Text style={styles.recommendationText}>${diningOut} spent on dining out.</Text>
        <Text style={styles.recommendationText}>${otherSpending} spent on other.</Text>
        <Text style={styles.recommendationText}>Spend more on groceries to cut dining costs.</Text>
        <Text style={styles.recommendationText}>Spend less on other unnecessary spending to save more.</Text>
      </View>
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => setStep(5)}>
          <Text style={styles.buttonText}>Simulate a Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => setStep(1)}>
          <Text style={styles.buttonText}>Create New Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={generatePDF}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallerContinueButton} onPress={() => setStep(0)}>
          <Text style={styles.buttonText}>Back to All Budgets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
  
const renderRecommendations = () => (
<View style={styles.container}>
  <Text style={styles.subheader}>PROJECT NEXT MONTH’S BUDGET:</Text>
  <TextInput style={styles.input} placeholder="Income" placeholderTextColor="white" keyboardType="numeric" onChangeText={setIncome}/>
  <TextInput style={styles.input} placeholder="Rent" placeholderTextColor="white" keyboardType="numeric" onChangeText={setRent} />
  <TextInput style={styles.input} placeholder="Groceries" placeholderTextColor="white" keyboardType="numeric" onChangeText={setGroceries}/>
  <TextInput style={styles.input} placeholder="Dining Out"  placeholderTextColor="white" keyboardType="numeric"  onChangeText={setDiningOut}/>
  <TextInput style={styles.input} placeholder="Other" placeholderTextColor="white" keyboardType="numeric" onChangeText={setOtherSpending} />
  <TouchableOpacity style={styles.continueButton} onPress={() => setStep(4)}>
    <Text style={styles.buttonText}>Finish Simulation</Text>
  </TouchableOpacity>
</View>
);

return (
  <View style={styles.screenContainer}>
    {(() => {
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
    })()}
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
    paddingBottom: 100,

  },
  scrollContainer: {
    flexGrow: 1, //scrollable content
    paddingHorizontal: 20, //horizontal padding
    paddingBottom: 100, //padding
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
    height: 95,
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





