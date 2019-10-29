const SCSI = artifacts.require('./SCSI.sol')

require('chai')
.use(require('chai-as-promised'))
.should()

contract
(
    'SCSI', ([deployer, seller ,buyer]) => 
    {
        let scsi

        before
        (
            async () => 
            {
                scsi = await SCSI.deployed()
            }
        
        )

        describe
        (
            'deployment', async () => 
            {
                it
                (
                    'deploys successfully', async () => 
                    {
                        const address = await SCSI.address
                        assert.notEqual(address, 0x0)
                        assert.notEqual(address, '')
                        assert.notEqual(address, null)
                        assert.notEqual(address, undefined)
                    }
                )

                it
                (
                    'has a name', async () =>
                    {
                        const name = await scsi.name()
                        assert.equal(name, 'Smart Contract For Shared Inventory')
                    }
                )
            }
        )

        describe
        (
            'products', async () => 
            {
                let result, productCount

                before
                (
                    async () => 
                    {
                        result = await scsi.createProduct('Galaxy S9', web3.utils.toWei('1', 'Ether'), {from: seller})
                        productCount = await scsi.productCount()
                    }
        
                )

                it
                (
                    'creates products', async () =>
                    {
                        assert.equal(productCount, 1)
                        const event = result.logs[0].args
                        assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
                        assert.equal(event.name, 'Galaxy S9', 'name is correct')
                        assert.equal(event.price, '1000000000000000000', 'price is correct')
                        assert.equal(event.owner, seller, 'owner is correct')
                        assert.equal(event.purchased, false, 'purchased is correct')
                        
                        await await scsi.createProduct('', web3.utils.toWei('1', 'Ether'), {from:seller}).should.be.rejected;
                        await await scsi.createProduct('', 0, {from:seller}).should.be.rejected;

                    }
                )

                it
                (
                    'lists products', async () =>
                    {
                        const product = await scsi.products(productCount)
                        assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
                        assert.equal(product.name, 'Galaxy S9', 'name is correct')
                        assert.equal(product.price, '1000000000000000000', 'price is correct')
                        assert.equal(product.owner, seller, 'owner is correct')
                        assert.equal(product.purchased, false, 'purchased is correct')
                    }
                )
            }
        )

    }
)