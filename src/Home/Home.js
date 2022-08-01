import React,{useState,useEffect} from 'react';
import { Bar } from "react-chartjs-2";

const Home = ({statenames,content}) => {
  let [statename,setStatename] =useState(statenames);
  let [datas,SetData]= useState();
 
  console.log(statenames,content)
  function onload(){
  let values = statenames.map(e => {
    return(
      Object.values(content[e]["districtData"])
    )
  })
  let data = values.map(e => {
    return( e.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue.confirmed;
  }, 0))
  })
  console.log(data);
  SetData(data);
  }
  useEffect(() =>{
    onload();
  },[])
  
const sorting =(statenames,data) =>{
      var sortstates = statenames.map( (e,i)=>{
      return{
        'sortstateName':e,
        'sortTotalcases':data[i]
      }
    }) 
    console.log(sortstates);
  
   var sortedstates = [...sortstates.sort((a,b) => (a.sortTotalcases < b.sortTotalcases) ? 1 : ((b.sortTotalcases < a.sortTotalcases) ? -1 : 0))]
   console.log(sortedstates,"after sorting");

  let sortstana = sortstates.map((e)=>{
    return e.sortstateName;
  })
  
  let sorttotal = sortstates.map((e)=>{
    return e.sortTotalcases;
  })
   console.log(sortstana,sorttotal)
  setStatename(sortstana)
  SetData(sorttotal);
  // data=sorttotal;
  // statenames = sortstana;

}


  return (
    <div>
      <button onClick={()=>sorting(statename,datas)}>Sort</button>
    <div>
        <Bar
       
        data={{
          labels: statename ,
          datasets: [
            {
              label: 'Total Cases',
              data: datas ,
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            }
            
          ]
        }}        
        options={{
          scales: {
            yAxes: {
                  beginAtZero: true,
            },
          },
        }}
      />  
    </div>
    </div>
  )
}

export default Home