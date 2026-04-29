
  // ═══════════════════════════════════════════════════════════
  // EXPANDED QUIZZES — Classes 1-5 (6-8 questions each)
  // ═══════════════════════════════════════════════════════════
  console.log('📝 Seeding EXPANDED quizzes for Classes 1–5...');

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Numbers from One to Nine', questions: [
    { q: 'How many fingers do you have on one hand?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'Which number comes after 7?', options: ['6', '7', '8', '9'], ans: 2 },
    { q: 'Which is the smallest: 9, 3, 6, 1?', options: ['9', '3', '6', '1'], ans: 3 },
    { q: 'What number comes before 5?', options: ['3', '4', '6', '7'], ans: 1 },
    { q: 'Count the vowels in A, E, I, O, U. How many?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'Which is the biggest number here?', options: ['2', '5', '9', '7'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Patterns', questions: [
    { q: 'What comes next: 2, 4, 6, __?', options: ['7', '8', '9', '10'], ans: 1 },
    { q: 'Complete: Red, Blue, Red, Blue, __?', options: ['Green', 'Red', 'Yellow', 'Blue'], ans: 1 },
    { q: 'What comes next: 🔵🔴🔵🔴__?', options: ['🔴', '🔵', '🟢', '🟡'], ans: 1 },
    { q: 'Complete: 1, 3, 5, __?', options: ['6', '7', '8', '9'], ans: 1 },
    { q: 'What shape comes next: ▲ ■ ▲ ■ __?', options: ['■', '▲', '●', '◆'], ans: 1 },
    { q: 'Find the pattern: 10, 20, 30, __?', options: ['35', '40', '45', '50'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Money', questions: [
    { q: 'How many paise make 1 rupee?', options: ['10', '50', '100', '1000'], ans: 2 },
    { q: 'You have a Rs 10 note. You buy a pencil for Rs 3. How much change?', options: ['Rs 5', 'Rs 6', 'Rs 7', 'Rs 8'], ans: 2 },
    { q: 'Which coin is worth the most?', options: ['Rs 1', 'Rs 2', 'Rs 5', 'Rs 10'], ans: 3 },
    { q: 'A toffee costs Rs 2. How much for 3 toffees?', options: ['Rs 4', 'Rs 5', 'Rs 6', 'Rs 8'], ans: 2 },
    { q: 'Rs 5 + Rs 5 = ?', options: ['Rs 5', 'Rs 10', 'Rs 15', 'Rs 25'], ans: 1 },
    { q: 'Which is more money?', options: ['3 coins of Rs 1', 'Rs 2 coin', 'Rs 5 note', '2 coins of Rs 2'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'English', chapterName: 'A Happy Child', questions: [
    { q: 'A "happy" child is a child who is ___', options: ['Sad', 'Angry', 'Joyful', 'Sleepy'], ans: 2 },
    { q: 'Which word rhymes with "play"?', options: ['Fly', 'Day', 'Toy', 'Run'], ans: 1 },
    { q: 'What do children love to do?', options: ['Work', 'Sleep all day', 'Play', 'Cook'], ans: 2 },
    { q: 'A poem has words that ___', options: ['Are always long', 'Rhyme', 'Are always short', 'Are numbers'], ans: 1 },
    { q: '"Sing" is an action word. True or false?', options: ['True', 'False', 'Sometimes', 'Never'], ans: 0 },
    { q: 'Which is a naming word (noun)?', options: ['Run', 'Beautiful', 'Cat', 'Quickly'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'My Body', questions: [
    { q: 'How many eyes do we have?', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Which sense organ do we use to hear?', options: ['Eyes', 'Nose', 'Ears', 'Tongue'], ans: 2 },
    { q: 'We use our ___ to taste food', options: ['Nose', 'Eyes', 'Hands', 'Tongue'], ans: 3 },
    { q: 'How many legs does a human have?', options: ['2', '4', '6', '8'], ans: 0 },
    { q: 'Which body part helps us breathe?', options: ['Hands', 'Legs', 'Nose', 'Ears'], ans: 2 },
    { q: 'We should brush our ___ every day', options: ['Hair only', 'Teeth', 'Clothes', 'Shoes'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Animals Around Us', questions: [
    { q: 'Which animal gives us milk?', options: ['Dog', 'Cat', 'Cow', 'Parrot'], ans: 2 },
    { q: 'A dog is a ___ animal', options: ['Wild', 'Domestic', 'Sea', 'Flying'], ans: 1 },
    { q: 'Which animal lives in water?', options: ['Elephant', 'Lion', 'Fish', 'Horse'], ans: 2 },
    { q: 'A lion is a ___ animal', options: ['Pet', 'Domestic', 'Farm', 'Wild'], ans: 3 },
    { q: 'Which animal can fly?', options: ['Cow', 'Fish', 'Bird', 'Snake'], ans: 2 },
    { q: 'Baby of a cat is called a ___', options: ['Puppy', 'Kitten', 'Calf', 'Cub'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Food We Eat', questions: [
    { q: 'Which is a healthy food?', options: ['Chips', 'Chocolate', 'Fruit', 'Candy'], ans: 2 },
    { q: 'We get milk from ___', options: ['Plants', 'Cows', 'Rocks', 'Water'], ans: 1 },
    { q: 'Rice is which type of food?', options: ['Fruit', 'Vegetable', 'Grain', 'Dairy'], ans: 2 },
    { q: 'Which meal do we eat in the morning?', options: ['Lunch', 'Dinner', 'Snack', 'Breakfast'], ans: 3 },
    { q: 'Vegetables help us stay ___', options: ['Sick', 'Healthy', 'Sleepy', 'Angry'], ans: 1 },
    { q: 'Which drink is best for health?', options: ['Cola', 'Coffee', 'Water', 'Soda'], ans: 2 }
  ]});

  // Class 2
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Counting in Groups', questions: [
    { q: 'Count by 2s: 2, 4, 6, __?', options: ['7', '8', '9', '10'], ans: 1 },
    { q: 'Count by 5s: 5, 10, 15, __?', options: ['16', '18', '20', '25'], ans: 2 },
    { q: 'Count by 10s: 10, 20, 30, __?', options: ['35', '40', '45', '50'], ans: 1 },
    { q: 'If you have 3 groups of 4, how many total?', options: ['7', '10', '12', '16'], ans: 2 },
    { q: 'How many pairs can you make from 8 socks?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Skip count by 2: How many steps from 0 to 10?', options: ['3', '4', '5', '10'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Add Our Points', questions: [
    { q: '25 + 13 = ?', options: ['35', '37', '38', '39'], ans: 2 },
    { q: '46 + 32 = ?', options: ['68', '76', '78', '82'], ans: 2 },
    { q: '18 + 27 = ?', options: ['35', '45', '55', '43'], ans: 1 },
    { q: '34 + 16 = ?', options: ['40', '44', '50', '54'], ans: 2 },
    { q: '55 + 25 = ?', options: ['70', '75', '80', '85'], ans: 2 },
    { q: 'What is 29 + 11?', options: ['38', '39', '40', '41'], ans: 2 }
  ]});

  // Class 3
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fun with Numbers', questions: [
    { q: 'Which is the biggest: 456, 645, 564, 465?', options: ['456', '645', '564', '465'], ans: 1 },
    { q: 'Write 347 in expanded form:', options: ['3+4+7', '300+40+7', '30+40+7', '3+40+700'], ans: 1 },
    { q: 'What comes after 999?', options: ['9910', '1000', '9100', '990'], ans: 1 },
    { q: 'Arrange in ascending: 231, 132, 321, 213', options: ['132, 213, 231, 321', '321, 231, 213, 132', '132, 231, 213, 321', '213, 132, 231, 321'], ans: 0 },
    { q: 'The place value of 5 in 752 is:', options: ['5', '50', '500', '5000'], ans: 1 },
    { q: 'Round 67 to the nearest ten:', options: ['60', '65', '70', '100'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Can We Share?', questions: [
    { q: 'Share 12 sweets equally among 3 children. Each gets:', options: ['3', '4', '5', '6'], ans: 1 },
    { q: '20 ÷ 4 = ?', options: ['4', '5', '6', '8'], ans: 1 },
    { q: '15 ÷ 3 = ?', options: ['3', '4', '5', '6'], ans: 2 },
    { q: 'If 8 mangoes are shared between 2, each gets:', options: ['2', '3', '4', '6'], ans: 2 },
    { q: '18 ÷ 6 = ?', options: ['2', '3', '4', '6'], ans: 1 },
    { q: 'Division is the opposite of ___', options: ['Addition', 'Subtraction', 'Multiplication', 'Counting'], ans: 2 }
  ]});

  // Class 4
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Halves and Quarters', questions: [
    { q: 'Half of 20 is:', options: ['5', '10', '15', '20'], ans: 1 },
    { q: 'One quarter of 24 is:', options: ['4', '6', '8', '12'], ans: 1 },
    { q: 'Which is greater: 1/2 or 1/4?', options: ['1/2', '1/4', 'Both equal', 'Cannot tell'], ans: 0 },
    { q: '3/4 of 8 is:', options: ['2', '4', '6', '8'], ans: 2 },
    { q: 'How many quarters make a whole?', options: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Half of a half is:', options: ['1/2', '1/3', '1/4', '1/8'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Fields and Fences', questions: [
    { q: 'Perimeter of a square with side 5 cm is:', options: ['10 cm', '15 cm', '20 cm', '25 cm'], ans: 2 },
    { q: 'Perimeter of a rectangle 6 cm × 4 cm is:', options: ['10 cm', '14 cm', '20 cm', '24 cm'], ans: 2 },
    { q: 'A fence goes around the ___ of a field', options: ['Inside', 'Middle', 'Boundary', 'Centre'], ans: 2 },
    { q: 'If a triangle has sides 3, 4, and 5 cm, its perimeter is:', options: ['7 cm', '9 cm', '12 cm', '15 cm'], ans: 2 },
    { q: 'Perimeter means the total ___ around a shape', options: ['Area', 'Distance', 'Weight', 'Height'], ans: 1 },
    { q: 'A square garden has side 10 m. How much fencing is needed?', options: ['20 m', '30 m', '40 m', '100 m'], ans: 2 }
  ]});

  // Class 5
  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'The Fish Tale', questions: [
    { q: 'In the Indian system, 10 thousand = ?', options: ['1 lakh', '10 lakh', '10 thousand', '1 crore'], ans: 2 },
    { q: 'The largest 5-digit number is:', options: ['99000', '99999', '90999', '99990'], ans: 1 },
    { q: 'The place value of 6 in 46,302 is:', options: ['6', '60', '600', '6000'], ans: 3 },
    { q: '1 lakh = ___ thousands', options: ['10', '100', '1000', '10000'], ans: 1 },
    { q: 'Which is larger: 45,678 or 45,876?', options: ['45,678', '45,876', 'Both equal', 'Cannot tell'], ans: 1 },
    { q: 'The successor of 99,999 is:', options: ['99,998', '100,000', '99,000', '1,00,001'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Does It Look the Same?', questions: [
    { q: 'How many lines of symmetry does a circle have?', options: ['0', '1', '4', 'Infinite'], ans: 3 },
    { q: 'A square has ___ lines of symmetry', options: ['1', '2', '4', '8'], ans: 2 },
    { q: 'The letter "A" has ___ line(s) of symmetry', options: ['0', '1', '2', '3'], ans: 1 },
    { q: 'A rectangle has ___ lines of symmetry', options: ['1', '2', '3', '4'], ans: 1 },
    { q: 'Which letter has NO line of symmetry?', options: ['A', 'M', 'F', 'O'], ans: 2 },
    { q: 'A mirror image is also called a ___', options: ['Rotation', 'Reflection', 'Translation', 'Scaling'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Be My Multiple, I\'ll Be Your Factor', questions: [
    { q: 'Which is a factor of 12?', options: ['5', '7', '4', '8'], ans: 2 },
    { q: 'The first 3 multiples of 5 are:', options: ['5, 10, 15', '5, 10, 20', '1, 5, 10', '5, 15, 25'], ans: 0 },
    { q: 'Is 7 a prime or composite number?', options: ['Prime', 'Composite', 'Neither', 'Both'], ans: 0 },
    { q: 'How many factors does 1 have?', options: ['0', '1', '2', '3'], ans: 1 },
    { q: 'The LCM of 4 and 6 is:', options: ['2', '4', '12', '24'], ans: 2 },
    { q: 'All even numbers have ___ as a factor', options: ['1', '2', '3', '5'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'Mathematics', chapterName: 'Tenths and Hundredths', questions: [
    { q: '0.5 is the same as:', options: ['1/2', '1/5', '5/100', '1/50'], ans: 0 },
    { q: 'Rs 3.50 means:', options: ['3 rupees 5 paise', '3 rupees 50 paise', '35 rupees', '350 paise'], ans: 1 },
    { q: 'Which is greater: 0.7 or 0.65?', options: ['0.7', '0.65', 'Both equal', 'Cannot compare'], ans: 0 },
    { q: '0.25 = ___ / 100', options: ['2.5', '25', '250', '0.25'], ans: 1 },
    { q: '1 tenth = ___', options: ['0.01', '0.1', '1.0', '10'], ans: 1 },
    { q: '3.2 + 1.5 = ?', options: ['4.5', '4.7', '5.2', '5.7'], ans: 1 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'From Tasting to Digesting', questions: [
    { q: 'Digestion begins in the ___', options: ['Stomach', 'Mouth', 'Intestine', 'Liver'], ans: 1 },
    { q: 'Which helps us taste food?', options: ['Teeth', 'Tongue', 'Lips', 'Throat'], ans: 1 },
    { q: 'How many types of teeth do we have?', options: ['1', '2', '3', '4'], ans: 2 },
    { q: 'Saliva helps in ___', options: ['Breathing', 'Digesting food', 'Seeing', 'Hearing'], ans: 1 },
    { q: 'The stomach churns food with ___', options: ['Water', 'Digestive juices', 'Blood', 'Air'], ans: 1 },
    { q: 'Spicy food makes our ___ feel hot', options: ['Eyes', 'Ears', 'Tongue', 'Nose'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Seeds and Seeds', questions: [
    { q: 'Seeds need ___ to grow', options: ['Darkness and cold', 'Water, air and warmth', 'Only sunlight', 'Only soil'], ans: 1 },
    { q: 'The process of a seed growing into a plant is called ___', options: ['Pollination', 'Germination', 'Fertilization', 'Photosynthesis'], ans: 1 },
    { q: 'Coconut seeds are dispersed by ___', options: ['Wind', 'Water', 'Animals', 'Explosion'], ans: 1 },
    { q: 'Dandelion seeds are dispersed by ___', options: ['Water', 'Animals', 'Wind', 'Gravity'], ans: 2 },
    { q: 'Which part of the seed grows into roots?', options: ['Plumule', 'Radicle', 'Cotyledon', 'Seed coat'], ans: 1 },
    { q: 'Seeds that stick to animal fur are dispersed by ___', options: ['Wind', 'Water', 'Animals', 'Explosion'], ans: 2 }
  ]});

  await upsertQuiz({ subjectName: 'EVS', chapterName: 'Sunita in Space', questions: [
    { q: 'Sunita Williams went to ___', options: ['Moon', 'Mars', 'International Space Station', 'Jupiter'], ans: 2 },
    { q: 'In space, objects float because of ___', options: ['Wind', 'Microgravity', 'Air pressure', 'Magnetism'], ans: 1 },
    { q: 'Astronauts wear ___ in space', options: ['Regular clothes', 'Space suits', 'Raincoats', 'Uniforms'], ans: 1 },
    { q: 'The Earth looks ___ from space', options: ['Flat', 'Square', 'Round and blue', 'Triangular'], ans: 2 },
    { q: 'Sunita Williams was born in ___', options: ['India', 'USA', 'England', 'Russia'], ans: 1 },
    { q: 'A space shuttle is used to ___', options: ['Travel on roads', 'Travel underwater', 'Travel to space', 'Travel on rails'], ans: 2 }
  ]});
