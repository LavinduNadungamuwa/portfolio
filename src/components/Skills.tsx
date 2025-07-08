import React from 'react';
import { 
  Code, 
  Database, 
  Smartphone, 
  Cloud, 
  Palette, 
  GitBranch,
  Terminal,
  Zap,
  Cpu,
  Globe
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frontend Development",
      icon: <Palette className="w-6 h-6" />,
      skills: ["React", "HTML/CSS", "Tailwind CSS", "Next.js", "Vue.js", "SASS"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      skills: ["Node.js", "Express", "Django", "Spring Boot", "PostgreSQL", "MongoDB"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: ["React Native", "Flutter", "Android Studio", "iOS Development"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Nginx", "Linux"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Development Tools",
      icon: <GitBranch className="w-6 h-6" />,
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Jest"],
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "Frameworks & Libraries",
      icon: <Zap className="w-6 h-6" />,
      skills: ["TensorFlow", "PyTorch", "OpenCV", "Socket.io", "GraphQL", "Redux"],
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Command Line & Scripts",
      icon: <Terminal className="w-6 h-6" />,
      skills: ["Bash", "PowerShell", "npm/yarn", "Webpack", "Vite", "Gulp"],
      color: "from-gray-500 to-slate-600"
    }
  ];

  const proficiencyLevels = [
    { skill: "JavaScript/TypeScript", level: 90, color: "from-yellow-400 to-orange-500" },
    { skill: "React/Next.js", level: 85, color: "from-blue-400 to-cyan-500" },
    { skill: "Node.js/Express", level: 80, color: "from-green-400 to-emerald-500" },
    { skill: "Python/Django", level: 75, color: "from-purple-400 to-pink-500" },
    { skill: "Database Design", level: 70, color: "from-indigo-400 to-purple-500" },
    { skill: "Cloud Services", level: 65, color: "from-teal-400 to-blue-500" }
  ];

  return (
    <section id="skills" className="section-padding gradient-bg-secondary transition-all duration-500">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cpu className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-muted uppercase tracking-widest">
              Technical Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Technical Skills
          </h2>
          <div className="section-divider mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur`}></div>
              <div className="relative card-interactive p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white shadow-xl animate-glow`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="inline-block glass-card hover:bg-blue-50/50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 mr-2 mb-2 shadow-lg transition-all duration-300 cursor-default hover:scale-105 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card-strong rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Globe className="w-6 h-6 text-blue-500" />
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white text-center tracking-tight">
              Proficiency Levels
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {proficiencyLevels.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.skill}</span>
                  <span className="text-sm text-muted font-mono font-bold">{item.level}%</span>
                </div>
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-lg`}
                    style={{ width: `${item.level}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;