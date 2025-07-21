import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { fetchCareerRoadmaps } from "@/lib/api";
import { RoadmapCareer } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";

export default function CareerRoadmaps() {
  const { data: roadmaps, isLoading, isError, error } = useQuery({
    queryKey: ['career-roadmaps'],
    queryFn: fetchCareerRoadmaps,
  });
  
  return (
    <main className="flex-grow container mx-auto px-4 py-6">
      <h1 className="font-space text-2xl font-bold mb-2">Tech Career Roadmaps</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Find structured learning paths, salary information, and resources for different tech career paths
      </p>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-sm">
              <Skeleton className="h-10 w-10 rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Error loading career roadmaps</p>
          <p className="text-sm text-gray-500">{(error as Error)?.message || 'Something went wrong'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps?.map((roadmap) => (
            <Link key={roadmap.id} href={`/career-roadmaps/${roadmap.id}`} className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow block">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <i className="material-icons">{roadmap.icon}</i>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">${formatNumber(roadmap.salary.mid)}</span> avg
                  </div>
                </div>
                <h2 className="font-space text-xl font-bold mb-2">{roadmap.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{roadmap.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <i className="material-icons text-sm mr-2 text-gray-400">school</i>
                    <span className="text-gray-600 dark:text-gray-300">{roadmap.topics.length} Learning Modules</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <i className="material-icons text-sm mr-2 text-gray-400">business</i>
                    <span className="text-gray-600 dark:text-gray-300">
                      Top companies: {roadmap.companies.slice(0, 2).join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <i className="material-icons text-sm mr-2 text-gray-400">trending_up</i>
                    <span className="text-gray-600 dark:text-gray-300">Growing field</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="text-primary flex items-center text-sm">
                    View roadmap 
                    <i className="material-icons text-sm ml-1">arrow_forward</i>
                  </span>
                </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
