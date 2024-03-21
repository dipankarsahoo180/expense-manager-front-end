import { LightningElement,api } from "lwc";

export default class Navbar extends LightningElement{
    @api loggedInUser

    get userName(){
        return this.loggedInUser? this.loggedInUser.display_name :''
    }

}