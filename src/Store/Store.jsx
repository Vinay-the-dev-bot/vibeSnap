import { createStore, combineReducers } from "redux";

const PROFILE = "PROFILE";
const SUGGESTIONS = "SUGGESTIONS";
const LOGOUT = "LOGOUT";

const friendSuggestionsasdasd = [
  {
    name: "Vinay",
    profileIcon: "feedCreatorIcon",
    mutualFriendsOld: ["Akhilesh", "Spoorthi", "Shreyas", "Adarsha"],
    mutualFriends: [
      { name: "Akhilesh", userId: "Akhil@gmail.com" },
      { name: "Spoorthi", userId: "Spoo@gmail.com" },
      { name: "Shreyas", userId: "Shreyas@gmail.com" },
      { name: "Adarsha", userId: "Adarsha@gmail.com" }
    ],
    status: "not",
    email: "Vinay@mail.com"
  },
  {
    name: "Akhilesh",
    profileIcon: "feedCreatorIcon",
    mutualFriendsOld: ["Vinay", "Spoorthi", "Adarsha"],
    mutualFriends: [
      { name: "Vinay", userId: "Vinay@gmail.com" },
      { name: "Spoorthi", userId: "Spoo@gmail.com" },
      { name: "Adarsha", userId: "Adarsha@gmail.com" }
    ],
    status: "friend",
    email: "Akhilesh@mail.com"
  },
  {
    name: "Spoorthi",
    profileIcon: "profileImage",
    mutualFriendsOld: ["Akhilesh", "Vinay", "Shreyas"],
    mutualFriends: [
      { name: "Akhilesh", userId: "Akhilesh@gmail.com" },
      { name: "Vinay", userId: "Vinay@gmail.com" },
      { name: "Shreyas", userId: "Shreyas@gmail.com" }
    ],
    status: "sent",
    email: "Spoo@mail.com"
  },
  {
    name: "Shreyas",
    profileIcon: "feedCreatorIcon",
    mutualFriendsOld: ["Vinay", "Adarsha", "Spoorthi"],
    mutualFriends: [
      { name: "Vinay", userId: "Vinay@gmail.com" },
      { name: "Adarsha", userId: "Adarsha@gmail.com" },
      { name: "Spoorthi", userId: "Spoo@gmail.com" }
    ],
    status: "not",
    email: "Shreyas@mail.com"
  },
  {
    name: "Adarsha",
    profileIcon: "feedCreatorIcon",
    mutualFriendsOld: ["Akhilesh", "Vinay", "Shreyas"],
    mutualFriends: [
      { name: "Akhilesh", userId: "Akhilesh@gmail.com" },
      { name: "Vinay", userId: "Vinay@gmail.com" },
      { name: "Shreyas", userId: "Shreyas@gmail.com" }
    ],
    status: "not",
    email: "Adarsha@mail.com"
  }
];

const isLoggedIn = localStorage.getItem("isVibeSnapLoggedIn") || false;
const userToken = localStorage.getItem("vibeSnapToken") || "";

const initialAppState = { friendSuggestions: friendSuggestionsasdasd };
const initialUserState = {
  isLoggedIn: false,
  name: "",
  bio: "",
  token: "",
  profileImage: "",
  backgroundImage: ""
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SUGGESTIONS:
      return {
        ...state,
        friendSuggestions: action.payload
      };
    default:
      return state;
  }
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case LOGOUT:
      return {
        ...initialUserState
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
