import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateAIWorkoutPlan } from "../../utils/palmService";

export const generateExercises = createAsyncThunk("workout/generateExercises", async (userData) => {
	const data = await generateAIWorkoutPlan(userData);
	return data;
});

const workoutSlice = createSlice({
	name: "workout",
	initialState: {
		exercises: [],
		heading: '',
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(generateExercises.pending, (state) => {
				state.status = "loading";
			})
			.addCase(generateExercises.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.exercises = action.payload.jsonData;
				state.heading = action.payload.heading;
			})
			.addCase(generateExercises.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default workoutSlice.reducer;
