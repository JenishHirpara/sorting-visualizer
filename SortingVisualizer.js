import React,{ Component } from 'react';
import './SortingVisualizer.css';


export default class SortingVisualizer extends Component{
    
    state = {
        array: [],
        };
    
    componentDidMount(){
        this.resetArray();
    }

    resetArray = () => {
        const array = [];
        for(let i=0; i<20; i++){
            array.push(this.randomIntfromInterval(5,650));
        }
        this.setState({array})
    }

    setPauses = ( time_in_ms ) => new Promise ((resolve) => 
    setTimeout(resolve,time_in_ms)
    );

    randomIntfromInterval = (min, max) => {
        return Math.floor(Math.random()*(max - min + 1) + min)
    }

    async bubbleSort(){
        var sorted = [];
        const arraybar = document.getElementsByClassName('array-bar');
        sorted = this.state.array;
        for(let i=0; i<sorted.length; i++){
            await this.setPauses(100);
            for(let j=1; j<sorted.length-i; j++){
                await this.setPauses(500);
                if(sorted[j]<sorted[j-1]){
                    arraybar[j-1].style.backgroundColor = 'red';
                    arraybar[j].style.backgroundColor = 'red';
                    setTimeout(() =>{
                        this.setState({swap:j+1});
                        var temp;
                        temp = sorted[j];
                        sorted[j] = sorted[j-1];
                        sorted[j-1] = temp;
                    },40)
                }
                
                setTimeout(() => {
                    arraybar[j-1].style.backgroundColor = 'magenta';
                    arraybar[j].style.backgroundColor = 'magenta';
                    arraybar[sorted.length-i-1].style.backgroundColor = 'green';
                },1000);
                this.setState({array:sorted})
            }
        }
        setTimeout(() => {
            arraybar[0].style.backgroundColor = 'green';
        },100);
        
    }

    render(){
        const {array} = this.state;
        return(
            <div className="array-container">
              {array.map((value,index) => {
                      return (<div className="array-bar" key={index} style={{height: `${value}px` }}></div>)
                  })
              }
              <button onClick={() => {this.resetArray()}} className="block">Generate new array</button>
              <button onClick={() => {this.bubbleSort()}} className="block">Bubble Sort</button>
            </div>
            
            
        ); 
    }
}