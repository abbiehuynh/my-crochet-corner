import React, { useState } from 'react';
import { useProjects } from './ProjectProvider';
import SearchBar from './SearchBar';
import ProjectCard from './ProjectCard';

const ListProjects = () => {
    // access from Project Context
    const { projects, loading, error, deleteProject, setSearchQuery } = useProjects();

    if (loading) 
        return <div>Loading projects...</div>;

    if (error)
        return <div>Error loading projects: {error.message}</div>;

  return (
    <div className="container">
        <div className="box list-projects">
            {/* TO DO: set to value in database so it can update with sorting button - All Projects */}
            <h2>List of Projects</h2>
            <SearchBar setSearchQuery={setSearchQuery} />
            <ul style={{ listStyleType: "none" }}>
                {projects.map((project) => (
                    <li key={project.id}> 
                        <ProjectCard project={project} onDelete={() => deleteProject(project.id, project.project_name)} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default ListProjects;