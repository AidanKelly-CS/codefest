import './App.css';
import React, { useState } from 'react';
import Table from './components/table/Table';
import { useEffect, useState } from 'react';





  
function App() {
   const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/referrals')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setReferrals(data)
      }).catch(err => {
        console.error(err)
      });
  }, []);
//   const [data, setData] = useState(referrals);

  function handleUpdateEligible(index, Virtual, inPerson) {
    var newReferrals = [...referrals];
    newReferrals[index].eligibleForSupport = true;
    newReferrals[index].isProcessed = true;
    console.log("Check here", Virtual);
    newReferrals[index].virtual = Virtual;
    newReferrals[index].inPerson = inPerson;
    setReferrals(newReferrals);
  }

  function handleUpdateNotEligible(index) {
    var newReferrals = [...referrals];
    newReferrals[index].eligibleForSupport = false;
    newReferrals[index].isProcessed = true;
    setReferrals(newReferrals);
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
            <Table typeOfTable='referral' data={referrals} updateEligible={(index, Virtual, inPerson) => handleUpdateEligible(index, Virtual, inPerson)} updateNotEligible={(index) => handleUpdateNotEligible(index)} />
          </div>
        )}
        {activeTab === 2 && 
        (<div> 
          <h1>Therapist Waiting List</h1>
            <Table typeOfTable='waitlist' data={referrals} updateEligible={(index) => handleUpdateEligible(index)} updateNotEligible={(index) => handleUpdateNotEligible(index)} />
          </div>
        )}
        {/* {activeTab === 3 && <div>Content for Tab 3</div>} */}
      </div>
    </div>

  );
}

export default App;
