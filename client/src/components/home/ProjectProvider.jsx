import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../auth/AuthProvider';

// creates project context
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    // creates initial states for projects
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('status'); // sort by project status
    const [selectedCategory, setSelectedCategory] = useState('All');

    // acesses axios instance and user Id from AuthContext
    const { axiosInstance, userId } = useAuth();

    // GET - fetch projects
    // useCallback ensures function does not change on every render, preventing unnecessary calls
    const fetchProjects = useCallback(async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }
        // updates states, resets error state
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/user/${userId}/projects`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch projects');
            }
            
            // checks response is an array of projects
            if (!Array.isArray(response.data)) {
                console.warn('Expected an array of projects, but got:', response.data);
                setProjects([]);
            } else {
                // if valid, set the projects state
                setProjects(response.data);
            }

        } catch (error) {
            setError(error);
            console.error('Error fetching projects:', error);
            // resets to an empty array if error occurs
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, [axiosInstance, userId]);

    // creates a function to sanitize the search query
    const sanitizeInput = (input) => {
        return input
            .trim()                 // removes leading and trailing spaces
            .replace(/'/g, "''")    // escape single quotes
            .replace(/"/g, "''")    // escape double quotes
            .replace(/;/g, '')      // remove semicolons
            .replace(/--/g, '')     // remove comment sequences
            .toLowerCase();
    };

    // filters projects based on the sanitized search query - project name - and selected category
    const filterProjects = (projects, searchQuery, selectedCategory) => {

        // checks that projects is always an array
        if (!Array.isArray(projects)) {
            console.warn('Expected projects to be an array, but got:', projects);
            return [];
        }
        // sanitize the search query
        const sanitizedQuery = sanitizeInput(searchQuery);
        return projects.filter(project => {
            // checks project has a valid project name and status but allows it to show if missing
            const hasValidFields = project && typeof project.project_name === 'string' && typeof project.project_status === 'string';
            // if project has valid fields, apply the search and status filter
            const matchesSearch = hasValidFields ? project.project_name.toLowerCase().includes(sanitizedQuery) : true;
            const matchesCategory = selectedCategory === 'All' || (hasValidFields && selectedCategory === project.project_status.toLowerCase());
            return hasValidFields ? matchesSearch && matchesCategory : true;
        });
    };

    // creates const for all to become a reusable function
    const filteredProjects = filterProjects(projects, searchQuery, selectedCategory);

    // sorts projects based on sortOrder
    const sortedProjects = filteredProjects.sort((a, b) => {
        switch (sortOrder) {
            case 'name':
                const nameA = a.project_name || '';
                const nameB = b.project_name || '';
                return nameA.localeCompare(nameB);
            case 'type':
                const typeA = a.project_type || '';
                const typeB = b.project_type || '';
                return typeA.localeCompare(typeB);
            case 'date':
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA; // sort by date descending
            default:
                return 0;
        }
    });

    // POST project - add project by project name form
    const addProject = async (newProject) => {
        setLoading(true);

        try {
            const response = await axiosInstance.post(`/user/${userId}/add-project`, newProject);
            if (response.status !== 201) {
                throw new Error('Failed to add project');
            }
            const createdProject = response.data;
            setProjects(prev => {
                const updatedProjects = [...prev, createdProject];
                console.log('Updated Projects:', updatedProjects);
                return updatedProjects;
            });
            // fetch updated list of projects
            return createdProject;
        } catch (error) {
            console.error('Error adding project:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // DELETE projects
    const deleteProject = async (projectId, projectName) => {
        // debugging - logging the project and user id
        console.log('Deleting project:', projectId, 'for user:', userId);

        const confirmDelete = window.confirm(`Are you sure you want to delete the project "${projectName}"?`);
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const response = await axiosInstance.delete(`/user/${userId}/delete-project/${projectId}`);
            if (response.status !== 204) {
                throw new Error('Failed to delete project');
            }
            // remove deleted project from state
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // toggles favorite project
    const toggleFavorite = async (projectId) => {
        setLoading(true);
        try {
            // finds the project to update
            const projectToUpdate = projects.find(project => project.id === projectId);
            if (projectToUpdate) {
                // creates the updated favorite status
                const newFavoriteStatus = !projectToUpdate.is_favorite;

                // PUT - updates project's favorite status in database
                const response = await axiosInstance.put(`/user/${userId}/project/${projectId}/favorite`, {
                    is_favorite: newFavoriteStatus,
                });

                if (response.status !== 200) {
                    throw new Error('Failed to update favorite status');
                }

                // updates the projects state
                setProjects(prevProjects =>
                    prevProjects.map(project =>
                        project.id === projectId ? { ...project, is_favorite: newFavoriteStatus } : project
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling favorite status:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // fetches projects only if userId is available - will not try to fetch before user has logged in
        if (userId) {
            fetchProjects();
        } else {
            // clear projects if user is logged out
            setProjects([]);
        }
    }, [userId, fetchProjects]);

    return (
        <ProjectContext.Provider value={{
            projects: sortedProjects,
            searchQuery,
            setSearchQuery,
            setSortOrder,
            setSelectedCategory,
            loading,
            error,
            addProject,
            deleteProject,
            fetchProjects,
            toggleFavorite
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProjects = () => useContext(ProjectContext);