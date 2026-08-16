import DogList from "../components/DogList.jsx"; // 1. Import the DogList component that will display all the dogs
import SearchBar from "../components/SearchBar.jsx"; // 2. Import the SearchBar component so user can search dogs
// import "./Dogs.css"; // 3. Import CSS for this page. Uncomment when you make it

function Dogs() { // 4. Define the Dogs page component
  return ( // 5. What this page renders
    <div className="dogs-page"> {/* 6. Main wrapper div for the whole dogs page */}
      <h1 className="dogs-title">Browse Our Dogs</h1> {/* 7. Page heading */}
      
      <SearchBar /> {/* 8. Show the search bar. It will update searchTerm in DogContext */}
      
      <DogList /> {/* 9. Show the list of dogs. It will read filteredDogs from DogContext */}
    </div> // 10. Close main div
  ); // 11. End return
} // 12. End Dogs function

export default Dogs; // 13. Export so App.jsx can use it in the /dogs route