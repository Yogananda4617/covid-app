import React,{useState} from 'react';
import "./district.css";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

const District = ({districtnames,districtData}) => {
    const [value, setValue] = useState("");
    const [district, setDistrict] = useState();
    const [data, setData] = useState({
        datasets: [{
            data: [10, 30],
            backgroundColor:[
            
            'red',
            'green'
            ]
        },
    ],
    labels: [
        
        'active',
        'recovered'
    ], 
    });
    // console.log(districtnames,districtData)

    const onChange = (event) => {
    setValue(event.target.value);
    };

    const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // console.log(value);
    for(let i=0; i<districtData.length;i++){
    if(districtData[i][`${searchTerm}`]){
        setDistrict( districtData[i][`${searchTerm}`]);
        }
    }
    // console.log(district);
    let cases=[];
    // cases.push(district.confirmed);
    cases.push(district.active);
    cases.push(district.recovered);
    // console.log(cases);

    setData(
          {
            datasets: [{
                data:cases,
                backgroundColor:[
                  
                  'red',
                  'green'
                ]
            },
          ],
          labels: [
                
                'active',
                'recovered'
            ], 
        }
        )

    };



  return (
    <div>
    <div className='district'>
        <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input type="text" value={value} onChange={onChange} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown">
          {districtnames
            .filter((item) => {
                // console.log((item));
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
    </div>


    <div className="pie-chart" style={{width:'30%', height:'30%'}}>
      <Doughnut data={data? data : {}}/>
    </div>

{
district ?

    <div>
        Total Cases: {district.confirmed}
        <br/>
        Active Cases: {district.active}
        <br/>
        Recovered Cases: {district.recovered}
    </div>
    :" "
}


    </div>
  )
}

export default District