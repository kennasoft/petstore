import React from 'react';
// import { connect } from 'react-redux';

class ImageGallery extends React.Component {

    constructor(props){
        super(props);
        this.state = { mainImage: 0};
        this.setMainImage = this.setMainImage.bind(this);
    }

    setMainImage(indx){
        this.setState({mainImage: indx});
        this.render();
    }

    prevImage(){
        if(this.state.mainImage>0){
            this.setState({mainImage: this.state.mainImage-1});
        }else{
            this.setState({mainImage: this.props.images.length-1});
        }
    }

    nextImage(){
        let lastImage = this.props.images.length-1;
        if(this.state.mainImage<lastImage){
            this.setState({mainImage: this.state.mainImage+1});
        }else{
            this.setState({mainImage: lastImage});
        }
    }

    render(){
        return (
            <div className="image-gallery">
                <div className="row">
                    <div className="col-xs-12">
                        <div style={{backgroundImage: "url('"+(this.props.images ? this.props.images[this.state.mainImage] : '../img/pet-store-icon.png' )+"')"}}
                            className={"main-pet-img " +(this.props.images.length ? '':'grayscale')}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        {
                            !this.props.images.length &&
                                <div>No Image</div>
                        }
                        {
                            (this.props.images.length>4) &&
                                <div className="fa fa-arrow-circle-left thumb-nav scroll-left" onClick={this.prevImage}></div>
                        }
                        
                        <div className="thumbnails col-xs-12">
                            <ul className="thumbnails-list" style={{width: ((this.props.images.length+1)*64)+"px"}}>
                                {
                                    this.props.images.map(function(image, indx){
                                        return (
                                            <li className="thumbnail" key={image}>
                                                <div>
                                                    <img src={image} alt={image} onClick={()=>this.setMainImage(indx)}/>
                                                </div>
                                            </li>
                                        )
                                    }.bind(this))
                                }
                                
                            </ul>
                        </div>
                        {
                            (this.props.images.length>4) &&
                                <div className="fa fa-arrow-circle-right thumb-nav scroll-right" onClick={this.nextImage}></div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default ImageGallery;