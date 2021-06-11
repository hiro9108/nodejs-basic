const router = require('express').Router()

const employeeService = require('../service/employeesData')

//GET /employees
router.get('/', (req, res) => res.json(employeeService.getAll()))

//GET /employees/:id
router.get('/:id', (req, res) => {
    const employeeId = req.params.id
    return res.json(employeeService.getById(employeeId))
})

//POST /employees
router.post('/', (req, res) => {
    const newEmployee = req.body
    return res.json(employeeService.save(newEmployee))
})

//DELETE /employees/:id
router.delete('/', (req, res) => {
    const employeeId = req.params.id
    return res.json(employeeService.deleteById(employeeId))
})

module.exports = router