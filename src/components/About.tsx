import { Code, Brain, Rocket, Award, Zap, Heart } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Experienced in both frontend and backend technologies",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Strong analytical skills and algorithmic thinking",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation",
      description: "Passionate about emerging technologies and trends",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Maintaining high standards in coursework and projects",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Get to know me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-xl bg-white dark:bg-gray-800 shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">JS</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Professional Photo</p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Software Engineering Student with a Passion for Innovation
              </h3>
            </div>
            
            <div className="space-y-6 mb-8">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                I'm currently pursuing my Bsc.Hon's Software Engineering degree at Sabaragamuwa University of Sri Lanka, where I've developed 
                a strong foundation in Softwawe Engineering principles and modern development practices. My 
                journey in tech began with curiosity about how applications work, and has evolved into 
                a deep passion for creating solutions that make a difference.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                I'm particularly interested in web development, artificial intelligence, and mobile 
                applications. I love the challenge of turning complex problems into elegant, 
                user-friendly solutions. When I'm not coding, you can find me exploring new 
                technologies, contributing to open-source projects, or mentoring fellow students.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
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