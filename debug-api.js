// Simple API test script
const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing QuickLinks API...');
    const quickLinksResponse = await fetch('http://localhost:3000/api/bank-data?type=quick-links&locale=en');
    const quickLinksData = await quickLinksResponse.json();
    console.log('QuickLinks Response:', JSON.stringify(quickLinksData, null, 2));

    console.log('\nTesting Products API...');
    const productsResponse = await fetch('http://localhost:3000/api/bank-data?type=products&locale=en&featured=true');
    const productsData = await productsResponse.json();
    console.log('Products Response:', JSON.stringify(productsData, null, 2));

    console.log('\nTesting Carousel API...');
    const carouselResponse = await fetch('http://localhost:3000/api/bank-data?type=carousel&locale=en');
    const carouselData = await carouselResponse.json();
    console.log('Carousel Response:', JSON.stringify(carouselData, null, 2));

  } catch (error) {
    console.error('API Test Error:', error);
  }
}

testAPI();
