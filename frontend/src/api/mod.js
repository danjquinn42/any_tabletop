const apiRoot = process.env.API_URL;
export const getAllModsChildren = () =>
  fetch(apiRoot + "mod/children")
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch mods children");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return {};
    });
