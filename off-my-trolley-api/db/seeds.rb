# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(username: "Phil67", postcode: "HA7 1aa", email: "phil@hotstuff.com", password: "badger" )
user_b = User.create(username: "Maud_next_door", postcode: "ha6 7td", email:"maud@maud.com", password: "maud")
user_c = User.create(username: "Helen_11", postcode: "HA7 4Ad", email:"helen@11.com" , password: "helen")
user_d = User.create(username: "BananaFarmer", postcode: "ha8 1af", email:"banana@farmer.com" , password: "banana")

trolley_a = Trolley.create(date: "20-08-2020", time: "11:00", supermarket: "Tesco", user: user_a, space: 15)
trolley_b = Trolley.create(date: "21-08-2020", time: "12:00", supermarket: "Iceland", user: user_b, space: 10)
trolley_c = Trolley.create(date: "22-08-2020", time: "16:00", supermarket: "Sainsburys", user: user_c, space: 10)

