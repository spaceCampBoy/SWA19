import { parseWithOptions } from "date-fns/fp"

export default store => async ({type, ...params}) =>  {
    switch(type) {
      // case 'hire':
      //   const { id } = params
      //   const salary = window.prompt('Salary?')
      //   if (salary) {
      //     const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
      //     const employee = await fetch('http://localhost:9090/employees',
      //       { method: 'POST', 
      //         body: JSON.stringify({ salary, manager: false }), 
      //         headers}).then(res => res.json())
      //     const person = await fetch('http://localhost:9090/persons/' + id,
      //       { method: 'PATCH', 
      //         body: JSON.stringify({ employeeId: employee.employeeId }), 
      //         headers}).then(res => res.json())
      //     store({type, ...params, employee, person})
      //   }
      //   break;

      case "QUERY_CITY":
          store({type, ...params})
            break;
            
      case "QUERY_FROM":
          store({type, ...params})
          break;
                  
      case "QUERY_TO":
          store({type, ...params})
        break;

      case "QUERY_TYPE":
          store({type, ...params})
        break;
        
      case "ADD_TEMPRATURE":
          const tempData = {
            type: "temperature",
            time: params.time,
            place: "Aarhus",
            value: params.value,
            unit: "C"
          }

          const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }
          const weather = await fetch('http://localhost:8080/data',
            { 
              method: 'POST', 
              body: JSON.stringify([tempData]), 
              headers
            })//.then(res => console.log(res))

          store({type, ...params, tempData})
        break;

      default:
    }
}