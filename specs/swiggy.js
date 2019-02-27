describe('swiggy ui automation', function() {
  
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
   });

    it('to do task', async function() {
      browser.waitForAngularEnabled(false);
      browser.ignoreSynchronization = true;

      let propertiesReader = require('properties-reader');
      let baseProperties = propertiesReader('./properties/Base.properties');
      let loginPageProperties = propertiesReader('./properties/SwiggyLoginPage.properties');
      let homePageProperties = propertiesReader('./properties/SwiggyHomePage.properties'); 
      let searchPageProperties = propertiesReader('./properties/SearchPage.properties');
      let pizzaPageProperties = propertiesReader('./properties/PizzaPage.properties');
      let checkoutPageProperties = propertiesReader('./properties/CheckoutPage.properties');
      
      const waitTimer = 30000;
      const pizzaHut = 'Pizza Hut';
      let withoutDiscountTotalPrice;
      let withDiscountTotalPrice;

      browser.get(baseProperties.get('url'));
      browser.wait(ExpectedConditions.visibilityOf(
          element(by.css(loginPageProperties.get('enterYourDeliveryLocation')))),
            waitTimer, 'error message');
      element(by.css(loginPageProperties.get('locateMe'))).click();
      browser.wait(ExpectedConditions.elementToBeClickable(
          element(by.xpath(homePageProperties.get('search')))), waitTimer, 'error message');
      element(by.xpath(homePageProperties.get('search'))).click();
      browser.wait(ExpectedConditions.elementToBeClickable(
           element(by.css(homePageProperties.get('searchRestaurants')))), waitTimer, 'error message');
      element(by.css(homePageProperties.get('searchRestaurants'))).sendKeys(baseProperties.get('pizza'));
     
      browser.wait(ExpectedConditions.visibilityOf(
        element(by.xpath(searchPageProperties.get('searchResultText')))), waitTimer, 'error message');
     
      element.all(by.css(searchPageProperties.get('searchItemsRows')))
        .getWebElements().then((searchItemsRows) => {
                let found = false;
                 a1: for (let i=0; i<searchItemsRows.length; i++) {
                     searchItemsRows[i].getText().then(res => {
                       console.log(res);
                       if (res.includes(pizzaHut)) {
                         browser.sleep(5000);
                         searchItemsRows[i].click();
                         found = true;
                         browser.sleep(5000);
                        if (element(by.xpath("//div[@class='_3pEBA']")).isPresent().then(result => {
                             if (result) {
                              browser.wait(ExpectedConditions.presenceOf(
                                element.all(by.css(searchPageProperties.get('third'))).get(0), 15000));        
                                element.all(by.css(searchPageProperties.get('third'))).get(0).click();
                                console.log('pop up present');
                             }
                        })) { }
                  
                          
                          browser.sleep(3000);
                          browser.wait(ExpectedConditions.elementToBeClickable(
                          element(by.css(pizzaPageProperties.get('vegOnly')))), waitTimer); 
                          element(by.css(pizzaPageProperties.get('vegOnly'))).click();
                          
                          browser.sleep(10000);
                          browser.wait(ExpectedConditions.elementToBeClickable(
                            element(by.css(pizzaPageProperties.get('searchBox')))), waitTimer); 
                          element(by.css(pizzaPageProperties.get('searchBox'))).sendKeys('Margherita');

                          browser.sleep(5000);
                          browser.wait(ExpectedConditions.elementToBeClickable(
                            element.all(by.css(pizzaPageProperties.get('addButton'))).get(0)), waitTimer); 
                          element.all(by.css(pizzaPageProperties.get('addButton'))).get(0).click();
                          
                          browser.sleep(5000);       
                          browser.wait(ExpectedConditions.presenceOf(
                            element(by.css(pizzaPageProperties.get('popUp')))), waitTimer);
                            
                            if (res.includes(pizzaHut)) {
                              browser.wait(ExpectedConditions.elementToBeClickable(
                                element.all(by.xpath(pizzaPageProperties.get('toppings'))).get(0)), waitTimer); 
                              element(by.xpath(pizzaPageProperties.get('toppings'))).click();  
                              browser.sleep(5000);
                             
                                browser.wait(ExpectedConditions.elementToBeClickable(
                                  element(by.xpath(pizzaPageProperties.get('onions')))), waitTimer); 
                                  element(by.xpath(pizzaPageProperties.get('onions'))).click();
                                  browser.sleep(2000);
                                  browser.wait(ExpectedConditions.elementToBeClickable(
                                    element(by.xpath(pizzaPageProperties.get('tomatoes')))), waitTimer); 
                                    element(by.xpath(pizzaPageProperties.get('tomatoes'))).click(); 
                                  browser.sleep(2000);
                                  browser.wait(ExpectedConditions.elementToBeClickable(
                                    element(by.xpath(pizzaPageProperties.get('blackOlives')))), waitTimer); 
                                    element(by.xpath(pizzaPageProperties.get('blackOlives'))).click(); 
                                  browser.sleep(2000);
                                  browser.wait(ExpectedConditions.elementToBeClickable(
                                    element(by.xpath(pizzaPageProperties.get('mushrooms')))), waitTimer); 
                                    element(by.xpath(pizzaPageProperties.get('mushrooms'))).click(); 
                                  browser.sleep(2000);
                                  browser.wait(ExpectedConditions.elementToBeClickable(
                                    element(by.xpath(pizzaPageProperties.get('addItem')))), waitTimer); 
                                    element(by.xpath(pizzaPageProperties.get('addItem'))).click();
                                  browser.sleep(10000);

                                  browser.wait(ExpectedConditions.elementToBeClickable(
                                   element(by.css(checkoutPageProperties.get('checkout')))), waitTimer); 

                                  element(by.xpath(checkoutPageProperties.get('withoutDiscountTotalPrice')))
                                        .getText()
                                        .then((withoutDTotalPrice) => {
                                            withoutDiscountTotalPrice = withoutDTotalPrice;
                                            console.log('Total Prices without Discount ' + withoutDiscountTotalPrice);    
                                            return withoutDiscountTotalPrice;
                                        });

                                        element(by.xpath(checkoutPageProperties.get('withDiscountTotalPrice')))
                                        .getText()
                                        .then((withDTotalPrice) => {
                                            withDiscountTotalPrice = withDTotalPrice;
                                            console.log('Total Prices without Discount ' + withDiscountTotalPrice);    
                                            return withDiscountTotalPrice;
                                        });     

                                    browser.wait(ExpectedConditions.elementToBeClickable(
                                          element(by.css(checkoutPageProperties.get('checkout')))), waitTimer);
              
                                   element(by.css(checkoutPageProperties.get('checkout'))).click(); 
                                   browser.sleep(5000);

                                   browser.wait(ExpectedConditions.presenceOf(
                                    element(by.xpath(checkoutPageProperties.get('price')))), waitTimer); 
                                    
                                      element(by.xpath(checkoutPageProperties.get('price'))).getText()
                                      .then((totalPrice) => {
                                          if (withoutDiscountTotalPrice.includes(totalPrice)){
                                            console.log('Total Price Matched ', totalPrice);
                                          }
                                      });
                            }
                       }
                     });

                     if (found === true) {
                      break a1;
                       }
                    }                     
      });
  
      
    });
  });