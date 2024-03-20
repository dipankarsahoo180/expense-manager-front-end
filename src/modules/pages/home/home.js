import { LightningElement } from 'lwc';
import {categoryList} from './categoryList'
const SERVER_URL = 'http://localhost:3004'
const ADD_ACTION = 'ADD'
export default class Home extends LightningElement{
    expenseRecords =[]
    categoryTableData=[]
    chartData
    showModal = false
    formData={}
    action

    //Define a getter for category options
    get categoryOptions(){
        return categoryList
    }


    async connectedCallback(){
      const expenses = await this.getExpenses()
      console.log("expenses", expenses)
      this.expenseRecords = expenses.totalSize > 0 ? expenses.records :[]
      this.createChartData()
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

    //edit row handler
    editHandler(event){
        console.log(event.detail)
    }
    //delete row handler
    deleteHandler(event){
        console.log(event.detail)
    }
  // Method to create chart data based on expenses
    createChartData(){
        const categorySums = {}

        this.expenseRecords.forEach(item=>{
            const {Amount__c,Category__c} = item
            // Check if the category already exists in the sums object
            if(categorySums[Category__c]){
                categorySums[Category__c] += Amount__c
            } else {
                categorySums[Category__c] = Amount__c
            }
        })
        console.log("categorySums", categorySums)
        this.categoryTableData = Object.keys(categorySums).map((item,index)=>{
            return ({
                "id":index+1,
                "category":item,
                "amount":this.formatCurrency(categorySums[item])
            })
        })
        console.log(" this.categoryTableData ",  this.categoryTableData )
        this.chartData = {
            labels:Object.keys(categorySums),
            results:Object.values(categorySums)
        }
    }

    formatCurrency(number){
        return number.toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        })
    }

    //Modal Cancel Handler
    cancelHandler(){
        console.log("Cancel Clicked")
        this.showModal = false
    }

    //Modal Save Handler
    saveHandler(){
        
        if(this.isFormValid()){
            this.showModal = false
            console.log("Save Clicked success", this.formData)
        } else {
            console.log("Save Clicked Validation failed")
        }
        
    }

    // Add Expense Handler
    addExpense(){
        this.showModal  = true
        this.formData={}
        this.action= ADD_ACTION
    }

    //form change handler
    changeHandler(event){
    //    const name = event.target.name  //Expense_Name__c
    //    const value = event.target.value //utility
        const {name, value} = event.target
        this.formData={...this.formData, [name]:value}
    }

    //form Validation handler
    isFormValid(){
        let isValid = true
       let inputFields = this.template.querySelectorAll('.validate')
       inputFields.forEach(inputField=>{
        if(!inputField.checkValidity()){ 
            inputField.reportValidity()
            isValid = false
        }
       })
       return isValid
    }
}