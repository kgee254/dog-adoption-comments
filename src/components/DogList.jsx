import { useDogs } from "../context/DogContext.jsx"; // 1. Get dogs data from context
import DogCard from "./DogCard.jsx"; // 2. Import the card we just made
import "./DogList.css"; // 3. We'll make css for the grid layout

function DogList() { // 4. No props needed. It gets everything from context
  const { filteredDogs } = useDogs(); // 5. Get filteredDogs from DogContext. Get the dogs AFTER search filter is applied

  if (filteredDogs.length === 0) { // 6. CHECK: Did search return nothing? Check if the array is empty
    return (
      <div className="no-results"> {/* 7. Show message if no dogs match */}
        <h3>No dogs found</h3> {/* 8. Title */}
        <p>Try searching for a different breed or name</p> {/* 9. Hint */}
      </div>
    );
  }
 
  return ( // 10. The grid of cards
    <div className="dog-list-grid"> {/* 11. Container div for css grid */}
      {filteredDogs.map(dog => ( // 12. Loop through each dog
        <DogCard key={dog.id} dog={dog} /> // 13. Render 1 DogCard per dog. key is required
      ))}
    </div>
  );
}

export default DogList; // 14. Export so DogsPage can use it