# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
feat_1 = Feature.create(name: 'Feature 1')
feat_2 = Feature.create(name: 'Feature 2')
feat_3 = Feature.create(name: 'Feature 3')

feat_1.feature_tests.create(name: 'Test 1').undefined!
feat_1.feature_tests.create(name: 'Test 2').passed!

feat_2.feature_tests.create(name: 'Test 1').failed!
feat_2.feature_tests.create(name: 'Test 2').failed!
feat_2.feature_tests.create(name: 'Test 3').undefined!

feat_3.feature_tests.create(name: 'Test 1').undefined!
