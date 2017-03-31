/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(null);
        });

        // this test uses a for loop to loops through all feeds in the array and to check them for a url
        it('has a URL', function() { 
        	for (var i = 0; i < allFeeds.length; i++) {
        	expect(allFeeds[i].url).toBeDefined();
        	expect(allFeeds[i].url).not.toBeNull();
        	expect(allFeeds[i].url).toContain('http');
        	};
        	
        	
        });

       
         //Same as the prevous test but with the name object instead
        it('has a Name', function() { 
        	for (var i = 0; i < allFeeds.length; i++) {
        	expect(allFeeds[i].name).toBeDefined();
        	expect(allFeeds[i].name).not.toBeNull();
        	};
        	
        	
        });
    });

    //The start of menu testing funcitons
    describe('The menu', function() {
    	
        //Checks the DOM for the value menu-hidden
    	it('starts with a hidden menu', function() {
    		expect($('body').hasClass('menu-hidden')).toBe(true);
    		expect($('menu-hidden')).toBeDefined();    		
    	});
        //triggers the menu dom manipulation and checks for the corisponding changes to the dom
    	it('has a toggleable menu', function() {
    		$('a.menu-icon-link').trigger('click');
    		expect($('body').hasClass('menu-hidden')).toBe(false);

    		$('a.menu-icon-link').trigger('click');
    		expect($('body').hasClass('menu-hidden')).toBe(true);
    	})

    });

    //Loads one of the feeds and tests if the menu has rss feed entries
    describe('Initial Entries', function() {
    	beforeEach(function(done) {
    		loadFeed(0, done);
    	});
    	it('has entries', function() {
    		expect($('.feed')).not.toBe(undefined);
    		expect($('.feed')).not.toBeNull();
    	});
    });

    //Loads one of the feeds and tests if changing feeds changes hyperlinks
    describe('Selecting a New Feed', function() {
    	var prevousContents
    	beforeEach(function(done) {
    		loadFeed(0, function() {
    			prevousContents = $('.feed').html();
    			console.log($('.feed').html());
    			done();
    		});
    	});
        //Loads a seprate feed to refrence with the last one loaded
    	it('changes feeds', function(done){
    		loadFeed(1, function(){
                expect($('.feed')[0] !== prevousContents).toBe(true);
                done();
            });
    	});
    });

}());
