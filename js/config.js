let config = {
  compute_url: "http://localhost:30072/compute/method/groums",
  provenance : "http://localhost:30072/query/provenance/groums",
  // compute_url: "http://localhost:8081/compute/method/groums",
  // provenance : "http://localhost:8081/query/provenance/groums?",
  srcServiceUrl : "http://localhost:8080/src"
}

global.config = config

export default config
