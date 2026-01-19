import { Code, Brain, Rocket, Award, Zap, Heart, MapPin, Calendar, GraduationCap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Full-Stack Development",
      description: "Frontend & backend expertise",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Problem Solving",
      description: "Analytical & algorithmic thinking",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "Innovation",
      description: "Emerging tech enthusiast",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Academic Excellence",
      description: "High standards in coursework",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const personalInfo = [
    {
      icon: <GraduationCap className="w-4 h-4" />,
      label: "Education",
      value: "BSc.Hon's Software Engineering"
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "University",
      value: "Sabaragamuwa University of Sri Lanka"
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "Status",
      value: "Undergraduate Student"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className='flex justify-center items-center gap-2 mb-2'>
            <Heart className="w-7 h-7 text-red-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              About Me
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="relative h-full">
              {/* Neon glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600 rounded-2xl blur-lg opacity-15"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 rounded-2xl blur opacity-10"></div>
              
              {/* Content container */}
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 flex flex-col items-center">
                {/* Profile Picture */}
                <div className="relative w-48 h-48 mb-6">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl blur-xl"></div>
                  
                  {/* Professional frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src="/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-tl-3xl rounded-br-xl opacity-90"></div>
                </div>

                {/* Personal Info */}
                <div className="w-full space-y-3 mb-6">
                  {personalInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{item.label}</p>
                        <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View My Work Button */}
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>View My Work</span>
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="relative h-full">
              {/* Neon glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-pink-600 to-blue-500 rounded-2xl blur-lg opacity-15"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400 via-pink-500 to-blue-400 rounded-2xl blur opacity-10"></div>
              
              {/* Content container */}
              <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-start gap-3 mb-6">
                  <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    Frontend Developer with Full-Stack Capabilities
                  </h3>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm pursuing a BSc in Software Engineering at Sabaragamuwa University of Sri Lanka.
                    My primary focus is frontend development, where I create responsive and intuitive user interfaces.
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    While frontend is my main strength, I'm also comfortable with backend development,
                    databases, and exploring technologies like Cloud and mobile apps.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mt-auto">
                  {highlights.map((item, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur"></div>
                      <div className="relative bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{item.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;