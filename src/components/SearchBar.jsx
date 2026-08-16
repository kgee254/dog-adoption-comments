import { useDogs } from "../context/DogContext.jsx"; // 1. Import our custom hook to access searchTerm and setSearchTerm from DogContext
// import "./SearchBar.css"; // 2. Import CSS for styling. Uncomment when you make the CSS file

function SearchBar() { // 3. Define the SearchBar component
  const { searchTerm, setSearchTerm } = useDogs(); // 4. Pull searchTerm and setSearchTerm from DogContext using our useDogs hook

  // 5. Function that runs every time the user types in the input
  function handleChange(e) {
    setSearchTerm(e.target.value); // 6. Update searchTerm in DogContext with whatever the user typed. This triggers DogList to re-filter
  } // 7. End handleChange

  return ( // 8. What this component renders
    <div className="searchbar-container"> {/* 9. Wrapper div for styling the whole search bar */}
      <input // 10. Start input element
        type="text" // 11. This is a text input field
        placeholder="Search by name, breed, or description..." // 12. Gray hint text that shows when input is empty
        value={searchTerm} // 13. Controlled input: the value comes from DogContext state
        onChange={handleChange} // 14. Every keystroke calls handleChange to update the state
        className="searchbar-input" // 15. CSS class for styling
      /> {/* 16. Close input tag */}
    </div> // 17. Close wrapper div
  ); // 18. End return
} // 19. End SearchBar function

export default SearchBar; // 20. Export so Dogs.jsx can import and use it