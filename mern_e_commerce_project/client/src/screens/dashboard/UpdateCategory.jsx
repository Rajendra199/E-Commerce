import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom"
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from '../../components/Spinner';
import { addCategory } from '../../redux-toolkit/reducers/categoryReducer';
import { useGetParticularCategoryQuery, useUpdateCategoryMutation } from '../../redux-toolkit/services/createService';
import Wrapper from "./Wrapper";


const UpdateCategory = () => {
    const {id} = useParams();
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory]= useState({});

    const categoryChange = (e) => {
        setCategory(e.target.value)
    }

    const {data, isFetching} = useGetParticularCategoryQuery(id);
    console.log("responsesss", data, isFetching);

    useEffect(() => {
        data?.category && setCategory(data?.category?.name);
    }, [data?.category]);

    const [updateCategoryMethod, response] = useUpdateCategoryMutation();
    console.log("update", response);

    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : []

    const updateCategory = (e) => {
        e.preventDefault();
        updateCategoryMethod({name:category, id});
    }

    useEffect(() => {
        if(response.isSuccess){
            dispatch(addCategory(response?.data?.message));
            navigate('/dashboard/categories');
        }
    }, [response?.isSuccess])


    return(
       <Wrapper>
           <ScreenHeader>
              <Link to="/dashboard/categories" className="btn-dark"><i className="bi bi-arrow-left-short"></i> categories list</Link>
           </ScreenHeader>
           {
               !isFetching ? 
               (
                    <form className="w-full md:w-8/12" onSubmit={updateCategory}>
                        <h3 className="text-lg capitalize mb-3">update category</h3>
                        {errors.length > 0 && errors.map((error, key) => (
                            <p className="alert-danger" key={key}>{error.msg}</p>
                        ))}
                        <div className="mb-3">
                            <input 
                                type="text" 
                                name="category" 
                                value={category}
                                onChange={categoryChange}
                                className="form-control" 
                                placeholder="Category Name..." 
                            />
                        </div>
                        <div className="mb-3">
                            <input type="submit" value="Update" className="btn-indigo" />
                        </div>
                    </form>
               ) : 
               (
                   <Spinner />
               )
           }
       </Wrapper>
    )
}
export default UpdateCategory;