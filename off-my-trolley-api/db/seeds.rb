# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_a = User.create(username: "Phil67", postcode: "HA7 1aa", email: "phil@hotstuff.com", password: "badger", longitude:"-0.302326", latitude:"51.605553" )
user_b = User.create(username: "Maud_next_door", postcode: "DN40 2HD", email:"maud@maud.com", password: "maud", longitude:"-0.227526", latitude:"53.617426")
user_c = User.create(username: "Helen_11", postcode: "BH23 3NN", email:"helen@11.com" , password: "helen", longitude:"-1.746858", latitude:"50.728856")
user_d = User.create(username: "BananaFarmer", postcode: "DH5 9NH", email:"banana@farmer.com" , password: "banana", longitude:"-1.478372", latitude:"54.824577")

trolley_a = Trolley.create(date: "20-08-2020", time: "11:00", supermarket: "Tesco", user: user_a, space: 15)
trolley_b = Trolley.create(date: "21-08-2020", time: "12:00", supermarket: "Iceland", user: user_b, space: 10)
trolley_c = Trolley.create(date: "22-08-2020", time: "16:00", supermarket: "Sainsburys", user: user_c, space: 10)

