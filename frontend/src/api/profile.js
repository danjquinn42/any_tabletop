const apiRoot = process.env.API_URL;
export const getCurrentUser = () =>
  fetch(apiRoot + `profile`, {
    method: "GET",
    credentials: "include",
    sameSite: "Strict",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch or create user");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return {};
    });
