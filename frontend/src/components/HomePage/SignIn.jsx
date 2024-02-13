import { Container, axios, Form, useState, Button, Link, useContext, toast, useNavigate, useEffect} from "../../import.js";
import { getError } from "../../utils.jsx";
import Title from "../shared/Title.jsx";
import { Store } from "../../Store.jsx";
import { useLocation } from "react-router-dom";

//usestatesnipped=קיצור ליוז סטייט
const SignIn = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    try {
      const { data } = await axios.post("/api/v1/users/signin", {
        email: email,
        password: password,
      });

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      //stringify(data);- נשמר בסטרינגים בלוכל סטורג וכדי להפוך את זה לאובייקטים נשתמש בזה
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Container className="small-container">
      <Title title="Sign In Page" />
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
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
        {/* mb= margin button */}
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3">
          forgot password? <Link to="/reset">Reset password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
