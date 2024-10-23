import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContributorCard = ({ login, avatar_url, html_url, contributions, type: initialType }) => {
  const [type, setType] = useState(initialType);

  useEffect(() => {
    if (login === 'skmirajulislam') {
      setType('Admin');
    } else {
      setType(initialType);
    }
  }, [login, initialType]);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="overflow-hidden bg-white rounded-lg shadow-lg"
    >
      <div className="p-6 text-center">
        <img src={avatar_url} alt={login} className="w-24 h-24 mx-auto mb-4 border-4 border-blue-500 rounded-full" />
        <h3 className="text-xl font-bold text-gray-800">{login}</h3>
        <p className="mb-2 text-sm text-blue-600">{type}</p>
        <div className="inline-block px-4 py-2 mt-4 bg-blue-100 rounded-full">
          <span className="font-semibold text-blue-800">{contributions} contributions</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-100">
        <a 
          href={html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center text-blue-600 transition-colors hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View Profile
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </div>
    </motion.div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center p-6 bg-white rounded-lg shadow-lg"
  >
    <div className="p-3 mr-4 bg-blue-100 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  </motion.div>
);

const ContributorsPage = () => {
  const [contributors, setContributors] = useState([]);
  const [repoStats, setRepoStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributorsResponse = await fetch('https://api.github.com/repos/Vin205/Enyanjyoti/contributors');
        const contributorsData = await contributorsResponse.json();
        setContributors(contributorsData);

        const repoResponse = await fetch('https://api.github.com/repos/Vin205/Enyanjyoti');
        const repoData = await repoResponse.json();
        setRepoStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          openIssues: repoData.open_issues_count,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600" style={{ height: "90vh" }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 max-w-4xl px-4 mx-auto space-y-6">
          <motion.h1 
            className="text-5xl font-bold text-white sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Amazing Contributors
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-200 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shaping the future of Enyanjyoti, one commit at a time
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#contribute" 
              className="inline-block px-8 py-4 mt-8 font-bold text-blue-600 transition duration-300 ease-in-out bg-white rounded-full shadow-lg hover:bg-blue-100"
            >
              Become a Contributor
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Project Statistics</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              label="Contributors" 
              value={contributors.length} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM6 15a4 4 0 00-4 4h8a4 4 0 00-4-4zM14 18a4 4 0 014-4h-8a4 4 0 014 4zM18 15a2 2 0 00-4 0 2 2 0 004 0z" />
              </svg>} 
            />
            <StatCard 
              label="Stars" 
              value={repoStats.stars || 0} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 15.27L16.18 20 14.54 12.97 20 8.36l-7.19-.61L10 2 8.19 7.75 1 8.36l5.46 4.61L3.82 20 10 15.27z" />
              </svg>} 
            />
            <StatCard 
              label="Forks" 
              value={repoStats.forks || 0} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 2a1 1 0 00-1 1v6H5a2 2 0 100 4h1v5a1 1 0 001.68.74L11 14.414 14.32 17.68A1 1 0 0016 17V12h1a2 2 0 100-4h-1V3a1 1 0 00-1-1H7z" />
              </svg>} 
            />
            <StatCard 
              label="Open Issues" 
              value={repoStats.openIssues || 0} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM2 4v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2z" />
              </svg>} 
            />
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section id="contribute" className="px-4 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">Meet Our Contributors</h2>
          {loading ? (
            <p className="text-center">Loading contributors...</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {contributors.map(contributor => (
                  <motion.div key={contributor.id} exit={{ opacity: 0 }}>
                    <ContributorCard 
                      login={contributor.login}
                      avatar_url={contributor.avatar_url}
                      html_url={contributor.html_url}
                      contributions={contributor.contributions}
                      type={contributor.type}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Stay Updated</h2>
          <p className="mb-4 text-lg text-gray-600">Subscribe to our newsletter for the latest updates and news.</p>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 mr-2 text-gray-800 border rounded-l-lg focus:outline-none"
              required
            />
            <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContributorsPage;
