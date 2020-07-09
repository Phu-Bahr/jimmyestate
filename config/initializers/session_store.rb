if Rails.env == "production"
    Rails.application.config.session_store :cookie_store, key: "_jimmyestates", domain: "jimmyestates.herokuapp.com"
else
    Rails.application.config.session_store :cookie_store, key: "_jimmyestates"
end