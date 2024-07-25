const apiRoot = process.env.API_URL;
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
