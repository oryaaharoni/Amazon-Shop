import { Container, axios, Form, useState, Button, Link, useContext, useNavigate, toast, useEffect} from "../../import.js";
import Title from "../shared/Title.jsx";
import { Store } from "../../Store.jsx";
import { getError } from "../../utils.jsx";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const {state, dispatch: ctxDispatch } = useContext(Store);
  const {userInfo}= state;

  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search);
  const redirectValue = redirectUrl.get("redirect");
  const redirect = redirectValue? redirectValue : "/";

  useEffect(()=>{
    if (userInfo){
        navigate(redirect);
    }
  },[navigate, redirect,userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password != confirmPassword){
      toast.error("passwords must match , please try again..");
      return;
    }
    try {
      
      const { data } = await axios.post("/api/v1/users/signup", {
        name: name,
        email: email,
        password: password
      });

      //maybe change -change to SINGOUT (storeReducer)
      ctxDispatch({ type: "USER_SIGNUP", payload: data });
      //stringify(data);- נשמר בסטרינגים בלוכל סטורג וכדי להפוך את זה לאובייקטים נשתמש בזה
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } 
    catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container className="small-container">
    <Title title="Sign up Page" />
    <h1 className="my-3">Sign Up</h1>
    <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name: </Form.Label>
        <Form.Control
          required
          onChange={(e) => setname(e.target.value)}
          placeholder="example"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="example1234"
          type="password"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="example1234"
          type="password"
        ></Form.Control>
      </Form.Group>
      <div className="mb-3">
        <Button type="submit">Sign Up</Button>
      </div>
      <div className="mb-3">
        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
      </div>
    </Form>
  </Container>
  )
}

export default SignUp;