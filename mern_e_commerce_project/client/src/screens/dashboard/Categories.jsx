import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom"
import Pagination from "../../components/Pagination";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { addCategory, clearCategory } from "../../redux-toolkit/reducers/categoryReducer";
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../redux-toolkit/services/createService";
import Wrapper from "./Wrapper"


const Categories = () => {
    let {page} = useParams();
    if(!page){
       page = 1;
    }
    const {success} = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {data = [], isLoading} = useGetCategoryQuery(page);
    console.log(data, isLoading);

    useEffect(() => {
        return () => {
            dispatch(clearCategory());
        }
    },[]);

    const [removeCategory, response] = useDeleteCategoryMutation();
    console.log("delete", response);

    const deletCategory = (id) => {
       if(window.confirm('Are you really want to delete the category?')){
         removeCategory(id);
       }
    }

    useEffect(() => {
       if(response?.isSuccess){
         dispatch(addCategory(response?.data?.message));
         navigate('/dashboard/categories');
       }
    },[response?.isSuccess]);
    return(
       <Wrapper>
           <ScreenHeader>
              <Link to="/dashboard/create-category" className="btn-dark">add categories <i className="bi bi-plus"></i></Link>
           </ScreenHeader>
           {success && <div className="alert-success">{success}</div>}
            {
               !isLoading ? data?.categories?.length > 0 && 
               <>
                  <div>
                     <table className="w-full bg-gray-900 rounded-md">
                        <thead>
                           <tr className="border-b border-gray-800 text-left">
                              <th className="p-3 uppercase text-sm font-medium text-gray-500">name</th>
                              <th className="p-3 uppercase text-sm font-medium text-gray-500">edit</th>
                              <th className="p-3 uppercase text-sm font-medium text-gray-500">delete</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data?.categories?.map(category => (
                              <tr key={category._id} className="odd:bg-gray-800">
                                 <td className="p-3 capitalize text-sm font-normal text-gray-400">{category.name}</td>
                                 <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/dashboard/update-category/${category._id}`} className="btn btn-warning">edit</Link></td>
                                 <td className="p-3 capitalize text-sm font-normal text-gray-400"><button className="btn btn-danger" onClick={() => deletCategory(category._id)}>delete</button></td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <Pagination page={parseInt(page)} count={data.count} perPage={data.perPage} path="dashboard/categories" />
               </> : <Spinner />
            }
       </Wrapper>
    )
}
export default Categories;