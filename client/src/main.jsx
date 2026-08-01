
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextAll from './context/userContextAll.jsx'


createRoot(document.getElementById('root')).render(

<UserContextAll>   
<BrowserRouter>

    <App />

</BrowserRouter>
</UserContextAll>

)


