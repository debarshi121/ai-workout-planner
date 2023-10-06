import React, { useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { MdFileDownload } from "react-icons/md";
import FitnessForm from "../components/FitnessForm";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import * as html2pdf from "html2pdf.js";

const Home = () => {
	const { exercises, heading, status } = useSelector((state) => state.workout);

	const handleDownload = () => {
		const element = document.getElementById("plan");

		var opt = {
			margin: 0.5,
			filename: "workoutplan.pdf",
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 1 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		html2pdf().set(opt).from(element).save();
	};

	useEffect(() => {
		if (status === "succeeded")
			toast.success("Your workout plan is ready!", {
				position: "bottom-center",
			});
	}, [status]);

	return (
		<>
			<section className=" text-gray-600 p-5">
				<div className="container mx-auto">
					<div>
						<h1 className="text-xl font-medium text-center">Welcome to AI Workout Planner App!</h1>
						<p className="text-center mt-5">Introducing the future of fitness: our personalized workout planner app powered by cutting-edge AI technology. Say goodbye to generic fitness routines and hello to a tailored fitness experience like never before. With our app, achieving your fitness goals has never been easier or more efficient. </p>
					</div>
					<div className="border border-gray-100 mt-10 p-5 rounded shadow bg-white">
						<p className="text-center font-medium">Get ready to revolutionize your workout regimen and unlock your full potential with the power of AI.</p>
						<FitnessForm />
					</div>
				</div>
			</section>

			{status === "loading" && (
				<section className="p-5">
					<div className="container mt-10 p-5 animate-pulse mx-auto h-20 bg-gray-100 rounded flex gap-2 items-center justify-center">
						<div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-purple-500 border-4"></div>
						<span>AI is preparing your workout plan...</span>
					</div>
				</section>
			)}

			{status === "succeeded" && exercises.length > 0 && (
				<section className=" text-gray-600 p-5">
					<div className="container mx-auto">
						<div className="border border-gray-100 mt-10 p-5 rounded shadow bg-white">
							<div className="mb-5">
								<h2 className="font-medium text-center">{heading}</h2>
							</div>
							<div id="plan">
								{exercises.map((data, i) => (
									<WorkoutCard data={data} key={i} />
								))}
							</div>
							<div className="flex justify-center">
								<button onClick={handleDownload} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium px-3 py-2 rounded flex items-center gap-1 w-40">
									<MdFileDownload className="mt-0.5" />
									<span>Download now</span>
								</button>
							</div>
						</div>
					</div>
				</section>
			)}

			{status === "failed" && (
				<section className="p-5">
					<div className="container mx-auto">
						<p className="text-red-500 text-center">Something is wrong. Please try again!</p>
					</div>
				</section>
			)}
			<Toaster />
		</>
	);
};

export default Home;
