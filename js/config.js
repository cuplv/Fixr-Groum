const env = process.env.NODE_ENV;

let develop = {
  compute_url: "http://localhost:30072/compute/method/groums",
  provenance : "http://localhost:30072/query/provenance/groums",
  srcServiceUrl : "http://localhost:8088/src"
}

let production = {
  compute_url: "http://localhost:30072/compute/method/groums",
  provenance : "http://localhost:30072/query/provenance/groums",
  srcServiceUrl : "http://localhost:8080/src"
}



let config_array = {"develop" : develop,
                    "production" : production}

let config = config_array[env]

global.config = config;
export default config
