import React from 'react';
import ReactDOM from 'react-dom';
import petActions from '../actions/petActions';
import constants from '../actions/constants';
import { connect } from 'react-redux';
import { immutableSplice, isVisibleY, bindMethodsToSelf } from '../utils';

class EditPet extends React.Component {

    constructor(props){
        super(props);
        this.defaultState = {name:'', tags:[], photoUrls: ['']};
        this.state = props.currentPet || this.defaultState;

        this.tagInput = null;
        this.htmlNode = null;

        bindMethodsToSelf.bind(this)(EditPet);
    }

    componentDidMount(){
        this.setState(this.props.currentPet || this.defaultState);
        this.props.getCategories();
    }

    componentWillReceiveProps(newProps){
        this.state = this.defaultState;
        console.log('this.state in componentWillReceiveProps(): ', this.state);
        this.setState(newProps.currentPet || this.state);
        console.log('this.state after setState(newProps.currentPet): ', this.state);
    }

    componentDidUpdate(prevProps, prevState){
        this.htmlNode = this.htmlNode || ReactDOM.findDOMNode(this.rootElement);
        if(!isVisibleY(this.htmlNode) && this.props.currentPet){
            this.ensureVisible();
        }
    }

    ensureVisible(){
        window.scrollTo(0, this.htmlNode.offsetTop);
    }


    handleChange(event){
        let change = {};
        const element = event.target;
        change[element.name] = element.value;
        if(element.name==='category'){
            change['category'] = { 
                id: element.value,
                name: element.options[element.selectedIndex].text
            }
        }
        this.modifyState(change);
    }

    handlePhotoInput(event, index){
        let newArray = this.state.photoUrls.slice();
        newArray[index] = event.target.value;
        let change = {photoUrls: newArray};
        this.modifyState(change);
    }

    removeTag(index){
        let change = immutableSplice(this.state.tags,index);
        this.modifyState({tags: change});
    }

    modifyState(change){
        console.log('modifying state with ...', change);
        this.setState(Object.assign({}, this.state, change));
    }

    handleKeyUp(event){
        const keyCode = event.which || event.keyCode;
        if(keyCode===13){
            this.addTag(this.tagInput.value);
        }
    }

    addTag(tag){
        if(this.state.tags){
            if(this.state.tags.findIndex(t => t.name===tag)>-1) return;
            this.modifyState({tags: this.state.tags.concat({name: tag})});
            if(this.tagInput) this.tagInput.value = '';
        }
    }

    savePet(){
        if(this.state.id){
            return this.props.updatePet(this.state);
        }
        return this.props.createPet(this.state);
    }

    addPhotoInput(){
        this.modifyState({photoUrls: this.state.photoUrls.concat([''])});
    }

    removePhotoInput(index){
        if(this.state.photoUrls){
            let newPhotoUrls = immutableSplice(this.state.photoUrls, index);
            this.modifyState({photoUrls: newPhotoUrls});
        }
    }

    formValid(){
        //form validation
        return true;
    }

    render(){

        return (
            <section id="drop-pet" className="section-drop" ref={ section => this.rootElement = section }>
                Enter the information of the pet you want to drop off
                <div className="pet-details text-left">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="pet-name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                            <input type="text" 
                                    className="form-control form-control-lg" 
                                    required="true"
                                    id="pet-name" 
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Enter pet name (required)..."/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pet-category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10">
                                <select name="category" className="form-control form-control-lg" 
                                        id="pet-category" 
                                        value={this.state.category ? this.state.category.id : ''}
                                        onChange={this.handleChange}>
                                    <option value="">Select a category</option>
                                    {
                                        this.props.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option> )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pet-status" className="col-sm-2 col-form-label">Status</label>
                            <div className="col-sm-10">
                                <select name="status" className="form-control form-control-lg" 
                                        id="pet-status"
                                        onChange={this.handleChange}
                                        value={this.state.status || ''}
                                        required="true">
                                    <option value="">Select status (required)</option>
                                    <option value="available">available</option>
                                    <option value="unavailable">unavailable</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pet-tag" className="col-sm-2 col-form-label">Tags</label>
                            <div className="col-sm-10">
                                <div className="input-group">
                                    <input type="text" 
                                        className="form-control" 
                                        id="pet-tag"
                                        ref={(input)=>this.tagInput=input}
                                        onKeyUp={this.handleKeyUp}
                                        placeholder="Add tags here (hit enter to add)"/>
                                    <span className="input-group-btn">
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => this.addTag(this.tagInput.value)}>Add</button>
                                    </span>
                                </div>
                                {
                                    (this.state.tags && this.state.tags.length>0) &&
                                    <div className="pet-tag-wrapper">
                                        {
                                            this.state.tags.map((tag, index) => {
                                                return (
                                                    <span key={tag.id + index + tag.name } className="alert pet-tag alert-info">
                                                        {tag.name}
                                                        <i className="fa fa-times tag-close-btn" onClick={() => this.removeTag(index)}></i>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pet-photos" className="col-sm-2 col-form-label">Photo</label>
                            <div className="col-sm-10">
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <div className="input-group">
                                            <input className="form-control form-control-lg" 
                                                id="pet-photos"
                                                required="true"
                                                value={this.state.photoUrls ? this.state.photoUrls[0]: ''}
                                                onChange={(event) => this.handlePhotoInput(event, 0)}
                                                placeholder="Paste image url here (at least one image required)"/>
                                            <span className="input-group-btn">
                                                <button type="button" title="Click to add more photos" className="btn btn-success" onClick={this.addPhotoInput}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.photoUrls ? this.state.photoUrls.map((url, index) => {
                                        if(index<1) return null;
                                        return (
                                            <div key={index+'::'+url} className="form-group row">
                                                <div className="col-sm-12">
                                                    <div className="input-group">
                                                        <input className="form-control form-control-lg"
                                                            value={url}
                                                            onChange={(event) => this.handlePhotoInput(event, index)}
                                                            placeholder="Paste additional image url here"/>
                                                        <span className="input-group-btn">
                                                            <button type="button" title="Click to remove" className="btn btn-danger" onClick={() => this.removePhotoInput(index)}>
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <div></div>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-offset-2 col-sm-8">
                                {
                                    (this.props.saveStatus===constants.PENDING) &&
                                    <div className="spinner">
                                        <div className="rect1"></div>
                                        <div className="rect2"></div>
                                        <div className="rect3"></div>
                                        <div className="rect4"></div>
                                        <div className="rect5"></div>
                                    </div>
                                }
                                {
                                    (this.props.saveStatus===constants.FULFILLED) &&
                                    <div className="alert alert-success">
                                        <i className="fa fa-check-circle"></i>
                                        Thanks for dropping off your pet.
                                        We shall find a new home for him/her ASAP!
                                    </div>
                                }
                                {
                                    (this.props.saveStatus===constants.REJECTED) &&
                                    <div className="alert alert-danger">
                                        <i className="fa fa-times-circle"></i>
                                        There was an error saving pet details!
                                    </div>
                                }
                                {
                                    (!this.formValid()) &&
                                    <div className="alert alert-danger">
                                        <i className="fa fa-times-circle"></i>
                                        Please ensure all required fields are filled!
                                    </div>
                                }
                            </div>
                            <div className="col-sm-2 text-right">
                                <button type="button" className="btn btn-success btn-lg" onClick={ () => this.savePet(this.state) }>
                                    <i className="fa fa-paw"></i>
                                     SUBMIT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        currentPet: state.pets.tempPet,
        categories: state.pets.categories,
        saveStatus: state.pets.requestStatus[constants.CREATE_PET]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPet: pet => dispatch(petActions.createPet(pet)),
        updatePet: pet => dispatch(petActions.updatePet(pet)),
        getCategories: () => dispatch(petActions.listCategories())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPet);