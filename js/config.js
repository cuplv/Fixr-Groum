const env = process.env.NODE_ENV;

let develop = {
  getAppsUrl : "http://localhost:5008/get_apps",
  getGroumsUrl : "http://localhost:5008/get_groums",
  searchUrl : "http://localhost:5008/search",
  srcServiceUrl : "http://localhost:8080/src"
}

let production = {
  compute_url: "http://biggroum_search:8081/compute/method/groums",
  provenance : "http://biggroum_search:8081/query/provenance/groums",
  srcServiceUrl : "http://srcfinder:8080/src"
}



let config_array = {"develop" : develop,
                    "production" : production}

let config = config_array[env]

global.config = config;
export default config
