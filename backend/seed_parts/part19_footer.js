
  await mongoose.disconnect();
  console.log('🎉 Comprehensive seed complete! Disconnected from MongoDB.');
}

seedAll().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
