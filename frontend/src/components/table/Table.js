import Referal from "../referal/Referal";

function Table({ data }) {
    return (
      <div>
        {data.map((referral, index) => 
        
          

            (
            <Referal
            key={index}
            name={referral.name}
            location={referral.location}
            age={referral.age}
            difficulty={referral.difficulty}
            isFlagged={referral.isFlagged}
            date={referral.date}
            eligibleForSupport={referral.eligibleForSupport}
            isProcessed={referral.isProcessed}
            virtual={referral.virtual}
            inPerson={referral.inPerson}
            timeAM={referral.timeAM}
            timePM={referral.timePM}
          />
          

          
        ))}
      
      </div>
    );
  }

  export default Table;