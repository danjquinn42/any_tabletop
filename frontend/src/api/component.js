const apiRoot = process.env.API_URL;

export const createStatsConfigComponent = (config, modId) => {
  return fetch(apiRoot + `component/new/${modId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ config }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to create config");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error: ", error);
      return {};
    });
};
