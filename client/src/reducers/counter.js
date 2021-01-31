import { ADD_ONE } from '../actions/types';


const initialState = {
    count: 0,
    msg: ''
};
// this state name is counter! we define it in the combine reducer.
function counterReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_ONE:

            return state = {
                count: state.count + payload.num,
                msg: payload.msg
            }

        default:
            return state;
    }
}
export default counterReducer;