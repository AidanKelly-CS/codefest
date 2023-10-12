import Referal from "../referal/Referal";
import Waitlist from "../waitlist/Waitlist";

function Table({typeOfTable, data, updateEligible, updateNotEligible }) {
    return (
      <>
      {typeOfTable == 'referral' &&
      <div>
        {data.map((referral, index) => 
            (
            <Referal
            key={index}
            dbId={referral.id}
            id={index}
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
            updateEligible={updateEligible}
            updateNotEligible={updateNotEligible}
          />
        ))}
      </div>
      }
      {typeOfTable == 'waitlist' &&
      <div>
        {data.map((referral, index) => 
            (
            <Waitlist
            key={index}
            id={referral.id}
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
            updateEligible={updateEligible}
            updateNotEligible={updateNotEligible}
          />
        ))}
      </div>
      }

      </>
    );
  }

  export default Table;