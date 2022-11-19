class Calculator{
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText
        this.currentOpText = currentOpText
        this.clear()
    }

    clear(){
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined
    }

    delete(){
        this.currentOp = this.currentOp.toString().slice(0, -1)

    }

    

    appendNumber(number){
        if(number==='.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOp === '') return
        if(this.currentOp !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp.toString() + ' ' + this.operation.toString()
        this.currentOp = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOp)
        const curr = parseFloat(this.currentOp)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '/':
                computation = prev / curr
                break
            case 'x':
                computation = prev * curr
                break
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            default:
                return
        }
        this.currentOp = computation
        this.operation = undefined
        this.previousOp = ''

    }

    updateDisplay(){
        this.currentOpText.innerText = this.currentOp
        this.previousOpText.innerText = this.previousOp
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOpText = document.querySelector('[data-previous-operation]')
const currentOpText = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOpText, currentOpText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})
