# initial seed for venue, jumbotron, footer, announcement, event

venues = Venue.create!([
    { name: 'Jame\'s Cool Bar', street: '21 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.google.com', venue_image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&w=1000&q=80'},
    { name: 'Paul\'s Cool Club', street: '22 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.amazon.com', venue_image: 'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?width=1040'},
    { name: 'John\'s Cool House', street: '23 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.yahoo.com', venue_image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg'},
    { name: 'Tony\'s Cool Arcade Palace', street: '24 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.gmail.com', venue_image: 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2017/07/187144066.jpg?quality=90&strip=all&zoom=1&resize=644%2C428&ssl=1'},
    { name: 'Jame\'s Cool Bar', street: '21 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.google.com', venue_image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&w=1000&q=80'},
    { name: 'Paul\'s Cool Club', street: '22 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.amazon.com', venue_image: 'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?width=1040'},
    { name: 'John\'s Cool House', street: '23 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.yahoo.com', venue_image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg'}    
])

jumbotron = Jumbotron.create!(
    line1: 'Time to drink!', 
    line2: 'WonderBar Projections Inc', 
    line3: 'Come party with the homies!'
    )

footer = Footer.create!(
    name: 'Promotion Company',
    street: '55 Congress St',
    citystate: 'Boston, MA 02110',
    contact1: 'James@test.com',
    contact2: 'P: 617-594-5555',
    contact3: 'Paul@test.com',
    contact4: 'Buddy@test.com',
    facebook: 'www.facebook.com',
    twitter: 'www.twitter.com',
    instagram: 'www.instagram.com',
    other: 'www.amazon.com'
)

company = Company.create!(
    description: "this is the beginning of a company description"
)

announcement = Announcement.create!(
    description: "hello, we are going to party soon", 
    flier: "https://www.templatemonster.com/blog/wp-content/uploads/2015/12/christmas-psd-freebie.jpg",
    title: "place title here"
)

event = Event.create!([
    { title: "Christmas time party", date: Date.parse('2019-12-25'), time: "10:00", location: "Wonder Bar" },
    { title: "Halloween time party", date: Date.parse('2019-10-31'), time: "10:00", location: "The Grand" },
    { title: "Thirsty Thursday", date: Date.parse('2019-12-25'), time: "10:00", location: "Scorpian Bar" },
    { title: "New years bash", date: Date.parse('2019-12-31'), time: "10:00", location: "Big Night" }
])