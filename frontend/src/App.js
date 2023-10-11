import './App.css';
import Table from './components/table/Table';

function App() {

  //fetch list of referals
  const referrals = [
    { name: 'John Doe', location: 'New York', age: 25, difficulty: 'Easy', isFlagged: false, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
    { name: 'Jane Doe', location: 'San Francisco', age: 30, difficulty: 'Medium', isFlagged: false, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
    { name: 'Jim Doe', location: 'Los Angeles', age: 35, difficulty: 'Hard', isFlagged: true, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
  ];

  return (
    <div>
      <h1>Referrals</h1>
      <Table data={referrals} />
    </div>
  );
}

export default App;
