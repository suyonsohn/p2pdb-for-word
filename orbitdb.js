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

    const access = {
        write: [
            // Give write access to ourselves
            orbitdb.key.getPublic('hex'),
            // Give access to peer
            // '04b2071b3d2e2a0cfecc47b12b765165576bdd6dc441bca71e279e5a7ffbc2ba2f5b554bb5e7a111092430611148ec39a11fcf999810b04be069d151776ca55e0d',
            // Give write access to everyone. Access controller hash in the address will change.
            // '*',
        ],
    }

    const db1 = await orbitdb.keyvalue('word-database', access)
    // Add entry
    await db1.put('name', 'hello')
    await db1.close()

    // Load the database locally before using it 
    const db2 = await orbitdb.keyvalue('word-database')
    await db2.load()
    // Get entry
    const value = db2.get('name')
    console.log(`GET ENTRY: ${value}`)

    // /orbitdb/QmPjF3u91uQdLrSBY2TxawPbUnTx8kahQEUAYK1SYJhkmi/word-database
    console.log(`DB ADDRESS: ${db1.address.toString()}`)

    // Second peer opens the database from the address
    // const db2 = await orbitdb.keyvalue(db1.address.toString())

    // const key = db.key
    // Public key is required to grant write access
    // console.log(`If I give my public key to you, you have to let me write to your db: ${db.key.getPublic('hex')}`)
})