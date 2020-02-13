import React, { Component } from 'react';
import { db } from '../firebase';
import Charts from "../components/Charts";
const uuid = require('uuid');

const pStyle = {
  width:'150px',
  height:'150px',
  borderRadius:'150px'
};

const row = {
  display: 'flex'
};

const column = {
  flex: '33.33%',
  padding: '5px'
};

const width = {
  width: '100%'
};
const pad = {
  paddingTop: 0 + 'px !important'
};

const AllVotation = []
const AllVotationName = []

const addVotation =  (info) =>{ 
  db.takeVotationData(info,(snapshot)=>{
   const Votacion=snapshot.val()+1;
   console.log({Votacion})
   db.addVotation(info,Votacion)
  })
}
const seeVotation = (info) =>{
  db.takeAllVotationData(info,(snapshot)=>{
    AllVotation.push(parseInt(snapshot.val()))
  })
}
const seeVotationName = (info) =>{
  db.takeAllVotationNameData(info,(snapshot)=>{
    AllVotationName.push(snapshot.val()) 
  })
}

 
const UserList = ({ users }) =>
<div>
  <div className="login100-form-title p-b-70">Selecciona tu cantante favorito</div>
    {Object.keys(users).map(info =>
      <div  key={info}>
        <div style={row}>
          <div style={column} className="login100-form-title p-b-70">
            {users[info].username}
          </div>
          <div style={column}>
          <img src={users[info].ImageUrl} style={pStyle} alt="Uploaded images"/>
          <button onClick={()=>addVotation(info)} className="btn btn-success"> VOTA POR MI</button>
          </div>
          <div style={column}>
          <iframe title="Video" className="embed-responsive-item"  src={users[info].VideoUrl1} allowFullScreen></iframe>
            <iframe title="Video" className="embed-responsive-item"  src={users[info].VideoUrl} allowFullScreen></iframe>
          </div>
        </div>
      <hr style={width} />
      {seeVotation(info)}
      {seeVotationName(info)}
      </div>
     )}
  </div>


class LandingPage extends Component {
  // El constructor siempre va de primero
   constructor(props) {
    super(props);

    this.state = {
      users: null,
      video: null,
      uid: uuid.v1(),

      userName: "",
      answers: {
        answer1: "",
        answer2: ""
      },
      submitted: false,
      feedback: "",
      feedbackSubmit: false,
      Votaciones:AllVotation,
      chartData:{},
      NombresVotantes:AllVotationName,
    };

    this.userSubmit = this.userSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionsSubmit = this.questionsSubmit.bind(this);
    this.userFeedback = this.userFeedback.bind(this);
    this.feedbackSubmit = this.feedbackSubmit.bind(this);
  }



  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState({ users: snapshot.val() })
    );
  }

  userSubmit(event){
    event.preventDefault();
    let userName = this.refs.name.value.trim();
    this.setState({userName}, function(){
    });
  }


  questionsSubmit(event){
    event.preventDefault();
    this.setState({submitted: true});
    if(this.state.answers.answer2 === "no"){
      db.setData(this.state.uid, this.state.userName, this.state.answers.answer1,this.state.answers.answer2,this.state.feedback)
      .then(() => {
        
        this.setState({ 
          userName: this.state.userName,
          answer1: this.state.answers.answer1,
          answer2: this.state.answers.answer2,
          feedback: this.state.feedback,
        });
        
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  userFeedback(event){
    let feedback = event.target.value
    this.setState({feedback: feedback}, function(){
      console.log(this.state);
    })
  }


  feedbackSubmit(event){
    event.preventDefault();
    this.setState({feedbackSubmit: true})
    db.setData(this.state.uid, this.state.userName, this.state.answers.answer1,this.state.answers.answer2,this.state.feedback)
        .then(() => {
          
          this.setState({ 
            userName: this.state.userName,
            answer1: this.state.answers.answer1,
            answer2: this.state.answers.answer2,
            feedback: this.state.feedback,
          });
          
        })
        .catch(error => {
          console.log(error);
        });
  }

  answerSelected(event){
    let answers = this.state.answers
    if(event.target.name === "answer1"){
      answers.answer1 = event.target.value
      console.log(answers.answer1)
    }else if(event.target.name === "answer2"){
      answers.answer2 = event.target.value
      console.log(answers.answer2)
    }
    this.setState({answers: answers}, function(){
      console.log(this.state);
    })
  }


  render() {
    let userName; 
    let questions;
    let feedback;
    const { users } = this.state;
    if(this.state.userName === "" && this.state.submitted === false){
      userName = 
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-85 p-b-20" style={pad}>
            <h2>¡Dame tu nombre para ver los resultados!</h2>
            <br />
          <form className="login100-form validate-form" onSubmit={this.userSubmit}>
            <input className="input100" type="text" placeholder="Enter your name" ref="name" />
            <br />
            <br />
            <input  type="submit" value="submit" className="login100-form-btn"/>
          </form>
          </div>
        </div>
      </div>;
      questions = ""

    }else if (this.state.userName !== "" && this.state.submitted === false) {
      userName = <h2>¡Bienvenido {this.state.userName}! Resultados:</h2>;
        questions = 
          <div>
            <form onSubmit={this.questionsSubmit}>
              <div>
                <Charts NombresVotantes={this.state.NombresVotantes} Votaciones ={this.state.Votaciones} />
              </div>
                <br />
                <br />
              <div>
                <label>¿Te gustaría dejar algún comentario?</label>
                <br />
                <br />
                <input type="radio" name="answer2" value="yes" onChange={this.answerSelected}/>¡Sí, me gustaría!
                <br />
                <input type="radio" name="answer2" value="no" onChange={this.answerSelected}/>No, llévame directo a los resultados
              </div>
                <br />
              <input type="submit" value="submit" className="login100-form-btn"/>
            </form>
          </div>
    } else if (this.state.submitted === true && this.state.answers.answer2 === "yes" && this.state.feedbackSubmit === false){
      feedback = 
        <div>
          <h3>Feedback</h3>
          <form onSubmit={this.feedbackSubmit}>
            <div>
              <label>¡Por favor escríbenos tu sugerencia abajo!</label>
              <br />
              <br />
              <textarea name="feedback" cols="40" rows="8" onChange={this.userFeedback}></textarea>
            </div>
              <br />
            <input type="submit" value="submit" className="login100-form-btn"/>
          </form>
        </div>  
    } else if (this.state.submitted === true && this.state.answers.answer2 === "no" && this.state.feedbackSubmit === false){
       userName = <h2>Gracias de nuevo {this.state.userName}!</h2>
    }else if(this.state.submitted === true && this.state.answers.answer2 === "yes" && this.state.feedbackSubmit === true){
      userName = <h2>Gracias por el Feedback {this.state.userName}!</h2>
    }
    return (
    <div> 
      {!!users && <UserList users={users} />}
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-t-85 p-b-20" style={pad}>
            {userName}
              <br/>
            {questions}
            {feedback}
          </div>
        </div>
      </div>
    </div>
     );
  }
}
export default LandingPage;



