import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { generateExercises } from "../redux/slices/workoutSlice";
import { useForm } from "react-hook-form";

const FitnessForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.workout);

	const [formData, setFormData] = useState({
		height: 185,
		weight: 60,
		age: 28,
		gender: "male",
		fitnessLevel: "beginner",
		fitnessGoal: "weight gain",
	});

	const handleSetFormData = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const handleGenerateWorkoutPlan = () => {
		dispatch(generateExercises(formData));
	};

	return (
		<form className="border-t mt-10 py-5" onSubmit={handleSubmit(handleGenerateWorkoutPlan)}>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
				<div className="flex flex-col gap-3">
					<label htmlFor="height">Height (cm)</label>
					<input {...register("height", { required: true, min: 80, max: 250 })} className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" id="height" name="height" type="number" onChange={handleSetFormData} value={formData.height} />
					{errors.height?.type === "required" ? <p className="text-red-500 text-xs -mt-3">Height is required</p> : errors.height?.type === "min" || errors.height?.type === "max" ? <p className="text-red-500 text-xs -mt-2.5">Height should be in between 80-250</p> : ""}
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="weight">Weight (kg)</label>
					<input {...register("weight", { required: true, min: 10, max: 500 })} className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" id="weight" name="weight" type="number" onChange={handleSetFormData} value={formData.weight} />
					{errors.weight?.type === "required" ? <p className="text-red-500 text-xs -mt-3">Weight is required</p> : errors.weight?.type === "min" || errors.weight?.type === "max" ? <p className="text-red-500 text-xs -mt-2.5">Weight should be in between 10-500</p> : ""}
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="age">Age (years)</label>
					<input {...register("age", { required: true, min: 10, max: 100 })} className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" id="age" name="age" type="number" onChange={handleSetFormData} value={formData.age} />
					{errors.age?.type === "required" ? <p className="text-red-500 text-xs -mt-3">Age is required</p> : errors.age?.type === "min" || errors.age?.type === "max" ? <p className="text-red-500 text-xs -mt-2.5">Age should be in between 10-100</p> : ""}
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="gender">Gender</label>
					<select className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" id="gender" name="gender" onChange={handleSetFormData} value={formData.gender}>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="others">Others</option>
					</select>
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="fitnessLevel">Fitness Level</label>
					<select name="fitnessLevel" id="fitnessLevel" className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" onChange={handleSetFormData} value={formData.fitnessLevel}>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advanced">Advanced</option>
					</select>
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="fitnessGoal">Fitness Goal</label>
					<select name="fitnessGoal" id="goal" className="border border-gray-200 h-10 outline-none px-2 rounded focus:border-purple-200" onChange={handleSetFormData} value={formData.fitnessGoal}>
						<option value="weight gain">Weight Gain</option>
						<option value="weight loss">Weight Loss</option>
						<option value="muscle building">Muscle Building</option>
					</select>
				</div>
			</div>
			<div className="pt-5 flex justify-center">
				<button type="submit" className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 disabled:from-indigo-300 disabled:via-purple-300 disabled:to-pink-300 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-medium px-5 py-2 rounded" disabled={status === "loading"}>
					Get it now!
				</button>
			</div>
		</form>
	);
};

export default FitnessForm;
