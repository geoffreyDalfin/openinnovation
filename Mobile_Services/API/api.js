export function createGame(nameLeft, nameRight, scoreLimit) {
    return fetch('http://localhost:3000/createGame', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nameLeft" : nameLeft,
            "nameRight" : nameRight,
            "scoreLimit" : scoreLimit
        })
      })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }