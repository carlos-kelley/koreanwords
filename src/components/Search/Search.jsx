import React, {
  useState,
  useEffect,
} from "react";

function Search(props) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log("inside useEffect");
    if (value.length > 0) {
      console.log("inside useEffect if");
      fetch(
        "https://flashcards-543c9-default-rtdb.firebaseio.com/korean_database.json"
      )
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setResult([]);
          let searchQuery = value.toLowerCase();
          console.log(searchQuery);
          for (const key in responseData) {
            let word =
              responseData[
                key
              ].word.toLowerCase();
            if (
              word
                .slice(0, searchQuery.length)
                .indexOf(searchQuery) !== -1
            ) {
              setResult((prevResult) => {
                return [
                  ...prevResult,
                  responseData[key].word,
                ];
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setResult([]);
    }
  }, [value]);

  return (
    <div>
      <p>Word Search</p>
      <input
        type="text"
        onChange={(event) =>
          setValue(event.target.value)
        }
        value={value}
      />
      <div>
        <div>
          {result.map((result, index) => (
            <a href="#" key={index}>
              <div>{result}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
