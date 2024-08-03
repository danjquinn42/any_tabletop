const apiRoot = process.env.API_URL;
export const getInitialState = () =>
  fetch(apiRoot + "init", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to initialize");
      }
      console.log(response.json());
    })
    .catch((error) => {
      console.error("Error:", error);
      return {};
    });
