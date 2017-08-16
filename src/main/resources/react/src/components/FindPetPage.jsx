// ./src/components/FindPetPage.js
import React from 'react';
import { connect } from 'react-redux';
import petActions from '../actions/petActions';
import ImageGallery from './ImageGallery.jsx';

class FindPet extends React.Component {

    constructor(props){
        super(props);
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.triggerEdit = this.triggerEdit.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
    }

    componentWillMount(){
        console.log(this.props);
    }

    search(petId){
        console.log(`search function called with value ${petId}...`);
        this.props.findPet(petId);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.search(this.state.value);
    }

    triggerEdit(){
        this.props.startEdit(this.props.currentPet);
    }

    render(){
        return (
            <section id="find-pet" className="section-find">
                <h3>Enter a pet ID to search for...</h3>
                <div className="row">
                    <div className="col-xs-12">
                        <form className="search-form" onSubmit={this.handleSubmit}>
                            <div className="input-group input-group-lg">
                                <input placeholder="Enter Pet ID" className="form-control" type="number" value={this.state.value} onChange={this.handleChange}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-primary">
                                        <i className="fa fa-search"></i> Get Pet
                                    </button>
                                </span>
                                
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 pet-details">
                        <div className="col-xs-12 col-sm-6">
                            <ImageGallery images={this.props.currentPet ? this.props.currentPet.photoUrls : []} />
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <table className="table table-success table-striped pet-attribs">
                                <tbody>
                                    <tr>
                                        <td className="txt-right">Name</td>
                                        <td>{this.props.currentPet ? this.props.currentPet.name : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className="txt-right">Status</td>
                                        <td>{this.props.currentPet ? this.props.currentPet.status : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className="txt-right">Category</td>
                                        <td>{this.props.currentPet && this.props.currentPet.category ? this.props.currentPet.category.name : ''}</td>
                                    </tr>
                                    <tr>
                                        <td className="txt-right">Tags</td>
                                        <td>
                                            {
                                                this.props.currentPet && this.props.currentPet.tags.map(
                                                    tag => (
                                                        <span key={tag.id} className="alert alert-info pet-tag">
                                                            {tag.name}
                                                        </span>
                                                    )
                                                )
                                            }                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <fieldset>
                                <legend>Operations</legend>
                                <div>
                                    <button className="btn btn-warning btn-lg" onClick={this.triggerEdit}>
                                        <i className="fa fa-cloud-upload"></i> Modify & Update
                                    </button>
                                    
                                    <button className="btn btn-danger btn-lg"
                                            data-confirm-click="vm.deletePet(vm.currentPet.id)"
                                            data-confirm-click-message="Are you sure you want to delete this pet?">
                                        <i className="fa fa-trash"></i> Delete
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
        
                </section>
          );
    }
  
};

const mapStateToProps = (state, ownProps) => {
    return {
        currentPet: state.pets.currentPet
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPet: pet => dispatch(petActions.createBook(pet)),
        findPet: id => dispatch(petActions.findPet(id)),
        deletePet: id => dispatch(petActions.deletePet(id)),
        startEdit: pet => dispatch(petActions.editPet(pet))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPet);