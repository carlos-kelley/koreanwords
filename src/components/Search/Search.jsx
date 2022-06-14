import React, {
  useState,
  useEffect,
} from "react";

function Search(props) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [isPending, setIsPending] =
    useState(false);

  useEffect(() => {
    console.log("inside useEffect");
    if (value.length > 0) {
      setIsPending(true);
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
            setIsPending(false);
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
        type="text" placeholder="Word"
        onChange={(event) =>
          setValue(event.target.value)
        }
        value={value}
      />
      <div>
        <div>
          {isPending && <p>Loading...</p>}
        </div>
        <div>
          {result.map((result, index) => (
            <a
              href={`https://en.wiktionary.org/wiki/${value}`}
              key={index}
            >
              <div>{result}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
