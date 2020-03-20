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

ActiveRecord::Schema.define(version: 2020_03_20_181352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.string "description"
    t.string "flier"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
  end

  create_table "companies", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.date "date"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time"
    t.string "flier"
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
  end

  create_table "jumbotrons", force: :cascade do |t|
    t.string "line1"
    t.string "line2"
    t.string "line3"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "towns", force: :cascade do |t|
    t.string "town"
    t.string "headerText1"
    t.string "headerText2"
    t.string "paragraph1"
    t.string "paragraph2"
    t.string "paragraph3"
    t.string "paragraph4"
    t.string "paragraph5"
    t.string "townheader"
    t.string "townlink1"
    t.string "townlink2"
    t.string "townlink3"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false
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
  end

end
