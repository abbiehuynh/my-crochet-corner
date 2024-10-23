import React, {useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import ProjectCard from './ProjectCard';

// update to pass userId as prop
const ListProjects = () => {

    // creates initial state of list of projects
    const [projects, setProjects] = useState([]);

    // access from AuthContext
    const { token, userId, projectsUpdated } = useAuth();

    const loadProjects = async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/user/${userId}/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const projectsData = await response.json();
            setProjects(projectsData);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    // runs when userId or projectsUpdated changes
    useEffect(() => {
        loadProjects();
    }, [userId, projectsUpdated]);



  return (
    <div className="container">
        <div className="box list-projects">
            {/* TO DO: set to value in database so it can update with sorting button - All Projects */}
            <h2>List of Projects</h2>

            {/* creates a list of projects by mapping projectCard */}
            <ul style={{ listStyleType: "none" }}>
                {projects.map((project) => {
                    return <li key={project.id}> <ProjectCard project={project} /></li>
                })}
            </ul>


        </div>
    </div>
  )
}

export default ListProjects;