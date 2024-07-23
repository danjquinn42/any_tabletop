const apiRoot = process.env.API_URL;

console.log("API ROOT ", apiRoot);

export const getAllHexes = () =>
  fetch(apiRoot + "hex/get")
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch hexes");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return {};
    });
