import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
	return (
		<div className="App bg-gray-50 h-full min-h-screen">
			<BrowserRouter>
				<Header />
				<Provider store={store}>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
