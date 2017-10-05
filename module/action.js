export default class ModulesHandler {
  constructor (modules) {
    this.modules = modules
    this.setActions()
  }

  setActions () {
    let mapActions = {}
    this.modules.forEach(module => {
      module.actions.forEach(action => {
        mapActions[action.name] = action
      })
    })
    this.mapActions = mapActions
  }
}
