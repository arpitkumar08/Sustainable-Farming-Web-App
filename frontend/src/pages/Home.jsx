import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full font-sans">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between px-10 py-5 bg-green-50 shadow-md">
        {/* Left Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="https://media.istockphoto.com/id/1412012308/photo/environment-earth-day-in-the-hands-holding-green-earth-on-bokeh-green-background-saving.jpg?s=612x612&w=0&k=20&c=MCpBmCjSnKm0XVQkiGBkBr_BXCvG1_ZIj0Kb4_ew6U0="
            alt="plant"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-2xl font-bold text-green-700">
            Sustainable Farming
          </h1>
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center gap-8 text-lg">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/dashboard" className="hover:text-green-600">Dashboard</Link>
          <Link to="/about" className="hover:text-green-600">About</Link>
          <Link to="/techniques" className="hover:text-green-600">Techniques</Link>
          <Link to="/login" className="text-green-700 font-semibold hover:text-green-900">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1501984364/photo/farmer-examining-sunflower-seedlings-at-sunset.jpg?s=612x612&w=0&k=20&c=iZqmk44MP8u1KyA3h_U1G-0lm7anA1DEll-wr8d_7Ps=')"
        }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center pl-16">
          <h2 className="text-5xl text-white font-bold mb-4">
            Smarter Farming for a Sustainable Future
          </h2>
          <p className="text-2xl text-gray-200 max-w-xl">
            Use modern techniques, conserve resources, and boost productivity.
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-lg"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="px-10 py-16 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-8">
          What is Sustainable Farming?
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Sustainable farming focuses on producing crops and livestock in a way that meets current needs without compromising the ability of future generations to meet theirs. 
          It aims to balance environmental health, economic profitability, and social equity. This approach reduces the use of harmful chemicals, conserves water, improves soil fertility and biodiversity, 
          and emphasizes renewable and eco-friendly practices. Farmers adopt techniques like crop rotation, organic fertilization, water-saving irrigation, and integrated pest management 
          to enhance long-term productivity while protecting natural resources. By focusing on sustainability, farmers contribute to food security, healthier ecosystems, and resilient communities.
        </p>
      </section>


      {/* ================= TECHNIQUES SECTION ================= */}
      <section className="px-10 py-16 bg-green-50">
  <h2 className="text-3xl font-bold text-green-700 mb-16 text-center">
    Sustainable Farming Techniques
  </h2>

  {[ 
    {
      title: "Crop Rotation",
      img: "https://tractorkarvan.com/storage/images/Blogs/Crop/crop_rotation_a.jpg",
      desc: "Rotating crops improves soil fertility and prevents diseases.",
      steps: [
        "Plan rotation cycles for different crops.",
        "Alternate legumes with cereals to enhance soil nitrogen.",
        "Avoid planting the same crop consecutively in the same field."
      ]
    },
    {
      title: "Drip Irrigation",
      img: "https://agri-route.com/cdn/shop/articles/Micro-Irrigation-Fund.jpg?v=1687588515",
      desc: "Efficient irrigation method that saves up to 60% water.",
      steps: [
        "Install drip pipes along crop rows.",
        "Schedule irrigation based on crop needs.",
        "Monitor and maintain the system regularly."
      ]
    },
    {
      title: "Mulching",
      img: "https://www.allthatgrows.in/cdn/shop/articles/Feat-Mulch.jpg?v=1612159555",
      desc: "Mulch maintains soil moisture and reduces weeds.",
      steps: [
        "Apply organic or plastic mulch over soil.",
        "Ensure even coverage without harming plants.",
        "Replace or add mulch as it decomposes or gets damaged."
      ]
    }
  ].map((tech, i) => (
    <div
      key={i}
      className={`flex flex-col md:flex-row items-center gap-10 mb-16 ${
        i % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="md:w-1/2">
        <img
          src={tech.img}
          alt={tech.title}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Text content */}
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold text-green-700 mb-4">{tech.title}</h3>
        <p className="text-gray-700 mb-4">{tech.desc}</p>
        <ul className="list-decimal list-inside text-gray-700">
          {tech.steps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</section>


      {/* ================= IMAGE LEFT + DESCRIPTION RIGHT ================= */}
      <section className="px-10 py-16 flex flex-col md:flex-row items-center gap-10 bg-green-50">
  {/* Image on left */}
  <img
    src="https://cdn-images-1.medium.com/max/1024/0*Jurj7Un4YfgiUIET"
    alt="future"
    className="w-full md:w-1/2 rounded-2xl shadow-lg"
  />

  {/* Text content */}
  <div className="md:w-1/2">
    <h2 className="text-3xl font-bold text-green-700 mb-6">Future Scope of Sustainable Farming</h2>
    <p className="text-gray-700 text-lg leading-relaxed mb-4">
      Sustainable farming is shaping the future of agriculture by combining modern technology and eco-friendly practices. 
      Farmers adopting these methods can achieve higher yields, better soil health, water conservation, and long-term profitability. 
      With the integration of AI, IoT sensors, drones, and precision farming, agriculture is becoming smarter, resource-efficient, and climate-resilient.
    </p>
    
    <h3 className="text-xl font-semibold text-green-700 mb-3">Key Benefits of Sustainable Farming:</h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>Improved soil fertility and structure over time.</li>
      <li>Reduced water consumption through efficient irrigation methods.</li>
      <li>Higher crop yields with minimal chemical input.</li>
      <li>Increased biodiversity and healthier ecosystems.</li>
      <li>Lower long-term costs and better profitability for farmers.</li>
      <li>Mitigation of climate change impact through carbon sequestration.</li>
      <li>Resilience to pests, diseases, and unpredictable weather.</li>
    </ul>
  </div>
</section>


      {/* ================= SOIL HEALTH ================= */}
      <section className="px-10 py-16 bg-green-50">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Soil Health Awareness</h2>
        <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed">
          <li>Maintain soil pH between 6.0 – 7.5 for best crop growth.</li>
          <li>Add organic matter like compost to increase fertility.</li>
          <li>Reduce chemical fertilizers to avoid soil degradation.</li>
          <li>Use cover crops to prevent erosion and increase nutrients.</li>
        </ul>
      </section>

      {/* ================= WATER CONSERVATION ================= */}
      <section className="px-10 py-16">
  <h2 className="text-3xl font-bold text-green-700 mb-10 text-center">
    Water Conservation Methods
  </h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        title: "Drip Irrigation",
        img: "https://agri-route.com/cdn/shop/articles/Micro-Irrigation-Fund.jpg?v=1687588515",
        desc: "Delivers water directly to the roots, saving up to 60% water."
      },
      {
        title: "Sprinkler Irrigation",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrxtPl0YiHdyySGJx2Ox82IQO8k3Is_L33w&s",
        desc: "Simulates rainfall and evenly waters crops, reducing wastage."
      },
      {
        title: "Rainwater Harvesting",
        img: "https://cdn.educba.com/academy/wp-content/uploads/2023/12/Rooftop-Rainwater-Harvesting.jpg",
        desc: "Collects and stores rainwater for irrigation during dry periods."
      },
      {
        title: "Water Recycling",
        img: "https://www.eeba.org/Data/Sites/1/media/blog/greywater.png",
        desc: "Reuses wastewater safely for irrigation to minimize freshwater use."
      },
    ].map((method, i) => (
      <div
        key={i}
        className="bg-green-100 rounded-xl shadow-md hover:shadow-xl overflow-hidden"
      >
        <img
          src={method.img}
          alt={method.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5 text-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">{method.title}</h3>
          <p className="text-gray-700 text-sm">{method.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ================= RENEWABLE ENERGY SECTION ================= */}
<section className="bg-white px-10 rounded-xl shadow mt-10">
  <h2 className="text-3xl font-bold text-green-700 mb-6">
    Use of Renewable Energy in Sustainable Farming
  </h2>

<section >

  {/* MAIN THEORY */}
  <p className="text-gray-700 text-lg leading-relaxed mb-8">
    Renewable energy is essential for sustainable farming. Using solar power, biogas, and
    wind energy lowers farming costs, protects the environment, and ensures reliable power
    for irrigation and farm operations.
  </p>

  {/* ================= SOLAR PUMPS ================= */}
  <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
    <img
      src="https://bluebirdsolar.com/cdn/shop/articles/agri.jpg?v=1745061504"
      alt="Solar Pump"
      className="w-full md:w-1/2 h-60 object-cover rounded-xl shadow"
    />

    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-green-600 mb-3">Solar-Powered Pumps</h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        Solar pumps use sunlight to power water pumping for irrigation. They are
        cost-effective, require low maintenance, and are perfect for areas with unreliable
        electricity. Farmers save money on diesel and reduce pollution.
      </p>
    </div>
  </div>

  {/* ================= BIOGAS PLANTS ================= */}
  <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
    <img
      src="https://www.mwm.net/wp-content/uploads/2021/07/8925_2_Biogasanlage-BHKW-Langenau.jpg"
      alt="Biogas Plant"
      className="w-full md:w-1/2 h-60 object-cover rounded-xl shadow"
    />

    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-green-600 mb-3">Biogas Plants</h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        Biogas plants convert animal waste and crop leftovers into clean energy. The gas
        produced can be used for cooking, heating, and even generating electricity. It
        reduces waste and helps farmers create a circular, eco-friendly system.
      </p>
    </div>
  </div>

  {/* ================= WIND ENERGY ================= */}
  <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
    <img
      src="https://assets.technologynetworks.com/production/dynamic/images/content/385905/wind-farms-more-land-efficient-than-previously-thought-385905-960x540.jpg?cb=12779505"
      alt="Wind Energy"
      className="w-full md:w-1/2 h-60 object-cover rounded-xl shadow"
    />

    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-green-600 mb-3">Wind Energy for Farms</h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        Wind turbines generate electricity or pump water using natural wind flow. This
        renewable energy reduces carbon emissions, lowers electricity bills, and provides a
        clean alternative for sustainable farm operations.
      </p>
    </div>
  </div>
</section>

</section>


      {/* ================= SUCCESS STORIES ================= */}
      <section className="px-10 py-16 bg-green-50">
        <h2 className="text-3xl font-bold text-green-700 mb-10">Farmer Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Ravi Kumar",
              story: "Improved yield by 40% using drip irrigation & organic fertilizers."
            },
            {
              name: "Meena Devi",
              story: "Saved 3000 liters/week with water harvesting system."
            },
            {
              name: "Arun Singh",
              story: "Shifted to crop rotation and doubled soil fertility in 2 years."
            },
          ].map((farmer, i) => (
            <div key={i} className="p-6 bg-white shadow-xl rounded-xl">
              <h3 className="text-xl font-bold text-green-700">{farmer.name}</h3>
              <p className="text-gray-600 mt-2">{farmer.story}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-900 text-white px-10 py-12 mt-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Sustainable Farming</h3>
            <p className="text-gray-300">
              Empowering farmers with knowledge and modern tools for a better tomorrow.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/techniques">Techniques</Link></li>
              <li><Link to="/calculator">Crop Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Soil Health</li>
              <li>Water Management</li>
              <li>Organic Practices</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <p className="text-gray-300">
              Email: support@sustainfarm.com  
              <br />
              Phone: +91 98765 43210
            </p>
          </div>
        </div>

        <hr className="border-gray-600 my-6" />
        <p className="text-center text-gray-400">
          © 2025 Sustainable Farming Web App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
