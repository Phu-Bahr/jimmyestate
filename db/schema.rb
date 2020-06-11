# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_11_014959) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "about_companies", force: :cascade do |t|
    t.string "content"
    t.string "image"
    t.string "headerText1"
    t.string "headerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "abouts", force: :cascade do |t|
    t.string "bannerText1"
    t.string "bannerText2"
    t.string "paragraph1"
    t.string "paragraph2"
    t.string "paragraph3"
    t.string "paragraph4"
    t.string "paragraph5"
    t.string "paragraph6"
    t.string "paragraph7"
    t.string "paragraph8"
    t.string "photo"
    t.string "photoname"
    t.string "photonumber"
    t.string "photoemail"
    t.string "photoaddress1"
    t.string "photoaddress2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "announcements", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.string "bannerImage"
  end

  create_table "buying_contents", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "headerText1"
    t.string "headerText2"
    t.string "bannerImage"
  end

  create_table "companies", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
  end

  create_table "contact_edits", force: :cascade do |t|
    t.string "bannerImage"
    t.string "headerText1"
    t.string "headerText2"
    t.string "name"
    t.string "address"
    t.string "phonenumber"
    t.string "email"
    t.string "lat"
    t.string "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.date "date"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time"
    t.string "flier"
    t.string "lat"
    t.string "lng"
  end

  create_table "footers", force: :cascade do |t|
    t.string "name"
    t.string "street"
    t.string "citystate"
    t.string "contact1"
    t.string "contact2"
    t.string "contact3"
    t.string "contact4"
    t.string "facebook"
    t.string "twitter"
    t.string "instagram"
    t.string "other"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "zillow"
    t.string "realtor"
  end

  create_table "helper_links", force: :cascade do |t|
    t.string "image"
    t.string "title"
    t.string "route"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "home_worths", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "address"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jimmy_partners", force: :cascade do |t|
    t.string "bannerImage"
    t.string "headerText1"
    t.string "headerText2"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "jimmy_tips", force: :cascade do |t|
    t.string "content"
    t.string "headerText1"
    t.string "headerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "jumbotrons", force: :cascade do |t|
    t.string "line1"
    t.string "line2"
    t.string "line3"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "market_report_edits", force: :cascade do |t|
    t.string "bannerImage"
    t.string "paragraph1"
    t.string "paragraph2"
    t.string "bannerText1"
    t.string "bannerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "market_report_photos", force: :cascade do |t|
    t.string "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "market_reports", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "destinationaddress"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portfolio_edits", force: :cascade do |t|
    t.string "bannerImage"
    t.string "headerText1"
    t.string "headerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "portfolios", force: :cascade do |t|
    t.string "photo"
    t.integer "price"
    t.string "streetnumber"
    t.string "street"
    t.string "aptnumber"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "relocation_edits", force: :cascade do |t|
    t.string "paragraph1"
    t.string "paragraph2"
    t.string "bannerText1"
    t.string "bannerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "relocation_photos", force: :cascade do |t|
    t.string "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "relocations", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.string "time"
    t.string "destinationaddress"
    t.string "timeframe"
    t.string "assistsell"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "selling_contents", force: :cascade do |t|
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "headerText1"
    t.string "headerText2"
    t.string "bannerImage"
  end

  create_table "town_links", force: :cascade do |t|
    t.string "townlink"
    t.string "townlinkdescription"
    t.bigint "town_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["town_id"], name: "index_town_links_on_town_id"
  end

  create_table "towns", force: :cascade do |t|
    t.string "name"
    t.string "headerText1"
    t.string "headerText2"
    t.string "townheader"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "venue_edits", force: :cascade do |t|
    t.string "bannerImage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "venue_templates", force: :cascade do |t|
    t.string "bannerImage"
    t.string "headerText1"
    t.string "headerText2"
    t.string "content"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "venues", force: :cascade do |t|
    t.string "name", null: false
    t.string "street", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip", null: false
    t.string "telephone", null: false
    t.string "url", null: false
    t.string "venue_image", default: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwipzcXPktHlAhXrQ98KHSdKCeQQjRx6BAgBEAQ&url=https%3A%2F%2Fvollrath.com%2FProducts%2FSmallwares%2FBuffet-Tabletop-Service%2FKondi-Keeper-Replacement-Lids&psig=AOvVaw0LqwqgCNgtGbIq8mXXbpiH&ust=1572977005119341"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "worth_edits", force: :cascade do |t|
    t.string "paragraph1"
    t.string "paragraph2"
    t.string "bannerText1"
    t.string "bannerText2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bannerImage"
  end

  create_table "worth_photos", force: :cascade do |t|
    t.string "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
