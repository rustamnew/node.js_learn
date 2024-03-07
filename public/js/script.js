if (document.querySelector('form')) {
    const form = document.querySelector('form')
    const inputs = form.querySelectorAll('input[name]')
    const textareas = form.querySelectorAll('textarea[name]')

    let formData = {}

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        inputs.forEach((input) => {
            formData[input.name] = input.value
        })
        textareas.forEach((input) => {
            formData[input.name] = input.value
        })

        fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
    })
}


function getData() {
    const login = document.querySelector('#login-input').value
    fetch('/api/user/' + login)
    .then(response => response.json())
    .then(result => {
        if (result.status === 'ok') {
            document.querySelector('#data').innerHTML = result.body
        }
    })
}