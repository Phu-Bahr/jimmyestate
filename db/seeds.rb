jumbotron = Jumbotron.create!(
    line1: 'Line 1!', 
    line2: 'Line 2', 
    line3: 'Line 3'
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

company = Company.create!(
    description: "this is the beginning of a company description",
    title: "edit your title here"
)

announcement = Announcement.create!(
    description: "hello, we are going to party soon", 
    flier: "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "place title here",
    bannerImage: "test"
)

event = Event.create!([
    { title: "Natick Open House", date: Date.parse('2020-12-25'), time: "10:00", location: "Natick" }
])

about = About.create!(
   bannerText1: "banner 1",
   bannerText2: "banner 2",
   paragraph1: "paragraph 1",
   paragraph2: "paragraph 2",
   paragraph3: "paragraph 3",
   paragraph4: "paragraph 4",
   paragraph5: "paragraph 5",
   paragraph6: "paragraph 6",
   paragraph7: "paragraph 7",
   paragraph8: "paragraph 8",
   photo: "photo info here",
   photoname: "john smith",
   photonumber: "555-555-5555",
   photoemail: "john@aol.com",
   photoaddress1: "21 jump st",
   photoaddress2: "Boston, MA 02111"
)

AboutCompany = AboutCompany.create!(
   bannerText1: "banner 1",
   bannerText2: "banner 2",
   paragraph1: "paragraph 1",
   paragraph2: "paragraph 2",
   paragraph3: "paragraph 3",
   paragraph4: "paragraph 4",
   paragraph5: "paragraph 5",
   paragraph6: "paragraph 6",
   paragraph7: "paragraph 7",
   paragraph8: "paragraph 8",
   photo: "photo info here",
   photoname: "john smith",
   photonumber: "555-555-5555",
   photoemail: "john@aol.com",
   photoaddress1: "21 jump st",
   photoaddress2: "Boston, MA 02111"
)

townseed = TownLink.create!(
    townlink: "www.example.com",
    townlinkdescription: "Google Page",
    town_id: 78
)

homeWorthEdit = WorthEdit.create!(
    paragraph1: "test", 
    paragraph2: "test", 
    bannerText1: "test", 
    bannerText2: "test"
)


relocationEdit = RelocationEdit.create!(
    paragraph1: "test", 
    paragraph2: "test", 
    bannerText1: "test", 
    bannerText2: "test"
)

aboutCompanySeed = AboutCompany.create!(
    content: "test",
    headerText1: "test",
    headerText2: "test",
    image: "test"
)

venueEditSeed = VenueEdit.create!(
    bannerImage: "test"
)

portfolioEdit = PortfolioEdit.create!(
    bannerImage: "test",
    headerText1: "test",
    headerText2: "test"
)

contactEdit = ContactEdit.create!(
    bannerImage: "test",
    headerText1: "test",
    headerText2: "test",
    name: "test",
    address: "test",
    phonenumber: "test",
    email: "test",
    lat: "test",
    lng: "test"
)

marketReportSeed = MarketReportEdit.create!(
    bannerImage: "test",
    paragraph1: "test", 
    paragraph2: "test", 
    bannerText1: "test", 
    bannerText2: "test"
)

testimonialEdit = TestimonialEdit.create!(
    bannerImage: "test",
    headerText1: "test",
    headerText2: "test"
)

customCards = CustomCard.create!([
        { image: "test1", title: "test1" },
        { image: "test2", title: "test2" }
])