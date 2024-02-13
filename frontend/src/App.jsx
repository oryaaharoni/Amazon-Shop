import './App.css'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import Footer from './components/shared/Footer.jsx'
import Header from './components/shared/Header.jsx'
import SignIn from './components/HomePage/SignIn.jsx'
import SignUp from './components/HomePage/SignUp.jsx'
import { Container } from './import.js'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import DescriptionPage from './pages/DescriptionPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ShippingPage from './pages/ShippingPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import SubmitOrderPage from './pages/SubmitOrderPage.jsx'
import SummaryPage from './pages/SummaryPage.jsx'
import SearchPage from './pages/SearchPage.jsx'

function App() {
  return(
    <BrowserRouter>
    <div className='d-flex flex-column side-allPage min-width'>
      {/* limit = קופוץ רק פעם אחת ההודעה  */}
      <ToastContainer position='bottom-center' limit={1}/>
     <Header/>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path="/" element={<HomePage/>}> </Route>
            <Route path="/signin" element={<SignIn/>}> </Route>
            <Route path="/signup" element={<SignUp/>}> </Route> 
            <Route path="/product/:token" element={<DescriptionPage/>}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/shipping" element={<ShippingPage/>}></Route>
            <Route path="/payment" element={<PaymentPage/>}></Route>
            <Route path="/placeorder" element={<SubmitOrderPage/>}></Route>

            <Route path="/orders/:id" element={<SummaryPage/>}></Route>
            <Route path="/search" element={<SearchPage/>}></Route>

          </Routes>
        </Container>
      </main>
      <Footer></Footer>
    </div>
    </BrowserRouter>
  )
}

export default App
