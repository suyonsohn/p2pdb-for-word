const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually.
// Note that these options need to be passed to IPFS in
// all examples in this document even if not specified so.
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    }
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
    // Create OrbitDB instance
    const orbitdb = new OrbitDB(ipfs)
    const db = await orbitdb.keyvalue('word-database')
    console.log(db.address.toString())
    // /orbitdb/QmPjF3u91uQdLrSBY2TxawPbUnTx8kahQEUAYK1SYJhkmi/word-database

    const key = db.key
    // Public key is required to grant write access
    console.log(db.key.getPublic('hex'))


})