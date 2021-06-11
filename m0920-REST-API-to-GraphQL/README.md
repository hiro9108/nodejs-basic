# in javascript/react

```
    const deleteReq = `
        mutation{
            deleteEmployee(id: 4){
            id
        }
    }
    `

    fetch('/graphql', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteReq)
    })
```