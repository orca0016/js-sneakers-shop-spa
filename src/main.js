import './style.css'
import { loginPage } from './pages/login-page';

import Navigo from 'navigo';
import { emailIcon } from './utils/icons';
const app = document.getElementById('app')

const router = new Navigo('/');
router.on('/login', () => {
//   alert("/about")

loginPage()

}).on('/signup',()=>{
    console.log("tesyyyyyy");
    
})
router.resolve();
