import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./slices/workoutSlice";

const store = configureStore({
	reducer: {
		workout: workoutReducer,
	},
});

export default store;
