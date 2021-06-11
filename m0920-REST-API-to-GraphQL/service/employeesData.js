const employeesData = [
    {
        id: 1,
        name: 'Danny',
        department: 'IT'
    },
    {
        id: 2,
        name: 'Koji',
        department: 'IT'
    },
    {
        id: 3,
        name: 'Ayumi',
        department: 'IT'
    },
    {
        id: 4,
        name: 'Nico',
        department: 'IT'
    }
]

function validateEmployee(employee){
    if(!(employee.name && employee.department)){
        throw new Error('Employee Name and Department is required')
    }
}

//get all the employees
function getAll(){
    return employeesData
}

//save a new employee
function save(employee){
    validateEmployee(employee)
    const newEmployee = employee
    const lastEmployee = employeesData[employeesData.length - 1] || { id: 0 }
    const lastEmployeeId = lastEmployee.id
    newEmployee.id = lastEmployeeId + 1
    employeesData.push(newEmployee)
    return employee
}

//get employee by id
function getById(employeeId){
    const employee = employeesData.filter(item => item.id === +employeeId)
    if(employee.length === 0){
        throw new Error(`Employee Resource with id ${employeeId} not found`)
    }
    return employee[0]
}

//delete employee by id
function deleteById(employeeId){
    const employeeIndex = employeesData.findIndex(item => item.id === +employeeId)
    if(employeeIndex === -1){
        throw new Error(`Employee Resource with id ${employeeId} not found`)
    }
    employeesData.splice(employeeIndex, employeeIndex + 1)
    return { id: employeeId }
}

module.exports = {
    getAll,
    save,
    getById,
    deleteById
}