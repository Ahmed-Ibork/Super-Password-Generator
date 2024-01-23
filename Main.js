// Get Password Place From Container :
let Password = document.querySelector('.password')

// Get Password Copy From Password :
let PasswordCopy = document.querySelector('.Copy')

// Get Password Paste From Password :
let PasswordPaste = document.querySelector('.Paste')

// Get CheckBox Inputs From Control :
let CheckBoxInputs = document.querySelectorAll('.password-type input')

// Get PasswordLength Input From Control :
let PasswordLength = document.querySelector('.password-length input')


     /* Start Super Password Generator Logic : */
                                
// Password Contents Object :
let StrongPasswordContent = {
    UpperCase : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    LowerCase : 'abcdefghijklmnopqrstuvwxyz'.split(''),
    Numbers : '0123456789'.split(''),  
    Symboles : `!"#$%&'()*+,-./\`:;<=>?@[\]^_{|}~`.split(''),
}

// Object Keys :
let Keys = Object.keys(StrongPasswordContent)

// Password Content Array Chosed From User :
let PasswordContentArray = [];

// Password Generate :
let SuperPassword = ''

// Check If There Is An Old Password :
if (window.localStorage.getItem('SuperPasswordInfo')) {
    let Info = JSON.parse(window.localStorage.getItem('SuperPasswordInfo'))

    // The Latest Password generated :
    Password.textContent = Info[1]

    // The Latest Length Inputed :
    PasswordLength.value = Info[0]

    // CheckBox => Mode On :
    Info[2].forEach( x => CheckBoxInputs[x].setAttribute('checked', ''))
    
}

CheckBoxInputs.forEach( (x, i) => {
    x.onclick = function () {
            // Clear PasswordContentArray Content :
            PasswordContentArray = [];

            // Append The Content Of Checkboxs To PasswordContentArray :
            CheckBoxInputs.forEach((x, i) => {x.checked ? PasswordContentArray = PasswordContentArray.concat(StrongPasswordContent[Keys[i]]) : ''})
            
            // Check, Generate Password And Watch Out :
            PasswordContentArray.length === 0 ?  Password.textContent = '': GeneratePassword()

            // Add Info To Locale Storage :
            AddPasswordToLocaleStorage()  
    }
})

PasswordLength.oninput = function () {
    // Check And Watch Out :
    PasswordContentArray.length === 0 ? CheckBoxInputs.forEach((x, i) => {x.checked ? PasswordContentArray = PasswordContentArray.concat(StrongPasswordContent[Keys[i]]) : ''}) : ''
    
    if (PasswordLength.value <= 50 && PasswordLength.value >= 6) {
        GeneratePassword()
    } else {
        PasswordLength.value = 10
        GeneratePassword()
    }
    AddPasswordToLocaleStorage() 
}

function GeneratePassword() {
    SuperPassword = ''
    for (let i = 0; i < PasswordLength.value; i++) {
        PasswordContentArray.length !== 0 ? SuperPassword += PasswordContentArray[Math.floor(Math.random() * PasswordContentArray.length)] : ''
    }
    Password.textContent = SuperPassword
}

function AddPasswordToLocaleStorage() {
    let Info = [PasswordLength.value, Password.textContent, []]
    CheckBoxInputs.forEach((x, i) => {x.checked ? Info[2].push(i) : ''})
    window.localStorage.setItem('SuperPasswordInfo', JSON.stringify(Info))
}

// Copy Button Event For Copy Password :
PasswordCopy.onclick = e => {
    navigator.clipboard.writeText(Password.textContent)
    e.target.classList.toggle('Super')
    setTimeout( () => e.target.classList.toggle('Super'), 4000)
}
// Paste Button Event For Paste SomeThing Copied On Password And Save It In LocalStorage :
PasswordPaste.onclick = e => {
    navigator.clipboard.readText().then((Result) => Password.textContent = Result).then( Result => AddPasswordToLocaleStorage())
    e.target.classList.toggle('Super')
    setTimeout( () => e.target.classList.toggle('Super'), 4000)
}

fetch('Json_File.json')
.then( Result => Result.json() )
.then( Result => Result )
.then( Result => console.log(Result.FirstName, Result.LastName) )
.catch( Rejected => console.log(Error('Sorry But This File Not Fount ==> [Code 404]')))






async function GetInfo() {
    let List = ['Ahmed', 'Ibork']
    if (List.length > 2) {
        return 'You Did It !'
    } else {
        return `You Didn't It !`
    }
}
console.log(GetInfo().then( Result => console.log(Result) ).catch( Result => console.log(Result)))
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\
function GetInfo() {
    let List = ['Ahmed', 'Ibork']
    if (List.length > 2) {
        return Promise.resolve('You Did It !')
    } else {
        return Promise.reject(`You Didn't It !`)
    }
}
console.log(GetInfo().then( Result => console.log(Result) ).catch( Result => console.log(Result)))

