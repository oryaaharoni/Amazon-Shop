import { useLocation } from 'react-router-dom';
import { useEffect, Form, InputGroup, FormControl, Button, useState, useNavigate } from '../../import.js';
import { getFilterURI } from '../../utils.jsx'

const SearchBox = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { search }= useLocation();

  useEffect(() => {
    if (!query) {
        return;
    }
    const filterURI = getFilterURI(search, {query: query});
    navigate(filterURI);
  },[query, navigate, search]);

  const submitHandler = (e) =>{
    //מונע ריפרוש של הדף
    e.preventDefault();
    const filterURI = getFilterURI(search, {query: query});
    navigate(filterURI);
  }

  return (
    //me-auto= קח את כל הדברים שיש לי ושים אותם אחריי  w-50= 
    <Form className="d-flex me-auto w-50" onSubmit={submitHandler}>
        <InputGroup>
            <FormControl type="text" name="q" id="q" placeholder="Search" aria-describedby="button-search" 
                onChange={(e)=> setQuery(e.target.value)}></FormControl>
            <Button variant="outline-primary" id="button-search" type='submit'>
                <i className="fa fa-search"></i>
            </Button>
        </InputGroup>
    </Form>
  )
}

export default SearchBox;