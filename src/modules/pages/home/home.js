import { LightningElement } from 'lwc';
const SERVER_URL = 'http://localhost:3004' //npx json-server db.json -p 3004 to start server
export default class Home extends LightningElement{
    async connectedCallback(){
      const expenses = await this.getExpenses()
      console.log("expenses", expenses)
    }

    //Method to get Expenses data
    async getExpenses(){
        const url = `${SERVER_URL}/expenses`
        return await this.makeApiRequest(url)
    }

    //Generic API Method
    async makeApiRequest(url, method = 'GET', data=null){
        try{
            const requestOptions = {
                method,
                headers:{
                    'Content-Type':'application/json'
                },
                body:data ? JSON.stringify(data):null
            }
            const response = await fetch(url, requestOptions)
            if(!response.ok){
                throw new Error(response.statusText)
            }
            return response.json()
        }catch(error){
            console.log("Error Occurred", error)
        }

    }
}