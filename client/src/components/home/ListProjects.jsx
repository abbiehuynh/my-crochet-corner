import React, {useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

// update to pass userId as prop
const ListProjects = () => {

    // creates initial state of list of projects
    const [projects, setProjects] = useState([]);

    const loadProjects = () => {
        // fetches the list of projects
        // update to fetch by userId
        // fetch(`http://localhost:3001/user/${userId}/projects`)
            fetch(`http://localhost:3001/testTable/projects`)
            .then((response) => response.json())
            .then((projects) => {
                setProjects(projects);
                // console.log(projects);
            });
    }

    useEffect(() => {
        loadProjects();
    }, [projects]);



  return (
    <div className="container">
        <div className="box list-projects">
            {/* TO DO: set to value in database so it can update with sorting button - All Projects */}
            <h2>List of Projects</h2>

            {/* creates a list of projects by mapping projectCard */}
                {/* removes bullet points to create cards */}
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