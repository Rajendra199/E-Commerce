import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
import ScreenHeader from "../../components/ScreenHeader";
import { addCategory } from '../../redux-toolkit/reducers/categoryReducer';
import { useCreateCategoryMutation } from '../../redux-toolkit/services/createService';
import Wrapper from "./Wrapper"


const CreateCategory = () => {
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory]= useState("");

    const categoryChange = (e) => {
        setCategory(e.target.value)
    }

    const [saveCategory, data] = useCreateCategoryMutation();
    console.log(data);

    const errors = data?.error?.data?.errors ? data?.error?.data?.errors : []

    const submitCategory = (e) => {
        e.preventDefault();
        saveCategory({name: category});
    }

    useEffect(() => {
        if(data.isSuccess){
            dispatch(addCategory(data?.data?.message));
            navigate('/dashboard/categories');
        }
    }, [data?.isSuccess])
    return(
       <Wrapper>
           <ScreenHeader>
              <Link to="/dashboard/categories" className="btn-dark"><i className="bi bi-arrow-left-short"></i> categories list</Link>
           </ScreenHeader>
           <form className="w-full md:w-8/12" onSubmit={submitCategory}>
               <h3 className="text-lg capitalize mb-3">create category</h3>
               {errors.length > 0 && errors.map((error, key) => (
                   <p className="alert-danger" key={key}>{error.msg}</p>
               ))}
               <div className="mb-3">
                   <input 
                        type="text" 
                        name="" 
                        value={category}
                        onChange={categoryChange}
                        className="form-control" 
                        placeholder="Category Name..." 
                    />
               </div>
               <div className="mb-3">
                   <input type="submit" value={data.isLoading ? "loading..." : "create category"} className="btn-indigo" />
               </div>
           </form>
       </Wrapper>
    )
}
export default CreateCategory;