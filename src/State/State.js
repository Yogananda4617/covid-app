import React,{useState,useRef,useEffect} from 'react';
import "./state.css";
import { Bar } from "react-chartjs-2";


const State = ({statenames,content}) => {
const [value, setValue] = useState("");
const [statedis, setStatedis] = useState();
const [active,setActive] =useState();
const [totalcases, setTotalcases] = useState();

const profitChartRef = useRef();

   
  
useEffect(() => {
  
  // when component unmounts
  return () => {
     if (profitChartRef?.current) {
        profitChartRef.current.chartInstance.destroy();
    }
      
    }
  }, [])
// console.log(content);
const onChange = (event) => {
    setValue(event.target.value);
  };

const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // console.log(value);
    // console.log(content[`${searchTerm}`]['districtData']);
    var stateOfDist = Object.keys(content[`${searchTerm}`]['districtData']);
    
    var activecases = stateOfDist.map( e =>{
      return content[`${searchTerm}`]['districtData'][e]['active']
    })
    
    // console.log(activecases);
    var totcases = stateOfDist.map( e =>{
      return content[`${searchTerm}`]['districtData'][e]['confirmed']
    })
    
    // var sortdis = stateOfDist.map( (e,i)=>{
    //   return{
    //     'sortdistrictName':e,
    //     'sortactivecases':activecases[i],
    //     'sortTotalcases':totcases[i]
    //   }
    // }) 
    // console.log(sortdis);
    setStatedis(stateOfDist);
    setActive(activecases);
    setTotalcases(totcases);
    // sorting(stateOfDist,activecases,totcases);
    
    
  };


const sorting =(stateOfDist,activecases,totcases) =>{

    var sortdis = stateOfDist.map( (e,i)=>{
      return{
        'sortdistrictName':e,
        'sortactivecases':activecases[i],
        'sortTotalcases':totcases[i]
      }
    }) 
    console.log("before",sortdis);
  //  var sorteddis = [...sortdis.sort((a,b) => (a.sortTotalcases - b.sortTotalcases) )]
   var sorteddis = [...sortdis.sort((a,b) => (a.sortTotalcases < b.sortTotalcases) ? 1 : ((b.sortTotalcases < a.sortTotalcases) ? -1 : 0))]
   console.log(sorteddis,"after sorting");

  let sortstaedis = sorteddis.map((e)=>{
    return e.sortdistrictName;
  })
  let sortactive = sorteddis.map((e)=>{
    return e.sortactivecases;
  })
  let sorttotal = sorteddis.map((e)=>{
    return e.sortTotalcases;
  })
   setStatedis(sortstaedis);
    setActive(sortactive);
    setTotalcases(sorttotal);

}

  return (
    <div>
    <div className="state">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {statenames
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
      <button onClick={()=>sorting(statedis,active,totalcases)}>Sort</button>
    </div>
        
        <div style={{width:800,height:600}}>
        
       <Bar
        ref={profitChartRef}
        data={{
          
          labels: statedis ? statedis :[],
          datasets: [
            {
              label: 'Total Cases',
              data: totalcases ? totalcases : [],
              backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
              ],
              borderColor: [
                // 'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Active Cases',
              data: active ? active : [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                // 'rgba(54, 162, 235, 1)',
                
              ],
              borderWidth: 1,
            }
            
          ],
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

 {/* useEffect(() => {
  var myChart = new Chart(table, config);

  // when component unmounts
  return () => {
      myChart.destroy()
    }
  }, []) */}
{/* Sandeep Kumar Kotta10:51 AM
useEffect(() => {
    const cfg = {
      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    };
    const chart = new Chart(canvas.current.getContext('2d'), c */}
    </div>
  )
}

export default State;