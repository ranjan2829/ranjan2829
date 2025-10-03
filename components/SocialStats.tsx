"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Twitter } from 'lucide-react';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
  contestRating?: number;
  contestGlobalRanking?: number;
  contestTopPercentage?: number;
  contestsAttended?: number;
  recentSubmissions?: Array<{
    title: string;
    titleSlug: string;
    timestamp: string;
  }>;
  patterns?: {
    advanced: Array<{ tagName: string; problemsSolved: number }>;
    intermediate: Array<{ tagName: string; problemsSolved: number }>;
    fundamental: Array<{ tagName: string; problemsSolved: number }>;
  };
}

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  url?: string;
  image?: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
}

export const SocialStats = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tweetsLoading, setTweetsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('/api/leetcode');
        const result = await response.json();
        
        if (result.success) {
          const acceptanceRate = result.data.totalQuestions > 0 
            ? parseFloat(((result.data.totalSolved / result.data.totalQuestions) * 100).toFixed(1))
            : 0;
            
          setLeetcodeStats({
            ...result.data,
            acceptanceRate,
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();

    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/twitter');
        const result = await response.json();
        
        if (result.success) {
          setTweets(result.data.tweets || []);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setTweetsLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
    <section id="stats" className={`py-12 sm:py-16 md:py-20 relative transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isDarkMode 
          ? 'bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]'
          : 'bg-[linear-gradient(to_right,#e0e0e0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0e0_1px,transparent_1px)] bg-[size:4rem_4rem]'
      }`} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div 
          className={`rounded-t-lg p-3 border mb-4 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8, rotate: 360 }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsMinimized(!isMinimized)}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:brightness-125"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                const statsSection = document.getElementById('stats');
                if (statsSection) statsSection.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <span className={`ml-4 font-mono text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>ranjan@portfolio:~/social-stats $</span>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          animate={{ height: isMinimized ? 0 : 'auto', opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: isMinimized ? 'hidden' : 'visible' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 ${
              isDarkMode ? 'bg-gray-900/80 border-gray-700 hover:border-yellow-500/50' : 'bg-white/80 border-gray-300 hover:border-yellow-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-yellow-500" />
                <h3 className={`text-sm font-bold font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LeetCode</h3>
              </div>
              <a 
                href="https://leetcode.com/u/ranjanshitole/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs font-mono ${isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                @ranjanshitole
              </a>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
              </div>
            ) : leetcodeStats ? (
              <div className="space-y-2">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-black/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Solved</span>
                    <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {leetcodeStats.totalSolved}/{leetcodeStats.totalQuestions}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-1000"
                      style={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className={`p-1.5 rounded text-center ${isDarkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                    <div className="text-base font-bold text-green-500">{leetcodeStats.easySolved}</div>
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Easy</div>
                  </div>
                  <div className={`p-1.5 rounded text-center ${isDarkMode ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <div className="text-base font-bold text-yellow-500">{leetcodeStats.mediumSolved}</div>
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Medium</div>
                  </div>
                  <div className={`p-1.5 rounded text-center ${isDarkMode ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
                    <div className="text-base font-bold text-red-500">{leetcodeStats.hardSolved}</div>
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hard</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1.5 border-t border-gray-700/30">
                  <div className="text-center">
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Rank</div>
                    <div className={`text-sm font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      #{(leetcodeStats.ranking || 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Rating</div>
                    <div className={`text-sm font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {leetcodeStats.contestRating || 'N/A'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Top</div>
                    <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {leetcodeStats.contestTopPercentage ? `${leetcodeStats.contestTopPercentage.toFixed(2)}%` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {leetcodeStats.patterns && (
                  <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700/30' : 'border-gray-300'}`}>
                    <div className={`text-xs font-mono font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Skills (≥10)</div>
                    
                    {/* Advanced Skills - Inline badges */}
                    {(() => {
                      const filteredAdvanced = leetcodeStats.patterns.advanced.filter(p => p.problemsSolved >= 10);
                      return filteredAdvanced.length > 0 && (
                        <div className="mb-1">
                          <div className={`text-xs font-mono mb-0.5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Advanced</div>
                          <div className="flex flex-wrap gap-1">
                            {filteredAdvanced.map((pattern, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono ${
                                  isDarkMode ? 'bg-red-500/10 text-gray-300' : 'bg-red-50 text-gray-700'
                                }`}
                              >
                                {pattern.tagName} <span className={isDarkMode ? 'text-red-400' : 'text-red-600'}>×{pattern.problemsSolved}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Intermediate Skills - Inline badges */}
                    {(() => {
                      const filteredIntermediate = leetcodeStats.patterns.intermediate.filter(p => p.problemsSolved >= 10);
                      return filteredIntermediate.length > 0 && (
                        <div>
                          <div className={`text-xs font-mono mb-0.5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Intermediate</div>
                          <div className="flex flex-wrap gap-1">
                            {filteredIntermediate.map((pattern, idx) => (
                              <span
                                key={idx}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono ${
                                  isDarkMode ? 'bg-yellow-500/10 text-gray-300' : 'bg-yellow-50 text-gray-700'
                                }`}
                              >
                                {pattern.tagName} <span className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}>×{pattern.problemsSolved}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Recent Submissions */}
                {leetcodeStats.recentSubmissions && leetcodeStats.recentSubmissions.length > 0 && (
                  <div className={`mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700/30' : 'border-gray-300'}`}>
                    <div className={`text-xs font-mono mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Recent AC</div>
                    <div className="space-y-1">
                      {(() => {
                        // Remove duplicates by title
                        const uniqueSubmissions = leetcodeStats.recentSubmissions.filter(
                          (sub, index, self) => 
                            index === self.findIndex((s) => s.title === sub.title)
                        ).slice(0, 3);
                        
                        return uniqueSubmissions.map((sub, idx) => (
                          <a
                            key={idx}
                            href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block text-xs font-mono truncate transition-colors ${
                              isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'
                            }`}
                          >
                            → {sub.title}
                          </a>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 ${
              isDarkMode ? 'bg-gray-900/80 border-gray-700 hover:border-blue-500/50' : 'bg-white/80 border-gray-300 hover:border-blue-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-500" />
                <h3 className={`text-sm font-bold font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest Tweets</h3>
              </div>
              <a 
                href="https://x.com/manofsteel3129" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs font-mono ${isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}
              >
                @manofsteel3129
              </a>
            </div>

            {tweetsLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            ) : tweets.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {tweets.slice(0, 6).map((tweet) => (
                  <a
                    key={tweet.id}
                    href={tweet.url || `https://x.com/manofsteel3129/status/${tweet.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-2 rounded-lg border transition-all duration-300 ${
                      isDarkMode ? 'bg-black/50 border-gray-700 hover:border-blue-500/50' : 'bg-gray-50 border-gray-200 hover:border-blue-500/50'
                    }`}
                  >
                    <p className={`text-xs font-mono line-clamp-2 mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {tweet.text}
                    </p>
                    
                    {tweet.image && (
                      <div className="my-2 rounded overflow-hidden">
                        <img 
                          src={tweet.image} 
                          alt="Tweet image" 
                          className="w-full h-auto max-h-32 object-cover"
                        />
                      </div>
                    )}
                    
                    <span className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {new Date(tweet.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-black/50' : 'bg-gray-50'}`}>
                <p className={`text-xs font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No tweets available
                </p>
              </div>
            )}

            <a
              href="https://x.com/manofsteel3129"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg font-mono text-xs transition-all mt-3 ${
                isDarkMode ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Twitter className="w-3 h-3" />
              View All Tweets
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialStats;
