import noble from '@abandonware/noble'

noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning(['181a'], false)
    console.log('Scanning...')
  } else {
    noble.stopScanning()
  }
})

noble.on('discover', async (peripheral) => {
  if (peripheral.advertisement.localName === 'LYWSD02') {
    console.log('Found LYWSD02, stopping scan...')
    noble.stopScanning()

    console.log('Connecting...')
    await peripheral.connectAsync()
    console.log('Discovering service...')
    const [service] = await peripheral.discoverServicesAsync(['ebe0ccb07a0a4b0c8a1a6ff2997da3a6'])
    console.log('Discovering characteristic...')
    const [characteristic] = await service.discoverCharacteristicsAsync(['ebe0ccb77a0a4b0c8a1a6ff2997da3a6'])

    const arrayBuffer = new ArrayBuffer(5)
    const view = new DataView(arrayBuffer)
    const now = new Date()
    // Set time to now + 30 seconds
    view.setUint32(0, Math.floor(now.getTime() / 1000) + 30, true)
    // Set timezone offset in hours
    view.setInt8(4, -Math.floor(now.getTimezoneOffset() / 60))
    console.log('Updating clock to:', now.toISOString())

    await characteristic.writeAsync(Buffer.from(arrayBuffer), false)
    console.log('Success!')
    process.exit(0)
  }
})
