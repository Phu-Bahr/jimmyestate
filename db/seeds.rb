# venues = Venue.create!([
#     { name: 'Jame\'s Cool Bar', street: '21 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.google.com', venue_image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&w=1000&q=80'},
#     { name: 'Paul\'s Cool Club', street: '22 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.amazon.com', venue_image: 'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?width=1040'},
#     { name: 'John\'s Cool House', street: '23 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.yahoo.com', venue_image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg'},
#     { name: 'Tony\'s Cool Arcade Palace', street: '24 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.gmail.com', venue_image: 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2017/07/187144066.jpg?quality=90&strip=all&zoom=1&resize=644%2C428&ssl=1'},
#     { name: 'Jame\'s Cool Bar', street: '21 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.google.com', venue_image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&w=1000&q=80'},
#     { name: 'Paul\'s Cool Club', street: '22 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.amazon.com', venue_image: 'https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?width=1040'},
#     { name: 'John\'s Cool House', street: '23 Jump', city: 'Boston', state: 'MA', zip: '02111', telephone: '555-555-5555', url: 'www.yahoo.com', venue_image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg'}    
# ])

# jumbotron = Jumbotron.create!(
#     line1: 'Time to drink!', 
#     line2: 'WonderBar Projections Inc', 
#     line3: 'Come party with the homies!'
#     )

# footer = Footer.create!(
#     name: 'Promotion Company',
#     street: '55 Congress St',
#     citystate: 'Boston, MA 02110',
#     contact1: 'James@test.com',
#     contact2: 'P: 617-594-5555',
#     contact3: 'Paul@test.com',
#     contact4: 'Buddy@test.com',
#     facebook: 'www.facebook.com',
#     twitter: 'www.twitter.com',
#     instagram: 'www.instagram.com',
#     other: 'www.amazon.com',
#     zillow: 'www.amazon.com',
#     realtor: 'www.amazon.com'
# )

# company = Company.create!(
#     description: "this is the beginning of a company description",
#     title: "edit your title here"
# )

# announcement = Announcement.create!(
#     description: "hello, we are going to party soon", 
#     flier: "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
#     title: "place title here"
#     bannerImage: "test"
# )

# event = Event.create!([
#     { title: "Natick Open House", date: Date.parse('2020-12-25'), time: "10:00", location: "Natick" }
# ])

# about = About.create!(
#    bannerText1: "banner 1",
#    bannerText2: "banner 2",
#    paragraph1: "paragraph 1",
#    paragraph2: "paragraph 2",
#    paragraph3: "paragraph 3",
#    paragraph4: "paragraph 4",
#    paragraph5: "paragraph 5",
#    paragraph6: "paragraph 6",
#    paragraph7: "paragraph 7",
#    paragraph8: "paragraph 8",
#    photo: "photo info here",
#    photoname: "john smith",
#    photonumber: "555-555-5555",
#    photoemail: "john@aol.com",
#    photoaddress1: "21 jump st",
#    photoaddress2: "Boston, MA 02111"
# )

# AboutCompany = AboutCompany.create!(
#    bannerText1: "banner 1",
#    bannerText2: "banner 2",
#    paragraph1: "paragraph 1",
#    paragraph2: "paragraph 2",
#    paragraph3: "paragraph 3",
#    paragraph4: "paragraph 4",
#    paragraph5: "paragraph 5",
#    paragraph6: "paragraph 6",
#    paragraph7: "paragraph 7",
#    paragraph8: "paragraph 8",
#    photo: "photo info here",
#    photoname: "john smith",
#    photonumber: "555-555-5555",
#    photoemail: "john@aol.com",
#    photoaddress1: "21 jump st",
#    photoaddress2: "Boston, MA 02111"
# )

# townseed = TownLink.create!(
#     townlink: "www.example.com",
#     townlinkdescription: "Google Page",
#     town_id: 78
# )

# homeWorthEdit = WorthEdit.create!(
#     paragraph1: "test", 
#     paragraph2: "test", 
#     bannerText1: "test", 
#     bannerText2: "test"
# )


# relocationEdit = RelocationEdit.create!(
#     paragraph1: "test", 
#     paragraph2: "test", 
#     bannerText1: "test", 
#     bannerText2: "test"
# )

# aboutCompanySeed = AboutCompany.create!(
#     content: "test",
#     headerText1: "test",
#     headerText2: "test",
#     image: "test"
# )

# venueEditSeed = VenueEdit.create!(
#     bannerImage: "test"
# )

# portfolioEdit = PortfolioEdit.create!(
#     bannerImage: "test",
#     headerText1: "test",
#     headerText2: "test"
# )

# contactEdit = ContactEdit.create!(
#     bannerImage: "test",
#     headerText1: "test",
#     headerText2: "test",
#     name: "test",
#     address: "test",
#     phonenumber: "test",
#     email: "test",
#     lat: "test",
#     lng: "test"
# )

marketReportSeed = MarketReportEdit.create!(
    bannerImage: "test",
    paragraph1: "test", 
    paragraph2: "test", 
    bannerText1: "test", 
    bannerText2: "test"
)
