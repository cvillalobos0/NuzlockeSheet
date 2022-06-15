import { MutationsHelper } from "@/store/helper";
import UserPreferencesService from "../../services/FirebaseUserPreferences";

UserPreferencesService;
const state = {
    userPreference: {},
    currentUser: null,
    currentDocumentId: null,
};

const mutations = {
    setUserPrefence: MutationsHelper.set("userPreference"),
    setCurrentUser: MutationsHelper.set("currentUser"),
    setCurrentDocumentId: MutationsHelper.set("currentDocumentId"),
};

const actions = {
    AddOrRemoveSavedSheet({ commit, state }, sheetMetaData) {
        if (state.userPreference) {
            const sheetExists = state.userPreference?.savedSheets?.find(
                (item) => item.code === sheetMetaData.code
            );
            if (!sheetExists) {
                let savedSheets = state.userPreference.savedSheets;
                savedSheets.push(sheetMetaData);
                let userPreference = {
                    ...userPreference,
                    userId: state.currentUser.uid,
                    savedSheets,
                };
                UserPreferencesService.CreateUserPreference(userPreference);
                commit("setUserPrefence", userPreference);
            }
        } else {
            let userPreference = {
                userId: state.currentUser.uid,
                savedSheets: [sheetMetaData],
            };
            UserPreferencesService.CreateUserPreference(userPreference);
            commit("setUserPrefence", userPreference);
        }
    },
    async LoadUserPreferences({ commit, state }) {
        // traerse de firebase
        if (state.currentUser) {
            const userPrefData = await UserPreferencesService.GetUserPreferences(
                state.currentUser.uid
            );
            commit("setUserPrefence", userPrefData);
        }
    },
    SetCurrentUser({ commit }, user) {
        commit("setCurrentUser", user);
    },
    SetCurrentDocumentId({ commit }, documentId) {
        commit("setCurrentDocumentId", documentId);
    },
};

//-- Not Exported --//
const storageKeys = {
    savedSheets: "savedSheets",
};
//-----------------//

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
