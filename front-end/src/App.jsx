import './App.css'
import {Routes, Route} from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Home from './components/home/Home'
import ProductDetails from './components/home/ProductDetails'


function App() {

  return (
<Routes>
  <Route path='/signup' element={<SignUp/>}></Route>
  <Route path='/signin' element={<SignIn />}></Route>
  <Route path='/' element={<Home />}></Route>
  <Route path='/:id' element={<ProductDetails />}></Route>

</Routes>
  )
}

export default App
