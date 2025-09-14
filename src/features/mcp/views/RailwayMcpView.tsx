import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, Server, Info } from "lucide-react";
import type React from "react";
import { useStaggeredEntrance } from "../../../hooks/useStaggeredEntrance";

export const RailwayMcpView: React.FC = () => {
  // Staggered entrance animation
  const { isVisible, containerVariants, itemVariants, titleVariants } = 
    useStaggeredEntrance([1, 2, 3, 4], 0.15);

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Title with MCP icon */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3"
        variants={titleVariants}
      >
        <svg
          fill="currentColor"
          fillRule="evenodd"
          height="28"
          width="28"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="text-pink-500 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
          aria-label="MCP icon"
        >
          <title>MCP icon</title>
          <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" />
          <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" />
        </svg>
        MCP Dashboard
      </motion.h1>

      {/* Railway Limitation Notice */}
      <motion.div variants={itemVariants}>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                MCP Features Limited on Railway
              </h2>
              <p className="text-amber-800 dark:text-amber-200">
                The Model Context Protocol (MCP) features require Docker daemon access, which is not available on Railway's platform for security reasons.
              </p>
              <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
                <p className="font-medium">Railway doesn't support:</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Docker-in-Docker (dind) functionality</li>
                  <li>Direct Docker daemon access</li>
                  <li>Container management APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Available Features */}
      <motion.div variants={itemVariants}>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Server className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-green-900 dark:text-green-100">
                What's Working on Railway
              </h2>
              <ul className="space-y-2 text-green-800 dark:text-green-200">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Projects Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Knowledge Base & RAG</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Settings & Configuration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>API Endpoints</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alternative Solutions */}
      <motion.div variants={itemVariants}>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Alternative Solutions
              </h2>
              <div className="space-y-3 text-blue-800 dark:text-blue-200">
                <div>
                  <p className="font-medium mb-1">For MCP Features:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-sm">
                    <li>Run Archon locally with Docker Desktop</li>
                    <li>Deploy on a VPS with Docker support</li>
                    <li>Use platforms like DigitalOcean or AWS EC2</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">For Railway Deployment:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-sm">
                    <li>Use archon-mcp as a separate microservice</li>
                    <li>Connect via API instead of Docker socket</li>
                    <li>Implement webhook-based integrations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documentation Link */}
      <motion.div variants={itemVariants}>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Learn more about MCP and deployment options
            </span>
            <a
              href="https://github.com/coleam00/Archon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>View Documentation</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
