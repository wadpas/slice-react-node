import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { deleteAccount, getCurrentProfile } from '../../actions/profile'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
	useEffect(() => {
		getCurrentProfile()
	}, [getCurrentProfile])

	return loading && profile === null ? (
		<Spinner />
	) : (
		<section>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome, {user && user.name}
			</p>
			{profile !== null ? (
				<section>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => deleteAccount()}>
							<i className="fas fa-user-minus"> Delete Account</i>
						</button>
					</div>
				</section>
			) : (
				<section>
					<p>You have not yet setup a profile, please add some info</p>
					<Link
						to="/create-profile"
						className="btn btn-primary my-1">
						Create Profile
					</Link>
				</section>
			)}
		</section>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
