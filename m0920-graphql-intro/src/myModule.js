const message = 'Some message'

const name = 'Sam'

const greeting = (name) => {
    return `Welcome to my page, ${name}`
}

//named export
export { message, name, greeting as default }