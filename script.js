const clear = document.querySelector('.clear')
const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const send = document.querySelector('.send')
const close = document.querySelector('#close')
const popup = document.querySelector('.popup')
const error = document.querySelector('.error-text')

const inputs = [username, pass, pass2, email]

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text')

    formBox.classList.add('error')
    errorMsg.textContent = msg
}

const clearError = (input) => {
    const formBox = input.parentElement; 
    const errorMsg = formBox.querySelector('.error-text')
    formBox.classList.remove('error')
}

const checkForm = (x) => {
    x.forEach (el => {
        if (el.value === '') {
            showError(el, el.placeholder)
        } else {
            clearError(el)
        }
    })
}

const checkLength = (input, min) => {
    if (input.value.length  < min) {
        showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z ${min} znaków`)
    }
}

const checkPass = (pass, pass2) => {
    if (pass.value !== pass2.value) {
        showError(pass2, `Hasła muszą być takie same!`)
    }
}

const checkMail = email => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regExp.test(email.value)) {
        clearError(email)
    } else {
        showError(email, `Email jest niepoprawny`)
    }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCount++;
        }
    })

    if (errorCount === 0) {
       popup.classList.add('show-popup')
    }
}

send.addEventListener('click', e => {
    e.preventDefault();
    checkForm(inputs)
    checkLength(username, 3)
    checkLength(pass, 8)
    checkPass(pass, pass2)
    checkMail(email)
    checkErrors()
})

clear.addEventListener('click', e => {
    e.preventDefault()

    inputs.forEach(el => {
        el.value = ''
    });

    inputs.forEach(el => {
        clearError(el)
    });
})
