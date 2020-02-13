import React, { Component } from 'react';
import { storage } from '../firebase/firebase';
import { auth,db } from '../firebase';
import withAuthorization from './withAuthorization';

class HomePage  extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      urlImage: '',
      uid:'',
      VideoURL: null,
      VideoURL1:null,
      Votacion: 0,
      progress: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleTyping2 = this.handleTyping2.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange = e =>{
    if (e.target.files[0]){
      const image = e.target.files[0];
      this.setState(()=>({image}));
      this.setState({uid:auth.showUserId()});
    }
  }

  handleTyping(event){
    let VideoURL = event.target.value
    this.setState({VideoURL: VideoURL}, function(){
    })
  }

  handleTyping2(event){
    let VideoURL1= event.target.value
    this.setState({VideoURL1: VideoURL1}, function(){
      console.log(this.state.VideoURL1)
    })
  }

handleUpload = () => {
  const {image} = this.state;
  const uploadTask = storage.ref(`images/${this.state.uid}`).put(image);
  uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    this.setState({progress});
  }, 
  (error) => {
    console.log(error);
  }, 
() => {
        storage.ref('images').child(this.state.uid).getDownloadURL().then(urlImage => {
        this.setState({urlImage});
        db.addDataImage(this.state.uid,this.state.urlImage,this.state.VideoURL,this.state.VideoURL1,this.state.Votacion); 
    })
});
}

handleDelete = ()=>{
  db.deleteUser(auth.showUserId());
  auth.doSignOut();
}

  render() {

    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const divStyle = {
      width:'100%'
    }; 
    return ( 

          <div className="container-login100">
            <div className="wrap-login100 p-t-85 p-b-20">
                    <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                        <input className="input100" onChange={this.handleTyping} type="text"/>
                        <span className="focus-input100" data-placeholder="Inserte URL del video siguiendo estas instrucciones"></span>
                    </div>
                    <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
                        <input className="input100" onChange={this.handleTyping2} type="text"/>
                        <span className="focus-input100" data-placeholder="Inserte URL del video siguiendo estas instrucciones"></span>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9">
                          <video controls muted autoPlay>
                            <source src='../video/VideoHtml5.mp4'/>
                          </video>
                    </div> 
                    <div style={style}>
                    <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.urlImage || 'https://via.placeholder.com/500?text=Aquía+aparecerá+la+imagen+que+seleccionaste'} className="img-thumbnail" alt="Uploaded images"/>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9">
                          <iframe title="Video" className="embed-responsive-item"  src={this.state.VideoURL || 'https://www.youtube.com/embed/tgbNymZ7vqY'} allowFullScreen></iframe>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9">
                          <iframe title="Video" className="embed-responsive-item"  src={this.state.VideoURL1 || 'https://www.youtube.com/embed/tgbNymZ7vqY'} allowFullScreen></iframe>
                    </div>
                    <button className="login100-form-btn" onClick={this.handleUpload}>Subir Imagen</button>
                    <div className="progress">
                      <progress value={this.state.progress} max="1" style={divStyle}/>
                    </div>
            </div>
            <button className="login100-form-btn" onClick={()=>this.handleDelete()}>Salir de competencia</button>
          </div>
        
     );
  }
}
 
 
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
