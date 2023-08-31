import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { fetchItems } from '../features/dataSlice'
const Blogs = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data);
console.log(items,'@@@@@@@@@@')
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);


  //   axios.get('http://localhost:8000/api/blogs')
  // .then(response => {
  //   // Handle successful response here
  //   console.log(response.data,'data access');
  // })
  // .catch(error => {
  //   // Handle error here
  //   console.error('An error occurred:', error);
  // });


  return (
    <div>
      <h2>Blogs data</h2>
   
    </div>
  );
   
 
}

export default Blogs
