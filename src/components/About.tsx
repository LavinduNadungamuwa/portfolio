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
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Get to know me
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="relative w-64 h-64 mx-auto mb-6  ">
              {/* Animated rings */}
              <div className="absolute inset-0  bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-xl bg-white dark:bg-gray-800 shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto mb-3">
                      {/* Profile image with circular frame */}
                      <div className="w-64 h-64 overflow-hidden border-4 shadow-lg mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 border-transparent">
                          <img
                              src="/profile.jpg"
                              alt="Profile"
                              className="object-cover w-full h-full "
                          />
                      </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce delay-700"></div>
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              {personalInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{item.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Software Engineering Student with a Passion for Innovation
              </h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm pursuing my BSc.Hon's Software Engineering degree at Sabaragamuwa University of Sri Lanka, 
                developing strong foundations in software engineering principles and modern development practices. 
                My journey began with curiosity about how applications work and evolved into a passion for creating 
                impactful solutions.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I specialize in web development, artificial intelligence, and mobile applications. I thrive on 
                transforming complex problems into elegant, user-friendly solutions. Beyond coding, I explore 
                emerging technologies, contribute to open-source projects, and mentor fellow students.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
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
    </section>
  );
};

export default About;