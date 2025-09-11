import { motion } from "framer-motion";

const Testimonials = () => {
  const reviews = [
    {
      name: "Rahim Uddin",
      role: "Home Buyer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      feedback:
        "Dream Square made my home buying journey super easy! Verified listings and trusted agents helped me find my dream home quickly.",
    },
    {
      name: "Farhana Akter",
      role: "Property Seller",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      feedback:
        "Listing my property was seamless. I got genuine buyers and closed the deal faster than expected.",
    },
    {
      name: "Imran Hossain",
      role: "Agent",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      feedback:
        "As an agent, Dream Square helps me connect with serious buyers and manage my listings easily.",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          What Our <span className="text-indigo-600">Clients Say</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Thousands of people trust Dream Square to buy, sell, and explore
          properties. Here’s what some of them have to say.
        </motion.p>

        {/* Animated grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              variants={card}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-600 italic mb-4">“{review.feedback}”</p>
              <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
              <span className="text-sm text-indigo-600">{review.role}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

