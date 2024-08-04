import { isEmpty, isNil } from "lodash";
import { defineStore } from "pinia";
import { getCurrentUser } from "../api/profile";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    loggedIn: false,
    userId: undefined,
    displayName: undefined,
  }),
  actions: {
    async init() {
      const user = await getCurrentUser();
      if (!isNil(user) && !isEmpty(user)) {
        this.loggedIn = true;
        this.userId = user.id;
        this.displayName = user.displayName;
      }
    },
  },
});
