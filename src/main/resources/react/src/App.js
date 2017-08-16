import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/main.css';
import './css/vendor/font-awesome/scss/font-awesome.css';
import './css/vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import { 
  MainNav, 
  HomePage, 
  FindPetPage, 
  AboutPage, 
  EditPetPage, 
  MissionPage, 
  FooterPage 
} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNav menuItems={this.props.menus}></MainNav>
        <div className="wrapper">
          <main>
            <HomePage></HomePage>
            <FindPetPage></FindPetPage>
            <AboutPage></AboutPage>
            <EditPetPage></EditPetPage>
            <MissionPage></MissionPage>
            <FooterPage></FooterPage>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    menus: state.menus
  }
}

export default connect(mapStateToProps)(App);
