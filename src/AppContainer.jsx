import App from './App';
import {connect} from "react-redux";
import {initializeThunkCreator} from "./redux/app-reducer";


const mapStateToProps = state => ({
  initialized: state.app.initialization
});

export default connect(mapStateToProps, {initialize: initializeThunkCreator})(App);