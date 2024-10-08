import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadUser } from './actions/auth'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import PrivateRoute from './components/routing/PrivateRoute'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import NotFound from './components/layout/NotFound'
import setAuthToken from './utils/setAuthToken'
import { LOGOUT } from './actions/types'
import store from './store'

import './App.css'

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)
		}
		store.dispatch(loadUser())
		window.addEventListener('storage', () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT })
		})
	}, [])

	return (
		<Provider store={store}>
			<Router>
				<section>
					<Navbar />
					<div className="container">
						<Alert />
						<Routes>
							<Route
								exact
								path="/"
								element={<Landing />}
							/>
							<Route
								exact
								path="/register"
								element={<Register />}
							/>
							<Route
								exact
								path="/login"
								element={<Login />}
							/>
							<Route
								exact
								path="/profiles"
								element={<Profiles />}
							/>
							<Route
								exact
								path="/profile/:id"
								element={<Profile />}
							/>
							<Route
								exact
								path="/dashboard"
								element={<PrivateRoute component={Dashboard} />}
							/>
							<Route
								exact
								path="/create-profile"
								element={<PrivateRoute component={CreateProfile} />}
							/>
							<Route
								exact
								path="/edit-profile"
								element={<PrivateRoute component={EditProfile} />}
							/>
							<Route
								exact
								path="/add-experience"
								element={<PrivateRoute component={AddExperience} />}
							/>
							<Route
								exact
								path="/add-education"
								element={<PrivateRoute component={AddEducation} />}
							/>
							<Route
								exact
								path="/posts"
								element={<PrivateRoute component={Posts} />}
							/>{' '}
							<Route
								exact
								path="/posts/:id"
								element={<PrivateRoute component={Post} />}
							/>
							<Route
								path="/*"
								element={<NotFound />}
							/>
						</Routes>
					</div>
				</section>
			</Router>
		</Provider>
	)
}

export default App
