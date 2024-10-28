import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProjectForm = ({ project, projectId, onUpdate }) => {
    const [formData, setFormData] = useState({
        project_name: '',
        is_favorite: false,
        project_status: '',
        project_type: '',
        notes: '',
        patterns: [{ pattern_name: '', pattern_by: '', pattern_url: '' }],
        otherMaterials: [],
        yarns: [],
    });

    useEffect(() => {
        if (project) {
            setFormData({
                project_name: project.project_name,
                is_favorite: project.is_favorite,
                project_status: project.project_status,
                project_type: project.project_type,
                notes: project.notes,
                patterns: project.patterns || [{ pattern_name: '', pattern_by: '', pattern_url: ''}],
                otherMaterials: project.otherMaterials || [{ project_hook_size: '', safety_eyes: '', stuffing: '' }],
                yarns: project.yarns,
            });
        }
    }, [project]);

    const { userId } = useAuth();

    // handles change for general inputs - 
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({ 
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // handles change for patterns
    const handlePatternChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPatterns = [...formData.patterns];
        updatedPatterns[index] = { ...updatedPatterns[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            patterns: updatedPatterns,
        }));
    };

    // for adding new patterns button
    const addPattern = () => {
        setFormData(prevState => ({
            ...prevState,
            patterns: [...prevState.patterns, { pattern_name: '', pattern_by: '', pattern_url: '' }],
        }));
    };

    // for deleting patterns button
    const removePattern = (index) => {
        const updatedPatterns = formData.patterns.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            patterns: updatedPatterns,
        }));
    };

    // handles changes for other materials
    const handleOtherMaterialChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMaterials = [...formData.otherMaterials];
        updatedMaterials[index] = { ...updatedMaterials[index], [name]: value };
        setFormData(prevState => ({
            ...prevState,
            otherMaterials: updatedMaterials,
        }));
    };

    // for adding new other materials
    const addOtherMaterial = () => {
        setFormData(prevState => ({
            ...prevState,
            otherMaterials: [...prevState.otherMaterials, {project_hook_size: '', safety_eyes: '', stuffing: ''}],
        }));
    };

    // for removing other materials
    const removeOtherMaterial = (index) => {
        const updatedMaterials = formData.otherMaterials.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            otherMaterials: updatedMaterials,
        }));
    };
    
    // handles change for yarn inputs
    const handleYarnChange = (index, e) => {
        const { name, value } = e.target;
        const updatedYarns = [...formData.yarns];
        updatedYarns[index] = { ...updatedYarns[index], [name]: value};
        setFormData(prevState => ({
            ...prevState, 
            yarns: updatedYarns,
        }));
    };

    // for adding new yarn button
    const addYarn = () => {
        setFormData(prevState => ({
            ...prevState,
            yarns: [...prevState.yarns, { yarn_brand: '', yarn_color: '', yarn_weight: '', yarn_type: ''}],
        }));
    };

    // for removing yarn button
    const removeYarn = (index) => {
        const updatedYarns = formData.yarns.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState, 
            yarns: updatedYarns,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.project_name) {
            alert("Project Name is required");
            return;
        }

        try {
            await onUpdate({ ...formData, projectId, userId });
            navigate(`/user/${userId}/project/${projectId}`, { replace: true });
        } catch (error) {
            console.error('Update Failed:', error)
            alert("Failed to update project. Please try again.");
        // // DELETE LATER - debugging
        // console.log('Submitting project data:', { ...formData, projectId, userId });

        // // passes project Id and userId for server update
        // onUpdate({ ...formData, projectId, userId })
        //     .then(() => {
        //         console.log("Update successful, navigating...");
        //         navigate(`/user/${userId}/project/${projectId}`);
        // })
        }
    };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Project Details</Card.Title>
                    <Form.Group controlId='formProjectName'>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="project_name"
                            value={formData.project_name || ''}
                            onChange={handleChange}
                            placeholder="Enter project name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formProjectStatus">
                        <Form.Label>Project Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="project_status"
                            value={formData.project_status || ''}
                            onChange={handleChange}
                            placeholder="Enter project status"
                        />
                    </Form.Group>
                    <Form.Group controlId="formProjectType">
                        <Form.Label>Project Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="project_type"
                            value={formData.project_type || ''}
                            onChange={handleChange}
                            placeholder="Enter project type"
                        />
                    </Form.Group>
                    <Form.Group controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="notes"
                            value={formData.notes || ''}
                            onChange={handleChange}
                            placeholder="Enter any notes"
                        />
                    </Form.Group>
                </Card.Body>
            </Card>

            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Pattern Details</Card.Title>
                    {formData.patterns.map((pattern, index) => (
                        <div key={index}>
                            <Form.Group controlId={`formPatternName${index}`}>
                                <Form.Label>Pattern Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pattern_name"
                                    value={pattern.pattern_name}
                                    onChange={(e) => handlePatternChange(index, e)}
                                    placeholder="Enter pattern name"
                                />
                            </Form.Group>
                            <Form.Group controlId={`formPatternBy${index}`}>
                                <Form.Label>Pattern By</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pattern_by"
                                    value={pattern.pattern_by}
                                    onChange={(e) => handlePatternChange(index, e)}
                                    placeholder="Enter pattern designer"
                                />
                            </Form.Group>
                            <Form.Group controlId={`formPatternUrl${index}`}>
                                <Form.Label>Pattern Source</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="pattern_url"
                                    value={pattern.pattern_url}
                                    onChange={(e) => handlePatternChange(index, e)}
                                    placeholder="Enter pattern Source/URL"
                                />
                            </Form.Group>
                            <Button variant="danger" onClick={() => removePattern(index)}>
                                Remove Pattern
                            </Button>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addPattern}>
                        Add Pattern
                    </Button>
                </Card.Body>
            </Card>
            
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Other Materials</Card.Title>
                    {formData.otherMaterials && formData.otherMaterials.map((material, index) => (
                        <div key={index}>
                            <Form.Group controlId={`formOtherMaterialsHookSize${index}`}>
                                <Form.Label>Hook Size</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="project_hook_size"
                                    value={material.project_hook_size}
                                    onChange={(e) => handleOtherMaterialChange(index, e)}
                                    placeholder="Enter hook size"
                                />
                            </Form.Group>
                            <Form.Group controlId={`formOtherMaterialsSafetyEyes${index}`}>
                                <Form.Label>Safety Eyes</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="safety_eyes"
                                    value={material.safety_eyes}
                                    onChange={(e) => handleOtherMaterialChange(index, e)}
                                    placeholder="Enter safety eyes size"
                                />
                            </Form.Group>
                            <Form.Group controlId={`formOtherMaterialsStuffing${index}`}>
                                <Form.Label>Stuffing</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="stuffing"
                                    value={material.stuffing}
                                    onChange={(e) => handleOtherMaterialChange(index, e)}
                                    placeholder="Enter stuffing amount"
                                />
                            </Form.Group>
                            <Button variant="danger" onClick={() => removeOtherMaterial(index)}>
                                Remove Other Material
                            </Button>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addOtherMaterial}>
                        Add Other Material
                    </Button>
                </Card.Body>
            </Card>    
                
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Yarn</Card.Title>
                    {formData.yarns && formData.yarns.length > 0 ? (
                        formData.yarns.map((yarn, index) => (
                            <div key={index}>
                                <h5>Yarn {index + 1}</h5>
                                <Form.Group controlId={`formYarnBrand${index}`}>
                                    <Form.Label>Yarn Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="yarn_brand"
                                        value={yarn.yarn_brand}
                                        onChange={(e) => handleYarnChange(index, e)}
                                        placeholder="Enter yarn brand"
                                    />
                                </Form.Group>
                                <Form.Group controlId={`formYarnColor${index}`}>
                                    <Form.Label>Yarn Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="yarn_color"
                                        value={yarn.yarn_color}
                                        onChange={(e) => handleYarnChange(index, e)}
                                        placeholder="Enter yarn color"
                                    />
                                </Form.Group>
                                <Form.Group controlId={`formYarnWeight${index}`}>
                                    <Form.Label>Yarn Weight</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="yarn_weight"
                                        value={yarn.yarn_weight}
                                        onChange={(e) => handleYarnChange(index, e)}
                                        placeholder="Enter yarn weight"
                                    />
                                </Form.Group>
                                <Form.Group controlId={`formYarnType${index}`}>
                                    <Form.Label>Yarn Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="yarn_type"
                                        value={yarn.yarn_type}
                                        onChange={(e) => handleYarnChange(index, e)}
                                        placeholder="Enter yarn type"
                                    />
                                </Form.Group>
                                <Button variant="danger" onClick={() => removeYarn(index)}>
                                    Remove Yarn
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No yarns added yet.</p>
                    )}
                    <Button variant="secondary" onClick={addYarn}>
                        Add Yarn
                    </Button>
                </Card.Body>
            </Card>

            <div>
                <Button variant="primary" type="submit">
                    Update Project
                </Button>
            </div>
            </Form>
        </Container>
    )
}

export default ProjectForm;