import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import './Add.css'

const Update = () => {
    const navigate = useNavigate();
    // const history = useHistory();
    
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [picture_description, setPictureDescription] = useState('');
    
    // const { id } = useParams(); // Get the ID from the URL
    // useEffect(() => {
    //     fetchData(id);
    // }, [])

    // const fetchData = async (id) => {
    //     try {
    //         const res = await axios.get(`http://localhost:8000/${id}`);
    //         console.log(res.data);
            
    //         setTitle(res.data.title)
    //         setDescription(res.data.description)
    //         setPictureDescription(res.data.picture_description)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture_description, setPictureDescription] = useState('');
    
    const { id } = useParams(); // Get the ID from the URL

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]); // Added id to dependencies

    const goHome = () =>{
        setTitle('');
        setDescription('');
        setPictureDescription('');
        navigate('/')
    }

    const fetchData = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8000/${id}`);
            console.log(res.data[0]);
            
            // Assuming your API always returns a valid response
            setTitle(res.data[0].title || '');
            setDescription(res.data[0].description || '');
            setPictureDescription(res.data[0].picture_description || '');
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('started ');
            const response = await axios.put(`http://localhost:8000/update/${id}`, { title, description, picture_description });
            navigate('/')
            console.log('Data submitted:', response.data);
            // Optionally redirect after successful update
            //history.push('/'); // Redirect to home or another page
        } catch (error) {
            console.error('There was an error submitting the data:', error);
        }
    };

    return (
        <div className="add-container">
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <label>Picture Description</label>

                <input
                    type="text"
                    name="picture_description"
                    value={picture_description}
                    onChange={(e) => setPictureDescription(e.target.value)}
                />
                <label>Description</label>
                <textarea name="description" id="" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                
                
                <input type="submit" value="Update" />
                <input type="button" className="cancel-btn" value="Cancel" onClick={()=>goHome()}/>
            </form>
        </div>
    );
};

export default Update;
