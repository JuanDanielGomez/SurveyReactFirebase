import React, { Component } from 'react'
const {Pie} = require("react-chartjs-2")

class Charts extends Component {
  constructor(props){
    super(props);
    this.state={
    Votaciones: props.Votaciones,
    NombresVotantes: props.NombresVotantes
    }
  }

  render() {
    console.log(this.props)
    const lengthVotaciones  = (this.state.Votaciones).length/2
    const lengthNombres  = (this.state.NombresVotantes).length/2
    const Labels = this.state.NombresVotantes.splice(0,lengthNombres)
    const Voters = this.state.Votaciones.splice(0,lengthVotaciones)
    const chartData = {
      labels:Labels,
      datasets: [
        {
          label: "Votaciones",
          data: Voters,
          backgroundColor: [
            "rgba(255,99,132,0.6)",
            "rgba(400,130,55,0.6)",
            "rgba(255,206,80,0.6)",
            "rgba(150,99,200,0.6)",
            "rgba(100,99,132,0.6)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 0, 0, 0.8)"
          ],
          radius:  "90%", 
          innerRadius: "70%"
        }
      ]
    }
 
    return (
      <div className="chart">
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio:true,
          radiusPercentage: 20,
          title: {
            display: false,
            text: "Resultado Votaciones",
            fontSize: 20
          },
          legend:{
            display:true,
            position:"left"
          },
        }}
      />
    </div>
    );
  }
}
export default Charts;