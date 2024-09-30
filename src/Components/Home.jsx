import { useEffect, useState } from "react";
import './Home.css';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'
import Ad from './Ad';
function printDate(dateString){
    const months = ["January", "February", "March", "April","May", "June", "July", "August","September", "October", "November", "December"]
    
    const date = new Date(dateString);
    
    // Extracting the components
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0'); // Ensures two digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensures two digits
    // Formatting the date string
    return `${monthName} ${day}, ${year} ${hours}:${minutes}`;
}
const Home = () => {
    const navigate = useNavigate(); 
    const [selectedID, setSelectedID] = useState('')
    const [data, setData] = useState([])
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(2);
    const [DataScrollCountLimit, setDataScrollCountLimit] = useState(0)
    // const [visibleCount, setVisibleCount] = useState(() => {
        // const savedCount = localStorage.getItem('visibleCount');
        // return savedCount ? JSON.parse(savedCount) : 2; // Default to 2 if not found
    // });
    

    useEffect(() => {
        fetchData();

        // localStorage.setItem('visibleCount', JSON.stringify(visibleCount));
    }, []); //[visibleCount]


    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/');
            setData(res.data);
            setDataScrollCountLimit(res.data.length)
            console.log(res.data.length);
            
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigate = (id) => {navigate(`/update/${id}`)}

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${id}`);
            fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error(`Error deleting record: ${error.message}`);
        }
    };
    
    const loadMore = () => {
        setStartIndex(endIndex)
        setEndIndex(prevCount => prevCount + 2)
        // setVisibleCount(prevCount => prevCount + 2); // Load 2 more rows
      };
    const previous = () => {
        setEndIndex(startIndex)
        setStartIndex(prevCount => prevCount - 2)
        // setVisibleCount(prevCount => prevCount + 2); // Load 2 more rows
      };
    
    const slicedData = data.slice(startIndex, endIndex);

    return (<div>
        <div className="content-list">
        <Ad />
            {data.length === 0 ? "Data is no more" : slicedData.map((d, i) => (<div key={i} className="content-container"  onClick={()=>setSelectedID(d.id)}>
                <div className="content">
                    <h3>{d.title}</h3>
                    <p>{printDate(d.update_date)} </p>
                    <p>{selectedID == d.id ? d.description : d.description.substring(0, 150)+"......." }</p>
                    <input type="button" className="update-btn" value='மாற்று' onClick={()=>handleNavigate(d.id)}/>
                    <input type="button" className="delete-btn" value='நீக்கு' onClick={() => handleDelete(d.id)}/>
                </div>
                <div className="image" style={{width: selectedID == d.id ?'60%':'20%'}}>
                    <img src="https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/pamban-bridge-1657626900_807115d4ec289b1376cd.webp" className="image-img"/>
                </div>
            </div>))
            }
            {startIndex >= 2 && <input type="button" className="load-more-btn" onClick={previous} value="பின் செல்" />}
            {endIndex < DataScrollCountLimit && <input type="button" className="load-more-btn" onClick={loadMore} value="மேலும்" />}
        </div>
    </div >)
}

export default Home;