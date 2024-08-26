const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe('NFTMarketplace (proxy)', function () {

    let NFTMarketplace;
    let nftmarketplace;
    let marketplace;

    beforeEach(async function () 
    {
        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        nftmarketplace = await upgrades.deployProxy(NFTMarketplace, { initializer: 'initialize' });
        marketplace = nftmarketplace;
        [user1, user2] = await ethers.getSigners();
    });

    it("should create new market items and return market items by seller", async function () 
    {
        const tx = await marketplace.createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const tx1 = await marketplace.createToken("TokenURI1", ethers.parseUnits("0", "ether"));
        const signer2 = await ethers.provider.getSigner(user2.address);
        let marketItems = await marketplace.getMarketItemsBySeller(user1.address);
        expect(marketItems.length).to.equal(2);
        const ownerOfTokenAfter = null;
        let i = 1;
        for(let item of marketItems) 
        {

            expect(item.tokenId).to.equal(i);
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(marketplace.target);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(0);
            expect(item.sold).to.equal(false);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(marketplace.target);
            i ++;
        }
    });

    it("should create new market items change state and return active market items", async function () 
    {
        const signer1 = await ethers.provider.getSigner(user1.address);
        const signer2 = await ethers.provider.getSigner(user2.address);
        let price = ethers.parseUnits("0", "ether");
        const tx = await marketplace.connect(signer1).createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const tx1 = await marketplace.connect(signer2).createToken("TokenURI1", ethers.parseUnits("0", "ether"));
        const token1 = 1;
        const token2 = 2;
        try 
        {
            await marketplace.connect(signer2).changeItemStateAndPrice(token1, price, BigInt(0));
            expect.fail("Transaction did not revert as expected");
        }
        catch (error)
        {
            expect(error.message).to.contain("Caller is not the seller of the item");
        }
        try 
        {
            price = ethers.parseUnits("0", "ether");
            await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(1));
            expect.fail("Transaction did not revert as expected");
        }
        catch (error)
        {
            expect(error.message).to.contain("Item is already set to this state");
        }
        try 
        {
            await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
            expect.fail("Transaction did not revert as expected");
        }
        catch (error)
        {
            expect(error.message).to.contain("Price must be at least 1 wei");
        }
        price = ethers.parseUnits("0.003", "ether");
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
        let marketItems = await marketplace.getActiveMarketItems();
        expect(marketItems.length).to.equal(1);
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(marketplace.target);
            expect(item.state).to.equal(BigInt(0));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(marketplace.target);
        }
        price = ethers.parseUnits("0", "ether");
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(1));
        marketItems = await marketplace.getActiveMarketItems();
        expect(marketItems.length).to.equal(0);
        marketItems = await marketplace.getMarketItemsBySeller(user1.address);
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(marketplace.target);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(marketplace.target);
        }
    });

    it("should create new market items change state to active and sell market item", async function () 
    {
        const signer1 = await ethers.provider.getSigner(user1.address);
        const signer2 = await ethers.provider.getSigner(user2.address);
        let price = ethers.parseUnits("1.00005", "ether");
        const tx = await marketplace.connect(signer1).createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const token1 = 1;
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
        let marketItems = await marketplace.getActiveMarketItems();
        expect(marketItems.length).to.equal(1);
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(marketplace.target);
            expect(item.state).to.equal(BigInt(0));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(marketplace.target);
        }
        await marketplace.connect(signer2).purchaseMarketItem(token1, { value: price });
        marketItems = await marketplace.getMarketItemsBySeller(user2.address);
        price = ethers.parseUnits("0", "ether");
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user2.address);
            expect(item.owner).to.equal(user2.address);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(user2.address);
        }
        price = ethers.parseUnits("10", "ether");
        await marketplace.connect(signer2).changeItemStateAndPrice(token1, price, BigInt(0));
        marketItems = await marketplace.getActiveMarketItems();
        expect(marketItems.length).to.equal(1);
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user2.address);
            expect(item.owner).to.equal(marketplace.target);
            expect(item.state).to.equal(BigInt(0));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(marketplace.target);
        }
        price = ethers.parseUnits("0", "ether");
        await marketplace.connect(signer2).changeItemStateAndPrice(token1, price, BigInt(1));
        marketItems = await marketplace.getMarketItemsBySeller(user2.address);
        expect(marketItems.length).to.equal(1);
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user2.address);
            expect(item.owner).to.equal(user2.address);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(user2.address);
        }
    });

    it("should create new market items, change state to active, sell market item, and resell market item again", async function () 
    {
        const signer1 = await ethers.provider.getSigner(user1.address);
        const signer2 = await ethers.provider.getSigner(user2.address);
        let price = ethers.parseUnits("1.00005", "ether");
        const tx = await marketplace.connect(signer1).createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const token1 = 1;
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
        await marketplace.connect(signer2).purchaseMarketItem(token1, { value: price });
        await marketplace.getMarketItemsBySeller(user2.address);
        await marketplace.connect(signer2).changeItemStateAndPrice(token1, price, BigInt(0));
        await marketplace.connect(signer1).purchaseMarketItem(token1, { value: price });
        marketItems = await marketplace.getMarketItemsBySeller(user1.address);
        expect(marketItems.length).to.equal(1);
        price = ethers.parseUnits("0", "ether");
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(user1.address);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(user1.address);
        }
    });

    it("should create new market items, change state to active, and retrieve active market item", async function () 
    {
        const signer1 = await ethers.provider.getSigner(user1.address);
        let price = ethers.parseUnits("1.00005", "ether");
        const tx = await marketplace.connect(signer1).createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const token1 = 1;
        try 
        {
            marketItem = await marketplace.getActiveMarketItem(token1);
            expect.fail("Transaction did not revert as expected");
        }
        catch (error)
        {
            expect(error.message).to.contain("This item is not for sale");
        }
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
        marketItem = await marketplace.getActiveMarketItem(token1);
        expect(marketItem.seller).to.equal(user1.address);
        expect(marketItem.owner).to.equal(marketplace.target);
        expect(marketItem.state).to.equal(BigInt(0));
        expect(marketItem.price).to.equal(price);
        const ownerOfTokenAfter = await marketplace.ownerOf(marketItem.tokenId);
        expect(ownerOfTokenAfter).to.equal(marketplace.target);
    });

    it("should create new market items, change state to active, sell item and transfer ownership", async function () 
    {
        const signer1 = await ethers.provider.getSigner(user1.address);
        const signer2 = await ethers.provider.getSigner(user2.address);
        let price = ethers.parseUnits("1.00005", "ether");
        const tx = await marketplace.connect(signer1).createToken("TokenURI", ethers.parseUnits("0", "ether"));
        const token1 = 1;
        await marketplace.connect(signer1).changeItemStateAndPrice(token1, price, BigInt(0));
        try 
        {
            await marketplace.connect(signer1).transferFrom(user1.address, user2.address, token1);
            expect.fail("Transaction did not revert as expected");
        }
        catch (error)
        {
            expect(error.message).to.contain("ERC721: caller is not token owner or approved");
        }
        await await marketplace.connect(signer2).purchaseMarketItem(token1, { value: price });
        await marketplace.connect(signer2).transferFrom(user2.address, user1.address, token1);
        marketItems = await marketplace.getMarketItemsBySeller(user1.address);
        expect(marketItems.length).to.equal(1);
        price = ethers.parseUnits("0", "ether");
        for(let item of marketItems) 
        {
            expect(item.seller).to.equal(user1.address);
            expect(item.owner).to.equal(user1.address);
            expect(item.state).to.equal(BigInt(1));
            expect(item.price).to.equal(price);
            const ownerOfTokenAfter = await marketplace.ownerOf(item.tokenId);
            expect(ownerOfTokenAfter).to.equal(user1.address);
        }
    });
});