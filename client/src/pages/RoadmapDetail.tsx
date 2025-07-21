import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { fetchCareerRoadmaps, fetchJobListings } from "@/lib/api";
import { RoadmapTopic, RoadmapCareer, JobListing } from "@/types";
import { formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RoadmapDetail() {
  const { id } = useParams();
  const [selectedCareer, setSelectedCareer] = useState<RoadmapCareer | null>(null);
  const [topics, setTopics] = useState<RoadmapTopic[]>([]);
  
  // Fetch all roadmaps
  const { data: roadmaps, isLoading, isError, error } = useQuery({
    queryKey: ['career-roadmaps'],
    queryFn: fetchCareerRoadmaps,
  });
  
  // Fetch job listings for this career path
  const { data: jobListings } = useQuery({
    queryKey: ['job-listings', id],
    queryFn: () => fetchJobListings(id || ''),
    enabled: !!id,
  });
  
  // Find the selected career from the roadmaps data
  useEffect(() => {
    if (roadmaps && id) {
      const career = roadmaps.find(roadmap => roadmap.id === id);
      if (career) {
        setSelectedCareer(career);
        
        // Load topic statuses from localStorage if available
        const savedTopics = localStorage.getItem(`roadmap-${id}-topics`);
        if (savedTopics) {
          try {
            setTopics(JSON.parse(savedTopics));
          } catch (e) {
            console.error("Failed to parse saved topics:", e);
            setTopics(career.topics);
          }
        } else {
          setTopics(career.topics);
        }
      }
    }
  }, [roadmaps, id]);
  
  // Save topic statuses to localStorage when they change
  useEffect(() => {
    if (id && topics.length > 0) {
      localStorage.setItem(`roadmap-${id}-topics`, JSON.stringify(topics));
    }
  }, [topics, id]);
  
  const updateTopicStatus = (topicName: string, newStatus: 'completed' | 'learning' | 'not-started') => {
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.name === topicName ? { ...topic, status: newStatus } : topic
      )
    );
  };
  
  if (isLoading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-6 mr-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-72 w-full rounded-xl" />
          </div>
        </div>
      </main>
    );
  }
  
  if (isError) {
    return (
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Error loading roadmap</p>
          <p className="text-sm text-gray-500">{(error as Error)?.message || 'Something went wrong'}</p>
          <Link href="/career-roadmaps">
            <a className="text-primary mt-4 inline-block">Go back to all roadmaps</a>
          </Link>
        </div>
      </main>
    );
  }
  
  if (!selectedCareer) {
    return (
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Roadmap not found</p>
          <Link href="/career-roadmaps">
            <a className="text-primary">View all career roadmaps</a>
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex-grow container mx-auto px-4 py-6 pb-20 md:pb-6">
      <div className="flex items-center mb-6">
        <Link href="/career-roadmaps">
          <a className="text-gray-500 hover:text-primary">
            <span className="material-icons">arrow_back</span>
          </a>
        </Link>
        <h1 className="font-space text-2xl font-bold ml-2">{selectedCareer.title} Roadmap</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 shadow-sm">
            <h2 className="font-space text-xl font-bold mb-2">Career Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedCareer.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-light-bg dark:bg-dark-hover rounded-lg p-4">
                <h3 className="font-space font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Entry Level</h3>
                <p className="font-space text-lg font-bold">${formatNumber(selectedCareer.salary.entry)}</p>
              </div>
              <div className="bg-light-bg dark:bg-dark-hover rounded-lg p-4">
                <h3 className="font-space font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Mid Level</h3>
                <p className="font-space text-lg font-bold">${formatNumber(selectedCareer.salary.mid)}</p>
              </div>
              <div className="bg-light-bg dark:bg-dark-hover rounded-lg p-4">
                <h3 className="font-space font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Senior Level</h3>
                <p className="font-space text-lg font-bold">${formatNumber(selectedCareer.salary.senior)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 shadow-sm">
            <h2 className="font-space text-xl font-bold mb-4">Learning Path</h2>
            
            <div className="space-y-4">
              {topics.map((topic, index) => (
                <div key={topic.name} className="border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                        <span className="font-medium">{index + 1}</span>
                      </div>
                      <h3 className="font-space font-bold">{topic.name}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={topic.status === 'not-started' ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={() => updateTopicStatus(topic.name, 'not-started')}
                        className={`px-2 py-1 text-xs rounded-full ${
                          topic.status === 'not-started' 
                            ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-700' 
                            : ''
                        }`}
                      >
                        Not Started
                      </Button>
                      <Button 
                        variant={topic.status === 'learning' ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={() => updateTopicStatus(topic.name, 'learning')}
                        className={`px-2 py-1 text-xs rounded-full ${
                          topic.status === 'learning' 
                            ? 'border-blue-300 bg-blue-100 dark:bg-blue-900/40 dark:border-blue-800 text-blue-800 dark:text-blue-300' 
                            : ''
                        }`}
                      >
                        Learning
                      </Button>
                      <Button 
                        variant={topic.status === 'completed' ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={() => updateTopicStatus(topic.name, 'completed')}
                        className={`px-2 py-1 text-xs rounded-full ${
                          topic.status === 'completed' 
                            ? 'border-green-300 bg-green-100 dark:bg-green-900/40 dark:border-green-800 text-green-800 dark:text-green-300' 
                            : ''
                        }`}
                      >
                        Completed
                      </Button>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <details className="cursor-pointer">
                      <summary className="text-sm text-primary font-medium mb-2">
                        Resources and Learning Materials
                      </summary>
                      <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-2 mt-2">
                        {topic.resources.map((resource) => (
                          <div key={resource.name} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                            >
                              <span className="material-icons text-sm mr-1">link</span>
                              {resource.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 shadow-sm">
            <h2 className="font-space text-xl font-bold mb-3">Top Companies</h2>
            <ul className="space-y-2">
              {selectedCareer.companies.map((company) => (
                <li key={company} className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="material-icons text-gray-400 mr-2">business</span>
                  {company}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 shadow-sm">
            <h2 className="font-space text-xl font-bold mb-3">Interview Topics</h2>
            <div className="space-y-2">
              {selectedCareer.interviewTopics.map((topic) => (
                <div key={topic} className="bg-light-bg dark:bg-dark-hover rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-300">{topic}</p>
                </div>
              ))}
            </div>
          </div>
          
          {jobListings && jobListings.length > 0 && (
            <div className="bg-light-card dark:bg-dark-card rounded-xl p-5 shadow-sm">
              <h2 className="font-space text-xl font-bold mb-3">Job Opportunities</h2>
              <div className="space-y-3">
                {jobListings.map((job) => (
                  <a 
                    key={job.id}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-light-bg dark:bg-dark-hover rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <h3 className="font-space font-bold text-base">{job.title}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.company}</span>
                      <span className="mx-1">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border-0">
                        {job.salary}
                      </Badge>
                      <span className="material-icons text-gray-400">arrow_forward</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
