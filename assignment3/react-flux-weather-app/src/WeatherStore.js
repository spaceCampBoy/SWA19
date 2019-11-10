import {DateInterval} from "./model"

export default (init_model, view, renderer) => {
  let model = init_model

  function reducer(action, model) {
    switch(action.type) {
      case "QUERY_CITY":
        console.log(action)
        const { queryCity } = action
        return model.forPlace(queryCity)
      case "QUERY_FROM":
        const { queryDateFrom} = action
        const periodFromChanged = DateInterval(queryDateFrom, model.getQueryToDate())
        return model.forPeriod(periodFromChanged)
      case "QUERY_TO":
        console.log(action)
        const { queryDateTo} = action
        const periodToChanged = DateInterval(model.getQueryFromDate(), queryDateTo)
        return model.forPeriod(periodToChanged)
      case "QUERY_TYPE":
          const { queryType } = action
          return model.forType(queryType)
      case "ADD_TEMPRATURE":
          const{ tempData } = action
          return model.including([tempData])
      default:
        return model
    }
  }

  return action => {
    model = reducer(action, model)
    renderer(view(model))
  }
}