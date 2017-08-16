import React from 'react';
import { connect } from 'react-redux';
import { bindMethodsToSelf } from '../utils';
// import $ from 'jquery';
// import 'jquery-scrollto';

class MainNav extends React.Component {

    constructor(props){
        super(props);
        bindMethodsToSelf.bind(this)(MainNav);
    }

    navigate(element){
        // $(window).scrollTo(element, 800);
    }

    render() {
        return (
            <nav id='navigation'>
                <div className='logo'>
                    <div className='logo-img'></div>
                    <h1 className='logo-text'>
                        Super Duper Pet Store
                    </h1>
                </div>
                <ul className="menu">
                {
                    this.props.menuItems &&
                    this.props.menuItems.map((mnu) => {
                        return (
                            <li key={mnu.link} className='menuItem regular'>
                                <a className={mnu.style} href={mnu.link}>{mnu.label}</a>
                            </li>
                        );
                    })
                }
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        menuItems: state.menus
    }
}

export default connect(mapStateToProps)(MainNav);