const rbacMatrix = {

  fleet_manager: {
    dashboard: "write",
    vehicles: "write",
    drivers: "write",
    trips: "write",
    maintenance: "write",
    fuel: "write",
    expenses: "write",
    reports: "write",
    settings: "write",
  },

  dispatcher: {
    dashboard: "read",
    vehicles: "read",
    drivers: "read",
    trips: "write",
    maintenance: "none",
    fuel: "none",
    expenses: "read",
    reports: "read",
    settings: "none",
  },

  safety_officer: {
    dashboard: "read",
    vehicles: "read",
    drivers: "write",
    trips: "read",
    maintenance: "write",
    fuel: "none",
    expenses: "none",
    reports: "read",
    settings: "none",
  },

  financial_analyst: {
    dashboard: "read",
    vehicles: "read",
    drivers: "none",
    trips: "read",
    maintenance: "read",
    fuel: "write",
    expenses: "write",
    reports: "write",
    settings: "none",
  },

};

export default rbacMatrix;