import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// equal to props and then props.alerts
const Alert = ({ alerts }) =>
    alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,

}

//in order to get the redux state 
//with this func we can access to any reducer in the combine reducers so we set a variable equal to state.reducerName and take the values
const mapStateToProps = (state) => ({
    alerts: state.alert
})

//the connect mathoods takes 2 params: 1- mapASatateToProps , 2- and obcjets with all the actions we want to take
export default connect(mapStateToProps)(Alert)

