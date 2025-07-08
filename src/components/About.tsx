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
    <section id="about" className="section-padding gradient-bg-secondary transition-all duration-500">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-muted uppercase tracking-widest">
              Get to know me
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            About Me
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Animated rings */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 animate-float rounded-2xl"></div>
              <div className="absolute inset-2 glass-card-strong rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto mb-3">
                      {/* Profile image with circular frame */}
                      <div className="w-64 h-64 overflow-hidden border-4 shadow-2xl mx-auto bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 border-transparent rounded-2xl">
                          <img
                              src="/profile.jpg"
                              alt="Profile"
                              className="object-cover w-full h-full"
                          />
                      </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float delay-300 shadow-lg"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-float delay-700 shadow-lg"></div>
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              {personalInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm card-elevated p-3 hover:scale-105 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-muted text-xs font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-900 dark:text-white font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Software Engineering Student with a Passion for Innovation
              </h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                I'm pursuing my BSc.Hon's Software Engineering degree at Sabaragamuwa University of Sri Lanka, 
                developing strong foundations in software engineering principles and modern development practices. 
                My journey began with curiosity about how applications work and evolved into a passion for creating 
                impactful solutions.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                I specialize in web development, artificial intelligence, and mobile applications. I thrive on 
                transforming complex problems into elegant, user-friendly solutions. Beyond coding, I explore 
                emerging technologies, contribute to open-source projects, and mentor fellow students.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur`}></div>
                  <div className="relative card-interactive p-6">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white shadow-xl`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-base">{item.title}</h4>
                        <p className="text-sm text-muted">{item.description}</p>
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