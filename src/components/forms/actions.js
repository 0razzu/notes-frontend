const handleInputChange = (event, stateMutator) => {
    event.preventDefault()
    stateMutator(event.target.value)
}


export {
    handleInputChange,
}
