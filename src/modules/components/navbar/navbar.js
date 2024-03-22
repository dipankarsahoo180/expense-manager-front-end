import { LightningElement,api } from "lwc";
const BACKEND_URL = 'http://localhost:3002'
export default class Navbar extends LightningElement{
    @api loggedInUser
    
    get userName(){
        return this.loggedInUser? this.loggedInUser.display_name :''
    }

    get logOutUrl(){
        return `${BACKEND_URL}/oauth2/logout`
    }

}