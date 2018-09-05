const env = process.env.NODE_ENV;

let develop = {
  getAppsUrl : "http://localhost:5008/get_apps",
  getGroumsUrl : "http://localhost:5008/get_groums",
  searchUrl : "http://localhost:5008/search",
  srcServiceUrl : "http://localhost:8080/src"
}

let production = {
  getAppsUrl : "http://biggroum_search:8081/get_apps",
  getGroumsUrl : "http://biggroum_search:8081/get_groums",
  searchUrl : "http://biggroum_search:8081/search",
  srcServiceUrl : "http://srcfinder:8080/src"
}


let config_array = {"develop" : develop,
                    "production" : production}

let config = config_array[env]

global.config = config;
export default config
