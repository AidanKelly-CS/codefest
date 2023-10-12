import './App.css';
import React, { useState } from 'react';
import Table from './components/table/Table';

  //fetch list of referals
  const referrals = [
    { id:0, name: 'John Doe', location: 'New York', age: 25, difficulty: 'Easy', isFlagged: false, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
    { id:1, name: 'Jane Doe', location: 'San Francisco', age: 30, difficulty: 'Medium', isFlagged: false, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
    { id:2, name: 'Jim Doe', location: 'Los Angeles', age: 35, difficulty: 'Hard', isFlagged: true, date: '20/02/9999', isProcessed: false, eligibleForSupport: false, virtual: false, inPerson: false, timeAM: false, timePM: false},
  ];

  
function App() {
  const [data, setData] = useState(referrals);

  function handleUpdateEligible(index, Virtual, inPerson) {
    var newReferrals = [...referrals];
    newReferrals[index].eligibleForSupport = true;
    newReferrals[index].isProcessed = true;
    console.log("Check here", Virtual);
    newReferrals[index].virtual = Virtual;
    newReferrals[index].inPerson = inPerson;
    setData(newReferrals);
  }

  function handleUpdateNotEligible(index) {
    var newReferrals = [...referrals];
    newReferrals[index].eligibleForSupport = false;
    newReferrals[index].isProcessed = true;
    setData(newReferrals);
  }

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      <div className="tab">
        <button
          className={activeTab === 1 ? 'active' : ''}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </button>
        <button
          className={activeTab === 2 ? 'active' : ''}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </button>
        <button
          className={activeTab === 3 ? 'active' : ''}
          onClick={() => handleTabClick(3)}
        >
          Tab 3
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 1 && 
        (<div> 
          <h1>Pending Referrals</h1>
            <Table typeOfTable='referral' data={data} updateEligible={(index, Virtual, inPerson) => handleUpdateEligible(index, Virtual, inPerson)} updateNotEligible={(index) => handleUpdateNotEligible(index)} />
          </div>
        )}
        {activeTab === 2 && 
        (<div> 
          <h1>Therapist Waiting List</h1>
            <Table typeOfTable='waitlist' data={data} updateEligible={(index) => handleUpdateEligible(index)} updateNotEligible={(index) => handleUpdateNotEligible(index)} />
          </div>
        )}
        {/* {activeTab === 3 && <div>Content for Tab 3</div>} */}
      </div>
    </div>

  );
}

export default App;
