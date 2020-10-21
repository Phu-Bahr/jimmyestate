jumbotron = Jumbotron.create!(
    line1: 'Hello!', 
    line2: 'Welcome to your OWN website', 
    line3: 'Edit what you want',
    image: 'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    opacity: '.55'
    )

footer = Footer.create!(
    name: 'Your Company Name',
    street: 'Street Adress',
    citystate: 'City State Zip',
    contact1: 'contact info 1',
    contact2: 'contact info 2',
    contact3: 'contact info 3',
    contact4: 'contact info 4',
    facebook: 'www.facebook.com',
    twitter: 'www.twitter.com',
    instagram: 'www.instagram.com',
    other: 'www.amazon.com',
    zillow: 'www.zillow.com',
    realtor: 'www.realtor.com'
)

announcement = Announcement.create!(
    bannerImage: "https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "place title here",
    description: "hello, we are going to party soon"
)

about = About.create!(
   bannerImage: "https://images.pexels.com/photos/5273144/pexels-photo-5273144.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", 
   bannerText1: "Your about header here",
   bannerText2: "Edit me!",
   paragraph1: "paragraph 1",
   paragraph2: "paragraph 2",
   paragraph3: "paragraph 3",
   paragraph4: "paragraph 4",
   paragraph5: "paragraph 5",
   paragraph6: "paragraph 6",
   paragraph7: "paragraph 7",
   paragraph8: "John Smith",
   photo: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
   photoname: "John Smith",
   photonumber: "555-555-5555",
   photoemail: "john@aol.com",
   photoaddress1: "21 jump st",
   photoaddress2: "Boston, MA 02111"
)

homeWorthEdit = WorthEdit.create!(
    paragraph1: "Home worth text 1", 
    paragraph2: "Home worth text 1", 
    bannerText1: "What is your home worth?", 
    bannerText2: "Edit this header",
    bannerImage: "https://images.pexels.com/photos/3740794/pexels-photo-3740794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    )
    
    
relocationEdit = RelocationEdit.create!(
    paragraph1: "Relocation info here", 
    paragraph2: "More relocation info in this block", 
    bannerText1: "Relocation Title", 
    bannerText2: "Edit this header",
    bannerImage: "https://images.pexels.com/photos/3616688/pexels-photo-3616688.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

aboutCompanySeed = AboutCompany.create!(
    bannerImage: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    content: "test",
    headerText1: "Your company",
    headerText2: "Edit title here",
    image: "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

venueEditSeed = VenueEdit.create!(
    bannerImage: "test"
)

venueTemplating = VenueTemplate.create!(
    content: "test",
    headerText1: "test",
    headerText2: "test",
    image: "https://images.pexels.com/photos/2847949/pexels-photo-2847949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    bannerImage: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

portfolioEdit = PortfolioEdit.create!(
    bannerImage: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    headerText1: "Show off success",
    headerText2: "Edit banner!"
)

contactEdit = ContactEdit.create!(
    bannerImage: "https://images.pexels.com/photos/6386/person-woman-hand-smartphone.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    headerText1: "Contact me!",
    headerText2: "Edit banner here",
    name: "Mike Tyson",
    address: "21 Jump St",
    phonenumber: "555-555-5555",
    email: "PunchOut@gmail.com",
    lat: "48.8584",
    lng: "2.2945"
)

marketReportSeed = MarketReportEdit.create!(
    bannerImage: "https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    paragraph1: "Market info here", 
    paragraph2: "Market info again", 
    bannerText1: "Need market report?", 
    bannerText2: "Edit header here"
)

testimonialEdit = TestimonialEdit.create!(
    bannerImage: "https://images.pexels.com/photos/3847703/pexels-photo-3847703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    headerText1: "Testimonials here",
    headerText2: "Edit title!"
)

testimonialFirst = Testimonial.create!(
    image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Best Person to work with!",
    description: "I had a grand old time with the entire process. Would do it again in a heart beat and tell all my friends about it. Please try this person out!",
    name: "Bob - Boston, MA"
)

customCards = CustomCard.create!([
    { image: "https://images.pexels.com/photos/463996/pexels-photo-463996.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", title: "Featured Communities" },
    { image: "https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500", title: "Partners" }
])

cardDrafts = CardDraft.create!(
    content: "test"
)

buyingSection = BuyingContent.create!(
    bannerImage: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    headerText1: "Buying tips here",
    headerText2: "Edit header",
    content: "test"
)

sellingingSection = SellingContent.create!(
    bannerImage: "https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    headerText1: "Selling tips here",
    headerText2: "Edit header",
    content: "test"
)

worthPhotoSample = WorthPhoto.create!(
    photo: "https://images.pexels.com/photos/157465/pexels-photo-157465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

relocationPhotoSample = RelocationPhoto.create!(
    photo: "https://images.pexels.com/photos/157465/pexels-photo-157465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

marketPhotoSample = MarketReportPhoto.create!(
    photo: "https://images.pexels.com/photos/157465/pexels-photo-157465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
)

townSample = Town.create!(
    bannerImage: "https://images.pexels.com/photos/111963/pexels-photo-111963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Boston",
    headerText1: "Boston Town",
    headerText2: "heading here",
    townheader: "Boston Links",
    content: "test"
)

partnerSample = PartnerCategory.create!(
    bannerImage: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    name: "Lawyers",
    headerText1: "Lawyer Friends",
    headerText2: "Edit heading!",
    content: "test"
)