import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import './Add.css'
const Add = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [picture_description, setpictureDescription] = useState('')

    const goHome = () =>{
        setTitle('');
        setDescription('');
        setpictureDescription('');
        navigate('/')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/add', { title, description, picture_description});
            console.log('Data submitted:', response.data);
            // Optionally reset the form
            goHome();
        } catch (error) {
            console.error('There was an error submitting the data:', error);
        }
    };


    return (<div className="add-container">
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" id="" onChange={(e) => setTitle(e.target.value)} />
            <label>Picture Description</label>
            <input type="text" name="picture_description" id="" onChange={(e) => setDescription(e.target.value)} />
            <label>Description</label>
            <textarea name="description" id="" onChange={(e) => setpictureDescription(e.target.value)} ></textarea>
            <input type="submit" value="Submit" />
            <input type="button" className="cancel-btn" value="Cancel" onClick={()=>goHome()}/>
        </form>
    </div>)
}

export default Add;