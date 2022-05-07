const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'bfsmrbin',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'skWGxhhsPIbizHHsnP9szmBQuxmHo6TX9HmcPSMCgae0n0sTibTHddL6LIx0bid1zvYEhEN9qLzLuXmagSrHAnKY26pRT3Jolf56pRZpMmIFsk2OVbgeHHyJM9DGQAwcByys6Wj41k5qBLuYei8aHtPa0dIWcpWVCn1ayu4z2U6m2Obmhni2', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export default client 