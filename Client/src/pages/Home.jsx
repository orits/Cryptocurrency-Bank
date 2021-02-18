import React, { Component } from "react";
import api from "../api";
import { CanvasJSReact } from '../components';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: [],
            isLoading: true
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading: true});
        var temp_coin = []
        await api.getCoinsPie().then((res) => {
            var i = 0
            for (var x in res.data) {
                temp_coin.push({
                        y: res.data[x].toFixed(2),
                        label: x
                 })
            }
            
            this.setState({
                coins: temp_coin
            });
        })
      }
    render() { 
        const options = {
			theme: "light1",
			animationEnabled: true,
			title:{
				text: "Current State"
			},
			data: [{
				type: "pie",
				showInLegend: true,
                startAngle: 90,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: this.state.coins
			}]
		}
        return (  
            <div >
                {
                    this.state.coins.length > 0 ?
                    <CanvasJSChart options = {options} />
                    :
                    <h5 style={{ textAlign: "center" }}> No coins has found to display! </h5> 
                }
            </div>
        );
    }
}
 
export default Home;