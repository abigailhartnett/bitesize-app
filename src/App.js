import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import PantryPage from "./pages/pantry";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/pantry" element={<PantryPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
